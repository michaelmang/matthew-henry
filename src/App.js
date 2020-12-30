import { useLazyQuery, useQuery } from "@apollo/client";
import kebabcase from 'lodash.kebabcase';
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { useBottomScrollListener } from "react-bottom-scroll-listener";

import "./tailwind.dist.css";
import "./App.css";

import { BOOKS, COMMENTARIES } from "./gql.js";
import Commentary from "./components/Commentary.js";
import Feed from "./components/Feed.js";
import Hero from "./components/Hero.js";
import Layout from "./components/Layout.js";
import ScrollToTop from "./components/ScrollToTop.js";
import Select from "./components/Select.js";
import bible from "./data/bible.json";

const defaultLimit = 4;
let offset = 0;

const filters = {
  "Show All": {
    index_lte: 66,
    index_gt: 0,
  },
  "Old Testament": {
    index_lte: 39,
    index_gt: 0,
  },
  "New Testament": {
    index_lte: 66,
    index_gt: 39,
  },
};
const sorts = {
  Canonical: {
    order_by: {
      index: "asc",
    },
  },
  "Alphabetical (A-Z)": {
    order_by: {
      name: "asc",
    },
  },
  "Alphabetical (Z-A)": {
    order_by: {
      name: "desc",
    },
  },
  Shortest: {
    order_by: {
      count: "asc",
    },
  },
  Longest: {
    order_by: {
      count: "desc",
    },
  },
};

function App() {
  const [filter, setFilter] = useState("Show All");
  const [sort, setSort] = useState("Canonical");
  const [book, setBook] = useState("--");
  const [chapter, setChapter] = useState("--");

  const { loading, data, error, fetchMore } = useQuery(BOOKS, {
    variables: {
      ...filters[filter],
      ...sorts[sort],
    },
  });
  const [getCommentaries, commentaries] = useLazyQuery(COMMENTARIES, {
    variables: {
      offset: 0,
    },
  });

  useBottomScrollListener(() => {
    offset = offset + defaultLimit;

    fetchMore({
      variables: {
        offset,
      },
    });
  });

  useEffect(() => {
    if (chapter !== "--") {
      setBook("--");
      setChapter("--");
    }
  }, [chapter]);
  
  return (
    <Router>
      <div>
        <ScrollToTop />
        <Switch>
          <Route exact path="/">
            {book !== "--" && chapter !== "--" && (
              <Redirect to={`/commentaries/${kebabcase(book)}/${chapter}`} />
            )}
            <Layout error={error || commentaries.error} loading={loading}>
              <Hero loading={loading} />
              <div className="flex">
                <Select
                  label="Book"
                  onChange={setBook}
                  options={bible.map((x) => x.book)}
                >
                  {book}
                </Select>
                {book !== "--" && (
                  <Select
                    label="Chapter"
                    onChange={setChapter}
                    options={bible
                      .find((x) => x.book === book)
                      .chapters.map((c) => c.chapter)}
                  >
                    {chapter}
                  </Select>
                )}
              </div>
              <div className="flex mt-4">
                <Select
                  label="Sort"
                  onChange={setSort}
                  options={Object.keys(sorts)}
                >
                  {sort}
                </Select>
                <Select
                  label="Filter"
                  onChange={setFilter}
                  options={Object.keys(filters)}
                >
                  {filter}
                </Select>
              </div>
              {!loading && (
                <Feed
                  commentaries={commentaries.data?.commentaries}
                  data={data}
                  getCommentaries={getCommentaries}
                  loading={commentaries.loading}
                />
              )}
            </Layout>
          </Route>
          <Route
            exact
            path="/commentaries/:book/:chapter"
            render={(routerProps) => {
              return <Commentary {...routerProps} />;
            }}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
