import React, { useContext, useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import './Navbar.scss'
import { PathContext } from '../../services/context/path';
import HoverButton from '../hoverbutton/HoverButton';
import API from '../../services/api';
import endpoint from '../../services/api/endpoint';

function Navbar() {

    const [pathGlobal, setPathGlobal, activeNavmenu, setActiveNavmenu, activeNavCollapse, setActiveNavCollapse, overActiveNavmenu, setOverActiveNavmenu, activeNavmenuDefault, setActiveNavmenuDefault, dataUserForNavbar, setDataUserForNavbar, idxActiveGlobal, setIdxActiveGlobal, headerTable, setHeaderTable, bodyTable, setBodyTable, pathPrintTable, setPathPrintTable, idxOnePrintTable, setIdxOnePrintTable, idxTwoPrintTable, setIdxTwoPrintTable, idxHeadPrintTable, setIdxHeadPrintTable, overActiveNavmenuDefault, setOverActiveNavmenuDefault] = useContext(PathContext)
    const [onDisplayHover, setOnDisplayHover] = useState(false)
    const [positionLeft, setPositionLeft] = useState('')
    const [positionTop, setPositionTop] = useState('')
    const [displayCloseBtn, setDisplayCloseBtn] = useState(false)

    const getTokenUser = Cookies.get('e-learning')

    const history = useHistory()
    const getPath = window.location.pathname

    function setAllAPI() {
        if (getPath !== '/forgot-password' && getPath !== '/create-new-password' && getPath !== '/verifikasi-create-new-password') {
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
    }

    useEffect(() => {
        setAllAPI();
    }, [])

    const wrappNavbar = document.getElementsByClassName('wrapp-navbar')

    const styleNavbar = {
        display: getPath === '/login' || getPath.includes('/print-table') || getPath === '/forgot-password' || getPath === '/create-new-password' || getPath === '/verifikasi-create-new-password' ? 'none' : 'flex',
    }

    const styleNavbarMobile = {
        display: getPath === '/login' || getPath.includes('/print-table') || getPath === '/forgot-password' || getPath === '/create-new-password' || getPath === '/verifikasi-create-new-password' ? 'none' : 'flex'
    }

    const btnNavmenu = document.getElementsByClassName('btn-navmenu')
    const iconBarMenu = document.getElementsByClassName('fa-list-ul')
    const btnBarMenu = document.getElementsByClassName('btn-bar-navmenu')

    // navmenu
    const wrappNavmenu = document.getElementsByClassName('wrapp-navmenu')
    const nameBtnBarNavmenu = document.getElementsByClassName('name-btn-bar-navmenu')
    const iconArrow = document.getElementsByClassName('icon-arrow')
    const navCollapse = document.getElementsByClassName('container-nav-collapse')
    const iconBarNavmenu = document.getElementsByClassName('icon-bar-navmenu')

    function activeNavmenuMobile() {
        // left navbar
        wrappNavbar[0].classList.toggle('left-navbar-mobile')
        wrappNavbar[0].classList.toggle('left-navbar-mobile-active')

        wrappNavbar[0].classList.remove('left-navbar-desktop-active')
        wrappNavbar[0].classList.remove('left-navbar-desktop')

        // btn navmenu
        btnNavmenu[0].classList.toggle('active-btn-navmenu-mobile')
        btnNavmenu[0].classList.toggle('btn-navmenu-mobile')

        btnNavmenu[0].classList.remove('active-btn-navmenu-desktop')
        btnNavmenu[0].classList.remove('btn-navmenu-desktop')

        iconBarMenu[0].classList.toggle('active-icon-bar-menu-mobile')
        iconBarMenu[0].classList.toggle('icon-bar-menu-mobile')

        iconBarMenu[0].classList.remove('active-icon-bar-menu-desktop')
        iconBarMenu[0].classList.remove('icon-bar-menu-desktop')

        // navmenu
        wrappNavmenu[0].classList.toggle('left-wrapp-navmenu-mobile')
        wrappNavmenu[0].classList.toggle('left-wrapp-navmenu-mobile-active')

        wrappNavmenu[0].classList.remove('width-wrapp-navmenu-desktop-active')

        for (let i = 0; i < nameBtnBarNavmenu.length; i++) {
            nameBtnBarNavmenu[i].classList.toggle('name-btn-bar-navmenu-mobile')

            nameBtnBarNavmenu[i].classList.remove('name-btn-bar-navmenu-desktop')
            nameBtnBarNavmenu[i].classList.remove('name-btn-bar-navmenu-desktop-active')
        }
        iconArrow[2].classList.toggle('icon-arrow-mobile')

        iconArrow[2].classList.remove('icon-arrow-desktop')
        iconArrow[2].classList.remove('icon-arrow-desktop-active')

        if (iconBarNavmenu[2].style.backgroundColor == 'rgb(26, 142, 95)') {
            navCollapse[0].classList.toggle('container-nav-collapse-mobile-active')
            navCollapse[0].classList.remove('container-nav-collapse-mobile')

            navCollapse[0].classList.remove('container-nav-collapse-desktop-active')
            navCollapse[0].classList.remove('container-nav-collapse-desktop')
        }
    }

    function inActiveNavmenuMobile() {
        // left navbar
        wrappNavbar[0].classList.toggle('left-navbar-mobile')
        wrappNavbar[0].classList.toggle('left-navbar-mobile-active')

        wrappNavbar[0].classList.remove('left-navbar-desktop-active')
        wrappNavbar[0].classList.remove('left-navbar-desktop')

        // btn navmenu
        btnNavmenu[0].classList.toggle('active-btn-navmenu-mobile')
        btnNavmenu[0].classList.toggle('btn-navmenu-mobile')

        btnNavmenu[0].classList.remove('active-btn-navmenu-desktop')
        btnNavmenu[0].classList.remove('btn-navmenu-desktop')

        iconBarMenu[0].classList.toggle('active-icon-bar-menu-mobile')
        iconBarMenu[0].classList.toggle('icon-bar-menu-mobile')

        iconBarMenu[0].classList.remove('active-icon-bar-menu-desktop')
        iconBarMenu[0].classList.remove('icon-bar-menu-desktop')

        // navmenu
        wrappNavmenu[0].classList.toggle('left-wrapp-navmenu-mobile')
        wrappNavmenu[0].classList.toggle('left-wrapp-navmenu-mobile-active')

        wrappNavmenu[0].classList.remove('width-wrapp-navmenu-desktop-active')

        for (let i = 0; i < nameBtnBarNavmenu.length; i++) {
            nameBtnBarNavmenu[i].classList.toggle('name-btn-bar-navmenu-mobile')

            nameBtnBarNavmenu[i].classList.remove('name-btn-bar-navmenu-desktop')
            nameBtnBarNavmenu[i].classList.remove('name-btn-bar-navmenu-desktop-active')
        }
        iconArrow[2].classList.toggle('icon-arrow-mobile')

        iconArrow[2].classList.remove('icon-arrow-desktop')
        iconArrow[2].classList.remove('icon-arrow-desktop-active')

        if (iconBarNavmenu[2].style.backgroundColor == 'rgb(26, 142, 95)') {
            navCollapse[0].classList.remove('container-nav-collapse-desktop')
            navCollapse[0].classList.remove('container-nav-collapse-desktop-active')

            navCollapse[0].classList.toggle('container-nav-collapse-mobile-active')
            navCollapse[0].classList.remove('container-nav-collapse-mobile')
        }
    }

    function activeNavmenuDesktop() {
        // left navbar
        wrappNavbar[0].classList.toggle('left-navbar-desktop')
        wrappNavbar[0].classList.toggle('left-navbar-desktop-active')

        wrappNavbar[0].classList.remove('left-navbar-mobile')
        wrappNavbar[0].classList.remove('left-navbar-mobile-active')

        // btn navmenu
        btnNavmenu[0].classList.toggle('active-btn-navmenu-desktop')
        btnNavmenu[0].classList.toggle('btn-navmenu-desktop')

        btnNavmenu[0].classList.remove('active-btn-navmenu-mobile')
        btnNavmenu[0].classList.remove('btn-navmenu-mobile')

        iconBarMenu[0].classList.toggle('active-icon-bar-menu-desktop')
        iconBarMenu[0].classList.toggle('icon-bar-menu-desktop')

        iconBarMenu[0].classList.remove('active-icon-bar-menu-mobile')
        iconBarMenu[0].classList.remove('icon-bar-menu-mobile')

        // navmenu
        wrappNavmenu[0].classList.remove('left-wrapp-navmenu-mobile')
        wrappNavmenu[0].classList.remove('left-wrapp-navmenu-mobile-active')

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
            navCollapse[0].classList.remove('container-nav-collapse-mobile-active')
            navCollapse[0].classList.remove('container-nav-collapse-mobile')

            navCollapse[0].classList.toggle('container-nav-collapse-desktop-active')
            navCollapse[0].classList.remove('container-nav-collapse-desktop')
        }
    }

    function inActiveNavmenuDesktop() {
        // left navbar
        wrappNavbar[0].classList.toggle('left-navbar-desktop')
        wrappNavbar[0].classList.toggle('left-navbar-desktop-active')

        wrappNavbar[0].classList.remove('left-navbar-mobile')
        wrappNavbar[0].classList.remove('left-navbar-mobile-active')

        // btn navmenu
        btnNavmenu[0].classList.toggle('active-btn-navmenu-desktop')
        btnNavmenu[0].classList.toggle('btn-navmenu-desktop')

        btnNavmenu[0].classList.remove('active-btn-navmenu-mobile')
        btnNavmenu[0].classList.remove('btn-navmenu-mobile')

        iconBarMenu[0].classList.toggle('active-icon-bar-menu-desktop')
        iconBarMenu[0].classList.toggle('icon-bar-menu-desktop')

        iconBarMenu[0].classList.remove('active-icon-bar-menu-mobile')
        iconBarMenu[0].classList.remove('icon-bar-menu-mobile')

        // navmenu
        wrappNavmenu[0].classList.remove('left-wrapp-navmenu-mobile')
        wrappNavmenu[0].classList.remove('left-wrapp-navmenu-mobile-active')

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

    // wrapp for active and inActive contents tablet - desktop
    const wrappDashboard = document.getElementsByClassName('wrapp-dashboard')
    const wrappProfile = document.getElementsByClassName('wrapp-profile')
    const wrappJadwalKuliah = document.getElementsByClassName('wrapp-jadwal-kuliah')
    const wrappKuliahPengganti = document.getElementsByClassName('wrapp-kuliah-pengganti')
    const wrappAbsensi = document.getElementsByClassName('wrapp-absensi')
    const wrappForumDiskusi = document.getElementsByClassName('wrapp-forum-diskusi')
    const wrappKomentarDiskusi = document.getElementsByClassName('wrapp-komentar-diskusi')
    const wrappRuangMateri = document.getElementsByClassName('wrapp-ruang-materi')
    const wrappRuangTugas = document.getElementsByClassName('wrapp-ruang-tugas')
    const wrappSendTugas = document.getElementsByClassName('wrapp-form-send-tugas')
    const wrappDetailDeskripsi = document.getElementsByClassName('wrapp-detail-deskripsi')

    function activeContentsDesktop() {
        if (wrappDashboard.length > 0) {
            // dashboard
            wrappDashboard[0].classList.toggle('wrapp-dashboard-active')
        } else if (wrappProfile.length > 0) {
            // profile
            wrappProfile[0].classList.toggle('wrapp-profile-active')
        } else if (wrappJadwalKuliah.length > 0) {
            // jadwal kuliah
            wrappJadwalKuliah[0].classList.toggle('wrapp-jadwal-kuliah-active')
        } else if (wrappKuliahPengganti.length > 0) {
            // kuliah pengganti
            wrappKuliahPengganti[0].classList.toggle('wrapp-kuliah-pengganti-active')
        } else if (wrappAbsensi.length > 0) {
            // absensi
            wrappAbsensi[0].classList.toggle('wrapp-absensi-active')
        } else if (wrappForumDiskusi.length > 0) {
            // forum diskusi
            wrappForumDiskusi[0].classList.toggle('wrapp-forum-diskusi-active')
        } else if (wrappKomentarDiskusi.length > 0) {
            // komentar diskusi
            wrappKomentarDiskusi[0].classList.toggle('wrapp-komentar-diskusi-active')
        } else if (wrappRuangMateri.length > 0) {
            // ruang materi
            wrappRuangMateri[0].classList.toggle('wrapp-ruang-materi-active')
        } else if (wrappRuangTugas.length > 0) {
            // ruang tugas
            wrappRuangTugas[0].classList.toggle('wrapp-ruang-tugas-active')
        } else if (wrappSendTugas.length > 0) {
            // send tugas
            wrappSendTugas[0].classList.toggle('wrapp-form-send-tugas-active')
        } else if (wrappDetailDeskripsi.length > 0) {
            // detail deskripsi
            wrappDetailDeskripsi[0].classList.toggle('wrapp-detail-deskripsi-active')
        }
    }

    function inActiveContentsDesktop() {
        if (wrappDashboard.length > 0) {
            // dashboard
            wrappDashboard[0].classList.remove('wrapp-dashboard-active')
        } else if (wrappProfile.length > 0) {
            // profile
            wrappProfile[0].classList.remove('wrapp-profile-active')
        } else if (wrappJadwalKuliah.length > 0) {
            // jadwal kuliah
            wrappJadwalKuliah[0].classList.remove('wrapp-jadwal-kuliah-active')
        } else if (wrappKuliahPengganti.length > 0) {
            // kuliah pengganti
            wrappKuliahPengganti[0].classList.remove('wrapp-kuliah-pengganti-active')
        } else if (wrappAbsensi.length > 0) {
            // absensi
            wrappAbsensi[0].classList.remove('wrapp-absensi-active')
        } else if (wrappForumDiskusi.length > 0) {
            // forum diskusi
            wrappForumDiskusi[0].classList.remove('wrapp-forum-diskusi-active')
        } else if (wrappKomentarDiskusi.length > 0) {
            // komentar diskusi
            wrappKomentarDiskusi[0].classList.remove('wrapp-komentar-diskusi-active')
        } else if (wrappRuangMateri.length > 0) {
            // ruang materi
            wrappRuangMateri[0].classList.remove('wrapp-ruang-materi-active')
        } else if (wrappRuangTugas.length > 0) {
            // ruang tugas
            wrappRuangTugas[0].classList.remove('wrapp-ruang-tugas-active')
        } else if (wrappSendTugas.length > 0) {
            // send tugas
            wrappSendTugas[0].classList.remove('wrapp-form-send-tugas-active')
        } else if (wrappDetailDeskripsi.length > 0) {
            // detail deskripsi
            wrappDetailDeskripsi[0].classList.remove('wrapp-detail-deskripsi-active')
        }
    }

    function toActiveNavmenu() {
        const widthBody = window.innerWidth;

        setActiveNavmenu(!activeNavmenu)

        if (activeNavmenuDefault) {
            setActiveNavCollapse(!activeNavCollapse)
        }

        if (widthBody < 577) {
            // mobile
            if (activeNavmenu) {
                setOverActiveNavmenuDefault(false)

                // navmenu
                inActiveNavmenuMobile();

                // contents page
                inActiveContentsDesktop();
            } else {
                setOverActiveNavmenuDefault(false)

                // navmenu
                activeNavmenuMobile();

                // contents page
                inActiveContentsDesktop();
            }
        } else if (widthBody > 576) {
            // tablet - desktop
            if (activeNavmenu) {
                // navmenu
                inActiveNavmenuDesktop();

                // contents page
                activeContentsDesktop();
            } else {
                // navmenu
                activeNavmenuDesktop();

                // contents page
                activeContentsDesktop();
            }
        }
    }

    function clickProfile(nameClass) {
        const btnProfile = document.getElementsByClassName(nameClass)

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
                        onClick={() => clickProfile('btn-profile-navbar')}
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

            <div className="wrapp-navbar-mobile" style={styleNavbarMobile}>
                <p className="name-web-mobile">
                    E-Learning
                </p>

                <div className="column-kanan-navbar-mobile">
                    <button className="btn-profile-navbar-mobile"
                        onClick={() => clickProfile('btn-profile-navbar-mobile')}
                    >
                        {dataUserForNavbar && dataUserForNavbar.nim}
                        <div className="column-img-profile-navbar-mobile">
                            {dataUserForNavbar && dataUserForNavbar.image ? (
                                <img src={`${endpoint}/${dataUserForNavbar.image}`} alt="" className="img-profile-navbar-mobile" />
                            ) : (
                                <i className="fas fa-user"></i>
                            )}
                        </div>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Navbar;