import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Trophy, Info, X, BarChart as ChartIcon, Share2, Heart, FileText } from 'lucide-react';
import { Chart } from 'react-google-charts';

const geoData = [
    ['State', 'Turnout Percentage'],
    ['IN-MH', 72],
    ['IN-KA', 65],
    ['IN-UP', 81],
    ['IN-GJ', 68],
    ['IN-TN', 75],
    ['IN-WB', 79],
    ['IN-DL', 60]
];

const ResultVisualizer = ({ votesData, civicData }) => {
    const [progress, setProgress] = React.useState(0);
    const [userClosed, setUserClosed] = useState(false);

    const displayResults = React.useMemo(() => {
        return votesData.map(r => ({
            ...r,
            currentVotes: Math.floor((progress / 100) * r.votes)
        }));
    }, [progress, votesData]);

    const totalCounted = React.useMemo(() => {
        return displayResults.reduce((acc, curr) => acc + curr.currentVotes, 0);
    }, [displayResults]);

    const isFinal = progress === 100;

    const winner = React.useMemo(() => {
        return isFinal ? [...displayResults].sort((a, b) => b.votes - a.votes)[0] : null;
    }, [isFinal, displayResults]);

    const showInsight = isFinal && winner !== null && !userClosed;


    return (
        <div className="glass-card" role="region" aria-labelledby="results-title" style={{ maxWidth: '1000px', margin: '0 auto', padding: '3rem', position: 'relative' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h3 id="results-title" style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '1rem', color: 'white' }}>Live Audit Dashboard</h3>
                <p style={{ color: 'var(--text-secondary)' }}>An institutional view of the democratic mandate taking shape in real-time.</p>
            </div>

            <div style={{ display: 'flex', gap: '3rem' }}>
                <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem' }}>
                        <div className="glass" style={{ padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--primary)', transition: '0.5s' }}>
                            <span id="label-ballots" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Ballots Counted</span>
                            <div aria-labelledby="label-ballots" aria-live="polite" style={{ fontSize: '3rem', fontWeight: '900', color: 'var(--primary)', marginTop: '0.5rem' }}>{totalCounted}</div>
                        </div>
                        <div className="glass" style={{ padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border)', transition: '0.5s' }}>
                            <span id="label-status" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Election Status</span>
                            <div aria-labelledby="label-status" aria-live="polite" style={{ fontSize: '1.25rem', fontWeight: '700', marginTop: '0.5rem', color: 'white' }}>
                                {isFinal ? <span style={{ color: '#4ade80', display: 'flex', alignItems: 'center', gap: '8px' }}><Trophy size={20} /> Verified Majority</span> : "Live Synchronization..."}
                            </div>
                        </div>
                    </div>

                    <div style={{ position: 'relative' }}>
                        {isFinal && (
                            <div   style={{ position: 'absolute', top: '-15px', right: '-15px', background: 'var(--primary)', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 10, boxShadow: '0 0 20px var(--primary-glow)' }}>
                                <Trophy size={20} color="white" />
                            </div>
                        )}
                        <div role="list" aria-label="Candidate Vote Progress" style={{ marginBottom: '3.5rem' }}>
                            {displayResults.map((r, i) => (
                                <div key={i} role="listitem" style={{ marginBottom: '2.5rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '1rem' }}>
                                        <span style={{ fontWeight: '700', color: 'white' }}>{r.name}</span>
                                        <span style={{ color: r.color, fontWeight: '900' }}>{r.currentVotes}</span>
                                    </div>
                                    <div style={{ height: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '100px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
                                        <div



                                            style={{ height: '100%', background: r.color, borderRadius: '100px' }}
                                            role="progressbar"
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
                                aria-label="Data Sync Slider"
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

                <div style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="glass" style={{ padding: '2rem', borderRadius: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem', color: 'white' }}>
                            <Info size={20} color="var(--primary)" />
                            <span style={{ fontWeight: '800' }}>Civic Profile Summary</span>
                        </div>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
                            <li style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Eligibility Status</div>
                                <div style={{ fontWeight: '700', color: civicData.eligibility === 'Eligible' ? '#4ade80' : 'white' }}>{civicData.eligibility}</div>
                            </li>
                            <li style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Policy Alignment</div>
                                <div style={{ fontWeight: '700', color: 'white' }}>{civicData.policyMatch}% Match</div>
                            </li>
                            <li style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Final Vote</div>
                                <div style={{ fontWeight: '700', color: 'var(--primary)' }}>{civicData.vote || "Abstained"}</div>
                            </li>
                        </ul>
                    </div>

                    <button
                        onClick={() => alert("Certificate Generation would trigger here.")}
                        className="glass"
                        style={{ padding: '1.5rem', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', color: 'white', fontWeight: '700', border: '1px solid var(--border)', cursor: 'pointer' }}
                    >
                        <Share2 size={18} /> Share Certificate
                    </button>
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

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem' }}>
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
                    <div className="glass" style={{ padding: '1rem', borderRadius: '24px', background: 'rgba(0,0,0,0.2)' }}>
                        <Chart
                            chartType="GeoChart"
                            data={geoData}
                            options={{
                                region: 'IN', // India
                                displayMode: 'regions',
                                resolution: 'provinces',
                                backgroundColor: 'transparent',
                                colorAxis: { colors: ['#4ade80', '#818cf8', '#fb7185'] },
                                datalessRegionColor: 'rgba(255,255,255,0.05)',
                                tooltip: { textStyle: { color: '#0f172a' } }
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
                    <div



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
                        <div


                            className="glass-card"
                            style={{ maxWidth: '600px', padding: '3rem', textAlign: 'center', border: '1px solid var(--primary)', maxHeight: '90%', overflowY: 'auto' }}
                        >
                            <button
                                aria-label="Close insight"
                                onClick={() => setUserClosed(true)}
                                style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
                            >
                                <X size={24} />
                            </button>
                            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(129, 140, 248, 0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--primary)', margin: '0 auto 2rem' }}>
                                <Heart size={32} />
                            </div>
                            <h4 id="modal-title" style={{ fontSize: '1.75rem', fontWeight: '900', marginBottom: '1.5rem', color: 'white' }}>Democracy Insight Engine</h4>
                            <div style={{ textAlign: 'left', background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '2.5rem' }}>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>
                                        {civicData.vote === winner?.name ? "Your choice aligns with the democratic majority. This consensus forms the foundation of stable governance and collective progress." : `The democratic majority has chosen ${winner?.name}. In a representative democracy, the mandate of the many determines the victor, but your individual vote remains an essential record of your personal civic profile and political expression.`}
                                    </p>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <a
                                    href="https://forms.google.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary"
                                    style={{ width: '100%', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', textDecoration: 'none' }}
                                >
                                    <FileText size={18} /> Submit Official Feedback (Google Forms)
                                </a>
                                <button aria-label="Complete journey and close insight" onClick={() => setUserClosed(true)} className="glass" style={{ width: '100%', borderRadius: '12px', padding: '1rem', color: 'white' }}>
                                    Complete Journey
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ResultVisualizer;
