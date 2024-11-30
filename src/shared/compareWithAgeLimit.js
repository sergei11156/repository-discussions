
export const compareWithAgeLimit = (date) => {
    const limit = process.env.DATA_AGE_LIMIT_IN_YEARS
    const dateLimit = new Date();
    dateLimit.setFullYear(dateLimit.getFullYear() - limit);
    return (date - dateLimit) >= 0;
}