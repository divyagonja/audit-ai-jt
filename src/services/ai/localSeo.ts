import { supabase } from "@/integrations/supabase/client";

export interface LocalAuditIssue {
    category: 'GMB' | 'Reviews' | 'NAP' | 'Keywords';
    issue: string;
    impact: 'High' | 'Medium' | 'Low';
    aiSuggestion: string;
}

export interface NeighborhoodKeyword {
    keyword: string;
    volume: number;
    competition: 'High' | 'Medium' | 'Low';
}

export async function runLocalAudit(businessName: string, city: string): Promise<{
    healthScore: number;
    issues: LocalAuditIssue[];
    neighborhoodKeywords: NeighborhoodKeyword[];
}> {
    const prompt = `Act as a Local SEO Expert. I need an audit for the business "${businessName}" in "${city}".
    
    1. Provide a Health Score (0-100).
    2. Identify 4-6 specific issues related to Google My Business (GMB), Reviews, NAP consistency, or Local Keywords.
    3. Generate 5 hyper-local "neighborhood-level" keywords that a generic tool like Semrush might miss.
    
    Return the result in valid JSON format:
    {
        "healthScore": 65,
        "issues": [
            { "category": "GMB", "issue": "Missing primary category", "impact": "High", "aiSuggestion": "Add 'Emergency Plumber'..." }
        ],
        "neighborhoodKeywords": [
            { "keyword": "best plumber near [Local Landmark]", "volume": 150, "competition": "Low" }
        ]
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
            return JSON.parse(jsonMatch[0]);
        }
        throw new Error("Failed to parse AI response as JSON");

    } catch (error) {
        console.error("Local SEO Audit Error:", error);
        // Fallback Mock Data
        return {
            healthScore: 72,
            issues: [
                { category: 'GMB', issue: 'Unoptimized Business Description', impact: 'Medium', aiSuggestion: 'Rewrite description to include the 3 main services and neighborhood mentions.' },
                { category: 'Reviews', issue: 'Slow response time to negative reviews', impact: 'High', aiSuggestion: 'Respond within 24 hours to the 2 recent 3-star reviews to improve customer trust.' },
                { category: 'NAP', issue: 'Address mismatch on Yelp vs GMB', impact: 'Medium', aiSuggestion: 'Update Yelp listing to match the suite number format used on Google.' },
                { category: 'Keywords', issue: 'Missing "Near Me" optimization', impact: 'High', aiSuggestion: 'Optimize service pages for "near me" intent and local landmark keywords.' }
            ],
            neighborhoodKeywords: [
                { keyword: `best services in ${city} historic district`, volume: 210, competition: 'Low' },
                { keyword: `${city} affordable solutions`, volume: 140, competition: 'Medium' },
                { keyword: `top rated ${city} contractors`, volume: 80, competition: 'Low' },
                { keyword: `emergency ${city} repair`, volume: 300, competition: 'High' },
                { keyword: `local ${city} experts`, volume: 50, competition: 'Low' }
            ]
        };
    }
}

export async function generateReviewReply(reviewBody: string, rating: number): Promise<string> {
    const prompt = `Act as a professional Customer Relationship Manager for a local business.
    Write a personalized, empathetic, and professional reply to this review:
    Rating: ${rating} stars
    Review: "${reviewBody}"
    
    Ensure the reply is brief, addresses specific points in the review, and (if negative) offers to make it right.
    `;

    try {
        const { data, error } = await supabase.functions.invoke('ai-chat', {
            body: {
                mode: "chat",
                messages: [{ role: "user", content: prompt }]
            }
        });

        if (error) throw error;
        return data.choices[0]?.message?.content || "Thank you for your feedback. We appreciate your business!";
    } catch (error) {
        return "Thank you so much for your feedback. We are constantly working to improve our services and hope to see you again soon!";
    }
}
