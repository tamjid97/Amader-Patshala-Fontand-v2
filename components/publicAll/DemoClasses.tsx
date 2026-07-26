'use client';

import React, { useState } from "react";
import { motion } from "framer-motion";

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

// ইউটিউব লিংক থেকে সঠিক ভিডিও আইডি বের করার ফাংশন
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
    <section className="w-full py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading with Motion Animation */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#008a45] tracking-tight drop-shadow-sm">
            আমাদের ডেমো ক্লাস
          </h2>
          {/* Decorative Modern Underline */}
          <div className="w-24 h-1.5 bg-gradient-to-r from-[#008a45] to-[#4ade80] mx-auto mt-3 rounded-full shadow-sm"></div>
        </motion.div>

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
                className="group bg-white/80 backdrop-blur-md rounded-[24px] overflow-hidden border border-emerald-100 shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_45px_rgba(0,138,69,0.2)] transition-shadow duration-500 flex flex-col"
              >
                {/* Video Player / Thumbnail Container */}
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
                      {/* Thumbnail Image with Motion Zoom on Hover */}
                      <motion.img 
                        src={video.thumbnail} 
                        alt={video.title} 
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="w-full h-full object-cover opacity-90"
                      />
                      
                      {/* Dark Overlay */}
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors"></div>

                      {/* Top Header info inside video */}
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

                      {/* Center YouTube Play Button with Motion Pulse */}
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

                      {/* Bottom Action bar overlay */}
                      <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex justify-between items-center">
                        <div className="flex space-x-2">
                          <span className="text-white/80 hover:text-white text-xs bg-white/20 px-2.5 py-1 rounded-md backdrop-blur-sm flex items-center gap-1 cursor-pointer">
                            শেয়ার
                          </span>
                          <span className="text-white/80 hover:text-white text-xs bg-white/20 px-2.5 py-1 rounded-md backdrop-blur-sm flex items-center gap-1 cursor-pointer">
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