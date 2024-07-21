import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
export class News extends Component {
    static defaultProps = {
        country: "in",
        pageSize: "6"
    }
    static PropsTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
    }
    capitalizeCategory=(string)=>{
        return string.charAt(0).toUpperCase()+string.slice(1);
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
        document.title=`NewsCategory-${this.capitalizeCategory(this.props.category)}`;
    }
    async updateNews() {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=90ff9c781479473c9aaf6a7ac5839ea5&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
    }
    async componentDidMount() {
        this.updateNews();
    }
    handlePrev = async () => {
        this.setState({ page: this.state.page - 1 })
        this.updateNews();
    }
    handleNext = async () => {
        this.setState({ page: this.state.page + 1 })
        this.updateNews();
    }
    render() {
        return (
            <div className="container my-3">
                <h1 className="text-center" style={{ margin: '35px 0px',marginTop:'90px'}}>Latest Top headLines from {this.capitalizeCategory(this.props.category)}</h1>
                {this.state.loading && <Spinner />}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col md-4" key={element.url}>
                            <NewsItem title={element.title ? element.title.slice(0, 40) : ""} description={element.description ? element.description.slice(0, 100) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button hidden={this.state.page <= 1} className="btn btn-dark mx-2" onClick={this.handlePrev} >&larr; Previous</button>
                    <h5><em>Made By: Ritvik Raj</em></h5>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-dark mx-2" onClick={this.handleNext}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News
