import React from 'react'
import './CardJadwal.scss'
import Button from '../button/Button'

function CardJadwal({ displayColumnRed, displayColumnBtn, displayListCard, toPage, widthWrapp, displayInfoMatkul, paddingWhiteCard, titleInfoMatkul, labelInfoMatkul, iconInfoMatkul, marginWrapp, toPageRuangMateri, toPageRuangTugas, mouseOverRuangDiskusi, mouseLeaveRuangDiskusi, mouseOverRuangMateri, mouseLeaveRuangMateri, mouseOverRuangTugas, mouseLeaveRuangTugas, mouseOverMasukKelas, mouseLeaveMasukKelas, displayCardSlidePembelajaran, displayColumnWhite, borderWrapp, bgColorWrapp, nameFile, mouseOverBtnDownload, mouseLeaveBtnDownload, classBtn, clickBtnDownload, bdrRadiusWrapp, matakuliah, hari, jamMasuk, jamKeluar, kodeDosen, kodeMTK, sks, noRuang, kelPraktek, kodeGabung, displayWrapp, displayIconZip, nameBtn, alignItemsSlidePembelajaran, paddingSlidePembelajaran, fontSlidePembelajaran, dateCreate, marginFontSlidePembelajaran, marginDateSlidePembelajaran, alignItemsBtnDownload, widthBtnDownload, displayIframeYoutube, linkEmbedYoutube, iconPdf, bgColorColumnRed, toPageForumDiskusi, nameAuthor, dateAuthor, displayColumnAuthor, justifyContentSlidePembelajaran, flexDirectionSlidePembelajaran, flexWrapSlidePembelajaran, bgColorBtnDownload, justifyContentFontSlidePembelajaran, colorDateSlidePembelajaran, bdrBottomWrapp, displayBtnFUnduhForumDiskusi, mouseEnterUnduhForumDisk, mouseLeaveUnduhForumDisk, unduhFileForumDisk, textAlignDateSlidePembelajaran, classBtnUnduhFile, displayBtnDelete, displayBtnDownload, message, displayMessage, displayImgAuthor, bgColorColumnKiri, paddingColumnKiri, bdrRadiusColumnKiri, marginColumnKiri, imgAuthor, colorNameFile, maxWidthColumnKiri, positionDateSlidePembelajaran, bottomDateSlidePembelajaran, rightDateSlidePembelajaran, boxShadowColumnKiri, btnDeleteRoomDiskusi }) {

    const styleWrapp = {
        display: displayWrapp,
        width: widthWrapp,
        margin: marginWrapp,
        border: borderWrapp,
        backgroundColor: bgColorWrapp,
        borderRadius: bdrRadiusWrapp,
        borderBottom: bdrBottomWrapp
    }

    const styleColumnRed = {
        display: displayColumnRed,
        backgroundColor: bgColorColumnRed
    }

    const styleColumnBtn = {
        display: displayColumnBtn
    }

    const styleListCard = {
        display: displayListCard
    }

    const styleInfoMatkul = {
        display: displayInfoMatkul
    }

    const styleWhiteCard = {
        display: displayColumnWhite,
        padding: paddingWhiteCard
    }

    const styleCardSlidePembelajaran = {
        display: displayCardSlidePembelajaran,
        alignItems: alignItemsSlidePembelajaran,
        padding: paddingSlidePembelajaran,
        justifyContent: justifyContentSlidePembelajaran,
        flexDirection: flexDirectionSlidePembelajaran,
        flexWrap: flexWrapSlidePembelajaran,
    }

    const styleFontSlidePembelajaran = {
        fontSize: fontSlidePembelajaran,
        margin: marginFontSlidePembelajaran,
        justifyContent: justifyContentFontSlidePembelajaran,
        color: colorNameFile
    }

    const styleDateSlidePembelajaran = {
        position: positionDateSlidePembelajaran,
        margin: marginDateSlidePembelajaran,
        color: colorDateSlidePembelajaran,
        textAlign: textAlignDateSlidePembelajaran,
        bottom: bottomDateSlidePembelajaran,
        right: rightDateSlidePembelajaran
    }

    const styleColumnBtnDownload = {
        display: displayBtnDownload,
        justifyContent: alignItemsBtnDownload,
        width: widthBtnDownload,
    }

    const styleIframeYoutube = {
        display: displayIframeYoutube
    }

    const styleKodeDosen = {
        color: kodeDosen !== undefined && kodeDosen !== ' ' ? '#222' : '#8796af'
    }

    const styleKodeMTK = {
        color: kodeMTK !== undefined && kodeMTK !== ' ' ? '#222' : '#8796af'
    }

    const styleSKS = {
        color: sks !== undefined && sks !== ' ' ? '#222' : '#8796af'
    }

    const styleNoRuang = {
        color: noRuang !== undefined && noRuang !== ' ' ? '#222' : '#8796af'
    }

    const styleKelPraktek = {
        color: kelPraktek !== undefined && kelPraktek !== ' ' ? '#222' : '#8796af'
    }

    const styleKodeGabung = {
        color: kodeGabung !== undefined && kodeGabung !== ' ' ? '#222' : '#8796af'
    }

    const styleIconZip = {
        display: displayIconZip
    }

    const styleBtnUnduhForumDiskusi = {
        display: displayBtnFUnduhForumDiskusi
    }

    const styleAuthorFormDiskus = {
        display: displayColumnAuthor
    }

    const styleBtnDelete = {
        display: displayBtnDelete
    }

    const styleMessage = {
        display: displayMessage
    }

    const styleImgAuthor = {
        display: displayImgAuthor
    }

    const styleColumnKiri = {
        backgroundColor: bgColorColumnKiri,
        padding: paddingColumnKiri,
        borderRadius: bdrRadiusColumnKiri,
        margin: marginColumnKiri,
        maxWidth: maxWidthColumnKiri,
        boxShadow: boxShadowColumnKiri
    }

    return (
        <>
            <div className="wrapp-card-jadwal" style={styleWrapp}>
                <div className="column-red-card" style={styleColumnRed}>
                    <p className="name-matkul">
                        {matakuliah}
                    </p>

                    <p className="jadwal-matkul">
                        {hari} - {jamMasuk}-{jamKeluar}
                    </p>
                </div>

                <div className="column-white-card" style={styleWhiteCard}>
                    <ul style={styleListCard}>
                        <li className='list-card' style={styleKodeDosen}>
                            <i className="fas fa-user"></i>
                            <span className="name-list">
                                Kode Dosen : {kodeDosen}
                            </span>
                        </li>
                        <li className='list-card' style={styleKodeMTK}>
                            <i className="fas fa-book-reader"></i>
                            <span className="name-list">
                                Kode MTK : {kodeMTK}
                            </span>
                        </li>
                        <li className='list-card' style={styleSKS}>
                            <i className="fas fa-clipboard-list"></i>
                            <span className="name-list">
                                SKS : {sks}
                            </span>
                        </li>
                        <li className='list-card' style={styleNoRuang}>
                            <i className="fas fa-map"></i>
                            <span className="name-list">
                                No Ruang : {noRuang}
                            </span>
                        </li>
                        <li className='list-card' style={styleKelPraktek}>
                            <i className="fas fa-user-friends"></i>
                            <span className="name-list">
                                Kel Praktek : {kelPraktek}
                            </span>
                        </li>
                        <li className='list-card' style={styleKodeGabung}>
                            <i className="fas fa-bookmark"></i>
                            <span className="name-list">
                                Kode Gabung : {kodeGabung}
                            </span>
                        </li>
                    </ul>

                    <div className="column-info-matkul" style={styleInfoMatkul}>
                        <i className={iconInfoMatkul}></i>

                        <div className="column-deskripsi-info-matkul">
                            <p className="title-info-matkul">
                                {titleInfoMatkul}
                            </p>
                            <label htmlFor="label" className="name-label-info-matkul">
                                {labelInfoMatkul}
                            </label>
                        </div>
                    </div>

                    <div className="column-btn-matkul" style={styleColumnBtn}>
                        <div className="body-btn-matkul">
                            <button className="btn-masuk-kelas" onClick={toPage}
                                onMouseOver={mouseOverMasukKelas}
                                onMouseLeave={mouseLeaveMasukKelas}
                            >
                                <p className="txt-masuk-kelas">
                                    Masuk Kelas
                                </p>

                                <div className="hover-black-masuk-kelas">

                                </div>
                            </button>
                            <button className="btn-blue-group btn-ruang-diskusi"
                                onClick={toPageForumDiskusi}
                                onMouseOver={mouseOverRuangDiskusi}
                                onMouseLeave={mouseLeaveRuangDiskusi}
                            >
                                <i className="fas fa-comments"></i>
                                <div className="hover-black-ruang-diskusi">

                                </div>
                            </button>
                            <button className="btn-blue-group btn-ruang-materi" onClick={toPageRuangMateri}
                                onMouseOver={mouseOverRuangMateri}
                                onMouseLeave={mouseLeaveRuangMateri}
                            >
                                <i className="fas fa-archive"></i>
                                <div className="hover-black-ruang-materi">

                                </div>
                            </button>
                            <button className="btn-blue-group btn-ruang-tugas" onClick={toPageRuangTugas}
                                onMouseOver={mouseOverRuangTugas}
                                onMouseLeave={mouseLeaveRuangTugas}
                            >
                                <i className="fas fa-archive"></i>
                                <div className="hover-black-ruang-tugas">

                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="container-card-slide-pembelajaran" style={styleCardSlidePembelajaran}>
                    <iframe className="video-yt-pembelajaran" src={linkEmbedYoutube} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="fullscreen" style={styleIframeYoutube}></iframe>

                    <img src={imgAuthor} alt="" className="img-author-chat-diskusi"
                        style={styleImgAuthor}
                    />

                    <div className="column-kiri-slide-pembelajaran" style={styleColumnKiri}>
                        <div className="circle-white-icon-zip" style={styleIconZip}>
                            <img src={iconPdf} alt="" className="img-icon-zip" />
                        </div>

                        <p className="name-file-materi" style={styleFontSlidePembelajaran}>
                            {nameFile}
                        </p>


                        <p className="message-komentar-diskusi" style={styleMessage}>
                            {message}
                        </p>

                        <p className="date-slide-pembelajaran" style={styleDateSlidePembelajaran}>
                            {dateCreate}
                        </p>

                        <div className="column-btn-unduh-file-forum-disk" style={styleBtnUnduhForumDiskusi}>
                            <Button
                                displayIcon="flex"
                                icon="fas fa-download"
                                fontSize="11px"
                                paddingBtn="5px 10px"
                                colorIcon="#fff"
                                nameBtn="Unduh File"
                                bdrRadius="2px"
                                bgColor="#1a538e"
                                bdrRadiusHoverBtn="3px"
                                mouseOver={mouseEnterUnduhForumDisk}
                                mouseleave={mouseLeaveUnduhForumDisk}
                                classBtn={classBtnUnduhFile}
                                click={unduhFileForumDisk}
                            />
                        </div>

                        <div className="column-author-forum-diskusi" style={styleAuthorFormDiskus}>
                            <p className="name-author author-forum-diskusi">
                                <i className="fas fa-at"></i>{nameAuthor}
                            </p>
                            <p className="date-author author-forum-diskusi">
                                <i className="fas fa-calendar-alt"></i>{dateAuthor}
                            </p>
                            <button className="btn-delete-form-diskusi author-forum-diskusi" style={styleBtnDelete}
                                onClick={btnDeleteRoomDiskusi}
                            >
                                <i className="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    </div>

                    <div className="column-btn-download-file" style={styleColumnBtnDownload}>
                        <Button
                            nameBtn={nameBtn}
                            bdrRadius="2px"
                            bgColor={bgColorBtnDownload}
                            bdrRadiusHoverBtn="3px"
                            mouseOver={mouseOverBtnDownload}
                            mouseleave={mouseLeaveBtnDownload}
                            classBtn={classBtn}
                            click={clickBtnDownload}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardJadwal;