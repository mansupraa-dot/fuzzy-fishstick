import '@testing-library/jest-dom'

// Reveal component uses IntersectionObserver, which jsdom does not implement.
// Mock it so all tests that render Reveal-wrapped components work.
global.IntersectionObserver = class {
  constructor(cb) { this.cb = cb }
  observe(el) { this.cb([{ isIntersecting: true, target: el }]) }
  disconnect() {}
  unobserve() {}
}
