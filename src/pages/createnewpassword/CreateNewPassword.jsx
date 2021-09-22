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
    const [input, setInput] = useState({
        newPassword: '',
        confirmPassword: ''
    })

    const getTokenVerifikasi = Cookies.get('token-new-password')
    const history = useHistory();

    function setAllAPI() {
        setLoading(true);

        API.APIGetLogoweb()
            .then(res => setLogoweb(res.data[0]))
            .catch(err => console.log(err))

        API.APIGetVerifikasiToken(getTokenVerifikasi)
            .then(res => {
                if (res && res.data) {
                    set_IdDocument(res.data.user.data._id)
                    setLoading(false)
                } else if (res.error !== null) {
                    alert('token tidak valid!,\nmohon kirim email Anda untuk mendapatkan token verifikasi.')
                    document.cookie = 'token-new-password='
                    history.push('/forgot-password');
                    setLoading(false)
                }
            })
            .catch(err => console.log(err))
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

    function updatePassword() {
        API.APIUbahPassword(_idDocument, input)
            .then(res => {
                if (res && res.error) {
                    setLoadingBtn(false)
                    setErrorMessage({ ...errorMessage, confirmPassword: `${res.error}!` })
                } else if (res && res.data) {
                    setLoadingBtn(false)
                    alert('Password berhasil di perbarui!')
                    history.push('/login')
                    document.cookie = 'token-new-password='
                }
            })
            .catch(err => console.log(err))
    }

    function checkToken() {
        API.APIGetVerifikasiToken(getTokenVerifikasi)
            .then(res => {
                if (res && res.data) {
                    updatePassword();
                } else if (res.error !== null) {
                    alert(`Oops!, ${res.error}!`)
                    document.cookie = 'token-new-password='
                    history.push('/forgot-password');
                    setLoadingBtn(false)
                }
            })
            .catch(err => console.log(err))
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

                    <p className="deskripsi-create-new-password">
                        Tolong buat kata sandi baru yang tidak Anda gunakan di situs lain mana pun
                    </p>

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