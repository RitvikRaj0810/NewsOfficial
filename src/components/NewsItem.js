import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title,description,imageUrl,newsUrl,author,date,source}=this.props;
    return (
      <div className="my-3">
            <div className="card" style={{width: "20rem"}}>
              <div style={{display:'flex',justifyContent:'flex end',position:'absolute',right:0}}>
            <span className="badge rounded-pill bg-danger">{source}</span>
            </div>
                <img src={!imageUrl?"https://ichef.bbci.co.uk/news/1024/branded_news/83B3/production/_115651733_breaking-large-promo-nc.png":imageUrl} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{description}...</p>
                    <p className="card-text"><small className="text-muted">By:{!author?"Unknown":author}</small></p>
                    <p className="card-text"><small className="text-muted">Date/Time:{new Date(date).toGMTString()}</small></p>
                    <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read more</a>
                </div>
            </div>
      </div>
    )
  }
}

export default NewsItem
