import React from 'react';
import './HeadTable.scss'

function HeadTable({ data, widthTh }) {

    const styleTh = {
        width: widthTh
    }

    return (
        <>
            <thead className="head-absen">
                {data && data.length > 0 ? data.map((e) => {
                    return (
                        <>
                            <th style={styleTh}>
                                <p className="name-head-table">
                                    {e.name}
                                </p>

                                <div className="column-icon-filter-table">
                                    <button className="btn-filter-table-up">
                                        &#9650;
                                    </button>
                                    <button className="btn-filter-table-down">
                                        &#9660;
                                    </button>
                                </div>
                            </th>
                        </>
                    )
                }) : (
                    <div></div>
                )}
            </thead>
        </>
    )
}

export default HeadTable;