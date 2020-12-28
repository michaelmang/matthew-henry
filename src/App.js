import { useQuery } from '@apollo/client';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './tailwind.dist.css';
import './App.css';

import { BOOKS } from './gql.js';
import { getCommentaryByRouteName } from './selectors.js';
import Feed from './components/Feed.js';
import Header from './components/Header.js';
import Hero from './components/Hero.js';
import Layout from './components/Layout.js';
import Reader from './components/Reader.js';
import ScrollToTop from './components/ScrollToTop.js';

function App() {
  const { loading, data, error, refetch } = useQuery(BOOKS);

  if (loading) {
    return "Loading...";
  }

  const featuredBook = data.books.find(({ tag }) => tag.type === 'featured');
  const hero = featuredBook.commentaries[0];

  return (
    <Router>
      <ScrollToTop />
      <div>
        <Switch>
          <Route exact path="/">
            <Layout error={error} loading={loading}>
              <Hero {...hero} loading={loading} book={featuredBook.name} bookImage={featuredBook.image}>
                {featuredBook.name} {hero.book_chapter}
              </Hero>
              {!loading && <Feed data={data} />}
            </Layout>
          </Route>

          <Route
            exact
            path="/commentaries/:book/:chapter"
            render={(routerProps) => {
              const { book, chapter } = routerProps.match.params;
              const commentary = getCommentaryByRouteName(data, book, chapter);
              return (
                <Layout {...routerProps} loading={loading}>
                  <Header {...commentary} loading={loading}>
                    {book} {chapter}
                  </Header>
                  <Reader bookImage={commentary.book_image} content={commentary.content} loading={loading} refetch={refetch} reviews={commentary.reviews} {...routerProps} />
                </Layout>
              );
            }}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
