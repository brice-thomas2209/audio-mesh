export interface IAudioStore {
  context?: AudioContext;
  source?: MediaElementAudioSourceNode;
  analyser?: AnalyserNode;
  data?: Uint8Array;
}

export const AudioStore: IAudioStore = {};
