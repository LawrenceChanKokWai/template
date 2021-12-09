import React from "react";
import ReactDOM from "react-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Navigation,
  Home,
  Blog,
  Posts,
  Post,
  Signup,
  Login,
  Users
 
  
} from "./components";

ReactDOM.render(
  <Router>

    
    <Navigation />


    <Routes>
      <Route path="/" element={<Home />} />

      
      <Route path="/signup" element={<Signup />} />
       <Route path="/login" element={<Login />} />
  
       <Route path="/users" element={<Users />} />
     
      <Route path="/blog" element={<Blog />}>
        <Route path="" element={<Posts />} />
        <Route path=":postSlug" element={<Post />} />
      </Route>
    </Routes>
  
  </Router>,


  document.getElementById("root")
);

serviceWorker.unregister();