"use client"

import { motion } from "framer-motion"
import { CampusScene } from "@/components/campus-scene"

export function CampusSection() {
  return (
    <section id="campus" className="py-20 md:py-32 relative overflow-hidden bg-white">
      {/* Background Campus Image — dimmed and blended */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/riphahdaska.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.15,
        }}
      />
      {/* Light gradient overlay */}
      <div 
        className="absolute inset-0 z-[1]"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.8) 100%)",
        }}
      />
      
      {/* Decorative Blur Background Elements */}
      <div className="absolute inset-0 z-[2]">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#1E3A8A]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#7C3AED]/5 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#1E3A8A]/10 text-[#1E3A8A] text-sm font-medium mb-4">
            Explore Our Campus
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-[#0a1128]">
            Interactive <span className="gradient-text">3D Campus</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Take a virtual walk through our state-of-the-art facilities. Click on the glowing 
            markers to discover more about each location.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <CampusScene />
        </motion.div>
        
        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {[
            { value: "50+", label: "Acres Campus" },
            { value: "25+", label: "Buildings" },
            { value: "100%", label: "Wi-Fi Coverage" },
            { value: "24/7", label: "Security" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 rounded-2xl bg-white shadow-xl border border-blue-50"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
