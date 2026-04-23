import React, { useState } from 'react';
import { motion /* eslint-disable-line no-unused-vars */ , AnimatePresence } from 'framer-motion';
import { ThumbsUp, ThumbsDown, Info, Zap, Scale } from 'lucide-react';
import { calculatePolicyMatch } from '../utils/electoralLogic';

const policies = [
    { id: 'infra', title: "Infrastructure", question: "Should we prioritize high-speed rail over local road repairs?" },
    { id: 'edu', title: "Education", question: "Increase funding for digital literacy programs in primary schools?" },
    { id: 'health', title: "Healthcare", question: "Transition to a fully digital, centralized health record system?" },
    { id: 'env', title: "Environment", question: "Implement strict carbon taxes on heavy industrial manufacturing?" }
];

const candidates = [
    {
        name: "Candidate A",
        stance: { infra: true, edu: true, health: false, env: true },
        motto: "The Future is Digital"
    },
    {
        name: "Candidate B",
        stance: { infra: false, edu: false, health: true, env: false },
        motto: "Back to the Basics"
    }
];

const PolicyMatcher = ({ onMatchChange }) => {
    const [currentIdx, setCurrentIdx] = useState(0);
    const [userStance, setUserStance] = useState({});
    const [matches, setMatches] = useState(null);

    const handleVote = (value) => {
        const newStances = { ...userStance, [policies[currentIdx].id]: value };
        setUserStance(newStances);

        if (currentIdx < policies.length - 1) {
            setCurrentIdx(currentIdx + 1);
        } else {
            const results = calculatePolicyMatch(newStances, candidates, policies);
            setMatches(results);
            if (onMatchChange) onMatchChange(results[0].percentage);
        }
    };

    return (
        <div className="glass-card" role="region" aria-labelledby="matcher-title" style={{ maxWidth: '800px', margin: '0 auto', minHeight: '500px' }}>
            <div style={{ padding: '2rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 id="matcher-title" style={{ fontSize: '1.5rem', fontWeight: '800' }}>Policy Matcher Sandbox</h3>
                <span role="status" aria-label="Progress" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{matches ? "Final Analysis" : `Topic ${currentIdx + 1} of ${policies.length}`}</span>
            </div>

            <div style={{ padding: '3rem' }}>
                <AnimatePresence mode="wait">
                    {!matches ? (
                        <motion.div
                            key={currentIdx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            style={{ textAlign: 'center' }}
                        >
                            <div style={{ color: 'var(--primary)', marginBottom: '1rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem' }}>
                                {policies[currentIdx].title}
                            </div>
                            <h4 style={{ fontSize: '2rem', marginBottom: '3rem', fontWeight: '800', lineHeight: '1.3' }}>{policies[currentIdx].question}</h4>

                            <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
                                <button
                                    onClick={() => handleVote(true)}
                                    style={{
                                        width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(74, 222, 128, 0.1)',
                                        border: '1px solid #4ade80', display: 'flex', flexDirection: 'column', justifyContent: 'center',
                                        alignItems: 'center', gap: '8px', color: '#4ade80'
                                    }}
                                >
                                    <ThumbsUp size={32} />
                                    <span>Support</span>
                                </button>
                                <button
                                    onClick={() => handleVote(false)}
                                    style={{
                                        width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(251, 113, 133, 0.1)',
                                        border: '1px solid #fb7185', display: 'flex', flexDirection: 'column', justifyContent: 'center',
                                        alignItems: 'center', gap: '8px', color: '#fb7185'
                                    }}
                                >
                                    <ThumbsDown size={32} />
                                    <span>Oppose</span>
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} role="list" aria-label="Candidate match results">
                            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                                <h4 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Match Results</h4>
                                <p style={{ color: 'var(--text-secondary)' }}>Based on your value choices, here is how you align with the sample candidates.</p>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                                {matches.map((m, i) => (
                                    <div key={i} className="glass" role="listitem" style={{ padding: '2rem', borderRadius: '24px', border: i === 0 ? '1px solid var(--primary)' : '1px solid var(--border)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                            <h5 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'white' }}>{m.name}</h5>
                                            <span style={{ fontSize: '1.5rem', fontWeight: '900', color: i === 0 ? 'var(--primary)' : 'white' }}>{m.percentage}%</span>
                                        </div>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontStyle: 'italic', marginBottom: '1.5rem' }}>"{m.motto}"</p>
                                        <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden' }}>
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${m.percentage}%` }}
                                                transition={{ duration: 1, delay: 0.5 }}
                                                style={{ height: '100%', background: i === 0 ? 'var(--primary)' : 'var(--text-secondary)' }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => { setMatches(null); setCurrentIdx(0); setUserStance({}); }}
                                className="btn-primary"
                                style={{ marginTop: '3rem', width: '100%', borderRadius: '14px' }}
                            >
                                Reset Comparison
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default PolicyMatcher;
