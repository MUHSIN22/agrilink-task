import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { EssentialContext } from '../../Assets/EssentialContext'
import Issue from '../Issue card/Issue'
import RepositoryBar from '../Repository bar/RepositoryBar'
import './Home.scss'

export default function Home() {
    const [repositories, setRepositories ] = useState(null)
    const [ branches, setBranches ] = useState(null)
    const [ issues, setIssues ] = useState(null)
    const [ path, setPath ] = useState(null)
    const [ essentials, setEssentials ] = useContext(EssentialContext)
    
    const history = useHistory();

    useEffect(() =>{
            getRepositories();
            getBranchesOfRepo(essentials.query);
            getIssuesOfRepo(essentials.query);

    },[essentials])


    // Function for fetch repositories
    const getRepositories =() =>{
        fetch("https://api.github.com/search/repositories?q=react")
        .then(res =>(
            res.json()
        ))
        .then(data =>{
            setRepositories(data.items)
            if(essentials.query === null){
                setEssentials({...essentials,query:data.items[0].full_name, path: 'branch'});
            }
        })
    }

    // function for fetch the Branches
    const getBranchesOfRepo = (query) =>{
        fetch(`https://api.github.com/repos/${query}/branches`)
        .then(res => res.json())
        .then( data =>{
            setBranches(data)
        })
    }

    // Function for fetch the issues
    const getIssuesOfRepo = (query) => {
        fetch(`https://api.github.com/repos/${query}/issues`)
        .then( res => res.json())
        .then( data => {
            setIssues(data);
        })
    }

    // Function for delete the repositories
    const deleteRepo = () =>{
        fetch(` https://api.github.com/repos/${essentials.query}`,{
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(result => 
            window.alert(result.message)    
        )
        
    }

    // Function for handle the branch card
    const handleBranchCard = (param) =>{
        setEssentials({...essentials,params:param })
        history.push('/commits')
    }

    // Function for repo nav link handling
    const handleRepoNavLink = (event) => {
        switch (event.target.id){
            case "repo-nav-link-1":
                setPath('branch');
                break;
            case "repo-nav-link-2":
                setPath('issues');
                break;
            default:
                break;
        }
        const activeRepo = document.querySelector('.repo-nav-active')
        if(activeRepo){
            activeRepo.classList.remove('repo-nav-active')
        }
        event.target.classList.add('repo-nav-active')
    }
    return (
        <main className="home">
            <nav className="repository-nav">
                {
                    repositories &&
                    repositories.map((repo, index ) =>(
                        <RepositoryBar 
                            key={index}
                            name={repo.full_name}
                            description={repo.description}
                        />
                    ))
                }
            </nav>
            <section className="main-content">
                <div className="btn-delete-wrapper">
                    <button className="btn-delete" onClick={deleteRepo}>Delete</button>
                </div>
                <div className="repo-details">
                    <nav className="repo-details-nav">
                        <p className="repo-nav-link" id="repo-nav-link-1" onClick={handleRepoNavLink}>Branches</p>
                        <p className="repo-nav-link" id="repo-nav-link-2" onClick={handleRepoNavLink}>Issues</p>
                    </nav>
                        {
                            path && path === 'branch' ?
                            <>
                                {
                                    branches &&
                                    branches.map((branch,index) =>(
                                        <div  onClick={() => handleBranchCard(branch.name)} key={index} className="branch-cards">
                                            <h5>{branch.name}</h5>
                                        </div>
                                    ))
                                }
                            </>
                            : (path && path === 'issues') ?
                            <>
                                {
                                    issues && 
                                    issues.map((issue,index) =>(
                                        <Issue
                                            key={index}
                                            authorName={issue.user.login}
                                            authorAvatar={issue.user.avatar_url}
                                            issue={issue.title}
                                        />
                                    ))
                                }
                            </> : null
                        }
                </div>
            </section>
        </main>
    )
}
