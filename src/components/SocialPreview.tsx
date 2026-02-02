
import React, { useState } from 'react';
import { Heart, MessageCircle, Repeat, Share, MoreHorizontal, BadgeCheck, Globe, ThumbsUp, Send, Bookmark } from 'lucide-react';

interface Props {
    headline: string;
    summary: string;
    tags?: string[];
}

export function SocialPreview({ headline, summary, tags = [] }: Props) {
    const [platform, setPlatform] = useState<'twitter' | 'linkedin' | 'instagram'>('twitter');

    const PlatformIcon = ({ p, label }: { p: typeof platform, label: string }) => (
        <button
            onClick={() => setPlatform(p)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all ${platform === p
                ? 'bg-white text-black font-bold'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
        >
            {label}
        </button>
    );

    return (
        <div className="flex flex-col items-center h-full">
            {/* Platform Switcher */}
            <div className="flex gap-2 mb-6 p-1 bg-black/40 rounded-full border border-white/10">
                <PlatformIcon p="twitter" label="X / Twitter" />
                <PlatformIcon p="linkedin" label="LinkedIn" />
                <PlatformIcon p="instagram" label="Instagram" />
            </div>

            {/* Preview Container */}
            <div className="w-full max-w-[400px] animate-in fade-in slide-in-from-bottom-4 duration-500">

                {/* Twitter / X Style */}
                {platform === 'twitter' && (
                    <div className="bg-black border border-white/10 rounded-xl p-4 w-full shadow-2xl font-sans">
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border border-white/10" />
                                <div>
                                    <div className="flex items-center gap-1">
                                        <span className="font-bold text-white text-[15px]">NEXUS AI</span>
                                        <span className="text-blue-400 text-[13px] "><BadgeCheck size={13} fill="currentColor" /></span>
                                        <span className="text-gray-500 text-[14px]">@nexus_intel · 2h</span>
                                    </div>
                                    <div className="text-gray-500 text-[13px] -mt-0.5">Automated Intelligence</div>
                                </div>
                            </div>
                            <MoreHorizontal className="text-gray-500" size={16} />
                        </div>
                        <div className="mb-3">
                            <p className="text-white text-[15px] leading-normal whitespace-pre-wrap">
                                {headline} 🚨
                                <br /><br />
                                {summary.substring(0, 140)}...
                                <br /><br />
                                {tags.slice(0, 3).map(t => `#${t}`).join(' ')}
                            </p>
                        </div>
                        <div className="bg-gray-800/30 rounded-xl h-48 w-full mb-3 flex items-center justify-center border border-white/5 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-purple-900/20 group-hover:scale-105 transition-transform duration-700" />
                            <span className="text-gray-600 text-sm relative z-10 font-medium">Auto-Generated Visual</span>
                        </div>
                        <div className="flex justify-between text-gray-500 mt-2 px-1">
                            <button className="flex items-center gap-2 group"><MessageCircle size={16} className="group-hover:text-blue-400" /><span className="text-xs group-hover:text-blue-400">142</span></button>
                            <button className="flex items-center gap-2 group"><Repeat size={16} className="group-hover:text-green-400" /><span className="text-xs group-hover:text-green-400">89</span></button>
                            <button className="flex items-center gap-2 group"><Heart size={16} className="group-hover:text-pink-500" /><span className="text-xs group-hover:text-pink-500">1.2k</span></button>
                            <button className="flex items-center gap-2 group"><Share size={16} className="group-hover:text-blue-400" /><span className="text-xs group-hover:text-blue-400">24k</span></button>
                        </div>
                    </div>
                )}

                {/* LinkedIn Style */}
                {platform === 'linkedin' && (
                    <div className="bg-white rounded-lg w-full shadow-2xl overflow-hidden font-sans border border-gray-200">
                        <div className="p-3 pb-0">
                            <div className="flex gap-3 mb-2">
                                <div className="w-10 h-10 rounded-sm bg-blue-700" />
                                <div>
                                    <div className="font-semibold text-gray-900 text-sm leading-tight">NEXUS Editorial System</div>
                                    <div className="text-xs text-gray-500">AI-Powered Newsroom Intelligence</div>
                                    <div className="text-xs text-gray-400 flex items-center gap-1">2m • <Globe size={10} /></div>
                                </div>
                            </div>
                            <div className="text-sm text-gray-800 leading-relaxed mb-2">
                                <p className="mb-2 font-semibold">Breaking Update: {headline}</p>
                                <p>{summary} <span className="text-gray-500 cursor-pointer">...see more</span></p>
                                <p className="mt-2 text-blue-600 font-medium">{tags.map(t => `#${t}`).join(' ')}</p>
                            </div>
                        </div>
                        <div className="bg-gray-100 h-52 w-full flex items-center justify-center text-gray-400 text-sm border-y border-gray-200">
                            Article Image Preview
                        </div>
                        <div className="px-3 py-2 flex justify-between border-t border-gray-100">
                            <button className="flex flex-col items-center gap-1 text-gray-500 hover:bg-gray-100 px-4 py-1 rounded"><ThumbsUp size={18} /><span className="text-xs font-medium">Like</span></button>
                            <button className="flex flex-col items-center gap-1 text-gray-500 hover:bg-gray-100 px-4 py-1 rounded"><MessageCircle size={18} /><span className="text-xs font-medium">Comment</span></button>
                            <button className="flex flex-col items-center gap-1 text-gray-500 hover:bg-gray-100 px-4 py-1 rounded"><Repeat size={18} /><span className="text-xs font-medium">Repost</span></button>
                            <button className="flex flex-col items-center gap-1 text-gray-500 hover:bg-gray-100 px-4 py-1 rounded"><Send size={18} /><span className="text-xs font-medium">Send</span></button>
                        </div>
                    </div>
                )}

                {/* Instagram Style */}
                {platform === 'instagram' && (
                    <div className="bg-black border border-white/10 rounded-xl w-full shadow-2xl overflow-hidden font-sans max-w-[350px] mx-auto">
                        <div className="flex justify-between items-center p-3 border-b border-white/10">
                            <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-yellow-400 to-purple-600 p-[2px]">
                                    <div className="w-full h-full rounded-full bg-black border-2 border-black" />
                                </div>
                                <span className="text-white text-sm font-semibold">nexus_daily</span>
                            </div>
                            <MoreHorizontal className="text-white" size={20} />
                        </div>

                        {/* Image Area - Square */}
                        <div className="aspect-square w-full bg-gray-900 flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-indigo-500/10" />
                            <div className="p-8 text-center">
                                <h3 className="text-white font-bold text-xl leading-snug drop-shadow-lg">{headline}</h3>
                            </div>
                        </div>

                        <div className="p-3">
                            <div className="flex justify-between mb-2">
                                <div className="flex gap-4">
                                    <Heart className="text-white" size={24} />
                                    <MessageCircle className="text-white" size={24} />
                                    <Send className="text-white" size={24} />
                                </div>
                                <Bookmark className="text-white" size={24} />
                            </div>
                            <div className="text-white text-sm font-semibold mb-1">2,492 likes</div>
                            <div className="text-white text-sm">
                                <span className="font-semibold mr-2">nexus_daily</span>
                                {summary.substring(0, 80)}... <span className="text-gray-400">more</span>
                            </div>
                            <div className="text-blue-400 text-sm mt-1">
                                {tags.map(t => `#${t}`).join(' ')}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
