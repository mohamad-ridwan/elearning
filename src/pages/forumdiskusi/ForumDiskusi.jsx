import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router';
import fileDownload from 'js-file-download';
import axios from 'axios';
import Cookies from 'js-cookie';
import './ForumDiskusi.scss'
import Button from '../../components/button/Button'
import CardJadwal from '../../components/cardjadwal/CardJadwal'
import endpoint from '../../services/api/endpoint';
import API from '../../services/api';
import { PathContext } from '../../services/context/path';
import Loading from '../../components/loading/Loading';
import Input from '../../components/input/Input';

function ForumDiskusi() {

    const [pathGlobal, setPathGlobal, activeNavmenu, setActiveNavmenu] = useContext(PathContext)
    const [dataForum, setDataForum] = useState([])
    const [idDocument, setIdDocument] = useState('')
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false)
    const [onModal, setOnModal] = useState(false)
    const [colorBtnCancel, setColorBtnCancel] = useState('#ea490b')
    const [errorMessage, setErrorMessage] = useState({})
    const [loadingSubmit, setLoadingSubmit] = useState(false)
    const [onDisplayBtnSubmit, setOnDisplayBtnSubmit] = useState(false)
    const [valueFormDiskusi, setValueFormDiskusi] = useState({
        judul: '',
        body: '',
        image: ''
    })

    const getTokenUser = Cookies.get('e-learning')
    const history = useHistory()

    const path = window.location.pathname
    const getPath = path.split('/forum-diskusi/')

    function setAllAPI(condition) {
        setLoading(condition)

        API.APIGetDashboard(getTokenUser)
            .then(res => {
                if (res && res.data) {
                    setUser(res.data.user.data)
                    return res;
                } else {
                    history.push('/login')
                    document.cookie = 'e-learning='
                }
            })
            .catch(err => console.log(err))

        API.APIGetOneMatkul(getPath[1])
            .then(res => {
                setLoading(false)

                const respons = res.data
                setIdDocument(respons._id)
                setDataForum(respons.ruangDiskusi)
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        setAllAPI(true);
    }, [])

    const styleWrapp = {
        marginLeft: activeNavmenu ? '230px' : '70px'
    }

    function mouseOverBtnDownload(idx, className) {
        const hoverBlackBtn = document.getElementsByClassName(className)

        hoverBlackBtn[idx].style.opacity = '0.2'
    }

    function mouseLeaveBtnDownload(idx, className) {
        const hoverBlackBtn = document.getElementsByClassName(className)

        hoverBlackBtn[idx].style.opacity = '0'
    }

    function unduhFile(filePath) {
        axios.get(`${endpoint}/${filePath}`, { responseType: 'blob' })
            .then(res => {
                fileDownload(res.data, filePath)
            })
            .catch(err => console.log(err))
    }

    function toPageKomentar(judul, id, path) {
        history.push(`/forum-diskusi/komentar/${judul}/${id}/${path}`)
    }

    const styleModalFormDiskusi = {
        display: onModal ? 'flex' : 'none'
    }

    function closeModalInput(e) {
        e.preventDefault()
        setOnModal(false)
        setOnDisplayBtnSubmit(false)
    }

    function addNewTask() {
        setOnModal(true)
    }

    function mouseOverBtnCancel() {
        return setColorBtnCancel('#cc2626')
    }

    function mouseLeaveBtnCancel() {
        return setColorBtnCancel('#ea490b')
    }

    const years = new Date().getFullYear()
    const month = new Date().getMonth().toString().length === 1 ? `0${new Date().getMonth() + 1}` : new Date().getMonth()
    const date = new Date().getDate().toString().length === 1 ? `0${new Date().getDate()}` : new Date().getDate()

    const hours = new Date().getHours().toString().length === 1 ? `0${new Date().getHours()}` : new Date().getHours()
    const minutes = new Date().getMinutes().toString().length === 1 ? `0${new Date().getMinutes()}` : new Date().getMinutes()
    const seconds = new Date().getSeconds().toString().length === 1 ? `0${new Date().getSeconds()}` : new Date().getSeconds()

    const { name, nim, email } = user && user

    function submitFormDiskusi(e) {
        e.preventDefault();

        let err = {}

        const data = new FormData()
        data.append('judul', valueFormDiskusi.judul)
        data.append('body', valueFormDiskusi.body)
        data.append('name', name)
        data.append('nim', nim)
        data.append('kelas', user && user.class)
        data.append('gmail', email)
        data.append('image', valueFormDiskusi.image)
        data.append('date', `${years}-${month}-${date} ${hours}:${minutes}:${seconds}`)

        if (!valueFormDiskusi.judul) {
            err.judul = 'Wajib di isi!'
        }
        if (!valueFormDiskusi.body) {
            err.body = 'Wajib di isi!'
        }
        if (valueFormDiskusi.image && valueFormDiskusi.image.name) {
            const getFileType = valueFormDiskusi.image.name.split('.')
            const getFileSize = valueFormDiskusi.image.size

            if (getFileType[1] !== 'pdf') {
                err.type = 'Type File Harus Berupa PDF!'
            }

            if (getFileSize > 2000000) {
                err.size = 'Max File Harus 2MB!'
            }
        }

        if (err && Object.keys(err).length === 0) {
            setLoadingSubmit(true)

            API.APIPostRoomDiskusi(idDocument, data)
                .then(res => {
                    setAllAPI(false);
                    setLoadingSubmit(false);
                    setOnModal(false);
                    setOnDisplayBtnSubmit(false)

                    return res;
                })
                .catch(err => {
                    setLoadingSubmit(false)
                    console.log(err)
                })
        }

        setErrorMessage(err)
    }

    function confirmSubmitForm(e, condition) {
        e.preventDefault();
        setOnDisplayBtnSubmit(condition)
    }

    function deleteRoomDiskusi(id) {
        const confirm = window.confirm('Hapus Forum Diskusi?')

        if (confirm) {
            setLoadingSubmit(true)
            API.APIDeleteRoomDiskusi(idDocument, id)
                .then(res => {
                    setAllAPI(false)
                    setLoadingSubmit(false)

                    return res
                })
                .catch(err => {
                    setLoadingSubmit(false)
                    console.log(err)
                })
        }
    }

    const errorMsgFile = errorMessage && errorMessage.type ? errorMessage.type : errorMessage && errorMessage.size ? errorMessage.size : 'File PDF Max 2MB'

    return (
        <>
            <div className="wrapp-forum-diskusi" style={styleWrapp}>
                <div className="modal-input-form-diskusi" style={styleModalFormDiskusi}>
                    <div className="btn-close-body-form-diskusi" onClick={closeModalInput}>

                    </div>
                    <form className="form-input-diskusi" encType="multipart/form-data" onSubmit={(e) => e.preventDefault()}>
                        <div className="bar-hijau-form-diskusi">
                            <p className="title-bar-form-diskusi">
                                Input Forum Diskusi
                            </p>

                            <i className="fas fa-times" onClick={closeModalInput}></i>
                        </div>

                        <div className="column-white-form-diskusi">
                            <Input
                                label="Judul Diskusi"
                                value={valueFormDiskusi.judul}
                                changeInput={(e) => {
                                    setValueFormDiskusi({
                                        ...valueFormDiskusi,
                                        judul: e.target.value
                                    })

                                    if (errorMessage && errorMessage.judul) {
                                        setErrorMessage({
                                            ...errorMessage,
                                            judul: ''
                                        })
                                    }
                                }}
                                error={errorMessage && errorMessage.judul}
                            />
                            <Input
                                label="Isi Form Diskusi"
                                displayInput="none"
                                displayIputArea="flex"
                                changeInputArea={(e) => {
                                    setValueFormDiskusi({
                                        ...valueFormDiskusi,
                                        body: e.target.value
                                    })

                                    if (errorMessage && errorMessage.body) {
                                        setErrorMessage({
                                            ...errorMessage,
                                            body: ''
                                        })
                                    }
                                }}
                                error={errorMessage && errorMessage.body}
                            />
                            <Input
                                label="File Tambahan"
                                typeInput="file"
                                nameInput="file"
                                error={errorMsgFile}
                                changeInput={(e) => setValueFormDiskusi({
                                    ...valueFormDiskusi,
                                    image: e.target.files[0]
                                })}
                            />
                        </div>
                        <div className="column-btn-input-form-diskusi" style={{
                            display: !onDisplayBtnSubmit ? 'flex' : 'none'
                        }}>
                            <Button
                                nameBtn="CANCEL"
                                bgColor={colorBtnCancel}
                                marginBtn="0 10px 0 0"
                                click={closeModalInput}
                                mouseOver={mouseOverBtnCancel}
                                mouseleave={mouseLeaveBtnCancel}
                            />
                            <Button
                                nameBtn="CREATE"
                                click={(e) => confirmSubmitForm(e, true)}
                            />
                        </div>

                        <div className="column-btn-confirm-form-diskusi" style={{
                            display: onDisplayBtnSubmit ? 'flex' : 'none'
                        }}>
                            <p className="message-confirm-submit">
                                Tambahkan forum diskusi?
                            </p>

                            <Button
                                nameBtn="OKE"
                                marginBtn="0 10px 0 0"
                                click={submitFormDiskusi}
                            />
                            <Button
                                nameBtn="BATAL"
                                bgColor={colorBtnCancel}
                                click={(e) => confirmSubmitForm(e, false)}
                                mouseOver={mouseOverBtnCancel}
                                mouseleave={mouseLeaveBtnCancel}
                            />
                        </div>
                    </form>
                </div>

                <div className="container-white-forum-diskusi">
                    <div className="column-judul-forum-diskusi">
                        <p className="title-forum-diskusi">
                            Forum Diskusi
                        </p>

                        <div className="column-btn-add-new-task">
                            <Button
                                nameBtn="Add New Task"
                                click={addNewTask}
                            />
                        </div>
                    </div>

                    <div className="column-room-forum-diskusi">
                        {dataForum && dataForum.length > 0 ? dataForum.map((e, i) => {
                            const checkAuthor = user && user.name === e.author.name && user && user.nim == e.author.nim && user && user.email === e.author.gmail ? 'flex' : 'none'

                            const judul = e.judul.split(' ').join('-')

                            return (
                                <>
                                    <CardJadwal
                                        key={i}
                                        displayColumnRed="none"
                                        displayColumnWhite="none"
                                        widthWrapp="100%"
                                        displayCardSlidePembelajaran="flex"
                                        displayIconZip="none"
                                        displayIframeYoutube="none"
                                        nameFile={e.judul}
                                        dateCreate={e.body}
                                        nameAuthor={e.author.name}
                                        dateAuthor={e.date}
                                        displayBtnDelete={checkAuthor}
                                        clickBtnDownload={() => toPageKomentar(judul, e.id, idDocument)}
                                        bdrRadiusWrapp="0"
                                        borderWrapp="none"
                                        marginWrapp="0"
                                        displayColumnAuthor="flex"
                                        marginDateSlidePembelajaran="0 20px 0px 0"
                                        marginFontSlidePembelajaran="5px 0"
                                        flexDirectionSlidePembelajaran="row"
                                        alignItemsSlidePembelajaran="center"
                                        justifyContentSlidePembelajaran="space-between"
                                        justifyContentFontSlidePembelajaran="flex-start"
                                        textAlignDateSlidePembelajaran="start"
                                        displayBtnFUnduhForumDiskusi={e.image !== ' ' ? 'flex' : 'none'}
                                        bdrBottomWrapp="1px solid #e4e9f1"
                                        colorDateSlidePembelajaran="#8796af"
                                        bgColorBtnDownload="#1a538e"
                                        classBtn="btn-komentar-forum-diskusi"
                                        nameBtn="Komentar"
                                        classBtnUnduhFile="unduh-file-forum-disk"
                                        mouseOverBtnDownload={() => mouseOverBtnDownload(i, 'btn-komentar-forum-diskusi')}
                                        mouseLeaveBtnDownload={() => mouseLeaveBtnDownload(i, 'btn-komentar-forum-diskusi')}
                                        mouseEnterUnduhForumDisk={() => mouseOverBtnDownload(i, 'unduh-file-forum-disk')}
                                        mouseLeaveUnduhForumDisk={() => mouseLeaveBtnDownload(i, 'unduh-file-forum-disk')}
                                        unduhFileForumDisk={() => unduhFile(e.image)}
                                        btnDeleteRoomDiskusi={() => deleteRoomDiskusi(e.id)}
                                    />
                                </>
                            )
                        }) : (
                            <div className="container-putih-kosong"></div>
                        )}
                    </div>
                </div>

                <Loading displayWrapp={loading ? 'flex' : 'none'} />
                <Loading
                    displayWrapp={loadingSubmit ? 'flex' : 'none'}
                    bgColor="rgba(0,0,0,0.8)"
                    zIndexWrapp="99999"
                />
            </div>
        </>
    )
}

export default ForumDiskusi;