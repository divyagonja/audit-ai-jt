export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    user_id: string
                    full_name: string | null
                    company: string | null
                    email: string | null
                    avatar_url: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    full_name?: string | null
                    company?: string | null
                    email?: string | null
                    avatar_url?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    full_name?: string | null
                    company?: string | null
                    email?: string | null
                    avatar_url?: string | null
                    created_at?: string
                    updated_at?: string
                }
            }
            audits: {
                Row: {
                    id: string
                    user_id: string
                    url: string
                    name: string | null
                    status: 'pending' | 'running' | 'completed' | 'failed'
                    overall_score: number
                    seo_score: number
                    performance_score: number
                    ux_score: number
                    content_score: number
                    security_score: number
                    critical_issues: number
                    warning_issues: number
                    info_issues: number
                    revenue_impact: number
                    created_at: string
                    completed_at: string | null
                }
                Insert: {
                    id?: string
                    user_id: string
                    url: string
                    name?: string | null
                    status?: 'pending' | 'running' | 'completed' | 'failed'
                    overall_score?: number
                    seo_score?: number
                    performance_score?: number
                    ux_score?: number
                    content_score?: number
                    security_score?: number
                    critical_issues?: number
                    warning_issues?: number
                    info_issues?: number
                    revenue_impact?: number
                    created_at?: string
                    completed_at?: string | null
                }
                Update: {
                    id?: string
                    user_id?: string
                    url?: string
                    name?: string | null
                    status?: 'pending' | 'running' | 'completed' | 'failed'
                    overall_score?: number
                    seo_score?: number
                    performance_score?: number
                    ux_score?: number
                    content_score?: number
                    security_score?: number
                    critical_issues?: number
                    warning_issues?: number
                    info_issues?: number
                    revenue_impact?: number
                    created_at?: string
                    completed_at?: string | null
                }
            }
            audit_issues: {
                Row: {
                    id: string
                    audit_id: string
                    category: string
                    severity: 'critical' | 'warning' | 'info'
                    title: string
                    description: string | null
                    impact: string | null
                    fix_code: string | null
                    fix_steps: string[] | null
                    current_score: number | null
                    potential_score: number | null
                    revenue_impact: number
                    difficulty: number
                    time_estimate: string | null
                    is_resolved: boolean
                    created_at: string
                }
                Insert: {
                    id?: string
                    audit_id: string
                    category: string
                    severity: 'critical' | 'warning' | 'info'
                    title: string
                    description?: string | null
                    impact?: string | null
                    fix_code?: string | null
                    fix_steps?: string[] | null
                    current_score?: number | null
                    potential_score?: number | null
                    revenue_impact?: number
                    difficulty?: number
                    time_estimate?: string | null
                    is_resolved?: boolean
                    created_at?: string
                }
                Update: {
                    id?: string
                    audit_id?: string
                    category?: string
                    severity?: 'critical' | 'warning' | 'info'
                    title?: string
                    description?: string | null
                    impact?: string | null
                    fix_code?: string | null
                    fix_steps?: string[] | null
                    current_score?: number | null
                    potential_score?: number | null
                    revenue_impact?: number
                    difficulty?: number
                    time_estimate?: string | null
                    is_resolved?: boolean
                    created_at?: string
                }
            }
            competitors: {
                Row: {
                    id: string
                    user_id: string
                    name: string
                    url: string
                    overall_score: number
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    name: string
                    url: string
                    overall_score?: number
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    name?: string
                    url?: string
                    overall_score?: number
                    created_at?: string
                }
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
    }
}
