import React, { Component } from 'react'
import PropTypes from 'prop-types';

import './ScrollTop.css';

export default class ScrollTop extends Component {

	scrollTop = () => {
		window.scroll({top: 0, left: 0, behavior: 'smooth' })
    }
    
    render() {
        return (
            this.props.totalResults >= 3 ? <i className="fas fa-chevron-up btn-scroll-top" onClick={this.scrollTop}></i> : null
        )
    }
}

// PropTypes
ScrollTop.propTypes = {
    totalResults: PropTypes.number.isRequired
}