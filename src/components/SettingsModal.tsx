
"use client";

import React from 'react';
import { X, Sliders } from 'lucide-react';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    settings: {
        sensitivity: number;
        autoFix: boolean;
        strictMode: boolean;
        theme: 'dark' | 'light';
    };
    onUpdate: (newSettings: any) => void;
}

export function SettingsModal({ isOpen, onClose, settings, onUpdate }: SettingsModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="w-full max-w-md bg-[#111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/5">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <Sliders size={18} /> Configuration
                    </h3>
                    <button onClick={onClose} className="p-1 text-gray-400 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {/* Sensitivity Slider */}
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <label className="text-sm font-medium text-gray-300">Analysis Sensitivity</label>
                            <span className="text-xs font-mono text-indigo-400">{settings.sensitivity.toFixed(1)}x</span>
                        </div>
                        <input
                            type="range"
                            min="0.5"
                            max="2.0"
                            step="0.1"
                            value={settings.sensitivity}
                            onChange={(e) => onUpdate({ ...settings, sensitivity: parseFloat(e.target.value) })}
                            className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                        />
                        <p className="text-xs text-gray-500">Higher values detect subtler bias but may produce false positives.</p>
                    </div>

                    {/* Strict Mode Toggle */}
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                        <div>
                            <span className="block text-sm font-medium text-gray-200">Strict Mode</span>
                            <span className="text-xs text-gray-500">Aggressive fact-checking</span>
                        </div>
                        <button
                            onClick={() => onUpdate({ ...settings, strictMode: !settings.strictMode })}
                            className={`w-12 h-7 rounded-full transition-colors relative ${settings.strictMode ? 'bg-indigo-600' : 'bg-gray-700'}`}
                        >
                            <span className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${settings.strictMode ? 'translate-x-5' : 'translate-x-0'}`} />
                        </button>
                    </div>

                    {/* Auto-Fix Toggle */}
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                        <div>
                            <span className="block text-sm font-medium text-gray-200">Auto-Suggest Fixes</span>
                            <span className="text-xs text-gray-500">Show replacement recommendations</span>
                        </div>
                        <button
                            onClick={() => onUpdate({ ...settings, autoFix: !settings.autoFix })}
                            className={`w-12 h-7 rounded-full transition-colors relative ${settings.autoFix ? 'bg-emerald-600' : 'bg-gray-700'}`}
                        >
                            <span className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${settings.autoFix ? 'translate-x-5' : 'translate-x-0'}`} />
                        </button>
                    </div>
                </div>

                <div className="p-4 bg-white/5 border-t border-white/5 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
}
