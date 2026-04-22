import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { UserPlus, Megaphone, Calendar, Landmark, CheckCircle, Search, ClipboardCheck } from 'lucide-react';

const timelineData = [
  {
    title: "Voter Registration",
    desc: "The journey begins here. Citizens register to ensure their voice is heard in the upcoming decision.",
    icon: <UserPlus size={24} />,
    item: "Registration Form"
  },
  {
    title: "Nomination Phase",
    desc: "Candidates step forward. They define their vision and promise to serve the community's interests.",
    icon: <ClipboardCheck size={24} />,
    item: "Candidate Entry"
  },
  {
    title: "Campaign Period",
    desc: "Voices fill the air. Candidates share their ideas, and voters study the policies that matter most.",
    icon: <Megaphone size={24} />,
    item: "Public Outreach"
  },
  {
    title: "The Polling Day",
    desc: "The moment of truth. Every citizen visits the booth to cast their secret and powerful vote.",
    icon: <Calendar size={24} />,
    item: "Action Day"
  },
  {
    title: "Counting & Results",
    desc: "Transparency in action. Votes are audited and counted to reveal the collective choice of the nation.",
    icon: <Search size={24} />,
    item: "Verification"
  },
  {
    title: "Government Formation",
    desc: "Power returns to the people. The chosen leaders take oath to protect the democracy.",
    icon: <Landmark size={24} />,
    item: "New Leadership"
  }
];

const Timeline = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div ref={containerRef} style={{ position: 'relative', padding: '100px 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '120px' }}>
        <h2 style={{ fontSize: '3.5rem', fontWeight: '900', marginBottom: '1.5rem', color: 'white' }}>Path of Power</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
          Follow the step-by-step lifecycle of how a democracy breathes and evolves.
        </p>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative' }}>
        {/* Animated Line */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '0',
          bottom: '0',
          width: '4px',
          background: 'rgba(255,255,255,0.05)',
          transform: 'translateX(-50%)',
          borderRadius: '10px'
        }}>
          <motion.div
            style={{
              scaleY,
              background: 'linear-gradient(to bottom, #818cf8, #fb7185, #22d3ee)',
              width: '100%',
              height: '100%',
              originY: '0',
              boxShadow: '0 0 20px rgba(129, 140, 248, 0.4)'
            }}
          />
        </div>

        {/* Path Elements */}
        {timelineData.map((step, index) => (
          <TimelineItem key={index} step={step} index={index} />
        ))}
      </div>
    </div>
  );
};

const TimelineItem = ({ step, index }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{
        display: 'flex',
        justifyContent: isEven ? 'flex-start' : 'flex-end',
        marginBottom: '180px',
        position: 'relative',
        width: '100%'
      }}
    >
      <div style={{
        width: '45%',
        position: 'relative',
      }}>
        <div className="glass-card" style={{
          padding: '2.5rem',
          borderRadius: '32px',
          border: '1px solid rgba(255,255,255,0.05)',
          background: 'rgba(255,255,255,0.02)',
          textAlign: isEven ? 'right' : 'left'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: isEven ? 'flex-end' : 'flex-start',
            marginBottom: '1.5rem'
          }}>
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              style={{
                width: '60px',
                height: '60px',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '16px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'var(--primary)',
                border: '1px solid var(--border)'
              }}
            >
              {step.icon}
            </motion.div>
          </div>
          <h3 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '1rem', color: 'white' }}>{step.title}</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '1.05rem' }}>{step.desc}</p>
        </div>
      </div>

      {/* Center Dot with Logo Animation placeholder logic */}
      <div style={{
        position: 'absolute',
        left: '50%',
        top: '20px',
        transform: 'translateX(-50%)',
        zIndex: 10
      }}>
        <motion.div
          whileInView={{ scale: [0, 1.2, 1] }}
          viewport={{ once: false, amount: 0.5 }}
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            background: 'var(--primary)',
            border: '4px solid #020617',
            boxShadow: '0 0 15px var(--primary-glow)'
          }}
        />
      </div>
    </motion.div>
  );
};

export default Timeline;
