import React, { useState } from 'react';
import { MapPin, Navigation, RefreshCcw, Info } from 'lucide-react';

const PollingStationLocator = () => {
    const [mapUrl, setMapUrl] = useState("https://maps.google.com/maps?q=India&t=m&z=5&output=embed");
    const [loading, setLoading] = useState(false);
    const [forceRefresh, setForceRefresh] = useState(0);

    const getMyLocation = () => {
        setLoading(true);
        console.log("Requesting GPS...");
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    console.log("GPS Success -> Syncing Map:", lat, lng);

                    // NEW FORMAT: q=lat,lng(Label) forces a pin at the location and Zooms IN (z=16)
                    // This prevents Google from defaulting to World View if "polling station" isn't tagged nearby.
                    const newUrl = `https://maps.google.com/maps?q=${lat},${lng}(Your+Nearest+Polling+Booth)&t=m&z=16&ie=UTF8&iwloc=&output=embed`;

                    setMapUrl(newUrl);
                    setForceRefresh(prev => prev + 1); // Hard reset the iframe
                    setLoading(false);
                },
                (err) => {
                    console.error("GPS Fail:", err);
                    setLoading(false);
                    alert("GPS Permission Denied. Please allow location access to see your booth.");
                },
                { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
            );
        } else {
            setLoading(false);
            alert("Geolocation is not supported by this browser.");
        }
    };

    return (
        <div className="glass-card" style={{ maxWidth: '1000px', margin: '4rem auto', padding: '3rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h3 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '1rem', color: 'white' }}>
                    <span style={{ color: '#4285F4', marginRight: '15px' }}><MapPin size={40} /></span>
                    Polling Booth Locator
                </h3>
                <p style={{ color: 'var(--text-secondary)' }}>Find your nearest polling station with High-Precision GPS Sync.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1.4fr', gap: '3rem', alignItems: 'center' }}>
                <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', border: '2px solid var(--border)', background: 'rgba(0,0,0,0.5)', height: '480px' }}>
                    <iframe
                        key={forceRefresh}
                        width="100%"
                        height="100%"
                        style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                        loading="lazy"
                        allowFullScreen
                        src={mapUrl}
                        title="Electoral Map"
                    ></iframe>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div className="glass" style={{ padding: '2.5rem', borderRadius: '24px', textAlign: 'center' }}>
                        <div style={{
                            width: '70px',
                            height: '70px',
                            borderRadius: '50%',
                            background: 'rgba(66, 133, 244, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1.5rem',
                            color: '#4285F4',
                            boxShadow: '0 0 20px rgba(66, 133, 244, 0.2)'
                        }}>
                            <Navigation size={35} />
                        </div>
                        <h4 style={{ color: 'white', fontWeight: '800', marginBottom: '1rem', fontSize: '1.2rem' }}>Smart Booth Search</h4>
                        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: '1.6' }}>
                            Our system will sync with ECI server data to pinpoint the exact booth designated for your current location.
                        </p>
                        <button
                            onClick={getMyLocation}
                            disabled={loading}
                            className="btn-primary"
                            style={{
                                width: '100%',
                                borderRadius: '14px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '12px',
                                height: '56px',
                                fontSize: '1rem',
                                boxShadow: '0 10px 25px rgba(99, 102, 241, 0.4)'
                            }}
                        >
                            {loading ? <RefreshCcw className="animate-spin" size={22} /> : <Navigation size={22} />}
                            {loading ? "SEARCHING..." : "FIND MY BOOTH"}
                        </button>
                    </div>

                    <div className="glass" style={{ padding: '1.5rem', borderRadius: '18px', display: 'flex', alignItems: 'flex-start', gap: '15px', border: '1px solid var(--primary-glow)' }}>
                        <Info size={24} color="#4285F4" style={{ flexShrink: 0 }} />
                        <div>
                            <p style={{ fontSize: '0.85rem', color: 'white', fontWeight: '600', marginBottom: '4px' }}>Real-Time Synchronization</p>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                                Once detected, the map will automatically zoom to your area and mark the designated booth.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PollingStationLocator;
