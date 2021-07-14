import React, { useState } from 'react';
import './HoverButton.scss';

function HoverButton({ nameHover, bdrRadiusWrapp, fontSizeNameHover, colorNameHover, displayWrapp, topWrapp, leftWrapp, bgColorWrapp, displayNameHover, paddingWrapp, shadowWrapp, displayBtnGroup, fontSizeBtnGroup, paddingBtnGroup, bgColorBtnGroup, colorBtnGroup, marginIcon, closeModal, displayCloseModal, justifyBtnGroup, bdrRadiusBtnGroup, alignWrapp, marginBtnGroup, displayLine, nameBtn1, icon1, nameBtn2, icon2, mouseOverBtn1, mouseLeaveBtn1, mouseOverBtn2, mouseLeaveBtn2, click1, click2 }) {

    const styleWrapp = {
        display: displayWrapp,
        borderRadius: bdrRadiusWrapp,
        top: topWrapp,
        left: leftWrapp,
        backgroundColor: bgColorWrapp,
        padding: paddingWrapp,
        boxShadow: shadowWrapp,
        alignItems: alignWrapp
    }

    const styleNameButton = {
        display: displayNameHover,
        fontSize: fontSizeNameHover,
        color: colorNameHover
    }

    const styleBtnGroup = {
        display: displayBtnGroup,
        fontSize: fontSizeBtnGroup,
        padding: paddingBtnGroup,
        backgroundColor: bgColorBtnGroup,
        color: colorBtnGroup,
        justifyContent: justifyBtnGroup,
        borderRadius: bdrRadiusBtnGroup,
        margin: marginBtnGroup
    }

    const styleIcon = {
        margin: marginIcon
    }

    const styleCloseModal = {
        display: displayCloseModal
    }

    const styleLine = {
        display: displayLine
    }

    return (
        <>
            <div className="wrapp-hover-button" style={styleWrapp}
            >
                <p className="name-hover-button" style={styleNameButton}>
                    {nameHover}
                </p>
                <button className="btn-group-hover-button" style={styleBtnGroup}
                    onMouseOver={mouseOverBtn1}
                    onMouseLeave={mouseLeaveBtn1}
                    onClick={click1}
                >
                    <i className={icon1} style={styleIcon}></i>
                    <p className="name-btn-group">
                        {nameBtn1}
                    </p>
                    <div className="hover-black">

                    </div>
                </button>
                <button className="btn-group-hover-button" style={styleBtnGroup}
                    onMouseOver={mouseOverBtn2}
                    onMouseLeave={mouseLeaveBtn2}
                    onClick={click2}
                >
                    <i className={icon2} style={styleIcon}></i>
                    <p className="name-btn-group">
                        {nameBtn2}
                    </p>
                    <div className="hover-black">

                    </div>
                </button>
                <div className="line-grey" style={styleLine}>

                </div>
            </div>

            <div className="close-btn-group-hover-button" style={styleCloseModal}
                onClick={closeModal}
            >
            </div>
        </>
    )
}

export default HoverButton;