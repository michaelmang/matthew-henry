import { gql } from '@apollo/client';

export const BOOKS = gql`
  query ($order_by: [books_order_by!], $limit: Int = 4, $offset: Int = 0, $index_lte: Int = 66, $index_gt: Int = 0) {
    books(order_by: $order_by, limit: $limit, offset: $offset, where: {index: {_lte: $index_lte, _gt: $index_gt}}) {
      tag {
        id
        type
      }
      id
      image
      name
      count
      commentaries(order_by: {book_chapter: asc}, limit: 4, offset: 0) {
        author
        book_chapter
        book_id
        description
        id
        image
        tag {
          id
          type
        }
        reviews {
          id
          rating
        }
      }
    }
  }
`;

export const COMMENTARIES = gql`
  query ($book_id: uuid!, $offset: Int!) {
    commentaries(limit: 4, offset: $offset, where: {book_id: {_eq: $book_id}}, order_by: {book_chapter: asc}) {
      id
      author
      book_chapter
      book_id
      description
      image
      tag {
        id
        type
      }
      reviews {
        id
        rating
      }
    }
  }
`;

export const COMMENTARY = gql`
  query ($book_chapter: Int!, $book_id: uuid!) {
    commentaries(where: {book_chapter: {_eq: $book_chapter}, book_id: {_eq: $book_id}}) {
      id
      author
      book_chapter
      book_id
      content
      description
      image
      tag {
        id
        type
      }
      reviews {
        created_at
        id
        rating
        review
        review_title
        reviewer
      }
    }
  }
`;

export const ADD_REVIEW = gql`
mutation ($rating: Int = 1, $review: String = "", $review_title: String = "", $reviewer: String = "", $tract_id: String = "", $id: uuid = "") {
  insert_reviews_one(object: {rating: $rating, review: $review, review_title: $review_title, reviewer: $reviewer, tract_id: $tract_id, id: $id}, on_conflict: {constraint: reviews_pkey, update_columns: [
			id
			review_title
			rating
			review
			review_title
			reviewer
			tract_id
  ]}) {
    id
  }
}`;
