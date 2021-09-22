import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { send } from 'emailjs-com'
import './ForgotPassword.scss'
import Input from '../../components/input/Input';
import endpoint from '../../services/api/endpoint';
import Button from '../../components/button/Button';
import API from '../../services/api';

function ForgotPassword() {

    const [logoweb, setLogoweb] = useState({})
    const [loadingBtn, setLoadingBtn] = useState(false)
    const [input, setInput] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const history = useHistory();

    function setAllAPI() {
        API.APIGetLogoweb()
            .then(res => setLogoweb(res.data[0]))
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

    function sendGmail(token) {
        API.APIGetDashboard(token)
            .then(res => {
                if (res && res.data) {
                    const respons = res.data.user.data

                    const data = {
                        from_name: 'E-Learning',
                        to_name: respons.name,
                        to_email: respons.email,
                        message: `Hallo ${respons.name}!, untuk verifikasi membuat password baru silahkan kunjungi: http://localhost:3000/verifikasi-create-new-password dengan memasukkan token di bawah.`,
                        token: token,
                        note: 'Note : Masa expired token Anda 1 jam dari saat Anda mengirimkan email!'
                    }

                    send(
                        'service_hmqukxt',
                        'template_lwvigvh',
                        data,
                        'user_3klKefvuYuDVa2EGf6Ri1'
                    )
                        .then(res => {
                            setLoadingBtn(false);
                            setInput('')
                            alert('Berhasil mengirimkan email,\nMohon cek email Anda untuk verifikasi')
                            history.push('/login')
                            return res;
                        })
                }
            })
            .catch(err => console.log(err))
    }

    function getUser() {
        const data = {
            email: input
        }

        API.APILupaPassword(data)
            .then(res => {
                if (res && res.data) {
                    sendGmail(res.data.token)
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