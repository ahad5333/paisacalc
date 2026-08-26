"use client";

import { Component, type ReactNode } from "react";

// The scene is decorative — atmosphere behind the real UI (see
// SceneLayer.tsx) — so any runtime failure here (a lost WebGL context,
// a driver quirk the upfront hasWebGL() check didn't catch) should
// disappear quietly rather than take the rest of the page down with it.
// React error boundaries must be class components; there's no hook form.
export class SceneErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    return this.state.hasError ? null : this.props.children;
  }
}
