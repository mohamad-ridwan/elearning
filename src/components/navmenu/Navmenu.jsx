import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router'
import './Navmenu.scss'
import { PathContext } from '../../services/context/path'

function Navmenu() {

    const [pathGlobal, setPathGlobal, activeNavmenu, setActiveNavmenu, activeNavCollapse, setActiveNavCollapse, overActiveNavmenu, setOverActiveNavmenu, activeNavmenuDefault, setActiveNavmenuDefault, dataUserForNavbar, setDataUserForNavbar, idxActiveGlobal, setIdxActiveGlobal] = useContext(PathContext)
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

    const btnBarMenu = document.getElementsByClassName('btn-bar-navmenu')

    // btn menu navbar
    const ElementBtnNavmenu = document.getElementsByClassName('btn-navmenu')
    const iconBarMenu = document.getElementsByClassName('fa-list-ul')

    const styleNavmenu = {
        display: pathGlobal === '/login' ? 'none' : 'flex',
        width: overActiveNavmenu || activeNavmenu ? '230px' : '75px'
    }

    const styleContainerNavCollapse = {
        height: activeNavCollapse ? '62px' : '0px'
    }

    const styleIconArrow = {
        display: overActiveNavmenu || activeNavmenu ? 'flex' : 'none',
        transform: activeNavCollapse ? 'rotate(180deg)' : 'rotate(0deg)'
    }

    function getMenuCollapse() {
        setActiveNavCollapse(!activeNavCollapse)
        setActiveNavmenuDefault(!activeNavmenuDefault)
    }

    function changeNavmenuAfterLogout() {
        setActiveNavCollapse(false)
        setActiveNavmenu(false)
        setActiveNavmenuDefault(false)
        setOverActiveNavmenu(false)
        setIdxActiveGlobal()

        for (let i = 0; i < 4; i++) {
            btnBarMenu[i].classList.remove('active-bar-navmenu')
        }

        ElementBtnNavmenu[0].classList.remove('active-btn-navmenu')
        iconBarMenu[0].classList.remove('active-icon-bar-menu')
    }

    function toPage(path) {
        history.push(path)

        if (path === '/login') {
            document.cookie = 'e-learning='
            changeNavmenuAfterLogout();
        }

        if (path == undefined) {
            getMenuCollapse();
            btnBarMenu[2].classList.toggle('active-bar-navmenu')
            if (idxActiveGlobal == undefined) {
                setIdxActiveGlobal(2)
            } else {
                setIdxActiveGlobal()
            }
        }
    }

    function mouseOver() {
        if (activeNavmenu === false) {
            setOverActiveNavmenu(true)

            if (activeNavmenuDefault) {
                setActiveNavCollapse(true)
            }
        }
    }

    function mouseLeave() {
        setOverActiveNavmenu(false)

        if (activeNavmenu === false) {
            if (activeNavmenuDefault) {
                setActiveNavCollapse(false)
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
                                    <i className={e.icon} style={{
                                        backgroundColor: i === 2 ? iconActive : '#ebeff5',
                                        borderRadius: i === 2 ? borderRadiusActive : '2px',
                                        color: i === 2 ? colorActive : '#333'
                                    }}></i>
                                    {overActiveNavmenu || activeNavmenu ? e.name : ''}

                                    <i className={`${e.iconArrow} icon-arrow`} style={styleIconArrow}></i>
                                </button>

                                {menuCollapse !== undefined ? (
                                    <>
                                        <div className="container-nav-collapse" style={styleContainerNavCollapse}>
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