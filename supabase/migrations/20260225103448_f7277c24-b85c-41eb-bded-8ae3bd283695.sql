CREATE POLICY "Users can delete issues for their audits"
ON public.audit_issues FOR DELETE
USING (EXISTS (
  SELECT 1 FROM public.audits 
  WHERE audits.id = audit_issues.audit_id 
  AND audits.user_id = auth.uid()
));