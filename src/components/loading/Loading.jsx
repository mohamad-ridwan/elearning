import React from 'react'
import './Loading.scss'

function Loading({ displayWrapp }) {

    const styleWrapp = {
        display: displayWrapp
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