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

        it('should reject non-residents', () => {
            const data = { age: 'adult', citizenship: 'citizen', residency: 'non-resident' };
            expect(checkEligibility(data)).toBe(false);
        });

        it('should handle missing fields', () => {
            const data = { age: 'adult', citizenship: 'citizen' };
            expect(checkEligibility(data)).toBe(false);
        });
    });

    describe('Policy Match Engine', () => {
        const policies = [{ id: 'tax', title: 'Taxes' }, { id: 'edu', title: 'Education' }];
        const candidates = [
            { name: 'C1', stance: { tax: true, edu: true } },
            { name: 'C2', stance: { tax: false, edu: false } },
            { name: 'C3', stance: { tax: true, edu: false } }
        ];

        it('should calculate 100% match for identical stances', () => {
            const userStance = { tax: true, edu: true };
            const results = calculatePolicyMatch(userStance, candidates, policies);
            expect(results[0].name).toBe('C1');
            expect(results[0].percentage).toBe(100);
        });

        it('should calculate 0% match for opposing stances', () => {
            const userStance = { tax: true, edu: true };
            const results = calculatePolicyMatch(userStance, candidates, policies);
            // C2 is 0% match
            const c2Result = results.find(c => c.name === 'C2');
            expect(c2Result.percentage).toBe(0);
        });

        it('should calculate 50% match for partial stances', () => {
            const userStance = { tax: true, edu: true };
            const results = calculatePolicyMatch(userStance, candidates, policies);
            // C3 is 50% match
            const c3Result = results.find(c => c.name === 'C3');
            expect(c3Result.percentage).toBe(50);
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

        it('should handle empty bag', () => {
            const bag = [];
            const results = validateBagItems(bag);
            expect(results).toEqual([]);
        });

        it('should handle mixed bag', () => {
            const bag = [{ id: 'id-card', legal: true }, { id: 'phone', legal: false }];
            const results = validateBagItems(bag);
            expect(results.length).toBe(2);
            expect(results[0].status).toBe('success');
            expect(results[1].status).toBe('error');
        });
    });
});
