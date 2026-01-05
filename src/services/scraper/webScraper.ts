import axios from 'axios';
import * as cheerio from 'cheerio';

export interface PageData {
    url: string;
    title: string;
    description: string;
    headings: {
        h1: string[];
        h2: string[];
        h3: string[];
    };
    images: {
        total: number;
        withoutAlt: number;
        list: Array<{ src: string; alt: string | null }>;
    };
    links: {
        total: number;
        internal: number;
        external: number;
        broken: number;
    };
    content: string;
    meta: {
        charset?: string;
        viewport?: string;
        robots?: string;
        canonical?: string;
        ogTitle?: string;
        ogDescription?: string;
        ogImage?: string;
    };
    performance: {
        loadTime?: number;
        size?: number;
    };
}

/**
 * Scrape and analyze a webpage
 */
export async function scrapeWebPage(url: string): Promise<PageData> {
    try {
        const startTime = Date.now();

        // Fetch the page
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            },
            timeout: 10000,
        });

        const loadTime = Date.now() - startTime;
        const html = response.data;
        const $ = cheerio.load(html);

        // Extract title
        const title = $('title').text().trim() || '';

        // Extract meta description
        const description = $('meta[name="description"]').attr('content') || '';

        // Extract headings
        const headings = {
            h1: $('h1').map((_, el) => $(el).text().trim()).get(),
            h2: $('h2').map((_, el) => $(el).text().trim()).get(),
            h3: $('h3').map((_, el) => $(el).text().trim()).get(),
        };

        // Extract images
        const imageElements = $('img');
        const images = {
            total: imageElements.length,
            withoutAlt: imageElements.filter((_, el) => !$(el).attr('alt')).length,
            list: imageElements.map((_, el) => ({
                src: $(el).attr('src') || '',
                alt: $(el).attr('alt') || null,
            })).get().slice(0, 10), // Limit to first 10
        };

        // Extract links
        const linkElements = $('a[href]');
        const links = {
            total: linkElements.length,
            internal: 0,
            external: 0,
            broken: 0,
        };

        linkElements.each((_, el) => {
            const href = $(el).attr('href') || '';
            if (href.startsWith('http') && !href.includes(new URL(url).hostname)) {
                links.external++;
            } else if (href.startsWith('/') || href.startsWith('#') || !href.startsWith('http')) {
                links.internal++;
            }
        });

        // Extract content (first 2000 characters)
        const content = $('body').text().replace(/\s+/g, ' ').trim().substring(0, 2000);

        // Extract meta tags
        const meta = {
            charset: $('meta[charset]').attr('charset'),
            viewport: $('meta[name="viewport"]').attr('content'),
            robots: $('meta[name="robots"]').attr('content'),
            canonical: $('link[rel="canonical"]').attr('href'),
            ogTitle: $('meta[property="og:title"]').attr('content'),
            ogDescription: $('meta[property="og:description"]').attr('content'),
            ogImage: $('meta[property="og:image"]').attr('content'),
        };

        // Performance data
        const performance = {
            loadTime,
            size: html.length,
        };

        return {
            url,
            title,
            description,
            headings,
            images,
            links,
            content,
            meta,
            performance,
        };
    } catch (error) {
        console.error('Error scraping webpage:', error);
        throw new Error(`Failed to scrape ${url}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

/**
 * Extract specific elements from a page
 */
export async function extractPageElements(url: string, selectors: string[]): Promise<Record<string, string[]>> {
    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            },
            timeout: 10000,
        });

        const $ = cheerio.load(response.data);
        const results: Record<string, string[]> = {};

        selectors.forEach(selector => {
            results[selector] = $(selector).map((_, el) => $(el).text().trim()).get();
        });

        return results;
    } catch (error) {
        console.error('Error extracting elements:', error);
        throw new Error('Failed to extract page elements');
    }
}

/**
 * Check if a URL is accessible
 */
export async function checkUrlStatus(url: string): Promise<{ status: number; ok: boolean; redirected: boolean }> {
    try {
        const response = await axios.head(url, {
            maxRedirects: 5,
            validateStatus: () => true, // Don't throw on any status
        });

        return {
            status: response.status,
            ok: response.status >= 200 && response.status < 300,
            redirected: response.request.res.responseUrl !== url,
        };
    } catch (error) {
        return {
            status: 0,
            ok: false,
            redirected: false,
        };
    }
}
