import React, { useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';

export default function CinematicReel() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section className="relative w-full h-[75vh] md:h-[90vh] bg-[#1a1715] overflow-hidden border-t border-[#a89474]/20 z-20">
      {/* Background Cinematic Video Loop from Sondaven */}
      <video
        ref={videoRef}
        autoPlay
        muted={isMuted}
        loop
        playsInline
        className="w-full h-full object-cover scale-105 opacity-80"
      >
        <source src="/assets/son-daven_short.mp4" type="video/mp4" />
        <source src="https://assets.sondaven.com/son-daven_short.mp4" type="video/mp4" />
      </video>

      {/* Cinematic Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1a1715] via-transparent to-[#1a1715]/70" />

      {/* Foreground Editorial Title & Badges */}
      <div className="absolute inset-0 p-8 md:p-14 flex flex-col justify-between pointer-events-none">
        <div className="flex justify-between items-start font-mono text-xs tracking-widest text-[#a89474] uppercase">
          <span>[ CINEMATIC DISPATCH 01 ]</span>
          <span>4K DIGITAL CAPTURE — YAREMCHE RIDGE</span>
        </div>

        <div className="max-w-2xl">
          <span className="font-mono text-xs tracking-[0.25em] text-[#a89474] uppercase block mb-3">
            [ ARCHITECTURAL DOCUMENTATION ]
          </span>
          <h2 className="font-serif text-4xl md:text-7xl text-white tracking-tight leading-none mb-4">
            Resonance in Stone & Pine
          </h2>
          <p className="font-sans text-sm text-white/80 max-w-lg leading-relaxed">
            Witness the confluence of raw geological stone and bespoke biophilic architecture immersed in eternal mountain cloud cover.
          </p>
        </div>

        {/* Video Player Controls */}
        <div className="flex items-center justify-between border-t border-[#a89474]/20 pt-4 pointer-events-auto font-mono text-xs">
          <div className="flex items-center space-x-4">
            <button
              onClick={togglePlay}
              className="flex items-center space-x-2 border border-[#a89474]/40 hover:border-[#a89474] px-4 py-2 text-white hover:text-[#a89474] transition-colors bg-[#1a1715]/60 backdrop-blur-md"
            >
              {isPlaying ? <Pause size={12} /> : <Play size={12} />}
              <span>[ {isPlaying ? 'PAUSE REEL' : 'PLAY REEL'} ]</span>
            </button>

            <button
              onClick={toggleMute}
              className="flex items-center space-x-2 border border-[#a89474]/40 hover:border-[#a89474] px-4 py-2 text-white hover:text-[#a89474] transition-colors bg-[#1a1715]/60 backdrop-blur-md"
            >
              {isMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
              <span>[ {isMuted ? 'UNMUTE AUDIO' : 'MUTED'} ]</span>
            </button>
          </div>

          <div className="text-[#a89474] hidden sm:block">
            [ REEL DURATION: 00:32 • 60 FPS ]
          </div>
        </div>
      </div>
    </section>
  );
}
