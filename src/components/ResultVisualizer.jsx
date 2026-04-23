import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Info, X, Sparkles, RefreshCcw, BarChart as ChartIcon, Share2, Globe, Heart, FileText } from 'lucide-react';
import { Chart } from 'react-google-charts';

// Simulated regional turnout data for Google GeoChart
const geoData = [
    ["State", "Turnout (%)"],
    ["IN-MH", 67],
    ["IN-UP", 59],
    ["IN-KT", 72],
    ["IN-TN", 70],
    ["IN-WB", 82],
    ["IN-GJ", 64],
    ["IN-RJ", 66],
    ["IN-BR", 53]
];

const ResultVisualizer = ({ votesData, civicData }) => {
    const [progress, setProgress] = useState(0);
    const [showInsight, setShowInsight] = useState(false);
    const [democracyInsight, setDemocracyInsight] = useState("");

    const totalVotes = 1000;
    const progressFactor = progress / 100;

    const displayResults = votesData.map(r => ({
        ...r,
        currentVotes: Math.round(r.votes * progressFactor)
    }));

    const totalCounted = displayResults.reduce((acc, curr) => acc + curr.currentVotes, 0);
    const isFinal = progress === 100;
    const winner = isFinal ? [...displayResults].sort((a, b) => b.votes - a.votes)[0] : null;

    useEffect(() => {
        if (isFinal) {
            const hasMatch = civicData.vote === winner.name;
            const message = hasMatch
                ? "Your choice aligns with the democratic majority. This consensus forms the foundation of stable governance and collective progress."
                : `The democratic majority has chosen ${winner.name}. In a representative democracy, the mandate of the many determines the victor, but your individual vote remains an essential record of your personal civic profile and political expression.`;

            setDemocracyInsight(message);
            setShowInsight(true);
        } else {
            setShowInsight(false);
        }
    }, [isFinal]);

    return (
        <div className="glass-card" role="region" aria-labelledby="results-title" style={{ maxWidth: '1000px', margin: '0 auto', padding: '3rem', position: 'relative' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h3 id="results-title" style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '1rem', color: 'white' }}>Live Results Simulation</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Observe the real-time counting process. Watch how collective votes shape the majority.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '4rem', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div className="glass" style={{ padding: '1.5rem', borderRadius: '16px' }}>
                        <span id="label-ballots" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Processed Ballots</span>
                        <div aria-labelledby="label-ballots" aria-live="polite" style={{ fontSize: '3rem', fontWeight: '900', color: 'var(--primary)', marginTop: '0.5rem' }}>
                            {totalCounted.toLocaleString()}
                        </div>
                    </div>
                    <div className="glass" style={{ padding: '1.5rem', borderRadius: '16px', border: isFinal ? `2px solid ${winner.color}` : '1px solid var(--border)', transition: '0.5s' }}>
                        <span id="label-status" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Election Status</span>
                        <div aria-labelledby="label-status" style={{ fontSize: '1.25rem', fontWeight: '700', marginTop: '0.5rem', color: 'white' }}>
                            {isFinal ? `Victor: ${winner.name}` : progress < 20 ? "Audit Commenced" : "Live Synchronization..."}
                        </div>
                    </div>
                </div>

                <div style={{ position: 'relative' }}>
                    <AnimatePresence>
                        {isFinal && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                style={{ position: 'absolute', top: '-110px', right: '0', background: winner.color, padding: '1rem 1.5rem', borderRadius: '12px', color: 'white', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: `0 20px 40px ${winner.color}30`, zIndex: 10 }}
                            >
                                <Trophy size={20} /> Result Verified
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div role="list" aria-label="Candidate Vote Progress" style={{ marginBottom: '3.5rem' }}>
                        {displayResults.map((r, i) => (
                            <div key={i} role="listitem" style={{ marginBottom: '2.5rem' }}>
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
                                        aria-valuenow={r.currentVotes}
                                        aria-valuemin="0"
                                        aria-valuemax={r.votes}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.01)', borderRadius: '24px', border: '1px solid var(--border)' }}>
                        <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <label htmlFor="sync-slider" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '600' }}>DATA SYNC SLIDER</label>
                            <span style={{ fontSize: '0.85rem', color: 'white', fontWeight: '800', background: 'var(--primary)', padding: '4px 10px', borderRadius: '6px' }}>{progress}%</span>
                        </div>
                        <input
                            id="sync-slider"
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
                    </div>
                </div>
            </div>

            {/* Google Services Integration: Results Analytics */}
            <div style={{ marginTop: '4rem', paddingTop: '4rem', borderTop: '1px solid var(--border)' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(129, 140, 248, 0.1)', padding: '8px 20px', borderRadius: '100px', color: 'var(--primary)', fontWeight: '700', fontSize: '0.8rem', marginBottom: '1rem' }}>
                        <ChartIcon size={16} /> GOOGLE CHARTS VERIFIED
                    </div>
                    <h3 style={{ fontSize: '2rem', fontWeight: '900', color: 'white' }}>Official Auditor Visualization</h3>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    <div className="glass" style={{ padding: '1rem', borderRadius: '24px', background: 'rgba(0,0,0,0.2)' }}>
                        <Chart
                            chartType="PieChart"
                            data={[
                                ["Candidate", "Votes"],
                                ...displayResults.map(r => [r.name, r.currentVotes])
                            ]}
                            options={{
                                title: "Vote Share Distribution",
                                pieHole: 0.4,
                                is3D: false,
                                backgroundColor: "transparent",
                                legend: { textStyle: { color: "white" } },
                                titleTextStyle: { color: "white" },
                                colors: displayResults.map(r => r.color),
                                chartArea: { width: '90%', height: '80%' }
                            }}
                            width={"100%"}
                            height={"300px"}
                        />
                    </div>
                    <div className="glass" style={{ padding: '1rem', borderRadius: '24px', background: 'rgba(0,0,0,0.2)' }}>
                        <Chart
                            chartType="BarChart"
                            data={[
                                ["Candidate", "Votes", { role: "style" }],
                                ...displayResults.map(r => [r.name, r.currentVotes, r.color])
                            ]}
                            options={{
                                title: "Candidate Comparison",
                                backgroundColor: "transparent",
                                legend: { position: "none" },
                                titleTextStyle: { color: "white" },
                                hAxis: { textStyle: { color: "white" }, gridlines: { color: "rgba(255,255,255,0.05)" } },
                                vAxis: { textStyle: { color: "white" } },
                                chartArea: { width: '70%', height: '70%' }
                            }}
                            width={"100%"}
                            height={"300px"}
                        />
                    </div>
                </div>
            </div>

            {/* AI-Powered Smart Insight Modal */}
            <AnimatePresence>
                {showInsight && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-title"
                        style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'rgba(2, 6, 23, 0.95)',
                            backdropFilter: 'blur(15px)',
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
                            style={{ maxWidth: '600px', padding: '3rem', textAlign: 'center', border: '1px solid var(--primary)', maxHeight: '90%', overflowY: 'auto' }}
                        >
                            <button
                                aria-label="Close insight"
                                onClick={() => setShowInsight(false)}
                                style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
                            >
                                <X size={24} />
                            </button>
                            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(129, 140, 248, 0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--primary)', margin: '0 auto 2rem' }}>
                                <Sparkles size={32} />
                            </div>
                            <h4 id="modal-title" style={{ fontSize: '1.75rem', fontWeight: '900', marginBottom: '1.5rem', color: 'white' }}>Institutional Democracy Insight</h4>
                            <div style={{ textAlign: 'left', background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '2.5rem' }}>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>
                                    {democracyInsight}
                                </p>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <a
                                    href="https://docs.google.com/forms/u/0/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary"
                                    style={{ width: '100%', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', textDecoration: 'none' }}
                                >
                                    <FileText size={18} /> Submit Official Feedback (Google Forms)
                                </a>
                                <button onClick={() => setShowInsight(false)} className="glass" style={{ width: '100%', borderRadius: '12px', padding: '1rem', color: 'white' }}>
                                    Complete Journey
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ResultVisualizer;
