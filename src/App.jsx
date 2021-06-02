import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/login/Login';
import Dashboard from './pages/dashboard/Dashboard';
import Navbar from './components/navbar/Navbar';
import Navmenu from './components/navmenu/Navmenu';
import IndexProvider from './services/context';

function App() {
  return (
    <div className="App">
      <IndexProvider>
        <BrowserRouter>
          <Navbar />
          <Navmenu />

          <Switch>
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
