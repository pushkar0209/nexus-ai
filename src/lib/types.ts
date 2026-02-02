export interface EmotionState {
    primary: string;
    secondary: string;
    valence: number; // -1 to 1
    arousal: number; // 0 to 1
    confidence: number; // 0 to 1
}

export interface NarrativeUpdate {
    story_branch: string;
    plot_adjustment: string;
}

export interface DialogueStyle {
    tone: string;
    intensity: 'low' | 'medium' | 'high';
    pacing: 'slow' | 'medium' | 'fast';
}

export interface MusicDirection {
    mood: string;
    tempo: 'slow' | 'medium' | 'fast';
    instrumentation: string[];
}

export interface VisualPacing {
    cut_speed: 'slow' | 'medium' | 'fast';
    lighting: 'soft' | 'harsh' | 'dim' | 'bright';
    motion_density: 'low' | 'medium' | 'high';
}

export interface EngineOutput {
    detected_emotion: EmotionState;
    narrative_update: NarrativeUpdate;
    dialogue_style: DialogueStyle;
    music_direction: MusicDirection;
    visual_pacing: VisualPacing;
}

export interface StoryNode {
    id: string;
    text: string;
    choices?: { text: string; nextId: string }[];
    trigger?: (emotion: EmotionState) => boolean;
}
