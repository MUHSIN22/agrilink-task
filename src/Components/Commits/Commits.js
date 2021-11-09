import React, { useContext, useEffect, useState } from 'react'
import { EssentialContext } from '../../Assets/EssentialContext';
import Issue from '../Issue card/Issue';
import './Commits.scss'

export default function Commits() {
    const [ commits, setCommits ] = useState()
    const [essentials, setEssentials ] = useContext(EssentialContext)
    const branch = essentials.params;
    const query = essentials.query;

    useEffect(() => {
        getCommits();
        setEssentials({...essentials,heading:`Commits:${branch}`})
        return ()  => {
            console.log('clean up');
            setEssentials({...essentials,heading:`Github browser`})
        }
    },[])

    const getCommits = () =>{
        fetch(`https://api.github.com/repos/${query}/commits?sha=${branch}`)
        .then(res => res.json())
        .then(res => {
            setCommits(res)
        })
    }
    return (
        <div className="commits-section">
            <div className="commits-wrapper">
                <div className="commit-card">
                    {
                        commits && 
                        commits.map((commit, index) =>(
                            <Issue
                                key={index}
                                date={commit.commit.author.date}
                                authorName={commit.commit.author.name}
                                authorAvatar={commit.author.avatar_url}
                                issue={commit.commit.message}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
