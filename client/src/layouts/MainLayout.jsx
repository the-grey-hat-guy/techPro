import { Outlet } from "react-router-dom"
import NavBar from '../componets/NavBar'
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';

function MainLayout() {
  return (
    <>
    <NavBar/>
    <Outlet/>
    <ToastContainer/>
    </>
  )
}

export default MainLayout