import React, { Component } from "react";
import Spineer from "./Spineer.js";
import NewsItem from "../NewsItem";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static propTypes = {
    category: "general",
  };
   Capitalize=(string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1).toLowerCase();
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults:0
    };
    document.title=`${this.Capitalize(this.props.category)}-DailyNews`;
  }
  async updateDate() {
    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=960be6c2fa9a414796074732a052dc22&page=${this.state.page}&pageSize=20`;
    this.setState({ loading: true });
    const date = await fetch(url);
    const fetchDate = await date.json();
    this.setState({
      articles: fetchDate.articles,
      totalResults: fetchDate.totalResults,
      loading: false,
    });
  }
  async componentDidMount() {
    this.updateDate();
  }
   fetchMoreData= async () =>{
    this.setState({page:this.state.page+1});
    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=960be6c2fa9a414796074732a052dc22&page=${this.state.page}&pageSize=20`;
    this.setState({ loading: true });
    const date = await fetch(url);
    const fetchDate = await date.json();
    this.setState({
      articles: this.state.articles.concat(fetchDate.articles),
      totalResults: 60,
      loading: false
    });
    console.log(this.state.articles.length);
    console.log(this.state.totalResults);
  }
  render() {
    return (
      <>
          <h1 className="my-4 text-center">News-Monkey Top HeadLine {this.Capitalize(this.props.category)}</h1>
      {this.state.loading && <Spineer />}
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length!==this.state.totalResults}
            loader={<Spineer/>}
          >
          <div className="container">
            <div className="row">
              {
                this.state.articles.map((element) => {
                  return (
                    <div className="col-md-4  my-4" key={element.url}>
                      <NewsItem
                        title={element.title ? element.title.slice(0, 20) : ""}
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
  }
}
