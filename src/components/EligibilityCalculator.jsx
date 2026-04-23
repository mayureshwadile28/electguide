import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, ArrowRight, ArrowLeft, ClipboardList, ChevronDown } from 'lucide-react';
import { checkEligibility } from '../utils/electoralLogic';

const steps = [
    {
        id: 'age',
        question: "How old are you?",
        options: [
            { label: "Under 18", value: "minor" },
            { label: "18 or older", value: "adult" }
        ]
    },
    {
        id: 'citizenship',
        question: "Are you a legal citizen of this country?",
        options: [
            { label: "Yes", value: "citizen" },
            { label: "No", value: "non-citizen" }
        ]
    },
    {
        id: 'residency',
        question: "Do you have a permanent place of residence?",
        options: [
            { label: "Yes", value: "resident" },
            { label: "No", value: "non-resident" }
        ]
    }
];

const EligibilityCalculator = ({ onStatusChange }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [showResult, setShowResult] = useState(false);

    const handleOption = (value) => {
        const newAnswers = { ...answers, [steps[currentStep].id]: value };
        setAnswers(newAnswers);
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            setShowResult(true);
            const status = checkEligibility(newAnswers) ? 'Eligible' : 'Ineligible';
            if (onStatusChange) onStatusChange(status);
        }
    };

    const isEligible = checkEligibility(answers);

    const localReset = () => {
        setCurrentStep(0);
        setAnswers({});
        setShowResult(false);
    };

    const scrollToNext = () => {
        const next = document.getElementById('step2');
        if (next) next.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="glass-card" role="region" aria-labelledby="audit-title" style={{ maxWidth: '800px', margin: '4rem auto', padding: '3rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h3 id="audit-title" style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '1rem', color: 'white' }}>Eligibility Audit</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Standardized verification of institutional voting requirements.</p>
            </div>

            <div style={{ flex: 1, padding: '3rem', position: 'relative', overflow: 'hidden' }}>
                <AnimatePresence mode="wait">
                    {!showResult ? (
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h4 style={{ fontSize: '1.75rem', marginBottom: '2rem', fontWeight: '700', color: 'white' }}>{steps[currentStep].question}</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {steps[currentStep].options.map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => handleOption(option.value)}
                                        className="glass"
                                        style={{
                                            padding: '1.5rem',
                                            borderRadius: '16px',
                                            textAlign: 'left',
                                            fontSize: '1.1rem',
                                            fontWeight: '600',
                                            border: '1px solid var(--border)',
                                            transition: '0.3s',
                                            color: 'white'
                                        }}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            style={{ textAlign: 'center' }}
                        >
                            <div style={{ marginBottom: '2rem' }}>
                                {isEligible ? (
                                    <CheckCircle2 size={80} color="#4ade80" style={{ margin: '0 auto' }} />
                                ) : (
                                    <AlertCircle size={80} color="#fb7185" style={{ margin: '0 auto' }} />
                                )}
                            </div>
                            <h4 style={{ fontSize: '2rem', marginBottom: '1rem', fontWeight: '800', color: 'white' }}>
                                {isEligible ? "You are ready to vote!" : "Not quite ready yet."}
                            </h4>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '2.5rem' }}>
                                {isEligible
                                    ? "Based on your answers, you meet all the criteria for voter registration. Time to make your voice heard!"
                                    : answers.age === 'minor'
                                        ? "You must be 18 years or older to vote. But you can start learning now!"
                                        : "It looks like you don't meet all the current requirements. Check with your local election office for specific details."
                                }
                            </p>

                            <div className="glass" style={{ textAlign: 'left', padding: '1.5rem', borderRadius: '16px', marginBottom: '2.5rem' }}>
                                <h5 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px', color: 'white' }}>
                                    <ClipboardList size={18} /> Personalized Checklist
                                </h5>
                                <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <li style={{ color: answers.age === 'adult' ? '#4ade80' : '#fb7185' }}>
                                        {answers.age === 'adult' ? "✓ Age verification complete" : "✗ Age requirement (Must be 18+)"}
                                    </li>
                                    <li style={{ color: answers.citizenship === 'citizen' ? '#4ade80' : '#fb7185' }}>
                                        {answers.citizenship === 'citizen' ? "✓ Citizenship confirmed" : "✗ Citizenship required"}
                                    </li>
                                    <li style={{ color: answers.residency === 'resident' ? '#4ade80' : '#fb7185' }}>
                                        {answers.residency === 'resident' ? "✓ Residency confirmed" : "✗ Proof of residence needed"}
                                    </li>
                                </ul>
                            </div>

                            {isEligible ? (
                                <button onClick={scrollToNext} className="btn-primary" style={{ width: '100%', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                    Continue to Lab 02 <ChevronDown size={18} />
                                </button>
                            ) : (
                                <button onClick={localReset} className="btn-primary" style={{ width: '100%', borderRadius: '14px' }}>
                                    Retry Check
                                </button>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {currentStep > 0 && !showResult && (
                <div style={{ padding: '1rem 2rem 2rem' }}>
                    <button
                        onClick={() => setCurrentStep(currentStep - 1)}
                        style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}
                    >
                        <ArrowLeft size={16} /> Previous Question
                    </button>
                </div>
            )}
        </div>
    );
};

export default EligibilityCalculator;
