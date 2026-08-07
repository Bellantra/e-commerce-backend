const generateRating = () => {
  return Number((Math.random() * 5).toFixed(2));
};

module.exports = generateRating;
