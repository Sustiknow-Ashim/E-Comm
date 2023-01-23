import './App.css'
import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from './Screen/HomeScreen';
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom'
import ProductScreen from './Screen/ProductScreen';
import CartScreen from './Screen/CartScreen';
import LoginScreen from './Screen/LoginScreen';
import RegisterScreen from './Screen/RegisterScreen';
import ProfileScreen from './Screen/ProfileScreen';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Container>
          <Routes>
            <Route path='/' element={<HomeScreen />} exact />
            <Route path='/product/:id' element={<ProductScreen />} />
            <Route path='/cart' element={<CartScreen />} >
              <Route path='/cart/:id' element={<CartScreen />} />
            </Route>
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />
            <Route path='*' element={<h2>Not Found</h2>} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
