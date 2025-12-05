import { Link } from 'react-router-dom';
import {
  Database,
  TrendingUp,
  Brain,
  Shield,
  ArrowRight,
  RefreshCw,
  Activity,
  Zap,
  Eye,
} from 'lucide-react';

export function HowItWorksPage() {
  const steps = [
    {
      icon: Database,
      title: 'Reading Data from Kalshi',
      description:
        'Kalshi Pulse periodically fetches market data from the Kalshi platform. Data includes YES/NO probabilities, transaction volume, price movements, and event information.',
      color: 'ocean-seafoam',
    },
    {
      icon: TrendingUp,
      title: 'Observing Movements',
      description:
        'Data is stored historically, enabling trend analysis. The system observes probability changes, volatility, and market momentum over time.',
      color: 'ocean-teal',
    },
    {
      icon: Brain,
      title: 'AI Analysis',
      description:
        'AI model analyzes market data, historical trends, and contextual factors to generate independent probability estimates. AI also provides insights on supporting and limiting factors.',
      color: 'ocean-seafoam',
    },
    {
      icon: Shield,
      title: 'Risk Status',
      description:
        'Based on comparing market probability and AI estimates, the system assigns status: Opportunity (open opportunity), Balanced (equilibrium), or Risk Zone (high risk).',
      color: 'status-balanced',
    },
  ];

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            How <span className="text-gradient">Kalshi Pulse</span> Works
          </h1>
          <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
            A smart analytics layer that reads prediction market data and provides AI-based insights.
          </p>
        </div>

        {/* Process Steps */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="relative">
            {/* Connection Line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-ocean-seafoam via-ocean-teal to-status-balanced hidden md:block" />

            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative mb-12 last:mb-0">
                  <div className="flex items-start gap-6">
                    {/* Icon */}
                    <div
                      className={`relative z-10 w-16 h-16 rounded-2xl bg-${step.color}/10 flex items-center justify-center shrink-0`}
                    >
                      <Icon className={`w-8 h-8 text-${step.color}`} />
                    </div>

                    {/* Content */}
                    <div className="data-card flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium text-foreground-dim">
                          Step {index + 1}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                      <p className="text-foreground-muted">{step.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Key Features */}
        <div className="bg-background-secondary rounded-2xl p-8 md:p-12 mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Key <span className="text-gradient">Features</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-ocean-teal/10 flex items-center justify-center">
                <RefreshCw className="w-7 h-7 text-ocean-teal" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Auto Update</h3>
              <p className="text-foreground-muted text-sm">
                Data is automatically updated every 10 minutes to ensure information is always current.
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-ocean-seafoam/10 flex items-center justify-center">
                <Eye className="w-7 h-7 text-ocean-seafoam" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Historical Tracking</h3>
              <p className="text-foreground-muted text-sm">
                Every probability movement is stored for long-term trend analysis.
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-status-balanced/10 flex items-center justify-center">
                <Zap className="w-7 h-7 text-status-balanced" />
              </div>
              <h3 className="text-lg font-semibold mb-2">AI Insights</h3>
              <p className="text-foreground-muted text-sm">
                AI provides in-depth analysis of factors affecting probability.
              </p>
            </div>
          </div>
        </div>

        {/* Status Explanation */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Understanding <span className="text-gradient">Status</span>
          </h2>

          <div className="space-y-6">
            {/* Opportunity */}
            <div className="data-card border-status-opportunity/30 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-status-opportunity/10 flex items-center justify-center shrink-0">
                <TrendingUp className="w-6 h-6 text-status-opportunity" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-status-opportunity mb-2">Opportunity</h3>
                <p className="text-foreground-muted">
                  Market and data move in the same direction. AI detects that market probability may be undervalued based on data analysis. This indicates potential opportunity worth considering.
                </p>
              </div>
            </div>

            {/* Balanced */}
            <div className="data-card border-status-balanced/30 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-status-balanced/10 flex items-center justify-center shrink-0">
                <Activity className="w-6 h-6 text-status-balanced" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-status-balanced mb-2">Balanced</h3>
                <p className="text-foreground-muted">
                  Both sides are still balanced. AI and market probability are relatively similar. This indicates the market already reflects available information well. New information could change direction.
                </p>
              </div>
            </div>

            {/* Risk Zone */}
            <div className="data-card border-status-risk/30 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-status-risk/10 flex items-center justify-center shrink-0">
                <Shield className="w-6 h-6 text-status-risk" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-status-risk mb-2">Risk Zone</h3>
                <p className="text-foreground-muted">
                  Probability doesn't clearly favor either side, or there is high volatility. AI detects significant uncertainty. Actions here are risky and require extra consideration.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="max-w-3xl mx-auto text-center mb-16 p-8 bg-background-tertiary/50 rounded-2xl border border-border">
          <h3 className="text-lg font-semibold mb-4">Disclaimer</h3>
          <p className="text-foreground-muted text-sm">
            Kalshi Pulse is an independent analytics layer and is <strong>not</strong> financial advice.
            All predictions and insights provided are based solely on available data analysis
            and do not guarantee any specific outcome. Users are fully responsible for decisions
            made based on information from this platform.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link to="/dashboard" className="btn-primary inline-flex items-center gap-2">
            Start Observing
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
