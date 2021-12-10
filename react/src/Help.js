import React, { Component } from 'react';
import Sidebar from './Sidebar'
import Navigation from './Navigation'
import SearchBar from './SearchBar';
import RecentSearches from './RecentSearches';
import './Help.css';

class Help extends Component {
    state = {
        history: [],
    };

    render() {
        const { history } = this.state;
        return(
            <div className="main">
                <Navigation />
                <div className="columns">
                    <div className="column is-fullheight is-one-fifth sidebar">
                        <Sidebar />
                    </div>
                    <div className="top-wrapper column">
                        <div className="general-wrapper">
                            <h1 className="title">Help</h1>
                            <SearchBar updateHistory={e => this.setState({ history: [e, ...history] })} />
                            <RecentSearches recents={history} /> 
                        </div>
                    </div>  
                </div>
            </div>
        );
    }
}

export default Help;