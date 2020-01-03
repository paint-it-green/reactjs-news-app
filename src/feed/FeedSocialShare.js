import React, { Component } from 'react'
import {
    FacebookShareButton, FacebookIcon,
    PinterestShareButton, PinterestIcon,
    TwitterShareButton, TwitterIcon
} from 'react-share';
import PropTypes from 'prop-types';

import './Feed.css';

export default class FeedSocialShare extends Component {

    responseFacebook(response) { }

    render() {
        return (
            <div className="feed-btn-social-wrapper">
                
                <FacebookShareButton
                url={this.props.url}
                quote={this.props.title}
                className="feed-btn-social">
                    <FacebookIcon size={32} round />
                </FacebookShareButton>

                <TwitterShareButton
                url={this.props.url}
                title={this.props.title}
                className="feed-btn-social">
                    <TwitterIcon size={32} round />
                </TwitterShareButton>

                <PinterestShareButton
                url={this.props.url}
                media={this.props.imageUrl}
                windowWidth={1000}
                windowHeight={730}
                className="feed-btn-social">
                    <PinterestIcon size={32} round />
                </PinterestShareButton>
            
            </div>
        )
    }
}

FeedSocialShare.propTypes = {
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
}
