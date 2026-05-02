"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/lib/motion";

export const HeroContent = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-row items-center justify-center px-20 mt-40 w-full z-[20]"
    >
      <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-start">
        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-6 mt-6 text-6xl text-bold text-white max-w-[600px] w-auto h-auto"
        >
          <span>
            I&apos;m{" "}
            <span
              id="name"
              data-aos="fade-in"
              data-aos-delay="200"
              className="inline-flex flex-wrap gap-2 md:gap-0 text-3xl sm:text-4xl md:text-5xl font-bold select-none"
            >
              <span className="flex flex-nowrap my-2">
                {"Jeswin ".split("").map((char, i) => (
                  <span
                    key={i}
                    className="jello cursor-default text-[4rem] sm:text-[3.5rem] md:text-[4rem] lg:text-[5rem] text-transparent bg-clip-text bg-gradient-to-r from-purple-800 to-cyan-200"
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </span>
              <span className="flex flex-nowrap my-2">
                {"Mathew".split("").map((char, i) => (
                  <span
                    key={i}
                    className="jello cursor-default text-[4rem] sm:text-[3.5rem] md:text-[4rem] lg:text-[5rem] text-transparent bg-clip-text bg-gradient-to-r from-purple-800 to-cyan-200"
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </span>
            </span>{" "}
          </span>
        </motion.div>

        <motion.p
          variants={slideInFromLeft(0.8)}
          className="text-lg text-gray-400 my-5 max-w-[600px]"
        >
          Full Stack Software Engineer with experience in Website, Mobile, and
          Software development. Check out my projects and skills.
        </motion.p>

        <motion.div variants={slideInFromLeft(1)}>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block py-2 button-primary text-center text-white cursor-pointer rounded-lg max-w-[200px] w-full"
          >
            Resume
          </a>
        </motion.div>
      </div>

      <motion.div
        variants={slideInFromRight(0.8)}
        className="w-full h-full flex justify-center items-center"
      >
        <Image
          src="/hero-bg.svg"
          alt="work icons"
          height={650}
          width={650}
          draggable={false}
          className="select-none"
        />
      </motion.div>
    </motion.div>
  );
};
