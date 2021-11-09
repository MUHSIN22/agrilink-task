import React, { useContext } from 'react'
import { EssentialContext } from '../../Assets/EssentialContext'
import './Header.scss'

export default function Header() {
    const [essentials, setEssentials] = useContext(EssentialContext)
    return (
        <header className="header">
            <h1>{essentials.heading}</h1>
        </header>
    )
}
