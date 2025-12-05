import { Link, useLocation } from 'react-router-dom';
import { Activity, BarChart3, Info, Home } from 'lucide-react';

export function Navbar() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { path: '/how-it-works', label: 'Cara Kerja', icon: Info },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative group-hover:animate-bob">
              <Activity className="w-8 h-8 text-ocean-teal icon-glow" />
              <div className="absolute inset-0 blur-lg bg-ocean-teal/30 group-hover:bg-ocean-teal/50 transition-all duration-300" />
            </div>
            <span className="text-xl font-bold text-foreground transition-colors duration-300 group-hover:text-ocean-teal">
              Kalshi <span className="text-ocean-teal">Pulse</span>
            </span>
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
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 group/nav ${
                    isActive
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
