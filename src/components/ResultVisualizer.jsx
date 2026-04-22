import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Info, X } from 'lucide-react';

const ResultVisualizer = ({ votesData }) => {
    const [progress, setProgress] = useState(0);
    const [showInsight, setShowInsight] = useState(false);

    const totalVotes = 1000;
    const progressFactor = progress / 100;

    // Calculate display results based on slider progress
    const displayResults = votesData.map(r => ({
        ...r,
        currentVotes: Math.round(r.votes * progressFactor)
    }));

    const totalCounted = displayResults.reduce((acc, curr) => acc + curr.currentVotes, 0);
    const isFinal = progress === 100;

    // Determine winner at 100%
    const winner = isFinal ? [...displayResults].sort((a, b) => b.votes - a.votes)[0] : null;

    React.useEffect(() => {
        if (isFinal) {
            const timer = setTimeout(() => setShowInsight(true), 1500);
            return () => clearTimeout(timer);
        } else {
            setShowInsight(false);
        }
    }, [isFinal]);

    return (
        <div className="glass-card" style={{ maxWidth: '1000px', margin: '0 auto', padding: '3rem', position: 'relative' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h3 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '1rem', color: 'white' }}>Live Results Simulation</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Observe the real-time counting process. Watch how collective votes shape the majority.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '4rem', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div className="glass" style={{ padding: '1.5rem', borderRadius: '16px' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Processed Ballots</span>
                        <div style={{ fontSize: '3rem', fontWeight: '900', color: 'var(--primary)', marginTop: '0.5rem' }}>{totalCounted.toLocaleString()}</div>
                    </div>
                    <div className="glass" style={{ padding: '1.5rem', borderRadius: '16px', border: isFinal ? `2px solid ${winner.color}` : '1px solid var(--border)', transition: '0.5s' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Election Status</span>
                        <div style={{ fontSize: '1.25rem', fontWeight: '700', marginTop: '0.5rem', color: 'white' }}>
                            {isFinal ? `Victor: ${winner.name}` : progress < 20 ? "Audit Commenced" : "Live Synchronization..."}
                        </div>
                    </div>
                </div>

                <div style={{ position: 'relative' }}>
                    <AnimatePresence>
                        {isFinal && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                style={{ position: 'absolute', top: '-110px', right: '0', background: winner.color, padding: '1rem 1.5rem', borderRadius: '12px', color: 'white', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: `0 20px 40px ${winner.color}30`, zIndex: 10 }}
                            >
                                <Trophy size={20} /> Result Verified
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div style={{ marginBottom: '3.5rem' }}>
                        {displayResults.map((r, i) => (
                            <div key={i} style={{ marginBottom: '2.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '1rem' }}>
                                    <span style={{ fontWeight: '700', color: 'white' }}>{r.name}</span>
                                    <span style={{ color: r.color, fontWeight: '900' }}>{r.currentVotes.toLocaleString()}</span>
                                </div>
                                <div style={{ height: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '100px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${((r.votes / totalVotes) * 100) * progressFactor}%` }}
                                        transition={{ duration: 0.1, ease: "linear" }}
                                        style={{ height: '100%', background: r.color, borderRadius: '100px' }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.01)', borderRadius: '24px', border: '1px solid var(--border)' }}>
                        <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '600' }}>DATA SYNC SLIDER</span>
                            <span style={{ fontSize: '0.85rem', color: 'white', fontWeight: '800', background: 'var(--primary)', padding: '4px 10px', borderRadius: '6px' }}>{progress}%</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={progress}
                            onChange={(e) => setProgress(parseInt(e.target.value))}
                            style={{
                                width: '100%',
                                cursor: 'grabbing',
                                appearance: 'none',
                                height: '8px',
                                background: 'rgba(255,255,255,0.1)',
                                borderRadius: '10px'
                            }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem', fontSize: '0.75rem', color: 'var(--text-secondary)', opacity: 0.7 }}>
                            <span>INITIAL STATE</span>
                            <span>FINAL COUNT</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Electoral Insight Modal */}
            <AnimatePresence>
                {showInsight && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'rgba(2, 6, 23, 0.9)',
                            backdropFilter: 'blur(10px)',
                            zIndex: 100,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '2rem',
                            borderRadius: '24px'
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="glass-card"
                            style={{ maxWidth: '500px', padding: '3rem', textAlign: 'center', border: '1px solid var(--primary)' }}
                        >
                            <button
                                onClick={() => setShowInsight(false)}
                                style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
                            >
                                <X size={24} />
                            </button>
                            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(129, 140, 248, 0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--primary)', margin: '0 auto 2rem' }}>
                                <Info size={32} />
                            </div>
                            <h4 style={{ fontSize: '1.75rem', fontWeight: '900', marginBottom: '1.5rem', color: 'white' }}>Constituency Realism</h4>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '2rem' }}>
                                You might notice that even if you voted for a different party, the <strong>Unity Party</strong> still won this simulation.
                            </p>
                            <p style={{ color: 'white', fontSize: '1.05rem', fontWeight: '600', marginBottom: '2.5rem' }}>
                                This is because election results represent the <strong>Collective Voice</strong> of thousands. Your vote is a crucial contribution, but the final outcome is decided by the majority of the entire constituency.
                            </p>
                            <button onClick={() => setShowInsight(false)} className="btn-primary" style={{ width: '100%', borderRadius: '12px' }}>
                                I Understand
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ResultVisualizer;
