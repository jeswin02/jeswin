"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Database, Cloud, Terminal, Boxes, Layers } from "lucide-react";

// Animated counter for stats
const AnimatedCounter = ({
  end,
  duration = 2,
  suffix = "",
  isInView,
}: {
  end: number;
  duration?: number;
  suffix?: string;
  isInView: boolean;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!isInView) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, isInView]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCode, setActiveCode] = useState(0);

  const codeSnippets = [
    {
      lang: "components/PrimaryButton.tsx",
      code: `type Props = { label: string; onClick?: () => void };
  export function PrimaryButton({ label, onClick }: Props) {
    return (
      <button onClick={onClick}>
        {label}
      </button>
    );
  }`,
      color: "from-blue-400 to-cyan-400",
    },
    {
      lang: "lib/api/fetchUser.js",
      code: `export async function fetchUser(id) {
    const response = await fetch(\`/api/users/\${id}\`, {
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw new Error("Failed to fetch user");
    const data = await response.json();
    return data;
  }`,
      color: "from-yellow-400 to-amber-400",
    },
    {
      lang: "services/recommendation_engine.py",
      code: `from typing import List, Dict
  from sklearn.metrics.pairwise import cosine_similarity
  
  def get_recommendations(user_vector, all_vectors) -> List[Dict]:
      scores = cosine_similarity([user_vector], all_vectors)[0]
      ranked = sorted(enumerate(scores), key=lambda x: x[1], reverse=True)
      top = ranked[:10]
      return [{"id": i, "score": float(s)} for i, s in top]`,
      color: "from-emerald-400 to-teal-400",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCode((prev) => (prev + 1) % codeSnippets.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const skills = [
    {
      category: "Frontend Mastery",
      icon: Code2,
      skills: ["React", "Next.js", "React Native", "TypeScript"],
      color: "purple",
      variant: "browser" as const,
    },
    {
      category: "Backend Engineering",
      icon: Terminal,
      skills: ["Node.js", "Express", "Hono", "FastAPI", "RBAC", "Cron Jobs"],
      color: "blue",
      variant: "terminal" as const,
    },
    {
      category: "Database Systems",
      icon: Database,
      skills: ["PostgreSQL", "MongoDB", "Prisma", "Firestore"],
      color: "green",
      variant: "schema" as const,
    },
    {
      category: "Cloud & DevOps",
      icon: Cloud,
      skills: ["AWS", "Docker", "CI/CD", "Vercel", "Nginx", "Git"],
      color: "cyan",
      variant: "pipeline" as const,
    },
    {
      category: "Architecture",
      icon: Boxes,
      skills: [
        "System Design",
        "REST APIs",
        "WebSockets",
        "Microservices",
        "SSE",
      ],
      color: "pink",
      variant: "diagram" as const,
    },
    {
      category: "Tools & Integration",
      icon: Layers,
      skills: ["Payment Gateways", "AI SDKs", "FCM"],
      color: "orange",
      variant: "toolbox" as const,
    },
  ];

  return (
    <section
      id="skills"
      className="py-12 sm:py-16 md:py-20 relative overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 mt-10"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Technical Arsenal
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 mx-auto rounded-full" />
          <p className="text-gray-400 mt-4 text-base sm:text-lg px-2">
            Mastering the tools that power modern web development
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {/* Large Code Editor Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 bg-gray-900/60 backdrop-blur-md rounded-2xl border border-purple-500/25 hover:border-purple-500/50 transition-all duration-300 group relative overflow-hidden shadow-xl shadow-purple-500/5"
          >
            <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />
            <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl group-hover:opacity-80 transition-opacity duration-500" />

            <div className="relative z-10 p-4 sm:p-5 md:p-6">
              {/* Editor title bar */}
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5 min-w-0">
                <div className="flex shrink-0 gap-1.5">
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex-1 flex justify-center min-w-0">
                  <span className="text-[10px] sm:text-xs text-gray-500 font-medium truncate block text-center">
                    editor.tsx — Portfolio
                  </span>
                </div>
                <Code2 className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400/80 shrink-0" />
              </div>

              {/* Tabs */}
              <div className="flex flex-wrap gap-1 mb-0 rounded-t-lg bg-gray-950/80 border border-b-0 border-gray-700/80 px-1.5 sm:px-2 pt-1.5 sm:pt-2">
                {codeSnippets.map((snippet, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveCode(idx)}
                    className={`px-2.5 py-2 sm:px-4 sm:py-2.5 rounded-t-md text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 sm:gap-2 ${
                      activeCode === idx
                        ? "bg-gray-800 text-white border border-b-0 border-gray-700 shadow-[0_-1px_0_0_rgba(168,85,247,0.4)]"
                        : "text-gray-500 hover:text-gray-300"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full shrink-0 ${
                        idx === 0
                          ? "bg-cyan-400"
                          : idx === 1
                            ? "bg-amber-400"
                            : "bg-emerald-400"
                      }`}
                    />
                    <span className="truncate">{snippet.lang}</span>
                  </button>
                ))}
              </div>

              {/* Code area with line numbers */}
              <div className="bg-gray-950/90 rounded-b-xl border border-gray-700/80 border-t-0 font-mono overflow-hidden">
                <div className="flex min-h-[140px] sm:min-h-[160px] md:min-h-[180px]">
                  <div className="select-none py-3 sm:py-4 pl-2 pr-2 sm:pl-4 sm:pr-3 text-right text-gray-600 text-[10px] sm:text-xs leading-5 sm:leading-6 border-r border-gray-700/60 shrink-0">
                    {codeSnippets[activeCode].code.split("\n").map((_, i) => (
                      <div key={i}>{i + 1}</div>
                    ))}
                  </div>
                  <div className="flex-1 min-w-0 py-3 sm:py-4 pl-2 pr-2 sm:pl-4 sm:pr-4 overflow-x-auto">
                    <motion.pre
                      key={activeCode}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25 }}
                      className={`text-xs sm:text-sm leading-5 sm:leading-6 whitespace-pre text-transparent bg-clip-text bg-gradient-to-br ${codeSnippets[activeCode].color} min-w-0`}
                    >
                      {codeSnippets[activeCode].code}
                      <span
                        className="inline-block w-2 h-4 ml-0.5 bg-cyan-400 rounded-sm align-middle animate-pulse"
                        aria-hidden
                      />
                    </motion.pre>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Card — 10,000+ Lines */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gradient-to-br from-slate-800/80 to-gray-900/90 backdrop-blur-md rounded-2xl p-5 sm:p-6 md:p-8 border border-blue-500/25 hover:border-cyan-500/50 transition-all duration-300 relative overflow-hidden group shadow-xl shadow-blue-500/5"
          >
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(34,211,238,0.04)_100%)]" />
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-cyan-500/15 to-transparent" />
            <div className="absolute top-1/2 right-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />

            <div className="relative z-10 flex flex-col h-full min-h-[180px] sm:min-h-[200px]">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <Terminal className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400" />
                <span className="text-[10px] sm:text-xs text-cyan-400/80 font-medium uppercase tracking-wider">
                  Shipped
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-1 tabular-nums">
                  <AnimatedCounter
                    end={10000}
                    duration={2}
                    suffix="+"
                    isInView={isInView}
                  />
                </h3>
                <p className="text-gray-400 text-base sm:text-lg mb-4 sm:mb-6">
                  Lines of Code Written
                </p>

                {/* Progress bar */}
                <div className="space-y-1.5 sm:space-y-2">
                  <div className="h-1.5 sm:h-2 rounded-full bg-gray-700/80 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: "85%" } : { width: 0 }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                    />
                  </div>
                  <p className="text-[10px] sm:text-xs text-gray-500">
                    Across repos & production apps
                  </p>
                </div>
              </div>

              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-700/50 flex gap-3 sm:gap-4 text-center">
                <div className="flex-1 min-w-0">
                  <p className="text-lg sm:text-xl font-bold text-white">2+</p>
                  <p className="text-[10px] sm:text-xs text-gray-500">Years</p>
                </div>
                <div className="w-px bg-gray-600 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-lg sm:text-xl font-bold text-white">15+</p>
                  <p className="text-[10px] sm:text-xs text-gray-500">
                    Projects
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Skill Categories Grid — each card has a unique design */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {skills.map((skill, index) => {
            type ColorKey =
              | "purple"
              | "blue"
              | "green"
              | "cyan"
              | "pink"
              | "orange";
            const color = skill.color as ColorKey;
            const variants: Record<ColorKey, string> = {
              purple:
                "border-purple-500/25 hover:border-purple-500/50 shadow-lg shadow-purple-500/5",
              blue: "border-blue-500/25 hover:border-blue-500/50 shadow-lg shadow-blue-500/5",
              green:
                "border-emerald-500/25 hover:border-emerald-500/50 shadow-lg shadow-emerald-500/5",
              cyan: "border-cyan-500/25 hover:border-cyan-500/50 shadow-lg shadow-cyan-500/5",
              pink: "border-pink-500/25 hover:border-pink-500/50 shadow-lg shadow-pink-500/5",
              orange:
                "border-orange-500/25 hover:border-orange-500/50 shadow-lg shadow-orange-500/5",
            };
            const iconColors: Record<ColorKey, string> = {
              purple: "text-purple-400",
              blue: "text-blue-400",
              green: "text-emerald-400",
              cyan: "text-cyan-400",
              pink: "text-pink-400",
              orange: "text-orange-400",
            };

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.08 * index }}
                className={`group relative overflow-hidden rounded-2xl border backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${variants[color]}`}
              >
                {/* Frontend — Browser window with bento layout */}
                {skill.variant === "browser" && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-950/40 to-gray-900/80" />
                    <div className="absolute top-0 left-0 right-0 h-7 sm:h-8 bg-gray-800/60 border-b border-purple-500/20 flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 min-w-0">
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500/80 shrink-0" />
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-500/80 shrink-0" />
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500/80 shrink-0" />
                      <span className="ml-1 sm:ml-2 flex-1 min-w-0 max-w-[55%] h-4 sm:h-5 rounded bg-gray-700/60 text-[9px] sm:text-[10px] text-gray-500 flex items-center pl-1.5 sm:pl-2 truncate">
                        app://{skill.category.toLowerCase().replace(/\s/g, "-")}
                      </span>
                    </div>
                    <div className="relative z-10 p-3 pt-9 sm:p-4 sm:pt-11 flex flex-col min-h-0">
                      <div className="flex items-center gap-2 mb-2 sm:mb-3 min-w-0 shrink-0">
                        <Code2
                          className={`w-6 h-6 sm:w-7 sm:h-7 shrink-0 ${iconColors.purple}`}
                        />
                        <h3 className="text-base sm:text-lg font-bold text-white truncate">
                          {skill.category}
                        </h3>
                      </div>
                      <div className="grid grid-cols-3 grid-rows-3 gap-1.5 sm:gap-2 flex-1 min-h-[140px] sm:min-h-[160px]">
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="col-span-2 row-span-2 rounded-xl bg-purple-500/25 border border-purple-500/40 flex flex-col items-center justify-center p-2 sm:p-3 hover:bg-purple-500/35 hover:border-purple-400/50 transition-colors"
                        >
                          <span className="text-sm sm:text-base font-bold text-purple-100">
                            {skill.skills[0]}
                          </span>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="col-span-1 row-span-1 rounded-xl bg-purple-500/20 border border-purple-500/35 flex items-center justify-center p-2 sm:p-2.5 hover:bg-purple-500/30 hover:border-purple-400/50 transition-colors"
                        >
                          <span className="text-[11px] sm:text-xs font-semibold text-purple-200 truncate">
                            {skill.skills[1]}
                          </span>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="col-span-1 row-span-1 rounded-xl bg-purple-500/20 border border-purple-500/35 flex items-center justify-center p-2 sm:p-2.5 hover:bg-purple-500/30 hover:border-purple-400/50 transition-colors"
                        >
                          <span className="text-[11px] sm:text-xs font-semibold text-purple-200 truncate">
                            {skill.skills[2]}
                          </span>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="col-span-2 row-span-1 rounded-xl bg-purple-500/20 border border-purple-500/35 flex items-center justify-center p-2 sm:p-2.5 hover:bg-purple-500/30 hover:border-purple-400/50 transition-colors"
                        >
                          <span className="text-[11px] sm:text-xs font-semibold text-purple-200 truncate">
                            {skill.skills[3]}
                          </span>
                        </motion.div>
                      </div>
                    </div>
                  </>
                )}

                {/* Backend — Terminal / CLI */}
                {skill.variant === "terminal" && (
                  <>
                    <div className="absolute inset-0 bg-gray-950/90" />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.04)_1px,transparent_1px)] bg-[size:16px_16px]" />
                    <div className="relative z-10 p-4 sm:p-5 min-w-0">
                      <div className="flex items-center gap-2 mb-3 sm:mb-4 pb-2 border-b border-blue-500/20 min-w-0">
                        <Terminal
                          className={`w-6 h-6 sm:w-7 sm:h-7 shrink-0 ${iconColors.blue}`}
                        />
                        <h3 className="text-base sm:text-lg font-bold text-white truncate">
                          {skill.category}
                        </h3>
                      </div>
                      <div className="font-mono text-[11px] sm:text-xs space-y-1.5 overflow-x-auto">
                        {skill.skills.map((tech, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 text-gray-300 min-w-0"
                          >
                            <span className="text-blue-400 select-none shrink-0">
                              $
                            </span>
                            <span className="truncate">
                              npm install {tech.toLowerCase()}
                            </span>
                          </div>
                        ))}
                        <div className="flex items-center gap-2 text-gray-500 pt-1">
                          <span className="text-emerald-500 shrink-0">▋</span>
                          <span className="animate-pulse">_</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Database — Table / schema */}
                {skill.variant === "schema" && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/30 to-gray-900/80" />
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl" />
                    <div className="relative z-10 p-4 sm:p-5 min-w-0">
                      <div className="flex items-center gap-2 mb-3 sm:mb-4 min-w-0">
                        <Database
                          className={`w-6 h-6 sm:w-7 sm:h-7 shrink-0 ${iconColors.green}`}
                        />
                        <h3 className="text-base sm:text-lg font-bold text-white truncate">
                          {skill.category}
                        </h3>
                      </div>
                      <div className="rounded-xl border border-emerald-500/30 overflow-hidden bg-black/20 min-w-0">
                        <div className="grid grid-cols-1 gap-0">
                          <div className="grid grid-cols-2 gap-1 sm:gap-2 px-2 py-1.5 sm:px-3 sm:py-2 bg-emerald-500/20 text-emerald-300 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider">
                            <span className="truncate">Tech</span>
                            <span className="truncate">Type</span>
                          </div>
                          {skill.skills.map((tech, i) => (
                            <div
                              key={i}
                              className="grid grid-cols-2 gap-1 sm:gap-2 px-2 py-1.5 sm:px-3 sm:py-2 text-[11px] sm:text-xs text-gray-300 border-t border-emerald-500/10 even:bg-emerald-500/5 min-w-0"
                            >
                              <span className="truncate">{tech}</span>
                              <span className="text-emerald-400/80 truncate">
                                {i % 2 === 0 ? "SQL / ORM" : "NoSQL / ORM"}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Cloud & DevOps — Service tiles */}
                {skill.variant === "pipeline" && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-800/90 via-cyan-950/20 to-slate-900/90" />
                    <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-400/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-28 h-28 bg-teal-500/10 rounded-full blur-2xl" />
                    <div className="relative z-10 p-4 sm:p-5 min-w-0">
                      <div className="flex items-center gap-2 mb-4 sm:mb-5 min-w-0">
                        <Cloud
                          className={`w-6 h-6 sm:w-7 sm:h-7 shrink-0 ${iconColors.cyan}`}
                        />
                        <h3 className="text-base sm:text-lg font-bold text-white truncate">
                          {skill.category}
                        </h3>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                        {skill.skills.map((tech, i) => (
                          <motion.div
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            className="rounded-lg sm:rounded-xl bg-white/5 border border-cyan-500/20 px-2.5 py-2 sm:px-4 sm:py-3 backdrop-blur-sm hover:border-cyan-400/40 hover:bg-cyan-500/10 transition-colors min-w-0"
                          >
                            <span className="text-xs sm:text-sm font-semibold text-cyan-50 block truncate">
                              {tech}
                            </span>
                            <span className="text-[9px] sm:text-[10px] text-cyan-400/70 mt-0.5 block truncate">
                              {[
                                "Infra",
                                "Containers",
                                "Automation",
                                "Hosting",
                                "Web Server",
                                "Version Control",
                              ][i] ?? "Deploy"}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                      <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-cyan-500/20 flex items-center justify-between gap-2 text-[10px] sm:text-[11px] text-cyan-400/80 flex-wrap">
                        <span className="truncate">Build → Deploy → Scale</span>
                        <span className="flex items-center gap-1.5 shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          Live
                        </span>
                      </div>
                    </div>
                  </>
                )}

                {/* Architecture — Flowchart with connected nodes */}
                {skill.variant === "diagram" && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-950/50 via-gray-900/95 to-fuchsia-950/40" />
                    <div
                      className="absolute inset-0 opacity-[0.03]"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle at 1px 1px, rgb(236 72 153) 1px, transparent 0)",
                        backgroundSize: "20px 20px",
                      }}
                    />
                    <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/15 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-1/2 w-24 h-24 bg-fuchsia-500/10 rounded-full blur-2xl -translate-x-1/2 translate-y-1/2" />
                    <svg
                      className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
                      viewBox="0 0 200 140"
                      preserveAspectRatio="xMidYMid meet"
                      aria-hidden
                    >
                      <defs>
                        <linearGradient
                          id={`arch-line-${index}`}
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="0%"
                        >
                          <stop
                            offset="0%"
                            stopColor="rgb(236,72,153)"
                            stopOpacity="0.8"
                          />
                          <stop
                            offset="100%"
                            stopColor="rgb(192,132,252)"
                            stopOpacity="0.4"
                          />
                        </linearGradient>
                        <filter
                          id={`arch-glow-${index}`}
                          x="-20%"
                          y="-20%"
                          width="140%"
                          height="140%"
                        >
                          <feGaussianBlur stdDeviation="1" result="blur" />
                          <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                      </defs>
                      <path
                        d="M 100 42 L 100 62"
                        stroke={`url(#arch-line-${index})`}
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        filter={`url(#arch-glow-${index})`}
                      />
                      <path
                        d="M 100 70 L 50 108"
                        stroke={`url(#arch-line-${index})`}
                        strokeWidth="1.8"
                        fill="none"
                        strokeLinecap="round"
                        opacity="0.85"
                      />
                      <path
                        d="M 100 70 L 150 108"
                        stroke={`url(#arch-line-${index})`}
                        strokeWidth="1.8"
                        fill="none"
                        strokeLinecap="round"
                        opacity="0.85"
                      />
                      <circle
                        cx="100"
                        cy="66"
                        r="4"
                        fill="rgb(236,72,153)"
                        fillOpacity="0.5"
                      />
                    </svg>
                    <div className="relative z-10 p-4 sm:p-5 flex flex-col h-full min-h-[200px] sm:min-h-[220px]">
                      <div className="flex items-center gap-2 mb-3 sm:mb-4 min-w-0">
                        <div className="rounded-lg bg-pink-500/20 p-1.5 border border-pink-500/30 shrink-0">
                          <Boxes
                            className={`w-5 h-5 sm:w-6 sm:h-6 ${iconColors.pink}`}
                          />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-base sm:text-lg font-bold text-white truncate">
                            {skill.category}
                          </h3>
                          <p className="text-[10px] sm:text-[11px] text-pink-400/70">
                            System design
                          </p>
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col items-center justify-center gap-0 min-h-[140px]">
                        {/* Top: System Design */}
                        <motion.div
                          whileHover={{
                            scale: 1.06,
                            boxShadow: "0 0 20px rgba(236,72,153,0.3)",
                          }}
                          className="rounded-xl border-2 border-pink-500/50 bg-pink-500/25 px-4 py-2.5 shadow-lg shadow-pink-500/25 backdrop-blur-sm mb-2"
                        >
                          <p className="text-xs sm:text-sm font-semibold text-pink-50 whitespace-nowrap">
                            {skill.skills[0]}
                          </p>
                        </motion.div>
                        {/* Connector dot */}
                        <div className="w-2 h-2 rounded-full bg-pink-400/60 shadow-[0_0_8px_rgba(236,72,153,0.5)] mb-2" />
                        {/* Bottom: 4 items in 2x2 */}
                        <div className="grid grid-cols-2 gap-2 w-full max-w-full px-0 sm:px-1">
                          {skill.skills.slice(1, 5).map((tech, i) => (
                            <motion.div
                              key={i}
                              whileHover={{
                                scale: 1.05,
                                boxShadow: "0 0 16px rgba(236,72,153,0.25)",
                              }}
                              className="rounded-xl border border-pink-500/40 bg-pink-500/15 px-2 py-2 sm:px-3 sm:py-2.5 backdrop-blur-sm min-w-0"
                            >
                              <p className="text-[10px] sm:text-xs font-medium text-pink-200 truncate text-center">
                                {tech}
                              </p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                      <p className="text-[10px] sm:text-[11px] text-pink-400/60 text-center mt-1">
                        Scalable · Decoupled
                      </p>
                    </div>
                  </>
                )}

                {/* Tools & Integration — Integrations panel */}
                {skill.variant === "toolbox" && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-b from-stone-900/95 via-amber-950/15 to-stone-900/95" />
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
                    <div className="absolute top-1/2 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                    <div className="relative z-10 p-4 sm:p-5 min-w-0">
                      <div className="flex items-center gap-2 mb-4 sm:mb-5 min-w-0">
                        <div className="rounded-lg sm:rounded-xl bg-amber-500/20 p-1.5 sm:p-2 border border-amber-500/30 shrink-0">
                          <Layers
                            className={`w-5 h-5 sm:w-6 sm:h-6 ${iconColors.orange}`}
                          />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-base sm:text-lg font-bold text-white leading-tight truncate">
                            {skill.category}
                          </h3>
                          <p className="text-[10px] sm:text-[11px] text-amber-400/80">
                            Connected services
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2 sm:space-y-3">
                        {skill.skills.map((tech, i) => {
                          const labels = [
                            "Payments",
                            "AI & ML",
                            "Push notifications",
                          ];
                          return (
                            <motion.div
                              key={i}
                              whileHover={{ scale: 1.01 }}
                              className="flex items-center gap-2 sm:gap-3 rounded-lg sm:rounded-xl border border-amber-500/20 bg-white/[0.04] px-3 py-2.5 sm:px-4 sm:py-3 hover:border-amber-400/35 hover:bg-amber-500/10 transition-colors min-w-0"
                            >
                              <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/25 text-amber-200 text-xs sm:text-sm font-bold border border-amber-500/30">
                                {tech.charAt(0)}
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-xs sm:text-sm font-semibold text-amber-50 truncate">
                                  {tech}
                                </p>
                                <p className="text-[10px] sm:text-[11px] text-amber-400/70 truncate">
                                  {labels[i]}
                                </p>
                              </div>
                              <span
                                className="h-2 w-2 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]"
                                title="Connected"
                              />
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
