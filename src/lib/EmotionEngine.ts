import { EmotionState } from './types';

export class EmotionEngine {
    private currentEmotion: EmotionState = {
        primary: 'Neutral',
        secondary: 'Calm',
        valence: 0,
        arousal: 0,
        confidence: 1.0,
    };

    constructor() {
        // Initialize with neutral state
    }

    // Simulate processing input from webcam/audio
    // In a real app, this would use TensorFlow.js or similar
    public processInput(mockData?: Partial<EmotionState>): EmotionState {
        if (mockData) {
            this.currentEmotion = { ...this.currentEmotion, ...mockData };
        } else {
            // Small random drift for simulation
            this.currentEmotion.valence = Math.max(-1, Math.min(1, this.currentEmotion.valence + (Math.random() - 0.5) * 0.1));
            this.currentEmotion.arousal = Math.max(0, Math.min(1, this.currentEmotion.arousal + (Math.random() - 0.5) * 0.1));
            this.deriveLabels();
        }
        return this.currentEmotion;
    }

    private deriveLabels() {
        const { valence, arousal } = this.currentEmotion;

        // Simple quadrant mapping
        if (valence > 0.5 && arousal > 0.5) {
            this.currentEmotion.primary = 'Joy';
        } else if (valence < -0.5 && arousal > 0.5) {
            this.currentEmotion.primary = 'Anger';
        } else if (valence < -0.5 && arousal < 0.5) {
            this.currentEmotion.primary = 'Sadness';
        } else if (valence > 0.5 && arousal < 0.5) {
            this.currentEmotion.primary = 'Contentment';
        } else {
            this.currentEmotion.primary = 'Neutral';
        }

        // Secondary emotion logic (simplified)
        if (arousal > 0.8) this.currentEmotion.secondary = 'Excitement';
        else if (arousal < 0.2) this.currentEmotion.secondary = 'Boredom';
        else this.currentEmotion.secondary = 'Focus';
    }
}
