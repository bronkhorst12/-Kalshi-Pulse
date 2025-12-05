import { useState, useEffect } from 'react';
import { RefreshCw, Filter, TrendingUp, BarChart2, AlertCircle, Wifi, WifiOff } from 'lucide-react';
import { EventCard } from '../components/EventCard';
import { StatusBadge } from '../components/StatusBadge';
import { type Event } from '../lib/supabase';
import { fetchKalshiMarkets } from '../lib/kalshi-api';

// Dummy Data untuk Development/Fallback
const DUMMY_EVENTS: Event[] = [
  {
    id: 1,
    source_event_id: 'PRES2024',
    ticker: 'PRES2024',
    title: 'Will Democrats win the 2024 Presidential Election?',
    category: 'Politics',
    deadline: '2025-11-05T00:00:00Z',
    is_active: true,
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-12-05T04:00:00Z',
    market_data: {
      yes_probability: 52.5,
      no_probability: 47.5,
      volume: 8500000,
      change_24h: 2.3,
      timestamp: '2024-12-05T04:00:00Z',
    },
    ai_prediction: {
      ai_yes_probability: 54.8,
      ai_winner: 'YES',
      status: 'Opportunity',
      timestamp: '2024-12-05T03:30:00Z',
    },
  },
  {
    id: 2,
    source_event_id: 'FED2024DEC',
    ticker: 'FED-RATE-DEC',
    title: 'Will the Fed cut rates in December 2024?',
    category: 'Economics',
    deadline: '2024-12-18T00:00:00Z',
    is_active: true,
    created_at: '2024-11-01T00:00:00Z',
    updated_at: '2024-12-05T05:00:00Z',
    market_data: {
      yes_probability: 78.2,
      no_probability: 21.8,
      volume: 3200000,
      change_24h: -1.5,
      timestamp: '2024-12-05T05:00:00Z',
    },
    ai_prediction: {
      ai_yes_probability: 75.5,
      ai_winner: 'YES',
      status: 'Balanced',
      timestamp: '2024-12-05T04:45:00Z',
    },
  },
  {
    id: 3,
    source_event_id: 'BTC100K',
    ticker: 'BTC-100K',
    title: 'Will Bitcoin reach $100,000 by end of 2024?',
    category: 'Crypto',
    deadline: '2024-12-31T23:59:59Z',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-12-05T06:00:00Z',
    market_data: {
      yes_probability: 42.8,
      no_probability: 57.2,
      volume: 5600000,
      change_24h: 5.7,
      timestamp: '2024-12-05T06:00:00Z',
    },
    ai_prediction: {
      ai_yes_probability: 38.2,
      ai_winner: 'NO',
      status: 'Risk Zone',
      timestamp: '2024-12-05T05:30:00Z',
    },
  },
  {
    id: 4,
    source_event_id: 'TECH-AI2025',
    ticker: 'AI-BREAKTHROUGH',
    title: 'Will there be a major AI breakthrough in Q1 2025?',
    category: 'Technology',
    deadline: '2025-03-31T23:59:59Z',
    is_active: true,
    created_at: '2024-10-01T00:00:00Z',
    updated_at: '2024-12-05T07:00:00Z',
    market_data: {
      yes_probability: 61.3,
      no_probability: 38.7,
      volume: 1800000,
      change_24h: 3.2,
      timestamp: '2024-12-05T07:00:00Z',
    },
    ai_prediction: {
      ai_yes_probability: 65.7,
      ai_winner: 'YES',
      status: 'Opportunity',
      timestamp: '2024-12-05T06:45:00Z',
    },
  },
  {
    id: 5,
    source_event_id: 'CLIMATE-COP29',
    ticker: 'COP29-DEAL',
    title: 'Will COP29 result in binding climate agreements?',
    category: 'Climate',
    deadline: '2024-12-15T00:00:00Z',
    is_active: true,
    created_at: '2024-09-01T00:00:00Z',
    updated_at: '2024-12-05T08:00:00Z',
    market_data: {
      yes_probability: 35.6,
      no_probability: 64.4,
      volume: 920000,
      change_24h: -2.1,
      timestamp: '2024-12-05T08:00:00Z',
    },
    ai_prediction: {
      ai_yes_probability: 32.1,
      ai_winner: 'NO',
      status: 'Risk Zone',
      timestamp: '2024-12-05T07:30:00Z',
    },
  },
  {
    id: 6,
    source_event_id: 'SPORT-NFL2024',
    ticker: 'NFL-CHIEFS-WIN',
    title: 'Will Kansas City Chiefs win Super Bowl 2025?',
    category: 'Sports',
    deadline: '2025-02-09T00:00:00Z',
    is_active: true,
    created_at: '2024-09-15T00:00:00Z',
    updated_at: '2024-12-05T09:00:00Z',
    market_data: {
      yes_probability: 28.9,
      no_probability: 71.1,
      volume: 2400000,
      change_24h: 1.2,
      timestamp: '2024-12-05T09:00:00Z',
    },
    ai_prediction: {
      ai_yes_probability: 31.5,
      ai_winner: 'NO',
      status: 'Balanced',
      timestamp: '2024-12-05T08:30:00Z',
    },
  },
];

const DUMMY_CATEGORIES = ['Politics', 'Economics', 'Crypto', 'Technology', 'Climate', 'Sports'];

export function DashboardPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [useDummyData, setUseDummyData] = useState(false);
  const [isLiveData, setIsLiveData] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const loadEvents = async () => {
    setLoading(true);
    try {
      // Fetch directly from Kalshi API
      const response = await fetchKalshiMarkets({
        limit: 50,
        category: selectedCategory !== 'all' ? selectedCategory : undefined,
        status: selectedStatus !== 'all' ? selectedStatus : undefined,
      });

      if (response.markets && response.markets.length > 0) {
        // Use real Kalshi data
        setEvents(response.markets as Event[]);
        setCategories(response.categories);
        setUseDummyData(false);
        setIsLiveData(true);
      } else {
        // Fallback to dummy data if no data from Kalshi
        setUseDummyData(true);
        setIsLiveData(false);
        filterDummyData();
      }
    } catch (err) {
      // Fallback to dummy data on error
      console.error('Error loading from Kalshi API, using dummy data:', err);
      setUseDummyData(true);
      setIsLiveData(false);
      filterDummyData();
    } finally {
      setLoading(false);
    }
  };

  const filterDummyData = () => {
    let filtered = [...DUMMY_EVENTS];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(e => e.category === selectedCategory);
    }

    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(e => e.ai_prediction?.status === selectedStatus);
    }

    setEvents(filtered);
    setCategories(DUMMY_CATEGORIES);
  };

  useEffect(() => {
    loadEvents();
  }, [selectedCategory, selectedStatus]);

  // Stats
  const totalEvents = events.length;
  const opportunityCount = events.filter(e => e.ai_prediction?.status === 'Opportunity').length;
  const riskCount = events.filter(e => e.ai_prediction?.status === 'Risk Zone').length;

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl md:text-4xl font-bold">
              <span className="text-gradient">Dashboard</span> Events
            </h1>
            {isLiveData ? (
              <span className="px-3 py-1 text-xs font-medium bg-status-opportunity/10 text-status-opportunity border border-status-opportunity/30 rounded-full flex items-center gap-1.5">
                <Wifi className="w-3 h-3" />
                Live from Kalshi
              </span>
            ) : useDummyData && (
              <span className="px-3 py-1 text-xs font-medium bg-ocean-seafoam/10 text-ocean-seafoam border border-ocean-seafoam/30 rounded-full flex items-center gap-1.5">
                <WifiOff className="w-3 h-3" />
                Demo Mode
              </span>
            )}
          </div>
          <p className="text-foreground-muted">
            {isLiveData
              ? 'Data real-time dari Kalshi prediction market.'
              : 'Angka bergerak. Probabilitas berubah. Anda mengamati.'}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="data-card flex items-center gap-4 hover-lift group opacity-0 animate-rise-up" style={{ animationDelay: '0.1s' }}>
            <div className="w-12 h-12 rounded-xl bg-ocean-seafoam/10 flex items-center justify-center transition-all duration-300 group-hover:bg-ocean-seafoam/20 group-hover:scale-110">
              <BarChart2 className="w-6 h-6 text-ocean-seafoam" />
            </div>
            <div>
              <div className="text-2xl font-bold">{totalEvents}</div>
              <div className="text-sm text-foreground-dim">Total Events</div>
            </div>
          </div>

          <div className="data-card flex items-center gap-4 hover-lift group opacity-0 animate-rise-up" style={{ animationDelay: '0.2s' }}>
            <div className="w-12 h-12 rounded-xl bg-status-opportunity/10 flex items-center justify-center transition-all duration-300 group-hover:bg-status-opportunity/20 group-hover:scale-110">
              <TrendingUp className="w-6 h-6 text-status-opportunity" />
            </div>
            <div>
              <div className="text-2xl font-bold text-status-opportunity">{opportunityCount}</div>
              <div className="text-sm text-foreground-dim">Opportunity</div>
            </div>
          </div>

          <div className="data-card flex items-center gap-4 hover-lift group opacity-0 animate-rise-up" style={{ animationDelay: '0.3s' }}>
            <div className="w-12 h-12 rounded-xl bg-status-risk/10 flex items-center justify-center transition-all duration-300 group-hover:bg-status-risk/20 group-hover:scale-110">
              <AlertCircle className="w-6 h-6 text-status-risk" />
            </div>
            <div>
              <div className="text-2xl font-bold text-status-risk">{riskCount}</div>
              <div className="text-sm text-foreground-dim">Risk Zone</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-foreground-dim" />
            <span className="text-sm text-foreground-dim">Filter:</span>
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-background-secondary border border-border rounded-lg px-4 py-2 text-sm text-foreground focus:outline-none focus:border-ocean-teal/50"
          >
            <option value="all">Semua Kategori</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-background-secondary border border-border rounded-lg px-4 py-2 text-sm text-foreground focus:outline-none focus:border-ocean-teal/50"
          >
            <option value="all">Semua Status</option>
            <option value="Opportunity">Opportunity</option>
            <option value="Balanced">Balanced</option>
            <option value="Risk Zone">Risk Zone</option>
          </select>

          {/* Refresh Button */}
          <button
            onClick={loadEvents}
            disabled={loading}
            className="ml-auto flex items-center gap-2 px-4 py-2 bg-background-tertiary border border-border rounded-lg text-sm text-foreground-muted hover:text-foreground hover:border-ocean-teal/30 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>

          {/* Demo Data Toggle */}
          <button
            onClick={() => {
              if (useDummyData || !isLiveData) {
                // Switch back to live Kalshi data
                loadEvents();
              } else {
                // Switch to dummy data
                setUseDummyData(true);
                setIsLiveData(false);
                setLoading(true);
                setTimeout(() => {
                  filterDummyData();
                  setLoading(false);
                }, 300);
              }
            }}
            className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-sm transition-all ${isLiveData
                ? 'bg-status-opportunity/10 border-status-opportunity/30 text-status-opportunity hover:bg-status-opportunity/20'
                : 'bg-background-tertiary border-border text-foreground-muted hover:text-foreground hover:border-ocean-teal/30'
              }`}
          >
            {isLiveData ? (
              <>
                <WifiOff className="w-4 h-4" />
                Use Demo Data
              </>
            ) : (
              <>
                <Wifi className="w-4 h-4" />
                Use Live Data
              </>
            )}
          </button>
        </div>

        {/* Status Legend */}
        <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
          <span className="text-foreground-dim">Status:</span>
          <StatusBadge status="Opportunity" size="sm" />
          <StatusBadge status="Balanced" size="sm" />
          <StatusBadge status="Risk Zone" size="sm" />
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="data-card animate-pulse">
                <div className="h-6 bg-background-tertiary rounded w-1/3 mb-4" />
                <div className="h-8 bg-background-tertiary rounded w-3/4 mb-4" />
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="h-20 bg-background-tertiary rounded" />
                  <div className="h-20 bg-background-tertiary rounded" />
                </div>
                <div className="h-4 bg-background-tertiary rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-12">
            <BarChart2 className="w-12 h-12 text-foreground-dim mx-auto mb-4" />
            <p className="text-foreground-muted">Tidak ada event yang ditemukan</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
