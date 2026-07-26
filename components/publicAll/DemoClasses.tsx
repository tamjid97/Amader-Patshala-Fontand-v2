'use client'

import React, { useState } from "react";
import { motion } from "framer-motion";
import { PlaySquare } from "lucide-react";

const demoVideos = [
  {
    id: 1,
    title: "রুই মাছের ডিসেকশন || HSC Biology || Roots Of Biology",
    youtubeId: "https://youtu.be/spVcXwGeyLc?si=SAWIg7zXxsGK2VsV", 
    thumbnail: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=800&auto=format&fit=crop",
    channelName: "Roots Of Biology",
  },
  {
    id: 2,
    title: "রুই মাছের ধমনী তন্ত্র || HSC Biology || Roots Of Biology",
    youtubeId: "https://youtu.be/Pf-DBOu2s3k?si=2exLW-H0ZDzKng37",
    thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop",
    channelName: "Roots Of Biology",
  },
];

const extractYouTubeId = (url: string) => {
  if (!url) return "";
  if (!url.includes("/") && !url.includes(".")) return url;
  if (url.includes("youtu.be/")) {
    const part = url.split("youtu.be/")[1];
    return part.split("?")[0];
  }
  if (url.includes("watch?v=")) {
    const urlParams = new URLSearchParams(url.split("?")[1]);
    return urlParams.get("v") || "";
  }
  return url;
};

export default function DemoClasses() {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  return (
    <section className="relative w-full overflow-hidden py-16 md:py-24 transition-colors duration-300">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-emerald-400/10 dark:bg-emerald-900/15 blur-[130px] rounded-full -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading with Motion Animation */}
        <div className="mb-14 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 text-sm font-semibold mb-3 shadow-sm"
          >
            <PlaySquare className="w-4 h-4 text-emerald-500" />
            <span>ভিডিও লেকচার</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold text-[#0a7c41] dark:text-emerald-400 drop-shadow-sm pb-1"
          >
            আমাদের ডেমো ক্লাস
          </motion.h2>
          
          {/* Decorative Modern Underline */}
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1.5 w-40 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400 mt-3 shadow-[0_2px_10px_rgba(16,185,129,0.5)] origin-center"
          />
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {demoVideos.map((video, index) => {
            const videoId = extractYouTubeId(video.youtubeId);
            
            return (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
                whileHover={{ y: -8 }}
                className="group bg-white/90 backdrop-blur-md rounded-[24px] overflow-hidden border border-emerald-100/80 dark:border-emerald-900/60 shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_45px_rgba(0,138,69,0.2)] transition-shadow duration-500 flex flex-col"
              >
                <div className="relative w-full aspect-video bg-black overflow-hidden">
                  {activeVideo === video.id ? (
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <div 
                      className="relative w-full h-full cursor-pointer group"
                      onClick={() => setActiveVideo(video.id)}
                    >
                      <motion.img 
                        src={video.thumbnail} 
                        alt={video.title} 
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="w-full h-full object-cover opacity-90"
                      />
                      
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors"></div>

                      <div className="absolute top-0 left-0 w-full p-4 bg-gradient-to-b from-black/70 to-transparent flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center text-white justify-center font-bold text-xs">
                          RB
                        </div>
                        <div>
                          <h4 className="text-white text-xs sm:text-sm font-semibold line-clamp-1 drop-shadow">
                            {video.title}
                          </h4>
                          <p className="text-gray-300 text-[11px]">{video.channelName}</p>
                        </div>
                      </div>

                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div 
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-16 h-11 bg-[#ff0000] rounded-xl flex items-center justify-center shadow-[0_4px_20px_rgba(255,0,0,0.5)] transition-colors"
                        >
                          <svg className="w-6 h-6 text-white fill-current translate-x-0.5" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </motion.div>
                      </div>

                      <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex justify-between items-center">
                        <div className="flex space-x-2">
                          <span className="text-white/80 hover:text-white text-xs bg-white/20 px-2.5 py-1 rounded-md backdrop-blur-sm">
                            শেয়ার
                          </span>
                          <span className="text-white/80 hover:text-white text-xs bg-white/20 px-2.5 py-1 rounded-md backdrop-blur-sm">
                            পরে দেখুন
                          </span>
                        </div>
                        <div className="flex items-center space-x-1.5 text-white text-xs bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
                          <span>Watch on</span>
                          <span className="font-bold text-red-500 flex items-center gap-0.5">
                            ▶ YouTube
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}