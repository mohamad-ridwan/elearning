import React, { useContext } from 'react'
import './Navbar.scss'
import { PathContext } from '../../services/context/path';

function Navbar() {

    const [pathGlobal, setPathGlobal, activeNavmenu, setActiveNavmenu, activeNavCollapse, setActiveNavCollapse, overActiveNavmenu, setOverActiveNavmenu, activeNavmenuDefault, setActiveNavmenuDefault] = useContext(PathContext)

    const styleNavbar = {
        display: pathGlobal === '/login' ? 'none' : 'flex',
        left: activeNavmenu ? '230px' : '75px'
    }

    const btnNavmenu = document.getElementsByClassName('btn-navmenu')
    const iconBarMenu = document.getElementsByClassName('fa-bars')

    function toActiveNavmenu() {
        setActiveNavmenu(!activeNavmenu)

        if (activeNavmenuDefault) {
            setActiveNavCollapse(!activeNavCollapse)
        }

        btnNavmenu[0].classList.toggle('active-btn-navmenu')
        iconBarMenu[0].classList.toggle('active-icon-bar-menu')
    }

    return (
        <>
            <div className="wrapp-navbar" style={styleNavbar}>
                <div className="column-kiri-navbar">
                    <button className="btn-navmenu" onClick={toActiveNavmenu}>
                        <i className="fas fa-bars"></i>
                    </button>

                    <p className="name-web">
                        E-Learning
                    </p>
                </div>
                <div className="column-kanan-navbar">
                    <button className="btn-profile-navbar">
                        15200060
                        <i className="fas fa-user"></i>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Navbar;