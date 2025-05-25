import { useState, useEffect } from 'react';
import { Calendar, Lock } from 'lucide-react';

export default function Timeline({ isMobile }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const timelineData = [
    {
      title: "Problem Statement Announcement",
      date: new Date("2025-05-28T00:00:00"),
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
        <div className={`relative p-6 rounded-2xl shadow-lg transition-all duration-300 ${locked ? 'bg-white/30 backdrop-blur-sm border-2 border-green-200/30' : 'bg-white/50 backdrop-blur-md border-2 border-green-300/50'}`}>
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
  );
}