
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, SkipBack, SkipForward } from 'lucide-react';

interface AudioPlayerProps {
    text: string;
}

export function AudioPlayer({ text }: AudioPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    // Mock audio visualization bars
    const bars = Array.from({ length: 40 }).map(() => Math.random());

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying) {
            interval = setInterval(() => {
                setProgress(p => {
                    if (p >= 100) {
                        setIsPlaying(false);
                        return 0;
                    }
                    return p + 0.5;
                });
            }, 50);
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    return (
        <div className="bg-black/40 backdrop-blur-sm border border-white/10 p-4 rounded-xl">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-10 h-10 flex items-center justify-center bg-indigo-500 hover:bg-indigo-400 text-white rounded-full transition-colors"
                    >
                        {isPlaying ? <Pause size={18} /> : <Play size={18} className="translate-x-0.5" />}
                    </button>
                    <div>
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">AI Narrator</div>
                        <div className="text-sm font-medium text-white">Daily Briefing.mp3</div>
                    </div>
                </div>
                <div className="flex gap-3 text-gray-400">
                    <SkipBack size={18} className="cursor-pointer hover:text-white" />
                    <SkipForward size={18} className="cursor-pointer hover:text-white" />
                    <Volume2 size={18} className="cursor-pointer hover:text-white" />
                </div>
            </div>

            {/* Visualizer */}
            <div className="flex items-end justify-center gap-[2px] h-12 mb-2 px-2">
                {bars.map((height, i) => (
                    <div
                        key={i}
                        className={`w-1.5 rounded-t-sm transition-all duration-150 ${isPlaying ? 'bg-indigo-400' : 'bg-white/10'}`}
                        style={{
                            height: isPlaying ? `${height * 100}%` : '20%',
                            opacity: isPlaying ? 1 : 0.3
                        }}
                    />
                ))}
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-100 ease-linear"
                    style={{ width: `${progress}%` }}
                />
            </div>
            <div className="flex justify-between text-[10px] text-gray-500 mt-1 font-mono">
                <span>0:{(progress * 0.3).toFixed(0).padStart(2, '0')}</span>
                <span>0:30</span>
            </div>
        </div>
    );
}
