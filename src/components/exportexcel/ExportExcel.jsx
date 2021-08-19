import React from 'react'
import './ExportExcel.scss'

function ExportExcel({ head, column }) {

    return (
        <>
            <table border="1" id="table-to-xls" className="table-to-xls">
                <thead className="head-export-xls">
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

                <tbody className="body-export-xls">
                    {column && column.length > 0 ? column.map((e, i) => {
                        return (
                            <>
                                <tr key={i}>
                                    <td>
                                        {e.a}
                                    </td>
                                    <td>
                                        {e.b}
                                    </td>
                                    <td>
                                        {e.c}
                                    </td>
                                    <td>
                                        {e.d}
                                    </td>
                                    <td>
                                        {e.e}
                                    </td>
                                    <td>
                                        {e.f}
                                    </td>
                                    <td>
                                        {e.g}
                                    </td>
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