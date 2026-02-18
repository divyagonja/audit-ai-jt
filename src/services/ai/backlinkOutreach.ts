import { supabase } from "@/integrations/supabase/client";

export interface OutreachCampaign {
    campaignId: string;
    targetUrl: string;
    yourAssetUrl: string;
    targetName: string; // e.g., 'Editor' or a specific name
    campaignType: 'Guest Post' | 'Resource Link' | 'Skyscraper' | 'Broken Link' | 'Custom';
    subjectLines: string[];
    emailBody: string;
    followUp: string;
    personalizationHook: string; // What specific thing about their content did we reference?
}

export async function generateOutreach(
    targetUrl: string,
    yourAssetUrl: string,
    campaignType: 'Guest Post' | 'Resource Link' | 'Skyscraper' | 'Broken Link' | 'Custom' = 'Resource Link',
    targetName: string = "Editor"
): Promise<OutreachCampaign> {
    const prompt = `Act as an expert Outreach Specialist. I need a personalized email campaign for ${campaignType}.
    Target URL: ${targetUrl}
    My Asset URL: ${yourAssetUrl}
    Target Name: ${targetName}

    Analyze the context (assume generic context based on URLs if not accessible). Create a highly personalized, non-spammy outreach email.
    Identify a specific "hook" - a compliment or observation about their content to build rapport.

    Return the result in valid JSON format:
    {
        "subjectLines": ["Subject Option 1", "Subject Option 2", "Subject Option 3"],
        "emailBody": "Full email body text with placeholders like [Name] if needed, but try to use ${targetName}. Include \\n for line breaks.",
        "followUp": "A short, polite follow-up email text 3 days later",
        "personalizationHook": "The specific observation made about their content"
    }`;

    try {
        const { data, error } = await supabase.functions.invoke('ai-chat', {
            body: {
                mode: "chat",
                messages: [{ role: "user", content: prompt }]
            }
        });

        if (error) throw error;

        const result = data.choices[0]?.message?.content;
        if (!result) throw new Error("Empty response from AI");

        const jsonMatch = result.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            return {
                campaignId: crypto.randomUUID(),
                targetUrl,
                yourAssetUrl,
                targetName,
                campaignType,
                ...parsed
            };
        } else {
            throw new Error("Failed to parse AI response as JSON");
        }

    } catch (error) {
        console.error("Outreach Generator Error:", error);
        return {
            campaignId: "mock-outreach-1",
            targetUrl,
            yourAssetUrl,
            targetName,
            campaignType,
            subjectLines: [
                `Question about your article on ${targetUrl.split('/')[2] || 'topic'}`,
                `Quick favor regarding your content`,
                `Resource suggestion for ${targetName}`
            ],
            emailBody: `Hi ${targetName},\n\nI was just reading your article on ${targetUrl} and really enjoyed your take on the topic. The point about specifics was particularly insightful.\n\nI noticed you linked to a few resources about the industry. I recently published a comprehensive guide on [Your Topic] that digs deeper into the subject.\n\nHere it is: ${yourAssetUrl}\n\nIt might be a great addition to your resource list for your readers. No pressure at all, just thought it might add value.\n\nThanks,\n[Your Name]`,
            followUp: `Hi ${targetName},\n\nJust bumping this to the top of your inbox in case you missed it. Would love to hear your thoughts on the resource I shared!\n\nBest,\n[Your Name]`,
            personalizationHook: "Complimented their specific take on the topic."
        };
    }
}
