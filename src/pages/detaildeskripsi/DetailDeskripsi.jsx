import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router';
import Cookies from 'js-cookie';
import './DetailDeskripsi.scss'
import API from '../../services/api';
import { PathContext } from '../../services/context/path';
import Loading from '../../components/loading/Loading';

function DetailDeskripsi() {

    const [pathGlobal, setPathGlobal, activeNavmenu, setActiveNavmenu, activeNavCollapse, setActiveNavCollapse, overActiveNavmenu, setOverActiveNavmenu, activeNavmenuDefault, setActiveNavmenuDefault, dataUserForNavbar, setDataUserForNavbar, idxActiveGlobal, setIdxActiveGlobal, headerTable, setHeaderTable, bodyTable, setBodyTable, pathPrintTable, setPathPrintTable, idxOnePrintTable, setIdxOnePrintTable, idxTwoPrintTable, setIdxTwoPrintTable, idxHeadPrintTable, setIdxHeadPrintTable, overActiveNavmenuDefault, setOverActiveNavmenuDefault, activeBodyDesktop, activeIconDrop, setActiveIconDrop, inActiveNavAfterLoadPage] = useContext(PathContext)
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)

    const getTokenUser = Cookies.get('e-learning')
    const history = useHistory()

    const path = window.location.pathname
    const getPath = path.split('/')
    const titleDeskripsi = getPath[4].split('-').join(' ')

    function setAllAPI() {
        setLoading(true);

        API.APIGetDashboard(getTokenUser)
            .then(res => {
                if (res && res.data) {
                    return res;
                } else {
                    history.push('/login')
                    document.cookie = 'e-learning='
                }
            })
            .catch(err => console.log(err))

        API.APIGetOneMatkul(getPath[5])
            .then(res => {
                setLoading(false)
                const respons = res.data

                const getVideoPembelajaran = respons.ruangMateri.filter((e) => e.id === 'video-pembelajaran')
                const getDetailDeskripsi = getVideoPembelajaran[0] && getVideoPembelajaran[0].data ? getVideoPembelajaran[0].data.filter((e) => e.title === titleDeskripsi) : {}
                setData(getDetailDeskripsi[0])
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        setTimeout(() => {
            activeBodyDesktop('wrapp-detail-deskripsi', 'wrapp-detail-deskripsi-active');
            inActiveNavAfterLoadPage();
        }, 0);
        setAllAPI();
    }, [])

    return (
        <>
            <div className="wrapp-detail-deskripsi">
                <div className="container-white-detail-deskripsi">
                    <div className="column-video-detail-deskripsi">
                        <iframe className="yt-detail-deskripsi" src={data && data.linkEmbedYoutube} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="fullscreen"></iframe>
                    </div>

                    <div className="column-paragraf-detail-deskripsi">
                        <p className="txt-detail-deskripsi" dangerouslySetInnerHTML={{ __html: data && data.deskripsi }}>

                        </p>
                    </div>
                </div>

                <Loading displayWrapp={loading ? 'flex' : 'none'} />
            </div>
        </>
    )
}

export default DetailDeskripsi;