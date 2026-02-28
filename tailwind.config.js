/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
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
				// 主色调 - 深邃夜空
				primary: {
					DEFAULT: '#0f0f23',
					light: '#1a1a3e',
					foreground: '#f8fafc',
				},
				// 强调色 - 紫罗兰渐变
				accent: {
					DEFAULT: '#7c3aed',
					light: '#a78bfa',
					foreground: '#f8fafc',
				},
				// 辅助色
				success: '#10b981',
				warning: '#f59e0b',
				error: '#ef4444',
				// 中性色
				surface: {
					DEFAULT: '#16162a',
					elevated: '#1e1e3f',
				},
				border: '#2d2d5a',
				input: '#2d2d5a',
				ring: '#7c3aed',
				// 文字颜色
				foreground: '#f8fafc',
				'text-primary': '#f8fafc',
				'text-secondary': '#94a3b8',
				'text-muted': '#64748b',
				// 卡片和弹出层
				card: {
					DEFAULT: '#16162a',
					foreground: '#f8fafc',
				},
				popover: {
					DEFAULT: '#1e1e3f',
					foreground: '#f8fafc',
				},
				muted: {
					DEFAULT: '#1e1e3f',
					foreground: '#94a3b8',
				},
				secondary: {
					DEFAULT: '#1e1e3f',
					foreground: '#f8fafc',
				},
				destructive: {
					DEFAULT: '#ef4444',
					foreground: '#f8fafc',
				},
			},
			fontFamily: {
				sans: ['DM Sans', 'system-ui', 'sans-serif'],
				display: ['Outfit', 'system-ui', 'sans-serif'],
				mono: ['JetBrains Mono', 'monospace'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			boxShadow: {
				'card': '0 4px 20px rgba(0, 0, 0, 0.3)',
				'glow': '0 0 30px rgba(124, 58, 237, 0.3)',
				'glow-lg': '0 0 50px rgba(124, 58, 237, 0.4)',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-accent': 'linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)',
				'gradient-dark': 'linear-gradient(135deg, #0f0f23 0%, #1a1a3e 100%)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				},
				'pulse-glow': {
					'0%, 100%': { boxShadow: '0 0 20px rgba(124, 58, 237, 0.3)' },
					'50%': { boxShadow: '0 0 40px rgba(124, 58, 237, 0.5)' },
				},
				'slide-up': {
					from: { opacity: 0, transform: 'translateY(20px)' },
					to: { opacity: 1, transform: 'translateY(0)' },
				},
				'slide-in': {
					from: { opacity: 0, transform: 'translateX(-20px)' },
					to: { opacity: 1, transform: 'translateX(0)' },
				},
				'fade-in': {
					from: { opacity: 0 },
					to: { opacity: 1 },
				},
				'wave': {
					'0%, 100%': { transform: 'scaleY(0.5)' },
					'50%': { transform: 'scaleY(1)' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				'slide-up': 'slide-up 0.5s ease-out',
				'slide-in': 'slide-in 0.5s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'wave': 'wave 1s ease-in-out infinite',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
}
