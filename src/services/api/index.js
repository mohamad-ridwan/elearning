import useFetch from "./useFetch";

// user
const APIGetUser = () => useFetch('v1/users/get', 'GET')
const APIPutInformasiProfil = (id, data) => useFetch(`v1/users/put/informasi-profil/${id}`, 'PUT', undefined, data)
const APIPutPassword = (id, data) => useFetch(`v1/users/put/update-password/${id}`, 'PUT', undefined, data)
const APILogin = (data) => useFetch('v1/users/login', 'POST', undefined, data)
const APIPutEmailOnly = (id, data) => useFetch(`v1/users/put/informasi-profil/emailonly/${id}`, 'PUT', undefined, data)
const APILupaPassword = (data) => useFetch('v1/users/forgot-password', 'POST', undefined, data)
const APIUbahPassword = (id, data) => useFetch(`v1/users/put/ubah-password/${id}`, 'PUT', undefined, data)

// dashboard
// API yang di auth dengan jwt
const APIGetDashboard = (token) => useFetch('v5/dashboard', 'GET', token)

// logoweb
const APIGetLogoweb = () => useFetch('v2/logoweb/get', 'GET')

// panduan
const APIGetPanduan = () => useFetch('v3/panduan/get', 'GET')

// jadwal-kuliah
const APIGetAllJadwalKuliah = () => useFetch('v4/jadwal-kuliah/get/matakuliah', 'GET')
const APIGetOneMatkul = (path) => useFetch(`v4/jadwal-kuliah/get/matakuliah/one-matkul/${path}`, 'GET')
const APIPostAbsenMhs = (_id, pertemuan, data) => useFetch(`v4/jadwal-kuliah/post/matakuliah/jadwal-absen/absen-mhs/${_id}/${pertemuan}`, 'POST', undefined, data)
const APIPostTugas = (id, data) => useFetch(`v4/jadwal-kuliah/post/matakuliah/data-nilai-tugas/${id}`, 'POST', undefined, data)
const APIPostKomentar = (_id, id, data) => useFetch(`v4/jadwal-kuliah/post/matakuliah/ruang-diskusi/komentar/${_id}/${id}`, 'POST', undefined, data)
const APIPostRoomDiskusi = (_id, data) => useFetch(`v4/jadwal-kuliah/post/matakuliah/ruang-diskusi/${_id}`, 'POST', undefined, data)
const APIDeleteRoomDiskusi = (_id, id) => useFetch(`v4/jadwal-kuliah/delete/matakuliah/ruang-diskusi/${_id}/${id}`, 'DELETE')
const APIPutAuthKomentar = (nim, data) => useFetch(`v4/jadwal-kuliah/put/matakuliah/ruang-diskusi/komentar/author/${nim}`, 'PUT', undefined, data)

// token verifikasi create new password
// API yang di auth dengan jwt
const APIGetVerifikasiToken = (token) => useFetch('v6/verifikasi-new-password/token-verifikasi', 'GET', token)

// tokendb
const APIPostTokendb = (data)=> useFetch('v7/tokendb/post', 'POST', undefined, data)
const APIDeleteManyTokendb = (data)=>useFetch('v7/tokendb/delete-many', 'DELETE', undefined, data)
const APIDeleteTokendb = (data)=>useFetch('v7/tokendb/delete', 'DELETE', undefined, data)
const APIGetTokendb = ()=>useFetch('v7/tokendb/get', 'GET')

const API = {
    APIGetUser,
    APIGetLogoweb,
    APIGetPanduan,
    APIPutInformasiProfil,
    APIPutPassword,
    APIGetAllJadwalKuliah,
    APIGetOneMatkul,
    APIPostAbsenMhs,
    APILogin,
    APIGetDashboard,
    APIPutEmailOnly,
    APIPostTugas,
    APIPostKomentar,
    APIPostRoomDiskusi,
    APIDeleteRoomDiskusi,
    APILupaPassword,
    APIGetVerifikasiToken,
    APIUbahPassword,
    APIPutAuthKomentar,
    APIPostTokendb,
    APIDeleteManyTokendb,
    APIDeleteTokendb,
    APIGetTokendb
}

export default API;