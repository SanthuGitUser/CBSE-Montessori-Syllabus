export function speak(text: string, rate = 0.9): void {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = rate;
  utter.pitch = 1;
  window.speechSynthesis.speak(utter);
}

/** Letter / number sounds — slightly slower for clarity. */
export function speakPhoneme(text: string): void {
  speak(text, 0.72);
}

export function playAudioUrl(src: string): void {
  if (typeof window === "undefined") return;
  const audio = new Audio(src);
  void audio.play().catch(() => speak("Could not play audio on this device."));
}

export function playRhyme(rhyme: { title: string; lines: string[] }): void {
  speak(`${rhyme.title}. ${rhyme.lines.join(" ")}`, 0.85);
}
