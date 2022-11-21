module.exports = {
  darkMode: 'class',
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      fontSize: {
        xxs: '.5rem',
      },
      width: {
        '100px': '100px',
        '200px': '200px',
        '300px': '300px',
        'horizontal-list': 'calc(100vw - 304px)',
      },
      height: {
        '200px': '200px',
      },
      maxWidth: {
        '64px': '64px',
        '120px': '120px',
        '140px': '140px',
        '260px': '260px',
        '200px': '200px',
      },
      minWidth: {
        '32px': '32px',
        '140px': '140px',
        '200px': '200px',
      },
      gridTemplateColumns: {
        'phone-header': '32px 1fr',
        'phone-layout': 'repeat(1, minmax(0, 1fr))',
        layout: '240px 1fr',
        header: '32px 1fr 1fr',
      },
      gridTemplateRows: {
        'phone-layout': 'calc(100vh - 180px) 100px 80px',
        layout: 'calc(100vh - 96px) 96px',
        'large-layout': 'calc(100vh - 48px) 48px',
      },
    },
  },
  plugins: [],
};
