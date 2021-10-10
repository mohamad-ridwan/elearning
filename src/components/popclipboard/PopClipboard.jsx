import React from 'react';
import './PopClipboard.scss';

function PopClipboard({ displayWrapp, total }) {

    const styleWrapp = {
        display: displayWrapp
    }

    return (
        <>
            <div className="wrapp-pop-clipboard" style={styleWrapp}>
                <div className="container-clipboard">
                    <p className="txt-copy-clipboard">
                        Copy to clipboard
                    </p>
                    <p className="total-copy-data">
                        Copied {total} rows to clipboard
                    </p>
                </div>
            </div>
        </>
    )
}

export default PopClipboard;