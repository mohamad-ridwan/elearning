import React, { useEffect, useContext } from 'react'
import { useHistory } from 'react-router';
import './PrintTable.scss'
import { PathContext } from '../../services/context/path'
import HeadTable from '../../components/headtable/HeadTable'
import ListTable from '../../components/listtable/ListTable'

function PrintTable() {

    const [pathGlobal, setPathGlobal, activeNavmenu, setActiveNavmenu, activeNavCollapse, setActiveNavCollapse, overActiveNavmenu, setOverActiveNavmenu, activeNavmenuDefault, setActiveNavmenuDefault, dataUserForNavbar, setDataUserForNavbar, idxActiveGlobal, setIdxActiveGlobal, headerTable, setHeaderTable, bodyTable, setBodyTable, pathPrintTable, setPathPrintTable, idxOnePrintTable, setIdxOnePrintTable, idxTwoPrintTable, setIdxTwoPrintTable, idxHeadPrintTable, setIdxHeadPrintTable] = useContext(PathContext)

    const history = useHistory();

    function setPageSize(cssPageSize) {
        const style = document.createElement('style')
        style.innerHTML = `@page {size: ${cssPageSize}}`;
        style.id = 'page-orientation';
        document.head.appendChild(style)
    }

    useEffect(() => {
        setPathGlobal('/print-table')

        setPageSize('landscape')

        setTimeout(() => {
            window.print()
        }, 1000);

        return () => {
            const child = document.getElementById('page-orientation');
            child.parentNode.removeChild(child)
        }
    }, [])

    const theadAbsensi = document.getElementsByClassName('thead-absensi-print-table')

    setTimeout(() => {
        if (theadAbsensi.length > 0 && idxHeadPrintTable.length > 0) {
            idxHeadPrintTable.map((e) => {
                theadAbsensi[e.idx].style.width = `${e.width}`
            })
        }
    }, 0);

    const trElement = document.getElementsByClassName('tr-print-table')

    window.onafterprint = () => {
        setTimeout(() => {
            history.push(pathPrintTable)
        }, 2000);
    }

    return (
        <>
            <table className="table-print-table">
                <p className="title-e-elearning">
                    E-Learning
                </p>

                <HeadTable
                    data={headerTable}
                    displayIcon="none"
                    classNameTh="thead-absensi-print-table"
                    bdrTopAbsen="2px solid #dee5f1"
                    bdrLeftAbsen="2px solid #dee5f1"
                    bdrRightAbsen="2px solid #dee5f1"
                    bdrBottomAbsen="1px solid #dee5f1"
                    number={6}
                />

                <tbody className="tbody-print-table">
                    {bodyTable && bodyTable.length > 0 ? bodyTable.map((e, idx) => {

                        setTimeout(() => {
                            if (trElement.length > 0) {
                                if (idx % 2 === 0) {
                                    trElement[idx].classList.add('tr-print-table-active')
                                }
                            }
                        }, 0);

                        const obj = Object.entries(e)

                        return (
                            <>
                                <tr className="tr-print-table">
                                    {obj.map((e, i) => {
                                        return (
                                            <>
                                                <ListTable
                                                    widthWrapp={i === idxOnePrintTable ? 'calc(96%/2)' : i === idxTwoPrintTable ? 'calc(96%/4)' : 'calc(96%/7)'}
                                                    contentList={e[1]}
                                                    borderWrapp="1px solid #dee5f1"
                                                />
                                            </>
                                        )
                                    })}
                                </tr>
                            </>
                        )
                    }) : (
                        <div></div>
                    )}
                </tbody>
            </table>

            <div className="background-black">

            </div>
        </>
    )
}

export default PrintTable;