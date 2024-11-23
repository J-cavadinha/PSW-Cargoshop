import React from 'react';

import { BrowserRouter, Routes, Route, Link} from 'react-router-dom';

import MainPage from './main/mainPage';
import UserMain from './user/UserMain';
import ProductDetails from './purchase/ProductDetails';
import Sidebar from './main/Sidebar';

const App = () => {

return (

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
      </Routes>
      <footer className="py-3">&copy; 2024 CargoShop</footer>
    </div>
  </body>
</BrowserRouter>

);

};

export default App;
