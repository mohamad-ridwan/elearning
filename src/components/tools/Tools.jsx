import React from 'react';
import './Tools.scss'

function Tools({ data }) {
    return (
        <>
            <div className="column-tools-absen">
                <div className="column-kiri-tools-absen">
                    {data && data.length > 0 ? data.map((e, i) => {
                        return (
                            <>
                                <button key={i} className="btn-tools btn-tools-group">
                                    {e.name}
                                </button>
                            </>
                        )
                    }) : (
                        <div></div>
                    )}
                </div>

                <div className="column-kanan-tools-absen">
                    <p className="txt-search-absen">
                        Search:
                    </p>

                    <div className="container-search-absen">
                        <input type="text" className="input-search-absen" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Tools;