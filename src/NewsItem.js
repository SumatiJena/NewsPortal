import React from 'react';
const NewsItem=(props)=>{
  
    let {title,description,image,url,author,date}=props;
    return (
      <div>
        <div className="card">
        <img className="card-img-top" src={image} alt="Card image cap"/>
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <p class="card-text"><small class="text-muted">Published by{author} on {new Date(date).toGMTString()}</small></p>
          <a href={url} className="btn btn-primary">Read More</a>
        </div>
      </div>
      </div>
    )
}
export default NewsItem;
