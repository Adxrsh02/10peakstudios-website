/** 10PeakStudio Tailwind CSS theme extension (Tailwind v3 config; for v4 use 10PeakStudio_tokens.css with @theme). */
module.exports = {
  theme: {
    extend: {
      colors: {
        'peak-violet': '#8E21FC',
        'deep-violet': '#480BB4',
        'lilac-spark': '#A743F8',
        'glow-violet': '#5B10E0',
        'obsidian': '#000000',
        'ink': '#14111E',
        'slate-lavender': '#8D8CA4',
        'mist': '#D7D6E1',
        'summit-white': '#FCFCFC',
      },
      fontFamily: {
        heading: ['Sora', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'Menlo', 'Consolas', 'monospace'],
      },
      fontSize: {
        'display': ['4.5rem', { lineHeight: '5rem', letterSpacing: '-0.02em', fontWeight: '700' }],
        'h1': ['3.5rem', { lineHeight: '4rem', letterSpacing: '-0.02em', fontWeight: '700' }],
        'h2': ['2.75rem', { lineHeight: '3.25rem', letterSpacing: '-0.015em', fontWeight: '600' }],
        'h3': ['2.125rem', { lineHeight: '2.625rem', letterSpacing: '-0.01em', fontWeight: '600' }],
        'h4': ['1.625rem', { lineHeight: '2.125rem', letterSpacing: '-0.005em', fontWeight: '600' }],
        'h5': ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '0em', fontWeight: '600' }],
        'body-large': ['1.125rem', { lineHeight: '1.875rem', letterSpacing: '0em', fontWeight: '400' }],
        'body': ['1rem', { lineHeight: '1.625rem', letterSpacing: '0em', fontWeight: '400' }],
        'small': ['0.875rem', { lineHeight: '1.375rem', letterSpacing: '0.005em', fontWeight: '400' }],
        'caption': ['0.75rem', { lineHeight: '1.125rem', letterSpacing: '0.01em', fontWeight: '500' }],
        'code': ['0.875rem', { lineHeight: '1.375rem', letterSpacing: '0em', fontWeight: '400' }],
      },
      backgroundImage: {
        'band': 'linear-gradient(196deg, #9725FC 0%, #9122FC 50%, #8014FB 100%)',
        'arrow-rise': 'linear-gradient(90deg, #480BB4 0%, #6617EA 25%, #8F31F9 60%, #A743F8 100%)',
        'summit-light': 'linear-gradient(141deg, #FCFCFC 0%, #E9E9EF 40%, #D7D6E1 60%, #8D8CA4 100%)',
      },
      boxShadow: {
        glow: '0 0 48px rgb(91 16 224 / 0.35)',
      },
    },
  },
};
