/** Two-digit readout, the way every number on the dial is printed: 1 → '01'. */
export const pad = (n: number) => String(n).padStart(2, '0');
