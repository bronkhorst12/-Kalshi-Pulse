import { useState, useEffect } from 'react';
import { RefreshCw, Filter, TrendingUp, BarChart2, AlertCircle } from 'lucide-react';
import { EventCard } from '../components/EventCard';
import { StatusBadge } from '../components/StatusBadge';
import { type Event } from '../lib/supabase';

// Dummy data for fallback when Kalshi API is unavailable
const DUMMY_EVENTS: Event[] = [
  // Politics - US Elections
  { id: 1, source_event_id: 'evt-001', ticker: 'TRUMP-2024', title: 'Trump wins 2024 Presidential Election', category: 'Politics', deadline: '2024-11-05', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 48, no_probability: 52, volume: 2500000, change_24h: 2.3, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 51, ai_winner: 'YES', status: 'Opportunity', timestamp: '2024-12-05' } },
  { id: 2, source_event_id: 'evt-002', ticker: 'BIDEN-RESIGN', title: 'Biden resigns before end of term', category: 'Politics', deadline: '2025-01-20', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 8, no_probability: 92, volume: 450000, change_24h: -1.2, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 6, ai_winner: 'NO', status: 'Balanced', timestamp: '2024-12-05' } },
  { id: 3, source_event_id: 'evt-003', ticker: 'GOP-HOUSE', title: 'Republicans retain House majority 2024', category: 'Politics', deadline: '2024-11-15', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 62, no_probability: 38, volume: 890000, change_24h: 1.8, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 68, ai_winner: 'YES', status: 'Opportunity', timestamp: '2024-12-05' } },
  { id: 4, source_event_id: 'evt-004', ticker: 'DEM-SENATE', title: 'Democrats keep Senate control', category: 'Politics', deadline: '2024-11-15', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 45, no_probability: 55, volume: 720000, change_24h: -0.5, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 42, ai_winner: 'NO', status: 'Risk Zone', timestamp: '2024-12-05' } },
  { id: 5, source_event_id: 'evt-005', ticker: 'NEWSOM-2028', title: 'Newsom runs for President in 2028', category: 'Politics', deadline: '2028-01-01', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 72, no_probability: 28, volume: 320000, change_24h: 0.8, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 75, ai_winner: 'YES', status: 'Balanced', timestamp: '2024-12-05' } },

  // Economics - Federal Reserve
  { id: 6, source_event_id: 'evt-006', ticker: 'FED-DEC-CUT', title: 'Fed cuts rates in December 2024', category: 'Economics', deadline: '2024-12-18', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 85, no_probability: 15, volume: 1800000, change_24h: 3.2, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 88, ai_winner: 'YES', status: 'Opportunity', timestamp: '2024-12-05' } },
  { id: 7, source_event_id: 'evt-007', ticker: 'FED-RATE-4', title: 'Fed funds rate below 4% by Q2 2025', category: 'Economics', deadline: '2025-06-30', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 55, no_probability: 45, volume: 980000, change_24h: 1.5, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 52, ai_winner: 'YES', status: 'Balanced', timestamp: '2024-12-05' } },
  { id: 8, source_event_id: 'evt-008', ticker: 'RECESSION-2025', title: 'US enters recession in 2025', category: 'Economics', deadline: '2025-12-31', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 28, no_probability: 72, volume: 650000, change_24h: -2.1, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 25, ai_winner: 'NO', status: 'Risk Zone', timestamp: '2024-12-05' } },
  { id: 9, source_event_id: 'evt-009', ticker: 'CPI-BELOW-3', title: 'CPI inflation below 3% by March 2025', category: 'Economics', deadline: '2025-03-31', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 68, no_probability: 32, volume: 420000, change_24h: 0.9, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 72, ai_winner: 'YES', status: 'Opportunity', timestamp: '2024-12-05' } },
  { id: 10, source_event_id: 'evt-010', ticker: 'UNEMPL-5', title: 'Unemployment rate exceeds 5%', category: 'Economics', deadline: '2025-06-30', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 22, no_probability: 78, volume: 380000, change_24h: 0.3, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 18, ai_winner: 'NO', status: 'Balanced', timestamp: '2024-12-05' } },

  // Crypto markets
  { id: 11, source_event_id: 'evt-011', ticker: 'BTC-100K', title: 'Bitcoin reaches $100,000', category: 'Crypto', deadline: '2024-12-31', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 75, no_probability: 25, volume: 3200000, change_24h: 5.8, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 82, ai_winner: 'YES', status: 'Opportunity', timestamp: '2024-12-05' } },
  { id: 12, source_event_id: 'evt-012', ticker: 'ETH-5K', title: 'Ethereum breaks $5,000', category: 'Crypto', deadline: '2025-03-31', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 58, no_probability: 42, volume: 1450000, change_24h: 2.1, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 62, ai_winner: 'YES', status: 'Opportunity', timestamp: '2024-12-05' } },
  { id: 13, source_event_id: 'evt-013', ticker: 'SOL-ETF', title: 'Solana ETF approved in 2025', category: 'Crypto', deadline: '2025-12-31', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 42, no_probability: 58, volume: 680000, change_24h: 1.2, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 38, ai_winner: 'NO', status: 'Balanced', timestamp: '2024-12-05' } },
  { id: 14, source_event_id: 'evt-014', ticker: 'XRP-SEC', title: 'XRP case fully resolved by Q1 2025', category: 'Crypto', deadline: '2025-03-31', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 35, no_probability: 65, volume: 520000, change_24h: -0.8, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 32, ai_winner: 'NO', status: 'Risk Zone', timestamp: '2024-12-05' } },
  { id: 15, source_event_id: 'evt-015', ticker: 'DOGE-1', title: 'Dogecoin reaches $1', category: 'Crypto', deadline: '2025-06-30', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 18, no_probability: 82, volume: 890000, change_24h: 3.5, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 15, ai_winner: 'NO', status: 'Risk Zone', timestamp: '2024-12-05' } },

  // Sports - Football
  { id: 16, source_event_id: 'evt-016', ticker: 'CHIEFS-SB', title: 'Chiefs win Super Bowl LIX', category: 'Sports', deadline: '2025-02-09', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 22, no_probability: 78, volume: 1200000, change_24h: 0.5, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 25, ai_winner: 'NO', status: 'Balanced', timestamp: '2024-12-05' } },
  { id: 17, source_event_id: 'evt-017', ticker: 'LIONS-NFC', title: 'Lions win NFC Championship', category: 'Sports', deadline: '2025-01-26', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 35, no_probability: 65, volume: 780000, change_24h: 2.8, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 42, ai_winner: 'NO', status: 'Opportunity', timestamp: '2024-12-05' } },
  { id: 18, source_event_id: 'evt-018', ticker: 'BILLS-AFC', title: 'Bills reach AFC Championship', category: 'Sports', deadline: '2025-01-26', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 55, no_probability: 45, volume: 620000, change_24h: 1.2, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 58, ai_winner: 'YES', status: 'Balanced', timestamp: '2024-12-05' } },
  { id: 19, source_event_id: 'evt-019', ticker: 'MVP-LAMAR', title: 'Lamar Jackson wins MVP', category: 'Sports', deadline: '2025-02-08', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 42, no_probability: 58, volume: 450000, change_24h: 1.8, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 45, ai_winner: 'NO', status: 'Balanced', timestamp: '2024-12-05' } },
  { id: 20, source_event_id: 'evt-020', ticker: 'RUSH-BARKLEY', title: 'Barkley leads NFL in rushing yards', category: 'Sports', deadline: '2025-01-05', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 68, no_probability: 32, volume: 380000, change_24h: 0.9, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 72, ai_winner: 'YES', status: 'Opportunity', timestamp: '2024-12-05' } },

  // Sports - Basketball
  { id: 21, source_event_id: 'evt-021', ticker: 'CELTICS-NBA', title: 'Celtics repeat as NBA Champions', category: 'Sports', deadline: '2025-06-15', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 28, no_probability: 72, volume: 920000, change_24h: -0.3, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 25, ai_winner: 'NO', status: 'Balanced', timestamp: '2024-12-05' } },
  { id: 22, source_event_id: 'evt-022', ticker: 'WEMBY-ROY', title: 'Wembanyama wins Defensive Player of Year', category: 'Sports', deadline: '2025-05-01', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 52, no_probability: 48, volume: 340000, change_24h: 1.5, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 58, ai_winner: 'YES', status: 'Opportunity', timestamp: '2024-12-05' } },
  { id: 23, source_event_id: 'evt-023', ticker: 'LEBRON-40K', title: 'LeBron reaches 50,000 career points', category: 'Sports', deadline: '2025-04-15', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 12, no_probability: 88, volume: 280000, change_24h: 0.2, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 8, ai_winner: 'NO', status: 'Risk Zone', timestamp: '2024-12-05' } },

  // Technology - AI
  { id: 24, source_event_id: 'evt-024', ticker: 'GPT-5', title: 'OpenAI releases GPT-5 by Q1 2025', category: 'Technology', deadline: '2025-03-31', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 45, no_probability: 55, volume: 580000, change_24h: 1.8, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 42, ai_winner: 'NO', status: 'Balanced', timestamp: '2024-12-05' } },
  { id: 25, source_event_id: 'evt-025', ticker: 'TSLA-FSD', title: 'Tesla achieves Level 4 autonomy approval', category: 'Technology', deadline: '2025-06-30', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 18, no_probability: 82, volume: 720000, change_24h: -1.2, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 15, ai_winner: 'NO', status: 'Risk Zone', timestamp: '2024-12-05' } },
  { id: 26, source_event_id: 'evt-026', ticker: 'AAPL-AR', title: 'Apple releases AR glasses in 2025', category: 'Technology', deadline: '2025-12-31', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 35, no_probability: 65, volume: 420000, change_24h: 0.5, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 32, ai_winner: 'NO', status: 'Balanced', timestamp: '2024-12-05' } },
  { id: 27, source_event_id: 'evt-027', ticker: 'NVDA-2T', title: 'NVIDIA reaches $2T market cap', category: 'Technology', deadline: '2025-06-30', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 72, no_probability: 28, volume: 1100000, change_24h: 2.5, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 78, ai_winner: 'YES', status: 'Opportunity', timestamp: '2024-12-05' } },
  { id: 28, source_event_id: 'evt-028', ticker: 'GOOG-GEMINI', title: 'Gemini Ultra surpasses GPT-4 benchmarks', category: 'Technology', deadline: '2025-03-31', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 55, no_probability: 45, volume: 380000, change_24h: 1.2, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 52, ai_winner: 'YES', status: 'Balanced', timestamp: '2024-12-05' } },

  // Entertainment
  { id: 29, source_event_id: 'evt-029', ticker: 'SWIFT-SB', title: 'Taylor Swift performs at Super Bowl', category: 'Entertainment', deadline: '2025-02-09', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 8, no_probability: 92, volume: 950000, change_24h: 0.3, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 5, ai_winner: 'NO', status: 'Risk Zone', timestamp: '2024-12-05' } },
  { id: 30, source_event_id: 'evt-030', ticker: 'OSCAR-OPPEN', title: 'Oppenheimer sweeps major Oscars', category: 'Entertainment', deadline: '2024-03-10', is_active: false, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 85, no_probability: 15, volume: 620000, change_24h: 2.1, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 88, ai_winner: 'YES', status: 'Opportunity', timestamp: '2024-12-05' } },
  { id: 31, source_event_id: 'evt-031', ticker: 'DISNEY-PLUS', title: 'Disney+ reaches 200M subscribers', category: 'Entertainment', deadline: '2025-06-30', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 38, no_probability: 62, volume: 280000, change_24h: -0.5, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 35, ai_winner: 'NO', status: 'Balanced', timestamp: '2024-12-05' } },
  { id: 32, source_event_id: 'evt-032', ticker: 'MARVEL-XMEN', title: 'X-Men reboot grosses $1B worldwide', category: 'Entertainment', deadline: '2025-12-31', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 58, no_probability: 42, volume: 320000, change_24h: 1.8, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 62, ai_winner: 'YES', status: 'Opportunity', timestamp: '2024-12-05' } },

  // Climate & Environment
  { id: 33, source_event_id: 'evt-033', ticker: 'HOTTEST-2024', title: '2024 becomes hottest year on record', category: 'Climate', deadline: '2024-12-31', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 92, no_probability: 8, volume: 450000, change_24h: 0.8, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 95, ai_winner: 'YES', status: 'Opportunity', timestamp: '2024-12-05' } },
  { id: 34, source_event_id: 'evt-034', ticker: 'HURR-MAJOR', title: 'Major hurricane hits US mainland 2025', category: 'Climate', deadline: '2025-11-30', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 78, no_probability: 22, volume: 380000, change_24h: 0.5, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 82, ai_winner: 'YES', status: 'Balanced', timestamp: '2024-12-05' } },
  { id: 35, source_event_id: 'evt-035', ticker: 'CA-DROUGHT', title: 'California declares drought emergency 2025', category: 'Climate', deadline: '2025-09-30', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 42, no_probability: 58, volume: 220000, change_24h: 1.2, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 38, ai_winner: 'NO', status: 'Balanced', timestamp: '2024-12-05' } },

  // World Events
  { id: 36, source_event_id: 'evt-036', ticker: 'UKR-CEASEFIRE', title: 'Ukraine-Russia ceasefire by mid-2025', category: 'World', deadline: '2025-06-30', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 28, no_probability: 72, volume: 890000, change_24h: 2.5, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 32, ai_winner: 'NO', status: 'Risk Zone', timestamp: '2024-12-05' } },
  { id: 37, source_event_id: 'evt-037', ticker: 'CHINA-TAIWAN', title: 'China military action against Taiwan 2025', category: 'World', deadline: '2025-12-31', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 8, no_probability: 92, volume: 720000, change_24h: -0.3, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 6, ai_winner: 'NO', status: 'Balanced', timestamp: '2024-12-05' } },
  { id: 38, source_event_id: 'evt-038', ticker: 'BREXIT-REJOIN', title: 'UK begins EU rejoin negotiations', category: 'World', deadline: '2025-12-31', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 12, no_probability: 88, volume: 420000, change_24h: 0.8, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 10, ai_winner: 'NO', status: 'Risk Zone', timestamp: '2024-12-05' } },
  { id: 39, source_event_id: 'evt-039', ticker: 'GAZA-PEACE', title: 'Gaza permanent ceasefire by Q2 2025', category: 'World', deadline: '2025-06-30', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 25, no_probability: 75, volume: 650000, change_24h: 1.2, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 22, ai_winner: 'NO', status: 'Risk Zone', timestamp: '2024-12-05' } },
  { id: 40, source_event_id: 'evt-040', ticker: 'NK-SUMMIT', title: 'US-North Korea summit in 2025', category: 'World', deadline: '2025-12-31', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 18, no_probability: 82, volume: 280000, change_24h: 0.5, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 15, ai_winner: 'NO', status: 'Balanced', timestamp: '2024-12-05' } },

  // Markets & Stocks
  { id: 41, source_event_id: 'evt-041', ticker: 'SPX-6000', title: 'S&P 500 closes above 6,000', category: 'Markets', deadline: '2024-12-31', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 82, no_probability: 18, volume: 1500000, change_24h: 1.8, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 85, ai_winner: 'YES', status: 'Opportunity', timestamp: '2024-12-05' } },
  { id: 42, source_event_id: 'evt-042', ticker: 'TSLA-500', title: 'Tesla stock reaches $500', category: 'Markets', deadline: '2025-06-30', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 38, no_probability: 62, volume: 980000, change_24h: 3.2, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 42, ai_winner: 'NO', status: 'Opportunity', timestamp: '2024-12-05' } },
  { id: 43, source_event_id: 'evt-043', ticker: 'GOLD-3K', title: 'Gold reaches $3,000 per ounce', category: 'Markets', deadline: '2025-12-31', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 55, no_probability: 45, volume: 620000, change_24h: 0.9, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 58, ai_winner: 'YES', status: 'Balanced', timestamp: '2024-12-05' } },
  { id: 44, source_event_id: 'evt-044', ticker: 'OIL-100', title: 'Oil price exceeds $100 per barrel', category: 'Markets', deadline: '2025-06-30', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 32, no_probability: 68, volume: 480000, change_24h: -1.5, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 28, ai_winner: 'NO', status: 'Risk Zone', timestamp: '2024-12-05' } },
  { id: 45, source_event_id: 'evt-045', ticker: 'DXY-DOWN', title: 'US Dollar Index falls below 100', category: 'Markets', deadline: '2025-03-31', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 45, no_probability: 55, volume: 380000, change_24h: 0.3, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 42, ai_winner: 'NO', status: 'Balanced', timestamp: '2024-12-05' } },

  // Health & Science
  { id: 46, source_event_id: 'evt-046', ticker: 'COVID-VAR', title: 'New COVID variant triggers WHO alert', category: 'Health', deadline: '2025-06-30', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 35, no_probability: 65, volume: 420000, change_24h: 0.8, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 32, ai_winner: 'NO', status: 'Balanced', timestamp: '2024-12-05' } },
  { id: 47, source_event_id: 'evt-047', ticker: 'ALZ-DRUG', title: 'FDA approves new Alzheimer\'s treatment', category: 'Health', deadline: '2025-12-31', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 62, no_probability: 38, volume: 280000, change_24h: 1.5, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 65, ai_winner: 'YES', status: 'Opportunity', timestamp: '2024-12-05' } },
  { id: 48, source_event_id: 'evt-048', ticker: 'MARS-SAMPLE', title: 'Mars sample return mission launches', category: 'Science', deadline: '2026-12-31', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 42, no_probability: 58, volume: 320000, change_24h: 0.5, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 38, ai_winner: 'NO', status: 'Risk Zone', timestamp: '2024-12-05' } },
  { id: 49, source_event_id: 'evt-049', ticker: 'FUSION-BREAK', title: 'Nuclear fusion achieves net energy gain', category: 'Science', deadline: '2025-12-31', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 28, no_probability: 72, volume: 380000, change_24h: 0.3, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 25, ai_winner: 'NO', status: 'Balanced', timestamp: '2024-12-05' } },
  { id: 50, source_event_id: 'evt-050', ticker: 'SPACEX-STARSHIP', title: 'SpaceX Starship completes orbital flight', category: 'Science', deadline: '2025-06-30', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 78, no_probability: 22, volume: 520000, change_24h: 2.1, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 82, ai_winner: 'YES', status: 'Opportunity', timestamp: '2024-12-05' } },

  // Sports - Soccer
  { id: 51, source_event_id: 'evt-051', ticker: 'MAN-CITY-PL', title: 'Man City wins Premier League 2024-25', category: 'Sports', deadline: '2025-05-25', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 32, no_probability: 68, volume: 680000, change_24h: -2.5, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 28, ai_winner: 'NO', status: 'Risk Zone', timestamp: '2024-12-05' } },
  { id: 52, source_event_id: 'evt-052', ticker: 'MESSI-RETIRE', title: 'Messi announces retirement in 2025', category: 'Sports', deadline: '2025-12-31', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 25, no_probability: 75, volume: 420000, change_24h: 0.8, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 22, ai_winner: 'NO', status: 'Balanced', timestamp: '2024-12-05' } },
  { id: 53, source_event_id: 'evt-053', ticker: 'REAL-UCL', title: 'Real Madrid wins Champions League', category: 'Sports', deadline: '2025-05-31', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 28, no_probability: 72, volume: 580000, change_24h: 1.2, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 32, ai_winner: 'NO', status: 'Balanced', timestamp: '2024-12-05' } },

  // Business & Mergers
  { id: 54, source_event_id: 'evt-054', ticker: 'TIKTOK-BAN', title: 'TikTok banned in US by Q2 2025', category: 'Business', deadline: '2025-06-30', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 45, no_probability: 55, volume: 920000, change_24h: 3.5, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 48, ai_winner: 'NO', status: 'Balanced', timestamp: '2024-12-05' } },
  { id: 55, source_event_id: 'evt-055', ticker: 'META-THREADS', title: 'Threads reaches 500M users', category: 'Business', deadline: '2025-06-30', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 58, no_probability: 42, volume: 380000, change_24h: 1.8, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 62, ai_winner: 'YES', status: 'Opportunity', timestamp: '2024-12-05' } },
  { id: 56, source_event_id: 'evt-056', ticker: 'MSFT-ACT', title: 'Microsoft Activision deal fully approved', category: 'Business', deadline: '2024-12-31', is_active: false, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 95, no_probability: 5, volume: 480000, change_24h: 0.5, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 98, ai_winner: 'YES', status: 'Opportunity', timestamp: '2024-12-05' } },
  { id: 57, source_event_id: 'evt-057', ticker: 'AMZN-SPLIT', title: 'Amazon announces stock split', category: 'Business', deadline: '2025-12-31', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 22, no_probability: 78, volume: 320000, change_24h: 0.3, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 18, ai_winner: 'NO', status: 'Risk Zone', timestamp: '2024-12-05' } },

  // More Crypto
  { id: 58, source_event_id: 'evt-058', ticker: 'BTC-150K', title: 'Bitcoin reaches $150,000 in 2025', category: 'Crypto', deadline: '2025-12-31', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 42, no_probability: 58, volume: 1800000, change_24h: 4.2, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 45, ai_winner: 'NO', status: 'Opportunity', timestamp: '2024-12-05' } },
  { id: 59, source_event_id: 'evt-059', ticker: 'ETH-FLIP', title: 'Ethereum flips Bitcoin market cap', category: 'Crypto', deadline: '2025-12-31', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 8, no_probability: 92, volume: 580000, change_24h: 0.5, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 5, ai_winner: 'NO', status: 'Risk Zone', timestamp: '2024-12-05' } },
  { id: 60, source_event_id: 'evt-060', ticker: 'CBDC-US', title: 'US launches digital dollar pilot', category: 'Crypto', deadline: '2025-12-31', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 18, no_probability: 82, volume: 420000, change_24h: -0.8, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 15, ai_winner: 'NO', status: 'Balanced', timestamp: '2024-12-05' } },

  // More Politics
  { id: 61, source_event_id: 'evt-061', ticker: 'SCOTUS-EXPAND', title: 'Supreme Court expansion bill passes', category: 'Politics', deadline: '2025-12-31', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 5, no_probability: 95, volume: 280000, change_24h: 0.2, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 3, ai_winner: 'NO', status: 'Balanced', timestamp: '2024-12-05' } },
  { id: 62, source_event_id: 'evt-062', ticker: 'DESANTIS-2028', title: 'DeSantis runs for President 2028', category: 'Politics', deadline: '2028-01-01', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 65, no_probability: 35, volume: 380000, change_24h: 0.8, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 68, ai_winner: 'YES', status: 'Balanced', timestamp: '2024-12-05' } },
  { id: 63, source_event_id: 'evt-063', ticker: 'DEBT-CEILING', title: 'US debt ceiling crisis in 2025', category: 'Politics', deadline: '2025-12-31', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 55, no_probability: 45, volume: 520000, change_24h: 1.5, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 58, ai_winner: 'YES', status: 'Opportunity', timestamp: '2024-12-05' } },

  // More Tech
  { id: 64, source_event_id: 'evt-064', ticker: 'AAPL-4T', title: 'Apple reaches $4T market cap', category: 'Technology', deadline: '2025-12-31', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 48, no_probability: 52, volume: 720000, change_24h: 1.2, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 52, ai_winner: 'YES', status: 'Opportunity', timestamp: '2024-12-05' } },
  { id: 65, source_event_id: 'evt-065', ticker: 'X-IPO', title: 'X (Twitter) goes public again', category: 'Technology', deadline: '2025-12-31', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 25, no_probability: 75, volume: 450000, change_24h: 0.5, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 22, ai_winner: 'NO', status: 'Risk Zone', timestamp: '2024-12-05' } },
  { id: 66, source_event_id: 'evt-066', ticker: 'OPENAI-IPO', title: 'OpenAI announces IPO plans', category: 'Technology', deadline: '2025-12-31', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 35, no_probability: 65, volume: 580000, change_24h: 2.1, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 38, ai_winner: 'NO', status: 'Balanced', timestamp: '2024-12-05' } },

  // More Entertainment
  { id: 67, source_event_id: 'evt-067', ticker: 'GTA-6', title: 'GTA 6 releases in 2025', category: 'Entertainment', deadline: '2025-12-31', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 72, no_probability: 28, volume: 1200000, change_24h: 0.8, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 75, ai_winner: 'YES', status: 'Opportunity', timestamp: '2024-12-05' } },
  { id: 68, source_event_id: 'evt-068', ticker: 'BEYONCE-TOUR', title: 'Beyoncé announces new world tour', category: 'Entertainment', deadline: '2025-06-30', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 55, no_probability: 45, volume: 320000, change_24h: 1.5, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 58, ai_winner: 'YES', status: 'Balanced', timestamp: '2024-12-05' } },
  { id: 69, source_event_id: 'evt-069', ticker: 'NETFLIX-ADS', title: 'Netflix ad tier reaches 50M subscribers', category: 'Entertainment', deadline: '2025-06-30', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 68, no_probability: 32, volume: 280000, change_24h: 0.9, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 72, ai_winner: 'YES', status: 'Opportunity', timestamp: '2024-12-05' } },

  // More Sports
  { id: 70, source_event_id: 'evt-070', ticker: 'OHTANI-MVP', title: 'Ohtani wins NL MVP', category: 'Sports', deadline: '2024-11-21', is_active: false, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 92, no_probability: 8, volume: 680000, change_24h: 1.2, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 95, ai_winner: 'YES', status: 'Opportunity', timestamp: '2024-12-05' } },
  { id: 71, source_event_id: 'evt-071', ticker: 'DODGERS-WS', title: 'Dodgers win World Series 2025', category: 'Sports', deadline: '2025-11-01', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 18, no_probability: 82, volume: 420000, change_24h: 0.5, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 22, ai_winner: 'NO', status: 'Balanced', timestamp: '2024-12-05' } },
  { id: 72, source_event_id: 'evt-072', ticker: 'UFC-JON', title: 'Jon Jones defends heavyweight title', category: 'Sports', deadline: '2025-06-30', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 62, no_probability: 38, volume: 380000, change_24h: 1.8, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 68, ai_winner: 'YES', status: 'Opportunity', timestamp: '2024-12-05' } },

  // Additional varied events
  { id: 73, source_event_id: 'evt-073', ticker: 'FED-POWELL', title: 'Powell reappointed as Fed Chair', category: 'Economics', deadline: '2025-02-28', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 15, no_probability: 85, volume: 520000, change_24h: 2.5, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 12, ai_winner: 'NO', status: 'Risk Zone', timestamp: '2024-12-05' } },
  { id: 74, source_event_id: 'evt-074', ticker: 'WNBA-CLARK', title: 'Caitlin Clark wins WNBA MVP', category: 'Sports', deadline: '2025-09-30', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 35, no_probability: 65, volume: 280000, change_24h: 0.8, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 38, ai_winner: 'NO', status: 'Balanced', timestamp: '2024-12-05' } },
  { id: 75, source_event_id: 'evt-075', ticker: 'AI-JOBS', title: 'AI displaces 5M+ US jobs in 2025', category: 'Technology', deadline: '2025-12-31', is_active: true, created_at: '2024-01-01', updated_at: '2024-12-05', market_data: { yes_probability: 22, no_probability: 78, volume: 380000, change_24h: 0.5, timestamp: '2024-12-05' }, ai_prediction: { ai_yes_probability: 18, ai_winner: 'NO', status: 'Balanced', timestamp: '2024-12-05' } },
];

const DUMMY_CATEGORIES: string[] = [
  'Politics',
  'Economics',
  'Crypto',
  'Sports',
  'Technology',
  'Entertainment',
  'Climate',
  'World',
  'Markets',
  'Health',
  'Science',
  'Business',
];


export function DashboardPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [categories, setCategories] = useState<string[]>(DUMMY_CATEGORIES);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const loadEvents = () => {
    setLoading(true);

    // Simulate loading delay for better UX
    setTimeout(() => {
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
      setLoading(false);
    }, 300);
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
          </div>
          <p className="text-foreground-muted">
            Prediction market events with AI-powered analysis.
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
