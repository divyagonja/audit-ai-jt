-- Add mobile and desktop performance scores to audits table
ALTER TABLE public.audits ADD COLUMN IF NOT EXISTS performance_score_desktop INTEGER DEFAULT 0;
ALTER TABLE public.audits ADD COLUMN IF NOT EXISTS performance_score_mobile INTEGER DEFAULT 0;
