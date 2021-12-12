import React, { Component } from 'react';
import './RecentSearches.css';

class RecentSearches extends Component {
    render() {
        const { recents } = this.props;
        return(
            <div className="options">
                <h2 className="recent-subtitle">Recents...</h2>
                <div className="table-container">
                    <table className="table is-striped">
                        <tbody>
                            <th> Command </th> 
                            <th> Description </th>
                            {recents.map((com, id) => (
                                <tr key={id}>
                                    <td><code>{com.usage}</code></td>
                                    <td>{com.command}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default RecentSearches;