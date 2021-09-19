import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import './KomentarDiskusi.scss'
import CardJadwal from '../../components/cardjadwal/CardJadwal'
import API from '../../services/api'
import endpoint from '../../services/api/endpoint'
import bgchat from '../../images/bgchat.jpg'
import Input from '../../components/input/Input'
import { PathContext } from '../../services/context/path';
import Loading from '../../components/loading/Loading';

function KomentarDiskusi() {

    const [pathGlobal, setPathGlobal, activeNavmenu, setActiveNavmenu, activeNavCollapse, setActiveNavCollapse, overActiveNavmenu, setOverActiveNavmenu, activeNavmenuDefault, setActiveNavmenuDefault, dataUserForNavbar, setDataUserForNavbar, idxActiveGlobal, setIdxActiveGlobal, headerTable, setHeaderTable, bodyTable, setBodyTable, pathPrintTable, setPathPrintTable, idxOnePrintTable, setIdxOnePrintTable, idxTwoPrintTable, setIdxTwoPrintTable, idxHeadPrintTable, setIdxHeadPrintTable, overActiveNavmenuDefault, setOverActiveNavmenuDefault, activeBodyDesktop, activeIconDrop, setActiveIconDrop, inActiveNavAfterLoadPage] = useContext(PathContext)
    const [dataFormDiskusi, setDataFormDiskusi] = useState({})
    const [dataKomentar, setDataKomentar] = useState([])
    const [user, setUser] = useState({})
    const [colorName, setColorName] = useState('')
    const [id, setId] = useState('')
    const [loading, setLoading] = useState(false)
    const [loadingSendMsg, setLoadingSendMsg] = useState(false)
    const [message, setMessage] = useState('')

    const history = useHistory()
    const getTokenUser = Cookies.get('e-learning')
    const path = window.location.pathname
    const getPath = path.split('/')

    const years = new Date().getFullYear()
    const month = new Date().getMonth().toString().length === 1 ? `0${new Date().getMonth() + 1}` : new Date().getMonth()
    const date = new Date().getDate().toString().length === 1 ? `0${new Date().getDate()}` : new Date().getDate()

    const hours = new Date().getHours().toString().length === 1 ? `0${new Date().getHours()}` : new Date().getHours()
    const minutes = new Date().getMinutes().toString().length === 1 ? `0${new Date().getMinutes()}` : new Date().getMinutes()
    const seconds = new Date().getSeconds().toString().length === 1 ? `0${new Date().getSeconds()}` : new Date().getSeconds()

    function setAllAPI(condition) {
        setLoading(condition)

        API.APIGetDashboard(getTokenUser)
            .then(res => {
                if (res && res.data) {
                    setUser(res.data.user.data)
                } else {
                    history.push('/login')
                    document.cookie = 'e-learning='
                }
            })
            .catch(err => console.log(err))

        API.APIGetOneMatkul(getPath[5])
            .then(res => {
                setLoading(false)
                setLoadingSendMsg(false)
                setMessage('')
                const containerChatDiskusi = document.getElementsByClassName('container-chat-diskusi')[0]

                setTimeout(() => {
                    containerChatDiskusi.scrollTo({ top: 0, behavior: 'smooth' })
                }, 0);

                const respons = res.data
                setId(respons._id)

                const getKomentar = respons.ruangDiskusi.filter((e) => e.id == getPath[4])
                setDataFormDiskusi(getKomentar[0])
                setDataKomentar(getKomentar[0].komentar)
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
    }

    useEffect(() => {
        setTimeout(() => {
            activeBodyDesktop('wrapp-komentar-diskusi', 'wrapp-komentar-diskusi-active');
            inActiveNavAfterLoadPage();
        }, 0);
        setAllAPI(true);
    }, [])

    const styleContainerChat = {
        backgroundImage: `url(${bgchat})`
    }

    function inputMessage(e) {
        setMessage(e.target.value)
    }

    const { name, nim, email, image } = user && user

    const color = ['#a8eb34', '#34ebc0', '#34d0eb', '#344ceb', '#c334eb', '#eb343d', '#ebc934', '#126362']

    async function submitMessage(e, max) {
        e.preventDefault()

        const getColorName = dataKomentar.length > 0 && dataKomentar.filter((e) => e.author.name === name && e.author.nim == nim && e.author.gmail == email)
        const getColor = await Math.floor(Math.random() * max)

        const getAvailableColor = getColorName.length > 0 ? getColorName[0].color : color[getColor]

        const data = {
            message: message,
            color: getAvailableColor,
            name: name,
            nim: nim,
            kelas: user && user.class,
            gmail: email,
            image: image,
            date: `${years}-${month}-${date} ${hours}:${minutes}:${seconds}`
        }

        if (message.length > 0 && loadingSendMsg === false) {
            setLoadingSendMsg(true)

            API.APIPostKomentar(id, dataFormDiskusi && dataFormDiskusi.id, data)
                .then(res => {
                    setAllAPI(false);

                    return res;
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    const styleLoadingSendMsg = {
        display: loadingSendMsg ? 'flex' : 'none'
    }

    const styleIconSendMsg = {
        display: !loadingSendMsg ? 'flex' : 'none'
    }

    return (
        <>
            <div className="wrapp-komentar-diskusi">
                <div className="container-white-komentar-diskusi">
                    <div className="column-judul-komentar-diskusi">
                        {dataFormDiskusi && Object.keys(dataFormDiskusi).length > 0 ? (
                            <>
                                <p className="title-komentar-diskusi">
                                    {dataFormDiskusi.judul}
                                </p>
                                <p className="body-komentar-diskusi">
                                    {dataFormDiskusi.body}
                                </p>

                                <div className="column-author-komentar-diskusi">
                                    <p className="author-komentar-diskusi">
                                        <i className="fas fa-at"></i>
                                        {dataFormDiskusi.author.name}
                                    </p>
                                </div>
                            </>
                        ) : (
                            <div></div>
                        )}
                    </div>

                    <div className="container-chat-diskusi" style={styleContainerChat}>
                        <div className="body-scroll-chat-diskusi">
                            {dataKomentar && dataKomentar.length > 0 ? dataKomentar.map((e, i) => {
                                return (
                                    <>
                                        <CardJadwal
                                            key={i}
                                            displayColumnRed="none"
                                            displayColumnWhite="none"
                                            widthWrapp="100%"
                                            bdrRadiusWrapp="0"
                                            marginFontSlidePembelajaran="0 0 3px 0"
                                            bgColorWrapp="transparent"
                                            borderWrapp="none"
                                            bdrBottomWrapp="none"
                                            displayMessage="flex"
                                            marginWrapp="0"
                                            displayImgAuthor="flex"
                                            bgColorColumnKiri="#fff"
                                            maxWidthColumnKiri="400px"
                                            paddingColumnKiri="10px 80px 10px 10px"
                                            boxShadowColumnKiri="0 1px 3px -1px rgba(0,0,0,0.2)"
                                            justifyContentFontSlidePembelajaran="flex-start"
                                            positionDateSlidePembelajaran="absolute"
                                            bottomDateSlidePembelajaran="10px"
                                            rightDateSlidePembelajaran="10px"
                                            marginColumnKiri="0 0 0 10px"
                                            bdrRadiusColumnKiri="5px"
                                            displayCardSlidePembelajaran="flex"
                                            flexDirectionSlidePembelajaran="row"
                                            displayIconZip="none"
                                            displayIframeYoutube="none"
                                            displayBtnDownload="none"
                                            paddingSlidePembelajaran="0px 40px 20px 20px"
                                            nameFile={e.author.name}
                                            message={e.message}
                                            dateCreate={e.date}
                                            imgAuthor={`${endpoint}/${e.author.image}`}
                                            colorNameFile={e.color}
                                            justifyContentSlidePembelajaran="flex-start"
                                            alignItemsSlidePembelajaran="flex-end"
                                        />
                                    </>
                                )
                            }) : (
                                <div></div>
                            )}
                        </div>
                    </div>

                    <form action="" className="form-input-chat-komentar-diskusi" onSubmit={(e) => submitMessage(e, 8)}>
                        <Input
                            borderInput="none"
                            marginWrapp="0"
                            placeholder="Write your comment..."
                            autoCompleteInput="off"
                            autoFocusInput="autofocus"
                            value={message}
                            changeInput={inputMessage}
                        />
                        <i className="fas fa-paper-plane" style={styleIconSendMsg} onClick={(e) => submitMessage(e, 8)}></i>

                        <div className="loading-send-komentar-diskusi" style={styleLoadingSendMsg}>

                        </div>
                    </form>
                </div>

                <Loading displayWrapp={loading ? 'flex' : 'none'} />
            </div>
        </>
    )
}

export default KomentarDiskusi;