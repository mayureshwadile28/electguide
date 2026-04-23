import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Vote, Globe, Sparkles, LayoutGrid, Milestone, Gamepad2, Landmark, BarChart, RefreshCcw } from 'lucide-react';
import Timeline from './components/Timeline';
import InteractivePillars from './components/InteractivePillars';
import GoogleWorkspaceSidebar from './components/GoogleWorkspaceSidebar';

// Modules
import EligibilityCalculator from './components/EligibilityCalculator';
import PolicyMatcher from './components/PolicyMatcher';
import PollingSimulator from './components/PollingSimulator';
import EVMSandbox from './components/EVMSandbox';
import ResultVisualizer from './components/ResultVisualizer';
import VoterEducation from './components/VoterEducation';
import PollingStationLocator from './components/PollingStationLocator';

const initialVotes = [
  { name: 'Unity Party', votes: 440, color: '#818cf8' },
  { name: 'Progress Alliance', votes: 360, color: '#fb7185' },
  { name: 'Eco Vision', votes: 150, color: '#4ade80' },
  { name: 'Independent', votes: 50, color: '#94a3b8' }
];

function App() {
  const [votesData, setVotesData] = useState(initialVotes);
  const [hasVoted, setHasVoted] = useState(false);
  const [appKey, setAppKey] = useState(0);

  // Civic Portfolio State for Gemini Analysis
  const [civicData, setCivicData] = useState({
    eligibility: 'Pending',
    policyMatch: 0,
    bagItems: [],
    vote: null
  });

  const updateCivicData = (key, value) => {
    setCivicData(prev => ({ ...prev, [key]: value }));
  };

  const handleVote = (partyName) => {
    setVotesData(prev => prev.map(p =>
      p.name === partyName ? { ...p, votes: p.votes + 1 } : p
    ));
    setHasVoted(true);
    updateCivicData('vote', partyName);
  };

  const handleReset = () => {
    setVotesData(initialVotes);
    setHasVoted(false);
    setCivicData({ eligibility: 'Pending', policyMatch: 0, bagItems: [], vote: null });
    setAppKey(prev => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div key={appKey} className="app-container" style={{ position: 'relative', overflowX: 'hidden' }}>
      <GoogleWorkspaceSidebar />
      <div className="mesh-gradient" style={{ opacity: 0.5 }} />

      {/* Header - Semantic */}
      <header role="banner" className="glass-header" style={{
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        padding: '1.25rem 4rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'rgba(2, 6, 23, 0.4)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0 8px 16px var(--primary-glow)'
          }}>
            <Vote size={24} color="white" aria-hidden="true" />
          </div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: '800', letterSpacing: '-0.03em', color: 'white', margin: 0 }}>
            Elect<span style={{ color: 'var(--primary)' }}>Guide</span>
          </h1>
        </div>

        <nav aria-label="Main Navigation" role="navigation" style={{ display: 'flex', gap: '3rem', alignItems: 'center' }}>
          <button
            aria-label="Reset entire election simulation to start over"
            title="Reset Simulation"
            onClick={handleReset}
            style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: '600' }}
          >
            <RefreshCcw size={16} /> Reset All
          </button>
          <a href="#interactive" aria-label="Go to simulation modules" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: '500' }}>Simulation</a>
          <a href="#timeline" aria-label="Go to democracy lifecycle timeline" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: '500' }}>Lifecycle</a>
          <button
            aria-label="Access active democratic guide"
            className="btn-primary"
            style={{ borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            Active Guide <Globe size={18} aria-hidden="true" />
          </button>
        </nav>
      </header>

      {/* Main Content - Semantic */}
      <main id="main-content" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 4rem' }}>

        <section aria-labelledby="hero-title" style={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: '4rem 0'
        }}>
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div role="status" aria-label="App Status" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0.5rem 1rem', borderRadius: '100px', background: 'rgba(129, 140, 248, 0.1)', border: '1px solid rgba(129, 140, 248, 0.2)', color: 'var(--primary)', fontSize: '0.875rem', fontWeight: '600', marginBottom: '2rem' }}>
              <Sparkles size={16} aria-hidden="true" /> Advanced Election Resource
            </div>
            <h2 id="hero-title" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: '1', fontWeight: '900', letterSpacing: '-0.05em', marginBottom: '2rem', color: 'white' }}>
              Democracy, <br />
              <span className="primary-gradient" style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Redefined.</span>
            </h2>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '800px', lineHeight: '1.8', marginBottom: '3.5rem' }}>
              A high-precision guide to the modern election process. From eligibility audits to live results visualization, experience every stage of the democratic lifecycle.
            </p>
          </motion.article>
        </section>

        <section id="interactive" aria-label="Simulation Modules" style={{ padding: '8rem 0' }}>
          <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
            <h2 style={{ fontSize: '3.5rem', fontWeight: '900', marginBottom: '1.5rem', color: 'white' }}>Interactive Modules</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>High-fidelity simulations covering every phase of the voting process.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12rem' }}>
            <article id="step1" aria-labelledby="title-step1">
              <ModuleHeader icon={<Milestone size={32} />} title="01. Eligibility Audit" desc="Perform a self-verification of your voting status based on citizenship and age." />
              <EligibilityCalculator onStatusChange={(s) => updateCivicData('eligibility', s)} />
            </article>

            <article id="step2" aria-labelledby="title-step2">
              <ModuleHeader icon={<LayoutGrid size={32} />} title="02. Policy Sandbox" desc="Analyze candidates through a neutral policy-based comparison tool." />
              <PolicyMatcher onMatchChange={(p) => updateCivicData('policyMatch', p)} />
            </article>

            <article id="step3" aria-labelledby="title-step3">
              <ModuleHeader icon={<Gamepad2 size={32} />} title="03. Booth Protocol" desc="Learn the legal requirements for items allowed inside a polling station." />
              <PollingSimulator onBagChange={(items) => updateCivicData('bagItems', items)} />
            </article>

            <article id="step4" aria-labelledby="title-step4">
              <ModuleHeader icon={<Landmark size={32} />} title="04. Voting Simulation" desc="Practice casting a digital ballot on a realistic Electronic Voting Machine." />
              <EVMSandbox onVote={handleVote} isConfirmedGlobal={hasVoted} />
            </article>

            <article id="step5" aria-labelledby="title-step5">
              <ModuleHeader icon={<BarChart size={32} />} title="05. Live Audit" desc="Visualizing the transition from individual ballots to a national majority." />
              <ResultVisualizer votesData={votesData} civicData={civicData} />
            </article>

            <article id="extra1">
              <PollingStationLocator />
            </article>

            <article id="extra2">
              <VoterEducation />
            </article>
          </div>
        </section>

        <section id="timeline" aria-label="Democratic Lifecycle" style={{ padding: '8rem 0' }}>
          <Timeline />
        </section>

      </main>

      <footer role="contentinfo" style={{ padding: '6rem 4rem', borderTop: '1px solid var(--border)', textAlign: 'center', background: 'rgba(2, 6, 23, 0.5)' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
          <Vote size={32} color="var(--primary)" />
          <span style={{ fontWeight: '800', fontSize: '1.5rem', color: 'white' }}>ElectGuide</span>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '600px', margin: '0 auto' }}>
          Sustainable, transparent, and public education on the democratic process.
          Ready for global deployment.
        </p>
      </footer>
    </div>
  );
}
const ModuleHeader = ({ icon, title, desc }) => (
  <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
    <div style={{ display: 'inline-flex', padding: '1rem', borderRadius: '16px', background: 'rgba(255,255,255,0.03)', color: 'var(--primary)', marginBottom: '1.5rem' }}>{icon}</div>
    <h3 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem', color: 'white' }}>{title}</h3>
    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>{desc}</p>
  </div>
);

export default App;
