import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Routes, Route, Link} from 'react-router-dom';

import MainPage from './main/mainPage';
import UserMain from './user/UserMain';
import ProductDetails from './purchase/ProductDetails';
import Sidebar from './main/Sidebar';
import SobreNos from './sidebar/SobreNos';
import Contato from './sidebar/Contatos';
import PerfilPage from './user/PerfilPage';
import Pechincha from './user/Pechincha';
import { Provider } from 'react-redux';
import { store } from './store';
import Pedidos from './Pedidos/Pedidos';

const App = () => {

return (
<Provider store={store}>
<BrowserRouter>
  <body>
    <div className="container">
      <header className="d-flex justify-content-between align-items-center py-3">
      <Sidebar />
        <h1><Link to="/" style={{color: "#000000", textDecoration: "none"}}>CargoShop</Link></h1>
        <div>
          <span className="user-icon"><h3><Link to="/usuario" style={{textDecoration: "none"}}>👤</Link></h3></span>
        </div>
      </header>
      <Routes>
        <Route path="/" element={<MainPage/>}></Route>
        <Route path="/usuario" element={<UserMain/>}></Route>
        <Route path="/produtos/:id" element={<ProductDetails />}></Route>
        <Route path="/sobrenos" element={<SobreNos />}></Route>
        <Route path="/contato" element={<Contato />}></Route>
        <Route path="/perfil" element={<PerfilPage/>}></Route>
        <Route path="/pechinchas" element={<Pechincha/>}></Route>
        <Route exact path="/" component={<UserMain/>}></Route>
        <Route path="/Pedidos" element={<Pedidos/>}></Route>

      </Routes>
      <footer className="py-3">&copy; 2024 CargoShop</footer>
    </div>
  </body>
</BrowserRouter>
</Provider>
);

};

export default App;
