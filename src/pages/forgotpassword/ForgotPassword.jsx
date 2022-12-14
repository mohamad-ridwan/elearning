import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { send } from 'emailjs-com'
import './ForgotPassword.scss'
import Loading from '../../components/loading/Loading';
import Input from '../../components/input/Input';
import endpoint from '../../services/api/endpoint';
import Button from '../../components/button/Button';
import API from '../../services/api';

function ForgotPassword() {

    const [logoweb, setLogoweb] = useState({})
    const [loadingBtn, setLoadingBtn] = useState(false)
    const [loading, setLoading] = useState(true)
    const [input, setInput] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const history = useHistory();

    function setAllAPI() {
        API.APIGetLogoweb()
            .then(res => {
                setLogoweb(res.data[0])

                setTimeout(() => {
                    setLoading(false)
                }, 100);
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        setAllAPI();
    }, [])

    function changeInput(e) {
        setInput(e.target.value);

        if (errorMessage.length > 0) {
            setErrorMessage('')
        }
    }

    const serviceID = 'service_hmqukxt'
    const templateID = 'template_lwvigvh'
    const publicKey = '9OBxoKBI85PFlIkj7'

    function sendGmail(newData) {
        const data = {
            from_name: 'E-Learning',
            to_name: newData.name,
            to_email: newData.email,
            message: `Hallo ${newData.name}!, untuk verifikasi membuat password baru silahkan kunjungi: https://e-learning-rp.web.app/verifikasi-create-new-password dengan memasukkan token di bawah.`,
            token: newData.tokenVerifikasi,
            note: 'Note : Token ini memiliki kedaluwarsa dari waktu tertentu.'
        }

        send(serviceID, templateID, data, publicKey)
            .then(res => {
                setLoadingBtn(false)
                setInput('')
                alert('Berhasil mengirimkan email,\nMohon cek email Anda untuk verifikasi')
                return res;
            })
            .catch(err => {
                console.log(err)
                alert('Oops! terjadi kesalahan server.\nMohon coba beberapa saat lagi!')
                setLoadingBtn(false)
            })
    }

    function uploadTokendb(data) {
        return new Promise((resolve, reject) => {
            API.APIPostTokendb(data)
                .then(res => resolve({ message: 'success' }))
                .catch(err => reject(err))
        })
    }

    function deleteAllTokenUser(data) {
        return new Promise((resolve, reject) => {
            API.APIDeleteManyTokendb(data)
                .then(res => resolve({ message: 'delete-success' }))
                .catch(err => reject(err))
        })
    }

    function getUser() {
        const data = {
            email: input
        }

        const messageError = 'Oops! terjadi kesalahan server.\nMohon coba beberapa saat lagi!'

        API.APILupaPassword(data)
            .then(res => {
                if (res && res.data) {
                    const dateToken = new Date().getTime().toString().substr(-3)
                    const getToken = `${dateToken}${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)}`

                    const newData = {
                        tokenUser: res.data.token,
                        name: res.data.name,
                        tokenVerifikasi: getToken.length > 6 ? getToken.substr(0, 6) : getToken,
                        email: data.email
                    }

                    deleteAllTokenUser(data)
                        .then(res => {
                            if (res && res.message === 'delete-success') {
                                uploadTokendb(newData)
                                    .then(res => {
                                        if (res && res.message === 'success') {
                                            sendGmail(newData)
                                        }
                                    })
                                    .catch(err => {
                                        alert(messageError)
                                        console.log(err)
                                        setLoadingBtn(false)
                                    })
                            } else {
                                alert(messageError)
                                console.log(res)
                                setLoadingBtn(false)
                            }
                        })
                        .catch(err => {
                            alert(messageError)
                            console.log(err)
                            setLoadingBtn(false)
                        })
                } else if (res.error !== null) {
                    setErrorMessage(res.error)
                    setLoadingBtn(false);
                }
            })
            .catch(err => console.log(err))
    }

    function submit(e) {
        e.preventDefault();
        setLoadingBtn(true);

        let err = ''

        if (input.length === 0) {
            err = 'Wajib di isi!'
            setLoadingBtn(false);
        }

        if (err.length === 0) {
            if (loadingBtn === false) {
                getUser();
            }
        }

        setErrorMessage(err)
    }

    function toLogin() {
        history.push('/login')
    }

    function mouseOver() {
        document.getElementsByClassName('btn-to-login')[0].style.backgroundColor = '#374151'
    }

    function mouseLeave() {
        document.getElementsByClassName('btn-to-login')[0].style.backgroundColor = '#ea490b'
    }

    return (
        <>
            <Loading displayWrapp={loading ? 'flex' : 'none'} />

            <div className="wrapp-forgot-password">
                <form onSubmit={(e) => {
                    e.preventDefault();
                }} className="form-forgot-password">
                    <img src={`${endpoint}/${logoweb && logoweb.image}`} alt="image" className="img-logoweb-forgot-password" />

                    <p className="deskripsi-forgot-password">
                        Lupa kata sandi Anda? masukan alamat email Anda yang terdaftar pada sistem dan kami akan mengirimkan email berisi tautan pengaturan ulang kata sandi Anda.
                    </p>

                    <div className="column-input-forgot-password">
                        <Input
                            label="Email"
                            typeInput="email"
                            nameInput="email"
                            changeInput={changeInput}
                            value={input}
                            error={errorMessage.length > 0 ? errorMessage : ''}
                        />
                    </div>

                    <div className="column-btn-forgot-password">
                        <Button
                            nameBtn="KIRIM EMAIL"
                            displayLoadBtn={loadingBtn ? 'flex' : 'none'}
                            click={submit}
                            marginBtn="5px 0 0 0px"
                        />
                        <Button
                            nameBtn="KEMBALI KE LOGIN"
                            click={toLogin}
                            bgColor="#ea490b"
                            classWrapp="btn-to-login"
                            marginBtn="5px 0 0 10px"
                            mouseOver={mouseOver}
                            mouseleave={mouseLeave}
                        />
                    </div>
                </form>
            </div>
        </>
    )
}

export default ForgotPassword;