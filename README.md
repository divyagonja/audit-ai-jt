# AuditAI - Enterprise Website Intelligence Platform

AuditAI is an AI-powered website auditing tool that provides instant insights, performance metrics, and actionable recommendations for enterprise teams.

## 🚀 Features

- **AI-Powered Analysis**: Instant technical SEO and performance audits
- **Real-Time Monitoring**: Automated checks for site health
- **Compliance Checks**: WCAG accessibility and security validation
- **Competitor Analysis**: Benchmarking against industry leaders
- **White-Label Reports**: Professional PDF exports for agencies

## 🛠 Tech Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **UI Components**: shadcn/ui
- **Backend**: Supabase (Auth, Database, Edge Functions)
- **State Management**: TanStack Query
- **Styling**: Tailwind CSS with custom animations

## 🏃‍♂️ Getting Started

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd audit-ai-jt
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## 📱 Project Structure

- `/src/components`: Reusable UI components
- `/src/pages`: Page components and routing
- `/src/hooks`: Custom React hooks (Auth, Audits, etc.)
- `/src/lib`: Utility functions and clients (Supabase)
- `/src/types`: TypeScript definitions

## 📄 License

All rights reserved © 2024 AuditAI
