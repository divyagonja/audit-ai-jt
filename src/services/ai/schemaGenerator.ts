import { supabase } from "@/integrations/supabase/client";

export enum SchemaType {
    Article = "Article",
    Product = "Product",
    FAQ = "FAQPage",
    HowTo = "HowTo",
    LocalBusiness = "LocalBusiness",
    Review = "Review",
    Organization = "Organization",
    Person = "Person",
}

export interface SchemaField {
    key: string;
    label: string;
    type: "text" | "textarea" | "array" | "object";
    placeholder?: string;
    description?: string;
    required?: boolean;
}

export const SCHEMA_DEFINITIONS: Record<SchemaType, SchemaField[]> = {
    [SchemaType.Article]: [
        { key: "headline", label: "Headline", type: "text", required: true, placeholder: "Article Title" },
        { key: "description", label: "Description", type: "textarea", required: true, placeholder: "Short summary of the article" },
        { key: "author", label: "Author Name", type: "text", required: true, placeholder: "John Doe" },
        { key: "datePublished", label: "Date Published", type: "text", required: true, placeholder: "YYYY-MM-DD" },
        { key: "image", label: "Image URL", type: "text", required: true, placeholder: "https://example.com/image.jpg" },
    ],
    [SchemaType.Product]: [
        { key: "name", label: "Product Name", type: "text", required: true, placeholder: "Super Widget 3000" },
        { key: "image", label: "Image URL", type: "text", required: true, placeholder: "https://example.com/product.jpg" },
        { key: "description", label: "Description", type: "textarea", required: true, placeholder: "Product description..." },
        { key: "sku", label: "SKU", type: "text", required: false, placeholder: "SW-3000" },
        { key: "brand", label: "Brand", type: "text", required: true, placeholder: "Acme Corp" },
        { key: "price", label: "Price", type: "text", required: true, placeholder: "99.99" },
        { key: "currency", label: "Currency", type: "text", required: true, placeholder: "USD" },
    ],
    [SchemaType.FAQ]: [
        { key: "questions", label: "Questions & Answers", type: "array", required: true, description: "List of Question and Answer pairs" },
    ],
    [SchemaType.HowTo]: [
        { key: "name", label: "How-To Title", type: "text", required: true, placeholder: "How to tie a tie" },
        { key: "description", label: "Description", type: "textarea", required: true, placeholder: "Step-by-step guide..." },
        { key: "steps", label: "Steps", type: "array", required: true, description: "List of steps" },
        { key: "totalTime", label: "Total Time", type: "text", required: false, placeholder: "PT30M (30 Minutes)" },
    ],
    [SchemaType.LocalBusiness]: [
        { key: "name", label: "Business Name", type: "text", required: true, placeholder: "Joe's Pizza" },
        { key: "image", label: "Image URL", type: "text", required: true, placeholder: "https://example.com/store.jpg" },
        { key: "telephone", label: "Phone Number", type: "text", required: true, placeholder: "+1-555-0199" },
        { key: "address", label: "Address Object", type: "object", required: true, description: "{ \"streetAddress\": \"...\", \"addressLocality\": \"...\" }" },
        { key: "priceRange", label: "Price Range", type: "text", required: true, placeholder: "$$" },
    ],
    [SchemaType.Review]: [
        { key: "itemReviewed", label: "Item Reviewed", type: "text", required: true, placeholder: "Restaurant Name" },
        { key: "author", label: "Reviewer Name", type: "text", required: true, placeholder: "Jane Doe" },
        { key: "reviewRating", label: "Rating (1-5)", type: "text", required: true, placeholder: "5" },
        { key: "reviewBody", label: "Review Text", type: "textarea", required: true, placeholder: "Great experience..." },
    ],
    [SchemaType.Organization]: [
        { key: "name", label: "Organization Name", type: "text", required: true, placeholder: "Google" },
        { key: "url", label: "URL", type: "text", required: true, placeholder: "https://google.com" },
        { key: "logo", label: "Logo URL", type: "text", required: true, placeholder: "https://google.com/logo.png" },
        { key: "sameAs", label: "Social Profiles", type: "array", required: false, description: "List of social profile URLs" },
    ],
    [SchemaType.Person]: [
        { key: "name", label: "Name", type: "text", required: true, placeholder: "Elon Musk" },
        { key: "jobTitle", label: "Job Title", type: "text", required: true, placeholder: "CEO" },
        { key: "url", label: "Website URL", type: "text", required: true, placeholder: "https://twitter.com/elonmusk" },
    ],
};

export async function generateSchema(type: SchemaType, inputs: Record<string, any>): Promise<string> {
    const prompt = `Act as an expert Technical SEO Specialist. I need valid JSON-LD Schema Markup for a "${type}".
    
    Here are the details provided by the user:
    ${JSON.stringify(inputs, null, 2)}

    Your goal is to generate the most complete, error-free JSON-LD code possible.
    If specific optional fields (like 'aggregateRating' for Product or 'openingHours' for LocalBusiness) are missing but relevant for this schema type, add realistic placeholder or best-practice defaults if they enhance the result, OR strictly follow the inputs if validation requires it.
    
    CRITICAL: Return ONLY the JSON-LD code block wrapped in <script type="application/ld+json">...</script> tags. Do not include markdown formatting or explanation text outside the script tags.
    `;

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

        // Extract the script tag content or just the JSON
        const scriptMatch = result.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
        if (scriptMatch) {
            return scriptMatch[0]; // Return full script tag
        }

        // Fallback: try to find just the JSON object
        const jsonMatch = result.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return `<script type="application/ld+json">\n${jsonMatch[0]}\n</script>`;
        }

        return result; // Return raw if no match found (hoping it's valid)

    } catch (error) {
        console.error("Schema Generator Error:", error);
        // Basic Fallback Logic based on type
        return generateFallbackSchema(type, inputs);
    }
}

function generateFallbackSchema(type: SchemaType, inputs: Record<string, any>): string {
    let schema: any = { "@context": "https://schema.org", "@type": type };

    if (type === SchemaType.Article) {
        schema.headline = inputs.headline || "Article Headline";
        schema.description = inputs.description || "Article Description";
        schema.author = { "@type": "Person", "name": inputs.author || "Author Name" };
        schema.datePublished = inputs.datePublished || new Date().toISOString();
        schema.image = inputs.image || "https://example.com/image.jpg";
    }
    else if (type === SchemaType.Product) {
        schema.name = inputs.name || "Product Name";
        schema.image = inputs.image || [];
        schema.description = inputs.description || "Product Desc";
        schema.sku = inputs.sku || "SKU123";
        schema.brand = { "@type": "Brand", "name": inputs.brand || "Brand Name" };
        schema.offers = {
            "@type": "Offer",
            "url": "https://example.com/product",
            "priceCurrency": inputs.currency || "USD",
            "price": inputs.price || "0.00",
            "itemCondition": "https://schema.org/NewCondition",
            "availability": "https://schema.org/InStock"
        };
    }
    // ... add other fallbacks as needed

    return `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`;
}
