
import React from 'react';
import { Copy, TrendingUp, Search, Scale } from 'lucide-react';

interface Props {
    headlines: {
        viral: string;
        seo: string;
        neutral: string;
    };
}

export function HeadlineGenerator({ headlines }: Props) {
    const Card = ({ title, icon: Icon, text, colorClass, gradientClass }: any) => (
        <div className={`p-1 rounded-xl bg-gradient-to-br ${gradientClass} h-full group`}>
            <div className="bg-[#121212] p-4 rounded-lg h-full flex flex-col relative overflow-hidden">
                <div className="flex items-center gap-2 mb-3">
                    <div className={`p-1.5 rounded-lg ${colorClass} bg-opacity-20`}>
                        <Icon size={14} className={colorClass.replace('bg-', 'text-')} />
                    </div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{title}</span>
                </div>
                <p className="text-gray-100 font-bold leading-tight mb-8 group-hover:text-white transition-colors">{text}</p>

                <button
                    onClick={() => navigator.clipboard.writeText(text)}
                    className="absolute bottom-3 right-3 p-2 text-gray-500 hover:text-white hover:bg-white/10 rounded-full transition-all opacity-0 group-hover:opacity-100"
                    title="Copy to clipboard"
                >
                    <Copy size={16} />
                </button>
            </div>
        </div>
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card
                title="Viral / Social"
                icon={TrendingUp}
                text={headlines.viral}
                colorClass="bg-rose-500 text-rose-500"
                gradientClass="from-rose-500/50 to-orange-500/50"
            />
            <Card
                title="SEO / Search"
                icon={Search}
                text={headlines.seo}
                colorClass="bg-blue-500 text-blue-500"
                gradientClass="from-blue-500/50 to-cyan-500/50"
            />
            <Card
                title="Neutral / Factual"
                icon={Scale}
                text={headlines.neutral}
                colorClass="bg-emerald-500 text-emerald-500"
                gradientClass="from-emerald-500/50 to-teal-500/50"
            />
        </div>
    );
}
