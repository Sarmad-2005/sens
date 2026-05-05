"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { GraduationCap, Users, Award, Building2, Globe, BookOpen } from "lucide-react"

interface StatItemProps {
  icon: React.ReactNode
  value: number
  suffix: string
  label: string
  delay: number
}

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      const duration = 2000
      const steps = 60
      const increment = value / steps
      let current = 0

      const timer = setInterval(() => {
        current += increment
        if (current >= value) {
          setCount(value)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, duration / steps)

      return () => clearInterval(timer)
    }
  }, [isInView, value])

  return (
    <span ref={ref} className="text-3xl md:text-4xl lg:text-3xl xl:text-4xl font-bold gradient-text block truncate px-1">
      {count.toLocaleString()}{suffix}
    </span>
  )
}

function StatItem({ icon, value, suffix, label, delay }: StatItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="relative group"
    >
      <div className="glass-dark rounded-2xl p-6 md:p-8 text-center transition-all duration-300 group-hover:glow h-full flex flex-col items-center justify-center">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#1E3A8A]/5 to-[#7C3AED]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative z-10">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#1E3A8A] to-[#7C3AED] flex items-center justify-center text-white">
            {icon}
          </div>
          
          <AnimatedCounter value={value} suffix={suffix} />
          
          <p className="mt-2 text-muted-foreground font-medium">{label}</p>
        </div>
      </div>
    </motion.div>
  )
}

export function StatsSection() {
  const stats = [
    { icon: <GraduationCap className="w-8 h-8" />, value: 50000, suffix: "+", label: "Alumni Worldwide" },
    { icon: <Users className="w-8 h-8" />, value: 15000, suffix: "+", label: "Current Students" },
    { icon: <Award className="w-8 h-8" />, value: 98, suffix: "%", label: "Placement Rate" },
    { icon: <Building2 className="w-8 h-8" />, value: 200, suffix: "+", label: "Partner Companies" },
    { icon: <Globe className="w-8 h-8" />, value: 85, suffix: "+", label: "Countries Represented" },
    { icon: <BookOpen className="w-8 h-8" />, value: 150, suffix: "+", label: "Programs Offered" },
  ]

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[#1E3A8A]/5 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#7C3AED]/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-[#F59E0B]/10 text-[#F59E0B] text-sm font-medium mb-4">
            Our Impact
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Numbers That <span className="gradient-text">Speak</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Decades of excellence in education, research, and student success
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <StatItem
              key={stat.label}
              icon={stat.icon}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
