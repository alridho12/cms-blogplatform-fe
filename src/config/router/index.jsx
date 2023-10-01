import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../../pages/Auth/Login';
import Register from '../../pages/Auth/Register';
import Pages404 from '../../pages/Pages404';
import Dashboard from '../../pages/Dashboard/Dashboard';
import CreateArticle from '../../pages/CRUD/CreateArticle';
import RequireAuth from '../../pages/Auth/RequireAuth';
import MyArticle from '../../pages/Dashboard/MyArticle';


const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RequireAuth><Dashboard /></RequireAuth>} />
          <Route path='/create' element={<RequireAuth><CreateArticle /></RequireAuth>} />
          <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
          <Route path="/myarticle" element={<RequireAuth><MyArticle /></RequireAuth>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/pages404" element={<Pages404 />} />
          {/* <Route
            path="/profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
