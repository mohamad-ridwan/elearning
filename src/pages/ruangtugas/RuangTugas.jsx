import React, { useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import fileDownload from 'js-file-download';
import './RuangTugas.scss'
import Button from '../../components/button/Button';
import Tools from '../../components/tools/Tools';
import HeadTable from '../../components/headtable/HeadTable';
import ListTable from '../../components/listtable/ListTable';
import { PathContext } from '../../services/context/path';
import HoverButton from '../../components/hoverbutton/HoverButton';
import Pagination from '../../components/pagination/Pagination';
import API from '../../services/api';
import Loading from '../../components/loading/Loading';
import endpoint from '../../services/api/endpoint';

function RuangTugas() {

    const [pathGlobal, setPathGlobal, activeNavmenu, setActiveNavmenu] = useContext(PathContext)
    const [listTable, setListTable] = useState([])
    const [dataNilaiTugas, setDataNilaiTugas] = useState([])
    const [loading, setLoading] = useState(false)
    const [pathActive, setPathActive] = useState(0)
    const [filePath, setFilePath] = useState('')
    const [pertemuan, setPertemuan] = useState('')
    const [idDocument, setIdDocument] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState(5)
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
        },
        {
            name: 'JUDUL',
        },
        {
            name: 'DES',
        },
        {
            name: 'PERTEMUAN',
        },
        {
            name: 'MULAI',
        },
        {
            name: 'SELESAI',
        },
        {
            name: 'CREATED',
        },
        {
            name: 'AKSI',
        },
    ])
    const [headTableDataNilaiTugas, setHeadTableDataNilaiTugas] = useState([
        {
            name: 'NO'
        },
        {
            name: 'KODE MTK'
        },
        {
            name: 'JUDUL'
        },
        {
            name: 'LINK TUGAS'
        },
        {
            name: 'KOMENTAR DOSEN'
        },
        {
            name: 'NILAI'
        },
        {
            name: 'CREATED'
        },
        {
            name: 'UPDATED'
        }
    ])
    const [buttonPath, setButtonPath] = useState([
        {
            name: 'Data Penugasan',
            icon: 'fas fa-list-ul'
        },
        {
            name: 'Data Nilai Tugas',
            icon: 'fas fa-chart-line'
        }
    ])
    const [onDisplayHoverBtn, setOnDisplayHoverBtn] = useState(false)
    const [positionLeft, setPositionLeft] = useState('')
    const [positionTop, setPositionTop] = useState('')
    const [displayCloseModal, setDisplayCloseModal] = useState(false)

    const path = window.location.pathname
    const getPath = path.split('/ruang-tugas/')

    const getTokenUser = Cookies.get('e-learning')

    const history = useHistory();

    const elPaginate = document.getElementsByClassName('paginate-data-penugasan')

    const styleWrapp = {
        marginLeft: activeNavmenu ? '230px' : '70px'
    }

    const btnGroupHoverBtn = document.getElementsByClassName('btn-group-hover-button')

    function setAllAPI() {
        setLoading(true)

        API.APIGetDashboard(getTokenUser)
            .then(res => {
                if (res && res.data) {
                    const user = res.data.user.data

                    API.APIGetOneMatkul(getPath[1])
                        .then(res => {
                            const respons = res.data
                            setLoading(false)

                            setIdDocument(respons._id)
                            setListTable(respons.ruangTugas)

                            const getNilaiTugasWithUser = respons.dataNilaiTugas.filter((e) => e.name === user.name && e.nim === user.nim)
                            setDataNilaiTugas(getNilaiTugasWithUser)

                            setTimeout(() => {
                                if (elPaginate.length > 0) {
                                    mouseLeavePaginate();
                                }
                            }, 0);
                        })
                        .catch(err => console.log(err))
                } else {
                    history.push('/login')
                    document.cookie = 'e-learning='
                }
            })
            .catch(err => console.log(err))
    }

    function changeBgColorBtnGroup() {
        if (btnGroupHoverBtn.length > 0) {
            btnGroupHoverBtn[2].style.backgroundColor = '#1a538e'
            btnGroupHoverBtn[2].style.padding = '4px 0px'
            btnGroupHoverBtn[2].style.width = '50px'
            btnGroupHoverBtn[2].style.marginBottom = '4px'

            btnGroupHoverBtn[3].style.backgroundColor = '#1a8e5f'
            btnGroupHoverBtn[3].style.padding = '7px 12px'
        }
    }

    const btnPageRuangTugas = document.getElementsByClassName('wrapp-button-card')
    const iconRuangTugas = document.getElementsByClassName('icon-ruang-tugas')

    function toPageActive(idx) {
        for (let i = 0; i < btnPageRuangTugas.length; i++) {
            btnPageRuangTugas[i].style.border = 'none'
            btnPageRuangTugas[i].style.color = '#333'
            iconRuangTugas[i].style.color = '#333'
        }

        btnPageRuangTugas[idx].style.borderTop = '2px solid #1a8e5f'
        btnPageRuangTugas[idx].style.borderLeft = '1px solid #dee5f1'
        btnPageRuangTugas[idx].style.borderRight = '1px solid #dee5f1'
        btnPageRuangTugas[idx].style.borderBottom = '1px solid #fff'
        btnPageRuangTugas[idx].style.color = '#1a8e5f'
        iconRuangTugas[idx].style.color = '#1a8e5f'

        setPathActive(idx)
    }

    useEffect(() => {
        setAllAPI();
        toPageActive(0);
        changeBgColorBtnGroup();
    }, [])

    const indexOfLastData = currentPage * perPage
    const indexOfFirstData = indexOfLastData - perPage
    const currentData = listTable.slice(indexOfFirstData, indexOfLastData)

    const styleTools = {
        display: pathActive === 0 ? 'flex' : 'none'
    }

    const styleDataPenugasan = {
        display: pathActive === 0 ? 'flex' : 'none'
    }

    const styleDataNilaiTugas = {
        display: pathActive === 1 ? 'flex' : 'none'
    }

    const columnList = document.getElementsByClassName('column-list-ruang-tugas')

    function mouseOverColumnList(idx) {
        if (idx % 2 === 0) {
            columnList[idx].classList.toggle('column-list-ruang-tugas-active')
        }
    }

    function mouseLeaveColumnList(idx) {
        if (idx % 2 === 0) {
            columnList[idx].classList.toggle('column-list-ruang-tugas-active')
        }
    }

    const btnListTable = document.getElementsByClassName('pilih')

    function clickBtnPilih(idx, file, numPertemuan) {
        const getPositionBtn = btnListTable[idx].getBoundingClientRect()
        const roundValueLeft = Math.floor(getPositionBtn.left)
        const roundValueTop = Math.floor(getPositionBtn.top)

        setPositionLeft(`${roundValueLeft - 80}px`)
        setPositionTop(`${roundValueTop + 35}px`)
        setOnDisplayHoverBtn(true)
        setDisplayCloseModal(true)

        setFilePath(file)
        setPertemuan(numPertemuan)
    }

    function unduhFile() {
        axios.get(`${endpoint}/${filePath}`, { responseType: 'blob' })
            .then(res => {
                closeModal();
                fileDownload(res.data, filePath)
            })
            .catch(err => console.log(err))
    }

    function closeModal() {
        setOnDisplayHoverBtn(false)
        setDisplayCloseModal(false)
    }

    const hoverBlack = document.getElementsByClassName('hover-black')

    function hoverModalRuangTugas(idx) {
        hoverBlack[idx].style.opacity = '0.2'
    }

    function leaveModalRuangTugas(idx) {
        hoverBlack[idx].style.opacity = '0'
    }

    function mouseOverBtnPage(idx) {
        for (let i = 0; i < btnPageRuangTugas.length; i++) {
            btnPageRuangTugas[i].style.color = '#333'
            iconRuangTugas[i].style.color = '#333'
        }

        btnPageRuangTugas[idx].style.color = '#1a8e5f'
        iconRuangTugas[idx].style.color = '#1a8e5f'
        btnPageRuangTugas[pathActive].style.color = '#1a8e5f'
        iconRuangTugas[pathActive].style.color = '#1a8e5f'
    }

    function mouseLeaveBtnPage() {
        for (let i = 0; i < btnPageRuangTugas.length; i++) {
            btnPageRuangTugas[i].style.color = '#333'
            iconRuangTugas[i].style.color = '#333'
        }

        btnPageRuangTugas[pathActive].style.color = '#1a8e5f'
        iconRuangTugas[pathActive].style.color = '#1a8e5f'
    }

    const columnDataNilaiTugas = document.getElementsByClassName('column-list-data-nilai-tugas')

    function mouseOverColumnNilai(idx) {
        if (idx % 2 === 0) {
            columnDataNilaiTugas[idx].classList.toggle('column-list-data-nilai-tugas-active')
        }
    }

    function mouseLeaveColumnNilai(idx) {
        if (idx % 2 === 0) {
            columnDataNilaiTugas[idx].classList.toggle('column-list-data-nilai-tugas-active')
        }
    }

    const elementBtnPilih = document.getElementsByClassName('btn-pilih-active')

    function mouseOverBtnPilih(idx) {
        elementBtnPilih[idx].style.opacity = '0.2'
    }

    function mouseLeaveBtnPilih(idx) {
        elementBtnPilih[idx].style.opacity = '0'
    }

    function toPageUploadTugas() {
        closeModal();
        history.push(`/ruang-tugas/send/${idDocument}/${pertemuan}`)
    }

    function viewPageLinkTugas(idx, link) {
        if (idx === 3) {
            window.open(link)
        }
    }

    const btnLinkTugas = document.getElementsByClassName('btn-link-tugas')

    function mouseOverLinkTugas(idx, i) {
        if (i === 3) btnLinkTugas[idx].style.color = '#1a538e'
    }

    function mouseLeaveLinkTugas(idx, i) {
        if (i === 3) btnLinkTugas[idx].style.color = '#333'
    }

    function mouseEnterPaginate(i) {
        for (let idx = 0; idx < elPaginate.length; idx++) {
            elPaginate[idx].style.backgroundColor = '#fff'
            elPaginate[idx].style.color = '#333'
        }

        elPaginate[i].style.backgroundColor = '#1a8e5f'
        elPaginate[i].style.color = '#fff'
        elPaginate[currentPage - 1].style.backgroundColor = '#1a8e5f'
        elPaginate[currentPage - 1].style.color = '#fff'
    }

    function mouseLeavePaginate() {
        for (let idx = 0; idx < elPaginate.length; idx++) {
            elPaginate[idx].style.backgroundColor = '#fff'
            elPaginate[idx].style.color = '#333'
        }

        elPaginate[currentPage - 1].style.backgroundColor = '#1a8e5f'
        elPaginate[currentPage - 1].style.color = '#fff'
    }

    function paginate(number) {
        setCurrentPage(number)
        for (let idx = 0; idx < elPaginate.length; idx++) {
            elPaginate[idx].style.backgroundColor = '#fff'
            elPaginate[idx].style.color = '#333'
        }

        elPaginate[number - 1].style.backgroundColor = '#1a8e5f'
        elPaginate[number - 1].style.color = '#fff'
    }

    const theadDataPenugasan = document.getElementsByClassName('thead-data-penugasan')
    const theadDataNilaiTugas = document.getElementsByClassName('thead-data-nilai-tugas')

    setTimeout(() => {
        if (theadDataPenugasan.length > 0) {
            theadDataPenugasan[3].style.width = 'calc(96%/4)'
        }
        if (theadDataNilaiTugas.length > 0) {
            theadDataNilaiTugas[4].style.width = 'calc(96%/4)'
        }
    }, 0);

    return (
        <>
            <div className="wrapp-ruang-tugas" style={styleWrapp}>
                <div className="column-atas-ruang-tugas">
                    <div className="column-btn-page-ruang-tugas">
                        {buttonPath.map((e, i) => {
                            return (
                                <>
                                    <Button
                                        key={i}
                                        paddingBtn="5px 20px"
                                        nameBtn={e.name}
                                        bdrRadius="0"
                                        classIcon="icon-ruang-tugas"
                                        bgColor="transparent"
                                        colorBtn="#333"
                                        displayHoverBlackBtn="none"
                                        marginBtn="0 0 -1px 0"
                                        icon={e.icon}
                                        displayIcon="flex"
                                        transitionWrapp="none"
                                        mouseOver={() => mouseOverBtnPage(i)}
                                        mouseleave={mouseLeaveBtnPage}
                                        click={() => toPageActive(i)}
                                    />
                                </>
                            )
                        })}
                    </div>

                    <div className="column-tools-ruang-tugas" style={styleTools}>
                        <Tools data={tools} />
                    </div>
                </div>

                <div className="column-bawah-ruang-tugas">
                    <div className="column-data-penugasan" style={styleDataPenugasan}>
                        <div className="container-scroll-ruang-tugas">
                            <tbody className="body-ruang-tugas">
                                <HeadTable
                                    data={headTable}
                                    widthTh="calc(96%/7)"
                                    widhtCustom="calc(96%/2)"
                                    classNameTh="thead-data-penugasan"
                                    number={4}
                                />

                                {currentData && currentData.length > 0 ? currentData.map((e, idx) => {

                                    setTimeout(() => {
                                        if (columnList.length > 0) {
                                            if (idx % 2 === 0) {
                                                columnList[idx].classList.add('column-list-ruang-tugas-active')
                                            }
                                        }
                                    }, 0);

                                    const objListAbsen = Object.entries(e)

                                    return (
                                        <>
                                            <div key={e._id} className="column-list-ruang-tugas"
                                                onMouseEnter={() => mouseOverColumnList(idx)}
                                                onMouseLeave={() => mouseLeaveColumnList(idx)}
                                            >
                                                {objListAbsen.map((e, i) => {

                                                    const paddingBoxList = e[0].toLowerCase() === 'pertemuan' ? '5px 10px' : '0'

                                                    const bgColorBoxList = e[0].toLowerCase() === 'pertemuan' ? '#1a538e' : 'transparent'

                                                    const colorBtnList = e[0].toLowerCase() === 'pertemuan' ? '#fff' : '#333'

                                                    return (
                                                        <>
                                                            <ListTable
                                                                widthWrapp={i === 4 ? 'calc(96%/2)' : 'calc(96%/7)' && i === 3 ? 'calc(96%/4)' : 'calc(96%/7)'}
                                                                paddingBtnList={paddingBoxList}
                                                                bgColorBtnList={bgColorBoxList}
                                                                colorBtnList={colorBtnList}
                                                                contentList={e[0] === 'image' ? '' : e[1]}
                                                                displayWrapp={e[0] === 'image' ? 'none' : 'flex'}
                                                                cursorBtnList="text"
                                                            />
                                                        </>
                                                    )
                                                })}

                                                <ListTable
                                                    widthWrapp="calc(96%/7)"
                                                    paddingBtnList="5px 10px"
                                                    bgColorBtnList="#1a538e"
                                                    colorBtnList="#fff"
                                                    cursorBtnList="pointer"
                                                    icon="fas fa-sort-down"
                                                    displayIcon="flex"
                                                    contentList="Pilih"
                                                    classBtn="pilih"
                                                    classTableActive="btn-pilih-active"
                                                    clickBtn={() => clickBtnPilih(idx, e.image, e.pertemuan)}
                                                    mouseEnterBtn={() => mouseOverBtnPilih(idx)}
                                                    mouseLeaveBtn={() => mouseLeaveBtnPilih(idx)}
                                                />
                                            </div>
                                        </>
                                    )
                                }) : (
                                    <p className="no-data-available-ruang-tugas">
                                        No data available in table
                                    </p>
                                )}
                            </tbody>
                        </div>
                    </div>

                    <div className="column-data-nilai-tugas" style={styleDataNilaiTugas}>
                        <div className="container-scroll-data-nilai-tugas">
                            <tbody className="body-data-nilai-tugas">
                                <HeadTable
                                    data={headTableDataNilaiTugas}
                                    widhtCustom="calc(96%/1)"
                                    widthTh="calc(96%/7)"
                                    number={3}
                                    displayIcon="none"
                                    classNameTh="thead-data-nilai-tugas"
                                    cursor="text"
                                />

                                {dataNilaiTugas && dataNilaiTugas.length > 0 ? dataNilaiTugas.map((e, idx) => {

                                    setTimeout(() => {
                                        if (columnDataNilaiTugas.length > 0) {
                                            if (idx % 2 === 0) {
                                                columnDataNilaiTugas[idx].classList.add('column-list-data-nilai-tugas-active')
                                            }
                                        }
                                    }, 0);

                                    const obj = Object.entries(e.dataTugas)
                                    return (
                                        <>
                                            <div className="column-list-data-nilai-tugas" key={e._id}
                                                onMouseEnter={() => mouseOverColumnNilai(idx)}
                                                onMouseLeave={() => mouseLeaveColumnNilai(idx)}
                                            >
                                                {obj.map((e, i) => {
                                                    return (
                                                        <>
                                                            <ListTable
                                                                widthWrapp={i === 3 ? 'calc(96%/1)' : 'calc(96%/7)' && i === 4 ? 'calc(96%/4)' : 'calc(96%/7)'}
                                                                contentList={e[1]}
                                                                cursorBtnList={i === 3 ? 'pointer' : 'text'}
                                                                classBtn={i === 3 ? 'btn-link-tugas' : undefined}
                                                                fontSizeBtnList={i === 5 ? '16px' : '12px'}
                                                                fontWeightBtnList={i === 5 ? '600' : '400'}
                                                                mouseEnterBtn={() => mouseOverLinkTugas(idx, i)}
                                                                mouseLeaveBtn={() => mouseLeaveLinkTugas(idx, i)}
                                                                clickBtn={() => viewPageLinkTugas(i, e[1])}
                                                            />
                                                        </>
                                                    )
                                                })}
                                            </div>
                                        </>
                                    )
                                }) : (
                                    <p className="no-data-available-data-nilai-tugas">
                                        No data available in table
                                    </p>
                                )}
                            </tbody>
                        </div>
                    </div>

                    <div className="container-pagination-ruang-tugas" style={styleDataPenugasan}>
                        <Pagination
                            classPaginate="paginate-data-penugasan"
                            perPage={perPage}
                            totalData={listTable.length}
                            paginate={paginate}
                            mouseEnter={mouseEnterPaginate}
                            mouseLeave={mouseLeavePaginate}
                            fromNumber={currentData.length > 0 ? currentData[0].number : '0'}
                            toNumber={currentData.length > 0 ? currentData[currentData.length - 1].number : '0'}
                            lengthData={listTable.length}
                        />
                    </div>
                </div>

                <HoverButton
                    displayWrapp={onDisplayHoverBtn ? 'flex' : 'none'}
                    displayCloseModal={displayCloseModal ? 'flex' : 'none'}
                    displayBtnGroup="flex"
                    topWrapp={positionTop}
                    leftWrapp={positionLeft}
                    colorNameHover="#fff"
                    fontSizeNameHover="10px"
                    colorBtnGroup="#fff"
                    fontSizeBtnGroup="12px"
                    justifyBtnGroup="center"
                    bdrRadiusBtnGroup="3px"
                    bgColorWrapp="#fff"
                    paddingWrapp="10px 0px"
                    bdrRadiusWrapp="0px 0px 5px 5px"
                    shadowWrapp="20px 20px 20px -1px rgba(0,0,0,0.3)"
                    marginBtnGroup="0 40px"
                    alignWrapp="center"
                    displayLine="flex"
                    nameBtn1="Unduh"
                    nameBtn2="Kerjakan"
                    mouseOverBtn1={() => hoverModalRuangTugas(2)}
                    mouseLeaveBtn1={() => leaveModalRuangTugas(2)}
                    mouseOverBtn2={() => hoverModalRuangTugas(3)}
                    mouseLeaveBtn2={() => leaveModalRuangTugas(3)}
                    click1={unduhFile}
                    click2={toPageUploadTugas}
                    closeModal={closeModal}
                />

                <Loading displayWrapp={loading ? 'flex' : 'none'} />
            </div>
        </>
    )
}

export default RuangTugas;