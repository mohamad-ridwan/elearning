import React from 'react'
import './Input.scss'

function Input({ label, typeInput, changeInput, nameInput, value, error, placeholder, fontWeightLabel, bdrRadiusInput, bgColorInput, borderInput, displayImg, displayInput, acceptFile, displayBtnOpenFile, nameBtnOpenFile, clickBtnOpenFile, shadowContainerInput, urlImg }) {

    const styleLabel = {
        fontWeight: fontWeightLabel
    }

    const styleContainerInput = {
        boxShadow: shadowContainerInput
    }

    const styleInput = {
        borderRadius: bdrRadiusInput,
        backgroundColor: bgColorInput,
        border: borderInput,
        display: displayInput,
    }

    const styleImg = {
        display: displayImg
    }

    const styleBtnOpenFile = {
        display: displayBtnOpenFile
    }

    return (
        <>
            <div className="wrapp-input-card">
                <label htmlFor="label" className="label-input-card" style={styleLabel}>
                    {label}
                </label>
                <img src={urlImg} alt="" className="img-input-user" style={styleImg} />
                <div className="container-input-card" style={styleContainerInput}>
                    <input type={typeInput} name={nameInput} className="txt-input-card" id="getFile" value={value} accept={acceptFile}
                        onChange={changeInput} placeholder={placeholder} style={styleInput}
                    />
                    <button className="btn-open-file" style={styleBtnOpenFile} onClick={clickBtnOpenFile}>
                        {nameBtnOpenFile}
                    </button>
                </div>
                <p className="error-message-input">
                    {error}
                </p>
            </div>
        </>
    )
}

export default Input;