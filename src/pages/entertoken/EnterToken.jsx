import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import './EnterToken.scss';
import endpoint from '../../services/api/endpoint';
import API from '../../services/api';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';

function EnterToken() {

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
        setInput(e.target.value)

        if (input.length > 0) {
            setErrorMessage('')
        }
    }

    function checkToken() {
        API.APIGetVerifikasiToken(input)
            .then(res => {
                if (res && res.data) {
                    alert('Berhasil di verifikasi!')
                    document.cookie = `token-new-password=${input}`
                    setLoadingBtn(false)
                    setInput('')
                    history.push('/create-new-password')
                } else if (res.error !== null) {
                    setErrorMessage(`${res.error}!`)
                    setLoadingBtn(false)
                }
            })
            .catch(err => console.log(err))
    }

    function submit(e) {
        e.preventDefault()
        setLoadingBtn(true)

        let err = ''

        if (input.length === 0) {
            err = 'Wajib di isi!'
            setLoadingBtn(false)
        }

        if (err.length === 0) {
            if (loadingBtn === false) {
                checkToken();
            }
        }

        setErrorMessage(err)
    }

    return (
        <>
            <div className="wrapp-enter-token">
                <form onSubmit={submit} className="form-enter-token">
                    <img src={`${endpoint}/${logoweb && logoweb.image}`} alt="image" className="img-logoweb-enter-token" />

                    <p className="deskripsi-enter-token">
                        Masukkan Token verifikasi yang dikirim melalui email Anda.
                    </p>

                    <div className="column-input-enter-token">
                        <Input
                            label="Masukkan Token Verifikasi"
                            typeInput="text"
                            nameInput="token"
                            changeInput={changeInput}
                            value={input}
                            error={errorMessage.length > 0 ? errorMessage : ''}
                        />
                    </div>

                    <div className="column-btn-enter-token">
                        <Button
                            nameBtn="ENTER"
                            displayLoadBtn={loadingBtn ? 'flex' : 'none'}
                        />
                    </div>
                </form>
            </div>
        </>
    )
}

export default EnterToken;