import React, { useContext, useEffect } from 'react';
import './KuliahPengganti.scss'
import CardJadwal from '../../components/cardjadwal/CardJadwal';
import { PathContext } from '../../services/context/path';

function KuliahPengganti() {

    const [pathGlobal, setPathGlobal, activeNavmenu, setActiveNavmenu] = useContext(PathContext)

    const styleWrapp = {
        marginLeft: activeNavmenu ? '230px' : '70px'
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <div className="wrapp-kuliah-pengganti" style={styleWrapp}>
                <CardJadwal
                />
                <CardJadwal
                />
                <CardJadwal
                />
                <CardJadwal
                />
                <CardJadwal
                />
                <CardJadwal
                />
            </div>
        </>
    )
}

export default KuliahPengganti;