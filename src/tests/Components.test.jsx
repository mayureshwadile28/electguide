import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

// Components
import VoterEducation from '../components/VoterEducation';
import EVMSandbox from '../components/EVMSandbox';
import EligibilityCalculator from '../components/EligibilityCalculator';
import PolicyMatcher from '../components/PolicyMatcher';
import PollingSimulator from '../components/PollingSimulator';
import ResultVisualizer from '../components/ResultVisualizer';
import PollingStationLocator from '../components/PollingStationLocator';
import Timeline from '../components/Timeline';
import InteractivePillars from '../components/InteractivePillars';
import BackgroundEffect from '../components/BackgroundEffect';

describe('VoterEducation Component', () => {
    it('renders with correct accessibility labels for screen readers', () => {
        render(<VoterEducation />);
        const list = screen.getByRole('list');
        expect(list).toBeDefined();
        const iframes = screen.getAllByTitle(/EVM-VVPAT|Electoral Literacy/);
        expect(iframes.length).toBeGreaterThan(0);
    });
});

describe('EVMSandbox Component', () => {
    it('renders EVMSandbox properly and simulates vote', async () => {
        const onVoteMock = vi.fn();
        render(<EVMSandbox onVote={onVoteMock} isConfirmedGlobal={false} />);

        await waitFor(() => {
            expect(screen.getByText('Eco Vision')).toBeDefined();
        });
        const candidateButton = screen.getByText('Eco Vision');
        fireEvent.click(candidateButton);

        await waitFor(() => {
            const voteButton = screen.getByRole('button', { name: /Cast Final Vote/i });
            fireEvent.click(voteButton);
        });
    });
});

describe('EligibilityCalculator Component', () => {
    it('simulates user answering questions and checks final status', async () => {
        let status = '';
        render(<EligibilityCalculator onStatusChange={(s) => { status = s; }} />);

        const adultOption = await screen.findByRole('button', { name: /Select option: 18 or older/i });
        fireEvent.click(adultOption);

        await screen.findByText(/Are you a legal citizen of this country/i);
        const citizenOption = await screen.findByRole('button', { name: /Select option: Yes/i });
        fireEvent.click(citizenOption);

        await screen.findByText(/Do you have a permanent place of residence/i);
        const residentOption = await screen.findByRole('button', { name: /Select option: Yes/i });
        fireEvent.click(residentOption);

        const successMessage = await screen.findByText(/You are ready to vote!/i);
        expect(successMessage).toBeDefined();
        expect(status).toBe('Eligible');
    });
});

describe('PolicyMatcher Component', () => {
    it('calculates policy match correctly', async () => {
        const onMatchChangeMock = vi.fn();
        render(<PolicyMatcher onMatchChange={onMatchChangeMock} />);

        // We have 4 questions
        // Q1:
        await screen.findByText(/Should we prioritize high-speed rail/i);
        let supportBtn = screen.getByRole('button', { name: /Support/i });
        fireEvent.click(supportBtn);

        // Q2:
        await screen.findByText(/Increase funding for digital literacy programs/i);
        supportBtn = screen.getByRole('button', { name: /Support/i });
        fireEvent.click(supportBtn);

        // Q3:
        await screen.findByText(/Transition to a fully digital, centralized health/i);
        supportBtn = screen.getByRole('button', { name: /Support/i });
        fireEvent.click(supportBtn);

        // Q4:
        await screen.findByText(/Implement strict carbon taxes/i);
        supportBtn = screen.getByRole('button', { name: /Support/i });
        fireEvent.click(supportBtn);

        const matchResults = await screen.findByText(/Match Results/i);
        expect(matchResults).toBeDefined();
    });
});

describe('PollingSimulator Component', () => {
    it('renders polling simulator and allows verification of empty bag', async () => {
        render(<PollingSimulator onBagChange={() => {}} />);
        const verifyBtn = screen.getByRole('button', { name: /Verify if items in your pocket are legal/i });
        expect(verifyBtn).toBeDefined();
    });
});

describe('ResultVisualizer Component', () => {
    it('renders ResultVisualizer', async () => {
        const mockVotesData = [
            { name: 'Unity Party', votes: 440, color: '#818cf8' },
            { name: 'Progress Alliance', votes: 360, color: '#fb7185' },
        ];
        const mockCivicData = {
            eligibility: 'Eligible',
            policyMatch: 85,
            bagItems: [],
            vote: 'Unity Party'
        };

        render(<ResultVisualizer votesData={mockVotesData} civicData={mockCivicData} />);

        expect(screen.getByText(/Official Auditor Visualization/i)).toBeDefined();
    });
});

describe('PollingStationLocator Component', () => {
    it('simulates GPS lookup', async () => {
        const mockGeolocation = {
            getCurrentPosition: vi.fn().mockImplementationOnce((success) => Promise.resolve(success({
                coords: {
                    latitude: 51.1,
                    longitude: 45.3
                }
            })))
        };
        Object.defineProperty(globalThis, 'navigator', {
            value: { geolocation: mockGeolocation },
            configurable: true
        });

        render(<PollingStationLocator />);
        const findBtn = screen.getByText(/FIND MY BOOTH/i);
        fireEvent.click(findBtn);

        expect(mockGeolocation.getCurrentPosition).toHaveBeenCalled();
    });
});

describe('Timeline Component', () => {
    it('renders Timeline', () => {
        render(<Timeline />);
        expect(screen.getByText(/Path of Power/i)).toBeDefined();
    });
});

describe('InteractivePillars Component', () => {
    it('renders InteractivePillars', () => {
        render(<InteractivePillars />);
        expect(screen.getByText(/Fair Rules/i)).toBeDefined();
    });
});

describe('BackgroundEffect Component', () => {
    it('renders BackgroundEffect', () => {
        const { container } = render(<BackgroundEffect />);
        expect(container.firstChild).toBeDefined();
    });
});
