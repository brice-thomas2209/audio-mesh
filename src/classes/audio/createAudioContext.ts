import {AudioStore} from "../AudioInstance";

export const setupAudioContext = ({ elementId }: { elementId: string}): void => {
  if (typeof window !== 'undefined') {
    AudioStore.context = new window.AudioContext();
    const audioElement = document.getElementById(elementId);
    if (audioElement) {
      AudioStore.source = AudioStore.context.createMediaElementSource(audioElement as HTMLMediaElement);
    }
    AudioStore.analyser = AudioStore.context.createAnalyser();
    if (AudioStore.analyser && AudioStore.source) {
      AudioStore.source.connect(AudioStore.analyser);
      AudioStore.analyser.connect(AudioStore.context.destination);
      AudioStore.analyser.fftSize = 1024;
      AudioStore.data = new Uint8Array(AudioStore.analyser.frequencyBinCount);
      console.log(AudioStore.data);
    }
  }
};