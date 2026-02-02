
"use client";
import React, { useEffect, useState } from 'react';
import { History, Clock, ChevronRight, Trash2 } from 'lucide-react';
import { AnalysisResult } from '@/lib/analysis-engine';

interface HistoryItem {
    id: string;
    timestamp: number;
    textSnippet: string;
    result: AnalysisResult;
    fullText: string;
}

interface Props {
    onSelect: (item: HistoryItem) => void;
    currentResult: AnalysisResult | null;
    currentText: string;
}

export function HistorySidebar({ onSelect, currentResult, currentText }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [history, setHistory] = useState<HistoryItem[]>([]);

    // Load history on mount
    useEffect(() => {
        const saved = localStorage.getItem('newsroom_history');
        if (saved) {
            try {
                setHistory(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse history", e);
            }
        }
    }, []);

    // Save specific result when it changes (debounced or manual?) 
    // Better approach: External trigger or auto-save successful analysis
    useEffect(() => {
        if (currentResult && currentText) {
            saveToHistory(currentText, currentResult);
        }
    }, [currentResult]); // Warning: this might duplicate if not careful.Ideally called ONLY on 'Analyze' success

    const saveToHistory = (text: string, result: AnalysisResult) => {
        setHistory(prev => {
            // Avoid duplicates at top level
            if (prev.length > 0 && prev[0].textSnippet === text.substring(0, 30)) return prev;

            const newItem: HistoryItem = {
                id: Date.now().toString(),
                timestamp: Date.now(),
                textSnippet: text.substring(0, 30),
                result,
                fullText: text
            };

            const newHistory = [newItem, ...prev].slice(0, 10); // Keep last 10
            localStorage.setItem('newsroom_history', JSON.stringify(newHistory));
            return newHistory;
        });
    };

    const clearHistory = () => {
        setHistory([]);
        localStorage.removeItem('newsroom_history');
    }

    return (
        <>
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed left-0 top-1/2 -translate-y-1/2 z-50 p-2 bg-indigo-600 text-white rounded-r-lg shadow-lg transition-transform duration-300 ${isOpen ? 'translate-x-[280px]' : 'translate-x-0'}`}
            >
                {isOpen ? <ChevronRight className="rotate-180" size={20} /> : <History size={20} />}
            </button>

            {/* Sidebar Panel */}
            <div className={`fixed inset-y-0 left-0 w-[280px] bg-[#0a0a0a]/95 backdrop-blur-xl border-r border-white/10 z-40 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-6 h-full flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                            History
                        </h3>
                        <button onClick={clearHistory} className="text-gray-500 hover:text-red-400 transition-colors">
                            <Trash2 size={16} />
                        </button>
                    </div>

                    <div className="space-y-3 flex-1 overflow-y-auto custom-scrollbar">
                        {history.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => onSelect(item)}
                                className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-indigo-500/50 transition-all group"
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <span className="text-xs text-gray-400 flex items-center gap-1">
                                        <Clock size={10} /> {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                    <span className={`w-2 h-2 rounded-full ${item.result.content_analysis.bias_level === 'High' ? 'bg-rose-500' : 'bg-emerald-500'}`} />
                                </div>
                                <p className="text-xs font-medium text-gray-200 line-clamp-2 leading-relaxed">
                                    "{item.textSnippet}..."
                                </p>
                            </button>
                        ))}
                        {history.length === 0 && (
                            <div className="text-center py-10 text-gray-500">
                                <History size={32} className="mx-auto mb-2 opacity-50" />
                                <p className="text-sm">No recent analysis</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
