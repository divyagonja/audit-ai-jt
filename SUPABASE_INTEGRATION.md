# Supabase Backend Integration

## ✅ Setup Complete!

Your Supabase backend is now fully connected to your frontend. Here's what has been configured:

---

## 📁 Files Created

### 1. **Supabase Client** (`src/lib/supabase.ts`)
- Configured Supabase client with environment variables
- Enabled session persistence and auto-refresh
- Ready to use throughout your application

### 2. **Database Types** (`src/types/database.types.ts`)
- TypeScript type definitions for all database tables:
  - `profiles` - User profile information
  - `audits` - Website audit records
  - `audit_issues` - Individual issues found in audits
  - `competitors` - Competitor tracking
- Includes Row, Insert, and Update types for type-safe operations

### 3. **Authentication Hook** (`src/hooks/useAuth.ts`)
- `useAuth()` - Main authentication hook
- Functions provided:
  - `signIn(email, password)` - Sign in existing users
  - `signUp(email, password, fullName)` - Register new users
  - `signOut()` - Sign out current user
  - `resetPassword(email)` - Send password reset email
- State provided:
  - `user` - Current user object
  - `session` - Current session
  - `loading` - Loading state

### 4. **Audits Hooks** (`src/hooks/useAudits.ts`)
- `useAudits()` - Fetch all audits for current user
- `useAudit(auditId)` - Fetch single audit by ID
- `useAuditIssues(auditId)` - Fetch issues for an audit
- `useCreateAudit()` - Create new audit
- `useUpdateAudit()` - Update existing audit
- `useDeleteAudit()` - Delete an audit
- `useUpdateIssue()` - Mark issues as resolved/unresolved

### 5. **Profile Hooks** (`src/hooks/useProfile.ts`)
- `useProfile()` - Fetch current user's profile
- `useUpdateProfile()` - Update user profile

---

## 🔐 Environment Variables

Already configured in `.env`:
```
VITE_SUPABASE_URL=https://tpqtevxmkuidgzhbnbxh.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGci...
```

---

## 📊 Database Schema

### Tables:
1. **profiles** - User profiles
2. **audits** - Website audits with scores
3. **audit_issues** - Individual issues per audit
4. **competitors** - Competitor tracking

### Security:
- ✅ Row Level Security (RLS) enabled on all tables
- ✅ Users can only access their own data
- ✅ Automatic profile creation on signup

---

## 🚀 Usage Examples

### Authentication
```typescript
import { useAuth } from '@/hooks/useAuth';

function LoginForm() {
  const { signIn, user, loading } = useAuth();

  const handleLogin = async () => {
    const { error } = await signIn('user@example.com', 'password');
    if (error) console.error(error);
  };

  if (loading) return <div>Loading...</div>;
  if (user) return <div>Welcome {user.email}</div>;

  return <button onClick={handleLogin}>Sign In</button>;
}
```

### Fetching Audits
```typescript
import { useAudits } from '@/hooks/useAudits';

function AuditsList() {
  const { data: audits, isLoading, error } = useAudits();

  if (isLoading) return <div>Loading audits...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {audits?.map(audit => (
        <div key={audit.id}>
          <h3>{audit.name}</h3>
          <p>Score: {audit.overall_score}</p>
          <p>Status: {audit.status}</p>
        </div>
      ))}
    </div>
  );
}
```

### Creating an Audit
```typescript
import { useCreateAudit } from '@/hooks/useAudits';

function CreateAuditForm() {
  const createAudit = useCreateAudit();

  const handleSubmit = async (url: string) => {
    await createAudit.mutateAsync({
      url,
      name: 'My Website Audit',
      status: 'pending',
    });
  };

  return (
    <button onClick={() => handleSubmit('https://example.com')}>
      Start Audit
    </button>
  );
}
```

### User Profile
```typescript
import { useProfile, useUpdateProfile } from '@/hooks/useProfile';

function ProfilePage() {
  const { data: profile } = useProfile();
  const updateProfile = useUpdateProfile();

  const handleUpdate = async () => {
    await updateProfile.mutateAsync({
      full_name: 'John Doe',
      company: 'Acme Corp',
    });
  };

  return (
    <div>
      <h1>{profile?.full_name}</h1>
      <p>{profile?.company}</p>
      <button onClick={handleUpdate}>Update Profile</button>
    </div>
  );
}
```

---

## 🔧 Next Steps

1. **Protect Routes**: Create protected routes that require authentication
2. **Add Auth UI**: Build login/signup forms using the `useAuth` hook
3. **Connect Landing Page**: Link the "Audit My Site" button to create audits
4. **Build Dashboard**: Display user's audits and statistics
5. **Implement Audit Flow**: Connect to Supabase Edge Functions for processing

---

## 📚 Resources

- [Supabase Docs](https://supabase.com/docs)
- [React Query Docs](https://tanstack.com/query/latest)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

---

## ✨ Features Enabled

- ✅ User authentication (sign up, sign in, sign out)
- ✅ Password reset functionality
- ✅ Automatic profile creation
- ✅ Secure data access with RLS
- ✅ Type-safe database operations
- ✅ Optimistic updates with React Query
- ✅ Automatic cache invalidation
- ✅ Real-time auth state management

Your backend is now fully integrated and ready to use! 🎉
