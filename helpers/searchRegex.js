const searchRegex = text => {
  if (text) {
    const str = text.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&');
    return new RegExp('^' + str, 'i');
  }
  return null;
};

module.exports = searchRegex;
