import React, { Component } from 'react'
import Spineer from './Spineer.js';
import NewsItem from '../NewsItem';
import PropTypes from 'prop-types'




export default class News extends Component {
  static propTypes={
    category:'general'  
  }
  constructor(){
    super();
    this.state={
      articles:[],
      loading:true,
      page:1
    }
  }
  async updateDate(){
    const url=`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=960be6c2fa9a414796074732a052dc22&page=${this.state.page}&pageSize=20`;
     this.setState({loading:true})
     const date=await fetch(url);
     const fetchDate=await date.json(); 
     this.setState({articles:fetchDate.articles,totalResults:fetchDate.totalResults,loading:false })
  }
  async componentDidMount(){
    this.updateDate()
  }
  handlePrvClick= async ()=>{
    this.setState({
      page:this.state.page-1
    })
   this.updateDate()
  }
  handleNextClick=async ()=>{
      this.setState({
        page:this.state.page+1
      })
      this.updateDate()
  }
  render() {
    return (
      
      <>
      <div className='container mt-4' >
        <h1>News-Monkey Top headLine</h1>
        {this.state.loading && <Spineer/>}
         <div className='row'>
          {!this.state.loading && this.state.articles.map((element)=>{
            return  <div className='col-md-4  my-4' key={element.url}>
            <NewsItem title={element.title?element.title.slice(0,20):''} description={element.description?element.description.slice(0,45):''} date={element.publishedAt} author={element.author?element.author:'unknown'} image={element.urlToImage?element.urlToImage:''} url={element.url}/>
          </div>
          })}
        </div>
      </div>
      <div className='container d-flex justify-content-between'>
      <button type="button" className="btn btn-dark" disabled={this.state.page<=1} onClick={this.handlePrvClick}>&larr;Previous</button>
      <button type="button" className="btn btn-dark" disabled={this.state.page+1 >Math.ceil(this.state.totalResults/20)}onClick={this.handleNextClick}>Next &rarr;</button>
    </div>
    </>

    )
  }
}
