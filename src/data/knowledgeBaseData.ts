export interface Article {
    title: string;
    content: string;
    category: string;
    lastUpdated: string;
}

export const knowledgeBaseData: Record<string, Article> = {
    "quick-start-guide": {
        title: "Quick Start Guide",
        category: "Getting Started",
        lastUpdated: "January 15, 2026",
        content: `
            <p class="mb-6">Welcome to AuditAI! This guide will help you get your first audit running in less than 5 minutes. AuditAI is designed to be intuitive, but knowing where to start can make a big difference in the insights you gain.</p>
            
            <h2 class="text-2xl font-bold text-navy mt-8 mb-4">1. Create your account</h2>
            <p class="mb-4">If you haven't already, sign up for an account. You'll need to verify your email address to get started. We recommend using your work email to keep your projects organized.</p>
            
            <h2 class="text-2xl font-bold text-navy mt-8 mb-4">2. Add your first project</h2>
            <p class="mb-4">Once you're logged in, click on the <strong>"New Audit"</strong> button in your dashboard. Enter the full URL (including https://) of the website you want to audit.</p>
            
            <h2 class="text-2xl font-bold text-navy mt-8 mb-4">3. Configure scan settings</h2>
            <p class="mb-4">Choose between a quick audit or a deep scan. A quick audit focuses on the homepage, while a deep scan crawls up to 500 pages of your site.</p>
            
            <div class="bg-primary/5 p-6 rounded-xl border border-primary/10 my-8">
                <h4 class="font-bold text-primary mb-2">Pro Tip:</h4>
                <p class="text-sm">For your first time, we recommend the <strong>Standard Scan</strong>. it provides the best balance between speed and depth of insight.</p>
            </div>

            <h2 class="text-2xl font-bold text-navy mt-8 mb-4">4. View your results</h2>
            <p class="mb-4">Our AI will analyze your site for SEO, performance, and accessibility. Once complete, you'll receive a comprehensive health score and a list of actionable insights categorized by priority.</p>
        `
    },
    "understanding-health-scores": {
        title: "Understanding Health Scores",
        category: "Audits & Analysis",
        lastUpdated: "January 20, 2026",
        content: `
            <p class="mb-6">AuditAI uses a proprietary algorithm to calculate your website's health score. This score is a weighted average of several key performance indicators (KPIs) that search engines use to rank your site.</p>
            
            <h2 class="text-2xl font-bold text-navy mt-8 mb-4">Key Scoring Areas</h2>
            <p class="mb-4">Your final score is comprised of four main pillars:</p>
            <ul class="space-y-4 mb-8">
                <li class="flex gap-3">
                    <span class="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></span>
                    <div>
                        <strong>SEO Optimization:</strong> Measures technical SEO factors like meta tags, header hierarchy, and sitemap health.
                    </div>
                </li>
                <li class="flex gap-3">
                    <span class="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></span>
                    <div>
                        <strong>Performance:</strong> Evaluates load times, Core Web Vitals, and resource optimization.
                    </div>
                </li>
                <li class="flex gap-3">
                    <span class="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></span>
                    <div>
                        <strong>Accessibility:</strong> Checks for screen reader compatibility, color contrast, and keyboard navigation.
                    </div>
                </li>
                <li class="flex gap-3">
                    <span class="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></span>
                    <div>
                        <strong>Security:</strong> Verifies SSL certificates, secure headers, and common vulnerability exposures.
                    </div>
                </li>
            </ul>

            <h2 class="text-2xl font-bold text-navy mt-8 mb-4">What the Scores Mean</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
                <div class="p-4 rounded-xl bg-green-50 border border-green-100">
                    <div class="text-green-600 font-bold text-lg mb-1">90 - 100</div>
                    <p class="text-sm text-green-700">Excellent performance. Your site meets most industry standards.</p>
                </div>
                <div class="p-4 rounded-xl bg-yellow-50 border border-yellow-100">
                    <div class="text-yellow-600 font-bold text-lg mb-1">70 - 89</div>
                    <p class="text-sm text-yellow-700">Good, but has room for improvement in specific areas.</p>
                </div>
                <div class="p-4 rounded-xl bg-red-50 border border-red-100">
                    <div class="text-red-600 font-bold text-lg mb-1">0 - 69</div>
                    <p class="text-sm text-red-700">Critical issues found. Urgent optimization is recommended.</p>
                </div>
            </div>
        `
    },
    "fixing-core-web-vitals": {
        title: "Fixing Core Web Vitals",
        category: "Audits & Analysis",
        lastUpdated: "January 22, 2026",
        content: `
            <p class="mb-6">Core Web Vitals are a set of specific factors that Google considers important in a webpage's overall user experience. This guide will help you understand how to improve them.</p>
            
            <h2 class="text-2xl font-bold text-navy mt-8 mb-4">1. Largest Contentful Paint (LCP)</h2>
            <p class="mb-4">LCP measures loading performance. To provide a good user experience, LCP should occur within 2.5 seconds of when the page first starts loading.</p>
            <p class="italic text-slate-500 mb-4">Fix: Optimize your server, use a CDN, and compress large images or videos.</p>

            <h2 class="text-2xl font-bold text-navy mt-8 mb-4">2. Interaction to Next Paint (INP)</h2>
            <p class="mb-4">INP measures responsiveness. A good INP score is 200 milliseconds or less.</p>
            <p class="italic text-slate-500 mb-4">Fix: Reduce JavaScript execution time and minimize main-thread work.</p>

            <h2 class="text-2xl font-bold text-navy mt-8 mb-4">3. Cumulative Layout Shift (CLS)</h2>
            <p class="mb-4">CLS measures visual stability. To provide a good user experience, pages should maintain a CLS of 0.1. or less.</p>
            <p class="italic text-slate-500 mb-4">Fix: Include size attributes on your images and video elements, and never insert content above existing content except in response to a user interaction.</p>
        `
    },
    "managing-subscriptions": {
        title: "Managing Subscriptions",
        category: "Account & Billing",
        lastUpdated: "January 10, 2026",
        content: `
            <p class="mb-6">Learn how to upgrade, downgrade, or cancel your AuditAI subscription.</p>
            <h2 class="text-2xl font-bold text-navy mt-8 mb-4">Upgrading Your Plan</h2>
            <p class="mb-4">To upgrade, go to <strong>Settings > Billing</strong> and select "Change Plan". Your new features will be available immediately.</p>
            <h2 class="text-2xl font-bold text-navy mt-8 mb-4">Cancellation Policy</h2>
            <p class="mb-4">You can cancel your subscription at any time. You will continue to have access to your paid features until the end of your billing cycle.</p>
        `
    },
    "api-reference": {
        title: "API Reference",
        category: "API & Integrations",
        lastUpdated: "January 25, 2026",
        content: `
            <p class="mb-6">Integrate AuditAI directly into your workflow with our RESTful API.</p>
            <h2 class="text-2xl font-bold text-navy mt-8 mb-4">Authentication</h2>
            <p class="mb-4">All API requests require an API key, which you can generate in your <strong>Organization Settings</strong>. Pass this key in the <code>X-API-KEY</code> header.</p>
            <pre class="bg-slate-900 text-slate-100 p-6 rounded-xl my-6 overflow-x-auto"><code>curl -H "X-API-KEY: your_api_key" \\
     https://api.auditai.com/v1/audits</code></pre>
            <h2 class="text-2xl font-bold text-navy mt-8 mb-4">Endpoints</h2>
            <p class="mb-4">Our API allows you to trigger new audits, retrieve results, and manage your projects programmatically.</p>
        `
    },
    "gdpr-compliance": {
        title: "GDPR Compliance",
        category: "Security & Privacy",
        lastUpdated: "January 5, 2026",
        content: `
            <p class="mb-6">At AuditAI, we take data privacy seriously. This document outlines our commitment to GDPR compliance.</p>
            <h2 class="text-2xl font-bold text-navy mt-8 mb-4">Data Processing</h2>
            <p class="mb-4">We only collect the data necessary to provide our services. This includes your account information and the public website data we audit.</p>
            <h2 class="text-2xl font-bold text-navy mt-8 mb-4">Your Rights</h2>
            <p class="mb-4">Under GDPR, you have the right to access, rectify, or erase your personal data. You can exercise these rights through your account settings or by contacting our DPO.</p>
        `
    },
    "creating-an-account": {
        title: "Creating an Account",
        category: "Getting Started",
        lastUpdated: "January 12, 2026",
        content: `
            <p class="mb-6">Setting up your AuditAI account is the first step towards better SEO. Follow these steps to get started.</p>
            <h2 class="text-2xl font-bold text-navy mt-8 mb-4">Registration Process</h2>
            <p class="mb-4">Visit our signup page and enter your name, work email, and a secure password. You can also sign up using your Google or LinkedIn account for faster access.</p>
            <h2 class="text-2xl font-bold text-navy mt-8 mb-4">Email Verification</h2>
            <p class="mb-4">After signing up, check your inbox for a verification email. Click the link inside to activate your account. If you don't see it, check your spam folder or request a new one.</p>
        `
    },
    "dashboard-overview": {
        title: "Dashboard Overview",
        category: "Getting Started",
        lastUpdated: "January 14, 2026",
        content: `
            <p class="mb-6">Your dashboard is the control center for all your SEO audits. Here's a quick tour of its main features.</p>
            <h2 class="text-2xl font-bold text-navy mt-8 mb-4">The Main Navigation</h2>
            <ul class="space-y-4 mb-8">
                <li><strong>Overview:</strong> A bird's-eye view of your latest audits and overall health trends.</li>
                <li><strong>All Audits:</strong> A complete history of every scan you've performed.</li>
                <li><strong>Settings:</strong> Manage your profile, team members, and API keys.</li>
            </ul>
        `
    },
    "advanced-keyword-tracking": {
        title: "Advanced Keyword Tracking",
        category: "Tutorials",
        lastUpdated: "January 28, 2026",
        content: `
            <p class="mb-6">Learn how to track your rankings across different regions and devices with precision.</p>
            <h2 class="text-2xl font-bold text-navy mt-8 mb-4">Setting Up Keywords</h2>
            <p class="mb-4">Go to the Keywords tab in your project settings. Enter the terms you want to track, separated by commas. You can also upload a CSV file for bulk tracking.</p>
            <h2 class="text-2xl font-bold text-navy mt-8 mb-4">Geo-Targeting</h2>
            <p class="mb-4">For each keyword, you can specify a country or even a specific city to see localized search results.</p>
        `
    },
    "adding-your-team": {
        title: "Adding Your Team",
        category: "Getting Started",
        lastUpdated: "January 18, 2026",
        content: `
            <p class="mb-6">SEO is a team sport. Learn how to invite your colleagues and manage their permissions in AuditAI.</p>
            <h2 class="text-2xl font-bold text-navy mt-8 mb-4">Inviting Members</h2>
            <p class="mb-4">Navigate to <strong>Settings > Team</strong> and click 'Invite Member'. Enter their email address and select an appropriate role (Admin, Editor, or Viewer).</p>
            <h2 class="text-2xl font-bold text-navy mt-8 mb-4">Role Permissions</h2>
            <ul class="list-disc pl-6 space-y-2 mb-6 text-slate-600">
                <li><strong>Admin:</strong> Full access to audits, billing, and team management.</li>
                <li><strong>Editor:</strong> Can create audits and edit reports, but cannot access billing.</li>
                <li><strong>Viewer:</strong> Read-only access to reports and dashboard.</li>
            </ul>
        `
    },
    "crawl-budget-explained": {
        title: "Crawl Budget Explained",
        category: "Audits & Analysis",
        lastUpdated: "January 24, 2026",
        content: `
            <p class="mb-6">Crawl budget is the number of pages search engines will crawl on your site in a given period. Optimizing this ensures your most important content is indexed frequently.</p>
            <h2 class="text-2xl font-bold text-navy mt-8 mb-4">Improving Crawl Efficiency</h2>
            <p class="mb-4">To maximize your crawl budget, focus on removing duplicate content, fixing broken links, and ensuring your robots.txt file isn't blocking essential pages.</p>
        `
    },
    "mobile-usability": {
        title: "Mobile Usability",
        category: "Audits & Analysis",
        lastUpdated: "January 26, 2026",
        content: `
            <p class="mb-6">With mobile-first indexing, your mobile site's performance is critical for SEO. AuditAI checks for common mobile usability issues.</p>
            <h2 class="text-2xl font-bold text-navy mt-8 mb-4">Common Issues We Track</h2>
            <ul class="list-disc pl-6 space-y-2 mb-6 text-slate-600">
                <li>Touch elements too close together.</li>
                <li>Content wider than the screen.</li>
                <li>Text too small to read without zooming.</li>
                <li>Use of incompatible plugins (like Flash).</li>
            </ul>
        `
    },
    "payment-methods": {
        title: "Payment Methods",
        category: "Account & Billing",
        lastUpdated: "January 14, 2026",
        content: `
            <p class="mb-6">We support various payment methods to make your subscription management easy. All transactions are secure and encrypted using industry-standard protocols.</p>
            
            <h2 class="text-2xl font-bold text-navy mt-8 mb-6">Supported Payment Methods</h2>
            
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-10">
                <div class="flex flex-col items-center justify-center p-6 rounded-xl border border-slate-100 bg-white hover:shadow-lg transition-all group">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/d/d6/Visa_2021.svg" alt="Visa" class="h-6 w-auto mb-3" />
                    <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Credit/Debit</span>
                </div>
                
                <div class="flex flex-col items-center justify-center p-6 rounded-xl border border-slate-100 bg-white hover:shadow-lg transition-all group">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" class="h-10 w-auto mb-1" />
                    <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Mastercard</span>
                </div>

                <div class="flex flex-col items-center justify-center p-6 rounded-xl border border-slate-100 bg-white hover:shadow-lg transition-all group">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" alt="Amex" class="h-8 w-auto mb-2" />
                    <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Amex</span>
                </div>

                <div class="flex flex-col items-center justify-center p-6 rounded-xl border border-slate-100 bg-white hover:shadow-lg transition-all group">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Google_Pay_Logo_%282020%29.svg" alt="Google Pay" class="h-8 w-auto mb-2" />
                    <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Google Pay</span>
                </div>

                <div class="flex flex-col items-center justify-center p-6 rounded-xl border border-slate-100 bg-white hover:shadow-lg transition-all group">
                    <div class="h-8 mb-2 flex items-center justify-center">
                        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-8 w-auto">
                            <path d="M17.18 0.16l-9 14.83h-3.33H0l11.53 16.85h3.33h4.85l-5.66-8.29 8.2-13.45h3.33h4.85L17.18 0.16z" fill="#3395FF"/>
                            <path d="M13.86 19.36l-2.33-3.43 2.33-3.84 2.33 3.84-2.33 3.43z" fill="#002D58"/>
                        </svg>
                    </div>
                    <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Razorpay</span>
                </div>

                <div class="flex flex-col items-center justify-center p-6 rounded-xl border border-slate-100 bg-white hover:shadow-lg transition-all group">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" class="h-8 w-auto mb-2" />
                    <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">PayPal</span>
                </div>

                <div class="flex flex-col items-center justify-center p-6 rounded-xl border border-slate-100 bg-white hover:shadow-lg transition-all group">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg" alt="Apple Pay" class="h-8 w-auto mb-2" />
                    <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Apple Pay</span>
                </div>

                <div class="flex flex-col items-center justify-center p-6 rounded-xl border border-slate-100 bg-white hover:shadow-lg transition-all group">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" class="h-8 w-auto mb-2" />
                    <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">UPI Payments</span>
                </div>
            </div>

            <div class="bg-blue-50/50 p-8 rounded-3xl border border-blue-100 mb-8">
                <div class="flex items-start gap-4">
                    <div class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                        <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                    </div>
                    <div>
                        <h4 class="text-navy font-bold text-lg mb-1">Secure Transactions</h4>
                        <p class="text-slate-600 mb-0">Local currency payments are processed via Razorpay for Indian users and Stripe for international transactions. We never store your full card details on our servers.</p>
                    </div>
                </div>
            </div>
        `
    },
    "invoices-receipts": {
        title: "Invoices & Receipts",
        category: "Account & Billing",
        lastUpdated: "January 16, 2026",
        content: `
            <p class="mb-6">Download your past invoices and manage your billing history.</p>
            <h2 class="text-2xl font-bold text-navy mt-8 mb-4">Finding Your Invoices</h2>
            <p class="mb-4">Go to <strong>Settings > Billing</strong> and scroll down to the 'Invoices' section. You can download each invoice as a PDF for your records.</p>
        `
    },
    "upgrading-plan": {
        title: "Upgrading Plan",
        category: "Account & Billing",
        lastUpdated: "January 18, 2026",
        content: `
            <p class="mb-6">Scale your SEO capabilities by upgrading to a higher-tier plan.</p>
            <h2 class="text-2xl font-bold text-navy mt-8 mb-4">How to Upgrade</h2>
            <p class="mb-4">Visit the <strong>Pricing</strong> page or go to your <strong>Billing</strong> settings to view available plans. Upgrades take effect immediately, and costs are prorated.</p>
        `
    },
    "slack-integration": {
        title: "Slack Integration",
        category: "API & Integrations",
        lastUpdated: "January 22, 2026",
        content: `
            <p class="mb-6">Get real-time SEO alerts directly in your Slack channels.</p>
            <h2 class="text-2xl font-bold text-navy mt-8 mb-4">Setup Instructions</h2>
            <p class="mb-4">Enable the Slack integration in <strong>Settings > Integrations</strong>. You can then choose which events (like 'Audit Complete' or 'Score Drop') trigger a notification.</p>
        `
    },
    "jira-integration": {
        title: "Jira Integration",
        category: "API & Integrations",
        lastUpdated: "January 24, 2026",
        content: `
            <p class="mb-6">Convert SEO issues into technical tasks for your engineering team with our Jira integration.</p>
            <h2 class="text-2xl font-bold text-navy mt-8 mb-4">Creating Tasks</h2>
            <p class="mb-4">Once connected, you'll see a 'Create Jira Ticket' button next to every identified issue in your audit reports.</p>
        `
    },
    "webhooks": {
        title: "Webhooks",
        category: "API & Integrations",
        lastUpdated: "January 26, 2026",
        content: `
            <p class="mb-6">Use webhooks to build custom workflows based on your audit data.</p>
            <h2 class="text-2xl font-bold text-navy mt-8 mb-4">Configuring Webhooks</h2>
            <p class="mb-4">Define your endpoint URL in <strong>Settings > API</strong>. We'll send a POST request with JSON data whenever an audit finishes.</p>
        `
    },
    "data-encryption": {
        title: "Data Encryption",
        category: "Security & Privacy",
        lastUpdated: "January 10, 2026",
        content: `
            <p class="mb-6">Security is our top priority. We use industry-standard encryption to protect your data.</p>
            <h2 class="text-2xl font-bold text-navy mt-8 mb-4">In Transit and At Rest</h2>
            <p class="mb-4">All data transmitted between your browser and our servers is encrypted using TLS 1.3. Your database records are encrypted at rest using AES-256.</p>
        `
    },
    "soc-2-report": {
        title: "SOC 2 Report",
        category: "Security & Privacy",
        lastUpdated: "January 12, 2026",
        content: `
            <p class="mb-6">AuditAI is SOC 2 Type II compliant, ensuring we maintain high standards for security, availability, and processing integrity.</p>
            <h2 class="text-2xl font-bold text-navy mt-8 mb-4">Requesting the Report</h2>
            <p class="mb-4">Enterprise customers can request our latest SOC 2 report by contacting our security team at security@auditai.com.</p>
        `
    },
    "privacy-policy": {
        title: "Privacy Policy",
        category: "Security & Privacy",
        lastUpdated: "January 14, 2026",
        content: `
            <p class="mb-6">Our commitment to protecting your personal information.</p>
            <h2 class="text-2xl font-bold text-navy mt-8 mb-4">Information We Collect</h2>
            <p class="mb-4">We collect account details and anonymous usage statistics to improve our services. We never sell your data to third parties.</p>
        `
    },
    "competitor-analysis-101": {
        title: "Competitor Analysis 101",
        category: "Tutorials",
        lastUpdated: "January 20, 2026",
        content: `
            <p class="mb-6">Learn how to benchmark your site against your top competitors.</p>
            <h2 class="text-2xl font-bold text-navy mt-8 mb-4">Finding Your Rivals</h2>
            <p class="mb-4">AuditAI automatically identifies your top 5 SEO competitors based on shared keyword rankings. You can also manually add specific domains you want to track.</p>
        `
    },
    "white-label-reporting": {
        title: "White-label Reporting",
        category: "Tutorials",
        lastUpdated: "January 22, 2026",
        content: `
            <p class="mb-6">Create professional audit reports with your own branding.</p>
            <h2 class="text-2xl font-bold text-navy mt-8 mb-4">Customizing Reports</h2>
            <p class="mb-4">Upload your company logo and choose your brand colors in <strong>Settings > Branding</strong>. These styles will be applied to all PDF and web reports you generate.</p>
        `
    },
    "local-seo-audit": {
        title: "Local SEO Audit",
        category: "Tutorials",
        lastUpdated: "January 24, 2026",
        content: `
            <p class="mb-6">Optimize your site for local search results and Google Maps.</p>
            <h2 class="text-2xl font-bold text-navy mt-8 mb-4">Local Ranking Factors</h2>
            <p class="mb-4">We audit your Google Business Profile integration, NAP (Name, Address, Phone) consistency, and local citation health.</p>
        `
    }
};
