"use client";

import { useRef, useState } from "react";
import type { Invitation } from "@/types/invitation";

export default function MusicControl({ invitation }: { invitation: Invitation }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  if (!invitation.music?.enabled) return null;

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      // user-initiated only — never autoplay
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  }

  return (
    <>
      <audio ref={audioRef} src={invitation.music.url} loop />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause music" : "Play music"}
        aria-pressed={playing}
        className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-wine text-cream shadow-lg transition-transform hover:scale-105"
      >
        <span className={playing ? "motion-safe:animate-pulse" : ""}>{playing ? "♫" : "♪"}</span>
      </button>
    </>
  );
}
