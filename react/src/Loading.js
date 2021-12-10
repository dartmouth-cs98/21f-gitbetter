import React, { Component } from 'react';
import './Help.css';

class Loading extends Component {
    newCommand() {
        this.recents = this.$store.getters.getRecentSearches;
    }
    render() {
        return(
            <div className = "load" v-if="start">
                <div className="ring">
                    <div className="lds-ellipsis" />
                </div>
            </div>
        );
    }
}

export default Loading;