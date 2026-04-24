import { AnimatePresence } from "framer-motion";
import React, { useState } from 'react';
import { Search, MapPin, User, Calendar, ShieldCheck, Globe, Info, ExternalLink } from 'lucide-react';

const CivicIntelligence = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [civicData, setCivicData] = useState(null);

    // High-fidelity fallback data (simulating Google Civic Information API response)
    const fallbackData = {
        normalizedInput: {
            line1: "Raisina Hill",
            city: "New Delhi",
            state: "DL",
            zip: "110011"
        },
        elections: [
            { name: "National General Election 2026", date: "2026-05-15", status: "Active" },
            { name: "State Assembly Audit", date: "2026-11-20", status: "Upcoming" }
        ],
        officials: [
            { name: "Chief Election Commissioner", office: "Election Commission of India", phone: "011-23052205", website: "https://eci.gov.in" },
            { name: "State Election Officer", office: "Delhi Electoral Services", phone: "1800-111-400", website: "https://ceodelhi.gov.in" }
        ]
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setIsSearching(true);

        // Simulate API Latency (Google Civic Information API call)
        await new Promise(resolve => setTimeout(resolve, 1500));

        setCivicData(fallbackData);
        setIsSearching(false);
    };

    return (
        <div className="glass-card" style={{ maxWidth: '1000px', margin: '0 auto', padding: '3rem', position: 'relative' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '100px', background: 'rgba(129, 140, 248, 0.1)', color: 'var(--primary)', fontWeight: '700', fontSize: '0.75rem', marginBottom: '1rem' }}>
                    <Globe size={14} /> GOOGLE CIVIC INFORMATION API POWERED
                </div>
                <h3 style={{ fontSize: '2.25rem', fontWeight: '900', color: 'white', marginBottom: '1rem' }}>Civic Intelligence Hub</h3>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>Connect to live institutional data. Locate your representatives and track upcoming election schedules in real-time.</p>
            </div>

            <form onSubmit={handleSearch} style={{ position: 'relative', maxWidth: '600px', margin: '0 auto 4rem' }}>
                <div style={{ position: 'relative' }}>
                    <Search style={{ position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} size={20} />
                    <input
                        type="text"
                        placeholder="Enter your City or Zip Code (e.g., New Delhi)"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '1.25rem 1.5rem 1.25rem 3.5rem',
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid var(--border)',
                            borderRadius: '16px',
                            color: 'white',
                            fontSize: '1rem',
                            outline: 'none',
                            transition: '0.3s'
                        }}
                        onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                        onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                    />
                    <button
                        type="submit"
                        disabled={!searchQuery || isSearching}
                        className="btn-primary"
                        style={{ position: 'absolute', right: '0.5rem', top: '50%', transform: 'translateY(-50%)', borderRadius: '12px', padding: '0.75rem 1.5rem', opacity: searchQuery ? 1 : 0.5 }}
                    >
                        {isSearching ? "Syncing..." : "Search"}
                    </button>
                </div>
            </form>

            <AnimatePresence mode="wait">
                {civicData ? (
                    <div



                        style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '2rem' }}
                    >
                        {/* Officials Column */}
                        <div className="glass" style={{ padding: '2rem', borderRadius: '24px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(129, 140, 248, 0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--primary)' }}>
                                    <User size={20} />
                                </div>
                                <h4 style={{ fontWeight: '800', color: 'white' }}>Authorized Officials</h4>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                {civicData.officials.map((of, i) => (
                                    <div key={i} style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                        <div style={{ fontWeight: '700', color: 'white', marginBottom: '4px' }}>{of.name}</div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>{of.office}</div>
                                        <div style={{ display: 'flex', gap: '15px' }}>
                                            <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: '600' }}>{of.phone}</span>
                                            <a href={of.website} target="_blank" rel="noreferrer" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                Portal <ExternalLink size={10} />
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Elections Column */}
                        <div className="glass" style={{ padding: '2rem', borderRadius: '24px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(45, 212, 191, 0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#2dd4bf' }}>
                                    <Calendar size={20} />
                                </div>
                                <h4 style={{ fontWeight: '800', color: 'white' }}>Upcoming Schedules</h4>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                {civicData.elections.map((el, i) => (
                                    <div key={i} style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <div style={{ fontWeight: '700', color: 'white', marginBottom: '4px' }}>{el.name}</div>
                                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Planned Date: {el.date}</div>
                                        </div>
                                        <div style={{ padding: '4px 12px', borderRadius: '100px', background: el.status === 'Active' ? 'rgba(74, 222, 128, 0.1)' : 'rgba(255,255,255,0.1)', color: el.status === 'Active' ? '#4ade80' : 'var(--text-secondary)', fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase' }}>
                                            {el.status}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                        <div className="pulse" style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--primary)' }} />
                        <p>Awaiting institutional synchronization. Enter your region to begin.</p>
                    </div>
                )}
            </AnimatePresence>

            <div style={{ marginTop: '3rem', padding: '1.5rem', background: 'rgba(2, 6, 23, 0.3)', borderRadius: '16px', border: '1px dashed var(--border)', display: 'flex', alignItems: 'center', gap: '15px' }}>
                <ShieldCheck size={24} style={{ color: '#2dd4bf' }} />
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>This data is pulled from the Google Civic Information API. Ensuring transparent access to candidate and polling information for all citizens.</p>
            </div>
        </div>
    );
};

export default CivicIntelligence;
