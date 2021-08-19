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

    const [pathGlobal, setPathGlobal, activeNavmenu, setActiveNavmenu] = useContext(PathContext)
    const [dataCardAbsen, setDataCardAbsen] = useState({})
    const [jadwalAbsen, setJadwalAbsen] = useState([])
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false)
    const [dataMatkul, setDataMatkul] = useState({})
    const [nameBtnAbsen, setNameBtnAbsen] = useState('Belum Mulai')
    const [onCommentMhs, setOnCommentMhs] = useState(false)
    const [offBtnAbsen, setOffBtnAbsen] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
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
    const newMounth = mounth.toString().length === 1 ? `0${mounth + 1}` : mounth + 1
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
                setLoading(false)
                const respons = res.data
                setDataMatkul(respons)

                const getDataCardAbsen = respons.absensi.filter((e) => e.id === 'data-card-absen')
                setDataCardAbsen(getDataCardAbsen[0])

                const getJadwalAbsen = respons.absensi.filter((e) => e.id === 'jadwal-absen')
                setJadwalAbsen(getJadwalAbsen)
                const separateTimeZoneKeluar = respons.timeZoneKeluar.split(' ')
                const waktuHabis = `${separateTimeZoneKeluar[0]} ${separateTimeZoneKeluar[1]} ${separateTimeZoneKeluar[2]} ${separateTimeZoneKeluar[3]} 23:59:59`

                checkJamMasuk(respons.hari, respons.timeZoneMasuk, respons.timeZoneKeluar, waktuHabis);

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
                            res.map((e) => {
                                newArr.push({ a: e.number, b: e.statusAbsen, c: e.tanggal, d: e.matakuliah, e: e.pertemuan, f: e.rangkuman, g: e.beritaAcara })
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

    function checkJamMasuk(hari, jamMasuk, jamKeluar, waktuHabis) {
        if (hari === nameDay[day == 0 ? 6 : day - 1].toUpperCase()) {
            if (new Date(jamMasuk) < timeNow && new Date(jamKeluar) > timeNow) {
                setNameBtnAbsen('Absen Masuk')
            } else if (timeNow >= new Date(waktuHabis)) {
                setNameBtnAbsen('Belum Mulai')
            } else if (timeNow >= new Date(jamKeluar)) {
                setNameBtnAbsen('Sudah Selesai')
            }
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        setAllAPI()
    }, []);

    const indexOfLastData = currentPage * perPage
    const indexOfFirstData = indexOfLastData - perPage
    const currentData = jadwalAbsen.slice(indexOfFirstData, indexOfLastData);

    const styleWrapp = {
        marginLeft: activeNavmenu ? '230px' : '70px'
    }

    const styleCommentMhs = {
        display: onCommentMhs ? 'flex' : 'none'
    }

    const styleKomplainPengajaranSesuai = {
        color: commentMhs.komplain.toLowerCase() === 'pengajaran sesuai' ? '#1a8e5f' : '#333',
    }

    const styleKomplainPengajaranTidakSesuai = {
        color: commentMhs.komplain.toLowerCase() === 'pengajaran tidak sesuai' ? '#1a8e5f' : '#333',
    }

    const bgColorBtnAbsen = nameBtnAbsen.toLowerCase() === 'absen masuk' ? '#1a8e5f' : nameBtnAbsen.toLowerCase() === 'belum mulai' ? '#ea490b' : '#c1920c'

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
            API.APIPostAbsenMhs(dataMatkul._id, pertemuan, newData)
                .then(res => {
                    setAllAPI();

                    return res;
                })
                .catch(err => {
                    alert('Oops! terjadi kesalahan server.\nMohon coba beberapa saat lagi!')
                    console.log(err)
                })

            setOnCommentMhs(false)
            setOffBtnAbsen(true)
        } else {
            alert('Oops!, jam kuliah Anda sudah habis!')
            window.location.reload();
        }
    }

    function clickAbsenMasuk() {
        if (nameBtnAbsen.toLowerCase() === 'absen masuk') {
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

    const columnList = document.getElementsByClassName('column-list-absen')

    function mouseOverColumnList(idx) {
        if (idx % 2 === 0) {
            columnList[idx].classList.toggle('column-list-active')
        }
    }

    function mouseLeaveColumnList(idx) {
        if (idx % 2 === 0) {
            columnList[idx].classList.toggle('column-list-active')
        }
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

    const csvReport = {
        filename: 'E-Learning.csv',
        headers: headersCsv,
        data: dataCsv
    }

    const getAbsen = jadwalAbsen.map((e, i) => i === 0 ? `${e.number} ${e.dataAbsen.filter((e) => e.nim === user.nim).length === 0 ? 'Tidak Hadir' : 'Hadir'} ${e.tanggal} ${e.matakuliah} ${e.pertemuan} ${e.rangkuman} ${e.beritaAcara}` : `\n${e.number} ${e.dataAbsen.filter((e) => e.nim === user.nim).length === 0 ? 'Tidak Hadir' : 'Hadir'} ${e.tanggal} ${e.matakuliah} ${e.pertemuan} ${e.rangkuman} ${e.beritaAcara}`)

    function copyTxtClipBoard() {
        const txtCopy = `${headAbsen.map((e, i) => i === 0 ? e.name : ' ' + e.name)} \n\n${getAbsen}`;

        navigator.clipboard.writeText(txtCopy)
    }

    function btnDownloadCsv() {
        document.getElementById("btn-csv-download").click();
    }

    function btnDownloadExcel() {
        document.getElementById("button-download-as-xls").click();
    }

    let pdfjs = new jsPDF();

    function btnDownloadPdf() {
        pdfjs.autoTable({ html: '#table-export-to-pdf' })

        pdfjs.autoTable(headerPdf, dataCsv, {
            theme: 'striped'
        })

        pdfjs.save('E-learning.pdf')
    }

    function printTable() {
        window.print();
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
            printTable();
        }
    }

    return (
        <>
            <div className="wrapp-absensi" style={styleWrapp}>
                <div className="column-atas-absensi">
                    {dataCardAbsen && Object.keys(dataCardAbsen).length > 0 ? Object.entries(dataCardAbsen).map((e, i) => {

                        const separate = e[1].split('~')

                        return (
                            <>
                                <CardJadwal
                                    key={i}
                                    displayWrapp={e[0] !== 'id' ? 'flex' : 'none'}
                                    displayColumnRed="none"
                                    displayColumnBtn="none"
                                    displayListCard="none"
                                    widthWrapp="auto"
                                    displayInfoMatkul="flex"
                                    paddingWhiteCard="15px 40px 15px 15px"
                                    titleInfoMatkul={separate[1]}
                                    labelInfoMatkul={separate[0]}
                                    iconInfoMatkul={separate[2]}
                                    marginWrapp="0 15px 15px 0"
                                    bdrRadiusWrapp="2px"
                                />
                            </>
                        )
                    }) : (
                        <div></div>
                    )}
                </div>

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

                <div className="container-tools-absen">
                    <p className="title-rekap-absen">
                        Rekap Absen
                    </p>

                    <Tools
                        data={tools}
                        clickBtn={(i) => btnTools(i)}
                    />
                </div>

                <div className="column-bawah-absensi">
                    <div className="container-scroll-rekap-absen">
                        <tbody className="body-absen">
                            <HeadTable
                                data={headAbsen}
                                widthTh="calc(96%/7)"
                                widhtCustom="calc(96%/2)"
                                classNameTh="thead-absensi"
                                number={6}
                            />

                            {currentData && currentData.length > 0 ? currentData.map((e, idx) => {

                                const siswaHadir = e.dataAbsen.filter((e) => e.nim === user.nim)

                                const getStatusAbsen = siswaHadir.length === 0 ? 'Tidak Hadir' : 'Hadir'

                                const styleBoxHadir = getStatusAbsen.toLowerCase() === 'hadir' ? '#1a8e5f' : '#ea490b'

                                setTimeout(() => {
                                    if (columnList.length > 0) {
                                        if (idx % 2 === 0) {
                                            columnList[idx].classList.add('column-list-active')
                                        }
                                    }
                                }, 0);

                                const objListAbsen = e !== e.dataAbsen ? Object.entries(e) : null

                                return (
                                    <>
                                        <div key={e._id} className="column-list-absen"
                                            onMouseEnter={() => mouseOverColumnList(idx)}
                                            onMouseLeave={() => mouseLeaveColumnList(idx)}
                                        >

                                            {objListAbsen !== null ? objListAbsen.map((e, i) => {

                                                return (
                                                    <>
                                                        <ListTable
                                                            key={i}
                                                            widthWrapp={i === 7 ? 'calc(96%/2)' : 'calc(96%/7)' && i === 6 ? 'calc(96%/4)' : 'calc(96%/7)'}
                                                            displayWrapp={i !== 0 && i !== 8 ? 'flex' : 'none'}
                                                            contentList={e[0] !== 'dataAbsen' ? e[1] : ''}
                                                            statusAbsen={getStatusAbsen}
                                                            displayBoxHadir={i === 2 ? 'flex' : 'none'}
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
                        fromNumber={currentData.length > 0 ? currentData[0].number : '0'}
                        toNumber={currentData.length > 0 ? currentData[currentData.length - 1].number : '0'}
                        lengthData={jadwalAbsen.length}
                    />
                </div>

                <div className="container-btn-csv-download">
                    <CSVLink {...csvReport} id="btn-csv-download">
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

                <ExportExcel head={headAbsen} column={dataCsv} />

                <table id="table-export-to-pdf"></table>

                <Loading displayWrapp={loading ? 'flex' : 'none'} />
            </div>
        </>
    )
}

export default Absensi;