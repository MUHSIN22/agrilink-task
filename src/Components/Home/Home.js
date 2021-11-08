import React, { useEffect, useState } from 'react'
import { Link, Switch ,Route, useHistory } from 'react-router-dom'
import Issue from '../Issue card/Issue'
import RepositoryBar from '../Repository bar/RepositoryBar'
import './Home.scss'

export default function Home() {
    const [repositories, setRepositories ] = useState(null)
    const [ branches, setBranches ] = useState(null)
    const [ issues, setIssues ] = useState(null)
    const history = useHistory()

    const queryParams = new URLSearchParams(window.location.search);
    const query = queryParams.get('r')
    
    
    useEffect(() =>{
        getRepositories();
        getIssuesOfRepo();
        getBranchesOfRepo();
    },[])


    // Function for fetch repositories
    const getRepositories =() =>{
        fetch("https://api.github.com/search/repositories?q=react")
        .then(res =>(
            res.json()
        ))
        .then(data =>{
            setRepositories(data.items)
            if(!query){
                history.push(`/branch?r=${data.items[0].full_name}`)
            }
        })
    }

    // function for fetch the Branches
    const getBranchesOfRepo = () =>{
        fetch(`https://api.github.com/repos/${query}/branches`)
        .then(res => res.json())
        .then( data =>{
            setBranches(data)
        })
    }

    // Function for fetch the issues
    const getIssuesOfRepo = () => {
        fetch(`https://api.github.com/repos/${query}/issues`)
        .then( res => res.json())
        .then( data => {
            setIssues(data);
        })
    }

    // Function for delete the repositories
    const deleteRepo = () =>{
        fetch(` https://api.github.com/repos/${query}`,{
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(result => 
            window.alert(result.message)    
        )
        
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
                        <Link to={`/branch?r=${query}`}>Branches</Link>
                        <Link to={`/issues?r=${query}`}>Issues</Link>
                    </nav>
                    <Switch>
                        <Route path="/branch" exact>
                            {
                                branches &&
                                branches.map((branch,index) =>(
                                    <div onClick={() => history.push(`/commits?branch=${branch.name}&r=${query}`)} key={index} className="branch-cards">
                                        <h5>{branch.name}</h5>
                                    </div>
                                ))
                            }
                        </Route>
                        <Route path="/issues">
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
                        </Route>
                    </Switch>
                </div>
            </section>
        </main>
    )
}
