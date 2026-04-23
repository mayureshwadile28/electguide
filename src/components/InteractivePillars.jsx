import React from 'react';
import { motion /* eslint-disable-line no-unused-vars */  } from 'framer-motion';
import { ShieldCheck, Calendar, Users, ArrowRight } from 'lucide-react';

const pillars = [
    {
        icon: <ShieldCheck size={40} />,
        title: "1. Fair Rules",
        color: "#818cf8",
        desc: "Strict rules (Model Code of Conduct) ensure no party uses unfair power to win. Everyone plays on a level field."
    },
    {
        icon: <Calendar size={40} />,
        title: "2. Your Time",
        color: "#fb7185",
        desc: "Every step has a deadline. This ensures transparency and gives every citizen enough time to decide."
    },
    {
        icon: <Users size={40} />,
        title: "3. Your Voice",
        color: "#22d3ee",
        desc: "Secret ballots mean your choice is yours alone. No one knows who you voted for, protecting your freedom."
    }
];

const InteractivePillars = () => {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
            {pillars.map((pillar, i) => (
                <motion.div
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    className="glass-card"
                    style={{
                        padding: '3.5rem',
                        position: 'relative',
                        overflow: 'hidden',
                        border: `1px solid ${pillar.color}20`,
                        textAlign: 'center'
                    }}
                >
                    <motion.div
                        initial={{ scale: 0.8 }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        style={{
                            color: pillar.color,
                            marginBottom: '2.5rem',
                            display: 'inline-flex',
                            background: `${pillar.color}15`,
                            width: '80px',
                            height: '80px',
                            borderRadius: '24px',
                            justifyContent: 'center',
                            alignItems: 'center',
                            boxShadow: `0 10px 40px ${pillar.color}20`
                        }}
                    >
                        {pillar.icon}
                    </motion.div>
                    <h3 style={{ fontSize: '2rem', marginBottom: '1.25rem', fontWeight: '800' }}>{pillar.title}</h3>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1.1rem' }}>{pillar.desc}</p>

                    <div style={{
                        position: 'absolute',
                        bottom: '0',
                        left: '0',
                        height: '4px',
                        background: `linear-gradient(90deg, ${pillar.color}, transparent)`,
                        width: '100%'
                    }}></div>
                </motion.div>
            ))}
        </div>
    );
};

export default InteractivePillars;
