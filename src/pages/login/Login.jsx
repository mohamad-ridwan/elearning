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

    const [pathGlobal, setPathGlobal, activeNavmenu, setActiveNavmenu, activeNavCollapse, setActiveNavCollapse, overActiveNavmenu, setOverActiveNavmenu, activeNavmenuDefault, setActiveNavmenuDefault, dataUserForNavbar, setDataUserForNavbar] = useContext(PathContext)
    const [logoweb, setLogoweb] = useState({})
    const [errorMessage, setErrorMessage] = useState({})
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

    useEffect(() => {
        setAllAPI();
        setPathGlobal('/login')
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
            })
            .catch(err => {
                console.log(err)
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
            checkDataUser();
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

                        <Button nameBtn="MASUK" />
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login;