import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

import './Search.css';

export default class Search extends Component {

    constructor() {
        super();
        this.state = { text: "" };
        this.searchInput = React.createRef();
    }
    
    debounceEvent(...args) {
        this.debouncedEvent = debounce(...args);
        return e => {
            e.persist();
            return this.debouncedEvent(e);
        }
    }
    handleChange = (e) => {
        this.setState({text: e.target.value});
        this.props.onSearch(this.state.text);
    }
	resetSearch = () => {
        if(this.state.text) {
            this.searchInput.current.value = "";
            this.setState({text: ""});
            this.props.onSearch("");
        }
    }
    componentWillUnmount() {
        this.debouncedEvent.cancel();
    }
    render() {
        
        return (

            <div className="searchbox-wrapper">
                <div className="searchbox-inner-wrapper">

                    <div className="flex w-100 px-1 main-search pb-1">

                        <div className="active-pink active-pink-2 flex-grow-1 py-0">
                            <input className="form-control flex-grow-1" type="text" placeholder="Search..." aria-label="Search..." 
                            ref={this.searchInput}
                            onChange={this.debounceEvent(this.handleChange, 800)}/>
                        </div>

                        <i className="fas fa-times search-icon active mx-2"
                        onClick={this.resetSearch}></i>
                    </div>
                </div>
            </div>
        )
    }
}

Search.propTypes = {
    onSearch: PropTypes.func.isRequired
}