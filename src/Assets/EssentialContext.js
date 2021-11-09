import React, { createContext, useState } from 'react'

export const EssentialContext = createContext()

export function EssentialProvider({children}) {
    const [essentials,setEssentials] = useState({
        params: null,
        query: null,
        path: null,
        branch: null,
        heading : "Github Browser"
    })
    return (
        <EssentialContext.Provider value={[essentials,setEssentials]}>
            {children}
        </EssentialContext.Provider>
    )
}
