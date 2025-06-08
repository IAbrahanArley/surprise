"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

const playlist = [
  { src: "/musica2.mp3", title: "É Você" },
  { src: "/musica1.mp3", title: "Amor I love you" },
  { src: "/musica3.mp3", title: "Nossa dança" },
  { src: "/musica4.mp3", title: "De janeiro a janeiro" },
];

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [progress, setProgress] = useState(0);

  const current = playlist[currentTrack];

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    setCurrentTrack((prev) => (prev + 1) % playlist.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length);
    setProgress(0);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = playlist[currentTrack].src;
    if (isPlaying) {
      audio.play();
    }

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleNext);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleNext);
    };
  }, [currentTrack, isPlaying]);

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-lg mb-2 p-4 w-full max-w-sm shadow-md flex flex-col gap-2 ">
      <p className="text-xl font-medium text-gray-800">🎵 {current.title}</p>

      <div className="relative w-full h-2 bg-pink-200 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-pink-500 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex items-center justify-around  mt-2">
        <button onClick={handlePrev}>
          <SkipBack size={24} className="text-pink-600 hover:text-pink-800" />
        </button>
        <button onClick={togglePlay}>
          {isPlaying ? (
            <Pause size={28} className="text-pink-600 hover:text-pink-800" />
          ) : (
            <Play size={28} className="text-pink-600 hover:text-pink-800" />
          )}
        </button>
        <button onClick={handleNext}>
          <SkipForward
            size={24}
            className="text-pink-600 hover:text-pink-800"
          />
        </button>
      </div>

      <audio ref={audioRef} hidden />
    </div>
  );
}
