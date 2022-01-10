import React, { Component } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import searchOptions from './SearchBar.json';
import './SearchBar.css';

class SearchBar extends Component {
    state = {
        firstCommand: '',
        secondCommand: '',
        thirdCommand: '',
    }

    firstSelectChange({ target: { value }}) {
        this.setState({
            firstCommand: value,
            secondCommand: '',
            thirdCommand: '',
        });
    }

    secondSelectChange({ target: { value }}) {
        this.setState({
            secondCommand: value,
            thirdCommand: '',
        });
    }

    thirdSelectChange({ target: { value }}) {
        this.setState({ thirdCommand: value });
    }

    /**  
    * resets the command dropdowns when the 
    * close button in the command description is used 
    */
    resetOpts = (command) => {
        const { updateHistory } = this.props;
        updateHistory(command);
        this.setState({
            secondCommand: '',
            thirdCommand: '',
        })
    }

    render() {
        const { firstCommand, secondCommand, thirdCommand } = this.state;
        const query = searchOptions.tertiaryOptions[secondCommand]
            ? searchOptions.tertiaryOptions[secondCommand].filter((opt) => opt.value === thirdCommand)
            : searchOptions.secondaryOptions[firstCommand]?.filter((opt) => opt.value === secondCommand);
        const [{ usage, nb }] = query?.length ? query : [{}];
        return (
            <div className="options">
                <h3>What do you want to do?</h3>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth color='secondary' focused='true'>
                        {/* <InputLabel id="demo-simple-select-label">First Prompt</InputLabel> */}
                        <Select
                            labelId="demo-simple-select-label"
                            className="simple-select"
                            onChange={this.firstSelectChange.bind(this)}
                        >
                            { searchOptions.commandOptions.map((opt, index) => (
                                <MenuItem 
                                    className="form-control" 
                                    value={opt.value} 
                                    key={index} 
                                >
                                    {opt.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                { firstCommand && (
                    <>
                    <br/>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth color='secondary' focused='true'>
                            {/* <InputLabel id="demo-simple-select-label">Second Prompt</InputLabel> */}
                            <Select
                                labelId="demo-simple-select-label"
                                className="simple-select"
                                onChange={this.secondSelectChange.bind(this)}
                            >
                                { searchOptions.secondaryOptions[firstCommand].map((opt, index) => (
                                    <MenuItem 
                                        className="form-control" 
                                        value={opt.value} 
                                        key={index} 
                                    >
                                        {opt.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    </>
                )}

                { secondCommand && searchOptions.tertiaryOptions[secondCommand] && (
                    <>
                    <br/>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth color='secondary' focused='true'>
                            {/* <InputLabel id="demo-simple-select-label">Third Prompt</InputLabel> */}
                            <Select
                                labelId="demo-simple-select-label"
                                className="simple-select"
                                onChange={this.thirdSelectChange.bind(this)}
                            >
                                { searchOptions.tertiaryOptions[secondCommand].map((opt, index) => (
                                    <MenuItem 
                                        className="form-control" 
                                        value={opt.value} 
                                        key={index} 
                                    >
                                        {opt.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    </>
                )}
            
                { (thirdCommand || (secondCommand && !searchOptions.tertiaryOptions[secondCommand])) && (
                    <div className="results">
                        <article className="message">
                            <div className="message-header">
                                <p>Usage: {usage}</p>
                                <button 
                                    onClick={() => this.resetOpts({ usage, command: nb ?? '' })} 
                                    className="delete" 
                                    aria-label="delete"
                                >
                                    Clear All
                                </button>
                            </div>
                            <div className="message-body">{ nb }</div>
                        </article>
                    </div>
                )}
            </div>
        );
    }
}

export default SearchBar;