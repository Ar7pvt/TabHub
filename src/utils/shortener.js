exports.generateShortCode = (url) => {
    const uniqueId = Math.random().toString(36).substr(2, 8);
    return `${uniqueId}`;
};