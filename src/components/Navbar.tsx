import { Link, useLocation } from 'react-router-dom';
import { BarChart3, Info, Home } from 'lucide-react';

export function Navbar() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { path: '/how-it-works', label: 'How It Works', icon: Info },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative group-hover:animate-bob">
              <img
                src="/logo.png"
                alt="Logo"
                className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </Link>

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 group/nav ${isActive
                    ? 'bg-ocean-teal/10 text-ocean-teal'
                    : 'text-foreground-muted hover:text-foreground hover:bg-background-tertiary'
                    }`}
                >
                  <Icon className="w-4 h-4 transition-transform duration-200 group-hover/nav:scale-110" />
                  <span className="text-sm font-medium">{item.label}</span>
                  {!isActive && (
                    <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-ocean-teal scale-x-0 group-hover/nav:scale-x-100 transition-transform duration-300 origin-left" />
                  )}
                </Link>
              );
            })}

            {/* GitHub Link */}
            <a
              href="https://github.com/bronkhorst12/-Kalshi-Pulse.git"
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 group/nav text-foreground-muted hover:text-foreground hover:bg-background-tertiary"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="w-4 h-4 transition-transform duration-200 group-hover/nav:scale-110 fill-current"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
              </svg>
            </a>

            {/* X (Twitter) Link */}
            <a
              href="https://x.com/KalshPulse"
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 group/nav text-foreground-muted hover:text-foreground hover:bg-background-tertiary"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="w-4 h-4 transition-transform duration-200 group-hover/nav:scale-110 fill-current"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
              </svg>

            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Link
              to="/dashboard"
              className="btn-primary text-sm py-2 px-4"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
