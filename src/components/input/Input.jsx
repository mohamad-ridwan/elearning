import React from 'react'
import './Input.scss'

function Input({ label, typeInput, changeInput, nameInput, value, error }) {
    return (
        <>
            <div className="wrapp-input-card">
                <label htmlFor="label" className="label-input-card">
                    {label}
                </label>
                <input type={typeInput} name={nameInput} className="txt-input-card" value={value}
                    onChange={changeInput}
                />
                <p className="error-message-input">
                    {error}
                </p>
            </div>
        </>
    )
}

export default Input;