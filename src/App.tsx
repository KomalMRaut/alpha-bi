import axios from "axios";
import React, { BaseSyntheticEvent, useEffect } from "react";
import "./App.css";
import SearchIcon from "./assets/Search icon.svg";

export const App: React.FC = () => {
  const [searchResult, setSearchResult] = React.useState<any>([]);
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [pageCounter, setPageCounter] = React.useState<number>(1);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const itemsPerPage = 6;
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `http://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${process.env.REACT_APP_API_KEY}&limit=60`
      )
      .then((res: any) => {
        setSearchResult(res.data.data);
        setIsLoading(false);
      })
      .catch((err: any) => console.error(err));
  }, [searchTerm]);
  return (
    <div className="app">
      <div className="search">
        <div className="search-box">
          <div className="search-box__bar">
            <img src={SearchIcon} alt="search" width="23.48" height="24.48" />
            <input
              type="text"
              className="search-txt"
              placeholder="Article name or keywords..."
              value={searchTerm}
              onChange={(e: BaseSyntheticEvent) =>
                setSearchTerm(e.target.value)
              }
            />
          </div>
          <button className="search-btn">Search</button>
        </div>
        <div className="search-result">
          {isLoading ? (
            <div className="loader">
              <div className="loading">
                <div />
                <div />
                <div />
                <div />
              </div>
            </div>
          ) : (
            <>
              {searchResult
                .slice(
                  (pageCounter - 1) * itemsPerPage,
                  pageCounter * itemsPerPage
                )
                .map((result: any, index: number) => {
                  return (
                    <div key={index}>
                      <iframe
                        className="search-result__item"
                        title={"img" + index}
                        src={result.embed_url}
                        width="480"
                        height="429"
                        frameBorder="0"
                        allowFullScreen
                      ></iframe>
                    </div>
                  );
                })}
              <div className="pagination">
                <button
                  className="pagination__move"
                  onClick={() => {
                    pageCounter > 1 && setPageCounter(pageCounter - 1);
                  }}
                >
                  Previous
                </button>
                <button className="pagination__count pagination__selected">
                  {pageCounter}
                </button>
                <button
                  className="pagination__count"
                  onClick={() => setPageCounter(pageCounter + 1)}
                >
                  {pageCounter + 1}
                </button>
                <button
                  className="pagination__count"
                  onClick={() => setPageCounter(pageCounter + 2)}
                >
                  {pageCounter + 2}
                </button>
                <button
                  className="pagination__move"
                  onClick={() => setPageCounter(pageCounter + 1)}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
