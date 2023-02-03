/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import './App.css';
import _ from 'lodash';

const dummyText =
  'React is a JavaScript-based user interface library. React components are isolated reusable pieces of code logic with their own UI.';

function App() {
  const [text, setText] = useState(dummyText);
  const [voiceList, setVoiceList] = useState(null);
  const [voice, setVoice] = useState(null);

  useEffect(() => {
    const speechSynthesis = window.speechSynthesis;
    const voices = speechSynthesis.getVoices();
    const sortedVoices = _.sortBy(voices, [(item) => item.name]);
    setVoiceList(sortedVoices);
    setVoice(sortedVoices[0]);
  }, [speechSynthesis]);

  if (!voiceList) return null;

  console.log(voice);

  const handleVoiceChange = (value) => {
    const voiceIndex = parseInt(value);
    console.log(voiceIndex);
    setVoice(voiceList[voiceIndex]);
  };

  const handleSpeak = () => {
    const speechSynthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voice;
    speechSynthesis.speak(utterance);
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div
        style={{
          margin: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <label htmlFor="voice" style={{ marginBottom: '10px' }}>
          Choose Speaking Style
        </label>
        <select
          name="voice"
          id="voice"
          style={{
            padding: '10px 20px',
            borderRadius: '5px',
            border: '1px solid darkGray',
            color: 'slateGray'
          }}
          onChange={(e) => handleVoiceChange(e.target.value)}
        >
          {voiceList.map((lang, index) => (
            <option key={index} value={index}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        autoFocus
        rows="10"
        cols="40"
        style={{ marginBottom: '1rem' }}
      />
      <button onClick={handleSpeak} className="button-30">
        Speak
      </button>
    </div>
  );
}

export default App;
