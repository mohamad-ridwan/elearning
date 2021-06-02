import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import './Dashboard.scss'
import API from '../../services/api';
import { PathContext } from '../../services/context/path';

function Dashboard() {

    const [pathGlobal, setPathGlobal, activeNavmenu, setActiveNavmenu] = useContext(PathContext)

    const getTokenUser = JSON.parse(localStorage.getItem('token'))

    const history = useHistory()

    function setAllAPI() {
        API.APIGetUser()
            .then(res => {
                const respons = res.data

                const checkUserLogin = respons.filter((e) => e.token == getTokenUser)

                if (checkUserLogin.length === 0) {
                    history.push('/login')
                }
            })
    }

    useEffect(() => {
        setAllAPI();
    }, [])

    const styleDashboard = {
        marginLeft: activeNavmenu ? '230px' : '70px'
    }

    return (
        <>
            <div className="wrapp-dashboard" style={styleDashboard}>

            </div>
        </>
    )
}

export default Dashboard;