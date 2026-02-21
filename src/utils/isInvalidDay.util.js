function isInvalidDay(value) {
    const day = parseInt(value);
    if (Number.isNaN(day)) return true;
    return day < 1 || day > 31;
}

module.exports = isInvalidDay;
