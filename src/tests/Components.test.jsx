import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import VoterEducation from '../components/VoterEducation';
import EVMSandbox from '../components/EVMSandbox';

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
