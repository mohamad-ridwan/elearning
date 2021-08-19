import React from 'react';
import './HeadTable.scss'

function HeadTable({ data, widthTh, displayIcon, cursor, number, widhtCustom, numberTwo, widhtCustomTwo, classNameTh }) {

    const styleIcon = {
        display: displayIcon
    }

    return (
        <>
            <thead className="head-absen">
                {data && data.length > 0 ? data.map((e, i) => {
                    return (
                        <>
                            <th className={classNameTh} style={{
                                width: number !== undefined ? i === number ? widhtCustom : widthTh : widthTh && numberTwo !== undefined ? i === numberTwo ? widhtCustomTwo : widthTh : widthTh,
                                cursor: cursor
                            }}>
                                <p className="name-head-table">
                                    {e.name}
                                </p>

                                <div className="column-icon-filter-table" style={styleIcon}>
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