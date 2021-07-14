import React from 'react';
import './ListTable.scss'

function ListTable({ contentList, statusAbsen, displayWrapp, displayBoxHadir, bgColorStatusAbsen, widthWrapp, bgColorBtnList, paddingBtnList, colorBtnList, cursorBtnList, icon, displayIcon, clickBtn, classBtn }) {

    const styleWrapp = {
        display: displayWrapp,
        width: widthWrapp
    }

    const styleBtnList = {
        backgroundColor: bgColorBtnList,
        padding: paddingBtnList,
        color: colorBtnList,
        cursor: cursorBtnList
    }

    const styleIcon = {
        display: displayIcon
    }

    const styleBoxHadir = {
        display: displayBoxHadir,
        backgroundColor: bgColorStatusAbsen
    }

    return (
        <>
            <tr className="list-table" style={styleWrapp}>
                <button className={`btn-list-table ${classBtn}`} style={styleBtnList}
                    onClick={clickBtn}
                >
                    {contentList}
                    <i className={icon} style={styleIcon}></i>
                </button>
                <p className="box-hadir" style={styleBoxHadir}>
                    {statusAbsen}
                </p>
            </tr>
        </>
    )
}

export default ListTable;