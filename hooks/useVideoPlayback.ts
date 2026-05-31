"use client";

import { useRef } from 'react';

export function useVideoPlayback() {
  const ref = useRef<HTMLVideoElement | null>(null);

  const play = () => ref.current?.play();
  const pause = () => ref.current?.pause();

  return { ref, play, pause };
}
