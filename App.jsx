
import React, { useState, useEffect } from 'react';
import { Calendar, Award, Users, Code, Leaf, Phone, Mail, ExternalLink, Zap, Globe, Brain, Lock, Unlock } from 'lucide-react';
import Loading from './Loading';

export default function App() {
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    if (selectedProblem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProblem]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const timelineData = [
    {
      title: "Problem Statement Announcement",
      date: new Date("2025-05-28T09:00:00"),
      deliverable: "Competition Kick-off",
      note: "Check website for detailed problem statements"
    },
    {
      title: "Round 1 Submissions",
      date: new Date("2025-06-02T23:59:00"),
      deliverable: "Concept Brief Submission",
      note: "File format: teamname_round1_greenx.*"
    },
    {
      title: "Shortlist Announcement",
      date: new Date("2025-06-02T18:00:00"),
      deliverable: "Top 6 Teams Selected"
    },
    {
      title: "Round 2 PPT Submission",
      date: new Date("2025-06-07T23:59:00"),
      deliverable: "Detailed Presentation Deck",
      note: "File format: teamname_round2_greenx.pptx"
    },
    {
      title: "Final Presentation Day",
      date: new Date("2025-06-08T10:00:00"),
      deliverable: "Live Team Presentations"
    },
    {
      title: "Winners Announcement",
      date: new Date("2025-06-15T12:00:00"),
      deliverable: "Top 3 Winners Revealed"
    }
  ];

  const problemStatements = [
    {
      id: 1,
      title: "Climate-Vegetation Dynamics",
      description: "Climate change is rapidly altering vegetation patterns, rainfall patterns and wind dynamics, creating significant environmental and societal challenges.",
      details: "Conceptualize an AI/ML, IoT, and web-based platform to monitor, predict, and enable adaptive responses to shifts in vegetation and wind patterns. Your solution should address the complex interactions between climate variables and vegetation changes, providing actionable insights for environmental management and conservation efforts.",
      tags: ["AI/ML", "IoT", "Web Platform"],
      icon: <Leaf className="w-8 h-8" />,
      gradient: "from-emerald-500 to-teal-600"
    },
    {
      id: 2,
      title: "River Health Monitoring & Intervention",
      description: "Rivers face unprecedented threats from pollution and climate change, demanding immediate and intelligent intervention and checking level of pollution at the same time.",
      details: "Design a conceptual system leveraging AI/ML, IoT, and web tools to track water quality, predict pollution events, and coordinate responsive measures. Your platform should provide real-time monitoring capabilities, predictive analytics for pollution forecasting, and automated intervention systems to protect river ecosystems.",
      tags: ["AI/ML", "IoT", "Water Quality"],
      icon: <Globe className="w-8 h-8" />,
      gradient: "from-blue-500 to-teal-600"
    },
    {
      id: 3,
      title: "Open Innovation on Sustainability",
      description: "Encourage open-ended solutions for sustainable development and eco-friendly practices.",
      details: "Propose a novel, technology-driven concept that promotes environmental stewardship (e.g., waste management, renewable energy adoption, circular economy). This challenge invites creative and innovative approaches to sustainability challenges, allowing teams to explore unique solutions that leverage emerging technologies for environmental benefit.",
      tags: ["Innovation", "Sustainability", "Open-ended"],
      icon: <Brain className="w-8 h-8" />,
      gradient: "from-green-500 to-emerald-600"
    }
  ];

  if (isLoading) {
    return <Loading onLoadingComplete={() => setIsLoading(false)} />;
  }

  const formatDate = (date) => {
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Kolkata'
    });
  };

  const isEventLocked = (eventDate) => {
    return currentTime < eventDate;
  };

  const TimelineItem = ({ item, index }) => {
    const locked = isEventLocked(item.date);
    const dateStr = formatDate(item.date);
    
    return (
      <div className={`relative w-full mb-8 ${index % 2 === 0 ? 'ml-auto pl-8 pr-0 text-right' : 'mr-auto pr-8 pl-0 text-left'}`}>
        <div className={`relative p-6 rounded-2xl shadow-lg transition-all duration-300 ${locked ? 'bg-white/30 backdrop-blur-sm border-2 border-green-200/30 blur-[2px] opacity-80' : 'bg-white/50 backdrop-blur-md border-2 border-green-300/50'}`}>
          <h3 className={`text-xl font-bold mb-2 ${locked ? 'text-green-700/80' : 'text-green-800'}`}>{item.title}</h3>
          <p className={`text-sm mb-2 ${locked ? 'text-green-600/70' : 'text-green-700'}`}>{dateStr}</p>
          <p className={`font-medium ${locked ? 'text-green-600/70' : 'text-green-700'}`}>{item.deliverable}</p>
          {item.note && (
            <p className={`text-xs mt-2 ${locked ? 'text-green-600/60' : 'text-green-600/80'}`}>{item.note}</p>
          )}
          {locked && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/90 px-4 py-2 rounded-full shadow-md flex items-center">
                <Lock className="w-4 h-4 mr-2 text-red-500" />
                <span className="text-xs font-bold text-red-600">Unlocks {dateStr}</span>
              </div>
            </div>
          )}
        </div>
        <div className={`absolute top-6 w-6 h-6 rounded-full border-4 border-white ${locked ? 'bg-green-300' : 'bg-green-500'} shadow-md ${index % 2 === 0 ? '-left-3' : '-right-3'}`}></div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-transparent overflow-hidden animate-fadeIn relative">
      {/* Nature-inspired Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Floating Leaves */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `floatLeaf ${12 + Math.random() * 8}s linear infinite`,
              animationDelay: `${Math.random() * 12}s`
            }}
          >
            <Leaf className="w-8 h-8 text-green-600 transform rotate-12" />
          </div>
        ))}

        {/* Organic Gradient Orbs */}
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-green-300/10 to-emerald-400/10 rounded-full blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        ></div>
        <div
          className="absolute top-1/3 right-1/4 w-72 h-72 bg-gradient-to-r from-teal-300/8 to-green-400/8 rounded-full blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`
          }}
        ></div>
        <div className="absolute bottom-10 left-16 w-48 h-48 bg-gradient-to-r from-emerald-200/15 to-green-300/15 rounded-full blur-2xl animate-pulse"></div>
      </div>

      {/* Header */}
      <header className="relative bg-white/20 backdrop-blur-xl border-b border-green-200/30 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400/10 to-emerald-500/10 backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-xl border border-green-200/20">
                  <img
                    src="/logo.png"
                    alt="NITS Eco Club Logo"
                    className="w-12 h-12"
                  />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-3xl blur opacity-10"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-green-800 to-emerald-700 bg-clip-text text-transparent">
                  NITS ECO CLUB
                </h1>
                <p className="text-base text-green-600/80 font-medium">National Institute of Technology Silchar</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#problems" className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-bold text-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                Problems
              </a>
              <a href="#timeline" className="px-6 py-3 bg-white/30 backdrop-blur-sm border-2 border-green-400 text-green-700 rounded-full font-bold text-lg hover:bg-white/50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                Timeline
              </a>
              <a href="#contact" className="px-6 py-3 bg-white/30 backdrop-blur-sm border-2 border-green-400 text-green-700 rounded-full font-bold text-lg hover:bg-white/50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                Contact
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-32 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-12">
            <div className="inline-flex items-center bg-white/30 backdrop-blur-sm border-2 border-green-300/30 rounded-full px-8 py-4 mb-8 shadow-lg">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-4 animate-pulse"></div>
              <span className="text-green-700 font-bold text-lg">PROKRITI 5.0 - World Environment Day 2025</span>
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-none">
              <span className="bg-gradient-to-r from-green-600 via-emerald-500 to-teal-600 bg-clip-text text-transparent">
                GREEN X
              </span>
              <br />
              <span className="text-5xl md:text-7xl lg:text-8xl bg-gradient-to-r from-amber-600 via-yellow-500 to-orange-600 bg-clip-text text-transparent">
                HACKATHON
              </span>
            </h1>

            <p className="text-2xl text-green-800/80 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
              Unleash your creativity to solve tomorrow's environmental challenges. Join the revolution
              where innovation meets sustainability in an extraordinary coding journey.
            </p>
          </div>

          {/* Event Stats */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { icon: <Calendar className="w-12 h-12" />, label: "Event Duration", value: "25 May - 8 June", color: "green", bg: "from-green-400 to-emerald-500" },
              { icon: <Award className="w-12 h-12" />, label: "Prize Pool", value: "₹24,000", color: "amber", bg: "from-yellow-400 to-orange-500" },
              { icon: <Code className="w-12 h-12" />, label: "Format", value: "Virtual", color: "teal", bg: "from-teal-400 to-emerald-500" }
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="bg-white/30 backdrop-blur-xl border-2 border-green-200/30 rounded-3xl p-10 hover:bg-white/40 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl">
                  <div className={`text-white mb-6 flex justify-center group-hover:scale-110 transition-transform bg-gradient-to-r ${stat.bg} rounded-2xl p-4 w-fit mx-auto shadow-lg`}>
                    {stat.icon}
                  </div>
                  <h3 className="text-xl font-bold text-green-800 mb-3">{stat.label}</h3>
                  <p className={`text-3xl font-black bg-gradient-to-r ${stat.bg} bg-clip-text text-transparent`}>{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Statements */}
      <section id="problems" className="relative py-32 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-6xl font-black text-green-800 mb-6">
              Problem <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Statements</span>
            </h2>
            <p className="text-2xl text-green-700/80 max-w-3xl mx-auto font-medium">
              Three groundbreaking challenges that will reshape how we think about environmental technology
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {problemStatements.map((problem, index) => (
              <div
                key={problem.id}
                className="group cursor-pointer h-full"
                onClick={() => setSelectedProblem(problem)}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative bg-white/30 backdrop-blur-xl border-2 border-green-200/30 rounded-3xl p-8 hover:bg-white/40 transition-all duration-500 hover:scale-105 hover:border-green-300/50 shadow-xl hover:shadow-2xl h-full flex flex-col">
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${problem.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}></div>

                  <div className="relative z-10 flex flex-col h-full">
                    <div className={`inline-flex p-5 bg-gradient-to-r ${problem.gradient} rounded-2xl mb-6 text-white group-hover:scale-110 transition-transform duration-300 shadow-lg w-fit`}>
                      {problem.icon}
                    </div>

                    <h3 className="text-2xl font-bold text-green-800 mb-4 group-hover:bg-gradient-to-r group-hover:from-green-700 group-hover:to-emerald-700 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                      {problem.title}
                    </h3>

                    <p className="text-green-700/80 mb-6 leading-relaxed text-lg flex-grow">
                      {problem.description}
                    </p>

                    <div className="flex flex-wrap gap-3 mb-8">
                      {problem.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-4 py-2 bg-green-100/50 border-2 border-green-300/30 text-green-700 rounded-full text-sm font-bold backdrop-blur-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className={`inline-flex items-center bg-gradient-to-r ${problem.gradient} bg-clip-text text-transparent font-bold text-lg group-hover:scale-105 transition-transform mt-auto`}>
                      Explore Challenge
                      <ExternalLink className="w-5 h-5 ml-2" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="relative py-32 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-6xl font-black text-green-800 mb-6">
              Event <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Timeline</span>
            </h2>
            <p className="text-2xl text-green-700/80 max-w-3xl mx-auto font-medium">
              Important milestones and deadlines for the GreenX Hackathon
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-green-400 to-emerald-500 transform -translate-x-1/2 z-0"></div>

            {/* Timeline items */}
            <div className="relative z-10">
              {timelineData.map((item, index) => (
                <TimelineItem key={index} item={item} index={index} />
              ))}
            </div>
          </div>

          <div className="mt-16 text-center">
            <div className="inline-flex items-center bg-white/30 backdrop-blur-sm border-2 border-green-300/30 rounded-full px-8 py-4 shadow-lg">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-4 animate-pulse"></div>
              <span className="text-green-700 font-bold text-lg">Registration Deadline: May 27, 2025</span>
            </div>
          </div>
        </div>
      </section>

      {/* Submission Section */}
      <section className="relative pb-32 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="bg-white/30 backdrop-blur-xl border-2 border-green-200/30 rounded-3xl p-12 mx-auto max-w-4xl shadow-xl">
            <h2 className="text-4xl md:text-5xl font-black text-green-800 mb-6">
              Ready to <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Submit?</span>
            </h2>
            <p className="text-xl text-green-700/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              Finalize your solution and submit your presentation through our official submission portal.
            </p>
            <a
              href="https://docs.google.com/forms/your-form-link"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-bold text-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Submit Your Solution
              <ExternalLink className="w-5 h-5 ml-2" />
            </a>
            <p className="text-green-600/70 mt-4 text-sm">
              Submissions close on June 7, 2025 at 11:59 PM IST
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-32 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-6xl font-black text-green-800 mb-6">
              Get In <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Touch</span>
            </h2>
            <p className="text-2xl text-green-700/80 font-medium">Connect with our expert organizers for any queries</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Kaushik Dihingia", role: "General Secretary", phone: "8822655658" },
              { name: "Rajdeep Sarmah", role: "Organizer", phone: "7002819816" },
              { name: "Probin Dhakal", role: "Organizer", phone: "7896041989" },
              { name: "Bisal Prasad", role: "Organizer", phone: "9395360772" },
            ].map((organizer, index) => (
              <div key={index} className="group">
                <div className="bg-white/30 backdrop-blur-xl border-2 border-green-200/30 rounded-3xl p-10 text-center hover:bg-white/40 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl">
                  <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mx-auto mb-6 flex items-center justify-center text-2xl font-bold text-white group-hover:scale-110 transition-transform shadow-lg">
                    {organizer.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h3 className="text-2xl font-bold text-green-800 mb-3">{organizer.name}</h3>
                  <p className="text-emerald-600 mb-6 font-bold text-lg">{organizer.role}</p>
                  <div className="flex items-center justify-center space-x-3 text-green-700">
                    <Phone className="w-5 h-5" />
                    <span className="font-mono text-lg font-bold">{organizer.phone}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-green-200/30 bg-white/20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-green-400/10 to-emerald-500/10 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg border border-green-200/20">
                <img
                  src="/logo.png"
                  alt="NITS Eco Club Logo"
                  className="w-10 h-10"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-green-800 to-emerald-700 bg-clip-text text-transparent">
                  NITS ECO CLUB
                </h3>
                <p className="text-green-600 font-medium">Let Your Creativity Shine</p>
              </div>
            </div>

            <div className="flex justify-center space-x-8 mb-8 text-green-700/80">
              <a
                href="https://www.instagram.com/eco_club_nits?igsh=eGRuem41aGppczRi"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-800 cursor-pointer transition-colors flex items-center"
              >
                <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
                Instagram
              </a>
              <a
                href="https://www.facebook.com/nitsecoclub"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-800 cursor-pointer transition-colors flex items-center"
              >
                <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
                Facebook
              </a>
              <a
                href="https://www.nits.ac.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-800 cursor-pointer transition-colors flex items-center"
              >
                <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z" clipRule="evenodd" />
                </svg>
                NITS Official
              </a>
            </div>

            <div className="border-t border-green-200/30 pt-8">
              <p className="text-green-600/70">
                © 2025 NITS Eco Club. All rights reserved. | PROKRITI 5.0 - Virtual Green Fest
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Problem Details Modal */}
      {selectedProblem && (
        <div className={`fixed inset-0 bg-black/30 backdrop-blur-lg z-50 flex ${isMobile ? 'items-end' : 'items-center'} justify-center p-0 md:p-4`}>
          <div className={`relative bg-white/80 border-t-4 border-green-300/40 ${isMobile ? 'rounded-t-3xl w-screen' : 'rounded-3xl md:max-w-4xl'} max-h-[80vh] overflow-y-auto shadow-2xl`}>
            <div className="p-6 md:p-10">
              <div className="flex justify-between items-start mb-6 md:mb-8">
                <div className="flex items-center space-x-3 md:space-x-4">
                  <div className={`p-3 md:p-4 bg-gradient-to-r ${selectedProblem.gradient} rounded-xl text-white shadow-lg`}>
                    {selectedProblem.icon}
                  </div>
                  <h3 className="text-2xl md:text-4xl font-bold text-green-800">{selectedProblem.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedProblem(null)}
                  className="text-green-600 hover:text-green-800 text-3xl md:text-4xl font-light w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full hover:bg-green-100/30 transition-all cursor-pointer"
                >
                  ×
                </button>
              </div>

              <div className="prose prose-sm md:prose-lg max-w-none mb-6 md:mb-8">
                <p className="text-green-700/90 leading-relaxed text-base md:text-xl">
                  {selectedProblem.details}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 md:gap-4 mb-6 md:mb-8">
                {selectedProblem.tags.map((tag, index) => (
                  <span
                    key={index}
                    className={`px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r ${selectedProblem.gradient} text-white rounded-full font-bold text-sm md:text-base shadow-lg`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-3 md:gap-4">
                <button
                  onClick={() => setSelectedProblem(null)}
                  className="flex-1 bg-green-100/50 border-2 border-green-300/50 text-green-700 py-3 md:py-4 rounded-xl font-bold text-base md:text-lg hover:bg-green-200/50 transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }
        @keyframes floatLeaf {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
      `}</style>
</div>
);
}
