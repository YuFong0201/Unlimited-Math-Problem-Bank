export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

export function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

export function lcm(a: number, b: number): number {
  return (a * b) / gcd(a, b);
}

export function simplifyFraction(numerator: number, denominator: number): [number, number] {
  const commonDivisor = gcd(numerator, denominator);
  return [numerator / commonDivisor, denominator / commonDivisor];
}