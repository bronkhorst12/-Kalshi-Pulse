// Kalshi Direct API Integration
// Public API - No authentication required
// Using Vite proxy to bypass CORS

// Use proxy in development, direct URL in production
const KALSHI_API_BASE = import.meta.env.DEV
    ? '/api/kalshi'  // Proxied through Vite dev server
    : 'https://api.elections.kalshi.com/trade-api/v2';

export interface KalshiMarket {
    ticker: string;
    event_ticker: string;
    title: string;
    subtitle?: string;
    category?: string;
    status: string;
    yes_bid: number;
    yes_ask: number;
    no_bid: number;
    no_ask: number;
    last_price: number;
    volume: number;
    volume_24h?: number;
    open_interest?: number;
    close_time?: string;
    result?: string;
}

export interface KalshiEvent {
    event_ticker: string;
    series_ticker: string;
    title: string;
    category: string;
    mutually_exclusive: boolean;
    markets: KalshiMarket[];
}

export interface TransformedEvent {
    id: number;
    source_event_id: string;
    ticker: string;
    title: string;
    category: string;
    deadline: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    market_data: {
        yes_probability: number;
        no_probability: number;
        volume: number;
        change_24h: number;
        timestamp: string;
    } | null;
    ai_prediction: {
        ai_yes_probability: number;
        ai_winner: 'YES' | 'NO';
        status: 'Opportunity' | 'Balanced' | 'Risk Zone';
        timestamp: string;
    } | null;
}

// Calculate probability from bid/ask
function calculateProbability(market: KalshiMarket): number {
    const yesBid = market.yes_bid || 0;
    const yesAsk = market.yes_ask || 0;

    if (yesBid > 0 && yesAsk > 0) {
        return (yesBid + yesAsk) / 2;
    }
    return market.last_price || 50;
}

// Generate AI-like prediction based on market data
function generatePrediction(yesProbability: number): TransformedEvent['ai_prediction'] {
    // Simulate AI prediction with slight variance
    const variance = (Math.random() - 0.5) * 10;
    const aiYesProbability = Math.max(5, Math.min(95, yesProbability + variance));

    // Determine status based on probability spread
    let status: 'Opportunity' | 'Balanced' | 'Risk Zone';

    if (yesProbability > 65 || yesProbability < 35) {
        // Clear direction - opportunity
        status = 'Opportunity';
    } else if (yesProbability >= 45 && yesProbability <= 55) {
        // Very balanced
        status = 'Balanced';
    } else {
        // Uncertain territory
        status = Math.random() > 0.5 ? 'Balanced' : 'Risk Zone';
    }

    return {
        ai_yes_probability: Math.round(aiYesProbability * 10) / 10,
        ai_winner: aiYesProbability > 50 ? 'YES' : 'NO',
        status,
        timestamp: new Date().toISOString(),
    };
}

// Transform Kalshi market to our Event format
function transformMarket(market: KalshiMarket, index: number): TransformedEvent {
    const yesProbability = calculateProbability(market);
    const noProbability = 100 - yesProbability;

    // Simulate 24h change
    const change24h = (Math.random() - 0.5) * 10;

    return {
        id: index + 1,
        source_event_id: market.event_ticker || market.ticker,
        ticker: market.ticker,
        title: market.title,
        category: market.category || 'General',
        deadline: market.close_time || null,
        is_active: market.status === 'open',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        market_data: {
            yes_probability: Math.round(yesProbability * 10) / 10,
            no_probability: Math.round(noProbability * 10) / 10,
            volume: market.volume || 0,
            change_24h: Math.round(change24h * 10) / 10,
            timestamp: new Date().toISOString(),
        },
        ai_prediction: generatePrediction(yesProbability),
    };
}

// Fetch markets directly from Kalshi API
export async function fetchKalshiMarkets(options?: {
    limit?: number;
    status?: string;
    category?: string;
}): Promise<{ markets: TransformedEvent[]; categories: string[] }> {
    const params = new URLSearchParams();
    params.set('limit', String(options?.limit || 50));

    if (options?.status && options.status !== 'all') {
        params.set('status', 'open');
    } else {
        params.set('status', 'open');
    }

    try {
        const response = await fetch(`${KALSHI_API_BASE}/markets?${params}`, {
            headers: {
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Kalshi API error: ${response.status}`);
        }

        const data = await response.json();
        const markets: KalshiMarket[] = data.markets || [];

        // Transform markets to our format
        let transformedMarkets = markets.map((market, index) => transformMarket(market, index));

        // Extract unique categories
        const categories = [...new Set(transformedMarkets.map(m => m.category))].filter(Boolean);

        // Filter by category if specified
        if (options?.category && options.category !== 'all') {
            transformedMarkets = transformedMarkets.filter(m =>
                m.category.toLowerCase() === options.category?.toLowerCase()
            );
        }

        // Filter by AI status if specified
        if (options?.status && options.status !== 'all' && options.status !== 'open') {
            transformedMarkets = transformedMarkets.filter(m =>
                m.ai_prediction?.status === options.status
            );
        }

        return {
            markets: transformedMarkets,
            categories: categories.sort(),
        };
    } catch (error) {
        console.error('Failed to fetch from Kalshi API:', error);
        throw error;
    }
}

// Fetch single market detail
export async function fetchKalshiMarketDetail(ticker: string): Promise<TransformedEvent | null> {
    try {
        const response = await fetch(`${KALSHI_API_BASE}/markets/${ticker}`, {
            headers: {
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Kalshi API error: ${response.status}`);
        }

        const data = await response.json();
        const market: KalshiMarket = data.market;

        if (!market) return null;

        return transformMarket(market, 1);
    } catch (error) {
        console.error('Failed to fetch market detail:', error);
        throw error;
    }
}

// Fetch events (grouped markets)
export async function fetchKalshiEvents(options?: {
    limit?: number;
    status?: string;
}): Promise<KalshiEvent[]> {
    const params = new URLSearchParams();
    params.set('limit', String(options?.limit || 20));
    if (options?.status) params.set('status', options.status);

    try {
        const response = await fetch(`${KALSHI_API_BASE}/events?${params}`, {
            headers: {
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Kalshi API error: ${response.status}`);
        }

        const data = await response.json();
        return data.events || [];
    } catch (error) {
        console.error('Failed to fetch events:', error);
        throw error;
    }
}
