"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/*
  ╔══════════════════════════════════════════════════╗
  ║  ✏️  EDIT YOUR SONG HERE                        ║
  ║  Paste the YouTube video ID (the part after      ║
  ║  ?v= in the URL).                                ║
  ╚══════════════════════════════════════════════════╝
*/
const VIDEO_ID = "sz4YaMr1rlo";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export function BackgroundMusic() {
  const playerRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Load the YouTube IFrame API script once
    if (!document.getElementById("youtube-iframe-api")) {
      const tag = document.createElement("script");
      tag.id = "youtube-iframe-api";
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }

    const createPlayer = () => {
      playerRef.current = new window.YT.Player("bg-music-player", {
        videoId: VIDEO_ID,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          loop: 1,
          playlist: VIDEO_ID, // required by YouTube for loop to work
        },
        events: {
          onReady: () => setReady(true),
        },
      });
    };

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      const previous = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        previous?.();
        createPlayer();
      };
    }
  }, []);

  const toggle = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
    setIsPlaying((prev) => !prev);
  };

  return (
    <>
      {/* Hidden player — audio only, no visible video */}
      <div className="pointer-events-none fixed -left-[9999px] -top-[9999px] h-1 w-1 overflow-hidden opacity-0">
        <div id="bg-music-player" />
      </div>

      <motion.button
        type="button"
        onClick={toggle}
        disabled={!ready}
        aria-label={isPlaying ? "Pausar música" : "Tocar música"}
        className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-orchid/30 bg-orchid/10 text-lg text-plum backdrop-blur-sm transition-all duration-300 hover:border-orchid/60 hover:bg-orchid/20 disabled:opacity-50"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
      >
        <motion.span
          animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 8, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
        >
          {isPlaying ? "⏸" : "♪"}
        </motion.span>
      </motion.button>
    </>
  );
}
