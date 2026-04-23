import React, { useState, useCallback, useMemo } from 'react';
import { motion /* eslint-disable-line no-unused-vars */ , AnimatePresence } from 'framer-motion';
import { Printer, CheckCircle2 } from 'lucide-react';
import canvasConfetti from 'canvas-confetti';

const candidates = [
    { id: 1, name: "Unity Party", symbol: "🤝", color: "#818cf8" },
    { id: 2, name: "Progress Alliance", symbol: "🚀", color: "#fb7185" },
    { id: 3, name: "Eco Vision", symbol: "🌿", color: "#4ade80" },
    { id: 4, name: "Independent", symbol: "👤", color: "#94a3b8" }
];

const EVMSandbox = React.memo(({ onVote, isConfirmedGlobal }) => {
    const [selected, setSelected] = useState(null);
    const [isCasting, setIsCasting] = useState(false);
    const [isConfirmedInternal, setIsConfirmedInternal] = useState(false);

    const isConfirmed = useMemo(() => isConfirmedInternal || isConfirmedGlobal, [isConfirmedInternal, isConfirmedGlobal]);

    const handleVote = useCallback(() => {
        if (!selected) return;
        setIsCasting(true);
        setTimeout(() => {
            setIsCasting(false);
            setIsConfirmedInternal(true);
            onVote(selected.name); // Send vote to App state
            canvasConfetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#818cf8', '#fb7185', '#4ade80']
            });
        }, 2000);
    }, [selected, onVote]);

    return (
        <div className="glass-card" role="region" aria-labelledby="evm-title" style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', gap: '2rem', padding: '2rem' }}>
            <h3 id="evm-title" className="sr-only">Electronic Voting Machine Simulator</h3>
            {/* Mock EVM Unit */}
            <div style={{ flex: 1.2, background: '#1e293b', borderRadius: '20px', padding: '2rem', border: '4px solid #334155' }}>
                <div aria-live="polite" role="status" style={{ background: '#0f172a', padding: '1rem', borderRadius: '8px', marginBottom: '2rem', border: '2px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: '800', color: isConfirmed ? '#94a3b8' : '#4ade80' }}>
                        {isConfirmed ? "VOTE RECORDED" : "READY TO VOTE"}
                    </span>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: isConfirmed ? '#1e293b' : '#4ade80', boxShadow: isConfirmed ? 'none' : '0 0 10px #4ade80' }}></div>
                </div>

                <div role="list" aria-label="Candidates List" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {candidates.map(c => (
                        <div key={c.id} role="listitem" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', background: '#334155', padding: '1rem', borderRadius: '12px' }}>
                            <span style={{ width: '30px', fontWeight: '900', color: '#94a3b8' }}>{c.id}</span>
                            <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#0f172a', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.5rem' }}>{c.symbol}</div>
                            <span style={{ flex: 1, fontWeight: '700', color: 'white' }}>{c.name}</span>
                            <button
                                aria-label={`Select candidate ${c.name}`}
                                onClick={() => !isConfirmed && setSelected(c)}
                                disabled={isConfirmed}
                                style={{
                                    width: '50px', height: '50px', borderRadius: '50%',
                                    background: selected?.id === c.id ? '#4ade80' : '#1e293b',
                                    border: '3px solid #0f172a',
                                    boxShadow: selected?.id === c.id ? '0 0 15px #4ade80' : 'none',
                                    transition: '0.2s',
                                    opacity: isConfirmed ? 0.3 : 1
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Control & VVPAT Panel */}
            <div style={{ flex: 0.8, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="glass" style={{ padding: '1.5rem', borderRadius: '20px', flex: 1 }}>
                    <h5 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem', fontSize: '1.1rem', color: 'white' }}>
                        <Printer size={18} /> VVPAT Slip Preview
                    </h5>
                    <div style={{ height: '300px', background: 'white', borderRadius: '8px', position: 'relative', overflow: 'hidden', padding: '2rem', color: '#0f172a', textAlign: 'center' }}>
                        <div style={{ border: '2px dashed #e2e8f0', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            {selected ? (
                                <motion.div initial={{ y: -100 }} animate={{ y: 0 }} key={selected.id}>
                                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{selected.symbol}</div>
                                    <div style={{ fontWeight: '900', fontSize: '1.25rem' }}>{selected.name}</div>
                                    <div style={{ fontSize: '0.75rem', marginTop: '1rem', color: '#64748b' }}>TRANSACTION VERIFIED</div>
                                </motion.div>
                            ) : (
                                <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Waiting for selection...</span>
                            )}
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleVote}
                    disabled={!selected || isConfirmed || isCasting}
                    className={isConfirmed ? "glass" : "btn-primary"}
                    style={{ padding: '1.5rem', borderRadius: '16px', fontSize: '1.25rem', opacity: (!selected || isCasting) && !isConfirmed ? 0.5 : 1 }}
                >
                    {isConfirmed ? (
                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#4ade80' }}>
                            <CheckCircle2 /> Vote Recorded
                        </span>
                    ) : isCasting ? "Processing..." : "Cast Final Vote"}
                </button>
            </div>
        </div>
    );
});

export default EVMSandbox;
