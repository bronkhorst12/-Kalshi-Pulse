import { Link } from 'react-router-dom';
import { TrendingUp, Brain, Shield, ArrowRight, BarChart2, Zap } from 'lucide-react';

export function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

        {/* Animated Data Lines - Ocean themed */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-px h-32 bg-gradient-to-b from-ocean-teal/50 to-transparent animate-data-flow"
              style={{
                left: `${20 + i * 15}%`,
                animationDelay: `${i * 0.6}s`,
                top: '-128px',
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-48 h-48 object-contain"
            />
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            <span className="text-foreground">Future moves.</span>
            <br />
            <span className="text-gradient">Pulse reads it.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-foreground-muted max-w-3xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Kalshi Pulse reads probabilities and movements behind prediction markets.
          </p>

          {/* CTA Button */}
          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Link to="/dashboard" className="btn-primary btn-press inline-flex items-center gap-2 text-lg group">
              Enter Dashboard
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Tagline */}
          <p className="text-sm text-foreground-dim mt-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            Numbers move. Probabilities shift. You observe.
          </p>
        </div>


      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            <span className="text-gradient">Smart Analytics</span> for Prediction Markets
          </h2>
          <p className="text-foreground-muted text-center max-w-2xl mx-auto mb-16">
            An analytics layer that reads data, analyzes trends, and provides AI-based insights.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="data-card text-center group hover-lift card-glow-hover opacity-0 animate-rise-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-ocean-teal/10 flex items-center justify-center group-hover:bg-ocean-teal/20 transition-all duration-300 group-hover:scale-110">
                <BarChart2 className="w-8 h-8 text-ocean-teal transition-transform duration-300 group-hover:rotate-12" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-Time Data</h3>
              <p className="text-foreground-muted">
                Reads and stores market data from Kalshi periodically for historical analysis.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="data-card text-center group hover-lift card-glow-hover opacity-0 animate-rise-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-ocean-seafoam/10 flex items-center justify-center group-hover:bg-ocean-seafoam/20 transition-all duration-300 group-hover:scale-110">
                <Brain className="w-8 h-8 text-ocean-seafoam transition-transform duration-300 group-hover:rotate-12" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Prediction</h3>
              <p className="text-foreground-muted">
                AI model analyzes trends and provides additional probability estimates.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="data-card text-center group hover-lift card-glow-hover opacity-0 animate-rise-up" style={{ animationDelay: '0.3s' }}>
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-status-balanced/10 flex items-center justify-center group-hover:bg-status-balanced/20 transition-all duration-300 group-hover:scale-110">
                <Shield className="w-8 h-8 text-status-balanced transition-transform duration-300 group-hover:rotate-12" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Risk Status</h3>
              <p className="text-foreground-muted">
                Status indicators help understand the opportunity and risk level of each event.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Status Explanation */}
      <section className="py-24 bg-background-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Understanding <span className="text-gradient">Risk Status</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Opportunity */}
            <div className="glass-card p-6 border-status-opportunity/30 hover-lift group opacity-0 animate-cascade" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-8 h-8 text-status-opportunity transition-transform duration-300 group-hover:scale-110 group-hover:translate-x-1" />
                <h3 className="text-xl font-semibold text-status-opportunity">Opportunity</h3>
              </div>
              <p className="text-foreground-muted text-sm">
                Market and data move in the same direction. Opportunity opens.
              </p>
            </div>

            {/* Balanced */}
            <div className="glass-card p-6 border-status-balanced/30 hover-lift group opacity-0 animate-cascade" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-8 h-8 text-status-balanced transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                <h3 className="text-xl font-semibold text-status-balanced">Balanced</h3>
              </div>
              <p className="text-foreground-muted text-sm">
                Both sides are still balanced. New information could change direction.
              </p>
            </div>

            {/* Risk Zone */}
            <div className="glass-card p-6 border-status-risk/30 hover-lift group opacity-0 animate-cascade" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-8 h-8 text-status-risk transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-12" />
                <h3 className="text-xl font-semibold text-status-risk">Risk Zone</h3>
              </div>
              <p className="text-foreground-muted text-sm">
                Probability doesn't favor either side. Actions here are high risk.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Read <span className="text-gradient">Market Movements?</span>
          </h2>
          <p className="text-foreground-muted mb-8 max-w-xl mx-auto">
            Kalshi Pulse dashboard displays all active events with market data and AI predictions.
          </p>
          <Link to="/dashboard" className="btn-primary inline-flex items-center gap-2">
            Open Dashboard
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Logo" className="h-8 w-auto object-contain" />
            </div>
            <p className="text-sm text-foreground-dim">
              Analytics layer for prediction markets. Not financial advice.
            </p>
            <div className="flex items-center gap-4 text-sm text-foreground-dim">
              <Link to="/how-it-works" className="hover:text-foreground transition-colors">
                How It Works
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
