
import React from 'react';

interface BiasRadarProps {
    data: {
        partisanship: number;
        sensationalism: number;
        omission: number;
        framing: number;
        tone: number;
    };
}

export function BiasRadar({ data }: BiasRadarProps) {
    // Max value for scaling
    const MAX = 100;
    const CENTER = 100;
    const RADIUS = 80;

    // Calculate points for the pentagon (5 axes)
    // Axes: 0: Top, 1: Top-Right, 2: Bottom-Right, 3: Bottom-Left, 4: Top-Left
    const labels = ["Partisanship", "Sensationalism", "Omission", "Framing", "Tone"];
    const keys = ["partisanship", "sensationalism", "omission", "framing", "tone"] as const;

    const points = keys.map((key, i) => {
        const value = data[key];
        const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2; // Start at top
        const r = (value / MAX) * RADIUS;
        const x = CENTER + r * Math.cos(angle);
        const y = CENTER + r * Math.sin(angle);
        return `${x},${y}`;
    }).join(' ');

    const axisPoints = labels.map((_, i) => {
        const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
        const x = CENTER + RADIUS * Math.cos(angle);
        const y = CENTER + RADIUS * Math.sin(angle);
        return { x, y };
    });

    return (
        <div className="flex flex-col items-center justify-center p-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md">
            <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider mb-2">Bias Radar</h3>

            <div className="relative w-64 h-64">
                <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
                    {/* Background Grid (Pentagons) */}
                    {[1, 0.75, 0.5, 0.25].map((scale, idx) => (
                        <polygon
                            key={idx}
                            points={axisPoints.map(p => `${CENTER + (p.x - CENTER) * scale},${CENTER + (p.y - CENTER) * scale}`).join(' ')}
                            fill="none"
                            stroke="rgba(255,255,255,0.1)"
                            strokeWidth="1"
                        />
                    ))}

                    {/* Axes Lines */}
                    {axisPoints.map((p, i) => (
                        <line
                            key={i}
                            x1={CENTER}
                            y1={CENTER}
                            x2={p.x}
                            y2={p.y}
                            stroke="rgba(255,255,255,0.1)"
                            strokeWidth="1"
                        />
                    ))}

                    {/* Data Polygon */}
                    <polygon
                        points={points}
                        fill="rgba(244, 63, 94, 0.3)" // Rose-500 equivalent with opacity
                        stroke="#f43f5e"
                        strokeWidth="2"
                        className="drop-shadow-[0_0_10px_rgba(244,63,94,0.5)] transition-all duration-1000 ease-out"
                    />

                    {/* Labels */}
                    {axisPoints.map((p, i) => {
                        // Adjust label position slightly based on angle
                        const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
                        const labelX = p.x + Math.cos(angle) * 20;
                        const labelY = p.y + Math.sin(angle) * 15;
                        return (
                            <text
                                key={i}
                                x={labelX}
                                y={labelY}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fill="#9ca3af" // Gray-400
                                fontSize="10"
                                fontWeight="500"
                            >
                                {labels[i]}
                            </text>
                        );
                    })}
                </svg>
            </div>
        </div>
    );
}
