import React from 'react'
import './Loading.scss'

function Loading({ displayWrapp, bgColor, zIndexWrapp }) {

    const styleWrapp = {
        display: displayWrapp,
        backgroundColor: bgColor,
        zIndex: zIndexWrapp
    }

    return (
        <>
            <div className="wrapp-loading" style={styleWrapp}>
                <div className="circle-loading">

                </div>
            </div>
        </>
    )
}

export default Loading;