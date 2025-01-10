import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import MainPage from './main/mainPage';
import UserMain from './menu/UserMain';
import ProductDetails from './purchase/ProductDetails';
import Sidebar from './main/Sidebar';
import SobreNos from './sidebar/SobreNos';
import Contato from './sidebar/Contatos';
import Pechincha from './menu/Pechincha';
import { Provider, useSelector } from 'react-redux';
import { store } from './store';
import MyProducts from './menu/MyProducts';
import ProductForm from './menu/AddProduct';
import Pedidos from './pedidos/Pedidos';
import PagamentosCard from "./pedidos/PagamentosCard";
import Sales from './menu/Sales';
import Purchases from './menu/Purchases';
import Review from './menu/Review';
import Reviews from './menu/Reviews';
import LoginForm from './users/LoginForm';

const App = () => {
  const status = useSelector(state => state.logins.status);
  const [showScreen, setShowScreen] = useState(null);
  
  useEffect(() => {
    if (status === "logged_in") {
      setShowScreen(
        <div className="d-flex">
          <h3 className="mx-2">
            <Link to="/pechinchas" className="text-decoration-none">💲</Link>
          </h3>
          <h3 className="mx-2">
            <Link to="/pedidos" className="text-decoration-none">🛍️</Link>
          </h3>
          <h3 className="mx-2">
            <Link to="/usuario" className="text-decoration-none">👤</Link>
          </h3>
        </div>
      );
    } else {
      setShowScreen(
        <div className="d-flex">
          <h3 className="mx-2">
            <Link to="/login" className="text-decoration-none">👤</Link>
          </h3>
        </div>
      );
    }
  }, [status]);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="container">
          <header className="d-flex justify-content-between align-items-center py-3 position-relative">
            <Sidebar />
            <h1 className="position-absolute start-50 translate-middle-x">
              <Link to="/" className="text-decoration-none text-body">CargoShop</Link>
            </h1>
            {showScreen}
          </header>

          <Routes>
            <Route path="/" element={<MainPage />}></Route>
            <Route path="/usuario" element={<UserMain />}></Route>
            <Route path="/produtos/:id" element={<ProductDetails />}></Route>
            <Route path="/sobrenos" element={<SobreNos />}></Route>
            <Route path="/contato" element={<Contato />}></Route>
            <Route path="/pechinchas" element={<Pechincha />}></Route>
            <Route path="/meusprodutos" element={<MyProducts />}></Route>
            <Route path="/vender" element={<ProductForm />}></Route>
            <Route path="/vender/:id" element={<ProductForm />}></Route>
            <Route path="/pedidos" element={<Pedidos />}></Route>
            <Route path="/pagamentosCard/:id" element={<PagamentosCard />}></Route>
            <Route path="/vendas" element={<Sales />}></Route>
            <Route path="/compras" element={<Purchases />}></Route>
            <Route path="/avaliacoes" element={<Reviews />}></Route>
            <Route path="/avaliar/:orderId" element={<Review />}></Route>
            <Route path="/avaliar/:orderId/:reviewId" element={<Review />}></Route>
            <Route path="/login" element={<LoginForm />}></Route>
          </Routes>
          <footer className="py-3 text-center">&copy; 2024 CargoShop </footer>
        </div>
      </BrowserRouter>
    </Provider>
  );

};

export default App;
