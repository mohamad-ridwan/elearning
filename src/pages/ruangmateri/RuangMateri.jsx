import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import Cookies from 'js-cookie';
import './RuangMateri.scss'
import Tools from '../../components/tools/Tools';
import { PathContext } from '../../services/context/path';
import HeadTable from '../../components/headtable/HeadTable';
import Button from '../../components/button/Button';
import Pagination from '../../components/pagination/Pagination';
import CardJadwal from '../../components/cardjadwal/CardJadwal';
import API from '../../services/api';

function RuangMateri() {

    const [pathGlobal, setPathGlobal, activeNavmenu, setActiveNavmenu] = useContext(PathContext)
    const [tools, setTools] = useState([
        {
            name: 'Copy'
        },
        {
            name: 'CSV'
        },
        {
            name: 'Excel'
        },
        {
            name: 'PDF'
        },
        {
            name: 'Print'
        }
    ])
    const [headTable, setHeadTable] = useState([
        {
            name: 'NO',
        },
        {
            name: 'KODE MTK',
        },
        {
            name: 'KELAS',
        }, {
            name: 'JUDUL',
        },
        {
            name: 'DESKRIPSI',
        },
        {
            name: 'FILE',
        },
        {
            name: 'UPDATE',
        }
    ])
    const [listMateri, setListMateri] = useState([])
    const [slidePembelajaran, setSlidePembelajaran] = useState([
        {
            nameFile: 'Silabus',
            path: 'http://localhost:3000'
        },
        {
            nameFile: 'Cikuang',
            path: 'http://localhost:3000'
        },
        {
            nameFile: 'Jaman Purba',
            path: 'http://localhost:3000'
        },
        {
            nameFile: 'Jaman Purba',
            path: 'http://localhost:3000'
        }
    ])
    const [pathActive, setPathActive] = useState(0)
    const [buttonPath, setButtonPath] = useState([
        {
            name: 'Materi Tambahan',
            icon: 'fas fa-folder-plus'
        },
        {
            name: 'Video Pembelajaran',
            icon: 'fas fa-video'
        },
        {
            name: 'Slide Pembelajaran',
            icon: 'fas fa-cloud-download-alt'
        }
    ])

    const getTokenUser = Cookies.get('e-learning')

    const history = useHistory()

    const btnPageMateri = document.getElementsByClassName('btn-page-materi')
    const iconRuangMateri = document.getElementsByClassName('icon-ruang-materi')

    function setAllAPI() {
        API.APIGetDashboard(getTokenUser)
            .then(res => {
                if (res && res.data) {
                    return res;
                } else {
                    history.push('/login')
                    document.cookie = 'e-learning='
                }
            })
            .catch(err => console.log(err))
    }

    function toPageActive(idx) {
        for (let i = 0; i < btnPageMateri.length; i++) {
            btnPageMateri[i].style.border = 'none'
        }

        btnPageMateri[idx].style.borderTop = '2px solid #1a8e5f'
        btnPageMateri[idx].style.borderLeft = '1px solid #dee5f1'
        btnPageMateri[idx].style.borderRight = '1px solid #dee5f1'
        btnPageMateri[idx].style.borderBottom = '1px solid #fff'
        btnPageMateri[idx].style.color = '#1a8e5f'
        iconRuangMateri[idx].style.color = '#1a8e5f'

        setPathActive(idx)
    }

    useEffect(() => {
        setAllAPI();
        toPageActive(0);
        window.scrollTo(0, 0)
    }, [])

    const styleWrapp = {
        marginLeft: activeNavmenu ? '230px' : '70px'
    }

    const styleTbody = {
        borderRight: listMateri.length === 0 ? '1px solid #dee5f1' : '0',
        borderBottom: listMateri.length === 0 ? '1px solid #dee5f1' : '0'
    }

    const styleMateriTambahan = {
        display: pathActive === 0 ? 'flex' : 'none'
    }

    const styleTools = {
        display: pathActive === 0 ? 'flex' : 'none'
    }

    const styleSlidePembelajaran = {
        display: pathActive === 2 ? 'flex' : 'none'
    }

    const styleContainerPagination = {
        display: pathActive === 0 ? 'flex' : 'none'
    }

    const hoverBlackBtn = document.getElementsByClassName('btn-download-pembelajaran')

    function mouseOverBtnDownload(idx) {
        hoverBlackBtn[idx].style.opacity = '0.2'
    }

    function mouseLeaveBtnDownload(idx) {
        hoverBlackBtn[idx].style.opacity = '0'
    }

    function mouseOverBtnPage(idx) {
        for (let i = 0; i < btnPageMateri.length; i++) {
            btnPageMateri[i].style.color = '#333'
            iconRuangMateri[i].style.color = '#333'
        }

        btnPageMateri[idx].style.color = '#1a8e5f'
        iconRuangMateri[idx].style.color = '#1a8e5f'
        btnPageMateri[pathActive].style.color = '#1a8e5f'
        iconRuangMateri[pathActive].style.color = '#1a8e5f'
    }

    function mouseLeaveBtnPage() {
        for (let i = 0; i < btnPageMateri.length; i++) {
            btnPageMateri[i].style.color = '#333'
            iconRuangMateri[i].style.color = '#333'
        }

        btnPageMateri[pathActive].style.color = '#1a8e5f'
        iconRuangMateri[pathActive].style.color = '#1a8e5f'
    }

    return (
        <>
            <div className="wrapp-ruang-materi" style={styleWrapp}>
                <div className="column-atas-ruang-materi">
                    <div className="column-btn-page-materi">
                        {buttonPath.map((e, i) => {
                            return (
                                <>
                                    <Button
                                        key={i}
                                        paddingBtn="5px 20px"
                                        nameBtn={e.name}
                                        icon={e.icon}
                                        displayIcon="flex"
                                        bdrRadius="0"
                                        displayHoverBlackBtn="none"
                                        classIcon="icon-ruang-materi"
                                        bgColor="transparent"
                                        colorBtn="#333"
                                        marginBtn="0 0 -1px 0"
                                        classWrapp="btn-page-materi"
                                        transitionWrapp="none"
                                        mouseOver={() => mouseOverBtnPage(i)}
                                        mouseleave={mouseLeaveBtnPage}
                                        click={() => toPageActive(i)}
                                    />
                                </>
                            )
                        })}
                    </div>

                    <div className="container-tools-ruang-materi" style={styleTools}>
                        <p className="title-ruang-materi">
                            MATEMATIKA DISKRIT - 896
                        </p>

                        <div className="column-tools-ruang-materi">
                            <Tools data={tools} />
                        </div>
                    </div>
                </div>

                <div className="column-bawah-ruang-materi" style={styleMateriTambahan}>
                    <div className="container-scroll-ruang-materi">
                        <tbody className="body-ruang-materi" style={styleTbody}>
                            <HeadTable data={headTable} />

                            {listMateri && listMateri.length > 0 ? listMateri.map((e) => {

                                return (
                                    <>
                                        <div className="column-list-materi">

                                        </div>
                                    </>
                                )
                            }) : (
                                <p className="no-data-available">
                                    No data available in table
                                </p>
                            )}
                        </tbody>
                    </div>
                </div>

                <div className="container-slide-pembelajaran" style={styleSlidePembelajaran}>
                    <div className="line-border-slide">

                    </div>

                    <div className="card-slide-pembelajaran">
                        {slidePembelajaran && slidePembelajaran.length > 0 ? slidePembelajaran.map((e, i) => {

                            return (
                                <>
                                    <CardJadwal
                                        borderWrapp="none"
                                        displayColumnRed="none"
                                        displayColumnWhite="none"
                                        displayCardSlidePembelajaran="flex"
                                        bgColorWrapp="#f4f5fb"
                                        widthWrapp="calc(96%/3)"
                                        nameFile={e.nameFile}
                                        classBtn="btn-download-pembelajaran"
                                        marginWrapp="0 0 20px 0"
                                        mouseOverBtnDownload={() => mouseOverBtnDownload(i)}
                                        mouseLeaveBtnDownload={() => mouseLeaveBtnDownload(i)}
                                    />
                                </>
                            )
                        }) : (
                            <div></div>
                        )}
                    </div>
                </div>

                <div className="container-pagination-ruang-materi" style={styleContainerPagination}>
                    <Pagination />
                </div>
            </div>
        </>
    )
}

export default RuangMateri;