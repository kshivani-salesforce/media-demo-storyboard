import type { Config } from 'tailwindcss';

// Editorial-tech palette. Single dominant warm amber accent with a small
// family of cool tones used as quiet stage hues. No rainbow.
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        // Light mode (kept for the architecture surface)
        light: {
          canvas: '#f4f1ff',
          card: '#ffffff',
          surface: '#eceaff',
          ink: '#0c1339',
          inkMuted: '#5b6592'
        },
        // Dark mode, editorial. Inky midnight ground, deeper than the prior
        // generic purple. Layers from canvas (paper) to surface to surface
        // lifted, all in the same temperature.
        dark: {
          canvas: '#070a1a',
          surface: '#0d1230',
          surfaceLift: '#161c40',
          border: '#222a55',
          ink: '#f5f0e1',
          inkMuted: '#9098b8'
        },
        // Warm phosphor: the only "hot" accent in the system. Used for
        // primary glow, the apex stage (Launch), and gradient-text highlights.
        phos: {
          50:  '#fff8e3',
          200: '#fce39a',
          400: '#f5c76a',
          500: '#f0b400',
          700: '#b87600'
        },
        // Stage-specific accents. Tonally related (all on the warm-cool
        // editorial spectrum), differentiated more by typography than colour.
        stage: {
          discover: '#6ee7c7', // mint-teal
          plan:     '#b79dec', // lilac
          launch:   '#f0b400', // apex amber
          monitor:  '#fb7185', // rose
          optimise: '#f97583'  // coral
        },
        // Legacy "sf" tokens kept so other surfaces keep working until they
        // get re-skinned in their own pass.
        sf: {
          cobalt: '#0d61f2',
          cobaltDeep: '#032d60',
          coral: '#ff6b6b',
          peach: '#ff9966',
          gold: '#f0b400',
          pink: '#fb7185',
          sky: '#5b8def',
          purple: '#a06cd5'
        }
      },
      fontFamily: {
        // Matched to the agentic-ad-sales-specs storyboard: Inter carries both
        // display and body (weights to 800 for the heavy headlines). Wider and
        // more open than DM Sans, so the copy stops reading squished.
        display: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace']
      },
      backgroundImage: {
        'sf-highlight':
          'linear-gradient(90deg, #f0b400 0%, #fb7185 60%, #b79dec 100%)',
        'sf-light-wash':
          'radial-gradient(circle at 15% 0%, #efe9ff 0%, #f4f1ff 35%, #ffffff 70%)',
        // Inky background with a single warm bloom in the centre and a cool
        // counter-bloom in the upper right. Two-source lighting reads more
        // intentional than a single radial gradient.
        'sf-dark-wash': [
          'radial-gradient(ellipse 1100px 700px at 50% 55%, rgba(240,180,0,0.08) 0%, rgba(183,157,236,0.04) 35%, rgba(7,10,26,0) 70%)',
          'radial-gradient(ellipse 700px 500px at 90% 0%, rgba(110,231,199,0.05) 0%, rgba(7,10,26,0) 60%)',
          'linear-gradient(180deg, #060914 0%, #070a1a 50%, #060914 100%)'
        ].join(', ')
      },
      boxShadow: {
        'sf-card':
          '0 24px 48px -16px rgba(12,19,57,0.12), 0 4px 12px -2px rgba(12,19,57,0.06)',
        'sf-tile': '0 30px 60px -20px rgba(0,0,0,0.65)',
        'editorial':
          '0 1px 0 rgba(245,240,225,0.04) inset, 0 24px 48px -16px rgba(0,0,0,0.6), 0 4px 12px -2px rgba(0,0,0,0.4)'
      },
      // Custom easing. The built-in CSS curves are too weak to read as
      // intentional; these are the stronger ease-out / ease-in-out variants
      // used on the lifecycle state transitions. Never ease-in on UI.
      transitionTimingFunction: {
        'out-strong': 'cubic-bezier(0.23, 1, 0.32, 1)',
        'in-out-strong': 'cubic-bezier(0.77, 0, 0.175, 1)'
      },
      animation: {
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        'slide-up': 'slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'orbit-dash': 'orbitDash 14s linear infinite',
        'breathe': 'breathe 4.5s ease-in-out infinite'
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' }
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' }
        },
        orbitDash: {
          to: { strokeDashoffset: '-200' }
        },
        breathe: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.65', transform: 'scale(1.04)' }
        }
      }
    }
  },
  plugins: []
};

export default config;
