import { EngineOutput, EmotionState, NarrativeUpdate, DialogueStyle, MusicDirection, VisualPacing } from './types';
import storyData from './storyData.json';

export class StoryEngine {
    public adapt(emotion: EmotionState, currentStoryState: any): EngineOutput {
        // 1. Narrative Path Control - Data Driven
        const narrativeUpdate: NarrativeUpdate = this.getNarrativeUpdate(emotion);

        // 2. Dialogue Adaptation
        const dialogueStyle: DialogueStyle = this.getDialogueStyle(emotion);

        // 3. Music & Sound Design
        const musicDirection: MusicDirection = this.getMusicDirection(emotion);

        // 4. Visual Pacing
        const visualPacing: VisualPacing = this.getVisualPacing(emotion);

        return {
            detected_emotion: emotion,
            narrative_update: narrativeUpdate,
            dialogue_style: dialogueStyle,
            music_direction: musicDirection,
            visual_pacing: visualPacing,
        };
    }

    private getNarrativeUpdate(emotion: EmotionState): NarrativeUpdate {
        // Find a matching node from storyData
        const matchedNode = storyData.find(node => {
            const t = node.trigger as any;
            if (t.primary && t.primary === emotion.primary) return true;
            if (t.valence_min !== undefined && emotion.valence >= t.valence_min) {
                if (t.arousal_max !== undefined && emotion.arousal <= t.arousal_max) return true;
            }
            if (t.valence_max !== undefined && emotion.valence <= t.valence_max) {
                if (t.arousal_min !== undefined && emotion.arousal >= t.arousal_min) return true;
            }
            return false;
        });

        if (matchedNode && matchedNode.narrative_update) {
            return {
                story_branch: matchedNode.narrative_update.story_branch,
                plot_adjustment: matchedNode.text // Using text as the plot adjustment for display
            } as NarrativeUpdate;
        }

        // Fallback logic
        if (emotion.primary === 'Sadness') {
            return { story_branch: 'empathy_arc', plot_adjustment: 'The mood is somber.' };
        } else if (emotion.primary === 'Joy') {
            return { story_branch: 'triumph_arc', plot_adjustment: 'Spirits are high.' };
        }

        return { story_branch: 'neutral_flow', plot_adjustment: 'The story continues...' };
    }

    private getDialogueStyle(emotion: EmotionState): DialogueStyle {
        if (emotion.arousal > 0.7) {
            return { tone: 'energetic', intensity: 'high', pacing: 'fast' };
        } else if (emotion.valence < -0.3) {
            return { tone: 'empathetic', intensity: 'medium', pacing: 'slow' };
        }
        return { tone: 'neutral', intensity: 'medium', pacing: 'medium' };
    }

    private getMusicDirection(emotion: EmotionState): MusicDirection {
        if (emotion.primary === 'Sadness') {
            return { mood: 'melancholic', tempo: 'slow', instrumentation: ['piano', 'strings'] };
        } else if (emotion.arousal > 0.8) {
            return { mood: 'intense', tempo: 'fast', instrumentation: ['drums', 'synth'] };
        } else if (emotion.primary === 'Joy') {
            return { mood: 'uplifting', tempo: 'medium', instrumentation: ['brass', 'strings'] };
        }
        return { mood: 'ambient', tempo: 'medium', instrumentation: ['pad', 'flute'] };
    }

    private getVisualPacing(emotion: EmotionState): VisualPacing {
        if (emotion.arousal > 0.6) {
            return { cut_speed: 'fast', lighting: 'bright', motion_density: 'high' };
        } else if (emotion.valence < -0.3) {
            return { cut_speed: 'slow', lighting: 'dim', motion_density: 'low' };
        }
        return { cut_speed: 'medium', lighting: 'soft', motion_density: 'medium' };
    }
}
