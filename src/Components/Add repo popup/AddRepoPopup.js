import React, { useContext } from 'react'
import './AddRepoPopup.scss'
import { GrClose } from 'react-icons/gr'
import { EssentialContext } from '../../Assets/EssentialContext'

export default function AddRepoPopup() {
    const [essentials, setEssentials] = useContext(EssentialContext)

    const handleSubmission = (event) =>{
        event.preventDefault();
        window.alert("You must need personal token for add a new repository.")
    }
    return (
        <section className="add-repo-popup-wrapper">
            <form onSubmit={handleSubmission} className="add-repo-popup">
                <h3>Add new repository</h3>
                <label htmlFor="owner">Owner/Organization</label>
                <input type="text" name="owner" id="owner" />
                <label htmlFor="repo">Repository Name</label>
                <input type="text" name="repo" id="repo" />
                <button className="add-repo-btn" type="submit">Add</button>
                <div onClick={()=>setEssentials({...essentials,addRepo:false})} className="close-btn">
                    <GrClose/>
                </div>
            </form>
            
        </section>
    )
}
