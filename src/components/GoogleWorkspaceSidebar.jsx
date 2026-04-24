import React from 'react';
import { Mail, Calendar, MessageSquare, ClipboardList, Info, HelpCircle } from 'lucide-react';
/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';

const GoogleWorkspaceSidebar = () => {
    const services = [
        {
            name: "Election Roadmap",
            icon: <ClipboardList size={20} />,
            desc: "Official Task List (Google Forms)",
            link: "https://docs.google.com/forms/d/e/1FAIpQLSfD7f5f-f-f-f-f-f-f-f-f-f-f-f-f-f-f-f-f-f-f/viewform", // Simulation link
            color: "#4285F4"
        },
        {
            name: "Voting Schedule",
            icon: <Calendar size={20} />,
            desc: "Sync to Google Calendar",
            link: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Election+Day+2026&details=Your+democratic+journey+matters.",
            color: "#34A853"
        },
        {
            name: "Civic Support",
            icon: <MessageSquare size={20} />,
            desc: "Trigger Google Chat Agent",
            link: "#chat", // Handled by trigger
            color: "#FBBC05"
        },
        {
            name: "ECI Inbox",
            icon: <Mail size={20} />,
            desc: "Google Workspace Gmail Sync",
            link: "mailto:support@election.gov.in",
            color: "#EA4335"
        }
    ];

    return (
        <div style={{
            position: 'fixed',
            right: '2rem',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
        }}>
            {services.map((s, i) => (
                <motion.a
                    key={i}
                    href={s.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    whileHover={{ x: -10 }}
                    style={{
                        background: 'rgba(2, 6, 23, 0.8)',
                        backdropFilter: 'blur(10px)',
                        padding: '1rem',
                        borderRadius: '16px',
                        border: `1px solid ${s.color}40`,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        textDecoration: 'none',
                        color: 'white',
                        boxShadow: `0 10px 20px rgba(0,0,0,0.3)`,
                        width: '50px',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.width = '240px'}
                    onMouseLeave={(e) => e.currentTarget.style.width = '50px'}
                >
                    <div style={{ color: s.color, display: 'flex', flexShrink: 0 }}>{s.icon}</div>
                    <div style={{ opacity: 1 }}>
                        <div style={{ fontWeight: '700', fontSize: '0.85rem' }}>{s.name}</div>
                        <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>{s.desc}</div>
                    </div>
                </motion.a>
            ))}
        </div>
    );
};

export default GoogleWorkspaceSidebar;
