
import Sentiment from 'sentiment';

export interface NewsContent {
    text: string;
    source?: string;
    timestamp?: string;
}

export interface AnalysisResult {
    content_analysis: {
        bias_level: 'Low' | 'Moderate' | 'High';
        bias_type: string[];
        emotional_tone: string;
        virality_score: number; // New field
        readability_score: number; // New field
        bias_radar_data: {
            partisanship: number;
            sensationalism: number;
            omission: number;
            framing: number;
            tone: number;
        };
        entities: string[]; // New field
    };
    fact_check: {
        verified_facts: string[];
        disputed_claims: string[];
        unverifiable_claims: string[];
    };
    editorial_suggestions: Array<{
        issue: string;
        recommendation: string;
        why: string;
        context_snippet?: string;
        fix?: string; // New field for direct fix
    }>;
    adapted_content: {
        short_reel_script: string;
        podcast_summary: string;
        regional_articles: Array<{
            language: string;
            text: string;
        }>;
    };
    neutralized_text?: string; // Legacy fallback
    multi_tone_rewrites?: {
        neutral: string;
        professional: string;
        gen_z: string;
        concise: string;
    };
    headlines?: {
        viral: string;
        seo: string;
        neutral: string;
    };
    seo_keywords?: string[];
}

const sentiment = new Sentiment();

// --- Advanced Heuristics Helper ---
const PATTERNS = {
    sensational: ['shocking', 'disaster', 'crisis', 'chaos', 'exploded', 'ruined', 'destroyed', 'nightmare', 'catastrophe', 'meltdown', 'obliterated', 'slammed'],
    partisan: ['radical', 'far-left', 'far-right', 'extremist', 'agenda', 'regime', 'puppet', 'dictator', 'corrupt', 'socialist', 'facist'],
    hedging: ['reportedly', 'allegedly', 'sources say', 'rumored', 'it is believed', 'likely'],
    opinion: ['obviously', 'clearly', 'unfortunately', 'luckily', 'shockingly', 'predictably']
};

/** 
 * Simple Named Entity Recognition (NER) Mock 
 * In a real app, this would use an NLP library or API.
 * Here we use regex for capitalized words not at start of sentence.
 */
function extractEntities(text: string): string[] {
    const regex = /(?<!^|\.\s)\b[A-Z][a-z]+(?:\s[A-Z][a-z]+)*\b/g;
    const matches = text.match(regex) || [];
    return Array.from(new Set(matches)).filter(w => w.length > 3 && !['The', 'And', 'But', 'For', 'With'].includes(w));
}

function calculateReadability(text: string): number {
    const words = text.split(' ').length;
    const sentences = text.split(/[.!?]+/).filter(Boolean).length;
    return Math.round(words / (sentences || 1)); // Avg sentence length as proxy
}

export async function analyzeContent(content: string, options?: { sensitivity?: number }): Promise<AnalysisResult> {
    // Simulate complex processing
    await new Promise(resolve => setTimeout(resolve, 1000));

    const lowerContent = content.toLowerCase();
    const sentimentResult = sentiment.analyze(content);
    const score = sentimentResult.score;
    const comparative = sentimentResult.comparative;
    const sensitivity = options?.sensitivity || 1.0;

    // 1. Calculations
    const sensationalWords = PATTERNS.sensational.filter(w => lowerContent.includes(w));
    const partisanWords = PATTERNS.partisan.filter(w => lowerContent.includes(w));
    const opinionWords = PATTERNS.opinion.filter(w => lowerContent.includes(w));

    let sensationalismScore = Math.min((sensationalWords.length * 15 + Math.abs(score) * 5) * sensitivity, 100);
    let partisanshipScore = Math.min((partisanWords.length * 20) * sensitivity, 100);
    let toneValue = Math.min(Math.abs(comparative) * 50 + 40, 100);

    const entities = extractEntities(content);
    const readability = calculateReadability(content);

    // Virality Score: Function of sensationalism + emotional intensity
    const viralityScore = Math.min((sensationalismScore * 0.6 + Math.abs(score) * 10), 100);

    // 2. Determine Tone
    let emotionalTone = "Neutral";
    if (score > 3) emotionalTone = "Positive – Enthusiastic";
    else if (score > 0) emotionalTone = "Slightly Positive";
    else if (score < -3) emotionalTone = "Negative – Alarmist";
    else if (score < 0) emotionalTone = "Slightly Negative";

    // 3. Generate Suggestions & Fixes
    const suggestions: AnalysisResult['editorial_suggestions'] = [];

    sensationalWords.forEach(word => {
        suggestions.push({
            issue: `Sensational Language: "${word}"`,
            recommendation: `Consider more neutral alternative.`,
            why: `Can be perceived as clickbait or biased.`,
            context_snippet: `...${word}...`,
            fix: word === 'disastrous' ? 'significant' : (word === 'shocking' ? 'surprising' : 'notable')
        });
    });

    if (readability > 25) {
        suggestions.push({
            issue: 'Low Readability',
            recommendation: 'Shorten sentences for better clarity.',
            why: 'Average sentence length is too high for news (aim for < 20 words).',
        });
    }

    // 4. Construct Result
    return {
        content_analysis: {
            bias_level: (score < -3 || sensationalismScore > 65 || partisanshipScore > 50) ? 'High' : (score !== 0 ? 'Moderate' : 'Low'),
            bias_type: partisanshipScore > 50 ? ['Partisan'] : (sensationalismScore > 50 ? ['Sensationalist'] : []),
            emotional_tone: emotionalTone,
            virality_score: Math.round(viralityScore),
            readability_score: readability,
            bias_radar_data: {
                partisanship: Math.round(partisanshipScore),
                sensationalism: Math.round(sensationalismScore),
                omission: 30,
                framing: Math.round(toneValue), // Utilizing tone as framing proxy
                tone: Math.round(toneValue)
            },
            entities: entities.slice(0, 5) // Top 5 entities
        },
        fact_check: {
            verified_facts: entities.length > 0 ? [`Entities detected: ${entities.join(', ')}`] : ['No specific entities verified.'],
            disputed_claims: [],
            unverifiable_claims: [],
        },
        editorial_suggestions: suggestions,
        adapted_content: {
            short_reel_script: `[VISUAL: Text Overlay - "${emotionalTone}"]\\nVO: Essential update on ${entities[0] || 'recent events'}.\\nKey takeaway: ${content.substring(0, 50)}...`,
            podcast_summary: `In today's deep dive, we discuss ${entities.join(', ') || 'current affairs'}. The tone is ${emotionalTone.toLowerCase()}...`,
            regional_articles: [
                { language: 'Spanish', text: `(Traducción) ${content.substring(0, 40)}...` },
                { language: 'French', text: `(Traduction) ${content.substring(0, 40)}...` }
            ]
        },
        neutralized_text: content.replace(/disastrous/gi, 'significant').replace(/shocking/gi, 'notable'),
        multi_tone_rewrites: {
            neutral: content.replace(/disastrous/gi, 'significant').replace(/shocking/gi, 'notable'),
            professional: `Regarding ${entities[0] || 'the recent event'}, reports indicate significant developments. ${content.substring(0, 40)}...`,
            gen_z: `So ${entities[0] || 'this'} just happened and it's kinda wild 💀. ${content.substring(0, 30)}... no cap.`,
            concise: `${entities[0] || 'Update'}: Significant events reported. ${content.substring(0, 20)}...`
        },
        headlines: {
            viral: `You Won't Believe What ${entities[0] || 'They'} Just Did`,
            seo: `${entities[0] || 'News'} Report: Full Analysis`,
            neutral: `Update on ${entities[0] || 'Situation'}: Key Details`
        },
        seo_keywords: [...entities, ...suggestions.map(s => s.issue.split(' ')[0])]
    };
}
