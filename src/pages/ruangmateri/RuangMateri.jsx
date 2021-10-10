import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import Cookies from 'js-cookie';
import axios from 'axios';
import fileDownload from 'js-file-download';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import './RuangMateri.scss'
import Tools from '../../components/tools/Tools';
import { PathContext } from '../../services/context/path';
import HeadTable from '../../components/headtable/HeadTable';
import Button from '../../components/button/Button';
import Pagination from '../../components/pagination/Pagination';
import CardJadwal from '../../components/cardjadwal/CardJadwal';
import API from '../../services/api';
import ListTable from '../../components/listtable/ListTable';
import Loading from '../../components/loading/Loading';
import endpoint from '../../services/api/endpoint';
import ExportExcel from '../../components/exportexcel/ExportExcel';
import PopClipboard from '../../components/popclipboard/PopClipboard';

function RuangMateri() {

    const [pathGlobal, setPathGlobal, activeNavmenu, setActiveNavmenu, activeNavCollapse, setActiveNavCollapse, overActiveNavmenu, setOverActiveNavmenu, activeNavmenuDefault, setActiveNavmenuDefault, dataUserForNavbar, setDataUserForNavbar, idxActiveGlobal, setIdxActiveGlobal, headerTable, setHeaderTable, bodyTable, setBodyTable, pathPrintTable, setPathPrintTable, idxOnePrintTable, setIdxOnePrintTable, idxTwoPrintTable, setIdxTwoPrintTable, idxHeadPrintTable, setIdxHeadPrintTable, overActiveNavmenuDefault, setOverActiveNavmenuDefault, activeBodyDesktop, activeIconDrop, setActiveIconDrop, inActiveNavAfterLoadPage] = useContext(PathContext)
    const [listMateri, setListMateri] = useState([])
    const [nameMatkul, setNameMatkul] = useState('')
    const [videoPembelajaran, setVideoPembelajaran] = useState([])
    const [slidePembelajaran, setSlidePembelajaran] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState(5)
    const [dataCsv, setDataCsv] = useState([])
    const [inputSearch, setInputSearch] = useState('')
    const [newDataCsv, setNewDataCsv] = useState([])
    const [loadPopClipboard, setLoadPopClipboard] = useState(false)
    const [headersCsv, setHeadersCsv] = useState([
        { label: "NO", key: "a" },
        { label: "Kode MTK", key: "b" },
        { label: "Kelas", key: "c" },
        { label: "Judul", key: "d" },
        { label: "Deskripsi", key: "e" },
        { label: "File", key: "f" },
        { label: "Update", key: "g" }
    ])
    const [headerPdf, setHeaderPdf] = useState([
        { title: "No", key: "a" },
        { title: "Kode MTK", key: "b" },
        { title: "Kelas", key: "c" },
        { title: "Judul", key: "d" },
        { title: "Deskripsi", key: "e" },
        { title: "File", key: "f" },
        { title: "Update", key: "g" }
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

    const path = window.location.pathname
    const getPath = path.split('/ruang-materi/')

    const elPaginate = document.getElementsByClassName('paginate-materi-tambahan')

    function setAllAPI() {
        setLoading(true)

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

        API.APIGetOneMatkul(getPath[1])
            .then(res => {
                setTimeout(() => {
                    setLoading(false)
                }, 500);

                const respons = res.data

                setNameMatkul(`${respons.matakuliah} - ${respons.kodeMTK}`)

                const getMateriTambahan = respons.ruangMateri.filter((e) => e.id === 'materi-tambahan')
                setListMateri(getMateriTambahan[0] && getMateriTambahan[0].data ? getMateriTambahan[0].data : [])

                const getVideoPembelajaran = respons.ruangMateri.filter((e) => e.id === 'video-pembelajaran')
                setVideoPembelajaran(getVideoPembelajaran[0] && getVideoPembelajaran[0].data ? getVideoPembelajaran[0].data : [])

                const getSlidePembelajaran = respons.ruangMateri.filter((e) => e.id === 'slide-pembelajaran')
                setSlidePembelajaran(getSlidePembelajaran[0] && getSlidePembelajaran[0].data ? getSlidePembelajaran[0].data : [])

                if (getMateriTambahan[0] && getMateriTambahan[0].data.length > 0) {
                    let newArr = []

                    getMateriTambahan[0].data.map((e) => {
                        setTimeout(() => {
                            newArr.push({ a: e.number, b: e.kodeMTK, c: e.kelas, d: e.judul, e: e.deskripsi, f: e.image, g: e.update })
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
    }

    function toPageActive(idx) {
        for (let i = 0; i < btnPageMateri.length; i++) {
            btnPageMateri[i].style.border = 'none'
            btnPageMateri[i].style.color = '#333'
            iconRuangMateri[i].style.color = '#333'
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
        window.scrollTo(0, 0)
        setTimeout(() => {
            activeBodyDesktop('wrapp-ruang-materi', 'wrapp-ruang-materi-active');
            inActiveNavAfterLoadPage();
        }, 0);
        setAllAPI();
        toPageActive(0);
        setPathGlobal(`/ruang-materi/${getPath[1]}`);
    }, [])

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

    const styleVideoPembelajaran = {
        display: pathActive === 1 ? 'flex' : 'none'
    }

    const styleContainerPagination = {
        display: pathActive === 0 ? 'flex' : 'none'
    }

    function mouseOverBtnDownload(idx, nameClass) {
        const hoverBlackBtn = document.getElementsByClassName(nameClass)

        hoverBlackBtn[idx].style.opacity = '0.2'
    }

    function mouseLeaveBtnDownload(idx, nameClass) {
        const hoverBlackBtn = document.getElementsByClassName(nameClass)

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

    const btnListTableActive = document.getElementsByClassName('number5-materi-tambahan')

    function mouseOverUnduh(idx, i) {
        if (i === 5) {
            btnListTableActive[idx].style.opacity = '0.2'
        }
    }

    function mouseLeaveUnduh(idx, i) {
        if (i === 5) {
            btnListTableActive[idx].style.opacity = '0'
        }
    }

    function unduhMateriTambahan(file, i) {
        if (i === 5) {
            axios.get(`${endpoint}/${file}`, { responseType: 'blob' })
                .then(res => {
                    fileDownload(res.data, file)
                })
        }
    }

    function downloadSlidePembelajaran(file) {
        axios.get(`${endpoint}/${file}`, { responseType: 'blob' })
            .then(res => {
                fileDownload(res.data, file)
            })
            .catch(err => console.log(err))
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

    const theadMateriTambahan = document.getElementsByClassName('thead-materi-tambahan')

    setTimeout(() => {
        if (theadMateriTambahan.length > 0) {
            theadMateriTambahan[3].style.width = 'calc(96%/4)'
        }
    }, 0);

    const indexOfLastDataCsv = currentPage * perPage
    const indexOfFirstDataCsv = indexOfLastDataCsv - perPage
    const currentDataCsv = dataCsv.slice(indexOfFirstDataCsv, indexOfLastDataCsv)

    const resultSearch = currentDataCsv.length > 0 ? currentDataCsv.filter((e) => e.b.toLowerCase().includes(inputSearch) || e.c.toLowerCase().includes(inputSearch) || e.d.toLowerCase().includes(inputSearch) || e.e.toLowerCase().includes(inputSearch) || e.g.toLowerCase().includes(inputSearch)) : []

    function changeDataCsv() {
        return new Promise((resolve, reject) => {
            let newArr = []

            resultSearch.map((e, i) => {
                setTimeout(() => {
                    newArr.push({ a: i + 1, b: e.b, c: e.c, d: e.d, e: e.e, f: 'Unduh', g: e.g })
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
            document.getElementById('btn-csv-download-ruang-materi').click();
            return res;
        })
    }

    const getDataMateri = resultSearch.map((e, i) => i === 0 ? `${i + 1} ${e.b} ${e.c} ${e.d} ${e.e} Unduh ${e.g}` : `\n${i + 1} ${e.b} ${e.c} ${e.d} ${e.e} Unduh ${e.g}`)

    function copyTxtClipBoard() {
        const txtCopy = `${headTable.map((e, i) => i === 0 ? e.name : ' ' + e.name)} \n\n${getDataMateri}`;

        navigator.clipboard.writeText(txtCopy);
        if (loadPopClipboard === false) {
            setLoadPopClipboard(true)
        }

        setTimeout(() => {
            setLoadPopClipboard(false)
        }, 2000);
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
            pdfjs.autoTable({ html: '#table-export-to-pdf-ruang-materi' })

            pdfjs.autoTable(headerPdf, res, {
                theme: 'striped'
            })

            pdfjs.save('E-learning.pdf')
            return res;
        })
    }

    function toPagePrintTable() {
        setHeaderTable(headTable)
        setPathPrintTable(`/ruang-materi/${getPath[1]}`)
        setIdxOnePrintTable(4)
        setIdxTwoPrintTable(3)
        setIdxHeadPrintTable([{ idx: 4, width: 'calc(96%/2)' }, { idx: 3, width: 'calc(96%/4)' }])

        changeDataCsv().then(res => {
            setBodyTable(res);
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

    function toPageDetailDeskripsi(path) {
        history.push(`/ruang-materi/video-pembelajaran/detail-deskripsi/${path}`)
    }

    return (
        <>
            <div className="wrapp-ruang-materi">
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
                            {nameMatkul}
                        </p>

                        <div className="column-tools-ruang-materi">
                            <Tools
                                data={tools}
                                clickBtn={(i) => btnTools(i)}
                                inputSearch={changeInput}
                                valueSearch={inputSearch}
                                displayIconDel={inputSearch.length > 0 ? 'flex' : 'none'}
                                clickIconDel={iconDelInput}
                            />
                        </div>
                    </div>
                </div>

                <div className="column-bawah-ruang-materi">
                    <div className="container-materi-tambahan" style={styleMateriTambahan}>
                        <div className="container-scroll-ruang-materi">
                            <tbody className="body-ruang-materi" style={styleTbody}>
                                <HeadTable
                                    data={headTable}
                                    widthTh="calc(96%/7)"
                                    widhtCustom="calc(96%/2)"
                                    classNameTh="thead-materi-tambahan"
                                    number={4}
                                />

                                {resultSearch && resultSearch.length > 0 ? resultSearch.map((e, idx) => {

                                    const objListMateri = Object.entries(e)

                                    return (
                                        <>
                                            <div key={e._id} className="column-list-materi"
                                                style={{
                                                    backgroundColor: idx % 2 === 0 ? '#fff' : '#f5f7fb'
                                                }}
                                            >
                                                <ListTable
                                                    contentList={idx + 1}
                                                />
                                                {objListMateri.map((e, i) => {
                                                    return (
                                                        <>
                                                            <ListTable
                                                                key={i}
                                                                widthWrapp={i === 4 ? 'calc(96%/2)' : 'calc(96%/7)' && i === 3 ? 'calc(96%/4)' : 'calc(96%/7)'}
                                                                displayWrapp={i === 0 ? 'none' : 'flex'}
                                                                contentList={i === 5 ? 'Unduh' : e[1]}
                                                                bgColorBtnList={i === 5 ? '#1a538e' : 'none'}
                                                                cursorBtnList={i === 5 ? 'pointer' : 'text'}
                                                                colorBtnList={i === 5 ? '#fff' : '#333'}
                                                                icon={i === 5 ? "fas fa-download" : ''}
                                                                displayIcon={i === 5 ? 'flex' : 'none'}
                                                                flexDirectionBtn={i === 5 ? 'column-reverse' : 'row'}
                                                                paddingBtnList={i === 5 ? '8px 10px 5px 10px' : '0'}
                                                                marginIcon="0 0 2px 0"
                                                                classTableActive={i === 5 ? 'number5-materi-tambahan' : undefined}
                                                                mouseEnterBtn={() => mouseOverUnduh(idx, i)}
                                                                mouseLeaveBtn={() => mouseLeaveUnduh(idx, i)}
                                                                clickBtn={() => unduhMateriTambahan(e[1], i)}
                                                            />
                                                        </>
                                                    )
                                                })}
                                            </div>
                                        </>
                                    )
                                }) : (
                                    <p className="no-data-available-ruang-materi">
                                        No data available in table
                                    </p>
                                )}
                            </tbody>
                        </div>
                    </div>

                    <div className="container-video-pembelajaran" style={styleVideoPembelajaran}>
                        {videoPembelajaran && videoPembelajaran.length > 0 ? videoPembelajaran.map((e, i) => {

                            const getTitle = e.title.split(' ').join('-')

                            return (
                                <>
                                    <div className="wrapp-card-video-pembelajaran">
                                        <CardJadwal
                                            key={e._id}
                                            displayIconZip="none"
                                            displayColumnRed="none"
                                            displayColumnWhite="none"
                                            displayCardSlidePembelajaran="flex"
                                            widthWrapp="auto"
                                            marginWrapp="0 15px 15px 0"
                                            linkEmbedYoutube={e.linkEmbedYoutube}
                                            dateCreate={e.date}
                                            marginFontSlidePembelajaran="20px 20px 0 20px"
                                            marginDateSlidePembelajaran="5px 20px 30px 20px"
                                            paddingSlidePembelajaran="0 0 40px 0"
                                            widthBtnDownload="100%"
                                            alignItemsSlidePembelajaran="flex-start"
                                            justifyContentFontSlidePembelajaran="start"
                                            justifyContentSlidePembelajaran="start"
                                            bgColorBtnDownload="#1a8e5f"
                                            alignItemsBtnDownload="center"
                                            nameBtn="Detail Deskripsi"
                                            nameFile={e.title}
                                            classBtn="view-desk-video-pemb"
                                            mouseOverBtnDownload={() => mouseOverBtnDownload(i, 'view-desk-video-pemb')}
                                            mouseLeaveBtnDownload={() => mouseLeaveBtnDownload(i, 'view-desk-video-pemb')}
                                            clickBtnDownload={() => toPageDetailDeskripsi(`${getTitle}/${getPath[1]}`)}
                                        />
                                    </div>
                                </>
                            )
                        }) : (
                            <div></div>
                        )}
                    </div>

                    <div className="container-slide-pembelajaran" style={styleSlidePembelajaran}>
                        {slidePembelajaran && slidePembelajaran.length > 0 ? slidePembelajaran.map((e, i) => {
                            return (
                                <>
                                    <div className="card-slide-pembelajaran">
                                        <CardJadwal
                                            key={e._id}
                                            displayIframeYoutube="none"
                                            borderWrapp="none"
                                            bdrBottomWrapp="none"
                                            displayColumnRed="none"
                                            displayColumnWhite="none"
                                            displayCardSlidePembelajaran="flex"
                                            bgColorWrapp="#f4f5fb"
                                            widthWrapp="auto"
                                            textAlignNameFile="center"
                                            iconPdf={e.icon}
                                            nameFile={e.name}
                                            bgColorBtnDownload="#1a8e5f"
                                            classBtn="btn-download-pembelajaran"
                                            marginWrapp="0 15px 15px 0"
                                            nameBtn="Download"
                                            alignItemsColumnKiri="center"
                                            mouseOverBtnDownload={() => mouseOverBtnDownload(i, 'btn-download-pembelajaran')}
                                            mouseLeaveBtnDownload={() => mouseLeaveBtnDownload(i, 'btn-download-pembelajaran')}
                                            clickBtnDownload={() => downloadSlidePembelajaran(e.image)}
                                        />
                                    </div>
                                </>
                            )
                        }) : (
                            <div></div>
                        )}
                    </div>

                    <div className="container-pagination-ruang-materi" style={styleContainerPagination}>
                        <Pagination
                            classPaginate="paginate-materi-tambahan"
                            perPage={perPage}
                            totalData={listMateri.length}
                            paginate={paginate}
                            mouseEnter={mouseEnterPaginate}
                            mouseLeave={mouseLeavePaginate}
                            fromNumber={resultSearch.length > 0 ? resultSearch.length - resultSearch.length + 1 : '0'}
                            toNumber={resultSearch.length > 0 ? resultSearch.length : '0'}
                            lengthData={listMateri.length}
                        />
                    </div>
                </div>

                <div className="container-csv-ruang-materi">
                    <CSVLink
                        filename='E-Learning.csv'
                        headers={headersCsv}
                        data={newDataCsv}
                        id="btn-csv-download-ruang-materi">
                        Download me
                    </CSVLink>
                </div>

                <div className="container-excel-ruang-materi">
                    <ReactHTMLTableToExcel
                        table="table-to-xls"
                        filename="E-learning"
                        sheet="materi"
                        buttonText="EXPORT"
                    />
                </div>

                <ExportExcel displayTable="none" head={headTable} column={newDataCsv} />

                <table id="table-export-to-pdf-ruang-materi"></table>

                <PopClipboard
                    displayWrapp={loadPopClipboard ? 'flex' : 'none'}
                    total={resultSearch.length}
                />

                <Loading displayWrapp={loading ? 'flex' : 'none'} />
            </div>
        </>
    )
}

export default RuangMateri;