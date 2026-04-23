import { vi } from 'vitest';
import '@testing-library/jest-dom';

// Mock Vite env variables
vi.stubGlobal('import.meta', {
    env: {
        VITE_GEMINI_API_KEY: 'test-key',
    },
});
