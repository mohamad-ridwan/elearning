import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router'
import './Navmenu.scss'
import { PathContext } from '../../services/context/path'

function Navmenu() {

    const [pathGlobal, setPathGlobal, activeNavmenu, setActiveNavmenu, activeNavCollapse, setActiveNavCollapse, overActiveNavmenu, setOverActiveNavmenu, activeNavmenuDefault, setActiveNavmenuDefault, dataUserForNavbar, setDataUserForNavbar, idxActiveGlobal, setIdxActiveGlobal, headerTable, setHeaderTable, bodyTable, setBodyTable, pathPrintTable, setPathPrintTable, idxOnePrintTable, setIdxOnePrintTable, idxTwoPrintTable, setIdxTwoPrintTable, idxHeadPrintTable, setIdxHeadPrintTable, overActiveNavmenuDefault, setOverActiveNavmenuDefault, activeBodyDesktop, activeIconDrop, setActiveIconDrop] = useContext(PathContext)
    const [btnNavmenu] = useState([
        {
            name: 'Dashboard',
            icon: 'fas fa-desktop',
            path: '',
        },
        {
            name: 'Profil',
            icon: 'fas fa-user-circle',
            path: '/profile'
        },
        {
            name: 'Jadwal',
            icon: 'far fa-calendar',
            iconArrow: 'fas fa-angle-down',
            menuCollapse: [
                {
                    name: 'Jadwal Kuliah',
                    path: '/jadwal-kuliah'
                },
                {
                    name: 'Kuliah Pengganti',
                    path: '/kuliah-pengganti'
                }
            ]
        },
        {
            name: 'Logout',
            icon: 'fas fa-sign-out-alt',
            path: '/login'
        },
    ])

    const history = useHistory()
    const getPath = window.location.pathname

    const widthBody = document.body.getBoundingClientRect().width;

    const btnBarMenu = document.getElementsByClassName('btn-bar-navmenu')

    const styleNavmenu = {
        display: getPath === '/login' || getPath.includes('/print-table') ? 'none' : 'flex',
    }

    const styleIconArrow = {
        transform: activeIconDrop ? 'rotate(180deg)' : 'rotate(0deg)'
    }

    const navCollapse = document.getElementsByClassName('container-nav-collapse')

    function getMenuCollapse() {
        const lebarBody = document.body.getBoundingClientRect().width;

        setActiveNavCollapse(!activeNavCollapse)

        if (lebarBody < 577) {
            // mobile
            if (activeNavCollapse) {
                navCollapse[0].classList.toggle('container-nav-collapse-mobile')
                navCollapse[0].classList.toggle('container-nav-collapse-mobile-active')

                navCollapse[0].classList.remove('container-nav-collapse-desktop')
                navCollapse[0].classList.remove('container-nav-collapse-desktop-active')
            } else {
                navCollapse[0].classList.toggle('container-nav-collapse-mobile')
                navCollapse[0].classList.toggle('container-nav-collapse-mobile-active')

                navCollapse[0].classList.remove('container-nav-collapse-desktop')
                navCollapse[0].classList.remove('container-nav-collapse-desktop-active')
            }
        } else if (widthBody > 576) {
            // tablet - desktop
            if (activeNavCollapse) {
                navCollapse[0].classList.toggle('container-nav-collapse-desktop')
                navCollapse[0].classList.toggle('container-nav-collapse-desktop-active')

                navCollapse[0].classList.remove('container-nav-collapse-mobile')
                navCollapse[0].classList.remove('container-nav-collapse-mobile-active')
            } else {
                navCollapse[0].classList.toggle('container-nav-collapse-desktop')
                navCollapse[0].classList.toggle('container-nav-collapse-desktop-active')

                navCollapse[0].classList.remove('container-nav-collapse-mobile')
                navCollapse[0].classList.remove('container-nav-collapse-mobile-active')
            }
        }
        setActiveNavmenuDefault(!activeNavmenuDefault)
    }

    function toPage(path) {
        history.push(path)

        if (path === '/login') {
            document.cookie = 'e-learning='
        }

        if (path == undefined) {
            getMenuCollapse();
            setActiveIconDrop(!activeIconDrop)
            btnBarMenu[2].classList.toggle('active-bar-navmenu')
            if (idxActiveGlobal == undefined) {
                setIdxActiveGlobal(2)
            } else {
                setIdxActiveGlobal()
            }
        }
    }

    // navbar
    const wrappNavbar = document.getElementsByClassName('wrapp-navbar')
    const ElementBtnNavmenu = document.getElementsByClassName('btn-navmenu')
    const iconBarMenu = document.getElementsByClassName('fa-list-ul')

    // navmenu
    const wrappNavmenu = document.getElementsByClassName('wrapp-navmenu')
    const nameBtnBarNavmenu = document.getElementsByClassName('name-btn-bar-navmenu')
    const iconArrow = document.getElementsByClassName('icon-arrow')
    const iconBarNavmenu = document.getElementsByClassName('icon-bar-navmenu')

    function toActiveNavmenu() {
        // left navbar
        wrappNavbar[0].classList.remove('left-navbar-mobile')
        wrappNavbar[0].classList.remove('left-navbar-mobile-active')

        // btn navmenu
        ElementBtnNavmenu[0].classList.remove('active-btn-navmenu-mobile')
        ElementBtnNavmenu[0].classList.remove('btn-navmenu-mobile')

        iconBarMenu[0].classList.remove('active-icon-bar-menu-mobile')
        iconBarMenu[0].classList.remove('icon-bar-menu-mobile')

        // navmenu
        wrappNavmenu[0].classList.toggle('width-wrapp-navmenu-desktop-active')

        wrappNavmenu[0].classList.remove('left-wrapp-navmenu-mobile')
        wrappNavmenu[0].classList.remove('left-wrapp-navmenu-mobile-active')

        for (let i = 0; i < nameBtnBarNavmenu.length; i++) {
            nameBtnBarNavmenu[i].classList.remove('name-btn-bar-navmenu-mobile')

            nameBtnBarNavmenu[i].classList.toggle('name-btn-bar-navmenu-desktop')
            nameBtnBarNavmenu[i].classList.toggle('name-btn-bar-navmenu-desktop-active')
        }
        iconArrow[2].classList.remove('icon-arrow-mobile')

        iconArrow[2].classList.toggle('icon-arrow-desktop')
        iconArrow[2].classList.toggle('icon-arrow-desktop-active')

        if (iconBarNavmenu[2].style.backgroundColor == 'rgb(26, 142, 95)') {
            navCollapse[0].classList.remove('container-nav-collapse-mobile-active')
            navCollapse[0].classList.remove('container-nav-collapse-mobile')

            navCollapse[0].classList.toggle('container-nav-collapse-desktop-active')
            navCollapse[0].classList.remove('container-nav-collapse-desktop')
        }
    }

    function toInActiveNavmenu() {
        wrappNavmenu[0].classList.toggle('width-wrapp-navmenu-desktop-active')

        for (let i = 0; i < nameBtnBarNavmenu.length; i++) {
            nameBtnBarNavmenu[i].classList.remove('name-btn-bar-navmenu-mobile')

            nameBtnBarNavmenu[i].classList.toggle('name-btn-bar-navmenu-desktop')
            nameBtnBarNavmenu[i].classList.toggle('name-btn-bar-navmenu-desktop-active')
        }
        iconArrow[2].classList.remove('icon-arrow-mobile')

        iconArrow[2].classList.toggle('icon-arrow-desktop')
        iconArrow[2].classList.toggle('icon-arrow-desktop-active')

        if (iconBarNavmenu[2].style.backgroundColor == 'rgb(26, 142, 95)') {
            navCollapse[0].classList.remove('container-nav-collapse-desktop')
            navCollapse[0].classList.toggle('container-nav-collapse-desktop-active')

            navCollapse[0].classList.remove('container-nav-collapse-mobile-active')
            navCollapse[0].classList.remove('container-nav-collapse-mobile')
        }
    }

    function mouseOver() {
        const lebarBody = document.body.getBoundingClientRect().width;
        const wrappNavbar = document.getElementsByClassName('wrapp-navbar')[0].getBoundingClientRect().left

        if (lebarBody > 577) {
            if (wrappNavbar === 75) {
                if (overActiveNavmenuDefault === false) {
                    toActiveNavmenu();
                    setOverActiveNavmenuDefault(true)
                }

                if (activeNavmenuDefault) {
                    setActiveNavCollapse(true)
                }
            }
        }
    }

    function mouseLeave() {
        const lebarBody = document.body.getBoundingClientRect().width;
        const wrappNavbar = document.getElementsByClassName('wrapp-navbar')[0].getBoundingClientRect().left

        if (lebarBody > 577) {
            if (wrappNavbar === 75) {
                if (overActiveNavmenuDefault) {
                    toInActiveNavmenu();
                    setOverActiveNavmenuDefault(false)
                }
                if (activeNavmenuDefault) {
                    setActiveNavCollapse(false)
                }
            }
        }
    }

    function mouseOverBtnMenu(index) {
        for (let i = 0; i < 4; i++) {
            btnBarMenu[i].classList.remove('active-bar-navmenu')
        }
        btnBarMenu[index].classList.add('active-bar-navmenu')

        if (idxActiveGlobal !== undefined) {
            btnBarMenu[idxActiveGlobal].classList.add('active-bar-navmenu')
        }
    }

    function mouseLeaveBtnMenu() {
        for (let i = 0; i < 4; i++) {
            btnBarMenu[i].classList.remove('active-bar-navmenu')
        }

        if (idxActiveGlobal !== undefined) {
            btnBarMenu[idxActiveGlobal].classList.add('active-bar-navmenu')
        }
    }

    return (
        <>
            <div className="wrapp-navmenu" style={styleNavmenu}
                onMouseOver={mouseOver}
                onMouseLeave={mouseLeave}
            >
                <p className="txt-menu">
                    MENU
                </p>

                <div className="container-btn-bar-navmenu"
                    onMouseLeave={mouseLeaveBtnMenu}
                >
                    {btnNavmenu.map((e, i) => {

                        const menuCollapse = e.menuCollapse

                        const iconActive = activeNavmenuDefault ? '#1a8e5f' : '#ebeff5'
                        const borderRadiusActive = activeNavmenuDefault ? '500px' : '2px'
                        const colorActive = activeNavmenuDefault ? '#fff' : '#333'

                        return (
                            <>
                                <button key={i} className="btn-bar-navmenu" onClick={() => toPage(e.path)}
                                    onMouseOver={() => mouseOverBtnMenu(i)}
                                    onMouseLeave={() => mouseLeaveBtnMenu()}
                                >
                                    <i className={`${e.icon} icon-bar-navmenu`} style={{
                                        backgroundColor: i === 2 ? iconActive : '#ebeff5',
                                        borderRadius: i === 2 ? borderRadiusActive : '2px',
                                        color: i === 2 ? colorActive : '#333'
                                    }}></i>
                                    <p className="name-btn-bar-navmenu">
                                        {e.name}
                                    </p>

                                    <i className={`${e.iconArrow} icon-arrow`} style={styleIconArrow}></i>
                                </button>

                                {menuCollapse !== undefined ? (
                                    <>
                                        <div className="container-nav-collapse">
                                            {menuCollapse !== undefined ? menuCollapse.map((e, i) => {
                                                return (
                                                    <>
                                                        <button key={i} className="btn-menu-collapse" onClick={() => toPage(e.path)}>
                                                            <i className="fas fa-arrow-right"></i>
                                                            {e.name}
                                                        </button>
                                                    </>
                                                )
                                            }) : (
                                                <div></div>
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <div></div>
                                )}
                            </>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Navmenu;