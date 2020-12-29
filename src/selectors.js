import meanBy from 'lodash.meanby';

export const getRatingsStars = (reviews) => {
  let ratingMean;
  let ratingsToStars;
  
  if (reviews?.length > 0) {
    ratingMean = meanBy(reviews, 'rating');
    ratingsToStars = [...new Array(Math.floor(ratingMean)).keys()];
  }

  return { ratingMean, ratingsToStars };
};

export const getRatingToStars = (rating) => {
  return [...new Array(rating).keys()];
};
