function isMonetaryValue(value) {
    return !value.match(/^(\d{1,})([.|,])?(\d{0,2})?$/);
}

module.exports = isMonetaryValue;
