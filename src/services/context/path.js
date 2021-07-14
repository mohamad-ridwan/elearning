import React, { createContext, useState, useEffect } from 'react'
import API from '../api'

export const PathContext = createContext()

const PathProvider = ({ children }) => {

    const [pathGlobal, setPathGlobal] = useState('')
    const [activeNavmenu, setActiveNavmenu] = useState(false)
    const [activeNavCollapse, setActiveNavCollapse] = useState(false)
    const [overActiveNavmenu, setOverActiveNavmenu] = useState(false)
    const [activeNavmenuDefault, setActiveNavmenuDefault] = useState(false)
    const [dataUserForNavbar, setDataUserForNavbar] = useState({})
    const [idxActiveGlobal, setIdxActiveGlobal] = useState()

    return (
        <PathContext.Provider value={[pathGlobal, setPathGlobal, activeNavmenu, setActiveNavmenu, activeNavCollapse, setActiveNavCollapse, overActiveNavmenu, setOverActiveNavmenu, activeNavmenuDefault, setActiveNavmenuDefault, dataUserForNavbar, setDataUserForNavbar, idxActiveGlobal, setIdxActiveGlobal]}>
            {children}
        </PathContext.Provider>
    )
}

export default PathProvider;