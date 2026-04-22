import { describe, it, expect } from 'vitest';
import { checkEligibility, calculatePolicyMatch, validateBagItems } from '../utils/electoralLogic';

describe('Electoral Logic Audit', () => {

    describe('Eligibility Validation', () => {
        it('should approve a resident adult citizen', () => {
            const data = { age: 'adult', citizenship: 'citizen', residency: 'resident' };
            expect(checkEligibility(data)).toBe(true);
        });

        it('should reject underage users', () => {
            const data = { age: 'minor', citizenship: 'citizen', residency: 'resident' };
            expect(checkEligibility(data)).toBe(false);
        });

        it('should reject non-citizens', () => {
            const data = { age: 'adult', citizenship: 'non-citizen', residency: 'resident' };
            expect(checkEligibility(data)).toBe(false);
        });
    });

    describe('Policy Match Engine', () => {
        const policies = [{ id: 'tax', title: 'Taxes' }];
        const candidates = [{ name: 'C1', stance: { tax: true } }, { name: 'C2', stance: { tax: false } }];

        it('should calculate 100% match for identical stances', () => {
            const userStance = { tax: true };
            const results = calculatePolicyMatch(userStance, candidates, policies);
            expect(results[0].name).toBe('C1');
            expect(results[0].percentage).toBe(100);
        });

        it('should calculate 0% match for opposing stances', () => {
            const userStance = { tax: true };
            const results = calculatePolicyMatch(userStance, candidates, policies);
            expect(results[1].name).toBe('C2');
            expect(results[1].percentage).toBe(0);
        });
    });

    describe('Booth Protocol (Bag Validation)', () => {
        it('should mark illegal items as error', () => {
            const bag = [{ id: 'phone', legal: false }];
            const results = validateBagItems(bag);
            expect(results[0].status).toBe('error');
        });

        it('should mark legal items as success', () => {
            const bag = [{ id: 'id-card', legal: true }];
            const results = validateBagItems(bag);
            expect(results[0].status).toBe('success');
        });
    });
});
