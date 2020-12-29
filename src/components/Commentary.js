import { useQuery } from '@apollo/client';
import capitalize from 'lodash.capitalize';

import Header from "./Header.js";
import Layout from "./Layout.js";
import Reader from "./Reader.js";
import { COMMENTARY } from '../gql.js';
import { getUuid } from '../utils.js';

export default function Commentary({ match }) {
  const { book, chapter } = match.params;
  const { loading, data, error, refetch } = useQuery(COMMENTARY, {
    variables: {
      book_chapter: parseInt(chapter),
      book_id: getUuid(capitalize(book)),
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
        {capitalize(book)} {chapter}
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