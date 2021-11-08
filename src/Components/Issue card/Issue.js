import React from 'react'
import './Issue.scss'
export default function Issue({issue, authorAvatar, authorName, date}) {
    return (
        <div className="issue-card">
            <p>{date}</p>
            <h2 className="issue-title">{issue}</h2>
            <div className="issue-author">
                <img src={authorAvatar} className="author-avatar" alt="" />
                <p>{authorName}</p>
            </div>
        </div>
    )
}
