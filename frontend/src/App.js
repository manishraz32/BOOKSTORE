import './App.css';
import Footer from './components/Layout/Footer';
import Header from './components/Layout/Header';
import {Routes, Route} from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import Orders from './components/pages/Orders';
import ProductDetail from './components/pages/ProductDetail';
function App() {
  return (
    <div classname="w-[100vh]">
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/orders' element={<Orders/>}></Route>
        <Route path='/product-detail/:book_id' element={<ProductDetail/>}></Route>
      </Routes>
    </div>

  );
}

export default App;
