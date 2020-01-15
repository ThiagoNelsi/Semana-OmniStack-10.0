module.exports = string => {
    return string.split(',').map(element => element.trim())
}