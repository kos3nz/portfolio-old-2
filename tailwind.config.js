const twDefaultTheme = require('tailwindcss/defaultTheme');
const twColors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports =
  {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
      /* Override default theme */
      screens: {
        xs: '450px',
        ...twDefaultTheme.screens,
      },

      /* Extend default theme */
      extend: {
        fontFamily: {
          lato: ['Lato', ...twDefaultTheme.fontFamily.sans],
          inter: ['Inter', ...twDefaultTheme.fontFamily.sans],
        },
        boxShadow: {
          gradient: `
          -80vw -18px 28px 0px ${twColors.red[400]},
          -60vw -18px 28px 0px ${twColors.orange[400]},
          -40vw -18px 28px 0px ${twColors.yellow[400]},
          -20vw -18px 28px 0px ${twColors.lime[400]},
          0 -18px 28px 0px ${twColors.emerald[400]},
          20vw -18px 28px 0px ${twColors.teal[400]},
          40vw -18px 28px 0px ${twColors.cyan[400]},
          60vw -18px 28px 0px ${twColors.indigo[400]},
          60vw -18px 28px 0px ${twColors.violet[400]}
          `,
        },
        animation: {
          scaleY: 'scaleY 1.2s ease-in-out infinite var(--order)',
        },
        keyframes: {
          scaleY: {
            '0%, 60%, 100%': { transform: 'scaleY(0.1)' },
            '30%': { transform: 'scaleY(1.0)' },
          },
        },
        typography: (theme) => ({
          DEFAULT: {
            css: {
              'h1,h2,h3,h4': {
                'scroll-margin-top': twDefaultTheme.spacing[28],
              },
              thead: {
                borderBottomColor: theme('colors.slate.200'),
              },
              'blockquote p:first-of-type::before': false,
              'blockquote p:last-of-type::after': false,
              // Variables
              '--tw-prose-quote-borders': theme('colors.slate[400]'),
            },
          },
        }),
      },
    },
    plugins: [require('@tailwindcss/typography'), require('daisyui')],
    daisyui: {
      themes: [
        {
          light: {
            ...require('daisyui/src/colors/themes')['[data-theme=lemonade]'],
            primary: twColors.teal[600],
            secondary: twColors.yellow[600],
            accent: twColors.sky[600],
          },
        },
        {
          dark: {
            ...require('daisyui/src/colors/themes')['[data-theme=business]'],
            primary: twColors.teal[400],
            secondary: twColors.yellow[400],
            accent: twColors.sky[400],
          },
        },
      ],
      prefix: 'daisy-',
      darkTheme: 'dark',
    },
  };
