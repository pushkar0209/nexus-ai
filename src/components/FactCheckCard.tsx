
import React from 'react';
import { CheckCircle2, AlertTriangle, HelpCircle } from 'lucide-react';

interface FactCheckProps {
    verified: string[];
    disputed: string[];
    unverifiable: string[];
}

export function FactCheckCard({ verified, disputed, unverifiable }: FactCheckProps) {
    return (
        <div className="p-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md">
            <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider mb-4 border-b border-white/5 pb-2">
                Fact Verification
            </h3>

            <div className="space-y-4">
                {/* Verified */}
                {verified.length > 0 && (
                    <div>
                        <h4 className="flex items-center gap-2 text-xs font-bold text-emerald-400 mb-2">
                            <CheckCircle2 size={14} /> VERIFIED FACTS
                        </h4>
                        <ul className="space-y-2">
                            {verified.map((fact, i) => (
                                <li key={i} className="text-sm text-gray-300 pl-6 relative before:absolute before:left-2 before:top-2 before:w-1.5 before:h-1.5 before:bg-emerald-500/50 before:rounded-full">
                                    {fact}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Disputed */}
                {disputed.length > 0 && (
                    <div>
                        <h4 className="flex items-center gap-2 text-xs font-bold text-rose-400 mb-2">
                            <AlertTriangle size={14} /> DISPUTED CLAIMS
                        </h4>
                        <ul className="space-y-2">
                            {disputed.map((claim, i) => (
                                <li key={i} className="text-sm text-gray-300 pl-6 relative before:absolute before:left-2 before:top-2 before:w-1.5 before:h-1.5 before:bg-rose-500/50 before:rounded-full">
                                    {claim}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Unverifiable */}
                {unverifiable.length > 0 && (
                    <div>
                        <h4 className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-2">
                            <HelpCircle size={14} /> UNVERIFIABLE / SPECULATIVE
                        </h4>
                        <ul className="space-y-2">
                            {unverifiable.map((claim, i) => (
                                <li key={i} className="text-sm text-gray-300 pl-6 relative before:absolute before:left-2 before:top-2 before:w-1.5 before:h-1.5 before:bg-amber-500/50 before:rounded-full">
                                    {claim}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {verified.length === 0 && disputed.length === 0 && unverifiable.length === 0 && (
                    <p className="text-sm text-gray-500 italic">No claims processed yet.</p>
                )}
            </div>
        </div>
    );
}
