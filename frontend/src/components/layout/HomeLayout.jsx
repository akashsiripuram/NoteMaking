import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

export default function HomeLayout(){
    return(
        <div>
            <Navbar/>
            <Outlet/>

        </div>
    )
}