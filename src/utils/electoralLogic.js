/**
 * Core Business Logic for Election Simulation
 * Optimized for unit testing and maintainability.
 */

// 01. Eligibility Logic
export const checkEligibility = (answers) => {
    return (
        answers.age === 'adult' &&
        answers.citizenship === 'citizen' &&
        answers.residency === 'resident'
    );
};

// 02. Policy Matching Logic
export const calculatePolicyMatch = (userStance, candidates, policies) => {
    return candidates.map(c => {
        let score = 0;
        policies.forEach(p => {
            if (userStance[p.id] === c.stance[p.id]) score++;
        });
        return {
            name: c.name,
            percentage: Math.round((score / policies.length) * 100)
        };
    }).sort((a, b) => b.percentage - a.percentage);
};

// 03. Booth Protocol Logic
export const validateBagItems = (itemsInBag) => {
    return itemsInBag.map(item => ({
        ...item,
        status: item.legal ? 'success' : 'error'
    }));
};

// 04. Results Scaling Logic
export const getProportionalVotes = (baseVotes, progressFactor) => {
    return Math.round(baseVotes * progressFactor);
};
