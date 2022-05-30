import React, { useEffect, useState } from "react";
import Spineer from "./Spineer.js";
import NewsItem from "../NewsItem";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  //document.title=`${this.Capitalize(this.props.category)}-DailyNews`;
  const Capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };
  const updateNews = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=20`;
    setLoading(true);
    const date = await fetch(url);
    const fetchDate = await date.json();
    setArticles(fetchDate.articles);
    setTotalResults(fetchDate.totalResults);
    setLoading(false);
  };
  useEffect(() => {
    updateNews();
  }, []);
  const fetchMoreData = async () => {
    setPage(page + 1);
    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=20`;
    setLoading(true);
    const date = await fetch(url);
    const fetchDate = await date.json();
    setArticles(fetchDate.articles);
    setTotalResults(fetchDate.totalResults);
    setLoading(false);
  };
  return (
    <>
      <h1 className="my-4 text-center">
        News-Monkey Top HeadLine {Capitalize(props.category)}
      </h1>
      {loading && <Spineer />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spineer />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4  my-4" key={element.url}>
                  <NewsItem
                    title={element.title}
                    description={
                      element.description
                        ? element.description.slice(0, 45)
                        : ""
                    }
                    date={element.publishedAt}
                    author={element.author ? element.author : "unknown"}
                    image={element.urlToImage ? element.urlToImage : ""}
                    url={element.url}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};
News.propTypes = {
  category: PropTypes.string,
};
export default News;
