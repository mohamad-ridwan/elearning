import React, { useState, useContext, useEffect } from 'react';
import './RuangTugas.scss'
import Button from '../../components/button/Button';
import Tools from '../../components/tools/Tools';
import HeadTable from '../../components/headtable/HeadTable';
import ListTable from '../../components/listtable/ListTable';
import { PathContext } from '../../services/context/path';
import HoverButton from '../../components/hoverbutton/HoverButton';
import Pagination from '../../components/pagination/Pagination';

function RuangTugas() {

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
    const [listTable, setListTable] = useState([
        {
            kodeMtk: '896',
            kelas: '15.2A.01',
            judul: 'Tugas Fungsi',
            des: 'Selidiki jenis fungsi atau bukan, fungsi satu ke yang lainnya',
            pertemuan: '2',
            mulai: '2021-03-23 07:30:00',
            selesai: '2021-03-23 23:59:59',
            created: '2021-03-23 07:17:19',
            unduhTugas: 'http://blank',
            linkTugas: 'http://tugas',
            path: '123',
        },
        {
            kodeMtk: '896',
            kelas: '15.2A.01',
            judul: 'Induksi Matematika',
            des: 'Kerjakan secara berkelompok',
            pertemuan: '3',
            mulai: '2021-03-30 07:30:00',
            selesai: '2021-04-03 21:40:00',
            created: '2021-03-29 21:37:20',
            unduhTugas: 'http://blank',
            linkTugas: 'http://tugas',
            path: '123',
        },
        {
            kodeMtk: '896',
            kelas: '15.2A.01',
            judul: 'Latihan Coding',
            des: 'Gunakan Visual Studio Code',
            pertemuan: '5',
            mulai: '2021-04-05 07:30:00',
            selesai: '2021-04-10 21:40:00',
            created: '2021-04-01 02:00:20',
            unduhTugas: 'http://blank',
            linkTugas: 'http://tugas',
            path: '123',
        },
    ])
    const [pathActive, setPathActive] = useState(0)
    const [buttonPath, setButtonPath] = useState([
        {
            name: 'Data Penugasan',
            icon: ''
        },
        {
            name: 'Data Nilai Tugas',
            icon: ''
        }
    ])
    const [onDisplayHoverBtn, setOnDisplayHoverBtn] = useState(false)
    const [positionLeft, setPositionLeft] = useState('')
    const [positionTop, setPositionTop] = useState('')
    const [displayCloseModal, setDisplayCloseModal] = useState(false)
    const [idxClickBtnPilih, setIdxClickBtnPilih] = useState()

    const styleWrapp = {
        marginLeft: activeNavmenu ? '230px' : '70px'
    }

    const btnGroupHoverBtn = document.getElementsByClassName('btn-group-hover-button')

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

    function toPageActive(idx) {
        for (let i = 0; i < btnPageRuangTugas.length; i++) {
            btnPageRuangTugas[i].style.border = 'none'
        }

        btnPageRuangTugas[idx].style.borderTop = '2px solid #1a8e5f'
        btnPageRuangTugas[idx].style.borderLeft = '1px solid #dee5f1'
        btnPageRuangTugas[idx].style.borderRight = '1px solid #dee5f1'
        btnPageRuangTugas[idx].style.borderBottom = '1px solid #fff'
        btnPageRuangTugas[idx].style.color = '#1a8e5f'

        setPathActive(idx)
    }

    useEffect(() => {
        toPageActive(0);
        changeBgColorBtnGroup();
    }, [])

    const styleTools = {
        display: pathActive === 0 ? 'flex' : 'none'
    }

    const styleDataPenugasan = {
        display: pathActive === 0 ? 'flex' : 'none'
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

    function clickBtnPilih(idx) {
        // idxBtnPilih untuk index yang di tentukan saat user mengklik unduh / kerjakan tugas
        setIdxClickBtnPilih(idx)

        const getPositionBtn = btnListTable[idx].getBoundingClientRect()
        const roundValueLeft = Math.floor(getPositionBtn.left)
        const roundValueTop = Math.floor(getPositionBtn.top)

        setPositionLeft(`${roundValueLeft - 80}px`)
        setPositionTop(`${roundValueTop + 35}px`)
        setOnDisplayHoverBtn(true)
        setDisplayCloseModal(true)
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
        }

        btnPageRuangTugas[idx].style.color = '#1a8e5f'
        btnPageRuangTugas[pathActive].style.color = '#1a8e5f'
    }

    function mouseLeaveBtnPage() {
        for (let i = 0; i < btnPageRuangTugas.length; i++) {
            btnPageRuangTugas[i].style.color = '#333'
        }

        btnPageRuangTugas[pathActive].style.color = '#1a8e5f'
    }

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
                                        bgColor="transparent"
                                        colorBtn="#333"
                                        displayHoverBlackBtn="none"
                                        marginBtn="0 0 -1px 0"
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

                <div className="column-bawah-ruang-tugas" style={styleDataPenugasan}>
                    <div className="container-scroll-ruang-tugas">
                        <tbody className="body-ruang-tugas">
                            <HeadTable
                                data={headTable}
                                widthTh="calc(96%/7)"
                            />

                            {listTable && listTable.length > 0 ? listTable.map((e, idx) => {

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
                                        <div className="column-list-ruang-tugas"
                                            onMouseEnter={() => mouseOverColumnList(idx)}
                                            onMouseLeave={() => mouseLeaveColumnList(idx)}
                                        >
                                            <ListTable
                                                widthWrapp="calc(96%/7)"
                                                contentList={idx + 1} />

                                            {objListAbsen.map((e) => {

                                                const nonDisplay = e[0].toLowerCase() !== 'unduhtugas' && e[0].toLowerCase() !== 'linktugas' && e[0].toLowerCase() !== 'path' ? 'flex' : 'none'

                                                const paddingBoxList = e[0].toLowerCase() === 'pertemuan' ? '5px 10px' : '0'

                                                const bgColorBoxList = e[0].toLowerCase() === 'pertemuan' ? '#1a538e' : 'transparent'

                                                const colorBtnList = e[0].toLowerCase() === 'pertemuan' ? '#fff' : '#333'

                                                return (
                                                    <>
                                                        <ListTable
                                                            widthWrapp="calc(96%/7)"
                                                            paddingBtnList={paddingBoxList}
                                                            bgColorBtnList={bgColorBoxList}
                                                            colorBtnList={colorBtnList}
                                                            displayWrapp={nonDisplay}
                                                            contentList={e[1]} />
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
                                                clickBtn={() => clickBtnPilih(idx)}
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

                <div className="container-pagination-ruang-tugas">
                    <Pagination />
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
                    closeModal={closeModal}
                />
            </div>
        </>
    )
}

export default RuangTugas;