"use client";

import React, { useState } from 'react';
import { analyzeContent, AnalysisResult } from '@/lib/analysis-engine';
import { AnalysisResults } from '@/components/AnalysisResults';
import { HistorySidebar } from '@/components/HistorySidebar';
import { SettingsModal } from '@/components/SettingsModal';
import { Sparkles, Activity, ShieldCheck, Newspaper, Download, Settings, Zap, Globe, Share2 } from 'lucide-react';

export default function Home() {
  const [input, setInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  // Settings State
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settings, setSettings] = useState<{
    sensitivity: number;
    autoFix: boolean;
    strictMode: boolean;
    theme: 'dark' | 'light';
  }>({
    sensitivity: 1.0,
    autoFix: false,
    strictMode: false,
    theme: 'dark'
  });

  const handleExport = () => {
    window.print();
  };

  const handleAnalyze = async () => {
    if (!input.trim()) return;

    setIsAnalyzing(true);
    setResult(null);

    try {
      const data = await analyzeContent(input, { sensitivity: settings.sensitivity });
      setResult(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleApplyFix = (recommendation: string) => {
    // Advanced: Try to find a direct fix from the node if possible, generic fallback
    // In this demo, we assume the 'recommendation' string itself might contain the fix or we use a simple heuristic
    // For now, let's use a simple replace for commonly known issues if mapped

    // NOTE: In a real app, 'recommendation' would likely be an ID or object. 
    // Here we just re-run a simple replace for demo effect if it matches our known keywords
    let newText = input;
    if (recommendation.includes("neutral")) {
      newText = newText.replace(/disastrous/gi, "significant").replace(/shocking/gi, "notable");
    }

    if (newText !== input) {
      setInput(newText);
    } else {
      alert("Auto-fix applied (simulation). Check text for changes.");
    }
  };

  const handleHistorySelect = (item: any) => {
    setInput(item.fullText);
    setResult(item.result);
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans selection:bg-indigo-500/30">

      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-900/20 rounded-full blur-[120px] opacity-40"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-900/20 rounded-full blur-[120px] opacity-40"></div>
      </div>

      <div className="relative z-10 flex">
        <HistorySidebar
          onSelect={handleHistorySelect}
          currentResult={result}
          currentText={input}
        />

        <div className="flex-1 p-6 md:p-12 max-w-7xl mx-auto">
          {/* Header */}
          <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-8 pl-12 md:pl-0">
            <div>
              <h1 className="text-5xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400 mb-2 tracking-tight">
                NEXUS
              </h1>
              <p className="text-gray-400 text-lg flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-white/10 text-xs font-mono uppercase text-indigo-300">v2.0</span>
                AI Editorial Intelligence
              </p>
            </div>
            <div className="flex gap-4">
              {result && (
                <button
                  onClick={handleExport}
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-300 text-sm font-medium transition-colors border border-white/5"
                >
                  <Download size={16} /> Export
                </button>
              )}
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full text-indigo-300 text-sm font-medium transition-colors border border-indigo-500/20 hover:border-indigo-500/50"
              >
                <Settings size={16} /> Configure
              </button>
            </div>
          </header>

          {/* Input Section */}
          <section className="mb-12 space-y-6">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Input raw content stream for intelligence analysis..."
                  className="w-full h-48 bg-[#0a0a0a] text-gray-100 p-8 rounded-2xl border border-white/10 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 outline-none resize-none text-xl leading-relaxed shadow-2xl transition-all font-light placeholder:text-gray-600"
                />
                <div className="absolute bottom-4 right-4 flex gap-2">
                  {/* Quick Fill Buttons for Demo */}
                  <button
                    onClick={() => setInput("The disastrous policy implemented by Candidate X has ruined the economy. Sources say everyone is angry. It's a total failure compared to the glorious past.")}
                    className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-xs text-gray-500 hover:text-gray-300 rounded-lg transition-colors border border-white/5"
                  >
                    Sample: Biased
                  </button>
                  <button
                    onClick={() => setInput("Apple (AAPL) released their new iPhone 16 today. The stock jumped 5% in after-hours trading. Critics praised the new camera system.")}
                    className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-xs text-gray-500 hover:text-gray-300 rounded-lg transition-colors border border-white/5"
                  >
                    Sample: Tech
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !input.trim()}
                className="relative overflow-hidden flex items-center gap-3 px-10 py-4 bg-white text-black font-bold text-lg rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-10px_rgba(255,255,255,0.4)] hover:scale-105 active:scale-95"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin h-5 w-5 border-2 border-black border-t-transparent rounded-full" />
                    <span>Processing Stream...</span>
                  </>
                ) : (
                  <>
                    <Zap size={20} className="fill-black" />
                    <span>Run Analysis</span>
                  </>
                )}
              </button>
            </div>
          </section>

          {/* Analysis Output */}
          {result && (
            <section className="mb-20 animate-in fade-in slide-in-from-bottom-10 duration-500">

              {/* High Level Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                  <div className="text-gray-400 text-xs uppercase tracking-widest mb-2 font-semibold">Bias Level</div>
                  <div className={`text-3xl font-bold ${result.content_analysis.bias_level === 'High' ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {result.content_analysis.bias_level}
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                  <div className="text-gray-400 text-xs uppercase tracking-widest mb-2 font-semibold">Virality Score</div>
                  <div className="text-3xl font-bold text-indigo-400 flex items-baseline gap-1">
                    {result.content_analysis.virality_score}<span className="text-sm text-gray-500">/100</span>
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                  <div className="text-gray-400 text-xs uppercase tracking-widest mb-2 font-semibold">Readability</div>
                  <div className="text-3xl font-bold text-cyan-400">
                    {result.content_analysis.readability_score} <span className="text-xs text-gray-500 font-normal">words/sent</span>
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                  <div className="text-gray-400 text-xs uppercase tracking-widest mb-2 font-semibold">Entities</div>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {result.content_analysis.entities && result.content_analysis.entities.length > 0 ? (
                      result.content_analysis.entities.slice(0, 3).map((e, i) => (
                        <span key={i} className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300">{e}</span>
                      ))
                    ) : (
                      <span className="text-gray-600 italic">None detected</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <Newspaper size={24} className="text-gray-300" />
                <h2 className="text-2xl font-bold text-white">Full Intelligence Report</h2>
              </div>

              <AnalysisResults
                data={result}
                onApplyFix={handleApplyFix}
                originalInput={input}
              />
            </section>
          )}

          {/* Empty State / Welcome */}
          {!result && !isAnalyzing && (
            <div className="text-center py-20 opacity-20 select-none pointer-events-none">
              <Globe size={120} strokeWidth={0.5} className="mx-auto mb-4 text-gray-500 animate-pulse" />
              <p className="text-2xl text-gray-400 font-light tracking-wide">System Ready. Awaiting Data.</p>
            </div>
          )}
        </div>
      </div>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdate={setSettings}
      />
    </main>
  );
}
