import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Database } from '@/types/database.types';

type Audit = Database['public']['Tables']['audits']['Row'];
type AuditInsert = Database['public']['Tables']['audits']['Insert'];
type AuditIssue = Database['public']['Tables']['audit_issues']['Row'];

// Fetch all audits for the current user
export const useAudits = () => {
    return useQuery({
        queryKey: ['audits'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('audits')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            return data as Audit[];
        },
    });
};

// Fetch a single audit by ID
export const useAudit = (auditId: string | undefined) => {
    return useQuery({
        queryKey: ['audit', auditId],
        queryFn: async () => {
            if (!auditId) return null;

            const { data, error } = await supabase
                .from('audits')
                .select('*')
                .eq('id', auditId)
                .single();

            if (error) throw error;
            return data as Audit;
        },
        enabled: !!auditId,
    });
};

// Fetch issues for a specific audit
export const useAuditIssues = (auditId: string | undefined) => {
    return useQuery({
        queryKey: ['audit-issues', auditId],
        queryFn: async () => {
            if (!auditId) return [];

            const { data, error } = await supabase
                .from('audit_issues')
                .select('*')
                .eq('audit_id', auditId)
                .order('severity', { ascending: true });

            if (error) throw error;
            return data as AuditIssue[];
        },
        enabled: !!auditId,
    });
};

// Create a new audit
export const useCreateAudit = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (auditData: AuditInsert) => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('User not authenticated');

            const { data, error } = await supabase
                .from('audits')
                .insert({ ...auditData, user_id: user.id })
                .select()
                .single();

            if (error) throw error;
            return data as Audit;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['audits'] });
        },
    });
};

// Update an audit
export const useUpdateAudit = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, updates }: { id: string; updates: Partial<Audit> }) => {
            const { data, error } = await supabase
                .from('audits')
                .update(updates)
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;
            return data as Audit;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['audits'] });
            queryClient.invalidateQueries({ queryKey: ['audit', data.id] });
        },
    });
};

// Delete an audit
export const useDeleteAudit = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (auditId: string) => {
            const { error } = await supabase
                .from('audits')
                .delete()
                .eq('id', auditId);

            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['audits'] });
        },
    });
};

// Update issue resolution status
export const useUpdateIssue = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, is_resolved }: { id: string; is_resolved: boolean }) => {
            const { data, error } = await supabase
                .from('audit_issues')
                .update({ is_resolved })
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;
            return data as AuditIssue;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['audit-issues', data.audit_id] });
        },
    });
};
