import { useQuery } from '@apollo/client';

import Header from "./Header.js";
import Layout from "./Layout.js";
import Reader from "./Reader.js";
import { COMMENTARY } from '../gql.js';
import { getUuid } from '../utils.js';

export default function Commentary({ match }) {
  const { book, chapter } = match.params;
  const parsedBook = book.replace(/-/gm, " ").replace(/\b[a-z](?=[a-z])/gm, (letter) => letter.toUpperCase());
  const { loading, data, error, refetch } = useQuery(COMMENTARY, {
    variables: {
      book_chapter: parseInt(chapter),
      book_id: getUuid(parsedBook),
    },
  });

  const commentary = data?.commentaries[0];
              
  return (
    <Layout
      error={error}
      loading={loading}
    >
      <Header
        {...data}
        loading={loading}
      >
        {parsedBook} {chapter}
      </Header>
      <Reader
        bookImage={commentary?.book_image}
        content={commentary?.content}
        loading={loading}
        refetch={refetch}
        reviews={commentary?.reviews}
        {...match}
      />
    </Layout>
  );
}