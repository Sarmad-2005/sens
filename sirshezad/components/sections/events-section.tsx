"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, MapPin, Clock, Users, X, ArrowRight } from "lucide-react"

interface Event {
  id: string
  title: string
  date: string
  time: string
  location: string
  attendees: number
  description: string
  type: "academic" | "cultural" | "sports" | "career"
  color: string
}

const events: Event[] = [
  {
    id: "1",
    title: "Open Day 2025",
    date: "Jan 15, 2025",
    time: "10:00 AM - 4:00 PM",
    location: "Main Campus",
    attendees: 500,
    description: "Explore our campus, meet faculty, and learn about our programs. Includes campus tours, info sessions, and Q&A with current students.",
    type: "academic",
    color: "#1E3A8A"
  },
  {
    id: "2",
    title: "Tech Innovation Summit",
    date: "Feb 8, 2025",
    time: "9:00 AM - 6:00 PM",
    location: "Innovation Center",
    attendees: 300,
    description: "Annual tech summit featuring keynote speakers from leading tech companies, hackathons, and networking opportunities.",
    type: "academic",
    color: "#7C3AED"
  },
  {
    id: "3",
    title: "Cultural Festival",
    date: "Mar 20, 2025",
    time: "5:00 PM - 10:00 PM",
    location: "Amphitheater",
    attendees: 1000,
    description: "Celebrate diversity with performances, food stalls, and cultural exhibitions from around the world.",
    type: "cultural",
    color: "#F59E0B"
  },
  {
    id: "4",
    title: "Annual Sports Meet",
    date: "Apr 5, 2025",
    time: "8:00 AM - 5:00 PM",
    location: "Sports Complex",
    attendees: 800,
    description: "Inter-college sports competition featuring athletics, swimming, basketball, and more.",
    type: "sports",
    color: "#10B981"
  },
  {
    id: "5",
    title: "Career Fair 2025",
    date: "May 12, 2025",
    time: "10:00 AM - 4:00 PM",
    location: "Convention Center",
    attendees: 600,
    description: "Connect with top employers, attend workshops, and explore internship and job opportunities.",
    type: "career",
    color: "#EF4444"
  },
  {
    id: "6",
    title: "Graduation Ceremony",
    date: "Jun 25, 2025",
    time: "2:00 PM - 5:00 PM",
    location: "Grand Auditorium",
    attendees: 2000,
    description: "Celebrate the achievements of our graduating class with a grand ceremony and celebration.",
    type: "academic",
    color: "#06B6D4"
  }
]

function EventModal({ event, onClose }: { event: Event | null; onClose: () => void }) {
  if (!event) return null

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
          className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl border border-blue-100"
          initial={{ scale: 0.9, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 50 }}
          transition={{ type: "spring", damping: 25 }}
        >
          <div 
            className="h-3"
            style={{ backgroundColor: event.color }}
          />
          
          <button
            onClick={onClose}
            className="absolute top-6 right-4 p-2 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
          
          <div className="p-6">
            <div 
              className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-3"
              style={{ backgroundColor: `${event.color}15`, color: event.color }}
            >
              {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
            </div>
            
            <h2 className="text-2xl font-bold mb-4 text-[#0a1128]">{event.title}</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Users className="w-4 h-4 text-slate-400" />
                <span>{event.attendees}+ Expected Attendees</span>
              </div>
            </div>
            
            <p className="text-slate-600 leading-relaxed mb-6">
              {event.description}
            </p>
            
            <div className="flex gap-3">
              <button 
                className="flex-1 py-3 rounded-xl text-white font-semibold shadow-lg shadow-blue-200"
                style={{ backgroundColor: event.color }}
              >
                Register Now
              </button>
              <button className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors">
                Add to Calendar
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export function EventsSection() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  return (
    <section id="events" className="py-20 md:py-32 relative overflow-hidden bg-white">
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
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#EF4444]/10 text-[#EF4444] text-sm font-medium mb-4">
            Upcoming Events
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-[#0a1128]">
            Campus <span className="gradient-text">Events</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Join us for exciting events throughout the year. From academic 
            conferences to cultural celebrations.
          </p>
        </motion.div>
        
        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#1E3A8A] via-[#7C3AED] to-[#F59E0B]" />
          
          {/* Events */}
          <div className="space-y-8">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                className={`relative flex items-center gap-6 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Timeline Node */}
                <motion.div
                  className="absolute left-4 md:left-1/2 w-4 h-4 -translate-x-1/2 rounded-full border-4 border-white z-10 shadow-sm"
                  style={{ backgroundColor: event.color }}
                  whileHover={{ scale: 1.5 }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                />
                
                {/* Date Badge - Desktop */}
                <div className={`hidden md:block w-32 text-center ${
                  index % 2 === 0 ? "text-right pr-8" : "text-left pl-8"
                }`}>
                  <div className="text-sm font-semibold" style={{ color: event.color }}>
                    {event.date}
                  </div>
                </div>
                
                {/* Event Card */}
                <motion.div
                  className="ml-10 md:ml-0 flex-1 max-w-md cursor-pointer"
                  onClick={() => setSelectedEvent(event)}
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="bg-white shadow-xl border border-blue-100 rounded-2xl p-5 relative overflow-hidden">
                    {/* Color accent */}
                    <div 
                      className="absolute top-0 left-0 w-1 h-full"
                      style={{ backgroundColor: event.color }}
                    />
                    
                    {/* Mobile Date */}
                    <div className="md:hidden text-xs font-semibold mb-2" style={{ color: event.color }}>
                      {event.date}
                    </div>
                    
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div 
                          className="inline-block px-2 py-0.5 rounded-full text-xs font-medium mb-2"
                          style={{ backgroundColor: `${event.color}15`, color: event.color }}
                        >
                          {event.type}
                        </div>
                        <h3 className="font-bold text-lg mb-1 text-[#0a1128]">{event.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <MapPin className="w-3 h-3" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                      
                      <motion.div
                        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${event.color}10` }}
                        whileHover={{ rotate: 45 }}
                      >
                        <ArrowRight className="w-5 h-5" style={{ color: event.color }} />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Spacer for alignment */}
                <div className="hidden md:block w-32" />
              </motion.div>
            ))}
          </div>
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
            View All Events
          </motion.button>
        </motion.div>
      </div>
      
      <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </section>
  )
}
