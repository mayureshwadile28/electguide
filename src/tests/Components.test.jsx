import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import VoterEducation from '../components/VoterEducation';
import EVMSandbox from '../components/EVMSandbox';
import EligibilityCalculator from '../components/EligibilityCalculator';

describe('VoterEducation Component', () => {
    it('renders with correct accessibility labels for screen readers', () => {
        render(<VoterEducation />);

        // Check for role="list"
        const list = screen.getByRole('list');
        expect(list).toBeDefined();

        // Check if YouTube iframes are labeled
        const iframes = screen.getAllByTitle(/EVM-VVPAT|Electoral Literacy/);
        expect(iframes.length).toBeGreaterThan(0);
    });
});

describe('EVMSandbox Component', () => {
    it('renders EVMSandbox properly', () => {
        render(<EVMSandbox onVote={() => {}} isConfirmedGlobal={false} />);

        // Ensure "Cast Final Vote" button exists
        const voteButton = screen.getByText(/Cast Final Vote/i);
        expect(voteButton).toBeDefined();

        // Ensure initial state text is "READY TO VOTE"
        const readyText = screen.getByText(/READY TO VOTE/i);
        expect(readyText).toBeDefined();
    });
});

describe('EligibilityCalculator Component', () => {
    it('simulates user answering questions and checks final status', async () => {
        let status = '';
        render(<EligibilityCalculator onStatusChange={(s) => { status = s; }} />);

        // Step 1: Age
        const adultOption = await screen.findByRole('button', { name: /Select option: 18 or older/i });
        fireEvent.click(adultOption);

        // Step 2: Citizenship
        // We wait for the text of the next question to appear to ensure animation finished
        await screen.findByText(/Are you a legal citizen of this country/i);
        const citizenOption = await screen.findByRole('button', { name: /Select option: Yes/i });
        fireEvent.click(citizenOption);

        // Step 3: Residency
        await screen.findByText(/Do you have a permanent place of residence/i);
        const residentOption = await screen.findByRole('button', { name: /Select option: Yes/i });
        fireEvent.click(residentOption);

        // Final Screen Checks
        const successMessage = await screen.findByText(/You are ready to vote!/i);
        expect(successMessage).toBeDefined();
        expect(status).toBe('Eligible');
    });
});
