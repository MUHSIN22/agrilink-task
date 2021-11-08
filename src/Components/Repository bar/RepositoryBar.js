import React from 'react'
import { useHistory } from 'react-router'
import './RepositoryBar.scss'

export default function RepositoryBar({ name, description}) {
    const history = useHistory()

    return (
        <div onClick={()=> {
                history.push(`/branch?r=${name}`) 
            }
            } className="repository-bar">
            <h6 className="repo-name">{name}</h6>
            <p>{description}</p>
        </div>
    )
}

