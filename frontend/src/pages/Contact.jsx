import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
} from "lucide-react";

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "support",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Your submit logic here (e.g., API call)
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: "", email: "", subject: "support", message: "" });
    }, 4000);
  };

  // Motion Animation Settings
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", damping: 25, stiffness: 120 },
    },
  };

  const channels = [
    {
      icon: <Mail size={20} className="text-(--bg-accent)" />,
      label: "Support Channels",
      value: "support@forgewear.com",
      desc: "Our technical dispatch team answers queries within 12-24 hours.",
    },
    {
      icon: <MapPin size={20} className="text-(--bg-accent)" />,
      label: "HQ Operations",
      value: "Karachi, Pakistan",
      desc: "Design synthesis lab & main operations center.",
    },
    {
      icon: <Clock size={20} className="text-(--bg-accent)" />,
      label: "Operational Cycle",
      value: "Mon - Fri • 09:00 - 18:00",
      desc: "Excluding institutional holidays.",
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full pb-20 min-h-full flex flex-col items-center gap-12 sm:gap-16"
    >
      <div className="w-full max-w-[1440px] xl:max-w-[1680px] pb-20 p-4 min-h-full flex flex-col gap-12 sm:gap-16">
        {/* 1. HEADER ROW */}
        <motion.div
          variants={itemVariants}
          className="mt-24 pb-6 sm:pb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-(--text-color)/20"
        >
          <div className="flex items-center gap-4 sm:gap-6">
            <h2 className="uppercase text-2xl sm:text-3xl lg:text-5xl font-bold tracking-tight text-(--text-color)">
              COMMUNICATION PORT
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-semibold tracking-wider text-(--text-color)/60 uppercase border-l-2 border-(--bg-accent) pl-3">
            Direct Forge Interface
          </p>
        </motion.div>

        {/* 2. MAIN LAYOUT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start">
          {/* LEFT COLUMN: INFO PORT & CHANNELS */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-12 flex flex-col gap-6 sm:gap-8 w-full"
          >
            <div className="space-y-3 sm:space-y-4">
              <span className="text-xs font-black tracking-widest uppercase text-(--bg-accent)">
                Contact Desk
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-(--text-color) uppercase tracking-tight leading-tight">
                Connect with <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-(--bg-accent) to-(--text-color)">
                  The Forge Team
                </span>
              </h1>
              <p className="text-sm text-(--text-color)/75 leading-relaxed font-medium">
                Have a question regarding custom specifications, volume
                ordering, or existing stock lists? Send us your technical
                dispatch query.
              </p>
            </div>

            {/* CHANNELS ROW */}
            <div className="flex flex-col gap-4">
              {channels.map((c, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-r from-(--text-color)/3 to-transparent border border-(--text-color)/10 p-4 sm:p-5 rounded-2xl flex gap-4 hover:border-(--bg-accent)/30 transition-all duration-300 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-(--bg-accent)/10 flex items-center justify-center border border-(--bg-accent)/10 shrink-0">
                    {c.icon}
                  </div>
                  <div className="space-y-1 min-w-0">
                    <p className="text-[10px] uppercase font-bold tracking-widest text-(--text-color)/50">
                      {c.label}
                    </p>
                    <h4 className="text-sm sm:text-base font-bold text-(--text-color) truncate">
                      {c.value}
                    </h4>
                    <p className="text-xs text-(--text-color)/65 leading-normal">
                      {c.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
