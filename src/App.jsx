import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/login/Login';
import Dashboard from './pages/dashboard/Dashboard';
import Navbar from './components/navbar/Navbar';
import Navmenu from './components/navmenu/Navmenu';
import IndexProvider from './services/context';
import Profile from './pages/profile/Profile';
import JadwalKuliah from './pages/jadwalkuliah/JadwalKuliah';
import KuliahPengganti from './pages/kuliahpengganti/KuliahPengganti';
import Absensi from './pages/absensi/Absensi';
import RuangMateri from './pages/ruangmateri/RuangMateri';
import RuangTugas from './pages/ruangtugas/RuangTugas';
import SendTugas from './pages/sendtugas/SendTugas';
import ForumDiskusi from './pages/forumdiskusi/ForumDiskusi';
import KomentarDiskusi from './pages/komentardiskusi/KomentarDiskusi';
import PrintTable from './pages/printtable/PrintTable';
import DetailDeskripsi from './pages/detaildeskripsi/DetailDeskripsi';
import ForgotPassword from './pages/forgotpassword/ForgotPassword';
import CreateNewPassword from './pages/createnewpassword/CreateNewPassword';
import EnterToken from './pages/entertoken/EnterToken';

function App() {
  return (
    <div className="App">
      <IndexProvider>
        <BrowserRouter>
          <Navbar />
          <Navmenu />

          <Switch>

            <Route path='/verifikasi-create-new-password'>
              <EnterToken />
            </Route>

            <Route path='/create-new-password'>
              <CreateNewPassword />
            </Route>

            <Route path='/forgot-password'>
              <ForgotPassword />
            </Route>

            <Route path='/ruang-materi/video-pembelajaran/detail-deskripsi/:id/:id'>
              <DetailDeskripsi />
            </Route>

            <Route path='/print-table/:id'>
              <PrintTable />
            </Route>

            <Route path='/forum-diskusi/komentar/:pembahasan/:id/:_id'>
              <KomentarDiskusi />
            </Route>

            <Route path='/forum-diskusi/:id'>
              <ForumDiskusi />
            </Route>

            <Route path='/ruang-tugas/send/:id/:id'>
              <SendTugas />
            </Route>

            <Route path='/ruang-tugas/:id'>
              <RuangTugas />
            </Route>

            <Route path='/ruang-materi/:id'>
              <RuangMateri />
            </Route>

            <Route path='/absensi/:id'>
              <Absensi />
            </Route>

            <Route path='/kuliah-pengganti'>
              <KuliahPengganti />
            </Route>

            <Route path='/jadwal-kuliah'>
              <JadwalKuliah />
            </Route>

            <Route path='/profile'>
              <Profile />
            </Route>

            <Route path='/login'>
              <Login />
            </Route>

            <Route path='/'>
              <Dashboard />
            </Route>

          </Switch>
        </BrowserRouter>
      </IndexProvider>
    </div>
  );
}

export default App;
