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
  const [getCommentaries, commentaries] = useLazyQuery(COMMENTARIES, {
    variables: {
      offset: 0,
    },
  });

  useBottomScrollListener(() => {
    offset = offset + defaultLimit;

    if (fetchMore) {
      fetchMore({
        variables: {
          offset,
        },
      });
    }
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
              <Hero loading={loading} />
              {!loading && (
                <Feed
                  commentaries={commentaries.data?.commentaries}
                  data={data}
                  getCommentaries={getCommentaries}
                  isLoading={commentaries.loading}
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
