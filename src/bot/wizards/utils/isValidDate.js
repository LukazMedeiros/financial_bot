const isValidDate = (date) => {
    const dateObject = new Date(date);
    if (isNaN(dateObject.getTime())) {
        return false;
    }
    return true;
};

module.exports = isValidDate;
