import { describe, it, expect } from 'vitest'
import { isPrime } from '../TestPage'

describe('isPrime', () => {
  it('returns true for small primes', () => {
    expect(isPrime(2)).toBe(true)
    expect(isPrime(3)).toBe(true)
    expect(isPrime(17)).toBe(true)
  })

  it('returns false for non-primes', () => {
    expect(isPrime(4)).toBe(false)
    expect(isPrime(9)).toBe(false)
    expect(isPrime(100)).toBe(false)
  })

  it('handles edge cases', () => {
    expect(isPrime(1)).toBe(false)
    expect(isPrime(0)).toBe(false)
    expect(isPrime(-7)).toBe(false)
    expect(isPrime(2.5)).toBe(false)
    expect(isPrime(NaN)).toBe(false)
  })
})
