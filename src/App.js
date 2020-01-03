import React, { Component } from 'react';
import Loader from 'react-loader-spinner'

import Feed from './feed/Feed';
import Search from './attachments/search/Search';
import ResultsCount from './attachments/results-count/ResultsCount';
import ScrollTop from './attachments/scroll-top/ScrollTop';

import './App.css';


const newsApiKey = process.env.REACT_APP_NEWS_API_KEY;

class App extends Component {
	state = {
		news: [],
		onLoading: true,
		searchText: "",
		totalResults: 0,
		currentPage: 1,
		loadingLoadmore: false,
		hasMoreItems: true
	};

	async componentDidMount() {
		let news = await this.getDataFetch(this.state.searchText);
		this.setState({ news: [...news.articles], onLoading: false, totalResults: news.totalResults })
	}

	async getDataFetch(text) {
		text = text ? text:"tech";

		try {
			const response = await fetch(`v2/everything?q=${text}&page=${this.state.currentPage}&sortBy=relevancy&apiKey=${newsApiKey}`,
				{ headers: {'Content-Type': 'application/json'}}
			)
			const news = await response.json();
			return news;
		}
		catch(error) {
			return {
				articles: [],
				totalResults: 0,
				
			};
		}
	}
	
	async onSearch(text) {
		this.setState({ onLoading: true, searchText: text, currentPage: 1, hasMoreItems: true })
		let news = await this.getDataFetch(text);
		this.setState({ news: [...news.articles], onLoading: false, totalResults: news.totalResults })
	};

	async loadMore() {
		if(this.state.loadingLoadmore) return;
		if(this.state.news.length >= this.state.totalResults) {
			this.setState({hasMoreItems:false})
			return;
		}

		this.setState({ currentPage: this.state.currentPage+1, loadingLoadmore: true })
		let news = await this.getDataFetch(this.state.searchText);
		let list = this.state.news;
		this.setState({ news: [...list, ...news.articles], totalResults: news.totalResults, loadingLoadmore: false })
	}

	render() {
		return (
			<div>
				<ScrollTop
				totalResults={this.state.totalResults}/>
				<Search onSearch={this.onSearch.bind(this)}/>
				{
					this.state.onLoading ? 
					(
						<div className="loader-container">
							<Loader
							type="MutatingDots"
							color="#f48fb1"
							height={100}
							width={100}
							/>
						</div>
					)
					:
					(
						<div className="container-lg mt-5 pt-3">
							<ResultsCount
							searchText={this.state.searchText}
							totalResults={this.state.totalResults}/>
							<Feed
							feeds={this.state.news}
							loadMore={this.loadMore.bind(this)}
							hasMoreItems={this.state.hasMoreItems}/>
						</div>
					)
				}

			</div>
		);
	}
}

export default App;
