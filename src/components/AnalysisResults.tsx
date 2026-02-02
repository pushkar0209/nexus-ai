
import React from 'react';
import { AnalysisResult } from '@/lib/analysis-engine';
import { BiasMeter } from './BiasMeter';
import { FactCheckCard } from './FactCheckCard';
import { AdaptationTabs } from './AdaptationTabs';
import { BiasRadar } from './BiasRadar';
import { Lightbulb, Info, Wand2 } from 'lucide-react';

import { HeadlineGenerator } from './HeadlineGenerator';
import { KeywordTags } from './KeywordTags';

interface Props {
    data: AnalysisResult;
    onApplyFix?: (suggestion: string) => void;
    originalInput?: string;
}

export function AnalysisResults({ data, onApplyFix, originalInput }: Props) {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 space-y-6">

            {/* Creative Suite Row */}
            <div className="space-y-4">
                {data.headlines && <HeadlineGenerator headlines={data.headlines} />}
                {data.seo_keywords && <KeywordTags keywords={data.seo_keywords} />}
            </div>

            {/* Top Row: Radar & Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                {/* Radar Chart - Takes up 1 Col */}
                <div className="lg:col-span-1">
                    <BiasRadar data={data.content_analysis.bias_radar_data} />
                </div>

                {/* Bias Meter & Tone - Takes up 1 Col */}
                <div className="space-y-6 lg:col-span-1">
                    <BiasMeter level={data.content_analysis.bias_level} types={data.content_analysis.bias_type} />

                    <div className="p-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md">
                        <div className="flex items-center gap-2 mb-2">
                            <Info size={16} className="text-blue-400" />
                            <h3 className="text-sm font-semibold text-gray-200">Emotional Tone</h3>
                        </div>
                        <p className="text-lg font-medium text-white">{data.content_analysis.emotional_tone}</p>
                    </div>
                </div>

                {/* Fact Check - Takes up 1 Col */}
                <div className="lg:col-span-1">
                    <FactCheckCard
                        verified={data.fact_check.verified_facts}
                        disputed={data.fact_check.disputed_claims}
                        unverifiable={data.fact_check.unverifiable_claims}
                    />
                </div>

                {/* Editorial Suggestions - Takes up 1 Col */}
                <div className="lg:col-span-1 p-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md overflow-hidden flex flex-col">
                    <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider mb-4 border-b border-white/5 pb-2 flex items-center gap-2">
                        <Lightbulb size={16} className="text-yellow-400" /> Editorial Tips
                    </h3>
                    <div className="space-y-4 overflow-y-auto custom-scrollbar flex-1">
                        {data.editorial_suggestions.map((suggestion, idx) => (
                            <div key={idx} className="bg-black/20 p-3 rounded-lg border border-white/5 group">
                                <div className="flex justify-between items-start mb-1">
                                    <span className="text-xs font-bold text-rose-300 uppercase">{suggestion.issue}</span>
                                </div>
                                <p className="text-sm text-gray-200 mb-2 font-medium">"{suggestion.recommendation}"</p>

                                {onApplyFix && suggestion.issue.toLowerCase().includes('adjective') && (
                                    <button
                                        onClick={() => onApplyFix(suggestion.recommendation)}
                                        className="mb-2 w-full py-1.5 flex items-center justify-center gap-2 bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 text-xs rounded transition-colors border border-indigo-500/30"
                                    >
                                        <Wand2 size={12} /> Apply Smart Fix
                                    </button>
                                )}

                                <p className="text-xs text-gray-400 italic border-l-2 border-white/10 pl-2">
                                    Why: {suggestion.why}
                                </p>
                            </div>
                        ))}
                        {data.editorial_suggestions.length === 0 && (
                            <p className="text-sm text-gray-500 italic">No suggestions. Great job!</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Bottom Row: Content Adaptation */}
            <div className="w-full">
                <h3 className="text-xl font-bold text-white mb-4">Content Adaptation & Smart Rewrite</h3>
                <AdaptationTabs
                    content={data.adapted_content}
                    neutralizedText={data.neutralized_text}
                    multi_tone_rewrites={data.multi_tone_rewrites}
                    originalText={originalInput}
                    headlines={data.headlines}
                    tags={data.seo_keywords}
                />
            </div>

        </div>
    );
}
