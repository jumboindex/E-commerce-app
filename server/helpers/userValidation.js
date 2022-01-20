function emailIsValid (email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
};

module.exports = {
    emailIsValid
};