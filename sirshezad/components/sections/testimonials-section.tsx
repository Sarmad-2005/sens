"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useMotionValue, useSpring, PanInfo } from "framer-motion"
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react"

interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  quote: string
  rating: number
  image: string
  year: string
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Emma Thompson",
    role: "Software Engineer",
    company: "Google",
    quote: "The education I received here transformed my career. The faculty's dedication and the hands-on learning approach prepared me for the real world like nowhere else could.",
    rating: 5,
    image: "ET",
    year: "Class of 2020"
  },
  {
    id: "2",
    name: "James Rodriguez",
    role: "Investment Banker",
    company: "Goldman Sachs",
    quote: "The business program's focus on practical skills and industry connections helped me land my dream job. The alumni network is incredibly supportive.",
    rating: 5,
    image: "JR",
    year: "Class of 2019"
  },
  {
    id: "3",
    name: "Sarah Chen",
    role: "UX Designer",
    company: "Apple",
    quote: "The design program pushed me to think creatively and develop a unique perspective. The mentorship I received was invaluable for my growth as a designer.",
    rating: 5,
    image: "SC",
    year: "Class of 2021"
  },
  {
    id: "4",
    name: "Michael Park",
    role: "Medical Resident",
    company: "Johns Hopkins",
    quote: "The medical program's rigorous curriculum and clinical exposure gave me the foundation I needed. The simulation labs are world-class.",
    rating: 5,
    image: "MP",
    year: "Class of 2018"
  },
  {
    id: "5",
    name: "Priya Sharma",
    role: "Product Manager",
    company: "Microsoft",
    quote: "Horizon University taught me to think critically and lead with empathy. The diverse community enriched my perspective immensely.",
    rating: 5,
    image: "PS",
    year: "Class of 2020"
  }
]

const colors = ["#1E3A8A", "#7C3AED", "#F59E0B", "#10B981", "#EF4444"]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const x = useMotionValue(0)
  const springX = useSpring(x, { damping: 30, stiffness: 200 })

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false)
    const threshold = 100
    
    if (info.offset.x > threshold && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    } else if (info.offset.x < -threshold && currentIndex < testimonials.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
    
    x.set(0)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(Math.max(0, Math.min(index, testimonials.length - 1)))
  }

  // Auto-rotate
  useEffect(() => {
    if (isDragging) return
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    
    return () => clearInterval(timer)
  }, [isDragging])

  return (
    <section className="py-20 md:py-32 relative overflow-hidden bg-gradient-to-b from-background via-muted/30 to-background">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#1E3A8A]/10 to-[#7C3AED]/10 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#7C3AED]/10 text-[#7C3AED] text-sm font-medium mb-4">
            Student Stories
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="gradient-text">What Our Alumni Say</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from our successful graduates who are making an impact around the world.
          </p>
        </motion.div>
        
        {/* 3D Carousel */}
        <div 
          ref={containerRef}
          className="relative max-w-5xl mx-auto h-[500px] md:h-[450px] perspective-1000"
        >
          <motion.div
            className="relative w-full h-full"
            style={{ x: springX }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
          >
            {testimonials.map((testimonial, index) => {
              const offset = index - currentIndex
              const isActive = index === currentIndex
              const color = colors[index % colors.length]
              
              return (
                <motion.div
                  key={testimonial.id}
                  className="absolute top-1/2 left-1/2 w-[90%] md:w-[70%] max-w-2xl"
                  animate={{
                    x: `calc(-50% + ${offset * 80}%)`,
                    y: "-50%",
                    z: isActive ? 0 : -100,
                    scale: isActive ? 1 : 0.85,
                    opacity: Math.abs(offset) > 1 ? 0 : isActive ? 1 : 0.5,
                    rotateY: offset * -15,
                  }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  style={{
                    transformStyle: "preserve-3d",
                    zIndex: isActive ? 10 : 5 - Math.abs(offset),
                  }}
                >
                  <div className="glass rounded-3xl p-6 md:p-8 relative">
                    {/* Quote Icon */}
                    <div 
                      className="absolute -top-4 -left-4 w-12 h-12 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: color }}
                    >
                      <Quote className="w-6 h-6 text-white" />
                    </div>
                    
                    {/* Rating */}
                    <div className="flex gap-1 mb-4 ml-8">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                      ))}
                    </div>
                    
                    {/* Quote */}
                    <p className="text-lg md:text-xl leading-relaxed mb-6">
                      {`"${testimonial.quote}"`}
                    </p>
                    
                    {/* Author */}
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold"
                        style={{ backgroundColor: color }}
                      >
                        {testimonial.image}
                      </div>
                      <div>
                        <h4 className="font-bold">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role} at {testimonial.company}
                        </p>
                        <p className="text-xs" style={{ color }}>{testimonial.year}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
          
          {/* Navigation */}
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-4">
            <motion.button
              className="w-12 h-12 rounded-full glass flex items-center justify-center"
              onClick={() => goToSlide(currentIndex - 1)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className={`w-6 h-6 ${currentIndex === 0 ? "opacity-30" : ""}`} />
            </motion.button>
            
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    index === currentIndex 
                      ? "bg-[#1E3A8A] w-8" 
                      : "bg-muted-foreground/30"
                  }`}
                  onClick={() => goToSlide(index)}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>
            
            <motion.button
              className="w-12 h-12 rounded-full glass flex items-center justify-center"
              onClick={() => goToSlide(currentIndex + 1)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              disabled={currentIndex === testimonials.length - 1}
            >
              <ChevronRight className={`w-6 h-6 ${currentIndex === testimonials.length - 1 ? "opacity-30" : ""}`} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}
