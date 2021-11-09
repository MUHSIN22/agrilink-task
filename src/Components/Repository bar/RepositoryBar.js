import React, { useContext } from 'react'
import { EssentialContext } from '../../Assets/EssentialContext'
import './RepositoryBar.scss'

export default function RepositoryBar({ name, description}) {
    const [essentials, setEssentials] = useContext(EssentialContext)

    const handleRepoClick = (event) => {
        setEssentials({...essentials,query: name })   
        const activeRepo = document.querySelector('.repository-bar-active')
        if(activeRepo){
            activeRepo.classList.remove('repository-bar-active')
        }
        event.target.classList.add('repository-bar-active')
    }
    return (
        <div onClick={handleRepoClick} className="repository-bar">
            <h6 className="repo-name">{name}</h6>
            <p>{description}</p>
        </div>
    )
}

