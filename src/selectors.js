import meanBy from 'lodash.meanby';

const matchingCommentary = ({ by: chapter }) => (commentary) => commentary.book_chapter === chapter;

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

export const getCommentaryByRouteName = (data, book, chapter) => {
  const matchingBook = data.books.find(({ name }) =>
    book === name,
  );
  return {
    ...matchingBook.commentaries.find(matchingCommentary({ by: parseInt(chapter) })),
    book_image: matchingBook.image,
  };
};
