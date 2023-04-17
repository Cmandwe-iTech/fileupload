// import logo from './logo.svg';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import ContextProvider from './component/contextAPI/contextProvider';
import Login from './component/Login/login';
import Register from './component/Register/Register';
import Upload from './component/File/Upload';
import HomePage from './component/File/Home';
function App() {
  return (
    <div className="App">
      {/* <Login /> */}
      <ContextProvider>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Register/>}/>
          <Route path='/home' element={<HomePage/>}/>
          <Route path='/upload' element={<Upload/>}/>
        </Routes>
      </ContextProvider>



    </div>
  );
}

export default App;
