"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  User, 
  Mail, 
  Phone, 
  Briefcase, 
  Upload, 
  Send, 
  Check, 
  Loader2, 
  FileText, 
  Layers,
  Award,
  Users
} from "lucide-react"

interface JobFormData {
  name: string
  email: string
  phone: string
  position: string
  department: string
  experience: string
  summary: string
  fileName?: string
}

const positions = [
  "Professor",
  "Associate Professor",
  "Assistant Professor",
  "Lecturer",
  "Researcher",
  "Lab Assistant",
  "Administrative Staff"
]

const departments = [
  "Computer Science",
  "Business Administration",
  "Design & Arts",
  "Medical Sciences",
  "Law & Justice",
  "Engineering"
]

export function JobApplicationSection() {
  const [formData, setFormData] = useState<JobFormData>({
    name: "",
    email: "",
    phone: "",
    position: "",
    department: "",
    experience: "",
    summary: "",
    fileName: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleInputChange = (field: keyof JobFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <section id="careers" className="py-20 md:py-32 relative overflow-hidden bg-white">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/20 to-white" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mb-4">
            Careers
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-[#0a1128]">
            Join Our <span className="gradient-text">Academic Legacy</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            We are always looking for passionate educators and professionals to join our 
            world-class faculty. Build your career with Riphah.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <motion.div
            className="bg-white rounded-[2.5rem] shadow-2xl border border-blue-100 overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="grid lg:grid-cols-2">
              {/* Promo Side */}
              <div className="p-8 md:p-12 bg-[#0a1128] text-white">
                <h3 className="text-3xl font-bold mb-6">Why teach <span className="text-[#f5b041]">at Riphah?</span></h3>
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Layers className="w-6 h-6 text-[#f5b041]" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">State-of-the-art Labs</h4>
                      <p className="text-slate-400 text-sm">Access to premium research facilities and modern smart classrooms.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Award className="w-6 h-6 text-[#f5b041]" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Professional Growth</h4>
                      <p className="text-slate-400 text-sm">Continuous training programs and international research opportunities.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-[#f5b041]" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Collaborative Culture</h4>
                      <p className="text-slate-400 text-sm">Work alongside leading industry experts and dedicated educators.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-sm italic text-slate-400">
                    "Riphah provided me the platform to bridge the gap between academic theory 
                    and industrial innovation."
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-700" />
                    <div>
                      <div className="text-sm font-bold">Dr. Sarah Ahmed</div>
                      <div className="text-xs text-slate-500">Head of CS Department</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Side */}
              <div className="p-8 md:p-12">
                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      key="success"
                      className="h-full flex flex-col items-center justify-center text-center py-12"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-6">
                        <Check className="w-10 h-10" />
                      </div>
                      <h3 className="text-2xl font-bold text-[#0a1128] mb-2">Internal Review Initiated</h3>
                      <p className="text-slate-500 mb-8 max-w-xs">Our HR department will review your profile and contact you within 5-7 business days.</p>
                      <button 
                        onClick={() => setIsSubmitted(false)}
                        className="px-8 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-all font-[var(--font-poppins)]"
                      >
                        Apply for another role
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-[#0a1128]">Full Name</label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                              type="text"
                              required
                              value={formData.name}
                              onChange={(e) => handleInputChange("name", e.target.value)}
                              className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-100 focus:border-blue-500 focus:bg-white outline-none transition-all text-[#0a1128]"
                              placeholder="John Doe"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-[#0a1128]">Email Address</label>
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                              type="email"
                              required
                              value={formData.email}
                              onChange={(e) => handleInputChange("email", e.target.value)}
                              className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-100 focus:border-blue-500 focus:bg-white outline-none transition-all text-[#0a1128]"
                              placeholder="john@example.com"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-[#0a1128]">Position</label>
                          <select
                            required
                            value={formData.position}
                            onChange={(e) => handleInputChange("position", e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-100 focus:border-blue-500 focus:bg-white outline-none transition-all text-[#0a1128] appearance-none"
                          >
                            <option value="">Select Position</option>
                            {positions.map(p => <option key={p} value={p}>{p}</option>)}
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-[#0a1128]">Department</label>
                          <select
                            required
                            value={formData.department}
                            onChange={(e) => handleInputChange("department", e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-100 focus:border-blue-500 focus:bg-white outline-none transition-all text-[#0a1128] appearance-none"
                          >
                            <option value="">Select Department</option>
                            {departments.map(d => <option key={d} value={d}>{d}</option>)}
                          </select>
                        </div>
                        <div className="md:col-span-2 space-y-2">
                          <label className="text-sm font-bold text-[#0a1128]">CV / Resume</label>
                          <div className="relative group">
                            <input
                              type="file"
                              className="absolute inset-0 opacity-0 cursor-pointer z-10"
                              onChange={(e) => handleInputChange("fileName", e.target.files?.[0]?.name || "")}
                            />
                            <div className="w-full px-4 py-4 rounded-xl border-2 border-dashed border-slate-200 group-hover:border-blue-400 transition-colors flex items-center justify-center gap-3 text-slate-400">
                              <Upload className="w-5 h-5" />
                              <span className="text-sm font-medium">{formData.fileName || "Click or drag to upload CV (PDF/DOC)"}</span>
                            </div>
                          </div>
                        </div>
                        <div className="md:col-span-2 space-y-2">
                          <label className="text-sm font-bold text-[#0a1128]">Professional Summary</label>
                          <textarea
                            required
                            value={formData.summary}
                            onChange={(e) => handleInputChange("summary", e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-100 focus:border-blue-500 focus:bg-white outline-none transition-all text-[#0a1128] min-h-[120px]"
                            placeholder="Briefly describe your specialization and expertise..."
                          />
                        </div>
                      </div>

                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center gap-2 shadow-xl shadow-blue-200 disabled:opacity-50"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Reviewing...
                          </>
                        ) : (
                          <>
                            Submit Application <Send className="w-5 h-5" />
                          </>
                        )}
                      </motion.button>
                    </form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
