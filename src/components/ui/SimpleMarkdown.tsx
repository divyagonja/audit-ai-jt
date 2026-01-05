import React from 'react';
import { cn } from '@/lib/utils';

interface SimpleMarkdownProps {
    content: string;
    className?: string;
}

const parseInline = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={index} className="font-bold text-slate-900">{part.slice(2, -2)}</strong>;
        }
        return <span key={index}>{part}</span>;
    });
};

export const SimpleMarkdown: React.FC<SimpleMarkdownProps> = ({ content, className }) => {
    if (!content) return null;

    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Headings
        if (line.startsWith('#')) {
            const match = line.match(/^(#{1,6})\s+(.*)$/);
            if (match) {
                const level = match[1].length;
                const text = match[2];
                const Component = `h${level}` as keyof JSX.IntrinsicElements;
                const classes = {
                    1: "text-2xl font-bold mt-6 mb-4 text-slate-900",
                    2: "text-xl font-bold mt-5 mb-3 text-slate-900",
                    3: "text-lg font-bold mt-4 mb-2 text-slate-900",
                    4: "text-base font-bold mt-3 mb-2 text-slate-900",
                    5: "text-sm font-bold mt-2 mb-1 text-slate-900",
                    6: "text-xs font-bold mt-2 mb-1 text-slate-900",
                }[level] || "";

                elements.push(<Component key={i} className={classes}>{parseInline(text)}</Component>);
                continue;
            }
        }

        // List Items
        if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
            const text = line.trim().substring(2);
            elements.push(
                <div key={i} className="flex gap-2 ml-1 mb-1 items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
                    <span className="text-slate-700 leading-relaxed">{parseInline(text)}</span>
                </div>
            );
            continue;
        }

        // Numbered Lists (basic support)
        if (/^\d+\.\s/.test(line.trim())) {
            const match = line.trim().match(/^(\d+)\.\s+(.*)$/);
            if (match) {
                elements.push(
                    <div key={i} className="flex gap-2 ml-1 mb-1 items-start">
                        <span className="font-bold text-slate-500 text-sm mt-0.5 min-w-[1.2rem]">{match[1]}.</span>
                        <span className="text-slate-700 leading-relaxed">{parseInline(match[2])}</span>
                    </div>
                );
                continue;
            }
        }

        // Empty lines (spacing)
        if (line.trim() === '') {
            elements.push(<div key={i} className="h-2" />);
            continue;
        }

        // Regular Paragraphs
        elements.push(
            <p key={i} className="text-slate-700 leading-relaxed mb-auto">
                {parseInline(line)}
            </p>
        );
    }

    return (
        <div className={cn("text-sm space-y-1", className)}>
            {elements}
        </div>
    );
};

export default SimpleMarkdown;
