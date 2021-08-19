import React, { useEffect, useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import Cookies from 'js-cookie';
import './SendTugas.scss'
import Input from '../../components/input/Input'
import Button from '../../components/button/Button'
import API from '../../services/api';
import Loading from '../../components/loading/Loading';
import { PathContext } from '../../services/context/path';

function SendTugas() {

    const [pathGlobal, setPathGlobal, activeNavmenu, setActiveNavmenu] = useContext(PathContext)
    const [linkTugas, setLinkTugas] = useState('')
    const [dataUser, setDataUser] = useState({})
    const [dataMatkul, setDataMatkul] = useState({})
    const [errMessage, setErrMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const history = useHistory()
    const getTokenUser = Cookies.get('e-learning')

    const years = new Date().getFullYear()
    const date = new Date().getDate().toString().length === 1 ? `0${new Date().getDate()}` : new Date().getDate()
    const month = new Date().getMonth().toString().length === 1 ? `0${new Date().getMonth() + 1}` : new Date().getMonth()

    const hours = new Date().getHours().toString().length === 1 ? `0${new Date().getHours()}` : new Date().getHours()
    const minutes = new Date().getMinutes().toString().length === 1 ? `0${new Date().getMinutes()}` : new Date().getMinutes()
    const seconds = new Date().getSeconds().toString().length === 1 ? `0${new Date().getSeconds()}` : new Date().getSeconds()

    const getPath = window.location.pathname
    const getId = getPath.split('/')

    function setAllAPI() {
        API.APIGetDashboard(getTokenUser)
            .then(res => {
                if (res && res.data) {
                    const user = res.data.user.data
                    setDataUser(user)
                } else {
                    history.push('/login')
                    document.cookie = 'e-learning='
                }
            })

        API.APIGetOneMatkul(getId[3])
            .then(res => {
                setDataMatkul(res.data)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        setAllAPI();
    }, [])

    const styleWrapp = {
        marginLeft: activeNavmenu ? '230px' : '70px'
    }

    const cancelBtn = document.getElementsByClassName('btn-cancel-upload-tugas')

    function mouseOverCancel() {
        cancelBtn[0].style.backgroundColor = '#374151'
    }

    function mouseLeaveCancel() {
        cancelBtn[0].style.backgroundColor = '#c1920c'
    }

    function clickCancel() {
        history.push(`/ruang-tugas/${getId[3]}`)
    }

    function changeInput(e) {
        setLinkTugas(e.target.value)
    }

    const getTugas = Object.keys(dataMatkul).length > 0 && dataMatkul.ruangTugas.filter((e) => e.pertemuan === getId[4])

    function submitTugas() {
        if (Object.keys(dataMatkul).length > 0) {
            const data = {
                id: `${dataUser.name}-${dataUser.nim}-${getId[4]}`,
                name: dataUser.name,
                nim: dataUser.nim,
                kelas: dataUser.class,
                pertemuan: getId[4],
                kodeMTK: dataMatkul.kodeMTK,
                judul: getTugas[0].judul,
                linkTugas: linkTugas,
                komentarDosen: ' ',
                nilai: ' ',
                created: `${years}-${month}-${date} ${hours}:${minutes}:${seconds}`,
                updated: `${years}-${month}-${date} ${hours}:${minutes}:${seconds}`
            }

            const confirm = window.confirm('link tugas sudah benar?')

            if (confirm) {
                if (linkTugas.length > 0) {
                    setLoading(true)

                    API.APIPostTugas(dataMatkul._id, data)
                        .then(res => {
                            setErrMessage('')
                            setLinkTugas('')
                            setLoading(false)
                            window.alert('berhasil kirim tugas!')
                            return res;
                        })
                        .catch(err => {
                            setLoading(false)
                            console.log(err)
                        })
                } else {
                    setErrMessage('Link Tugas harus di isi!')
                }
            }
        }
    }

    return (
        <>
            <div className="wrapp-form-send-tugas" style={styleWrapp}>
                <div className="container-form-send-tugas">
                    <p className="title-form-send-tugas">
                        Form Upload Tugas
                    </p>

                    <div className="column-text-send-tugas">
                        <Input
                            label="Link Tugas"
                            fontWeightLabel="600"
                            displayInput="none"
                            displayIputArea="flex"
                            placeHolderInputArea="Masukkan Link Tugas..."
                            focusInputArea="autofocus"
                            changeInputArea={changeInput}
                            valueInputArea={linkTugas}
                            error={errMessage}
                        />

                        <div className="column-btn-form-upload-tugas">
                            <Button
                                nameBtn="Kirim Tugas"
                                marginBtn="0 10px 0 0"
                                click={submitTugas}
                            />

                            <Button
                                nameBtn="Cancel"
                                bgColor="#c1920c"
                                classWrapp="btn-cancel-upload-tugas"
                                mouseOver={mouseOverCancel}
                                mouseleave={mouseLeaveCancel}
                                click={clickCancel}
                            />
                        </div>
                    </div>
                </div>

                <Loading
                    displayWrapp={loading ? 'flex' : 'none'}
                    bgColor="rgba(0,0,0,0.5)"
                />
            </div>
        </>
    )
}

export default SendTugas;