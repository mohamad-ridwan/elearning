import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/login/Login';
import Dashboard from './pages/dashboard/Dashboard';
import Navbar from './components/navbar/Navbar';
import Navmenu from './components/navmenu/Navmenu';
import IndexProvider from './services/context';
import Storage from './pages/storage/Storage';
import Profile from './pages/profile/Profile';
import JadwalKuliah from './pages/jadwalkuliah/JadwalKuliah';
import KuliahPengganti from './pages/kuliahpengganti/KuliahPengganti';
import Absensi from './pages/absensi/Absensi';
import RuangMateri from './pages/ruangmateri/RuangMateri';
import RuangTugas from './pages/ruangtugas/RuangTugas';

function App() {
  return (
    <div className="App">
      <IndexProvider>
        <BrowserRouter>
          <Navbar />
          <Navmenu />

          <Switch>

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

            <Route path='/storage/:id'>
              <Storage />
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
