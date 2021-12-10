import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import { gitCommands } from './Commands';
import Loading from './Loading';
import { FaSearch } from 'react-icons/fa';
import logo from './assets/logo.png';
import './Welcome.css';

function Welcome() {
    const [isLoading, setIsLoading] = useState(false);
    const [commandOpts, setCommandOpts] = useState([]);
    const [searchInput, setSearchInput] = useState('welcome');
    const navigate = useNavigate();

    useEffect(async () => {
        if (!isLoading) return;
        // await replicate();
        // process.chdir('../GitBetterTestRepository.gb');
        navigate('/home');
    }, [isLoading]);

    const gitStarted = async () => {
        if (isLoading) return;
        setIsLoading(true);
    }
    
    const searchCommands = ({ target: { value: input }}) => {
        let matches = [];
        if(input.length > 2 && input !== "git") {
          for (var key in gitCommands) {
              if (key.includes(input) || gitCommands[key].includes(input)) {           
                  matches.push({command: key, desc: gitCommands[key]})
              }
          }
          setCommandOpts(matches);
        }
    }

    return(
        <div className="main top-welcome">
            <div className="page-flex">        
                <div className="top-directory">
                    <div className="logo">
                        <img src={logo} alt="logo" />
                        <p className="subtitle">Git, simplified.</p>
                        <Button 
                            variant="outlined" 
                            className="wrapper cta" 
                            onClick={ gitStarted }
                        >
                            Git Started
                        </Button>
                    </div>
                    <div className="start-box">
                        <h1 className="section-header">Start</h1>
                        {/* <div class="start-options">
                            <h2><font-awesome-icon class="faIcon" icon="plus"/>  Create new file</h2>
                            <h2><font-awesome-icon class="faIcon" icon="plus"/>  Open file</h2>
                            <h2><font-awesome-icon class="faIcon" icon="plus"/>  Clone git repository</h2>
                        </div>
                        <h1 class="section-header">Recent</h1>
                        <h2><font-awesome-icon class="faIcon" icon="plus"/>  CS98 GitBetter</h2> */}
                    </div>
                </div>
            </div>

            <div className="vl"></div>

            <div className= "top-help">
                <div className="panel">
                    <h1 className="section-header help-header"> Search for commands...</h1>
                    <div className="panel-block search-comp">
                        <Input
                            onChange={searchCommands}
                            placeholder="How do I do this?" 
                        />
                        <span className="icon is-small is-left">
                            <FaSearch /> 
                        </span>
                    </div>
                    <div className="panel-block results-parent">
                        <div className="panel-block results">
                            { !!commandOpts.length && (
                                <div>
                                    {commandOpts.length === 1
                                    ? "1 result found..."
                                    : commandOpts.length + " results found..."}
                                </div>
                            )} 
                        </div>
                        
                        { commandOpts.map((match, index) => (
                            <div className="panel-block command-blocks" key={`match${index}`}> 
                                { match.command } : { match.desc }
                            </div>
                        ))}
                    </div>
                    </div>
                </div>
            <Loading />
        </div>
    );
}

export default Welcome;