import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router';
import Cookies from 'js-cookie';
import './JadwalKuliah.scss'
import CardJadwal from '../../components/cardjadwal/CardJadwal';
import API from '../../services/api';
import { PathContext } from '../../services/context/path';
import HoverButton from '../../components/hoverbutton/HoverButton';
import Loading from '../../components/loading/Loading';

function JadwalKuliah() {

    const [pathGlobal, setPathGlobal, activeNavmenu, setActiveNavmenu, activeNavCollapse, setActiveNavCollapse, overActiveNavmenu, setOverActiveNavmenu, activeNavmenuDefault, setActiveNavmenuDefault, dataUserForNavbar, setDataUserForNavbar, idxActiveGlobal, setIdxActiveGlobal, headerTable, setHeaderTable, bodyTable, setBodyTable, pathPrintTable, setPathPrintTable, idxOnePrintTable, setIdxOnePrintTable, idxTwoPrintTable, setIdxTwoPrintTable, idxHeadPrintTable, setIdxHeadPrintTable, overActiveNavmenuDefault, setOverActiveNavmenuDefault, activeBodyDesktop, activeIconDrop, setActiveIconDrop, inActiveNavAfterLoadPage] = useContext(PathContext)
    const [jadwalKuliah, setJadwalKuliah] = useState([])
    const [loading, setLoading] = useState(false)
    const [onDisplayHoverBtn, setOnDisplayHoverBtn] = useState(false)
    const [positionLeft, setPositionLeft] = useState('')
    const [positionTop, setPositionTop] = useState('')
    const [nameHoverBtn, setNameHoverBtn] = useState('')

    const history = useHistory();
    const getTokenUser = Cookies.get('e-learning');

    const nameMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const nameDay = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

    const years = new Date().getFullYear();
    const date = new Date().getDate().toString().length === 1 ? `0${new Date().getDate()}` : new Date().getDate();
    const month = new Date().getMonth()
    const day = new Date().getDay()

    function setAllAPI() {
        setLoading(true)

        let user = {}

        API.APIGetDashboard(getTokenUser)
            .then(res => {
                if (res && res.data) {
                    user = res.data.user.data
                    API.APIGetAllJadwalKuliah()
                        .then(res => {
                            setLoading(false)
                            const respons = res.data

                            const getJadwalKuliahFromUser = respons.filter((e) => e.major === user.major && e.kelas === user.class && e.campus === user.campus && e.semester === user.statusSemester && e.id === 'jadwal-kuliah-utama')

                            setJadwalKuliah(getJadwalKuliahFromUser)

                            // console.log(res)
                            const tesF = respons.filter((e) => e.ruangDiskusi.length > 0)

                            function getRd(data) {
                                data.forEach((e) => {
                                    const komentar = e.ruangDiskusi.filter((e) => e.komentar)
                                    const getUser = komentar.filter((e) => e.author.nim == 15200060)
                                    console.log(getUser)
                                })
                            }

                            getRd(tesF)
                        })
                        .catch(err => console.log(err))
                } else {
                    history.push('/login')
                    document.cookie = 'e-learning='
                }
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        setTimeout(() => {
            activeBodyDesktop('wrapp-jadwal-kuliah', 'wrapp-jadwal-kuliah-active');
            inActiveNavAfterLoadPage();
        }, 0);
        setAllAPI();
    }, [])

    function toPage(path) {
        history.push(path)
    }

    function mouseOverBtn(name, idxBtn, nameClass) {
        const btnBlueGroup = document.getElementsByClassName(`btn-ruang-${nameClass}`)
        const getPositionBtn = btnBlueGroup[idxBtn].getBoundingClientRect()
        const roundValueLeft = Math.floor(getPositionBtn.left)
        const roundValueTop = Math.floor(getPositionBtn.top)

        setPositionLeft(`${roundValueLeft - 20}px`)
        setPositionTop(`${roundValueTop + 40}px`)
        setNameHoverBtn(name)

        setOnDisplayHoverBtn(true)
    }

    function mouseLeaveBtn() {
        setOnDisplayHoverBtn(false)
    }

    function mouseOverBlackBtn(idx, name) {
        const hoverBlackBtn = document.getElementsByClassName(`hover-black-${name}`)
        hoverBlackBtn[idx].style.opacity = '0.2'
    }

    function mouseLeaveBlackBtn(idx, name) {
        const hoverBlackBtn = document.getElementsByClassName(`hover-black-${name}`)
        hoverBlackBtn[idx].style.opacity = '0'
    }

    return (
        <>
            <div className="wrapp-jadwal-kuliah">
                {jadwalKuliah && jadwalKuliah.length > 0 ? jadwalKuliah.map((e, i) => {

                    const timeZoneMasuk = e.timeZoneMasuk.split(' ')

                    return (
                        <>
                            <CardJadwal
                                key={e._id}
                                matakuliah={e.matakuliah}
                                hari={e.hari}
                                jamMasuk={e.jamMasuk}
                                jamKeluar={e.jamKeluar}
                                kodeDosen={e.kodeDosen}
                                kodeMTK={e.kodeMTK}
                                sks={e.sks}
                                noRuang={e.noRuang}
                                kelPraktek={e.kelPraktek}
                                kodeGabung={e.kodeGabung}
                                marginWrapp="0 15px 15px 0"
                                bgColorColumnRed={timeZoneMasuk[3] == years && timeZoneMasuk[2] == date && timeZoneMasuk[1] === nameMonth[month] && timeZoneMasuk[0] === nameDay[day - 1] ? '#1a8e5f' : '#cc2626'}
                                toPage={() => toPage(`/absensi/${e._id}`)}
                                toPageForumDiskusi={() => toPage(`/forum-diskusi/${e._id}`)}
                                toPageRuangMateri={() => toPage(`/ruang-materi/${e._id}`)}
                                toPageRuangTugas={() => toPage(`/ruang-tugas/${e._id}`)}
                                mouseOverRuangDiskusi={() => {
                                    mouseOverBtn('Ruang Diskusi', i, 'diskusi')
                                    mouseOverBlackBtn(i, 'ruang-diskusi')
                                }}
                                mouseLeaveRuangDiskusi={() => {
                                    mouseLeaveBtn()
                                    mouseLeaveBlackBtn(i, 'ruang-diskusi')
                                }}
                                mouseOverRuangMateri={() => {
                                    mouseOverBtn('Ruang Materi', i, 'materi')
                                    mouseOverBlackBtn(i, 'ruang-materi')
                                }}
                                mouseLeaveRuangMateri={() => {
                                    mouseLeaveBtn()
                                    mouseLeaveBlackBtn(i, 'ruang-materi')
                                }}
                                mouseOverRuangTugas={() => {
                                    mouseOverBtn('Ruang Tugas', i, 'tugas')
                                    mouseOverBlackBtn(i, 'ruang-tugas')
                                }}
                                mouseLeaveRuangTugas={() => {
                                    mouseLeaveBtn()
                                    mouseLeaveBlackBtn(i, 'ruang-tugas')
                                }}
                                mouseOverMasukKelas={() => mouseOverBlackBtn(i, 'masuk-kelas')}
                                mouseLeaveMasukKelas={() => mouseLeaveBlackBtn(i, 'masuk-kelas')}
                            />
                        </>
                    )
                }) : (
                    <p className="nothing-jadwal-kuliah">
                        Tidak Ada Jadwal Kuliah Untuk Saat Ini
                    </p>
                )}

                <HoverButton
                    displayWrapp={onDisplayHoverBtn ? 'flex' : 'none'}
                    nameHover={nameHoverBtn}
                    colorNameHover="#fff"
                    fontSizeNameHover="10px"
                    topWrapp={positionTop}
                    leftWrapp={positionLeft}
                    bgColorWrapp="#000"
                />

                <Loading displayWrapp={loading ? 'flex' : 'none'} />
            </div>
        </>
    )
}

export default JadwalKuliah;