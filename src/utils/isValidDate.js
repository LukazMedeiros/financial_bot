function isDateValid(dateString) {
    const fullDate = !dateString.match(/^\d{1,2}\/\d{1,2}\/\d{4}$/gm);
    const today = !dateString.match(/hoje/gm);

    if (fullDate && today) return true;
    return false;
}

module.exports = isDateValid;
