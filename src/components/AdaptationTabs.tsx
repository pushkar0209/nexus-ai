"use client";
import React, { useState } from 'react';
import { Video, Mic, Globe, Copy, FileDiff, Share2, Sparkles } from 'lucide-react';
import { useTypewriter } from '@/hooks/useTypewriter';
import { DiffView } from './DiffView';
import { SocialPreview } from './SocialPreview';
import { AudioPlayer } from './AudioPlayer';

interface AdaptationProps {
    content: {
        short_reel_script: string;
        podcast_summary: string;
        regional_articles: Array<{
            language: string;
            text: string;
        }>;
    },
    neutralizedText?: string;
    multi_tone_rewrites?: {
        neutral: string;
        professional: string;
        gen_z: string;
        concise: string;
    };
    originalText?: string;
    headlines?: { viral: string; seo: string; neutral: string };
    tags?: string[];
}

export function AdaptationTabs({ content, neutralizedText, multi_tone_rewrites, originalText, headlines, tags }: AdaptationProps) {
    const [activeTab, setActiveTab] = useState<'reel' | 'podcast' | 'article' | 'rewrite' | 'social'>('rewrite');
    const [activeTone, setActiveTone] = useState<'neutral' | 'professional' | 'gen_z' | 'concise'>('neutral');

    // Streaming Effects
    const { displayText: reelText, isTyping: isReelTyping } = useTypewriter(activeTab === 'reel' ? content.short_reel_script : '', 10);
    const { displayText: podcastText, isTyping: isPodcastTyping } = useTypewriter(activeTab === 'podcast' ? content.podcast_summary : '', 20);

    const getCurrentRewrite = () => {
        if (!multi_tone_rewrites) return neutralizedText || "";
        return multi_tone_rewrites[activeTone];
    };

    return (
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden backdrop-blur-md flex flex-col h-full min-h-[500px]">
            <div className="flex border-b border-white/10 overflow-x-auto">
                <button
                    onClick={() => setActiveTab('rewrite')}
                    className={`flex-1 py-3 px-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors min-w-[120px] ${activeTab === 'rewrite' ? 'bg-white/10 text-emerald-400 border-b-2 border-emerald-400' : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                >
                    <FileDiff size={16} /> Smart Rewrite
                </button>
                <button
                    onClick={() => setActiveTab('social')}
                    className={`flex-1 py-3 px-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors min-w-[120px] ${activeTab === 'social' ? 'bg-white/10 text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                >
                    <Share2 size={16} /> Social
                </button>
                <button
                    onClick={() => setActiveTab('reel')}
                    className={`flex-1 py-3 px-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors min-w-[120px] ${activeTab === 'reel' ? 'bg-white/10 text-white border-b-2 border-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                >
                    <Video size={16} /> Short Reel
                </button>
                <button
                    onClick={() => setActiveTab('podcast')}
                    className={`flex-1 py-3 px-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors min-w-[120px] ${activeTab === 'podcast' ? 'bg-white/10 text-white border-b-2 border-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                >
                    <Mic size={16} /> Podcast
                </button>
                <button
                    onClick={() => setActiveTab('article')}
                    className={`flex-1 py-3 px-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors min-w-[120px] ${activeTab === 'article' ? 'bg-white/10 text-white border-b-2 border-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                >
                    <Globe size={16} /> Regional
                </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 custom-scrollbar relative">

                {activeTab === 'rewrite' && (
                    <div className="h-full animate-in fade-in zoom-in-95 duration-300 flex flex-col">
                        {/* Tone Selector */}
                        <div className="flex gap-2 mb-4 p-1 bg-black/20 rounded-lg w-fit">
                            {(['neutral', 'professional', 'gen_z', 'concise'] as const).map(tone => (
                                <button
                                    key={tone}
                                    onClick={() => setActiveTone(tone)}
                                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${activeTone === tone ? 'bg-emerald-500/20 text-emerald-300 shadow-sm' : 'text-gray-400 hover:text-white'}`}
                                >
                                    {tone.charAt(0).toUpperCase() + tone.slice(1).replace('_', ' ')}
                                </button>
                            ))}
                        </div>

                        <div className="flex-1">
                            {originalText ? (
                                <DiffView original={originalText} modified={getCurrentRewrite()} />
                            ) : (
                                <p className="text-gray-500 italic text-center mt-10">No rewrite suggestions available.</p>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'social' && (
                    <div className="h-full animate-in fade-in zoom-in-95 duration-300">
                        <SocialPreview
                            headline={headlines?.viral || "Breaking News Update"}
                            summary={getCurrentRewrite() || "Summary not available."}
                            tags={tags}
                        />
                    </div>
                )}

                {activeTab === 'reel' && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="flex justify-between items-center mb-2">
                            <h4 className="text-gray-300 text-xs uppercase tracking-wider font-bold">Script for Vertical Video</h4>
                            <button className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"><Copy size={12} /> Copy</button>
                        </div>
                        <pre className="whitespace-pre-wrap font-mono text-sm text-gray-300 bg-black/20 p-4 rounded-lg border border-white/5 min-h-[200px]">
                            {reelText}
                            {isReelTyping && <span className="animate-pulse inline-block w-2 h-4 bg-emerald-500 ml-1 aligns-middle"></span>}
                        </pre>
                    </div>
                )}

                {activeTab === 'podcast' && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="flex justify-between items-center mb-2">
                            <h4 className="text-gray-300 text-xs uppercase tracking-wider font-bold">Audio Briefing Script</h4>
                            <button className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"><Copy size={12} /> Copy</button>
                        </div>

                        <AudioPlayer text={content.podcast_summary} />

                        <div className="p-4 bg-gradient-to-br from-indigo-900/20 to-purple-900/20 rounded-lg border border-white/5 min-h-[200px]">
                            <p className="text-gray-200 leading-relaxed font-serif text-lg">
                                {podcastText}
                                {isPodcastTyping && <span className="animate-pulse inline-block w-2 h-4 bg-indigo-400 ml-1"></span>}
                            </p>
                        </div>
                    </div>
                )}

                {activeTab === 'article' && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        {content.regional_articles.map((article, idx) => (
                            <div key={idx} className="mb-6 last:mb-0">
                                <h4 className="text-emerald-400 text-sm font-bold mb-2">{article.language} Version</h4>
                                <div className="p-4 bg-white/5 rounded-lg text-gray-200 font-serif">
                                    {article.text}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
