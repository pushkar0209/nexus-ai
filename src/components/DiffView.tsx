
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface DiffViewProps {
    original: string;
    modified: string;
}

export function DiffView({ original, modified }: DiffViewProps) {
    // Simple word-by-word comparison for visual effect
    // In a real app, use 'diff' package
    const originalWords = original.split(' ');
    const modifiedWords = modified.split(' ');

    // Find dirty heuristic diff
    // This is purely for visual demonstration

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
            {/* Original */}
            <div className="p-4 bg-red-900/10 border border-red-500/20 rounded-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 px-2 py-1 bg-red-500/20 text-red-300 text-xs font-bold rounded-br-lg">
                    ORIGINAL
                </div>
                <p className="mt-6 text-gray-300 leading-relaxed whitespace-pre-wrap font-serif">
                    {originalWords.map((word, i) => {
                        const isRemoved = !modified.includes(word.replace(/[.,]/g, ''));
                        return (
                            <span key={i} className={isRemoved ? "bg-red-500/30 text-red-200 line-through decoration-red-400 mx-0.5 px-0.5 rounded" : "mx-0.5"}>
                                {word}
                            </span>
                        );
                    })}
                </p>
            </div>

            {/* Arrow for mobile/desktop layout */}
            <div className="md:hidden flex justify-center text-gray-500">
                <ArrowRight size={24} className="rotate-90" />
            </div>

            {/* Modified */}
            <div className="p-4 bg-emerald-900/10 border border-emerald-500/20 rounded-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 px-2 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-bold rounded-br-lg">
                    NEUTRALIZED
                </div>
                <p className="mt-6 text-gray-300 leading-relaxed whitespace-pre-wrap font-serif">
                    {modifiedWords.map((word, i) => {
                        const isAboslutelyNew = !original.includes(word.replace(/[.,]/g, ''));
                        return (
                            <span key={i} className={isAboslutelyNew ? "bg-emerald-500/30 text-emerald-200 mx-0.5 px-0.5 rounded" : "mx-0.5"}>
                                {word}
                            </span>
                        );
                    })}
                </p>
            </div>
        </div>
    );
}
