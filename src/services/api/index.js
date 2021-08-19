import GetDashboard from "./dashboard/get";
import DeleteRoomDiskusi from "./jadwalkuliah/deleteroomdiskusi";
import GetAllJadwalKuliah from "./jadwalkuliah/get";
import GetOneMatkul from "./jadwalkuliah/getonematkul";
import PostAbsenMhs from "./jadwalkuliah/postabsenmhs";
import PostKomentar from "./jadwalkuliah/postkomentar";
import PostRoomDiskusi from "./jadwalkuliah/postroomdiskusi";
import PostTugas from "./jadwalkuliah/posttugas";
import GetLogoweb from "./logoweb/get";
import GetPanduan from "./panduan/get";
import GetUser from "./user/get";
import LoginUser from "./user/login";
import PutEmailOnly from "./user/putEmailOnly";
import PutInformasiProfil from "./user/putInformasiProfil";
import PutPassword from "./user/putPassword";

// user
const APIGetUser = () => GetUser('v1/users/get')
const APIPutInformasiProfil = (id, data) => PutInformasiProfil(`v1/users/put/informasi-profil/${id}`, data)
const APIPutPassword = (id, data) => PutPassword(`v1/users/put/update-password/${id}`, data)
const APILogin = (data) => LoginUser('v1/users/login', data)
const APIPutEmailOnly = (id, data) => PutEmailOnly(`v1/users/put/informasi-profil/emailonly/${id}`, data)

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
    APIDeleteRoomDiskusi
}

export default API;