let synth: SpeechSynthesis | null = null;
let recognition: any | null = null;

// Lazily initialize SpeechSynthesis to prevent crashes on load
function getSynthInstance(): SpeechSynthesis | null {
    if (synth) {
        return synth;
    }
    if ('speechSynthesis' in window) {
        synth = window.speechSynthesis;
        return synth;
    }
    console.warn("Speech synthesis is not supported in this browser.");
    return null;
}

// Lazily initialize the SpeechRecognition API to prevent crashes on load
function getRecognitionInstance(): any | null {
    if (recognition) {
        return recognition;
    }
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        return recognition;
    }
    console.warn("Speech recognition is not supported in this browser.");
    return null;
}

export function cancelSpeech() {
    const synthInstance = getSynthInstance();
    if (synthInstance && synthInstance.speaking) {
        synthInstance.cancel();
    }
}

export function speak(text: string, rate = 0.9, onEnd?: () => void, isMuted = false) {
  const synthInstance = getSynthInstance();

  // If synthesis is not available or muted, call onEnd and exit.
  if (!synthInstance || isMuted) {
    // Also stop any speech that might have started before mute was toggled.
    cancelSpeech();
    if (onEnd) {
      onEnd();
    }
    return;
  }
  
  if (synthInstance.speaking) {
    synthInstance.cancel(); // Cancel previous speech to say the new one
  }
  const utterance = new SpeechSynthesisUtterance(text);
  const voices = synthInstance.getVoices();
  // Await voices if they are not loaded yet.
  if (voices.length === 0) {
      synthInstance.onvoiceschanged = () => {
          const updatedVoices = synthInstance.getVoices();
          const femaleVoice = updatedVoices.find(voice => voice.name.includes('Female') && voice.lang.includes('en'));
          utterance.voice = femaleVoice || updatedVoices[0];
          synthInstance.speak(utterance);
      }
  } else {
      const femaleVoice = voices.find(voice => voice.name.includes('Female') && voice.lang.includes('en'));
      utterance.voice = femaleVoice || voices[0];
      synthInstance.speak(utterance);
  }

  utterance.pitch = 0.9;
  utterance.rate = rate;
  if (onEnd) {
    utterance.onend = onEnd;
  }
}

export function startListening(onResult: (transcript: string) => void, onEnd: () => void) {
  const recognitionInstance = getRecognitionInstance();
  
  if (!recognitionInstance) {
    console.error("Speech recognition is not available, ending listening state.");
    onEnd(); // Immediately call onEnd to prevent UI from getting stuck
    return;
  }
  
  recognitionInstance.onresult = (event: any) => {
    const transcript = event.results[0][0].transcript;
    onResult(transcript);
  };
  
  recognitionInstance.onerror = (event: any) => {
    console.error('Speech recognition error', event.error);
    onEnd();
  };

  recognitionInstance.onend = () => {
    onEnd();
  };

  try {
    recognitionInstance.start();
  } catch(e) {
    console.error("Error starting speech recognition:", e);
    onEnd(); // Also call onEnd if start() throws an error
  }
}

export function stopListening() {
    const recognitionInstance = getRecognitionInstance();
    if (recognitionInstance) {
      try {
        recognitionInstance.stop();
      } catch (e) {
        console.error("Error stopping speech recognition:", e);
      }
    }
}