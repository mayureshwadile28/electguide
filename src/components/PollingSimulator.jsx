import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import { Briefcase, XCircle, CheckCircle, Smartphone, Camera, GraduationCap, Coffee, RefreshCcw } from 'lucide-react';

const items = [
    { id: 'voter-id', name: 'Voter ID Card', icon: <CheckCircle />, legal: true, desc: "Essential for identity verification." },
    { id: 'selfie-stick', name: 'Selfie Stick', icon: <Camera />, legal: false, desc: "Prohibited to protect voting privacy." },
    { id: 'camp-cap', name: 'Campaign Cap', icon: <GraduationCap />, legal: false, desc: "No political symbols allowed in the booth." },
    { id: 'water', name: 'Water Bottle', icon: <Coffee />, legal: true, desc: "Allowed for personal comfort." }
];

function DraggableItem({ item, isUsed }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: item.id,
        disabled: isUsed
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 10
    } : undefined;

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className={`glass ${isUsed ? 'opacity-30' : 'cursor-grab active:cursor-grabbing'}`}
            style={{
                ...style,
                padding: '1rem',
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                width: '120px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--border)',
                opacity: isUsed ? 0.3 : 1
            }}
        >
            <div style={{ color: 'var(--primary)' }}>{item.icon}</div>
            <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'white' }}>{item.name}</span>
        </div>
    );
}

const PollingSimulator = () => {
    const [pocket, setPocket] = useState([]);
    const [checked, setChecked] = useState(false);
    const [feedback, setFeedback] = useState([]);

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (over && over.id === 'pocket') {
            const item = items.find(i => i.id === active.id);
            if (!pocket.find(p => p.id === item.id)) {
                setPocket([...pocket, item]);
                setChecked(false);
            }
        }
    };

    const verifyGear = () => {
        const results = pocket.map(p => ({
            ...p,
            status: p.legal ? 'success' : 'error'
        }));
        setFeedback(results);
        setChecked(true);
    };

    const reset = () => {
        setPocket([]);
        setChecked(false);
        setFeedback([]);
    };

    return (
        <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h3 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '1rem', color: 'white' }}>Pack For Election Day</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Drag the items into your pocket, then check if they are legal!</p>
            </div>

            <DndContext onDragEnd={handleDragEnd}>
                <div style={{ display: 'flex', gap: '4rem', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        {items.map(item => (
                            <DraggableItem key={item.id} item={item} isUsed={pocket.some(p => p.id === item.id)} />
                        ))}
                    </div>

                    <div style={{ width: '300px', textAlign: 'center' }}>
                        <DroppableZone pocket={pocket} />
                        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                            <button
                                onClick={verifyGear}
                                disabled={pocket.length === 0 || checked}
                                className="btn-primary"
                                style={{ flex: 1, borderRadius: '12px', opacity: (pocket.length === 0 || checked) ? 0.5 : 1 }}
                            >
                                Verify My Gear
                            </button>
                            <button onClick={reset} className="glass" style={{ padding: '0 1rem', borderRadius: '12px', border: '1px solid var(--border)', color: 'white' }}>
                                <RefreshCcw size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </DndContext>

            <AnimatePresence>
                {checked && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}
                    >
                        {feedback.map(f => (
                            <div key={f.id} className="glass" style={{ padding: '1.25rem', borderRadius: '16px', border: `1px solid ${f.status === 'success' ? '#4ade80' : '#fb7185'}`, display: 'flex', alignItems: 'center', gap: '12px' }}>
                                {f.status === 'success' ? <CheckCircle color="#4ade80" /> : <XCircle color="#fb7185" />}
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: '700', color: 'white' }}>{f.name}: {f.status === 'success' ? 'Legal' : 'Illegal'}</div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{f.desc}</div>
                                </div>
                                {f.status === 'error' && (
                                    <button onClick={reset} style={{ background: 'none', border: 'none', color: '#fb7185', fontSize: '0.8rem', fontWeight: '700', cursor: 'pointer' }}>Retry</button>
                                )}
                            </div>
                        ))}

                        <button onClick={reset} className="glass" style={{ marginTop: '1rem', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border)', color: 'white', fontWeight: '700' }}>
                            Reset and Try Again
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

function DroppableZone({ pocket }) {
    const { setNodeRef, isOver } = useDroppable({ id: 'pocket' });

    return (
        <div
            ref={setNodeRef}
            style={{
                height: '300px',
                borderRadius: '30px',
                border: '3px dashed var(--border)',
                background: isOver ? 'rgba(129, 140, 248, 0.1)' : 'rgba(255,255,255,0.02)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '2rem',
                transition: '0.3s'
            }}
        >
            <div style={{ marginBottom: '1rem', color: isOver ? 'var(--primary)' : 'var(--text-secondary)' }}>
                <Briefcase size={60} strokeWidth={1} />
            </div>
            <h5 style={{ marginBottom: '1rem', fontWeight: '800', color: 'white' }}>Your Pocket</h5>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center' }}>
                {pocket.map(p => (
                    <div key={p.id} className="primary-gradient" style={{ padding: '4px 10px', borderRadius: '100px', fontSize: '0.7rem', fontWeight: '700', color: 'white' }}>
                        {p.name}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PollingSimulator;
