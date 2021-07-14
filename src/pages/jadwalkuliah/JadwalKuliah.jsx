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

    const [pathGlobal, setPathGlobal, activeNavmenu, setActiveNavmenu] = useContext(PathContext)
    const [jadwalKuliah, setJadwalKuliah] = useState([])
    const [loading, setLoading] = useState(false)
    const [onDisplayHoverBtn, setOnDisplayHoverBtn] = useState(false)
    const [positionLeft, setPositionLeft] = useState('')
    const [positionTop, setPositionTop] = useState('')
    const [nameHoverBtn, setNameHoverBtn] = useState('')

    const history = useHistory();
    const getTokenUser = Cookies.get('e-learning')

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

                            const getJadwalKuliahFromUser = respons.filter((e) => e.major === user.major && e.kelas === user.class && e.campus === user.campus && e.semester === user.statusSemester)

                            setJadwalKuliah(getJadwalKuliahFromUser)
                        })
                }
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        setAllAPI();
    }, [])

    const styleWrapp = {
        marginLeft: activeNavmenu ? '230px' : '70px'
    }

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
            <div className="wrapp-jadwal-kuliah" style={styleWrapp}>
                {jadwalKuliah && jadwalKuliah.length > 0 ? jadwalKuliah.map((e, i) => {
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
                                toPage={() => toPage(`/absensi/${e._id}`)}
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
                    <div></div>
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