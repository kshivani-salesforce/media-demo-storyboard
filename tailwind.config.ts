import type { Config } from 'tailwindcss';

// Salesforce DMS palette (Night mode), lifted from the hosted design tokens:
// Electric Blue #066AFE on Electric-Blue navies (#001642 ground, #001E5B
// surface). Token NAMES are unchanged from the prior editorial system so no
// component needs to change, only the values move to Salesforce blue. There
// is no customer-purple nod here: Nine is a wordmark co-brand, so the whole
// system stays on Salesforce Electric Blue.
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        // Light mode (kept for the architecture surface). Cool blue-tinted
        // paper so the white band cards still sit on a Salesforce ground.
        light: {
          canvas: '#eef4ff',
          card: '#ffffff',
          surface: '#e2ecff',
          ink: '#001e5b',
          inkMuted: '#5b6592'
        },
        // Dark mode = Salesforce Night. Layers from canvas (background-1) to
        // surface (surface-1) to a lifted step, all Electric-Blue navies.
        // Ink is white (Night headline/body); muted is a cloud-blue grey.
        dark: {
          canvas: '#001642',   // --color-electric-blue-10 (background-1)
          surface: '#001e5b',  // --color-electric-blue-15 (surface-1)
          surfaceLift: '#002775', // --color-electric-blue-20
          border: '#1c3a7a',   // cloud-blue-tinted hairline on navy
          ink: '#ffffff',
          inkMuted: '#a8cbff'  // cloud-blue muted ink
        },
        // Electric Blue: the dominant accent. 500 is the on-brand core
        // (#066AFE); 400 a lighter step for glows; 200/50 cloud-blue tints for
        // text-on-navy; 700 the deep gradient/pressed end (#022AC0 → #002775).
        phos: {
          50:  '#eaf5fe',
          200: '#a8cbff',
          400: '#3d8bfe',
          500: '#066afe',
          700: '#022ac0'
        },
        // Stage-specific accents, all shifted into the Electric-Blue family so
        // the system reads as one Salesforce blue, differentiated by lightness
        // rather than hue.
        stage: {
          discover: '#a8cbff', // cloud blue
          plan:     '#5ea0fe', // sky
          launch:   '#066afe', // electric blue (apex)
          monitor:  '#3d8bfe', // mid blue
          optimise: '#7fb2fe'  // soft blue
        },
        // Legacy "sf" tokens, re-pointed to Electric Blue so any surface still
        // using them stays on-brand.
        sf: {
          cobalt: '#066afe',
          cobaltDeep: '#001642',
          coral: '#5ea0fe',
          peach: '#7fb2fe',
          gold: '#a8cbff',
          pink: '#5ea0fe',
          sky: '#3d8bfe',
          purple: '#066afe'
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
        // Electric-Blue highlight sweep: light sky → electric blue → deep cobalt.
        'sf-highlight':
          'linear-gradient(90deg, #3d8bfe 0%, #066afe 55%, #022ac0 100%)',
        'sf-light-wash':
          'radial-gradient(circle at 15% 0%, #eaf5fe 0%, #eef4ff 35%, #ffffff 70%)',
        // Salesforce Night ground with a single electric-blue bloom in the
        // centre and a cloud-blue counter-bloom in the upper right. Two-source
        // lighting reads more intentional than a single radial gradient.
        'sf-dark-wash': [
          'radial-gradient(ellipse 1100px 700px at 50% 55%, rgba(6,106,254,0.16) 0%, rgba(61,139,254,0.06) 35%, rgba(0,15,50,0) 70%)',
          'radial-gradient(ellipse 700px 500px at 90% 0%, rgba(168,203,255,0.08) 0%, rgba(0,15,50,0) 60%)',
          'linear-gradient(180deg, #000f32 0%, #001642 50%, #000f32 100%)'
        ].join(', ')
      },
      borderRadius: {
        // Salesforce DMS radius scale (default variant).
        card: '12px',
        input: '4px'
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
