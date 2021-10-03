import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import Cookies from 'js-cookie';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import './Absensi.scss'
import CardJadwal from '../../components/cardjadwal/CardJadwal';
import { PathContext } from '../../services/context/path';
import Button from '../../components/button/Button';
import Tools from '../../components/tools/Tools';
import HeadTable from '../../components/headtable/HeadTable';
import ListTable from '../../components/listtable/ListTable';
import Pagination from '../../components/pagination/Pagination';
import API from '../../services/api';
import Loading from '../../components/loading/Loading';
import ExportExcel from '../../components/exportexcel/ExportExcel';

function Absensi() {

    const [pathGlobal, setPathGlobal, activeNavmenu, setActiveNavmenu, activeNavCollapse, setActiveNavCollapse, overActiveNavmenu, setOverActiveNavmenu, activeNavmenuDefault, setActiveNavmenuDefault, dataUserForNavbar, setDataUserForNavbar, idxActiveGlobal, setIdxActiveGlobal, headerTable, setHeaderTable, bodyTable, setBodyTable, pathPrintTable, setPathPrintTable, idxOnePrintTable, setIdxOnePrintTable, idxTwoPrintTable, setIdxTwoPrintTable, idxHeadPrintTable, setIdxHeadPrintTable, overActiveNavmenuDefault, setOverActiveNavmenuDefault, activeBodyDesktop, activeIconDrop, setActiveIconDrop, inActiveNavAfterLoadPage] = useContext(PathContext)
    const [dataCardAbsen, setDataCardAbsen] = useState([])
    const [jadwalAbsen, setJadwalAbsen] = useState([])
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false)
    const [dataMatkul, setDataMatkul] = useState({})
    const [nameBtnAbsen, setNameBtnAbsen] = useState('Belum Mulai')
    const [onCommentMhs, setOnCommentMhs] = useState(false)
    const [offBtnAbsen, setOffBtnAbsen] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState(3)
    const [inputSearch, setInputSearch] = useState('')
    const [newDataCsv, setNewDataCsv] = useState([])
    const [headersCsv, setHeadersCsv] = useState([
        { label: "#", key: "a" },
        { label: "Status Absen", key: "b" },
        { label: "Tanggal", key: "c" },
        { label: "Matakuliah", key: "d" },
        { label: "Pertemuan", key: "e" },
        { label: "Rangkuman", key: "f" },
        { label: "Berita Acara", key: "g" }
    ])
    const [headerPdf, setHeaderPdf] = useState([
        { title: "#", key: "a" },
        { title: "Status Absen", key: "b" },
        { title: "Tanggal", key: "c" },
        { title: "Matakuliah", key: "d" },
        { title: "Pertemuan", key: "e" },
        { title: "Rangkuman", key: "f" },
        { title: "Berita Acara", key: "g" }
    ])
    const [dataCsv, setDataCsv] = useState([])
    const [commentMhs, setCommentMhs] = useState({
        message: '',
        komplain: 'Pengajaran Sesuai'
    })
    const [pertemuan, setPertemuan] = useState('')
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

    const [headAbsen, setHeadAbsen] = useState([
        {
            name: '#',
        },
        {
            name: 'STATUS ABSEN',
        },
        {
            name: 'TANGGAL',
        }, {
            name: 'MATAKULIAH',
        },
        {
            name: 'PERTEMUAN',
        },
        {
            name: 'RANGKUMAN',
        },
        {
            name: 'BERITA ACARA',
        }
    ])

    const history = useHistory()

    const path = window.location.pathname
    const getPath = path.split('/absensi/')

    const tokenUser = Cookies.get('e-learning')

    const nameDay = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']

    const mounth = new Date().getMonth()
    const newMounth = mounth.toString().length === 1 ? mounth > 8 ? mounth + 1 : `0${mounth + 1}` : mounth + 1
    const years = new Date().getFullYear()
    const date = new Date().getDate()
    const newDate = date.toString().length === 1 ? `0${date}` : date
    const day = new Date().getDay()
    const timeNow = new Date()

    const elPaginate = document.getElementsByClassName('paginate-absensi')

    function setAllAPI() {
        setLoading(true);

        let newUser = {}

        API.APIGetDashboard(tokenUser)
            .then(res => {
                if (res && res.data) {
                    setUser(res.data.user.data)
                    newUser = res.data.user.data
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
                setDataMatkul(respons)

                const getDataCardAbsen = respons.absensi.filter((e) => e.id === 'data-card-absen')

                let newArrCardAbsen = []

                if (getDataCardAbsen.length > 0) {
                    getDataCardAbsen.map((e) => {
                        newArrCardAbsen.push({ one: e.dosen, two: e.matakuliah }, { three: e.jamMasuk, four: e.jamKeluar }, { five: e.ruang, six: e.kelas }, { seven: e.hari, eight: e.kodeMTK })
                    })
                    setTimeout(() => {
                        setDataCardAbsen(newArrCardAbsen)
                    }, 0);
                }

                const getJadwalAbsen = respons.absensi.filter((e) => e.id === 'jadwal-absen')
                setJadwalAbsen(getJadwalAbsen)
                const separateTimeZoneKeluar = respons.timeZoneKeluar.split(' ')
                const waktuHabis = `${separateTimeZoneKeluar[0]} ${separateTimeZoneKeluar[1]} ${separateTimeZoneKeluar[2]} ${separateTimeZoneKeluar[3]} 23:59:59`

                // For check User that not yet absent for Schedule Today
                const getJadwalTimeNow = getJadwalAbsen.length > 0 ? getJadwalAbsen.filter((e) => e.tanggal === `${years}-${newMounth}-${newDate}`) : []
                const getUserAlreadyAbsent = getJadwalTimeNow.length > 0 ? getJadwalTimeNow[0].dataAbsen.filter((e) => e.nim === newUser.nim) : []

                const splitTimeZoneMasuk = respons.timeZoneMasuk.split(' ')
                const splitTimeZoneKeluar = respons.timeZoneKeluar.split(' ')
                const newTimeZoneMasuk = new Date(`${splitTimeZoneMasuk[0]} ${splitTimeZoneMasuk[1]} ${splitTimeZoneMasuk[2]} ${splitTimeZoneMasuk[3]} ${splitTimeZoneMasuk[4]}`)
                const newTimeZoneKeluar = new Date(`${splitTimeZoneKeluar[0]} ${splitTimeZoneKeluar[1]} ${splitTimeZoneKeluar[2]} ${splitTimeZoneKeluar[3]} ${splitTimeZoneKeluar[4]}`)

                checkJamMasuk(respons.hari, newTimeZoneMasuk, newTimeZoneKeluar, waktuHabis, getUserAlreadyAbsent);

                if (getJadwalAbsen.length > 0) {
                    function mapOut(sourceObject, removeKeys, removeId) {
                        const sourceKeys = Object.keys(sourceObject);
                        const returnKeys = sourceKeys.filter(k => !removeKeys.includes(k) && !removeId.includes(k));

                        let returnObject = {};
                        returnKeys.forEach(k => {
                            setTimeout(() => {
                                const siswaHadir = sourceObject.dataAbsen.filter((e) => e.nim === newUser.nim)
                                const getStatusAbsen = siswaHadir.length === 0 ? 'Tidak Hadir' : 'Hadir'

                                returnObject[k] = sourceObject[k]
                                returnObject.statusAbsen = getStatusAbsen
                            }, 0);
                        })

                        return returnObject;
                    }

                    let newArr = []
                    const removeProperty = getJadwalAbsen.map(obj => mapOut(obj, ['dataAbsen'], ['id']))
                    const promiseR = Promise.resolve(removeProperty)

                    promiseR.then((res) => {
                        setTimeout(() => {
                            res.map((e, i) => {
                                newArr.push({ a: i + 1, b: e.statusAbsen, c: e.tanggal, d: e.matakuliah, e: e.pertemuan, f: e.rangkuman, g: e.beritaAcara })
                            })
                            setDataCsv(newArr)
                        }, 0);
                    })
                        .catch(err => console.log(err))
                }

                setTimeout(() => {
                    if (elPaginate.length > 0) {
                        mouseLeavePaginate();
                    }
                }, 0);
            })
            .catch(err => console.log(err))
    }

    function checkJamMasuk(hari, jamMasuk, jamKeluar, waktuHabis, userPresence) {
        if (hari === nameDay[day == 0 ? 6 : day - 1].toUpperCase()) {
            if (jamMasuk < timeNow && jamKeluar > timeNow) {
                if (userPresence.length === 1) {
                    setNameBtnAbsen('Sudah Absen')
                } else {
                    setNameBtnAbsen('Absen Masuk')
                }
            } else if (timeNow >= new Date(waktuHabis)) {
                setNameBtnAbsen('Belum Mulai')
            } else if (timeNow >= jamKeluar) {
                setNameBtnAbsen('Sudah Selesai')
            }
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        setTimeout(() => {
            activeBodyDesktop('wrapp-absensi', 'wrapp-absensi-active');
            inActiveNavAfterLoadPage();
        }, 0);
        setAllAPI()
        setPathGlobal(`/absensi/${getPath[1]}`);
    }, []);

    const styleCommentMhs = {
        display: onCommentMhs ? 'flex' : 'none'
    }

    const styleKomplainPengajaranSesuai = {
        color: commentMhs.komplain.toLowerCase() === 'pengajaran sesuai' ? '#1a8e5f' : '#333',
    }

    const styleKomplainPengajaranTidakSesuai = {
        color: commentMhs.komplain.toLowerCase() === 'pengajaran tidak sesuai' ? '#1a8e5f' : '#333',
    }

    const bgColorBtnAbsen = nameBtnAbsen === 'Absen Masuk' ? '#1a8e5f' : nameBtnAbsen === 'Belum Mulai' ? '#ea490b' : nameBtnAbsen === 'Sudah Absen' ? '#374151' : '#c1920c'

    function focusInputComment() {
        document.getElementById('input-comment-mhs').focus()
    }

    function checkUserNotYetAbsen(idx, numberPertemuan) {
        const checkUserAbsen = jadwalAbsen[idx].dataAbsen.filter((e) => e.nim === user.nim)

        if (checkUserAbsen.length === 0) {
            setOnCommentMhs(true)
            setPertemuan(numberPertemuan)
            setOffBtnAbsen(false)

            setTimeout(() => {
                focusInputComment();
            }, 0);
        }
    }

    async function submitUserAbsen() {
        let indexMatkul = null
        let numberPertemuan = ''

        jadwalAbsen.forEach((e, i) => e.tanggal === `${years}-${newMounth}-${newDate}` ? indexMatkul = i : null)
        jadwalAbsen.forEach((e) => e.tanggal === `${years}-${newMounth}-${newDate}` ? numberPertemuan = e.pertemuan : null)

        if (indexMatkul !== null) {
            await checkUserNotYetAbsen(indexMatkul, numberPertemuan)
        }
    }

    function clickKirimAbsen() {
        const newData = {
            name: user.name,
            nim: user.nim,
            noAbsen: user.noAbsen,
            message: commentMhs.message,
            komplain: commentMhs.komplain
        }

        if (new Date(dataMatkul.timeZoneKeluar) >= timeNow) {
            const confirm = window.confirm('Lakukan Presensi?')

            if (confirm) {
                setLoading(true);
                API.APIPostAbsenMhs(dataMatkul._id, pertemuan, newData)
                    .then(res => {
                        setAllAPI();

                        return res;
                    })
                    .catch(err => {
                        setLoading(false)
                        alert('Oops! terjadi kesalahan server.\nMohon coba beberapa saat lagi!')
                        console.log(err)
                    })

                setOnCommentMhs(false)
                setOffBtnAbsen(true)
            }
        } else {
            alert('Oops!, jam kuliah Anda sudah habis!')
            window.location.reload();
        }
    }

    function clickAbsenMasuk() {
        if (nameBtnAbsen === 'Absen Masuk') {
            submitUserAbsen();
        }
    }

    function changeCommentMhs(e) {
        setCommentMhs({
            ...commentMhs,
            message: e.target.value
        })
    }

    const btnKirim = document.getElementsByClassName('btn-absensi')

    function mouseOverBtn(idx) {
        btnKirim[idx].style.opacity = '0.2'
    }

    function mouseLeaveBtn(idx) {
        btnKirim[idx].style.opacity = '0'
    }

    function changeKomplainAbsen(value) {
        setCommentMhs({
            ...commentMhs,
            komplain: value
        })
    }

    const iconDotsPengajaranSesuai = commentMhs.komplain.toLowerCase() === 'pengajaran sesuai' ? 'fas fa-dot-circle' : 'fas fa-circle'

    const iconDotsPengajaranTidakSesuai = commentMhs.komplain.toLowerCase() === 'pengajaran tidak sesuai' ? 'fas fa-dot-circle' : 'fas fa-circle'

    const theadAbsensi = document.getElementsByClassName('thead-absensi')

    setTimeout(() => {
        if (theadAbsensi.length > 0) {
            theadAbsensi[5].style.width = 'calc(96%/4)'
        }
    }, 0);

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

    function changeInput(e) {
        setInputSearch(e.target.value)
    }

    function iconDelInput() {
        setInputSearch('')
    }

    const indexOfLastDataCsv = currentPage * perPage
    const indexOfFirstDataCsv = indexOfLastDataCsv - perPage
    const currentDataCsv = dataCsv.slice(indexOfFirstDataCsv, indexOfLastDataCsv)

    const resultSearchCsv = currentDataCsv.length > 0 ? currentDataCsv.filter((e, i) => e.b.toLowerCase() === inputSearch || e.c.toLowerCase().includes(inputSearch) || e.d.toLowerCase().includes(inputSearch) || e.e.toLowerCase().includes(inputSearch) || e.f.toLowerCase().includes(inputSearch) || e.g.toLowerCase().includes(inputSearch)) : []

    const getAbsen = resultSearchCsv.map((e, i) => i === 0 ? `${i + 1} ${e.b} ${e.c} ${e.d} ${e.e} ${e.f} ${e.g}` : `\n${i + 1} ${e.b} ${e.c} ${e.d} ${e.e} ${e.f} ${e.g}`)

    function copyTxtClipBoard() {
        const txtCopy = `${headAbsen.map((e, i) => i === 0 ? e.name : ' ' + e.name)} \n\n${getAbsen}`;

        navigator.clipboard.writeText(txtCopy);
    }

    function changeDataCsv() {
        return new Promise((resolve, reject) => {
            let newArr = []

            resultSearchCsv.map((e, i) => {
                setTimeout(() => {
                    newArr.push({ a: i + 1, b: e.b, c: e.c, d: e.d, e: e.e, f: e.f, g: e.g })
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
            document.getElementById("btn-csv-download").click();
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
            pdfjs.autoTable({ html: '#table-export-to-pdf' })

            pdfjs.autoTable(headerPdf, res, {
                theme: 'striped'
            })

            pdfjs.save('E-learning.pdf')
        })
    }

    function toPagePrintTable() {
        setHeaderTable(headAbsen)
        setPathPrintTable(`/absensi/${getPath[1]}`)
        setIdxOnePrintTable(6)
        setIdxTwoPrintTable(5)
        setIdxHeadPrintTable([{ idx: 6, width: 'calc(96%/2)' }, { idx: 5, width: 'calc(96%/4)' }])

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

    return (
        <>
            <div className="wrapp-absensi">
                <div className="column-atas-absensi">
                    <div className="column-kiri-atas-absensi">
                        {dataCardAbsen && dataCardAbsen.length > 0 ? dataCardAbsen.map((e, i) => {

                            const obj = Object.entries(e)

                            return (
                                <>
                                    <div className="column-data-card-absensi">
                                        {obj.map((e) => {
                                            const separate = e[1].split('~')
                                            return (
                                                <>
                                                    <CardJadwal
                                                        key={i}
                                                        displayColumnRed="none"
                                                        displayColumnBtn="none"
                                                        displayListCard="none"
                                                        widthWrapp="auto"
                                                        displayInfoMatkul="flex"
                                                        paddingWhiteCard="15px 0px 15px 15px"
                                                        titleInfoMatkul={separate[1]}
                                                        labelInfoMatkul={separate[0]}
                                                        iconInfoMatkul={separate[2]}
                                                        marginWrapp="0 0 15px 0"
                                                        bdrRadiusWrapp="2px"
                                                    />
                                                </>
                                            )
                                        })}

                                    </div>
                                </>
                            )
                        }) : (
                            <div></div>
                        )}
                    </div>

                    <div className="column-kanan-atas-absensi">
                        <div className="column-btn-absensi">
                            <Button
                                displayBtn={offBtnAbsen ? 'flex' : 'none'}
                                nameBtn={nameBtnAbsen}
                                paddingBtn="7px 12px"
                                bgColor={bgColorBtnAbsen}
                                bdrRadius="20px"
                                bdrRadiusHoverBtn="20px"
                                classBtn="btn-absensi"
                                click={clickAbsenMasuk}
                                mouseOver={() => mouseOverBtn(0)}
                                mouseleave={() => mouseLeaveBtn(0)}
                            />

                            <div className="container-comment-absen-mhs" style={styleCommentMhs}>
                                <p className="txt-optional-comment">
                                    (Optional)
                                </p>

                                <textarea name="comment" id="input-comment-mhs" cols="37" rows="3" className="input-comment-mhs" placeholder="Komentar Mahasiswa.." onChange={changeCommentMhs}></textarea>

                                <div className="column-input-komplain-absen">
                                    <button className="pengajaran-sesuai btn-group-komplain"
                                        onClick={() => changeKomplainAbsen('Pengajaran Sesuai')}
                                    >
                                        <i className={iconDotsPengajaranSesuai} style={styleKomplainPengajaranSesuai}>

                                        </i>

                                        <label htmlFor="label" className="label-pengajaran-sesuai label-group-komplain">
                                            Pengajaran Sesuai
                                        </label>
                                    </button>

                                    <button className="pengajaran-tidak-sesuai btn-group-komplain"
                                        onClick={() => changeKomplainAbsen('Pengajaran Tidak Sesuai')}
                                    >
                                        <i className={iconDotsPengajaranTidakSesuai} style={styleKomplainPengajaranTidakSesuai}>

                                        </i>

                                        <label htmlFor="label" className="label-pengajaran-tidak-sesuai label-group-komplain">
                                            Pengajaran Tidak Sesuai
                                        </label>
                                    </button>
                                </div>

                                <div className="column-btn-submit-comment-absen-mhs">
                                    <Button
                                        nameBtn="Kirim"
                                        paddingBtn="5px 12px"
                                        bgColor="#1a8e5f"
                                        classBtn="btn-absensi"
                                        bdrRadius="20px"
                                        bdrRadiusHoverBtn="20px"
                                        displayIcon="flex"
                                        colorIcon="#fff"
                                        icon="far fa-paper-plane"
                                        mouseOver={() => mouseOverBtn(1)}
                                        mouseleave={() => mouseLeaveBtn(1)}
                                        click={clickKirimAbsen}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container-tools-absen">
                    <p className="title-rekap-absen">
                        Rekap Absen
                    </p>

                    <Tools
                        data={tools}
                        clickBtn={(i) => btnTools(i)}
                        inputSearch={changeInput}
                        displayIconDel={inputSearch.length > 0 ? 'flex' : 'none'}
                        valueSearch={inputSearch}
                        clickIconDel={iconDelInput}
                    />
                </div>

                <div className="column-bawah-absensi">
                    <div className="container-scroll-rekap-absen">
                        <tbody className="table-absen">
                            <HeadTable
                                data={headAbsen}
                                widthTh="calc(96%/7)"
                                widhtCustom="calc(96%/2)"
                                classNameTh="thead-absensi"
                                number={6}
                            />

                            {resultSearchCsv && resultSearchCsv.length > 0 ? resultSearchCsv.map((e, idx) => {
                                const styleBoxHadir = e.b === 'Hadir' ? '#1a8e5f' : '#ea490b'

                                const objListAbsen = Object.entries(e)

                                return (
                                    <>
                                        <div key={e._id} className="column-list-absen"
                                            style={{
                                                backgroundColor: idx % 2 === 0 ? '#fff' : '#f5f7fb'
                                            }}
                                        >
                                            <ListTable
                                                contentList={idx + 1}
                                            />
                                            {objListAbsen !== null ? objListAbsen.map((e, i) => {

                                                return (
                                                    <>
                                                        <ListTable
                                                            key={i}
                                                            widthWrapp={i === 6 ? 'calc(96%/2)' : 'calc(96%/7)' && i === 5 ? 'calc(96%/4)' : 'calc(96%/7)'}
                                                            displayWrapp={i !== 0 ? 'flex' : 'none'}
                                                            contentList={e[0] !== 'b' && e[0] !== 'a' ? e[1] : ''}
                                                            statusAbsen={e[0] === 'b' ? e[1] : ''}
                                                            displayBoxHadir={i === 1 ? 'flex' : 'none'}
                                                            bgColorStatusAbsen={styleBoxHadir}
                                                            cursorBtnList="text"
                                                        />
                                                    </>
                                                )
                                            }) : (
                                                <div></div>
                                            )}
                                        </div>
                                    </>
                                )
                            }) : (
                                <>
                                    <p className="no-data-available-absensi">
                                        No data available in table
                                    </p>
                                </>
                            )}
                        </tbody>
                    </div>
                </div>

                <div className="container-paginate-absensi">
                    <Pagination
                        perPage={perPage}
                        totalData={jadwalAbsen.length}
                        paginate={paginate}
                        classPaginate="paginate-absensi"
                        mouseEnter={mouseEnterPaginate}
                        mouseLeave={mouseLeavePaginate}
                        fromNumber={resultSearchCsv.length > 0 ? resultSearchCsv.length - resultSearchCsv.length + 1 : '0'}
                        toNumber={resultSearchCsv.length > 0 ? resultSearchCsv.length : '0'}
                        lengthData={jadwalAbsen.length}
                    />
                </div>

                <div className="container-btn-csv-download">
                    <CSVLink filename="E-Learning.csv" headers={headersCsv} data={newDataCsv} id="btn-csv-download">
                        Download me
                    </CSVLink>
                </div>

                <div className="container-data-excel-download">
                    <ReactHTMLTableToExcel
                        table="table-to-xls"
                        filename="E-learning"
                        sheet="Rekap Absen"
                        buttonText="EXPORT"
                    />
                </div>

                <ExportExcel displayTable="none" head={headAbsen} column={newDataCsv} />

                <table id="table-export-to-pdf"></table>

                <Loading displayWrapp={loading ? 'flex' : 'none'} />
            </div>
        </>
    )
}

export default Absensi;