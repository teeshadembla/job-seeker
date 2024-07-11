import React,{useEffect,useContext} from 'react';
import './App.css';
import {Context} from "./main";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Navbar from "./components/Layout/navbar";
import Footer from "./components/Layout/footer";
import Home from "./components/Home/Home";
import Jobs from "./components/Job/Jobs";
import JobDetails from "./components/Job/JobDetails";
import MyJobs from "./components/Job/MyJobs";
import PostJob from "./components/Job/PostJob";
import Application from "./components/Application/Application";
import MyApplications from "./components/Application/MyApplications";
import NotFound from "./components/NotFound/Notfound";
import axios from 'axios';
import {Toaster} from 'react-hot-toast';

const App = () =>{
  const {isAuthorized, setIsAuthorized, setUser } = useContext(Context);

  useEffect(()=>{
    const fetchUser = async() =>{
      try{
        const response =await axios.get("http://localhost:4000/api/v1/user/getUser",{withCredentials: true});
        setUser(response.data.user);
        setIsAuthorized(true);
      }catch(error){
        setIsAuthorized(false);
      }
    };
    fetchUser();
  },[isAuthorized]);

  return(
  <>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/"  element={<Home/>} />
        <Route path="/job/allJobs" element={<Jobs/>} />
        <Route path="/job/:id"  element={<JobDetails/>} />
        <Route path="/job/me" element={<MyJobs/>} />
        <Route path="/job/newJob"  element={<PostJob/>} />
        <Route path="/application/:id"  element={<Application/>} />
        <Route path="/application/me" element={<MyApplications/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
      <Footer/>
      <Toaster />
    </BrowserRouter>
  </>
  );
};

export default App 