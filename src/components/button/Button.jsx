import React from 'react'
import './Button.scss'

function Button({ nameBtn, paddingBtn, click, bgColor, fontSize, bdrRadius, mouseOver, mouseleave, displayBtn, displayIcon, colorBtn, bdrTop, bdrLeft, bdrRight, bdrBottom, marginBtn, icon, bdrRadiusHoverBtn, classBtn, displayHoverBlackBtn, classWrapp, transitionWrapp, colorIcon, classIcon, displayLoadBtn }) {

    const styleBtn = {
        display: displayBtn,
        padding: paddingBtn,
        backgroundColor: bgColor,
        fontSize: fontSize,
        borderRadius: bdrRadius,
        color: colorBtn,
        borderTop: bdrTop,
        borderLeft: bdrLeft,
        borderRight: bdrRight,
        borderBottom: bdrBottom,
        margin: marginBtn,
        transition: transitionWrapp
    }

    const styleIcon = {
        display: displayIcon,
        color: colorIcon
    }

    const styleHoverBlackBtn = {
        display: displayHoverBlackBtn,
        borderRadius: bdrRadiusHoverBtn
    }

    const styleLoadingBtn = {
        display: displayLoadBtn
    }

    return (
        <>
            <button className={`wrapp-button-card ${classWrapp}`} style={styleBtn} onClick={click}
                onMouseOver={mouseOver}
                onMouseLeave={mouseleave}
            >
                <i className={`${icon} ${classIcon}`}
                    style={styleIcon}
                ></i>
                <p className="name-btn-card">
                    {nameBtn}
                </p>

                <div className={`hover-black-btn-card ${classBtn}`} style={styleHoverBlackBtn}
                >

                </div>

                <div className="container-loading-btn-card" style={styleLoadingBtn}>
                    <div className="circle-loading-btn-card">

                    </div>
                </div>
            </button>
        </>
    )
}

export default Button;