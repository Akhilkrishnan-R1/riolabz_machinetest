import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import Navbar from './components/Navbar';
import ProductDetails from './pages/ProductDetails';
import ProductList from './pages/ProductList';

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path='/' element={<ProductList/>}/>
        <Route path='/product/:id' element={<ProductDetails/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
