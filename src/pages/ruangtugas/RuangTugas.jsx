import React, { useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import fileDownload from 'js-file-download';
import { CSVLink } from 'react-csv';
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import jsPDF from 'jspdf';
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
import ExportExcel from '../../components/exportexcel/ExportExcel';
import PopClipboard from '../../components/popclipboard/PopClipboard';

function RuangTugas() {

    const [pathGlobal, setPathGlobal, activeNavmenu, setActiveNavmenu, activeNavCollapse, setActiveNavCollapse, overActiveNavmenu, setOverActiveNavmenu, activeNavmenuDefault, setActiveNavmenuDefault, dataUserForNavbar, setDataUserForNavbar, idxActiveGlobal, setIdxActiveGlobal, headerTable, setHeaderTable, bodyTable, setBodyTable, pathPrintTable, setPathPrintTable, idxOnePrintTable, setIdxOnePrintTable, idxTwoPrintTable, setIdxTwoPrintTable, idxHeadPrintTable, setIdxHeadPrintTable, overActiveNavmenuDefault, setOverActiveNavmenuDefault, activeBodyDesktop, activeIconDrop, setActiveIconDrop, inActiveNavAfterLoadPage] = useContext(PathContext)
    const [listTable, setListTable] = useState([])
    const [dataNilaiTugas, setDataNilaiTugas] = useState([])
    const [loading, setLoading] = useState(false)
    const [pathActive, setPathActive] = useState(0)
    const [filePath, setFilePath] = useState('')
    const [pertemuan, setPertemuan] = useState('')
    const [idDocument, setIdDocument] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState(5)
    const [dataCsv, setDataCsv] = useState([])
    const [newDataCsv, setNewDataCsv] = useState([])
    const [inputSearch, setInputSearch] = useState('')
    const [loadPopClipboard, setLoadPopClipboard] = useState(false)
    const [headersCsv, setHeadersCsv] = useState([
        { label: "No", key: "a" },
        { label: "Kode MTK", key: "b" },
        { label: "Kelas", key: "c" },
        { label: "Judul", key: "d" },
        { label: "Des", key: "e" },
        { label: "Pertemuan", key: "f" },
        { label: "Mulai", key: "g" },
        { label: "Selesai", key: "h" },
        { label: "Created", key: "i" },
        { label: "Aksi", key: "j" },
    ])
    const [headerPdf, setHeaderPdf] = useState([
        { title: "No", key: "a" },
        { title: "Kode MTK", key: "b" },
        { title: "Kelas", key: "c" },
        { title: "Judul", key: "d" },
        { title: "Des", key: "e" },
        { title: "Pertemuan", key: "f" },
        { title: "Mulai", key: "g" },
        { title: "Selesai", key: "h" },
        { title: "Created", key: "i" },
        { title: "Aksi", key: "j" },
    ])
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

    const btnGroupHoverBtn = document.getElementsByClassName('btn-group-hover-button')

    function setAllAPI() {
        setLoading(true)

        API.APIGetDashboard(getTokenUser)
            .then(res => {
                if (res && res.data) {
                    const user = res.data.user.data

                    API.APIGetOneMatkul(getPath[1])
                        .then(res => {
                            setTimeout(() => {
                                setLoading(false)
                            }, 500);
                            const respons = res.data

                            setIdDocument(respons._id)
                            setListTable(respons.ruangTugas)

                            const getNilaiTugasWithUser = respons.dataNilaiTugas.filter((e) => e.name === user.name && e.nim === user.nim)
                            setDataNilaiTugas(getNilaiTugasWithUser)

                            if (respons.ruangTugas.length > 0) {
                                let newArr = []

                                respons.ruangTugas.map((e) => {
                                    setTimeout(() => {
                                        newArr.push({ a: e.number, b: e.kodeMTK, c: e.kelas, d: e.judul, e: e.deskripsi, f: e.pertemuan, g: e.mulai, h: e.selesai, i: e.created, j: e.image })
                                        setTimeout(() => {
                                            setDataCsv(newArr)
                                        }, 0);
                                    }, 0);
                                })
                            }

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
        window.scrollTo(0, 0);
        setTimeout(() => {
            activeBodyDesktop('wrapp-ruang-tugas', 'wrapp-ruang-tugas-active');
            inActiveNavAfterLoadPage();
        }, 0);
        setAllAPI();
        toPageActive(0);
        changeBgColorBtnGroup();
        setPathGlobal(`/ruang-tugas/${getPath[1]}`);
    }, [])

    const styleTools = {
        display: pathActive === 0 ? 'flex' : 'none'
    }

    const styleDataPenugasan = {
        display: pathActive === 0 ? 'flex' : 'none'
    }

    const styleDataNilaiTugas = {
        display: pathActive === 1 ? 'flex' : 'none'
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
        document.body.style.overflowY = 'hidden'
    }

    const apiFirebaseStorage = 'https://firebasestorage.googleapis.com/v0/b/e-learning-rp.appspot.com/o/ilmu-komputer.S1_15.1A.01_semester-1_margonda%2F'

    function unduhFile() {
        axios.get(filePath, { responseType: 'blob' })
            .then(res => {
                closeModal()
                const getNameDocument = filePath.split(apiFirebaseStorage)[1].split('.pdf')[0]
                fileDownload(res.data, `${getNameDocument}.pdf`)
            })
            .catch(err => {
                console.log(err)
                alert('Oops! terjadi kesalahan server.\nMohon coba beberapa saat lagi!')
                closeModal();
            })
    }

    function closeModal() {
        setOnDisplayHoverBtn(false)
        setDisplayCloseModal(false)
        document.body.style.overflowY = 'scroll'
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

    const indexOfLastDataCsv = currentPage * perPage
    const indexOfFirstDataCsv = indexOfLastDataCsv - perPage
    const currentDataCsv = dataCsv.slice(indexOfFirstDataCsv, indexOfLastDataCsv)

    const resultSearch = currentDataCsv.length > 0 ? currentDataCsv.filter((e) => e.b.toLowerCase().includes(inputSearch) || e.c.toLowerCase().includes(inputSearch) || e.d.toLowerCase().includes(inputSearch) || e.e.toLowerCase().includes(inputSearch) || e.f.toLowerCase().includes(inputSearch) || e.g.toLowerCase().includes(inputSearch) || e.h.toLowerCase().includes(inputSearch) || e.i.toLowerCase().includes(inputSearch)) : []

    const dataTablePenugasan = resultSearch.map((e, i) => i === 0 ? `${i + 1} ${e.b} ${e.c} ${e.d} ${e.e} ${e.f} ${e.g} ${e.h} ${e.i} Pilih Unduh Kerjakan` : `\n${i + 1} ${e.b} ${e.c} ${e.d} ${e.e} ${e.f} ${e.g} ${e.h} ${e.i} Pilih Unduh Kerjakan`)

    function copyTxtClipBoard() {
        const txtCopy = `${headTable.map((e, i) => i === 0 ? e.name : ' ' + e.name)} \n\n${dataTablePenugasan}`;

        navigator.clipboard.writeText(txtCopy);
        if (loadPopClipboard === false) {
            setLoadPopClipboard(true)
        }

        setTimeout(() => {
            setLoadPopClipboard(false)
        }, 2000);
    }

    function changeDataCsv() {
        return new Promise((resolve, reject) => {
            let newArr = []

            resultSearch.map((e, i) => {
                setTimeout(() => {
                    newArr.push({ a: i + 1, b: e.b, c: e.c, d: e.d, e: e.e, f: e.f, g: e.g, h: e.h, i: e.i, j: 'Pilih Unduh kerjakan' })
                }, 0)
            })
            setTimeout(() => {
                setNewDataCsv(newArr)
                resolve(newArr)
            }, 0);
        })
    }

    function btnDownloadCsv() {
        changeDataCsv().then(res => {
            document.getElementById('btn-csv-ruang-tugas').click();
            return res;
        })
    }

    function btnDownloadExcel() {
        changeDataCsv().then(res => {
            document.getElementById("button-download-as-xls").click();
            return res;
        })
    }

    let pdfjs = new jsPDF();

    function btnDownloadPdf() {
        changeDataCsv().then(res => {
            pdfjs.autoTable({ html: '#table-export-to-pdf-ruang-tugas' })

            pdfjs.autoTable(headerPdf, res, {
                theme: 'striped'
            })

            pdfjs.save('E-learning.pdf')
        })
    }

    function toPagePrintTable() {
        setHeaderTable(headTable)
        setPathPrintTable(`/ruang-tugas/${getPath[1]}`)
        setIdxOnePrintTable(4)
        setIdxTwoPrintTable(3)
        setIdxHeadPrintTable([{ idx: 4, width: 'calc(96%/2)' }, { idx: 3, width: 'calc(96%/4)' }])

        changeDataCsv().then(res => {
            setBodyTable(res)
            history.push(`/print-table/${getPath[1]}`)
        })
    }

    function btnTools(idx) {
        if (idx === 0) {
            copyTxtClipBoard();
        } else if (idx === 1) {
            btnDownloadCsv();
        } else if (idx === 2) {
            btnDownloadExcel();
        } else if (idx === 3) {
            btnDownloadPdf();
        } else if (idx === 4) {
            toPagePrintTable();
        }
    }

    function changeInput(e) {
        setInputSearch(e.target.value)
    }

    function iconDelInput() {
        setInputSearch('')
    }

    return (
        <>
            <div className="wrapp-ruang-tugas">
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
                        <Tools
                            data={tools}
                            clickBtn={(i) => btnTools(i)}
                            inputSearch={changeInput}
                            displayIconDel={inputSearch.length > 0 ? 'flex' : 'none'}
                            valueSearch={inputSearch}
                            clickIconDel={iconDelInput}
                        />
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

                                {resultSearch && resultSearch.length > 0 ? resultSearch.map((e, idx) => {

                                    const objListAbsen = Object.entries(e)

                                    return (
                                        <>
                                            <div key={e._id} className="column-list-ruang-tugas"
                                                style={{
                                                    backgroundColor: idx % 2 === 0 ? '#fff' : '#f5f7fb'
                                                }}
                                            >
                                                <ListTable
                                                    contentList={idx + 1}
                                                />
                                                {objListAbsen.map((e, i) => {

                                                    const paddingBoxList = e[0].toLowerCase() === 'f' ? '5px 10px' : '0'

                                                    const bgColorBoxList = e[0].toLowerCase() === 'f' ? '#1a538e' : 'transparent'

                                                    const colorBtnList = e[0].toLowerCase() === 'f' ? '#fff' : '#333'

                                                    return (
                                                        <>
                                                            <ListTable
                                                                widthWrapp={i === 4 ? 'calc(96%/2)' : 'calc(96%/7)' && i === 3 ? 'calc(96%/4)' : 'calc(96%/7)'}
                                                                paddingBtnList={paddingBoxList}
                                                                bgColorBtnList={bgColorBoxList}
                                                                colorBtnList={colorBtnList}
                                                                contentList={e[0] === 'j' ? '' : e[1]}
                                                                displayWrapp={e[0] === 'j' ? 'none' : 'flex' && e[0] === 'a' ? 'none' : 'flex'}
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
                                                    clickBtn={() => clickBtnPilih(idx, e.j, e.f)}
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

                                    const obj = Object.entries(e.dataTugas)
                                    return (
                                        <>
                                            <div className="column-list-data-nilai-tugas" key={e._id}
                                                style={{
                                                    backgroundColor: idx % 2 === 0 ? '#fff' : '#f5f7fb'
                                                }}
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
                            fromNumber={resultSearch.length > 0 ? resultSearch.length - resultSearch.length + 1 : '0'}
                            toNumber={resultSearch.length > 0 ? resultSearch.length : '0'}
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

                <div className="container-csv-ruang-tugas">
                    <CSVLink
                        filename='E-Learning.csv'
                        headers={headersCsv}
                        data={newDataCsv}
                        id="btn-csv-ruang-tugas">
                        Download me
                    </CSVLink>
                </div>

                <div className="container-excel-ruang-tugas">
                    <ReactHTMLTableToExcel
                        table="table-to-xls"
                        filename="E-learning"
                        sheet="Data Tugas"
                        buttonText="EXPORT"
                    />
                </div>

                <ExportExcel displayTable="none" head={headTable} column={newDataCsv} />

                <table id="table-export-to-pdf-ruang-tugas"></table>

                <PopClipboard
                    displayWrapp={loadPopClipboard ? 'flex' : 'none'}
                    total={resultSearch.length}
                />

                <Loading displayWrapp={loading ? 'flex' : 'none'} />
            </div>
        </>
    )
}

export default RuangTugas;