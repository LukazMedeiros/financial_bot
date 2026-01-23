module.exports = function isValidDay(day) {
    const parsedDay = Number(day);
    return Number.isInteger(parsedDay) && parsedDay >= 1 && parsedDay <= 31;
};
