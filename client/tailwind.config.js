// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // content는 필요한 경로로 설정
  theme: {
    extend: {
      fontFamily: {
        'lilita': ['Lilita One', 'sans-serif'], // 'Lilita One' 폰트를 'lilita'라는 이름으로 추가
      },
      flexGrow: {
        2: '2',   // flex-2
        3: '3',   // flex-3
        4: '4',   // flex-4
        5: '5',   // flex-5
        6: '6',   // flex-6
        7: '7',   // flex-7
        8: '8',   // flex-8
        9: '9',   // flex-9
        10: '10', // flex-10
      },
      gridTemplateColumns: {
        // 기본 화면 크기에서 1fr을 사용
        'minmax-1': 'minmax(150px, 1fr) 1fr 1fr', // 기본 3열 레이아웃
        // sm 이상에서 이 그리드 설정을 적용
        'sm-minmax': 'minmax(150px, 1fr) repeat(8, 1fr)', // 640px 이상에서 적용될 레이아웃
      },
      fontSize: {
        1: "1rem",
        2: "2rem",
        3: "3rem",
        4: "4rem",
        5: "5rem",
        6: "6rem",
        7: "7rem",
        8: "8rem",
        9: "9rem",
      },
    },
    variants: {
      extend: {
        flexGrow: ['responsive', 'hover', 'focus'],
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
