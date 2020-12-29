import { gql } from '@apollo/client';

export const BOOKS = gql`
  query {
    books(order_by: {created_at: asc}) {
      tag {
        id
        type
      }
      id
      image
      name
      commentaries(order_by: {book_chapter: asc}) {
        author
        book_chapter
        content
        description
        id
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
