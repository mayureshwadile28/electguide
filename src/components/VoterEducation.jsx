import React from 'react';
import { Youtube, Info, ExternalLink } from 'lucide-react';

const VoterEducation = () => {
    const videos = [
        {
            title: "How to Vote Using EVM-VVPAT",
            id: "kEEfLkW5uTQ", // User-provided verified ID
            description: "Official guide on the voting process and voter awareness."
        },
        {
            title: "Electoral Literacy for Citizens",
            id: "XGJQNKFYqYI", // User-provided verified ID
            description: "Understanding your voting rights and the power of democracy."
        }
    ];

    return (
        <div className="glass-card" role="region" aria-labelledby="edu-title" style={{ maxWidth: '1000px', margin: '4rem auto', padding: '3rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h3 id="edu-title" style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '1rem', color: 'white' }}>
                    <span style={{ color: '#FF0000', marginRight: '15px' }} aria-hidden="true"><Youtube size={40} /></span>
                    Voter Education Gallery
                </h3>
                <p style={{ color: 'var(--text-secondary)' }}>Powered by YouTube Ecosystem. Learn the fundamentals of our democratic process.</p>
            </div>

            <div role="list" aria-label="Educational video resources" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                {videos.map((video, index) => (
                    <div key={index} role="listitem" className="glass" style={{ borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                            <iframe
                                src={`https://www.youtube.com/embed/${video.id}`}
                                title={video.title}
                                aria-label={`Official video guide: ${video.title}`}
                                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                        <div style={{ padding: '1.5rem' }}>
                            <h4 style={{ color: 'white', fontWeight: '700', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                {video.title}
                                <Info size={16} color="var(--primary)" aria-hidden="true" />
                            </h4>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>{video.description}</p>
                            <a
                                href={`https://www.youtube.com/watch?v=${video.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Watch ${video.title} on YouTube`}
                                className="glass"
                                style={{ padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.8rem', color: 'white', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '5px', border: '1px solid var(--border)' }}
                            >
                                Watch on YouTube <ExternalLink size={12} aria-hidden="true" />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VoterEducation;
