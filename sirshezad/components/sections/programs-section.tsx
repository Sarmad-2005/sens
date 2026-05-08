"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Clock, ArrowRight, GraduationCap, Briefcase, Code, Stethoscope, Laptop, BookOpen, Monitor, Microscope, Zap } from "lucide-react"
import Link from "next/link"

type CategoryId = "all" | "adp-business" | "adp-science" | "adp-computer" | "adp-health" | "digital-skills" | "intermediate"

interface Program {
  id: string
  title: string
  category: CategoryId
  shortDesc: string
  fullDesc: string
  duration: string
  highlights: string[]
  icon: React.ElementType
  color: string
}

const categories: { id: CategoryId; label: string }[] = [
  { id: "all",           label: "All Programs" },
  { id: "adp-business",  label: "ADP Business & Mgmt" },
  { id: "adp-science",   label: "ADP Science" },
  { id: "adp-computer",  label: "ADP Computer" },
  { id: "adp-health",    label: "ADP Health Sciences" },
  { id: "digital-skills",label: "Digital & Business Skills" },
  { id: "intermediate",  label: "Intermediate" },
]

const categoryColors: Record<CategoryId, string> = {
  all:            "#1E3A8A",
  "adp-business": "#1E3A8A",
  "adp-science":  "#10B981",
  "adp-computer": "#06B6D4",
  "adp-health":   "#EF4444",
  "digital-skills":"#7C3AED",
  intermediate:   "#F59E0B",
}

const programs: Program[] = [
  // ADP Business & Management
  { id: "adp-english",      title: "ADP English",              category: "adp-business", shortDesc: "Master language and communication skills",     fullDesc: "Develop strong written and oral communication skills with our ADP English program. Ideal for students seeking careers in education, media, and corporate communication.",                                                                duration: "2 Years",    highlights: ["Linguistics", "Creative Writing", "Public Speaking", "Literature"],              icon: Briefcase, color: "#1E3A8A" },
  { id: "adp-psychology",   title: "ADP Psychology",           category: "adp-business", shortDesc: "Understand human behavior and the mind",        fullDesc: "Explore the science of the mind with our ADP Psychology program. Covers behavioral science, counseling basics, and social psychology.",                                                                                                    duration: "2 Years",    highlights: ["Behavioral Science", "Counseling", "Research Methods", "Social Psychology"],    icon: Briefcase, color: "#7C3AED" },
  { id: "adp-accounting",   title: "ADP Accounting & Finance", category: "adp-business", shortDesc: "Build a foundation in finance and accounting",   fullDesc: "Learn financial accounting, bookkeeping, and business finance principles to launch a career in banking, finance, or corporate accounting.",                                                                                               duration: "2 Years",    highlights: ["Financial Accounting", "Bookkeeping", "Business Finance", "Taxation Basics"],   icon: Briefcase, color: "#F59E0B" },
  { id: "adp-biz-mgmt",     title: "ADP Business Management",  category: "adp-business", shortDesc: "Learn to manage teams and operations",          fullDesc: "Gain foundational skills in business operations, HR, and organizational management. Perfect for aspiring entrepreneurs and managers.",                                                                                                  duration: "2 Years",    highlights: ["Operations Management", "HRM", "Marketing Basics", "Entrepreneurship"],        icon: Briefcase, color: "#10B981" },
  { id: "adp-commerce",     title: "ADP Commerce",             category: "adp-business", shortDesc: "Explore trade and commercial principles",       fullDesc: "A comprehensive introduction to commerce, covering trade, business law, and economics for a career in business and finance.",                                                                                                      duration: "2 Years",    highlights: ["Business Law", "Economics", "Trade Principles", "Banking"],                    icon: Briefcase, color: "#EF4444" },
  { id: "adp-sales",        title: "ADP Sales & Marketing",    category: "adp-business", shortDesc: "Drive growth through sales and marketing",      fullDesc: "Develop practical skills in marketing strategy, sales techniques, and consumer behavior. Ideal for careers in retail, marketing, and business development.",                                                                         duration: "2 Years",    highlights: ["Sales Strategy", "Consumer Behavior", "Digital Marketing Basics", "Branding"],  icon: Briefcase, color: "#06B6D4" },
  { id: "adp-it-mgmt",      title: "ADP IT Management",        category: "adp-business", shortDesc: "Bridge business and technology",                fullDesc: "Learn how to manage IT projects and align technology with business goals. Covers project management, IT governance, and digital strategy.",                                                                                           duration: "2 Years",    highlights: ["IT Project Management", "Digital Strategy", "IT Governance", "Systems Analysis"], icon: Briefcase, color: "#8B5CF6" },

  // ADP Science
  { id: "adp-zoo-bot",      title: "ADP Zoology & Botany",           category: "adp-science", shortDesc: "Study life sciences from cells to ecosystems", fullDesc: "Explore animal and plant biology with our ADP Zoology & Botany program. Ideal for students aiming for careers in biology, research, or healthcare.",                                                             duration: "2 Years", highlights: ["Cell Biology", "Ecology", "Plant Physiology", "Animal Taxonomy"],         icon: Microscope, color: "#10B981" },
  { id: "adp-math-physics",  title: "ADP Mathematics & Physics",      category: "adp-science", shortDesc: "Master numbers and the laws of nature",        fullDesc: "A rigorous program in pure and applied mathematics and physics. Builds a strong foundation for engineering, data science, and research careers.",                                                             duration: "2 Years", highlights: ["Calculus", "Mechanics", "Electromagnetism", "Statistics"],              icon: Microscope, color: "#1E3A8A" },
  { id: "adp-zoo-chem",      title: "ADP Zoology & Chemistry",        category: "adp-science", shortDesc: "Explore biological and chemical sciences",     fullDesc: "Combines zoological sciences with chemistry, covering biochemistry, organic chemistry, and animal biology.",                                                                                               duration: "2 Years", highlights: ["Organic Chemistry", "Biochemistry", "Animal Biology", "Lab Skills"],      icon: Microscope, color: "#7C3AED" },

  // ADP Computer
  { id: "adp-computing",    title: "ADP Computing",           category: "adp-computer", shortDesc: "Core computing with specialized tracks",     fullDesc: "A versatile computing program with specializations in Computer Science, Artificial Intelligence, and Data Science. Includes practical lab work and industry-relevant projects.", duration: "2 Years", highlights: ["Computer Science", "Artificial Intelligence", "Data Science", "Programming"],      icon: Code,    color: "#1E3A8A" },
  { id: "adp-comp-sys",     title: "ADP Computer Systems",    category: "adp-computer", shortDesc: "Hardware, networking, and systems",          fullDesc: "Covers computer hardware, operating systems, and networking fundamentals. Ideal for careers in IT support, network administration, and systems engineering.",            duration: "2 Years", highlights: ["Networking", "Operating Systems", "Hardware", "Cybersecurity Basics"],          icon: Monitor, color: "#06B6D4" },
  { id: "adp-comp-graphics",title: "ADP Computer Graphics",   category: "adp-computer", shortDesc: "Where design meets technology",             fullDesc: "Blend creative design with technical skills. Learn 2D/3D design, animation fundamentals, and graphic software for careers in media and design.",                               duration: "2 Years", highlights: ["2D/3D Design", "Animation", "Graphic Software", "Visual Communication"],      icon: Code,    color: "#EC4899" },

  // ADP Allied Health Sciences
  { id: "adp-med-lab",   title: "ADP Medical Lab Technology",        category: "adp-health", shortDesc: "Diagnostics at the heart of healthcare",  fullDesc: "Train to perform laboratory tests essential for patient diagnosis and treatment. Covers hematology, microbiology, and clinical chemistry.", duration: "2 Years", highlights: ["Hematology", "Microbiology", "Clinical Chemistry", "Lab Safety"],          icon: Stethoscope, color: "#10B981" },
  { id: "adp-imaging",   title: "ADP Medical Imaging Technology",    category: "adp-health", shortDesc: "See inside the human body",               fullDesc: "Learn to operate medical imaging equipment including X-ray, ultrasound, and MRI. A vital career in modern healthcare.",                      duration: "2 Years", highlights: ["X-Ray Technology", "Ultrasound", "MRI Basics", "Patient Care"],           icon: Stethoscope, color: "#3B82F6" },
  { id: "adp-ot",        title: "ADP Operation Theater Technology",  category: "adp-health", shortDesc: "Support life-saving surgical teams",      fullDesc: "Prepare for a role in the surgical team as an OT technologist. Covers surgical instruments, sterilization, and patient preparation.",       duration: "2 Years", highlights: ["Surgical Instruments", "Sterilization", "Anesthesia Support", "Patient Safety"], icon: Stethoscope, color: "#EF4444" },

  // Digital & Business Skills
  { id: "graphic-design",    title: "Graphic Designing",                             category: "digital-skills", shortDesc: "Create compelling visual content",              fullDesc: "Learn professional graphic design using industry tools. Covers logo design, typography, branding, and visual communication.",                                                                                       duration: "3–6 Months", highlights: ["Adobe Suite", "Logo Design", "Typography", "Branding"],                         icon: Laptop,    color: "#EC4899" },
  { id: "video-editing",     title: "Video Editing",                                 category: "digital-skills", shortDesc: "Tell stories through video",                    fullDesc: "Master video production and editing workflows. Covers cutting, color grading, audio, and delivery for social media and broadcast.",                                                                                  duration: "3–6 Months", highlights: ["Premiere Pro", "Color Grading", "Audio Mixing", "YouTube/Reels"],               icon: Laptop,    color: "#F59E0B" },
  { id: "digital-marketing", title: "Digital Marketing",                             category: "digital-skills", shortDesc: "SEO, GEO, SEM & Growth Hacking",                fullDesc: "A practical course covering search engine optimization, paid advertising, geo-targeting, and growth hacking strategies for businesses.",                                                                               duration: "3–6 Months", highlights: ["SEO", "Google Ads", "SEM", "Growth Hacking"],                                   icon: Zap,       color: "#10B981" },
  { id: "ai-tools",          title: "AI Tools for Business & Productivity",          category: "digital-skills", shortDesc: "Boost productivity with AI",                    fullDesc: "Learn to use AI tools for automating tasks, generating content, and improving business productivity. Covers ChatGPT, Copilot, and more.",                                                                              duration: "1–3 Months", highlights: ["ChatGPT", "Automation", "AI Productivity", "Prompt Engineering"],              icon: Zap,       color: "#7C3AED" },
  { id: "content-creation",  title: "Content Creation & AI-Assisted Copywriting",   category: "digital-skills", shortDesc: "Create content that converts",                  fullDesc: "Develop skills in content strategy, copywriting, and AI-assisted writing. Learn to create blogs, social posts, and marketing copy.",                                                                                  duration: "1–3 Months", highlights: ["Copywriting", "AI Writing Tools", "Social Media Content", "Content Strategy"], icon: Laptop,    color: "#1E3A8A" },
  { id: "basic-it",          title: "Basic IT / MS Office",                          category: "digital-skills", shortDesc: "Essential computer skills for everyone",        fullDesc: "Build foundational IT skills including MS Office, internet use, email management, and basic computer operations.",                                                                                                         duration: "1–3 Months", highlights: ["MS Word", "MS Excel", "MS PowerPoint", "Internet Skills"],                    icon: Monitor,   color: "#64748B" },
  { id: "no-code",           title: "No-Code / Low-Code Web Development",            category: "digital-skills", shortDesc: "Build websites without coding",                 fullDesc: "Create functional websites using no-code and low-code platforms. Learn Webflow, WordPress, and similar tools.",                                                                                                          duration: "1–3 Months", highlights: ["Webflow", "WordPress", "Site Templates", "Basic HTML"],                       icon: Code,      color: "#06B6D4" },
  { id: "ecommerce",         title: "E-Commerce & Marketplace Management",           category: "digital-skills", shortDesc: "Sell on Amazon, Daraz & Shopify",               fullDesc: "Set up and manage online stores on major platforms. Covers product listing, inventory, customer service, and growth strategies.",                                                                                          duration: "1–3 Months", highlights: ["Amazon FBA", "Daraz", "Shopify", "Inventory Management"],                     icon: Briefcase, color: "#F59E0B" },
  { id: "data-analytics",    title: "Data Analytics for Business",                   category: "digital-skills", shortDesc: "Turn data into decisions",                      fullDesc: "Learn to analyze business data using Excel, Power BI, and Google Analytics. Make data-driven decisions with confidence.",                                                                                                  duration: "1–3 Months", highlights: ["Excel Advanced", "Power BI", "Google Analytics", "Data Visualization"],      icon: Zap,       color: "#10B981" },
  { id: "mobile-app",        title: "Mobile App Development",                        category: "digital-skills", shortDesc: "Build apps for iOS and Android",                fullDesc: "Intro to mobile app development using modern frameworks. Covers UI design, basic programming, and app store deployment.",                                                                                                      duration: "3–6 Months", highlights: ["Flutter Basics", "UI/UX for Mobile", "App Store", "Publishing"],               icon: Code,      color: "#8B5CF6" },
  { id: "cybersecurity",     title: "Cybersecurity Fundamentals & Digital Safety",   category: "digital-skills", shortDesc: "Stay safe in the digital world",                fullDesc: "Learn essential cybersecurity concepts including network security, password management, phishing prevention, and digital safety practices.",                                                                                 duration: "1–3 Months", highlights: ["Network Security", "Password Safety", "Phishing Prevention", "Digital Hygiene"], icon: Monitor, color: "#EF4444" },
  { id: "biz-mgmt-course",   title: "Business Management",                           category: "digital-skills", shortDesc: "Run and grow a business effectively",           fullDesc: "Practical business management skills covering planning, operations, team leadership, and financial basics for entrepreneurs and managers.",                                                                                  duration: "1–3 Months", highlights: ["Business Planning", "Operations", "Team Leadership", "Finance Basics"],       icon: Briefcase, color: "#1E3A8A" },
  { id: "event-mgmt",        title: "Event Management",                              category: "digital-skills", shortDesc: "Plan and execute memorable events",             fullDesc: "Learn the complete process of event planning from concept to execution. Covers logistics, vendor management, budgeting, and promotion.",                                                                                    duration: "1–3 Months", highlights: ["Event Planning", "Logistics", "Vendor Management", "Promotion"],               icon: Briefcase, color: "#EC4899" },
  { id: "travel-tourism",    title: "Travel & Tourism",                              category: "digital-skills", shortDesc: "Explore careers in the travel industry",        fullDesc: "A practical course covering travel operations, tourism management, customer service, and global destination knowledge.",                                                                                                      duration: "1–3 Months", highlights: ["Tourism Management", "Travel Operations", "Customer Service", "Global Destinations"], icon: Briefcase, color: "#06B6D4" },
  { id: "teaching-skills",   title: "Modern Teaching Pro Skills",                   category: "digital-skills", shortDesc: "Teach effectively in the modern era",            fullDesc: "Equip educators with modern teaching methodologies, classroom management, and digital tools for engaging instruction.",                                                                                                        duration: "1–3 Months", highlights: ["Teaching Methods", "Classroom Management", "EdTech Tools", "Assessment"],     icon: GraduationCap, color: "#F59E0B" },
  { id: "comm-leadership",   title: "Professional Communication & Leadership Skills",category: "digital-skills", shortDesc: "Lead with confidence and clarity",              fullDesc: "Build professional communication, presentation, and leadership skills for workplace success and career advancement.",                                                                                                        duration: "1–3 Months", highlights: ["Public Speaking", "Leadership", "Presentations", "Team Communication"],       icon: Briefcase, color: "#7C3AED" },

  // Intermediate
  { id: "fsc-med",    title: "F.Sc Pre-Medical",     category: "intermediate", shortDesc: "Gateway to medical and health sciences",        fullDesc: "F.Sc Pre-Medical prepares students for MDCAT and entry into medical, dental, pharmacy, and allied health sciences programs.",                            duration: "2 Years", highlights: ["Biology", "Chemistry", "Physics", "MDCAT Preparation"],           icon: BookOpen, color: "#10B981" },
  { id: "fsc-eng",    title: "F.Sc Pre-Engineering", category: "intermediate", shortDesc: "Foundation for engineering and technology",     fullDesc: "F.Sc Pre-Engineering provides the mathematics and physics foundation needed for engineering university programs and ECAT.",                               duration: "2 Years", highlights: ["Mathematics", "Physics", "Chemistry", "ECAT Preparation"],          icon: BookOpen, color: "#1E3A8A" },
  { id: "ics-eco",    title: "ICS Economics",         category: "intermediate", shortDesc: "Math, computer science and economics",          fullDesc: "ICS with Economics combines computer skills with economic theory, ideal for students interested in business, finance, and IT.",                          duration: "2 Years", highlights: ["Computer Science", "Economics", "Statistics", "Mathematics"],       icon: BookOpen, color: "#F59E0B" },
  { id: "ics-stats",  title: "ICS Statistics, Physics",category: "intermediate", shortDesc: "Data, physics and computing combined",         fullDesc: "ICS with Statistics and Physics is ideal for students aiming for data science, physics, or computer-related university programs.",                      duration: "2 Years", highlights: ["Statistics", "Physics", "Computer Science", "Mathematics"],        icon: BookOpen, color: "#7C3AED" },
  { id: "icom",       title: "I.Com Commerce",        category: "intermediate", shortDesc: "Commerce and business fundamentals",            fullDesc: "I.Com Commerce introduces students to business, accounting, and economics fundamentals. Ideal for students aiming for business studies.",               duration: "2 Years", highlights: ["Accounting", "Economics", "Business Math", "Commerce Law"],          icon: BookOpen, color: "#EF4444" },
]

function ProgramCard({ program, onClick }: { program: Program; onClick: () => void }) {
  const Icon = program.icon
  return (
    <motion.div
      className="w-full cursor-pointer group"
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <div className="relative h-full rounded-2xl overflow-hidden bg-white shadow-md border border-slate-100 hover:shadow-xl hover:border-slate-200 transition-all duration-300 p-6 flex flex-col">
        {/* Gradient accent */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"
          style={{ background: `linear-gradient(135deg, ${program.color}, transparent)` }}
        />
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 shrink-0"
          style={{ backgroundColor: `${program.color}18` }}
        >
          <Icon className="w-6 h-6" style={{ color: program.color }} />
        </div>
        {/* Duration badge */}
        <span
          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium mb-3 w-fit"
          style={{ backgroundColor: `${program.color}12`, color: program.color }}
        >
          <Clock className="w-3 h-3" />
          {program.duration}
        </span>
        <h3 className="text-base font-bold text-[#0a1128] mb-1.5 leading-snug">{program.title}</h3>
        <p className="text-sm text-slate-500 mb-4 grow leading-relaxed">{program.shortDesc}</p>
        {/* Highlights */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {program.highlights.slice(0, 3).map((h) => (
            <span
              key={h}
              className="px-2 py-0.5 rounded-full text-[11px] font-medium"
              style={{ backgroundColor: `${program.color}10`, color: program.color }}
            >
              {h}
            </span>
          ))}
        </div>
        <motion.div
          className="flex items-center gap-1.5 text-sm font-semibold mt-auto"
          style={{ color: program.color }}
          whileHover={{ x: 3 }}
        >
          View Details <ArrowRight className="w-4 h-4" />
        </motion.div>
      </div>
    </motion.div>
  )
}

function ProgramModal({ program, onClose }: { program: Program | null; onClose: () => void }) {
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
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100"
          initial={{ scale: 0.92, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 40 }}
          transition={{ type: "spring", damping: 28 }}
        >
          {/* Header */}
          <div
            className="relative h-36 flex items-end p-6"
            style={{ background: `linear-gradient(135deg, ${program.color} 0%, ${program.color}90 100%)` }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
                <Icon className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white leading-tight">{program.title}</h2>
                <p className="text-white/75 text-sm">{program.shortDesc}</p>
              </div>
            </div>
          </div>
          {/* Body */}
          <div className="p-6">
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
              <Clock className="w-4 h-4" />
              <span>Duration: <span className="font-semibold text-[#0a1128]">{program.duration}</span></span>
            </div>
            <p className="text-slate-600 leading-relaxed mb-5 text-sm">{program.fullDesc}</p>
            <h4 className="font-semibold text-[#0a1128] mb-3 text-sm">Program Highlights</h4>
            <div className="flex flex-wrap gap-2 mb-6">
              {program.highlights.map((h) => (
                <span
                  key={h}
                  className="px-3 py-1.5 rounded-xl text-sm font-medium"
                  style={{ backgroundColor: `${program.color}12`, color: program.color }}
                >
                  {h}
                </span>
              ))}
            </div>
            <div className="flex gap-3">
              <Link
                href="/admissions"
                className="flex-1 py-3 rounded-xl text-white font-semibold text-center text-sm no-underline shadow-lg"
                style={{ backgroundColor: program.color }}
              >
                Apply Now
              </Link>
              <button
                onClick={onClose}
                className="px-5 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export function ProgramsSection() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all")
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null)

  const filtered = activeCategory === "all" ? programs : programs.filter((p) => p.category === activeCategory)
  const accentColor = categoryColors[activeCategory]

  return (
    <section id="programs" className="py-20 md:py-32 relative overflow-hidden bg-white">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-b from-white via-slate-50 to-blue-50/20 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
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
            Explore our diverse range of programs designed to prepare you for success in your chosen field.
          </p>
        </motion.div>

        {/* Category Filter Tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id
            const color = categoryColors[cat.id as CategoryId]
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as CategoryId)}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border"
                style={
                  isActive
                    ? { backgroundColor: color, color: "#fff", borderColor: color, boxShadow: `0 4px 14px ${color}40` }
                    : { backgroundColor: "transparent", color: "#64748b", borderColor: "#e2e8f0" }
                }
              >
                {cat.label}
                <span
                  className="ml-2 text-[11px] px-1.5 py-0.5 rounded-full"
                  style={
                    isActive
                      ? { backgroundColor: "rgba(255,255,255,0.25)", color: "#fff" }
                      : { backgroundColor: "#f1f5f9", color: "#94a3b8" }
                  }
                >
                  {cat.id === "all" ? programs.length : programs.filter((p) => p.category === cat.id).length}
                </span>
              </button>
            )
          })}
        </motion.div>

        {/* Programs Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
          >
            {filtered.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.4) }}
              >
                <ProgramCard program={program} onClick={() => setSelectedProgram(program)} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <ProgramModal program={selectedProgram} onClose={() => setSelectedProgram(null)} />
    </section>
  )
}
