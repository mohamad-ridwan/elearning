import React, { useContext, useEffect, useState } from 'react'
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { thumbnailPlugin } from '@react-pdf-viewer/thumbnail';
import { toolbarPlugin } from '@react-pdf-viewer/toolbar';
import '@react-pdf-viewer/toolbar/lib/styles/index.css';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/thumbnail/lib/styles/index.css';
import './Storage.scss'
import endpoint from '../../services/api/endpoint';
import { PathContext } from '../../services/context/path';
import API from '../../services/api';

function Storage() {

    const [pathGlobal, setPathGlobal, activeNavmenu, setActiveNavmenu, activeNavCollapse, setActiveNavCollapse, overActiveNavmenu, setOverActiveNavmenu, activeNavmenuDefault, setActiveNavmenuDefault] = useContext(PathContext)
    const [panduan, setPanduan] = useState({})

    function setAllAPI() {
        API.APIGetPanduan()
            .then(res => {
                const getFilePdf = res.data.filter((e) => e.name.toLowerCase().includes('panduan'))

                setPanduan(getFilePdf[0])
            })
    }

    useEffect(() => {
        setAllAPI();
        setPathGlobal('/storage')
    }, [])

    // toolbar pdf
    const toolbarPdf = toolbarPlugin();
    const { Toolbar } = toolbarPdf;

    // thumbnail pdf
    const thumbnailPdf = thumbnailPlugin();
    const { Thumbnails } = thumbnailPdf;

    return (
        <>
            <div className="wrapp-storage">
                {panduan && Object.keys(panduan).length > 0 ? (
                    <>
                        <div className="navbar-storage"
                        ><Toolbar /></div>

                        <div className="thumbnails-storage-pdf">
                            <div className="scroll-thumbnails">
                                <Thumbnails />
                            </div>
                        </div>

                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
                            <div className="body-viewer-pdf">
                                <Viewer
                                    fileUrl={`${endpoint}/images/${panduan.link}`}
                                    plugins={[
                                        toolbarPdf,
                                        thumbnailPdf
                                    ]}
                                />
                            </div>
                        </Worker>
                    </>
                ) : (
                    <div></div>
                )}
            </div>
        </>
    )
}

export default Storage;