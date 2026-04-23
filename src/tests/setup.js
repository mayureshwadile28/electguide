import '@testing-library/jest-dom/vitest';

// Mock IntersectionObserver
class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
}

globalThis.IntersectionObserver = IntersectionObserver;
