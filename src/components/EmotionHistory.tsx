"use client";

import React from 'react';
import { EngineOutput } from '@/lib/types';
import { motion } from 'framer-motion';

interface EmotionHistoryProps {
    history: EngineOutput[];
}

export default function EmotionHistory({ history }: EmotionHistoryProps) {
    // We want to visualize the valence and arousal over time (last 20 points)
    const data = history.slice(-20);
    const width = 300;
    const height = 100;

    if (data.length < 2) return null;

    // Normalize points to SVG coordinates
    const points = data.map((d, i) => {
        const x = (i / (data.length - 1)) * width;
        // Valence is -1 to 1. Map to height (0 to 100).
        // -1 -> 100 (bottom), 1 -> 0 (top)
        const y = ((d.detected_emotion.valence * -1 + 1) / 2) * height;
        return `${x},${y}`;
    }).join(' ');

    return (
        <div className="fixed bottom-4 left-4 p-4 bg-black/80 backdrop-blur-md rounded-lg border border-cyan-900 w-[340px] z-50">
            <h3 className="text-cyan-400 font-mono text-xs uppercase mb-2 tracking-widest">Emotional Trajectory</h3>
            <svg width="100%" height={height} className="overflow-visible">
                {/* Zero line */}
                <line x1="0" y1={height / 2} x2={width} y2={height / 2} stroke="#334155" strokeDasharray="4" />

                {/* Valence Line */}
                <motion.polyline
                    fill="none"
                    stroke="#22d3ee"
                    strokeWidth="2"
                    points={points}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                />
            </svg>
            <div className="flex justify-between text-[10px] text-cyan-500/50 mt-1 font-mono">
                <span>Past</span>
                <span>Now</span>
            </div>
        </div>
    );
}
