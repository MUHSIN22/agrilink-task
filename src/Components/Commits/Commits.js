import React, { useEffect } from 'react'
import './Commits.scss'

export default function Commits() {
    const queryParams = new URLSearchParams(window.location.search)
    const query = queryParams.get('r');
    const branch = queryParams.get('branch')

    useEffect(() => {
        console.log(branch,query);
    },[])

    const getCommits = () =>{

    }
    return (
        <div className="commits-section">
            <div className="commits-wrapper">
                <div className="commit-card">
                    <issueCard

                    />
                </div>
            </div>
        </div>
    )
}
