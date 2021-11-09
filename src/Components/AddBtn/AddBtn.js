import React, { useContext } from 'react'
import { EssentialContext } from '../../Assets/EssentialContext'
import './AddBtn.scss'

export default function AddBtn() {
    const [ essentials, setEssentials ] = useContext(EssentialContext)
     
    return (
        <button onClick={() => setEssentials({...essentials,addRepo: true})} className="btn-add-repo">
            +
        </button>
    )
}
