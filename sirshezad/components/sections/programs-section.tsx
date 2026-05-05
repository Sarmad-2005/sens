"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"
import { X, Clock, Users, Award, ArrowRight, GraduationCap, Briefcase, Code, Palette, Stethoscope, Scale } from "lucide-react"
import Link from "next/link"

interface Program {
  id: string
  title: string
  shortDesc: string
  fullDesc: string
  duration: string
  students: string
  icon: any
  color: string
  highlights: string[]
}

const programs: Program[] = [
  {
    id: "cs",
    title: "Computer Science",
    shortDesc: "Build the future with cutting-edge technology",
    fullDesc: "Our Computer Science program prepares students for leadership roles in software development, AI, machine learning, and more. With access to state-of-the-art labs and industry partnerships.",
    duration: "4 Years",
    students: "500+",
    icon: Code,
    color: "#1E3A8A",
    highlights: ["AI & Machine Learning", "Full Stack Development", "Cybersecurity", "Cloud Computing"]
  },
  {
    id: "business",
    title: "Business Administration",
    shortDesc: "Lead with vision and strategic thinking",
    fullDesc: "Develop the skills to lead organizations and drive innovation. Our MBA program combines theory with practical experience through internships and case studies.",
    duration: "2-4 Years",
    students: "800+",
    icon: Briefcase,
    color: "#F59E0B",
    highlights: ["Strategic Management", "Finance", "Marketing", "Entrepreneurship"]
  },
  {
    id: "design",
    title: "Design & Arts",
    shortDesc: "Create experiences that inspire",
    fullDesc: "From UI/UX to industrial design, our program nurtures creative thinking and technical skills. Work on real projects with leading design studios.",
    duration: "4 Years",
    students: "300+",
    icon: Palette,
    color: "#7C3AED",
    highlights: ["UI/UX Design", "Graphic Design", "Motion Graphics", "Product Design"]
  },
  {
    id: "medicine",
    title: "Medical Sciences",
    shortDesc: "Heal the world with knowledge",
    fullDesc: "Our medical program produces exceptional healthcare professionals. State-of-the-art simulation labs and hospital partnerships provide hands-on experience.",
    duration: "5-6 Years",
    students: "400+",
    icon: Stethoscope,
    color: "#10B981",
    highlights: ["Clinical Training", "Research", "Specializations", "Global Health"]
  },
  {
    id: "law",
    title: "Law & Justice",
    shortDesc: "Champion justice and equity",
    fullDesc: "Prepare for a career in law with our comprehensive program. Moot courts, legal clinics, and internships with top firms provide real-world experience.",
    duration: "3-5 Years",
    students: "250+",
    icon: Scale,
    color: "#EF4444",
    highlights: ["Corporate Law", "Criminal Justice", "International Law", "Human Rights"]
  },
  {
    id: "engineering",
    title: "Engineering",
    shortDesc: "Engineer solutions for tomorrow",
    fullDesc: "From mechanical to electrical engineering, our programs combine theoretical knowledge with hands-on experience in our advanced engineering labs.",
    duration: "4 Years",
    students: "600+",
    icon: GraduationCap,
    color: "#06B6D4",
    highlights: ["Mechanical", "Electrical", "Civil", "Chemical"]
  }
]

function ProgramCard({ 
  program, 
  onClick 
}: { 
  program: Program
  onClick: () => void 
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const rotateX = useTransform(y, [-100, 100], [10, -10])
  const rotateY = useTransform(x, [-100, 100], [-10, 10])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set(e.clientX - centerX)
    y.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const Icon = program.icon

  return (
    <motion.div
      ref={cardRef}
      className="w-full cursor-pointer"
      style={{
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className="relative h-[420px] rounded-3xl overflow-hidden bg-white shadow-xl border border-blue-100"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Gradient Background */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{ 
            background: `linear-gradient(135deg, ${program.color} 0%, transparent 100%)` 
          }}
        />
        
        {/* Content */}
        <div className="relative h-full p-6 flex flex-col">
          <div 
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
            style={{ backgroundColor: `${program.color}20` }}
          >
            <program.icon className="w-8 h-8" style={{ color: program.color }} />
          </div>
          
          <h3 className="text-2xl font-bold mb-2 text-[#0a1128]">{program.title}</h3>
          <p className="text-slate-500 mb-6 flex-grow">{program.shortDesc}</p>
          
          <div className="flex items-center gap-4 mb-6 text-sm">
            <div className="flex items-center gap-1.5 text-slate-600">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>{program.duration}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-600">
              <Users className="w-4 h-4 text-slate-400" />
              <span>{program.students} Students</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {program.highlights.slice(0, 3).map((highlight) => (
              <span 
                key={highlight}
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{ 
                  backgroundColor: `${program.color}15`,
                  color: program.color
                }}
              >
                {highlight}
              </span>
            ))}
          </div>
          
          <motion.button
            className="flex items-center gap-2 text-sm font-semibold"
            style={{ color: program.color }}
            whileHover={{ x: 5 }}
          >
            Learn More <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
        
        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 45%, transparent 50%)",
            transform: "translateX(-100%)",
          }}
          whileHover={{
            transform: "translateX(100%)",
            transition: { duration: 0.6 }
          }}
        />
      </motion.div>
    </motion.div>
  )
}

function ProgramModal({ 
  program, 
  onClose 
}: { 
  program: Program | null
  onClose: () => void 
}) {
  if (!program) return null
  
  const Icon = program.icon

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="absolute inset-0 bg-background/80 backdrop-blur-md"
          onClick={onClose}
        />
        <motion.div
          className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-blue-100"
          initial={{ scale: 0.9, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 50 }}
          transition={{ type: "spring", damping: 25 }}
        >
          {/* Header with gradient */}
          <div 
            className="relative h-40 flex items-end p-6"
            style={{ 
              background: `linear-gradient(135deg, ${program.color} 0%, ${program.color}80 100%)` 
            }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
            
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
                <program.icon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">{program.title}</h2>
                <p className="text-white/80">{program.shortDesc}</p>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6">
            <p className="text-slate-600 leading-relaxed mb-6">
              {program.fullDesc}
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2 text-slate-500 mb-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">Duration</span>
                </div>
                <div className="font-semibold text-[#0a1128]">{program.duration}</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2 text-slate-500 mb-1">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">Enrolled</span>
                </div>
                <div className="font-semibold text-[#0a1128]">{program.students} Students</div>
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="font-semibold mb-3 text-[#0a1128]">Program Highlights</h4>
              <div className="flex flex-wrap gap-2">
                {program.highlights.map((highlight) => (
                  <span 
                    key={highlight}
                    className="px-4 py-2 rounded-xl text-sm font-medium"
                    style={{ 
                      backgroundColor: `${program.color}15`,
                      color: program.color
                    }}
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex gap-3">
              <Link 
                href="/admissions"
                className="flex-1 py-3 rounded-xl text-white font-semibold shadow-lg shadow-blue-200 text-center no-underline"
                style={{ backgroundColor: program.color }}
              >
                Apply Now
              </Link>
              <button className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors">
                Download Brochure
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export function ProgramsSection() {
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <section id="programs" className="py-20 md:py-32 relative overflow-hidden bg-white">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-blue-50/20" />
      
      <div className="container mx-auto px-6 mb-12 relative z-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#7C3AED]/10 text-[#7C3AED] text-sm font-medium mb-4">
            Academic Programs
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-[#0a1128]">
            Choose Your <span className="gradient-text">Path</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Explore our diverse range of programs designed to prepare you for 
            success in your chosen field.
          </p>
        </motion.div>
      </div>
      
      {/* Programs Grid */}
      <div className="container mx-auto px-6 mb-12 relative z-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {programs.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProgramCard
                program={program}
                onClick={() => setSelectedProgram(program)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      <ProgramModal
        program={selectedProgram}
        onClose={() => setSelectedProgram(null)}
      />
    </section>
  )
}
