const isValidAmount = (amount) => {
    const regex = /^(\d{1,})([.|,])?(\d{0,2})?$/;
    return amount.match(regex);
};

module.exports = isValidAmount;
