"use client";

import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { CardStreamController } from "../classes/card-stream-controller";
import { ParticleSystem } from "../classes/particle-system";
import { ParticleScanner } from "../classes/particle-scanner";

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardLineRef = useRef<HTMLDivElement>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);
  const scannerCanvasRef = useRef<HTMLCanvasElement>(null);
  const [speed, setSpeed] = useState(80);
  const [isPaused, setIsPaused] = useState(false);

  const controllerRef = useRef<any>(null);
  const particleSystemRef = useRef<any>(null);
  const particleScannerRef = useRef<any>(null);

  useEffect(() => {
    if (containerRef.current && cardLineRef.current) {
      controllerRef.current = new CardStreamController(
        containerRef.current,
        cardLineRef.current,
        setSpeed,
        particleScannerRef,
      );
    }

    if (particleCanvasRef.current) {
      particleSystemRef.current = new ParticleSystem(particleCanvasRef.current);
    }

    if (scannerCanvasRef.current) {
      particleScannerRef.current = new ParticleScanner(
        scannerCanvasRef.current,
      );
    }

    // Cleanup
    return () => {
      if (controllerRef.current) {
        controllerRef.current.destroy();
      }
      if (particleSystemRef.current) {
        particleSystemRef.current.destroy();
      }
      if (particleScannerRef.current) {
        particleScannerRef.current.destroy();
      }
    };
  }, []);

  const toggleAnimation = () => {
    if (controllerRef.current) {
      const isAnimating = controllerRef.current.toggleAnimation();
      setIsPaused(!isAnimating);
    }
  };

  const resetPosition = () => {
    if (controllerRef.current) {
      controllerRef.current.resetPosition();
      setIsPaused(false);
    }
  };

  const changeDirection = () => {
    if (controllerRef.current) {
      controllerRef.current.changeDirection();
    }
  };

  return (
    <div id="projects" className="pt-16 relative w-full overflow-hidden">
      <style jsx>{`
        @keyframes glitch {
          0% {
            opacity: 1;
          }
          15% {
            opacity: 0.9;
          }
          16% {
            opacity: 1;
          }
          49% {
            opacity: 0.8;
          }
          50% {
            opacity: 1;
          }
          99% {
            opacity: 0.9;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes scanEffect {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }
      `}</style>

      {/* Section header — matches Technical Arsenal styling */}
      <div className="text-center mb-12 sm:mb-16 mt-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Projects
          </span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 mx-auto rounded-full" />
        <p className="text-gray-400 mt-4 text-base sm:text-lg px-2">
          What I&apos;ve built and shipped
        </p>
      </div>
      {/* <div className="absolute top-5 left-5 flex gap-2.5 z-[100]">
        <button
          onClick={toggleAnimation}
          className="px-5 py-2.5 bg-white/20 border-none rounded-xl text-white font-bold cursor-pointer backdrop-blur-sm transition-all duration-300 text-sm hover:bg-white/30 hover:-translate-y-0.5 hover:shadow-[0_5px_15px_rgba(0,0,0,0.2)]"
        >
          {isPaused ? "▶️ Play" : "⏸️ Pause"}
        </button>
        <button
          onClick={resetPosition}
          className="px-5 py-2.5 bg-white/20 border-none rounded-xl text-white font-bold cursor-pointer backdrop-blur-sm transition-all duration-300 text-sm hover:bg-white/30 hover:-translate-y-0.5 hover:shadow-[0_5px_15px_rgba(0,0,0,0.2)]"
        >
          🔄 Reset
        </button>
        <button
          onClick={changeDirection}
          className="px-5 py-2.5 bg-white/20 border-none rounded-xl text-white font-bold cursor-pointer backdrop-blur-sm transition-all duration-300 text-sm hover:bg-white/30 hover:-translate-y-0.5 hover:shadow-[0_5px_15px_rgba(0,0,0,0.2)]"
        >
          ↔️ Direction
        </button>
      </div> */}

      {/* Speed Indicator */}
      {/* <div className="absolute top-5 right-5 text-white text-base bg-black/30 px-4 py-2 rounded-xl backdrop-blur-sm z-[100]">
        Speed: <span>{speed}</span> px/s
      </div> */}

      {/* Main Container */}
      <div className="relative w-full h-[50vh] flex items-center justify-center">
        {/* Particle Canvas (Background) */}
        <canvas
          ref={particleCanvasRef}
          className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-[250px] z-0 pointer-events-none"
        />

        {/* Scanner Canvas (Scanner beam with particles) */}
        <canvas
          ref={scannerCanvasRef}
          className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-[300px] z-[15] pointer-events-none"
        />

        {/* Card Stream */}
        <div
          ref={containerRef}
          className="absolute w-full h-[180px] flex items-center overflow-visible"
        >
          <div
            ref={cardLineRef}
            className="flex items-center gap-[60px] whitespace-nowrap cursor-grab select-none will-change-transform active:cursor-grabbing"
          />
        </div>
      </div>
    </div>
  );
};

export default Projects;
