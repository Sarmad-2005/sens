"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"
import { X, Mail, Linkedin, Award, BookOpen, GraduationCap } from "lucide-react"

interface Faculty {
  id: string
  name: string
  title: string
  department: string
  bio: string
  specializations: string[]
  publications: number
  awards: number
  image: string
}

const facultyMembers: Faculty[] = [
  {
    id: "1",
    name: "Dr. Sarah Chen",
    title: "Professor & Dean",
    department: "Computer Science",
    bio: "Leading researcher in AI and machine learning with 20+ years of experience. Former senior scientist at Google DeepMind.",
    specializations: ["Artificial Intelligence", "Machine Learning", "Neural Networks"],
    publications: 150,
    awards: 12,
    image: "SC"
  },
  {
    id: "2",
    name: "Prof. Michael Roberts",
    title: "Department Head",
    department: "Business Administration",
    bio: "Strategic management expert and former Fortune 500 CEO. Brings real-world experience to the classroom.",
    specializations: ["Strategic Management", "Leadership", "Corporate Strategy"],
    publications: 85,
    awards: 8,
    image: "MR"
  },
  {
    id: "3",
    name: "Dr. Emily Watson",
    title: "Associate Professor",
    department: "Medical Sciences",
    bio: "Renowned surgeon and researcher specializing in minimally invasive procedures and surgical robotics.",
    specializations: ["Surgical Robotics", "Minimally Invasive Surgery", "Medical AI"],
    publications: 120,
    awards: 15,
    image: "EW"
  },
  {
    id: "4",
    name: "Prof. David Kim",
    title: "Professor",
    department: "Design & Arts",
    bio: "Award-winning designer with work featured in MoMA. Former creative director at Apple.",
    specializations: ["UI/UX Design", "Product Design", "Design Thinking"],
    publications: 45,
    awards: 20,
    image: "DK"
  },
  {
    id: "5",
    name: "Dr. Alexandra Moore",
    title: "Professor",
    department: "Engineering",
    bio: "Pioneering researcher in sustainable engineering and renewable energy systems.",
    specializations: ["Renewable Energy", "Sustainable Systems", "Green Engineering"],
    publications: 95,
    awards: 10,
    image: "AM"
  },
  {
    id: "6",
    name: "Prof. James Wilson",
    title: "Professor & Chair",
    department: "Law",
    bio: "Former Supreme Court clerk and constitutional law expert with extensive courtroom experience.",
    specializations: ["Constitutional Law", "Human Rights", "International Law"],
    publications: 60,
    awards: 7,
    image: "JW"
  }
]

const colors = ["#1E3A8A", "#7C3AED", "#F59E0B", "#10B981", "#EF4444", "#06B6D4"]

function FacultyCard({ 
  faculty, 
  index,
  onClick 
}: { 
  faculty: Faculty
  index: number
  onClick: () => void 
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const rotateX = useTransform(y, [-100, 100], [8, -8])
  const rotateY = useTransform(x, [-100, 100], [-8, 8])
  const translateZ = useTransform(y, [-100, 100], [10, -10])

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

  const color = colors[index % colors.length]

  return (
    <motion.div
      ref={cardRef}
      className="cursor-pointer"
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <motion.div
        className="relative rounded-3xl overflow-hidden bg-white shadow-xl border border-blue-100 p-6 h-full"
        style={{
          rotateX,
          rotateY,
          z: translateZ,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Avatar */}
        <div className="flex justify-center mb-4">
          <motion.div
            className="w-24 h-24 rounded-2xl flex items-center justify-center text-2xl font-bold text-white"
            style={{ backgroundColor: color }}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            {faculty.image}
          </motion.div>
        </div>
        
        {/* Info */}
        <div className="text-center">
          <h3 className="text-xl font-bold mb-1 text-[#0a1128]">{faculty.name}</h3>
          <p className="text-sm font-medium" style={{ color }}>{faculty.title}</p>
          <p className="text-sm text-slate-500 mb-4">{faculty.department}</p>
          
          {/* Stats */}
          <div className="flex justify-center gap-6 mb-4">
            <div className="text-center">
              <div className="text-lg font-bold" style={{ color }}>{faculty.publications}</div>
              <div className="text-xs text-slate-400">Publications</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold" style={{ color }}>{faculty.awards}</div>
              <div className="text-xs text-slate-400">Awards</div>
            </div>
          </div>
          
          {/* Specializations */}
          <div className="flex flex-wrap justify-center gap-1.5">
            {faculty.specializations.slice(0, 2).map((spec) => (
              <span 
                key={spec}
                className="px-2 py-1 rounded-lg text-xs"
                style={{ backgroundColor: `${color}15`, color }}
              >
                {spec}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function FacultyModal({ 
  faculty, 
  index,
  onClose 
}: { 
  faculty: Faculty | null
  index: number
  onClose: () => void 
}) {
  if (!faculty) return null
  
  const color = colors[index % colors.length]

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
          className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl border border-blue-50"
          initial={{ scale: 0.9, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 50 }}
          transition={{ type: "spring", damping: 25 }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          
          {/* Header */}
          <div 
            className="relative pt-8 pb-16 px-6"
            style={{ background: `linear-gradient(135deg, ${color} 0%, ${color}80 100%)` }}
          >
            <div className="flex justify-center">
              <div className="w-28 h-28 rounded-3xl bg-white/20 backdrop-blur flex items-center justify-center text-3xl font-bold text-white">
                {faculty.image}
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="relative -mt-8 px-6 pb-6">
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-blue-50">
              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-[#0a1128]">{faculty.name}</h2>
                <p className="font-medium" style={{ color }}>{faculty.title}</p>
                <p className="text-sm text-slate-500">{faculty.department}</p>
              </div>
              
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                {faculty.bio}
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 rounded-xl bg-slate-50">
                  <BookOpen className="w-5 h-5 mx-auto mb-1" style={{ color }} />
                  <div className="font-bold text-[#0a1128]">{faculty.publications}</div>
                  <div className="text-xs text-slate-500">Publications</div>
                </div>
                <div className="text-center p-3 rounded-xl bg-slate-50">
                  <Award className="w-5 h-5 mx-auto mb-1" style={{ color }} />
                  <div className="font-bold text-[#0a1128]">{faculty.awards}</div>
                  <div className="text-xs text-slate-500">Awards</div>
                </div>
                <div className="text-center p-3 rounded-xl bg-slate-50">
                  <GraduationCap className="w-5 h-5 mx-auto mb-1" style={{ color }} />
                  <div className="font-bold text-[#0a1128]">500+</div>
                  <div className="text-xs text-slate-500">Students</div>
                </div>
              </div>
              
              {/* Specializations */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold mb-2">Specializations</h4>
                <div className="flex flex-wrap gap-2">
                  {faculty.specializations.map((spec) => (
                    <span 
                      key={spec}
                      className="px-3 py-1.5 rounded-xl text-sm"
                      style={{ backgroundColor: `${color}15`, color }}
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex gap-3">
                <button 
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-white font-semibold"
                  style={{ backgroundColor: color }}
                >
                  <Mail className="w-4 h-4" />
                  Contact
                </button>
                <button className="px-6 py-3 rounded-xl border border-border">
                  <Linkedin className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export function FacultySection() {
  const [selectedFaculty, setSelectedFaculty] = useState<{ faculty: Faculty; index: number } | null>(null)

  return (
    <section id="faculty" className="py-20 md:py-32 relative overflow-hidden bg-white">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-blue-50/20" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#10B981]/10 text-[#10B981] text-sm font-medium mb-4">
            Our Faculty
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-[#0a1128]">
            Learn from the <span className="gradient-text">Best</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            World-renowned experts and industry leaders dedicated to your success.
            Our faculty brings decades of experience to the classroom.
          </p>
        </motion.div>
        
        {/* Faculty Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facultyMembers.map((faculty, index) => (
            <FacultyCard
              key={faculty.id}
              faculty={faculty}
              index={index}
              onClick={() => setSelectedFaculty({ faculty, index })}
            />
          ))}
        </div>
        
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <motion.button
            className="px-8 py-4 rounded-xl border border-blue-100 bg-white text-[#1E3A8A] font-semibold shadow-lg shadow-blue-100/50"
            whileHover={{ scale: 1.05, backgroundColor: "#f8fafc" }}
            whileTap={{ scale: 0.95 }}
          >
            View All Faculty
          </motion.button>
        </motion.div>
      </div>
      
      <FacultyModal
        faculty={selectedFaculty?.faculty || null}
        index={selectedFaculty?.index || 0}
        onClose={() => setSelectedFaculty(null)}
      />
    </section>
  )
}
