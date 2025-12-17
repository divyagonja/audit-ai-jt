-- Add recommendation column to audit_issues
ALTER TABLE public.audit_issues ADD COLUMN IF NOT EXISTS recommendation text;