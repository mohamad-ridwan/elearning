import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import './Login.scss'
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import API from '../../services/api';
import endpoint from '../../services/api/endpoint';
import { PathContext } from '../../services/context/path';

function Login() {

    const [pathGlobal, setPathGlobal] = useContext(PathContext)
    const [user, setUser] = useState([])
    const [logoweb, setLogoweb] = useState({})
    const [errorMessage, setErrorMessage] = useState({})
    const [errorLogin, setErrorLogin] = useState({
        txt1: '',
        txt2: ''
    })
    const [inputValue, setInputValue] = useState({
        nim: '',
        password: ''
    })

    const getTokenUser = JSON.parse(localStorage.getItem('token'))

    const history = useHistory();

    function setAllAPI() {
        API.APIGetUser()
            .then(res => {
                const respons = res.data
                setUser(respons)

                const checkUserLogin = respons.filter((e) => e.token == getTokenUser)

                if (checkUserLogin.length > 0) {
                    history.push('/')
                    setPathGlobal('/')
                }
            })

        API.APIGetLogoweb()
            .then(res => setLogoweb(res.data[0]))
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

    function checkDataUser() {
        const checkUser = user.filter((e) => e.nim === inputValue.nim && e.password === inputValue.password)

        if (checkUser.length !== 0) {
            JSON.stringify(localStorage.setItem('token', checkUser[0].token))
            history.push('/')
            setPathGlobal('/')

            setInputValue({
                nim: '',
                password: ''
            })
        } else {
            setErrorLogin({
                txt1: 'Oops! Invalid nim or password.',
                txt2: 'Silahkan cek kembali nim dan password Anda'
            })
        }
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
                {Object.keys(logoweb).length > 0 ? (
                    <>
                        <form onSubmit={submitLogin} className="form-login">
                            <img src={`${endpoint}/${logoweb.image}`} alt="logo-web" className="img-logoweb" />

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

                            {errorLogin.txt1.length > 0 ? (
                                <>
                                    <p className="error-failed-login">
                                        {errorLogin.txt1}
                                        <br />
                                        {errorLogin.txt2}
                                    </p>
                                </>
                            ) : (
                                <div></div>
                            )}

                            <div className="column-btn-login">
                                <a href="#" className="btn-lupa-password">
                                    Lupa Password ?
                                </a>

                                <Button nameBtn="MASUK" />
                            </div>
                        </form>
                    </>
                ) : (
                    <div></div>
                )}
            </div>
        </>
    )
}

export default Login;