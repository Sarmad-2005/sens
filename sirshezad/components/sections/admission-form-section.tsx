"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  User, 
  Phone, 
  GraduationCap, 
  Send, 
  Check, 
  Loader2, 
  Mail, 
  MapPin, 
  ChevronRight, 
  ChevronLeft,
  Calendar,
  Users,
  BookOpen,
  School,
  FileText
} from "lucide-react"

interface AdmissionFormData {
  // Step 1: Personal
  studentName: string
  dob: string
  gender: string
  fatherName: string
  cnic: string
  
  // Step 2: Academic
  lastSchool: string
  lastGrade: string
  percentage: string
  appliedProgram: string
  
  // Step 3: Guardian
  guardianPhone: string
  guardianEmail: string
  address: string
  emergencyContact: string
}

const programs = [
  "Computer Science",
  "Business Administration",
  "Design & Arts",
  "Medical Sciences",
  "Law & Justice",
  "Engineering"
]

export function AdmissionFormSection() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<AdmissionFormData>({
    studentName: "",
    dob: "",
    gender: "",
    fatherName: "",
    cnic: "",
    lastSchool: "",
    lastGrade: "",
    percentage: "",
    appliedProgram: "",
    guardianPhone: "",
    guardianEmail: "",
    address: "",
    emergencyContact: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (field: keyof AdmissionFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = () => setStep(s => Math.min(s + 1, 3))
  const prevStep = () => setStep(s => Math.max(s - 1, 1))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-[#1E3A8A]">
                <User className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-[#0a1128]">Personal Information</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Student Full Name</label>
                <input
                  type="text"
                  value={formData.studentName}
                  onChange={(e) => handleInputChange("studentName", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-100 focus:border-[#1E3A8A] focus:bg-white outline-none transition-all text-[#0a1128]"
                  placeholder="Enter full name"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Father's Name</label>
                <input
                  type="text"
                  value={formData.fatherName}
                  onChange={(e) => handleInputChange("fatherName", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-100 focus:border-[#1E3A8A] focus:bg-white outline-none transition-all text-[#0a1128]"
                  placeholder="Father's full name"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Date of Birth</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={(e) => handleInputChange("dob", e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-100 focus:border-[#1E3A8A] focus:bg-white outline-none transition-all text-[#0a1128]"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-100 focus:border-[#1E3A8A] focus:bg-white outline-none transition-all text-[#0a1128] appearance-none"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-slate-700">CNIC / B-Form Number</label>
                <input
                  type="text"
                  value={formData.cnic}
                  onChange={(e) => handleInputChange("cnic", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-100 focus:border-[#1E3A8A] focus:bg-white outline-none transition-all text-[#0a1128]"
                  placeholder="xxxxx-xxxxxxx-x"
                  required
                />
              </div>
            </div>
          </motion.div>
        )
      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-[#7C3AED]">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-[#0a1128]">Academic Background</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-slate-700">Last Attended Institution</label>
                <div className="relative">
                  <School className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={formData.lastSchool}
                    onChange={(e) => handleInputChange("lastSchool", e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-100 focus:border-[#7C3AED] focus:bg-white outline-none transition-all text-[#0a1128]"
                    placeholder="School / College Name"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Last Completed Grade</label>
                <input
                  type="text"
                  value={formData.lastGrade}
                  onChange={(e) => handleInputChange("lastGrade", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-100 focus:border-[#7C3AED] focus:bg-white outline-none transition-all text-[#0a1128]"
                  placeholder="e.g. Matric / O-Levels"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Percentage / GPA</label>
                <input
                  type="text"
                  value={formData.percentage}
                  onChange={(e) => handleInputChange("percentage", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-100 focus:border-[#7C3AED] focus:bg-white outline-none transition-all text-[#0a1128]"
                  placeholder="e.g. 85%"
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-slate-700">Program Applied For</label>
                <select
                  value={formData.appliedProgram}
                  onChange={(e) => handleInputChange("appliedProgram", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-100 focus:border-[#7C3AED] focus:bg-white outline-none transition-all text-[#0a1128] appearance-none"
                  required
                >
                  <option value="">Select a Program</option>
                  {programs.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            </div>
          </motion.div>
        )
      case 3:
        return (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-[#F59E0B]">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-[#0a1128]">Guardian & Contact Details</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Guardian Contact Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    value={formData.guardianPhone}
                    onChange={(e) => handleInputChange("guardianPhone", e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-100 focus:border-[#F59E0B] focus:bg-white outline-none transition-all text-[#0a1128]"
                    placeholder="+92 XXX XXXXXXX"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Guardian Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={formData.guardianEmail}
                    onChange={(e) => handleInputChange("guardianEmail", e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-100 focus:border-[#F59E0B] focus:bg-white outline-none transition-all text-[#0a1128]"
                    placeholder="email@example.com"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-slate-700">Residential Address</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <textarea
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-100 focus:border-[#F59E0B] focus:bg-white outline-none transition-all text-[#0a1128] min-h-[100px]"
                    placeholder="Full residential address"
                    required
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )
      default:
        return null
    }
  }

  return (
    <section className="py-20 md:py-32 relative overflow-hidden bg-white">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-blue-50/20" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto shadow-2xl rounded-[2.5rem] overflow-hidden bg-white border border-blue-50">
          <div className="grid lg:grid-cols-5 h-full">
            {/* Sidebar / Progress */}
            <div className="lg:col-span-2 bg-[#0a1128] p-8 md:p-12 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl text-balance" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl text-balance" />
              
              <div className="relative z-10">
                < GraduationCap className="w-12 h-12 text-[#f5b041] mb-6" />
                <h2 className="text-3xl font-bold mb-4">Join our <span className="text-[#f5b041]">Academic Community</span></h2>
                <p className="text-slate-400 mb-12">Complete the form to submit your application for the 2026 Academic Session.</p>
                
                <div className="space-y-8">
                  {[
                    { s: 1, label: "Personal Details", icon: User },
                    { s: 2, label: "Academics", icon: BookOpen },
                    { s: 3, label: "Guardian Information", icon: Users },
                  ].map((item) => (
                    <div key={item.s} className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${
                        step >= item.s ? "bg-[#f5b041] border-[#f5b041] text-[#0a1128]" : "border-white/20 text-white/40"
                      }`}>
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className={`text-xs font-semibold ${step >= item.s ? "text-[#f5b041]" : "text-white/40"}`}>Step 0{item.s}</span>
                        <span className={`font-medium ${step >= item.s ? "text-white" : "text-white/40"}`}>{item.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className="lg:col-span-3 p-8 md:p-12">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    className="h-full flex flex-col items-center justify-center text-center py-12"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-8">
                      <Check className="w-12 h-12" />
                    </div>
                    <h3 className="text-3xl font-bold text-[#0a1128] mb-4">Application Submitted!</h3>
                    <p className="text-slate-600 max-w-sm mb-8">Your application has been received and is currently being processed by our admissions department.</p>
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="px-8 py-3 rounded-xl border-2 border-slate-100 text-slate-500 font-bold hover:bg-slate-50 transition-all"
                    >
                      Apply for another program
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="h-full flex flex-col">
                    <div className="flex-grow">
                      {renderStep()}
                    </div>

                    <div className="mt-12 flex items-center justify-between pt-8 border-t border-slate-100">
                      {step > 1 ? (
                        <button
                          type="button"
                          onClick={prevStep}
                          className="flex items-center gap-2 text-slate-500 font-bold hover:text-[#0a1128] transition-all"
                        >
                          <ChevronLeft className="w-5 h-5" /> Previous
                        </button>
                      ) : <div />}

                      {step < 3 ? (
                        <button
                          type="button"
                          onClick={nextStep}
                          className="px-8 py-3 rounded-xl bg-[#0a1128] text-white font-bold flex items-center gap-2 hover:bg-[#1e2d5c] transition-all shadow-lg shadow-blue-900/10"
                        >
                          Continue <ChevronRight className="w-5 h-5" />
                        </button>
                      ) : (
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="px-10 py-3 rounded-xl bg-[#f5b041] text-[#0a1128] font-bold flex items-center gap-2 hover:bg-[#f39c12] transition-all shadow-lg shadow-orange-200 disabled:opacity-50"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              Submit Application <Send className="w-5 h-5" />
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
