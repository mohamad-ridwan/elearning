import React, { createContext, useState, useEffect } from 'react'

export const PathContext = createContext()

const PathProvider = ({ children }) => {

    const [pathGlobal, setPathGlobal] = useState('')
    const [activeNavmenu, setActiveNavmenu] = useState(false)
    const [activeNavCollapse, setActiveNavCollapse] = useState(false)
    const [overActiveNavmenu, setOverActiveNavmenu] = useState(false)
    const [activeNavmenuDefault, setActiveNavmenuDefault] = useState(false)
    const [dataUserForNavbar, setDataUserForNavbar] = useState({})
    const [idxActiveGlobal, setIdxActiveGlobal] = useState()
    const [headerTable, setHeaderTable] = useState([])
    const [bodyTable, setBodyTable] = useState([])
    const [pathPrintTable, setPathPrintTable] = useState('')
    const [idxOnePrintTable, setIdxOnePrintTable] = useState(null)
    const [idxTwoPrintTable, setIdxTwoPrintTable] = useState(null)
    const [idxHeadPrintTable, setIdxHeadPrintTable] = useState([])
    const [overActiveNavmenuDefault, setOverActiveNavmenuDefault] = useState(false)
    const [activeIconDrop, setActiveIconDrop] = useState(false)

    function activeBodyDesktop(classWrappPage, classActiveWrappPage) {
        const wrappPage = document.getElementsByClassName(classWrappPage)
        const widthBody = window.innerWidth;
        const wrappNavbar = document.getElementsByClassName('wrapp-navbar')[0].getBoundingClientRect().left

        if (widthBody > 576 && wrappNavbar === 230) {
            if (wrappPage.length > 0) {
                wrappPage[0].classList.toggle(classActiveWrappPage)
            }
        }
    }

    function inActiveNavAfterLoadPage() {
        // class navbar active
        const navbarDesktop = document.getElementsByClassName('left-navbar-desktop-active')
        const navbarMobile = document.getElementsByClassName('left-navbar-mobile-active')
        const widthBody = window.innerWidth;

        // navbar
        const wrappNavbar = document.getElementsByClassName('wrapp-navbar')
        const btnNavmenu = document.getElementsByClassName('btn-navmenu')
        const iconBarMenu = document.getElementsByClassName('fa-list-ul')

        // navmenu
        const wrappNavmenu = document.getElementsByClassName('wrapp-navmenu')
        const nameBtnBarNavmenu = document.getElementsByClassName('name-btn-bar-navmenu')
        const iconArrow = document.getElementsByClassName('icon-arrow')
        const iconBarNavmenu = document.getElementsByClassName('icon-bar-navmenu')
        const navCollapse = document.getElementsByClassName('container-nav-collapse')

        // navmenu hover active desktop
        const hoverNavmenu = document.getElementsByClassName('width-wrapp-navmenu-desktop-active')

        if (widthBody < 577) {
            // inActive desktop
            if (navbarDesktop.length > 0) {
                // left navbar
                wrappNavbar[0].classList.remove('left-navbar-desktop')
                wrappNavbar[0].classList.remove('left-navbar-desktop-active')

                // btn navmenu
                btnNavmenu[0].classList.remove('active-btn-navmenu-desktop')
                btnNavmenu[0].classList.remove('btn-navmenu-desktop')

                iconBarMenu[0].classList.remove('active-icon-bar-menu-desktop')
                iconBarMenu[0].classList.remove('icon-bar-menu-desktop')

                // navmenu
                wrappNavmenu[0].classList.remove('width-wrapp-navmenu-desktop-active')

                for (let i = 0; i < nameBtnBarNavmenu.length; i++) {
                    nameBtnBarNavmenu[i].classList.remove('name-btn-bar-navmenu-desktop')
                    nameBtnBarNavmenu[i].classList.remove('name-btn-bar-navmenu-desktop-active')
                }

                iconArrow[2].classList.remove('icon-arrow-desktop')
                iconArrow[2].classList.remove('icon-arrow-desktop-active')

                if (iconBarNavmenu[2].style.backgroundColor == 'rgb(26, 142, 95)') {
                    navCollapse[0].classList.remove('container-nav-collapse-desktop')
                    navCollapse[0].classList.remove('container-nav-collapse-desktop-active')
                }
            } else if (hoverNavmenu.length > 0) {
                // inActive hover active navmenu desktop
                setOverActiveNavmenuDefault(false)
                setActiveNavCollapse(false)

                wrappNavmenu[0].classList.remove('width-wrapp-navmenu-desktop-active')

                for (let i = 0; i < nameBtnBarNavmenu.length; i++) {
                    nameBtnBarNavmenu[i].classList.remove('name-btn-bar-navmenu-desktop')
                    nameBtnBarNavmenu[i].classList.remove('name-btn-bar-navmenu-desktop-active')
                }

                iconArrow[2].classList.remove('icon-arrow-desktop')
                iconArrow[2].classList.remove('icon-arrow-desktop-active')

                if (iconBarNavmenu[2].style.backgroundColor == 'rgb(26, 142, 95)') {
                    navCollapse[0].classList.remove('container-nav-collapse-desktop')
                    navCollapse[0].classList.remove('container-nav-collapse-desktop-active')
                }
            }
        } else if (widthBody > 576) {
            // inActive mobile
            if (navbarMobile.length > 0) {
                // left navbar
                wrappNavbar[0].classList.remove('left-navbar-mobile')
                wrappNavbar[0].classList.remove('left-navbar-mobile-active')

                // btn navmenu
                btnNavmenu[0].classList.remove('active-btn-navmenu-mobile')
                btnNavmenu[0].classList.remove('btn-navmenu-mobile')

                iconBarMenu[0].classList.remove('active-icon-bar-menu-mobile')
                iconBarMenu[0].classList.remove('icon-bar-menu-mobile')

                // navmenu
                wrappNavmenu[0].classList.remove('left-wrapp-navmenu-mobile')
                wrappNavmenu[0].classList.remove('left-wrapp-navmenu-mobile-active')

                for (let i = 0; i < nameBtnBarNavmenu.length; i++) {
                    nameBtnBarNavmenu[i].classList.remove('name-btn-bar-navmenu-mobile')
                }
                iconArrow[2].classList.remove('icon-arrow-mobile')

                if (iconBarNavmenu[2].style.backgroundColor == 'rgb(26, 142, 95)') {
                    navCollapse[0].classList.remove('container-nav-collapse-mobile-active')
                    navCollapse[0].classList.remove('container-nav-collapse-mobile')
                }
            }
        }
    }

    return (
        <PathContext.Provider value={[pathGlobal, setPathGlobal, activeNavmenu, setActiveNavmenu, activeNavCollapse, setActiveNavCollapse, overActiveNavmenu, setOverActiveNavmenu, activeNavmenuDefault, setActiveNavmenuDefault, dataUserForNavbar, setDataUserForNavbar, idxActiveGlobal, setIdxActiveGlobal, headerTable, setHeaderTable, bodyTable, setBodyTable, pathPrintTable, setPathPrintTable, idxOnePrintTable, setIdxOnePrintTable, idxTwoPrintTable, setIdxTwoPrintTable, idxHeadPrintTable, setIdxHeadPrintTable, overActiveNavmenuDefault, setOverActiveNavmenuDefault, activeBodyDesktop, activeIconDrop, setActiveIconDrop, inActiveNavAfterLoadPage]}>
            {children}
        </PathContext.Provider>
    )
}

export default PathProvider;