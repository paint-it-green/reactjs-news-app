import React, { Component } from 'react'
import PropTypes from 'prop-types';

import './ResultsCount.css';

export default class ResultsCount extends Component {
    
    render() {
        return (
            this.props.totalResults === 0 ?
            ( <div className="no-results"> No results {this.props.searchText ? ' for "'+this.props.searchText+'"':""}</div> ) :
            ( 
                <div className="pb-3">
                    <div className="no-results"> {this.props.totalResults} results found {this.props.searchText ? " for "+this.props.searchText:""} </div>
                    <div className="text-muted newsapi">
                        powered by:&nbsp;
                        <a href="https://newsapi.org/" target="_blank" rel="noopener noreferrer">newsapi.org</a>
                    </div>
                </div>
            )
        )
    }
}

// PropTypes
ResultsCount.propTypes = {
    totalResults: PropTypes.number.isRequired,
    searchText: PropTypes.string.isRequired
}