import React, { useContext, useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import './Navbar.scss'
import { PathContext } from '../../services/context/path';
import HoverButton from '../hoverbutton/HoverButton';
import API from '../../services/api';
import endpoint from '../../services/api/endpoint';

function Navbar() {

    const [pathGlobal, setPathGlobal, activeNavmenu, setActiveNavmenu, activeNavCollapse, setActiveNavCollapse, overActiveNavmenu, setOverActiveNavmenu, activeNavmenuDefault, setActiveNavmenuDefault, dataUserForNavbar, setDataUserForNavbar, idxActiveGlobal, setIdxActiveGlobal] = useContext(PathContext)
    const [onDisplayHover, setOnDisplayHover] = useState(false)
    const [positionLeft, setPositionLeft] = useState('')
    const [positionTop, setPositionTop] = useState('')
    const [displayCloseBtn, setDisplayCloseBtn] = useState(false)

    const getTokenUser = Cookies.get('e-learning')

    const history = useHistory()

    function setAllAPI() {
        API.APIGetDashboard(getTokenUser)
            .then(res => {
                if (res && res.data) {
                    setDataUserForNavbar(res.data.user.data)
                } else {
                    history.push('/login')
                    document.cookie = 'e-learning='
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        setAllAPI();
    }, [])

    const styleNavbar = {
        display: pathGlobal === '/login' || pathGlobal === '/storage' ? 'none' : 'flex',
        left: activeNavmenu ? '230px' : '75px'
    }

    const btnNavmenu = document.getElementsByClassName('btn-navmenu')
    const iconBarMenu = document.getElementsByClassName('fa-list-ul')
    const btnBarMenu = document.getElementsByClassName('btn-bar-navmenu')

    function toActiveNavmenu() {
        setActiveNavmenu(!activeNavmenu)

        if (activeNavmenuDefault) {
            setActiveNavCollapse(!activeNavCollapse)
        }

        btnNavmenu[0].classList.toggle('active-btn-navmenu')
        iconBarMenu[0].classList.toggle('active-icon-bar-menu')
    }

    const btnProfile = document.getElementsByClassName('btn-profile-navbar')

    function clickProfile() {
        const getPositionBtn = btnProfile[0].getBoundingClientRect()
        const roundValueLeft = Math.floor(getPositionBtn.left)
        const roundValueTop = Math.floor(getPositionBtn.top)

        setPositionLeft(`${roundValueLeft - 50}px`)
        setPositionTop(`${roundValueTop + 40}px`)
        setOnDisplayHover(true)
        setDisplayCloseBtn(true)
    }

    function closeModal() {
        setOnDisplayHover(false)
        setDisplayCloseBtn(false)
    }

    const btnGroupHoverBtn = document.getElementsByClassName('btn-group-hover-button')

    function hoverModalProfile(idx) {
        btnGroupHoverBtn[idx].style.backgroundColor = '#1a8e5f'
        btnGroupHoverBtn[idx].style.color = '#fff'
    }

    function leaveModalProfile(idx) {
        btnGroupHoverBtn[idx].style.backgroundColor = 'transparent'
        btnGroupHoverBtn[idx].style.color = '#333'
    }

    function toProfile(path) {
        history.push(path)
        setOnDisplayHover(false)
        setDisplayCloseBtn(false)
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

        btnNavmenu[0].classList.remove('active-btn-navmenu')
        iconBarMenu[0].classList.remove('active-icon-bar-menu')
    }

    function toLogout(path) {
        history.push(path)
        document.cookie = 'e-learning='
        changeNavmenuAfterLogout();
        setOnDisplayHover(false)
        setDisplayCloseBtn(false)
    }

    return (
        <>
            <div className="wrapp-navbar" style={styleNavbar}>
                <div className="column-kiri-navbar">
                    <button className="btn-navmenu" onClick={toActiveNavmenu}>
                        <i className="fas fa-list-ul"></i>
                    </button>

                    <p className="name-web">
                        E-Learning
                    </p>
                </div>

                <div className="column-kanan-navbar">
                    <button className="btn-profile-navbar"
                        onClick={clickProfile}
                    >
                        {dataUserForNavbar && dataUserForNavbar.nim}
                        <div className="column-img-profile-navbar">
                            {dataUserForNavbar && dataUserForNavbar.image ? (
                                <img src={`${endpoint}/${dataUserForNavbar.image}`} alt="" className="img-profile-navbar" />
                            ) : (
                                <i className="fas fa-user"></i>
                            )}
                        </div>
                    </button>
                </div>

                <HoverButton
                    displayWrapp={onDisplayHover ? 'flex' : 'none'}
                    displayCloseModal={displayCloseBtn ? 'flex' : 'none'}
                    displayBtnGroup="flex"
                    fontSizeBtnGroup="12px"
                    colorBtnGroup="#333"
                    paddingBtnGroup="7px 60px 7px 15px"
                    bdrRadiusWrapp="0px 0px 5px 5px"
                    marginIcon="0 10px 0 0"
                    paddingWrapp="20px 0"
                    colorNameHover="#fff"
                    fontSizeNameHover="10px"
                    topWrapp={positionTop}
                    leftWrapp={positionLeft}
                    bgColorWrapp="#fff"
                    nameBtn1="My Profile"
                    icon1="far fa-user"
                    nameBtn2="Logout"
                    icon2="fas fa-sign-out-alt"
                    click1={() => toProfile('/profile')}
                    click2={() => toLogout('/login')}
                    closeModal={closeModal}
                    mouseOverBtn1={() => hoverModalProfile(0)}
                    mouseLeaveBtn1={() => leaveModalProfile(0)}
                    mouseOverBtn2={() => hoverModalProfile(1)}
                    mouseLeaveBtn2={() => leaveModalProfile(1)}
                    shadowWrapp="20px 20px 20px -1px rgba(0,0,0,0.3)"
                />
            </div>
        </>
    )
}

export default Navbar;