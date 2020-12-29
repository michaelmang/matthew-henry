import { useLazyQuery, useQuery } from "@apollo/client";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useBottomScrollListener } from 'react-bottom-scroll-listener';

import "./tailwind.dist.css";
import "./App.css";

import { BOOKS, COMMENTARIES } from "./gql.js";
import Feed from "./components/Feed.js";
import Hero from "./components/Hero.js";
import Layout from "./components/Layout.js";
import ScrollToTop from "./components/ScrollToTop.js";
import Commentary from "./components/Commentary";

const defaultLimit = 4;
let offset = 4;

function App() {
  const { loading, data, error, fetchMore } = useQuery(BOOKS);
  const [getCommentaries, commentaries] = useLazyQuery(COMMENTARIES);

  const featuredBook = data?.books?.find(
    (book) => book?.tag?.type === "featured"
  );
  const hero = featuredBook?.commentaries[0];

  useBottomScrollListener(() => {
    offset = offset + defaultLimit;

    fetchMore({
      variables: {
        offset,
      },
    });
  });

  return (
    <Router>
      <ScrollToTop />
      <div>
        <Switch>
          <Route exact path="/">
            <Layout
              error={error || commentaries.error}
              loading={loading}
            >
              <Hero
                {...hero}
                loading={loading}
                book={featuredBook?.name}
                bookImage={featuredBook?.image}
              >
                {featuredBook?.name} {hero?.book_chapter}
              </Hero>
              {!loading && (
                <Feed
                  commentaries={commentaries.data?.commentaries}
                  data={data}
                  getCommentaries={getCommentaries}
                />
              )}
            </Layout>
          </Route>
          <Route
            exact
            path="/commentaries/:book/:chapter"
            render={(routerProps) => {
              return (
                <Commentary {...routerProps} />
              );
            }}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
