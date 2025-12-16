-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  company TEXT,
  email TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create audits table
CREATE TABLE public.audits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  name TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'running', 'completed', 'failed')),
  overall_score INTEGER DEFAULT 0,
  seo_score INTEGER DEFAULT 0,
  performance_score INTEGER DEFAULT 0,
  ux_score INTEGER DEFAULT 0,
  content_score INTEGER DEFAULT 0,
  security_score INTEGER DEFAULT 0,
  critical_issues INTEGER DEFAULT 0,
  warning_issues INTEGER DEFAULT 0,
  info_issues INTEGER DEFAULT 0,
  revenue_impact DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Create audit_issues table
CREATE TABLE public.audit_issues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  audit_id UUID NOT NULL REFERENCES public.audits(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('critical', 'warning', 'info')),
  title TEXT NOT NULL,
  description TEXT,
  impact TEXT,
  fix_code TEXT,
  fix_steps TEXT[],
  current_score INTEGER,
  potential_score INTEGER,
  revenue_impact DECIMAL(10,2) DEFAULT 0,
  difficulty INTEGER DEFAULT 3,
  time_estimate TEXT,
  is_resolved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create competitors table
CREATE TABLE public.competitors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  overall_score INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_issues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.competitors ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Audits policies
CREATE POLICY "Users can view their own audits"
ON public.audits FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own audits"
ON public.audits FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own audits"
ON public.audits FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own audits"
ON public.audits FOR DELETE
USING (auth.uid() = user_id);

-- Audit issues policies
CREATE POLICY "Users can view issues for their audits"
ON public.audit_issues FOR SELECT
USING (EXISTS (
  SELECT 1 FROM public.audits 
  WHERE audits.id = audit_issues.audit_id 
  AND audits.user_id = auth.uid()
));

CREATE POLICY "Users can update issues for their audits"
ON public.audit_issues FOR UPDATE
USING (EXISTS (
  SELECT 1 FROM public.audits 
  WHERE audits.id = audit_issues.audit_id 
  AND audits.user_id = auth.uid()
));

-- Competitors policies
CREATE POLICY "Users can view their own competitors"
ON public.competitors FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own competitors"
ON public.competitors FOR ALL
USING (auth.uid() = user_id);

-- Create function to handle new user profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, email)
  VALUES (new.id, new.raw_user_meta_data ->> 'full_name', new.email);
  RETURN new;
END;
$$;

-- Create trigger for new users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update timestamp function
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Add update triggers
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();