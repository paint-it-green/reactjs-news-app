import React, { Component } from 'react'
import PropTypes from 'prop-types';
import uuid from 'uuid';

import InfiniteScroll from 'react-infinite-scroller';
import Loader from 'react-loader-spinner'

import FeedSocialShare from './FeedSocialShare';
import './Feed.css';

export default class Feed extends Component {
    state = {
        hasMoreItems: true
    };

    loadItems = () => {
        this.props.loadMore(this.state.text);
    }

    render() {
        
        const loader = <div className="text-center" key={uuid.v4()}> <Loader type="MutatingDots" color="#f48fb1" height={100} width={100} /> </div>;

        let items = [];
        this.props.feeds.forEach((news) => {
            items.push(
                <div key={uuid.v4()} className="feed-wrapper">
                    <div className="feed-inner-wrapper">
                        
                        <h2 className="feed-title">
                            <a className="feed-link" href={news.url} target="_blank" rel="noopener noreferrer">{news.title}</a>
                        </h2>
                        
                        <div className="feed-source">Author: <i>{news.author}, {' '}
                            {new Intl.DateTimeFormat('en-GB', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: '2-digit' 
                            }).format(new Date(news.publishedAt))}</i>
                        </div>
                        <img className="feed-image" src={news.urlToImage} alt="" />
                        <div className="feed-source">Source: <i>{news.source.name}</i></div>
                        
                        <p className="feed-content">
                            <a className="feed-link" href={news.url} target="_blank" rel="noopener noreferrer">{news.content}</a>
                        </p>
                        
                        <FeedSocialShare url={news.url} title={news.title} imageUrl={news.urlToImage}/>
                    </div>
                </div>
            );
        });

        return (
            <div>
                {
                    <InfiniteScroll
                    pageStart={0}
                    loadMore={this.loadItems}
                    hasMore={this.props.hasMoreItems}
                    loader={loader}>
                        {items}
                    </InfiniteScroll>
                }
            </div>
        )
    }
}

// PropTypes
Feed.propTypes = {
    feeds: PropTypes.array.isRequired
}