import React, { useContext, useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import './Profile.scss'
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import API from '../../services/api';
import endpoint from '../../services/api/endpoint';
import Loading from '../../components/loading/Loading';
import { PathContext } from '../../services/context/path';

function Profile() {

    const [pathGlobal, setPathGlobal, activeNavmenu, setActiveNavmenu] = useContext(PathContext)
    const [user, setUser] = useState({})
    const [errorMessageInfoProfil, setErrorMessageInfoProfil] = useState({})
    const [errorMessageUpdatePassword, setErrorMessageUpdatePassword] = useState({})
    const [loading, setLoading] = useState(false)
    const [inputValue, setInputValue] = useState({
        image: '',
        name: '',
        email: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        newPhoto: '',
    })

    const getTokenUser = Cookies.get('e-learning')
    const history = useHistory();

    function setAllAPI() {
        setLoading(true)

        API.APIGetDashboard(getTokenUser)
            .then(res => {
                if (res && res.data) {
                    setLoading(false)

                    setInputValue({
                        ...inputValue,
                        image: `${endpoint}/${res.data.user.data.image}`,
                        name: res.data.user.data.name,
                        email: res.data.user.data.email,
                    })

                    setUser(res.data.user.data)
                } else {
                    history.push('/login')
                    document.cookie = 'e-learning='
                }
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        setAllAPI();
    }, [])

    const styleWrappProfile = {
        marginLeft: activeNavmenu ? '230px' : '70px'
    }

    function openFile() {
        document.getElementById('getFile').click()
    }

    function changeInput(e) {
        setInputValue({
            ...inputValue,
            [e.target.name]: e.target.value
        })

        if (Object.keys(errorMessageInfoProfil).length > 0) {
            setErrorMessageInfoProfil({
                ...errorMessageInfoProfil,
                [e.target.name]: ''
            })
        }

        if (Object.keys(errorMessageUpdatePassword).length > 0) {
            setErrorMessageUpdatePassword({
                ...errorMessageUpdatePassword,
                [e.target.name]: ''
            })
        }
    }

    function getFileImg(e) {
        if (e.target.files[0] !== undefined) {
            const getPhotoName = e.target.files[0]
            setInputValue({
                ...inputValue,
                image: URL.createObjectURL(e.target.files[0]),
                newPhoto: getPhotoName
            })
        }
    }

    const { image, name, email, currentPassword, newPassword, confirmPassword, newPhoto } = inputValue;

    async function submitUpdateInfoProfile() {
        let confirmUpdate = {}
        let err = {}

        // jika user tidak melakukan perubahan
        if (image.includes('blob')) {
            confirmUpdate.update = true
        }

        if (email !== user.email) {
            confirmUpdate.update = true
        }

        if (!email) {
            err.email = 'Wajib di isi!'
        } else if (!email.includes('@')) {
            err.email = 'Wajib berupa@!'
        }

        if (Object.keys(confirmUpdate).length > 0 && Object.keys(err).length === 0) {
            const confirmAlert = window.confirm('Apakah Anda ingin update Informasi Profil?')

            if (confirmAlert) {
                if (newPhoto) {
                    const data = new FormData()
                    data.append('image', newPhoto)
                    data.append('email', email)

                    await updateInformasiProfil(data)
                } else {
                    const newData = {
                        email: email
                    }

                    updateInformasiProfileEmailOnly(newData)
                }
            }
        }

        setErrorMessageInfoProfil(err)
    }

    function updateInformasiProfil(data) {
        API.APIPutInformasiProfil(user._id, data)
            .then(res => {
                if (res && res.data.error === null) {
                    document.cookie = `e-learning=${res.data.data.token}`

                    setTimeout(() => {
                        window.location.reload();
                    }, 0);
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    function updateInformasiProfileEmailOnly(data) {
        API.APIPutEmailOnly(user._id, data)
            .then(res => {
                if (res && res.data.error === null) {
                    document.cookie = `e-learning=${res.data.data.token}`

                    window.location.reload();
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    function submitUpdatePassword() {
        let err = {}

        if (!currentPassword) {
            err.currentPassword = 'Wajib di isi!'
        }

        if (!newPassword) {
            err.newPassword = 'Wajib di isi!'
        }

        if (!confirmPassword) {
            err.confirmPassword = 'Wajib di isi!'
        }

        if (Object.keys(err).length === 0) {

            const confirmAlert = window.confirm('Apakah Anda ingin update password?')

            if (confirmAlert) {
                const newData = {
                    currentPassword: currentPassword,
                    newPassword: newPassword,
                    confirmPassword: confirmPassword,
                }
                updatePassword(newData)
            }
        }

        setErrorMessageUpdatePassword(err)
    }

    function updatePassword(data) {
        API.APIPutPassword(user._id, data)
            .then(res => {
                let err = {}

                if (res.error !== null && res.error.includes('current')) {
                    err.currentPassword = res.error
                }

                if (res.error !== null && res.error.includes('confirm')) {
                    err.confirmPassword = res.error
                }

                if (res.error === null) {
                    document.cookie = `e-learning=${res.data.token}`

                    window.location.reload();
                }

                setErrorMessageUpdatePassword(err)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <>
            <div className="wrapp-profile" style={styleWrappProfile}>
                {user && Object.keys(user).length > 0 ? (
                    <>
                        <div className="column-atas-profile">
                            <p className="demi-keamanan">
                                Demi keamanan segera lakukan perubahan Password
                            </p>
                            <div className="content-column-atas-profile">

                            </div>
                        </div>

                        <div className="container-informasi-profile">
                            <div className="column-kiri-informasi-profile column-kiri-group">
                                <p className="informasi-profile title-group-profile">
                                    Informasi Profil
                                </p>
                                <p className="deskripsi-informasi-profil deskripsi-group-profile">
                                    Perbarui informasi profil dan alamat email akun Anda..
                                </p>
                            </div>

                            <div className="column-kanan-informasi-profile column-kanan-group">
                                <div className="column-input-informasi-profile column-input-group">
                                    <Input
                                        label="Photo"
                                        displayImg="flex"
                                        typeInput="file"
                                        acceptFile="image/png, image/jpg, image/jpeg"
                                        nameInput="image"
                                        displayBtnOpenFile="flex"
                                        nameBtnOpenFile="SELECT A NEW PHOTO"
                                        clickBtnOpenFile={openFile}
                                        shadowContainerInput="0 2px 5px -2px rgba(0,0,0,0.2)"
                                        urlImg={image}
                                        changeInput={getFileImg}
                                    />

                                    <Input
                                        label="Name"
                                        value={name}
                                        nameInput="name"
                                        shadowContainerInput="0 2px 5px -2px rgba(0,0,0,0.2)"
                                        typeInput="text"
                                    />

                                    <Input
                                        label="Email"
                                        value={email}
                                        typeInput="email"
                                        nameInput="email"
                                        shadowContainerInput="0 2px 5px -2px rgba(0,0,0,0.2)"
                                        changeInput={changeInput}
                                        error={errorMessageInfoProfil && errorMessageInfoProfil.email}
                                    />
                                </div>

                                <div className="column-btn-save">
                                    <Button
                                        paddingBtn="7px 20px"
                                        nameBtn="SAVE"
                                        click={submitUpdateInfoProfile}
                                    />
                                </div>
                            </div>

                            <div className="line-bottom-group-profile">

                            </div>
                        </div>

                        <div className="container-update-password">
                            <div className="column-kiri-update-password column-kiri-group">
                                <p className="informasi-profile title-group-profile">
                                    Update Password
                                </p>
                                <p className="deskripsi-informasi-profil deskripsi-group-profile">
                                    Pastikan akun Anda menggunakan kata sandi yang panjang dan acak untuk tetap aman.
                                </p>
                            </div>

                            <div className="column-kanan-update-password column-kanan-group">
                                <div className="column-input-update-password column-input-group">
                                    <Input
                                        label="Current Password"
                                        value={currentPassword}
                                        nameInput="currentPassword"
                                        shadowContainerInput="0 2px 5px -2px rgba(0,0,0,0.2)"
                                        typeInput="password"
                                        changeInput={changeInput}
                                        error={errorMessageUpdatePassword && errorMessageUpdatePassword.currentPassword}
                                    />

                                    <Input
                                        label="New Password"
                                        value={newPassword}
                                        typeInput="password"
                                        nameInput="newPassword"
                                        shadowContainerInput="0 2px 5px -2px rgba(0,0,0,0.2)"
                                        changeInput={changeInput}
                                        error={errorMessageUpdatePassword && errorMessageUpdatePassword.newPassword}
                                    />

                                    <Input
                                        label="Confirm Password"
                                        value={confirmPassword}
                                        typeInput="password"
                                        nameInput="confirmPassword"
                                        shadowContainerInput="0 2px 5px -2px rgba(0,0,0,0.2)"
                                        changeInput={changeInput}
                                        error={errorMessageUpdatePassword && errorMessageUpdatePassword.confirmPassword}
                                    />
                                </div>

                                <div className="column-btn-save">
                                    <Button
                                        paddingBtn="7px 20px"
                                        nameBtn="SAVE"
                                        click={submitUpdatePassword}
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div></div>
                )}

                <Loading displayWrapp={loading ? 'flex' : 'none'} />
            </div>
        </>
    )
}

export default Profile;