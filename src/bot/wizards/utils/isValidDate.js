const isValidDate = (date) => {
    const currentDate = new Date();
    const dateObject = new Date(date);
    if (isNaN(dateObject.getTime()) || dateObject > currentDate) {
        return false;
    }
    return true;
};

module.exports = isValidDate;
