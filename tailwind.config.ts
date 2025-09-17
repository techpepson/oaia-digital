
// OAIA Digital - Tailwind CSS Configuration
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#003366',
					foreground: '#FFFFFF'
				},
				secondary: {
					DEFAULT: '#FF6B35',
					foreground: '#FFFFFF'
				},
				success: {
					DEFAULT: '#059669',
					foreground: '#FFFFFF'
				},
				warning: {
					DEFAULT: '#D97706',
					foreground: '#FFFFFF'
				},
				destructive: {
					DEFAULT: '#DC2626',
					foreground: '#FFFFFF'
				},
				muted: {
					DEFAULT: '#F3F4F6',
					foreground: '#6B7280'
				},
				accent: {
					DEFAULT: '#F3F4F6',
					foreground: '#1E40AF'
				},
				popover: {
					DEFAULT: '#FFFFFF',
					foreground: '#1F2937'
				},
				card: {
					DEFAULT: '#FFFFFF',
					foreground: '#1F2937'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				oaia: {
					blue: '#003366',
					orange: '#FF6B35',
					green: '#28A745',
					gray: '#495057',
					light: '#F8F9FA',
					primary: '#003366',
					secondary: '#FF6B35',
					accent: '#28A745'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
