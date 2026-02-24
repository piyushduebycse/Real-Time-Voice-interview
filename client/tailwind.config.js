/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#1E40AF',
                    light: '#EEF0FF',
                },
                accent: '#FF6584',
                success: '#43D9AD',
                warning: '#FFB347',
                danger: '#FF6B6B',
                neutral: {
                    100: '#F7F8FC',
                    200: '#EAECF5',
                    700: '#4A4E69',
                    900: '#1A1B2E',
                },
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Sora', 'sans-serif'],
            },
            boxShadow: {
                'card': '0 4px 24px rgba(108, 99, 255, 0.08)',
                'input': '0 2px 8px rgba(0, 0, 0, 0.06)',
            },
            borderRadius: {
                'xl': '12px',
                '2xl': '16px',
            },
            keyframes: {
                sonar: {
                    '0%': { transform: 'scale(0.8)', opacity: '0.6' },
                    '100%': { transform: 'scale(1.4)', opacity: '0' },
                }
            },
            animation: {
                sonar: 'sonar 2s ease-out infinite',
            }
        },
    },
    plugins: [],
}
