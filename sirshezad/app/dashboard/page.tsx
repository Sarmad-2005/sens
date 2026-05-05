"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { 
  Home, BookOpen, Calendar, CreditCard, FileText, Settings, LogOut, 
  Bell, Search, User, ChevronDown, TrendingUp, Clock, CheckCircle,
  AlertCircle, GraduationCap, Award, Briefcase
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const sidebarItems = [
  { icon: <Home className="w-5 h-5" />, label: "Dashboard", active: true },
  { icon: <BookOpen className="w-5 h-5" />, label: "My Courses" },
  { icon: <Calendar className="w-5 h-5" />, label: "Schedule" },
  { icon: <CreditCard className="w-5 h-5" />, label: "Payments" },
  { icon: <FileText className="w-5 h-5" />, label: "Documents" },
  { icon: <Award className="w-5 h-5" />, label: "Achievements" },
  { icon: <Briefcase className="w-5 h-5" />, label: "Placements" },
  { icon: <Settings className="w-5 h-5" />, label: "Settings" },
]

const courses = [
  { name: "Advanced Machine Learning", progress: 75, instructor: "Dr. Sarah Chen", nextClass: "Tomorrow, 10:00 AM" },
  { name: "Data Structures & Algorithms", progress: 60, instructor: "Prof. Michael Brown", nextClass: "Today, 2:00 PM" },
  { name: "Cloud Computing", progress: 45, instructor: "Dr. Emily Watson", nextClass: "Thursday, 11:00 AM" },
  { name: "Cybersecurity Fundamentals", progress: 90, instructor: "Dr. James Lee", nextClass: "Friday, 9:00 AM" },
]

const upcomingEvents = [
  { title: "Mid-term Exam - ML", date: "Apr 15, 2026", type: "exam", status: "upcoming" },
  { title: "Project Submission", date: "Apr 18, 2026", type: "assignment", status: "pending" },
  { title: "Career Fair 2026", date: "Apr 22, 2026", type: "event", status: "upcoming" },
  { title: "Guest Lecture - AI Ethics", date: "Apr 25, 2026", type: "lecture", status: "upcoming" },
]

const notifications = [
  { message: "New grade posted for Data Structures", time: "2 hours ago", read: false },
  { message: "Scholarship application deadline approaching", time: "5 hours ago", read: false },
  { message: "Your course enrollment is confirmed", time: "1 day ago", read: true },
]

export default function DashboardPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <motion.aside
        initial={{ width: 280 }}
        animate={{ width: sidebarCollapsed ? 80 : 280 }}
        className="fixed left-0 top-0 h-screen glass-dark border-r border-border/50 z-50 flex flex-col"
      >
        <div className="p-6 border-b border-border/50">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1E3A8A] to-[#7C3AED] flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            {!sidebarCollapsed && (
              <span className="text-xl font-bold gradient-text">Horizon U</span>
            )}
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {sidebarItems.map((item, index) => (
            <button
              key={index}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                item.active
                  ? "bg-gradient-to-r from-[#1E3A8A] to-[#7C3AED] text-white"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {item.icon}
              {!sidebarCollapsed && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-border/50">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-200">
            <LogOut className="w-5 h-5" />
            {!sidebarCollapsed && <span>Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className={`flex-1 ${sidebarCollapsed ? "ml-20" : "ml-[280px]"} transition-all duration-300`}>
        {/* Top Header */}
        <header className="sticky top-0 z-40 glass-dark border-b border-border/50 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search courses, events..."
                  className="pl-10 w-80 bg-muted/50 border-0"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-[#F59E0B] rounded-full" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  {notifications.map((notif, index) => (
                    <DropdownMenuItem key={index} className="flex flex-col items-start p-3">
                      <span className={notif.read ? "text-muted-foreground" : "font-medium"}>{notif.message}</span>
                      <span className="text-xs text-muted-foreground">{notif.time}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1E3A8A] to-[#7C3AED] flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left hidden md:block">
                      <div className="text-sm font-medium">Alex Johnson</div>
                      <div className="text-xs text-muted-foreground">Computer Science</div>
                    </div>
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6 space-y-6">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-dark rounded-3xl p-8 bg-gradient-to-r from-[#1E3A8A]/10 to-[#7C3AED]/10"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  Welcome back, Alex!
                </h1>
                <p className="text-muted-foreground">
                  You have 2 classes today and 3 assignments due this week.
                </p>
              </div>
              <Button className="bg-gradient-to-r from-[#1E3A8A] to-[#7C3AED] text-white">
                View Full Schedule
              </Button>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Current GPA", value: "3.85", icon: <TrendingUp />, change: "+0.2", color: "text-green-500" },
              { label: "Attendance", value: "94%", icon: <CheckCircle />, change: "+2%", color: "text-green-500" },
              { label: "Pending Tasks", value: "5", icon: <Clock />, change: "-2", color: "text-orange-500" },
              { label: "Credits Earned", value: "96", icon: <Award />, change: "+12", color: "text-blue-500" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-dark rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground">
                    {stat.icon}
                  </div>
                  <span className={`text-sm font-medium ${stat.color}`}>{stat.change}</span>
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Courses Section */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-foreground">My Courses</h2>
                <Button variant="ghost" size="sm">View All</Button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {courses.map((course, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="glass-dark rounded-2xl p-6 hover:glow transition-all duration-300 cursor-pointer"
                  >
                    <h3 className="font-semibold text-foreground mb-2">{course.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{course.instructor}</p>
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium gradient-text">{course.progress}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#1E3A8A] to-[#7C3AED] rounded-full transition-all duration-500"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{course.nextClass}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-foreground">Upcoming</h2>
                <Button variant="ghost" size="sm">View All</Button>
              </div>
              <div className="glass-dark rounded-2xl p-6 space-y-4">
                {upcomingEvents.map((event, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-4 pb-4 border-b border-border/50 last:border-0 last:pb-0"
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      event.type === "exam" ? "bg-red-500/10 text-red-500" :
                      event.type === "assignment" ? "bg-orange-500/10 text-orange-500" :
                      event.type === "event" ? "bg-blue-500/10 text-blue-500" :
                      "bg-green-500/10 text-green-500"
                    }`}>
                      {event.type === "exam" && <AlertCircle className="w-5 h-5" />}
                      {event.type === "assignment" && <FileText className="w-5 h-5" />}
                      {event.type === "event" && <Calendar className="w-5 h-5" />}
                      {event.type === "lecture" && <BookOpen className="w-5 h-5" />}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground text-sm">{event.title}</h4>
                      <p className="text-xs text-muted-foreground">{event.date}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
