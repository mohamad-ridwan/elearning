import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Cookies from 'js-cookie';
import './Login.scss';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import API from '../../services/api';
import endpoint from '../../services/api/endpoint';
import { PathContext } from '../../services/context/path';

function Login() {

    const [pathGlobal, setPathGlobal, activeNavmenu, setActiveNavmenu, activeNavCollapse, setActiveNavCollapse, overActiveNavmenu, setOverActiveNavmenu, activeNavmenuDefault, setActiveNavmenuDefault, dataUserForNavbar, setDataUserForNavbar, idxActiveGlobal, setIdxActiveGlobal, headerTable, setHeaderTable, bodyTable, setBodyTable, pathPrintTable, setPathPrintTable, idxOnePrintTable, setIdxOnePrintTable, idxTwoPrintTable, setIdxTwoPrintTable, idxHeadPrintTable, setIdxHeadPrintTable, overActiveNavmenuDefault, setOverActiveNavmenuDefault, activeBodyDesktop, activeIconDrop, setActiveIconDrop] = useContext(PathContext)
    const [logoweb, setLogoweb] = useState({})
    const [errorMessage, setErrorMessage] = useState({})
    const [loadingLogin, setLoadingLogin] = useState(false)
    const [inputValue, setInputValue] = useState({
        nim: '',
        password: ''
    })

    const getTokenUser = Cookies.get('e-learning')

    const history = useHistory();

    function setAllAPI() {
        API.APIGetDashboard(getTokenUser)
            .then(res => {
                if (res && res.data) {
                    history.push('/')
                    setPathGlobal('/')
                }
            })
            .catch(err => {
                console.log(err)
            })

        API.APIGetLogoweb()
            .then(res => setLogoweb(res.data[0]))
            .catch(err => console.log(err))
    }

    function getClassPage(nameClass, removeActiveClass, idx) {
        const classWrapp = document.getElementsByClassName(nameClass)
        if (classWrapp.length > 0) {
            classWrapp[idx].classList.remove(removeActiveClass)
        }
    }

    function inActiveContentsPage() {
        // dashboard
        getClassPage('wrapp-dashboard', 'wrapp-dashboard-active', 0);
    }

    const wrappNavbar = document.getElementsByClassName('wrapp-navbar')

    // navmenu
    const navCollapse = document.getElementsByClassName('container-nav-collapse')
    const btnNavmenu = document.getElementsByClassName('btn-navmenu')
    const iconBarMenu = document.getElementsByClassName('fa-list-ul')
    const wrappNavmenu = document.getElementsByClassName('wrapp-navmenu')
    const nameBtnBarNavmenu = document.getElementsByClassName('name-btn-bar-navmenu')
    const iconArrow = document.getElementsByClassName('icon-arrow')
    const btnBarMenu = document.getElementsByClassName('btn-bar-navmenu')

    function inActiveNavmenuDesktop() {
        // left navbar
        wrappNavbar[0].classList.remove('left-navbar-desktop')
        wrappNavbar[0].classList.remove('left-navbar-desktop-active')

        wrappNavbar[0].classList.remove('left-navbar-mobile')
        wrappNavbar[0].classList.remove('left-navbar-mobile-active')

        // btn navmenu
        btnNavmenu[0].classList.remove('active-btn-navmenu-desktop')
        btnNavmenu[0].classList.remove('btn-navmenu-desktop')

        btnNavmenu[0].classList.remove('active-btn-navmenu-mobile')
        btnNavmenu[0].classList.remove('btn-navmenu-mobile')

        iconBarMenu[0].classList.remove('active-icon-bar-menu-desktop')
        iconBarMenu[0].classList.remove('icon-bar-menu-desktop')

        iconBarMenu[0].classList.remove('active-icon-bar-menu-mobile')
        iconBarMenu[0].classList.remove('icon-bar-menu-mobile')

        // navmenu
        wrappNavmenu[0].classList.remove('left-wrapp-navmenu-mobile')
        wrappNavmenu[0].classList.remove('left-wrapp-navmenu-mobile-active')

        wrappNavmenu[0].classList.remove('width-wrapp-navmenu-desktop-active')

        for (let i = 0; i < nameBtnBarNavmenu.length; i++) {
            nameBtnBarNavmenu[i].classList.remove('name-btn-bar-navmenu-mobile')

            nameBtnBarNavmenu[i].classList.remove('name-btn-bar-navmenu-desktop')
            nameBtnBarNavmenu[i].classList.remove('name-btn-bar-navmenu-desktop-active')
        }
        iconArrow[2].classList.remove('icon-arrow-mobile')

        iconArrow[2].classList.remove('icon-arrow-desktop')
        iconArrow[2].classList.remove('icon-arrow-desktop-active')

        navCollapse[0].classList.remove('container-nav-collapse-desktop')
        navCollapse[0].classList.remove('container-nav-collapse-desktop-active')

        navCollapse[0].classList.remove('container-nav-collapse-mobile-active')
        navCollapse[0].classList.remove('container-nav-collapse-mobile')

        for (let i = 0; i < 4; i++) {
            btnBarMenu[i].classList.remove('active-bar-navmenu')
        }
    }

    useEffect(() => {
        setAllAPI();
        setPathGlobal('/login')
        setActiveNavmenu(false)
        setActiveNavCollapse(false)
        setOverActiveNavmenu(false)
        setActiveNavmenuDefault(false)
        setOverActiveNavmenuDefault(false)
        setActiveIconDrop(false)
        setIdxActiveGlobal()
        inActiveNavmenuDesktop();
        inActiveContentsPage();
    }, [])

    function changeInput(e) {
        setInputValue({
            ...inputValue,
            [e.target.name]: e.target.value
        })

        if (Object.keys(errorMessage).length > 0) {
            setErrorMessage({
                ...errorMessage,
                [e.target.name]: ''
            })
        }
    }

    function getDashboard(token) {
        API.APIGetDashboard(token)
            .then(res => {
                if (res && res.data) {
                    setDataUserForNavbar(res.data.user.data)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    function checkDataUser() {
        setLoadingLogin(true);

        const data = {
            nim: inputValue.nim,
            password: inputValue.password
        }

        API.APILogin(data)
            .then(res => {
                let err = {}

                if (res.error === 'Nim is wrong') {
                    err.nim = res.error
                } else if (res.error === 'Password is wrong') {
                    err.password = res.error
                } else if (res && res.data.token) {
                    document.cookie = `e-learning=${res.data.token}`
                    getDashboard(res.data.token)

                    history.push('/')
                    setPathGlobal('/')

                    setInputValue({
                        nim: '',
                        password: ''
                    })
                }

                setErrorMessage(err)
                setLoadingLogin(false)
            })
            .catch(err => {
                console.log(err)
                alert('Oops! terjadi kesalahan server.\nMohon coba beberapa saat lagi!')
                setLoadingLogin(false)
            })
    }

    function submitLogin(p) {
        p.preventDefault()

        let err = {}

        if (!inputValue.nim) {
            err.nim = 'wajib di isi!'
        }

        if (!inputValue.password) {
            err.password = 'wajib di isi!'
        }

        if (Object.keys(err).length === 0) {
            if (loadingLogin === false) {
                checkDataUser();
            }
        }

        setErrorMessage(err)
    }

    return (
        <>
            <div className="wrapp-login">
                <form onSubmit={submitLogin} className="form-login">
                    <img src={`${endpoint}/${logoweb && logoweb.image}`} alt="image" className="img-logoweb" />

                    <div className="column-input-login">
                        <Input
                            label="NIM Mahasiswa"
                            typeInput="number"
                            nameInput="nim"
                            changeInput={changeInput}
                            value={inputValue.nim}
                            error={errorMessage && errorMessage.nim}
                        />
                        <Input
                            label="Password"
                            typeInput="password"
                            nameInput="password"
                            changeInput={changeInput}
                            value={inputValue.password}
                            error={errorMessage && errorMessage.password}
                        />
                    </div>

                    <div className="column-btn-login">
                        <a href="#" className="btn-lupa-password">
                            Lupa Password ?
                        </a>

                        <Button
                            nameBtn="MASUK"
                            displayLoadBtn={loadingLogin ? 'flex' : 'none'}
                        />
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login;