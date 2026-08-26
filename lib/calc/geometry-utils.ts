// Shared solid-geometry formulas — Volume and Surface Area calculators
// cover the same five shapes, so the formulas live here once rather than
// being duplicated across both calc files.

export type SolidShape = "cube" | "box" | "sphere" | "cylinder" | "cone";

export function volumeCube(side: number): number {
  return Math.pow(side, 3);
}
export function volumeBox(l: number, w: number, h: number): number {
  return l * w * h;
}
export function volumeSphere(r: number): number {
  return (4 / 3) * Math.PI * Math.pow(r, 3);
}
export function volumeCylinder(r: number, h: number): number {
  return Math.PI * r * r * h;
}
export function volumeCone(r: number, h: number): number {
  return (1 / 3) * Math.PI * r * r * h;
}

export function surfaceAreaCube(side: number): number {
  return 6 * side * side;
}
export function surfaceAreaBox(l: number, w: number, h: number): number {
  return 2 * (l * w + l * h + w * h);
}
export function surfaceAreaSphere(r: number): number {
  return 4 * Math.PI * r * r;
}
export function surfaceAreaCylinder(r: number, h: number): number {
  return 2 * Math.PI * r * (r + h);
}
export function surfaceAreaCone(r: number, h: number): number {
  const slantHeight = Math.sqrt(r * r + h * h);
  return Math.PI * r * (r + slantHeight);
}
