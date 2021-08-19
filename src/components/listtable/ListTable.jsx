import React from 'react';
import './ListTable.scss'

function ListTable({ contentList, statusAbsen, displayWrapp, displayBoxHadir, bgColorStatusAbsen, widthWrapp, bgColorBtnList, paddingBtnList, colorBtnList, cursorBtnList, icon, displayIcon, clickBtn, classBtn, flexDirectionBtn, marginIcon, mouseEnterBtn, mouseLeaveBtn, classTableActive, fontSizeBtnList, fontWeightBtnList, classWrapp }) {

    const styleWrapp = {
        display: displayWrapp,
        width: widthWrapp
    }

    const styleBtnList = {
        flexDirection: flexDirectionBtn,
        backgroundColor: bgColorBtnList,
        padding: paddingBtnList,
        color: colorBtnList,
        cursor: cursorBtnList,
        fontSize: fontSizeBtnList,
        fontWeight: fontWeightBtnList
    }

    const styleIcon = {
        display: displayIcon,
        margin: marginIcon
    }

    const styleBoxHadir = {
        display: displayBoxHadir,
        backgroundColor: bgColorStatusAbsen
    }

    return (
        <>
            <tr className={`list-table ${classWrapp}`} style={styleWrapp}>
                <button className={`btn-list-table ${classBtn}`} style={styleBtnList}
                    onClick={clickBtn}
                    onMouseEnter={mouseEnterBtn}
                    onMouseLeave={mouseLeaveBtn}
                >
                    <p className="content-list-table">
                        {contentList}
                    </p>
                    <i className={icon} style={styleIcon}></i>

                    <div className={`btn-list-table-active ${classTableActive}`}></div>
                </button>
                <p className="box-hadir" style={styleBoxHadir}>
                    {statusAbsen}
                </p>
            </tr>
        </>
    )
}

export default ListTable;