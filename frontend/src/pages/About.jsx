import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Cpu,
  Layers,
  ShieldCheck,
  Compass,
  Anchor,
} from "lucide-react";

export default function AboutPage() {
  // Motion Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", damping: 25, stiffness: 120 },
    },
  };

  const values = [
    {
      icon: <ShieldCheck size={28} className="text-(--bg-accent)" />,
      title: "Forged Quality",
      desc: "Every product under the FORGEWEAR moniker is meticulously engineered to withstand both the elements and the test of modern life. We do not construct; we forge.",
    },
    {
      icon: <Cpu size={28} className="text-(--bg-accent)" />,
      title: "Material Innovation",
      desc: "By fusing recycled synthetics with structured structural weaves, our apparel and footwear push the threshold of performance limits without leaving a footprint.",
    },
    {
      icon: <Layers size={28} className="text-(--bg-accent)" />,
      title: "Minimal Design",
      desc: "We strip away the excess. Our design ethos revolves around structured lines, muted hues, and versatile utility that shifts from standard utility to structural environments.",
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full pb-20 mt-24 min-h-full flex justify-center "
    >
      <div className="w-full max-w-[1440px] xl:max-w-[1680px] pb-20 min-h-full flex flex-col gap-12 sm:gap-16">
        {/* 1. HEADER HERO */}
        <motion.div
          variants={itemVariants}
          className="pb-6 sm:pb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-(--text-color)/20"
        >
          <div className="flex items-center gap-4 sm:gap-6">
            <h2 className="uppercase text-2xl sm:text-3xl lg:text-5xl font-bold tracking-tight text-(--text-color)">
              The Forge Ethos
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-(--bg-accent) bg-(--bg-accent)/10 border border-(--bg-accent)/10 px-3 py-1 rounded-full w-fit self-start sm:self-center">
            Est. 2026
          </p>
        </motion.div>

        {/* 2. CORE MISSION SPLIT */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            <span className="text-xs font-black tracking-widest uppercase text-(--bg-accent)">
              Our Manifesto
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-(--text-color) tracking-tight leading-tight uppercase">
              We Engineer <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-(--bg-accent) to-(--text-color)">
                Structured Motion
              </span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-(--text-color)/75 leading-relaxed font-medium">
              FORGEWEAR was conceived at the intersection of technical utility
              and raw craftsmanship. Built for the modern active nomad, our gear
              is engineered to bridge the gap between heavy performance
              requirements and minimal, high-end street-focused tailoring. We
              believe that what you wear shouldn’t just suit the environment—it
              should master it.
            </p>
          </div>

          {/* Decorative Concept Block */}
          <div className="lg:col-span-5 backdrop-blur-lg bg-gradient-to-br from-(--text-color)/5 to-transparent border border-(--text-color)/10 p-6 sm:p-8 rounded-[2.5rem] flex flex-col justify-between h-[280px] sm:h-[320px] relative overflow-hidden group shadow-md">
            <div className="absolute top-0 right-0 w-32 h-32 bg-(--bg-accent)/5 rounded-full blur-3xl transition-all duration-500 group-hover:bg-(--bg-accent)/15" />
            <div className="flex items-center justify-between">
              <Anchor size={24} className="text-(--bg-accent)" />
              <span className="text-[10px] uppercase font-bold tracking-widest text-(--text-color)/55 border border-(--text-color)/10 rounded-full px-3 py-1">
                Engineered
              </span>
            </div>
            <div className="space-y-2 z-10">
              <h3 className="text-xl sm:text-2xl font-black text-(--text-color) uppercase tracking-tight">
                Designed in the Forge
              </h3>
              <p className="text-xs sm:text-sm text-(--text-color)/70 leading-relaxed font-medium">
                Our footwear prototypes are subjected to extreme wear-cycles to
                ensure zero flex fatigue and continuous structural integrity.
              </p>
            </div>
          </div>
        </motion.div>

        {/* 3. BRAND VALUES GRID */}
        <motion.div variants={itemVariants} className="space-y-6 sm:space-y-8">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-black tracking-widest uppercase text-(--bg-accent)">
              Brand Pillars
            </span>
            <h2 className="text-xl sm:text-3xl font-bold uppercase text-(--text-color) tracking-tight">
              How We Construct
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {values.map((v, idx) => (
              <div
                key={idx}
                className="group p-5 sm:p-6 lg:p-8 border border-(--text-color)/10 backdrop-blur-lg hover:border-(--bg-accent)/30 bg-gradient-to-b from-(--text-color)/3 to-transparent hover:bg-(--text-color)/5 rounded-3xl transition-all duration-300 flex flex-col gap-4 shadow-sm"
              >
                <div className="w-12 h-12 rounded-2xl bg-(--bg-accent)/10 flex items-center justify-center border border-(--bg-accent)/10 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-2 shrink-0">
                  {v.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg sm:text-xl font-bold text-(--text-color) group-hover:text-(--bg-accent) transition-colors duration-300">
                    {v.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-(--text-color)/70 leading-relaxed font-medium">
                    {v.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 4. CALL TO ACTION SECTION */}
        <motion.div
          variants={itemVariants}
          className="w-full bg-(--text-color)/4 border border-(--text-color)/10 p-6 sm:p-10 lg:p-12 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden"
        >
          <div className="space-y-2 z-10 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-(--text-color)">
              Ready to Explore?
            </h2>
            <p className="text-xs sm:text-sm text-(--text-color)/70 leading-relaxed font-medium max-w-lg">
              Experience our tailored technical selections. Forge your perfect
              capsule wardrobe from our dynamic collection arrays.
            </p>
          </div>

          <NavLink
            to="/store/shirt"
            className="w-full md:w-auto bg-(--text-color) text-(--background) hover:bg-(--bg-accent) hover:text-(--background) py-3 px-6 sm:px-8 rounded-2xl font-bold text-sm sm:text-base lg:text-lg transition-all duration-300 active:scale-98 flex items-center justify-center gap-2 shadow-md shrink-0 z-10"
          >
            <Compass
              size={18}
              className="sm:scale-110 shrink-0"
              strokeWidth={2.5}
            />
            Explore Collection
          </NavLink>
        </motion.div>
      </div>
    </motion.div>
  );
}
