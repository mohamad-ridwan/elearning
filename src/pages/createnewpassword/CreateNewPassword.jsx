import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router';
import './CreateNewPassword.scss'
import endpoint from '../../services/api/endpoint';
import API from '../../services/api';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import Loading from '../../components/loading/Loading';

function CreateNewPassword() {
    const [logoweb, setLogoweb] = useState({})
    const [loadingBtn, setLoadingBtn] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState({})
    const [_idDocument, set_IdDocument] = useState('')
    const [dataUser, setDataUser] = useState({})
    const [input, setInput] = useState({
        newPassword: '',
        confirmPassword: ''
    })

    const getTokenVerifikasi = Cookies.get('token-new-password')
    const history = useHistory();

    function deleteOneTokenUser(tokenVerifikasi) {
        API.APIDeleteTokendb({ tokenVerifikasi: tokenVerifikasi })
            .then(res => {
                if (res && res.message) {
                    alert('token tidak valid atau sudah kadaluwarsa!,\nmohon kirim email Anda untuk mendapatkan token verifikasi.')
                    document.cookie = 'token-new-password='
                    history.push('/forgot-password');
                    setLoading(false)
                }
            })
            .catch(err => {
                alert('Oops! terjadi kesalahan server.\nMohon coba beberapa saat lagi!')
                console.log(err)
                setLoadingBtn(false)
            })
    }

    function checkTokenFirst() {
        return new Promise((resolve, reject) => {
            API.APIGetTokendb()
                .then(res => {
                    const respons = res && res.data

                    if (respons) {
                        const getToken = respons.filter(e => e.tokenVerifikasi === getTokenVerifikasi)

                        if (getToken.length > 0) {
                            const newData = {
                                tokenUser: getToken[0].tokenUser,
                                tokenVerifikasi: getToken[0].tokenVerifikasi
                            }

                            resolve(newData)
                        } else {
                            resolve({ message: 'token tidak valid' })
                        }
                    }
                })
                .catch(err => {
                    reject({ message: 'failed get token' })
                })
        })
    }

    function verifikasiToken(data, conditionState, conditionUpdate) {
        API.APIGetVerifikasiToken(data.tokenUser)
            .then(res => {
                if (res && res.data) {
                    if (conditionState) {
                        set_IdDocument(res.data.user.data._id)
                        setDataUser(res.data.user.data)
                        setLoading(false)
                    }

                    updatePassword(conditionUpdate);
                } else if (res.error !== null) {
                    deleteOneTokenUser(data.tokenVerifikasi)
                }
            })
            .catch(err => {
                alert('Oops! terjadi kesalahan server.\nMohon coba beberapa saat lagi!')
                console.log(err)
                history.push('/login');
            })
    }

    function setAllAPI() {
        setLoading(true);

        API.APIGetLogoweb()
            .then(res => setLogoweb(res.data[0]))
            .catch(err => console.log(err))

        checkTokenFirst()
            .then(res => {
                if (res && res.message === 'token tidak valid') {
                    alert('token tidak valid atau sudah kadaluwarsa!,\nmohon kirim email Anda untuk mendapatkan token verifikasi.')
                    document.cookie = 'token-new-password='
                    history.push('/forgot-password');
                    setLoading(false)
                } else {
                    const newData = {
                        tokenUser: res.tokenUser,
                        tokenVerifikasi: res.tokenVerifikasi
                    }

                    verifikasiToken(newData, true)
                }
            })
            .catch(err => {
                alert('Oops! terjadi kesalahan server.\nMohon coba beberapa saat lagi!')
                console.log(err)
                history.push('/login');
            })
    }

    useEffect(() => {
        setAllAPI();
    }, [])

    function changeInput(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })

        if (input.newPassword.length > 0) {
            if (errorMessage && errorMessage.newPassword) {
                setErrorMessage({ ...errorMessage, newPassword: '' })
            }
        }

        if (input.confirmPassword.length > 0) {
            if (errorMessage && errorMessage.confirmPassword) {
                setErrorMessage({ ...errorMessage, confirmPassword: '' })
            }
        }
    }

    function deleteAllTokenUser() {
        API.APIDeleteManyTokendb({email: dataUser.email})
            .then(res => {
                setLoadingBtn(false)
                alert('Password berhasil di perbarui!')
                history.push('/login')
                document.cookie = 'token-new-password='
            })
            .catch(err => {
                alert('Oops! terjadi kesalahan server.\nMohon coba beberapa saat lagi!')
                console.log(err)
                setLoadingBtn(false)
            })
    }

    function updatePassword(condition) {
        if (condition) {
            API.APIUbahPassword(_idDocument, input)
                .then(res => {
                    if (res && res.error) {
                        setLoadingBtn(false)
                        setErrorMessage({ ...errorMessage, confirmPassword: `${res.error}!` })
                    } else if (res && res.data) {
                        deleteAllTokenUser()
                    }
                })
                .catch(err => console.log(err))
        }
    }

    function checkToken() {
        checkTokenFirst()
            .then(res => {
                if (res && res.message === 'token tidak valid') {
                    alert('token tidak valid atau sudah kadaluwarsa!,\nmohon kirim email Anda untuk mendapatkan token verifikasi.')
                    document.cookie = 'token-new-password='
                    history.push('/forgot-password');
                    setLoading(false)
                } else {
                    const newData = {
                        tokenUser: res.tokenUser,
                        tokenVerifikasi: res.tokenVerifikasi
                    }

                    verifikasiToken(newData, false, true)
                }
            })
            .catch(err => {
                alert('Oops! terjadi kesalahan server.\nMohon coba beberapa saat lagi!')
                console.log(err)
                history.push('/login');
            })
    }

    function submit(e) {
        e.preventDefault()
        setLoadingBtn(true)

        let err = {}

        if (input.newPassword.length === 0) {
            err.newPassword = 'Wajib di isi!'
            setLoadingBtn(false)
        }

        if (input.confirmPassword.length === 0) {
            err.confirmPassword = 'Wajib di isi!'
            setLoadingBtn(false)
        }

        if (Object.keys(err).length === 0) {
            if (loadingBtn === false) {
                checkToken();
            }
        }

        setErrorMessage(err)
    }

    return (
        <>
            <div className="wrapp-create-new-password">
                <form onSubmit={submit} className="form-create-new-password">
                    <img src={`${endpoint}/${logoweb && logoweb.image}`} alt="image" className="img-logoweb-create-new-password" />

                    {dataUser && Object.keys(dataUser).length > 0 ? (
                        <div className="akun-user">
                            {dataUser.image.length > 2 && dataUser.image.includes('https://firebasestorage.googleapis.com') ? (
                                <img src={dataUser.image} alt="" className="profile-user" />
                            ) : (
                                <i className="fas fa-user"></i>
                            )}

                            <p className="email-user">
                                {dataUser.email}
                            </p>
                        </div>
                    ) : (
                        <></>
                    )}

                    <div className="column-input-create-new-password">
                        <Input
                            label="Create New Password"
                            typeInput="password"
                            nameInput="newPassword"
                            changeInput={changeInput}
                            value={input.newPassword}
                            error={errorMessage && errorMessage.newPassword}
                        />
                        <Input
                            label="Confirm Your Password"
                            typeInput="password"
                            nameInput="confirmPassword"
                            changeInput={changeInput}
                            value={input.confirmPassword}
                            error={errorMessage && errorMessage.confirmPassword}
                        />
                    </div>

                    <div className="column-btn-create-new-password">
                        <Button
                            nameBtn="PERBARUI PASSWORD"
                            displayLoadBtn={loadingBtn ? 'flex' : 'none'}
                        />
                    </div>
                </form>

                <Loading displayWrapp={loading ? 'flex' : 'none'} />
            </div>
        </>
    )
}

export default CreateNewPassword;