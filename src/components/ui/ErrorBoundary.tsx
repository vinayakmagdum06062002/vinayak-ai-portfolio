"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

interface ErrorBoundaryProps {
  /** Human-readable name of the region, used in the fallback message. */
  name: string;
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * Isolates interactive regions so a failure in one widget degrades that widget
 * only — the rest of the page keeps working.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  override state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  override componentDidCatch(error: Error, info: ErrorInfo) {
    if (process.env.NODE_ENV !== "production") {
      console.error(`[ErrorBoundary:${this.props.name}]`, error, info.componentStack);
    }
  }

  private reset = () => this.setState({ hasError: false });

  override render() {
    if (!this.state.hasError) return this.props.children;
    if (this.props.fallback) return this.props.fallback;
    return (
      <div role="alert" className="card" style={{ padding: 28, display: "grid", gap: 12, justifyItems: "start" }}>
        <p className="label">Degraded gracefully</p>
        <p className="muted">The {this.props.name} could not be displayed. The rest of the page is unaffected.</p>
        <button type="button" className="chip" onClick={this.reset}>
          Try again
        </button>
      </div>
    );
  }
}
