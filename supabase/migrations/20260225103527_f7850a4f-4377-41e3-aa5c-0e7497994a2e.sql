CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  v_full_name text;
BEGIN
  v_full_name := COALESCE(
    TRIM(new.raw_user_meta_data ->> 'full_name'),
    'User'
  );
  
  IF LENGTH(v_full_name) > 100 THEN
    v_full_name := SUBSTRING(v_full_name, 1, 100);
  END IF;
  
  INSERT INTO public.profiles (user_id, full_name, email)
  VALUES (new.id, v_full_name, new.email);
  
  RETURN new;
END;
$$;