import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import ErrorPage from './Pages/errorPage'
import SignUp from './Pages/signup';
import Login from './Pages/login';
import AddStudent from './Pages/addStudent';
import Student from './Pages/studentPage'
import Header from './components/header';


function App() {
  return (

    <div className="App">

      <BrowserRouter>
        <Header />
        <div className='route'>
          <Routes>
            {/* <Route path='/' element={<Home />} /> */}

            <Route path='/' element={<Login />} />
            <Route path='signup' element={<SignUp />} />
            <Route path='addStudent' element={
              localStorage.getItem("token") ?
                <AddStudent /> : <Login />
            } />
            <Route path='getStudent' element={
              localStorage.getItem("token") ?
                <Student /> : <Login />
            } />
            <Route path='*' element={<ErrorPage />} />

          </Routes>
        </div>
      </BrowserRouter>

    </div>
  );
}

export default App;
