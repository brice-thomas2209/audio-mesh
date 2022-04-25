import React from 'react';
import './Audio.scss';
import { setupAudioContext } from '../../classes/audio/createAudioContext';
import { AudioStore } from '../../classes/AudioInstance';

function Audio() {
  const play = async () => {
    if (!AudioStore.context) {
      setupAudioContext({ elementId: 'Audio' });
    }
  };
  return (
    <div className="Audio">
      <audio id="Audio" src="./music.mp3" controls autoPlay onPlay={play} />
    </div>
  );
}

export default Audio;
