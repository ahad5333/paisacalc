// Cheap, one-time capability probe. Sandboxed browsers, some remote-desktop
// / VM setups, and GPU-disabled environments (see: the WebGLRenderer error
// this exists to prevent) never have WebGL, and trying to mount a Canvas
// there throws — checking first avoids the failed context creation
// (console error, dropped frames) entirely instead of catching it after.
export function hasWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}
