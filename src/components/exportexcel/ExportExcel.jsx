import React from 'react'
import './ExportExcel.scss'

function ExportExcel({ head, column, displayTable, bgColorThead }) {

    const styleTable = {
        display: displayTable
    }

    const styleThead = {
        backgroundColor: bgColorThead
    }

    return (
        <>
            <table border="1" id="table-to-xls" className="table-to-xls" style={styleTable}>
                <thead className="head-export-xls" style={styleThead}>
                    <tr>
                        {head && head.length > 0 ? head.map((e, i) => {
                            return (
                                <>
                                    <th key={i}>
                                        {e.name}
                                    </th>
                                </>
                            )
                        }) : (
                            <div></div>
                        )}
                    </tr>
                </thead>

                <tbody className="tbody-export-xls">
                    {column && column.length > 0 ? column.map((e, i) => {

                        const obj = Object.entries(e)

                        return (
                            <>
                                <tr key={i} className="tr-export-excel">
                                    {obj.map((e) => {
                                        return (
                                            <>
                                                <td>{e[1]}</td>
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
        </>
    )
}

export default ExportExcel;