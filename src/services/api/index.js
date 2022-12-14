import GetDashboard from "./dashboard/get";
import DeleteRoomDiskusi from "./jadwalkuliah/deleteroomdiskusi";
import GetAllJadwalKuliah from "./jadwalkuliah/get";
import GetOneMatkul from "./jadwalkuliah/getonematkul";
import PostAbsenMhs from "./jadwalkuliah/postabsenmhs";
import PostKomentar from "./jadwalkuliah/postkomentar";
import PostRoomDiskusi from "./jadwalkuliah/postroomdiskusi";
import PostTugas from "./jadwalkuliah/posttugas";
import PutAuthKomentar from "./jadwalkuliah/putauthkomentar";
import GetLogoweb from "./logoweb/get";
import GetPanduan from "./panduan/get";
import DeleteTokendb from "./tokendb/delete";
import DeleteManyTokendb from "./tokendb/deletemany";
import GetTokendb from "./tokendb/get";
import PostTokendb from "./tokendb/post";
import GetVerifikasiToken from "./tokenverifikasi/get";
import GetUser from "./user/get";
import LoginUser from "./user/login";
import LupaPassword from "./user/lupapassword";
import PutEmailOnly from "./user/putEmailOnly";
import PutInformasiProfil from "./user/putInformasiProfil";
import PutPassword from "./user/putPassword";
import UbahPassword from "./user/ubahPassword";

// user
const APIGetUser = () => GetUser('v1/users/get')
const APIPutInformasiProfil = (id, data) => PutInformasiProfil(`v1/users/put/informasi-profil/${id}`, data)
const APIPutPassword = (id, data) => PutPassword(`v1/users/put/update-password/${id}`, data)
const APILogin = (data) => LoginUser('v1/users/login', data)
const APIPutEmailOnly = (id, data) => PutEmailOnly(`v1/users/put/informasi-profil/emailonly/${id}`, data)
const APILupaPassword = (data) => LupaPassword('v1/users/forgot-password', data)
const APIUbahPassword = (id, data) => UbahPassword(`v1/users/put/ubah-password/${id}`, data)

// dashboard
// API yang di auth dengan jwt
const APIGetDashboard = (token) => GetDashboard('v5/dashboard', token)

// logoweb
const APIGetLogoweb = () => GetLogoweb('v2/logoweb/get')

// panduan
const APIGetPanduan = () => GetPanduan('v3/panduan/get')

// jadwal-kuliah
const APIGetAllJadwalKuliah = () => GetAllJadwalKuliah('v4/jadwal-kuliah/get/matakuliah')
const APIGetOneMatkul = (path) => GetOneMatkul(`v4/jadwal-kuliah/get/matakuliah/one-matkul/${path}`)
const APIPostAbsenMhs = (_id, pertemuan, data) => PostAbsenMhs(`v4/jadwal-kuliah/post/matakuliah/jadwal-absen/absen-mhs/${_id}/${pertemuan}`, data)
const APIPostTugas = (id, data) => PostTugas(`v4/jadwal-kuliah/post/matakuliah/data-nilai-tugas/${id}`, data)
const APIPostKomentar = (_id, id, data) => PostKomentar(`v4/jadwal-kuliah/post/matakuliah/ruang-diskusi/komentar/${_id}/${id}`, data)
const APIPostRoomDiskusi = (_id, data) => PostRoomDiskusi(`v4/jadwal-kuliah/post/matakuliah/ruang-diskusi/${_id}`, data)
const APIDeleteRoomDiskusi = (_id, id) => DeleteRoomDiskusi(`v4/jadwal-kuliah/delete/matakuliah/ruang-diskusi/${_id}/${id}`)
const APIPutAuthKomentar = (nim, data) => PutAuthKomentar(`v4/jadwal-kuliah/put/matakuliah/ruang-diskusi/komentar/author/${nim}`, data)

// token verifikasi create new password
// API yang di auth dengan jwt
const APIGetVerifikasiToken = (token) => GetVerifikasiToken('v6/verifikasi-new-password/token-verifikasi', token)

// tokendb
const APIPostTokendb = (data)=> PostTokendb('v7/tokendb/post', data)
const APIDeleteManyTokendb = (data)=>DeleteManyTokendb('v7/tokendb/delete-many', data)
const APIDeleteTokendb = (data)=>DeleteTokendb('v7/tokendb/delete', data)
const APIGetTokendb = ()=>GetTokendb('v7/tokendb/get')

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