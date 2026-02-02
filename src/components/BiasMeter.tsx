
import React from 'react';

interface BiasMeterProps {
    level: 'Low' | 'Moderate' | 'High';
    types: string[];
}

const LEVEL_COLORS = {
    'Low': 'bg-emerald-500',
    'Moderate': 'bg-amber-400',
    'High': 'bg-rose-600',
};

const LEVEL_WIDTHS = {
    'Low': 'w-[33%]',
    'Moderate': 'w-[66%]',
    'High': 'w-[100%]',
};

export function BiasMeter({ level, types }: BiasMeterProps) {
    return (
        <div className="p-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">Bias Level</h3>
                <span className={`px-2 py-1 rounded-md text-xs font-bold text-white ${LEVEL_COLORS[level]}`}>
                    {level.toUpperCase()}
                </span>
            </div>

            {/* Meter Bar */}
            <div className="h-2 w-full bg-gray-700/50 rounded-full overflow-hidden mb-4">
                <div
                    className={`h-full transition-all duration-1000 ease-out ${LEVEL_WIDTHS[level]} ${LEVEL_COLORS[level]}`}
                />
            </div>

            {/* Tags */}
            {types.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {types.map((type) => (
                        <span key={type} className="px-2 py-0.5 bg-gray-800 text-gray-300 text-xs rounded border border-gray-700">
                            {type}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}
