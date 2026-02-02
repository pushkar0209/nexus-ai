
import React from 'react';
import { Tag } from 'lucide-react';

interface Props {
    keywords: string[];
}

export function KeywordTags({ keywords }: Props) {
    return (
        <div className="flex flex-wrap gap-2 items-center">
            <div className="flex items-center gap-1 text-gray-400 mr-2">
                <Tag size={14} />
                <span className="text-xs font-medium uppercase">Smart Tags</span>
            </div>
            {keywords.map((keyword, i) => (
                <span
                    key={i}
                    className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/5 rounded-full text-xs text-indigo-300 font-medium cursor-pointer transition-colors"
                >
                    #{keyword}
                </span>
            ))}
        </div>
    );
}
