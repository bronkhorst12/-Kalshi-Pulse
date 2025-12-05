import { useState, useEffect } from 'react';
import { RefreshCw, Filter, TrendingUp, BarChart2, AlertCircle, Wifi, WifiOff } from 'lucide-react';
import { EventCard } from '../components/EventCard';
import { StatusBadge } from '../components/StatusBadge';
import { type Event } from '../lib/supabase';
import { fetchKalshiMarkets } from '../lib/kalshi-api';

// Dummy Data untuk Development/Fallback - Data realistis Desember 2024
const DUMMY_EVENTS: Event[] = [
  // === POLITICS ===
  {
    id: 1,
    source_event_id: 'TRUMP-INAUG-2025',
    ticker: 'TRUMP-INAUG',
    title: 'Will Trump be inaugurated as President on Jan 20, 2025?',
    category: 'Politics',
    deadline: '2025-01-20T12:00:00Z',
    is_active: true,
    created_at: '2024-11-06T00:00:00Z',
    updated_at: '2024-12-05T07:00:00Z',
    market_data: {
      yes_probability: 96.8,
      no_probability: 3.2,
      volume: 12500000,
      change_24h: 0.3,
      timestamp: '2024-12-05T07:00:00Z',
    },
    ai_prediction: {
      ai_yes_probability: 97.2,
      ai_winner: 'YES',
      status: 'Balanced',
      timestamp: '2024-12-05T06:30:00Z',
    },
  },
  {
    id: 2,
    source_event_id: 'BIDEN-PARDON-HUNTER',
    ticker: 'BIDEN-HUNTER',
    title: 'Will Biden pardon Hunter Biden before leaving office?',
    category: 'Politics',
    deadline: '2025-01-20T00:00:00Z',
    is_active: true,
    created_at: '2024-11-15T00:00:00Z',
    updated_at: '2024-12-05T08:00:00Z',
    market_data: {
      yes_probability: 82.3,
      no_probability: 17.7,
      volume: 4200000,
      change_24h: 5.2,
      timestamp: '2024-12-05T08:00:00Z',
    },
    ai_prediction: {
      ai_yes_probability: 88.5,
      ai_winner: 'YES',
      status: 'Opportunity',
      timestamp: '2024-12-05T07:45:00Z',
    },
  },
  {
    id: 3,
    source_event_id: 'SYRIA-ASSAD-2024',
    ticker: 'SYRIA-ASSAD',
    title: 'Will Assad regime fall by end of December 2024?',
    category: 'Politics',
    deadline: '2024-12-31T23:59:59Z',
    is_active: true,
    created_at: '2024-12-01T00:00:00Z',
    updated_at: '2024-12-05T09:00:00Z',
    market_data: {
      yes_probability: 67.5,
      no_probability: 32.5,
      volume: 1850000,
      change_24h: 12.8,
      timestamp: '2024-12-05T09:00:00Z',
    },
    ai_prediction: {
      ai_yes_probability: 71.2,
      ai_winner: 'YES',
      status: 'Opportunity',
      timestamp: '2024-12-05T08:30:00Z',
    },
  },

  // === ECONOMICS ===
  {
    id: 4,
    source_event_id: 'FED-DEC-2024',
    ticker: 'FED-RATE-DEC',
    title: 'Will the Fed cut rates by 25bps on Dec 18, 2024?',
    category: 'Economics',
    deadline: '2024-12-18T19:00:00Z',
    is_active: true,
    created_at: '2024-11-01T00:00:00Z',
    updated_at: '2024-12-05T10:00:00Z',
    market_data: {
      yes_probability: 74.6,
      no_probability: 25.4,
      volume: 8900000,
      change_24h: -2.1,
      timestamp: '2024-12-05T10:00:00Z',
    },
    ai_prediction: {
      ai_yes_probability: 72.3,
      ai_winner: 'YES',
      status: 'Balanced',
      timestamp: '2024-12-05T09:30:00Z',
    },
  },
  {
    id: 5,
    source_event_id: 'SP500-6000-2024',
    ticker: 'SP500-6K',
    title: 'Will S&P 500 close above 6,100 by year end 2024?',
    category: 'Economics',
    deadline: '2024-12-31T21:00:00Z',
    is_active: true,
    created_at: '2024-10-15T00:00:00Z',
    updated_at: '2024-12-05T11:00:00Z',
    market_data: {
      yes_probability: 58.2,
      no_probability: 41.8,
      volume: 3450000,
      change_24h: 3.5,
      timestamp: '2024-12-05T11:00:00Z',
    },
    ai_prediction: {
      ai_yes_probability: 62.8,
      ai_winner: 'YES',
      status: 'Opportunity',
      timestamp: '2024-12-05T10:45:00Z',
    },
  },
  {
    id: 6,
    source_event_id: 'INFLATION-NOV-2024',
    ticker: 'CPI-NOV',
    title: 'Will November 2024 CPI be below 2.8%?',
    category: 'Economics',
    deadline: '2024-12-11T08:30:00Z',
    is_active: true,
    created_at: '2024-11-20T00:00:00Z',
    updated_at: '2024-12-05T12:00:00Z',
    market_data: {
      yes_probability: 45.3,
      no_probability: 54.7,
      volume: 2100000,
      change_24h: -1.8,
      timestamp: '2024-12-05T12:00:00Z',
    },
    ai_prediction: {
      ai_yes_probability: 41.5,
      ai_winner: 'NO',
      status: 'Risk Zone',
      timestamp: '2024-12-05T11:30:00Z',
    },
  },

  // === CRYPTO ===
  {
    id: 7,
    source_event_id: 'BTC-100K-2024',
    ticker: 'BTC-100K',
    title: 'Will Bitcoin close above $100,000 on Dec 31, 2024?',
    category: 'Crypto',
    deadline: '2024-12-31T23:59:59Z',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-12-05T13:00:00Z',
    market_data: {
      yes_probability: 72.4,
      no_probability: 27.6,
      volume: 15600000,
      change_24h: 4.2,
      timestamp: '2024-12-05T13:00:00Z',
    },
    ai_prediction: {
      ai_yes_probability: 68.9,
      ai_winner: 'YES',
      status: 'Balanced',
      timestamp: '2024-12-05T12:30:00Z',
    },
  },
  {
    id: 8,
    source_event_id: 'ETH-4K-2024',
    ticker: 'ETH-4000',
    title: 'Will Ethereum reach $4,000 before 2025?',
    category: 'Crypto',
    deadline: '2024-12-31T23:59:59Z',
    is_active: true,
    created_at: '2024-06-01T00:00:00Z',
    updated_at: '2024-12-05T14:00:00Z',
    market_data: {
      yes_probability: 61.8,
      no_probability: 38.2,
      volume: 5200000,
      change_24h: 2.7,
      timestamp: '2024-12-05T14:00:00Z',
    },
    ai_prediction: {
      ai_yes_probability: 65.3,
      ai_winner: 'YES',
      status: 'Opportunity',
      timestamp: '2024-12-05T13:30:00Z',
    },
  },
  {
    id: 9,
    source_event_id: 'SOL-300-2024',
    ticker: 'SOL-300',
    title: 'Will Solana trade above $300 in December 2024?',
    category: 'Crypto',
    deadline: '2024-12-31T23:59:59Z',
    is_active: true,
    created_at: '2024-11-01T00:00:00Z',
    updated_at: '2024-12-05T14:30:00Z',
    market_data: {
      yes_probability: 38.5,
      no_probability: 61.5,
      volume: 2800000,
      change_24h: -3.2,
      timestamp: '2024-12-05T14:30:00Z',
    },
    ai_prediction: {
      ai_yes_probability: 34.2,
      ai_winner: 'NO',
      status: 'Risk Zone',
      timestamp: '2024-12-05T14:00:00Z',
    },
  },

  // === TECHNOLOGY ===
  {
    id: 10,
    source_event_id: 'OPENAI-GPT5-Q1',
    ticker: 'GPT5-Q1',
    title: 'Will OpenAI release GPT-5 in Q1 2025?',
    category: 'Technology',
    deadline: '2025-03-31T23:59:59Z',
    is_active: true,
    created_at: '2024-10-01T00:00:00Z',
    updated_at: '2024-12-05T15:00:00Z',
    market_data: {
      yes_probability: 42.7,
      no_probability: 57.3,
      volume: 3100000,
      change_24h: 1.5,
      timestamp: '2024-12-05T15:00:00Z',
    },
    ai_prediction: {
      ai_yes_probability: 38.9,
      ai_winner: 'NO',
      status: 'Balanced',
      timestamp: '2024-12-05T14:45:00Z',
    },
  },
  {
    id: 11,
    source_event_id: 'AAPL-250-2024',
    ticker: 'AAPL-250',
    title: 'Will Apple stock close above $250 in December 2024?',
    category: 'Technology',
    deadline: '2024-12-31T21:00:00Z',
    is_active: true,
    created_at: '2024-11-15T00:00:00Z',
    updated_at: '2024-12-05T15:30:00Z',
    market_data: {
      yes_probability: 55.4,
      no_probability: 44.6,
      volume: 1950000,
      change_24h: 2.1,
      timestamp: '2024-12-05T15:30:00Z',
    },
    ai_prediction: {
      ai_yes_probability: 58.7,
      ai_winner: 'YES',
      status: 'Opportunity',
      timestamp: '2024-12-05T15:00:00Z',
    },
  },
  {
    id: 12,
    source_event_id: 'TSLA-CYBERTRUCK-100K',
    ticker: 'CYBERTRUCK-100K',
    title: 'Will Tesla deliver 100K Cybertrucks by end of 2024?',
    category: 'Technology',
    deadline: '2024-12-31T23:59:59Z',
    is_active: true,
    created_at: '2024-09-01T00:00:00Z',
    updated_at: '2024-12-05T16:00:00Z',
    market_data: {
      yes_probability: 68.9,
      no_probability: 31.1,
      volume: 1420000,
      change_24h: 0.8,
      timestamp: '2024-12-05T16:00:00Z',
    },
    ai_prediction: {
      ai_yes_probability: 72.4,
      ai_winner: 'YES',
      status: 'Opportunity',
      timestamp: '2024-12-05T15:30:00Z',
    },
  },

  // === SPORTS ===
  {
    id: 13,
    source_event_id: 'NFL-CHIEFS-SB',
    ticker: 'CHIEFS-SB59',
    title: 'Will Kansas City Chiefs win Super Bowl LIX (2025)?',
    category: 'Sports',
    deadline: '2025-02-09T23:59:00Z',
    is_active: true,
    created_at: '2024-09-01T00:00:00Z',
    updated_at: '2024-12-05T17:00:00Z',
    market_data: {
      yes_probability: 22.5,
      no_probability: 77.5,
      volume: 4800000,
      change_24h: 1.2,
      timestamp: '2024-12-05T17:00:00Z',
    },
    ai_prediction: {
      ai_yes_probability: 25.8,
      ai_winner: 'NO',
      status: 'Balanced',
      timestamp: '2024-12-05T16:30:00Z',
    },
  },
  {
    id: 14,
    source_event_id: 'NBA-CELTICS-TITLE',
    ticker: 'CELTICS-2025',
    title: 'Will Boston Celtics repeat as NBA Champions in 2025?',
    category: 'Sports',
    deadline: '2025-06-30T23:59:59Z',
    is_active: true,
    created_at: '2024-10-15T00:00:00Z',
    updated_at: '2024-12-05T17:30:00Z',
    market_data: {
      yes_probability: 28.3,
      no_probability: 71.7,
      volume: 2150000,
      change_24h: -0.5,
      timestamp: '2024-12-05T17:30:00Z',
    },
    ai_prediction: {
      ai_yes_probability: 31.2,
      ai_winner: 'NO',
      status: 'Balanced',
      timestamp: '2024-12-05T17:00:00Z',
    },
  },
  {
    id: 15,
    source_event_id: 'FIFA-CWC-2025',
    ticker: 'CWC-REAL',
    title: 'Will Real Madrid win FIFA Club World Cup 2025?',
    category: 'Sports',
    deadline: '2025-07-13T23:59:59Z',
    is_active: true,
    created_at: '2024-11-01T00:00:00Z',
    updated_at: '2024-12-05T18:00:00Z',
    market_data: {
      yes_probability: 31.6,
      no_probability: 68.4,
      volume: 1680000,
      change_24h: 0.9,
      timestamp: '2024-12-05T18:00:00Z',
    },
    ai_prediction: {
      ai_yes_probability: 35.4,
      ai_winner: 'NO',
      status: 'Opportunity',
      timestamp: '2024-12-05T17:30:00Z',
    },
  },

  // === CLIMATE ===
  {
    id: 16,
    source_event_id: 'COP29-FUNDING',
    ticker: 'COP29-300B',
    title: 'Will COP29 reach $300B climate funding commitment?',
    category: 'Climate',
    deadline: '2024-12-15T00:00:00Z',
    is_active: true,
    created_at: '2024-11-01T00:00:00Z',
    updated_at: '2024-12-05T19:00:00Z',
    market_data: {
      yes_probability: 71.2,
      no_probability: 28.8,
      volume: 890000,
      change_24h: 3.8,
      timestamp: '2024-12-05T19:00:00Z',
    },
    ai_prediction: {
      ai_yes_probability: 74.6,
      ai_winner: 'YES',
      status: 'Opportunity',
      timestamp: '2024-12-05T18:30:00Z',
    },
  },
  {
    id: 17,
    source_event_id: 'US-TEMP-DEC-2024',
    ticker: 'WARM-DEC',
    title: 'Will December 2024 be warmest December on record in US?',
    category: 'Climate',
    deadline: '2024-12-31T23:59:59Z',
    is_active: true,
    created_at: '2024-11-15T00:00:00Z',
    updated_at: '2024-12-05T19:30:00Z',
    market_data: {
      yes_probability: 35.8,
      no_probability: 64.2,
      volume: 520000,
      change_24h: -1.3,
      timestamp: '2024-12-05T19:30:00Z',
    },
    ai_prediction: {
      ai_yes_probability: 32.1,
      ai_winner: 'NO',
      status: 'Risk Zone',
      timestamp: '2024-12-05T19:00:00Z',
    },
  },
  {
    id: 18,
    source_event_id: 'EV-SALES-2024',
    ticker: 'EV-10M-2024',
    title: 'Will global EV sales exceed 10 million units in 2024?',
    category: 'Climate',
    deadline: '2024-12-31T23:59:59Z',
    is_active: true,
    created_at: '2024-06-01T00:00:00Z',
    updated_at: '2024-12-05T20:00:00Z',
    market_data: {
      yes_probability: 88.4,
      no_probability: 11.6,
      volume: 1250000,
      change_24h: 0.4,
      timestamp: '2024-12-05T20:00:00Z',
    },
    ai_prediction: {
      ai_yes_probability: 91.2,
      ai_winner: 'YES',
      status: 'Balanced',
      timestamp: '2024-12-05T19:30:00Z',
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
              ? 'Real-time data from Kalshi prediction market.'
              : 'Numbers move. Probabilities shift. You observe.'}
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
            <option value="all">All Categories</option>
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
            <option value="all">All Status</option>
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
            <p className="text-foreground-muted">No events found</p>
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
