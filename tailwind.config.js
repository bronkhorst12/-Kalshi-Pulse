/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				// Ocean Depths Theme - Light Mode
				background: {
					DEFAULT: '#f8fafb',
					secondary: '#f1f5f8',
					tertiary: '#e8eef3',
				},
				foreground: {
					DEFAULT: '#1a2332',
					muted: '#5a6a7a',
					dim: '#8899a8',
				},
				// Ocean Depths Accent colors (adjusted for light mode)
				ocean: {
					teal: '#2d8b8b',
					seafoam: '#457b7b',
					deep: '#1a2332',
					coral: '#d4685a',
				},
				// Status colors - adjusted for light mode contrast
				status: {
					opportunity: '#1d7373',
					balanced: '#3d7a8c',
					risk: '#c4574a',
				},
				// UI elements
				border: '#d1dbe5',
				card: {
					DEFAULT: '#ffffff',
					hover: '#f1f5f8',
				},
				// Legacy support mapped to Ocean Depths Light
				primary: {
					DEFAULT: '#2d8b8b',
					foreground: '#ffffff',
				},
				secondary: {
					DEFAULT: '#457b7b',
					foreground: '#ffffff',
				},
				muted: {
					DEFAULT: '#e8eef3',
					foreground: '#5a6a7a',
				},
				destructive: {
					DEFAULT: '#c4574a',
					foreground: '#ffffff',
				},
			},
			borderRadius: {
				lg: '0.75rem',
				md: '0.5rem',
				sm: '0.25rem',
			},
			fontFamily: {
				sans: ['Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
				mono: ['JetBrains Mono', 'monospace'],
			},
			keyframes: {
				'pulse-glow': {
					'0%, 100%': { 
						boxShadow: '0 0 5px rgba(45, 139, 139, 0.2), 0 0 10px rgba(45, 139, 139, 0.08)' 
					},
					'50%': { 
						boxShadow: '0 0 15px rgba(45, 139, 139, 0.35), 0 0 30px rgba(45, 139, 139, 0.15)' 
					},
				},
				'wave': {
					'0%, 100%': { transform: 'translateY(0) scaleY(1)' },
					'50%': { transform: 'translateY(-5px) scaleY(1.02)' },
				},
				'data-flow': {
					'0%': { transform: 'translateY(0)', opacity: '0.5' },
					'50%': { opacity: '1' },
					'100%': { transform: 'translateY(-100%)', opacity: '0' },
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				'ripple': {
					'0%': { transform: 'scale(1)', opacity: '0.4' },
					'100%': { transform: 'scale(1.5)', opacity: '0' },
				},
				'float-up': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-8px)' },
				},
				'shimmer': {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' },
				},
				'glow-breathe': {
					'0%, 100%': { filter: 'drop-shadow(0 0 2px rgba(45,139,139,0.4))' },
					'50%': { filter: 'drop-shadow(0 0 12px rgba(45,139,139,0.8))' },
				},
				'rise-up': {
					'0%': { opacity: '0', transform: 'translateY(30px) scale(0.95)' },
					'100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
				},
				'emerge': {
					'0%': { opacity: '0', transform: 'scale(0.9)', filter: 'blur(4px)' },
					'100%': { opacity: '1', transform: 'scale(1)', filter: 'blur(0)' },
				},
				'cascade': {
					'0%': { opacity: '0', transform: 'translateX(-20px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' },
				},
				'bob': {
					'0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
					'25%': { transform: 'translateY(-4px) rotate(1deg)' },
					'75%': { transform: 'translateY(4px) rotate(-1deg)' },
				},
				'underline-grow': {
					'0%': { transform: 'scaleX(0)', transformOrigin: 'left' },
					'100%': { transform: 'scaleX(1)', transformOrigin: 'left' },
				},
			},
			animation: {
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				'wave': 'wave 3s ease-in-out infinite',
				'data-flow': 'data-flow 3s linear infinite',
				'fade-in': 'fade-in 0.5s ease-out forwards',
				'ripple': 'ripple 2s ease-out infinite',
				'float-up': 'float-up 3s ease-in-out infinite',
				'shimmer': 'shimmer 3s ease-in-out infinite',
				'glow-breathe': 'glow-breathe 2s ease-in-out infinite',
				'rise-up': 'rise-up 0.6s ease-out forwards',
				'emerge': 'emerge 0.5s ease-out forwards',
				'cascade': 'cascade 0.4s ease-out forwards',
				'bob': 'bob 4s ease-in-out infinite',
				'underline-grow': 'underline-grow 0.3s ease-out forwards',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'grid-pattern': 'linear-gradient(rgba(45,139,139,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(45,139,139,0.06) 1px, transparent 1px)',
				'ocean-gradient': 'linear-gradient(180deg, #f8fafb 0%, #f1f5f8 50%, #e8eef3 100%)',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
}
