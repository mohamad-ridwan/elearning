import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import Cookies from 'js-cookie';
import './Dashboard.scss'
import API from '../../services/api';
import { PathContext } from '../../services/context/path';
import Input from '../../components/input/Input';
import endpoint from '../../services/api/endpoint';
import Loading from '../../components/loading/Loading';

function Dashboard() {

    const [pathGlobal, setPathGlobal, activeNavmenu, setActiveNavmenu, activeNavCollapse, setActiveNavCollapse, overActiveNavmenu, setOverActiveNavmenu, activeNavmenuDefault, setActiveNavmenuDefault, dataUserForNavbar, setDataUserForNavbar, idxActiveGlobal, setIdxActiveGlobal, headerTable, setHeaderTable, bodyTable, setBodyTable, pathPrintTable, setPathPrintTable, idxOnePrintTable, setIdxOnePrintTable, idxTwoPrintTable, setIdxTwoPrintTable, idxHeadPrintTable, setIdxHeadPrintTable, overActiveNavmenuDefault, setOverActiveNavmenuDefault, activeBodyDesktop, activeIconDrop, setActiveIconDrop, inActiveNavAfterLoadPage] = useContext(PathContext)
    const [user, setUser] = useState({})
    const [panduan, setPanduan] = useState([])
    const [loading, setLoading] = useState(false)

    const getTokenUser = Cookies.get('e-learning')

    const history = useHistory()

    const txtInputCard = document.getElementsByClassName('txt-input-card')

    function setAllAPI() {
        setLoading(true)

        API.APIGetDashboard(getTokenUser)
            .then(res => {
                if (res && res.data) {
                    setLoading(false)
                    setUser(res.data.user.data)
                } else {
                    history.push('/login')
                    document.cookie = 'e-learning='
                }
            })
            .catch(err => {
                history.push('/login')
                document.cookie = 'e-learning='
                console.log(err)
            })

        API.APIGetPanduan()
            .then(res => {
                setPanduan(res.data)
            })
            .catch(err => console.log(err))
    }

    function addReadOnlyInput() {
        for (let i = 0; i < txtInputCard.length; i++) {
            txtInputCard[i].setAttribute('readonly', 'readonly')
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        setTimeout(() => {
            activeBodyDesktop('wrapp-dashboard', 'wrapp-dashboard-active');
            inActiveNavAfterLoadPage();
        }, 0);
        addReadOnlyInput();
        setAllAPI();
    }, [])

    return (
        <>
            <div className="wrapp-dashboard">
                {user && Object.keys(user).length > 0 ? (
                    <>
                        <div className="column-kiri-dashboard">
                            <div className="column-name-user-dashboard">
                                <img src={`${endpoint}/${user.image}`} className="img-user-dashboard" />

                                <p className="name-user-dashboard">
                                    {user.name}
                                </p>
                            </div>

                            <div className="column-panduan-dashboard">
                                {panduan && panduan.length > 0 ? panduan.map((e) => {

                                    return (
                                        <>
                                            <a href={e && e.youtube ? e.youtube : `${endpoint}/${e.image}`} key={e._id} className="btn-panduan-dashboard" target="__blank"
                                            >
                                                <i className={e.icon}></i>
                                                {e.name}
                                            </a>
                                        </>
                                    )
                                }) : (
                                    <div></div>
                                )}
                            </div>
                        </div>
                        <div className="column-kanan-dashboard">
                            <p className="title-profile-mahasiswa">
                                Profile Mahasiswa
                            </p>

                            <Input
                                label="NIM"
                                value={user.nim}
                                fontWeightLabel="600"
                                bdrRadiusInput="2px"
                                bgColorInput="#e9ecef"
                                borderInput="1px solid #ccc"
                            />
                            <Input
                                label="Nama"
                                value={user.name}
                                fontWeightLabel="600"
                                bdrRadiusInput="2px"
                                bgColorInput="#e9ecef"
                                borderInput="1px solid #ccc"
                            />
                            <Input
                                label="Email"
                                value={user.email}
                                fontWeightLabel="600"
                                bdrRadiusInput="2px"
                                bgColorInput="#e9ecef"
                                borderInput="1px solid #ccc"
                            />
                            <Input
                                label="Kelas"
                                value={user.class}
                                fontWeightLabel="600"
                                bdrRadiusInput="2px"
                                bgColorInput="#e9ecef"
                                borderInput="1px solid #ccc"
                            />
                        </div>
                    </>
                ) : (
                    <div></div>
                )}

                <Loading displayWrapp={loading ? 'flex' : 'none'} />
            </div>
        </>
    )
}

export default Dashboard;