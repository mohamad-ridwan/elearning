import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Cookies from 'js-cookie';
import './KuliahPengganti.scss'
import CardJadwal from '../../components/cardjadwal/CardJadwal';
import { PathContext } from '../../services/context/path';
import API from '../../services/api';
import HoverButton from '../../components/hoverbutton/HoverButton';
import Loading from '../../components/loading/Loading';

function KuliahPengganti() {

    const [pathGlobal, setPathGlobal, activeNavmenu, setActiveNavmenu, activeNavCollapse, setActiveNavCollapse, overActiveNavmenu, setOverActiveNavmenu, activeNavmenuDefault, setActiveNavmenuDefault, dataUserForNavbar, setDataUserForNavbar, idxActiveGlobal, setIdxActiveGlobal, headerTable, setHeaderTable, bodyTable, setBodyTable, pathPrintTable, setPathPrintTable, idxOnePrintTable, setIdxOnePrintTable, idxTwoPrintTable, setIdxTwoPrintTable, idxHeadPrintTable, setIdxHeadPrintTable, overActiveNavmenuDefault, setOverActiveNavmenuDefault, activeBodyDesktop, activeIconDrop, setActiveIconDrop, inActiveNavAfterLoadPage] = useContext(PathContext)
    const [kuliahPengganti, setKuliahPengganti] = useState([])
    const [positionLeft, setPositionLeft] = useState('')
    const [positionTop, setPositionTop] = useState('')
    const [nameHoverBtn, setNameHoverBtn] = useState('')
    const [onDisplayHoverBtn, setOnDisplayHoverBtn] = useState(false)
    const [loading, setLoading] = useState(false)

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

                            const getJadwalKuliahFromUser = respons.filter((e) => e.major === user.major && e.kelas === user.class && e.campus === user.campus && e.semester === user.statusSemester && e.id === 'jadwal-kuliah-pengganti')

                            setKuliahPengganti(getJadwalKuliahFromUser)
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
        setAllAPI();
        setTimeout(() => {
            activeBodyDesktop('wrapp-kuliah-pengganti', 'wrapp-kuliah-pengganti-active')
            inActiveNavAfterLoadPage();
        }, 0);
        window.scrollTo(0, 0)
    }, [])

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

    function mouseOverBlackBtn(idx, name) {
        const hoverBlackBtn = document.getElementsByClassName(`hover-black-${name}`)
        hoverBlackBtn[idx].style.opacity = '0.2'
    }

    function mouseLeaveBtn() {
        setOnDisplayHoverBtn(false)
    }

    function mouseLeaveBlackBtn(idx, name) {
        const hoverBlackBtn = document.getElementsByClassName(`hover-black-${name}`)
        hoverBlackBtn[idx].style.opacity = '0'
    }

    function toPage(path) {
        history.push(path)
    }

    return (
        <>
            <div className="wrapp-kuliah-pengganti">
                {kuliahPengganti && kuliahPengganti.length > 0 ? kuliahPengganti.map((e, i) => {

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
                                bgColorColumnRed={timeZoneMasuk[3] == years && timeZoneMasuk[2] == date && timeZoneMasuk[1] === nameMonth[month] && timeZoneMasuk[0] === nameDay[day == 0 ? 6 : day - 1] ? '#1a8e5f' : '#cc2626'}
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
                    <p className="nothing-jadwal-kuliah-pengganti">
                        Tidak Ada Jadwal Kuliah Pengganti Untuk Saat Ini
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

export default KuliahPengganti;