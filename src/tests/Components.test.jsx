import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import VoterEducation from '../components/VoterEducation';

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
