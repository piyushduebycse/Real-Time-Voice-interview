import { motion } from 'framer-motion';

export const ProgressRing = ({ score, size = 120 }) => {
    const radius = (size - 16) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 10) * circumference;
    const color = score >= 8 ? '#43D9AD' : score >= 5 ? '#FFB347' : '#FF6B6B';
    return (
        <svg width={size} height={size}>
            <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#EAECF5" strokeWidth={8} />
            <motion.circle cx={size / 2} cy={size / 2} r={radius} fill="none"
                stroke={color} strokeWidth={8} strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                transform={`rotate(-90 ${size / 2} ${size / 2})`} />
            <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle"
                fontSize={size / 4} fontWeight={700} fill={color}>{score}</text>
        </svg>
    );
};
