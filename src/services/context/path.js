import React, { createContext, useState } from 'react'

export const PathContext = createContext()

const PathProvider = ({ children }) => {

    const [pathGlobal, setPathGlobal] = useState('')
    const [activeNavmenu, setActiveNavmenu] = useState(false)
    const [activeNavCollapse, setActiveNavCollapse] = useState(false)
    const [overActiveNavmenu, setOverActiveNavmenu] = useState(false)
    const [activeNavmenuDefault, setActiveNavmenuDefault] = useState(false)

    return (
        <PathContext.Provider value={[pathGlobal, setPathGlobal, activeNavmenu, setActiveNavmenu, activeNavCollapse, setActiveNavCollapse, overActiveNavmenu, setOverActiveNavmenu, activeNavmenuDefault, setActiveNavmenuDefault]}>
            {children}
        </PathContext.Provider>
    )
}

export default PathProvider;