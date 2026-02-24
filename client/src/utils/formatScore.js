export const getScoreColor = (score) => {
    if (score >= 8) return 'success';
    if (score >= 5) return 'warning';
    return 'error';
};

export const getScoreLabel = (score) => {
    if (score >= 8) return 'Excellent';
    if (score >= 5) return 'Good';
    return 'Needs Improvement';
};
