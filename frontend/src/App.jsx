import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Reorders from "./pages/Reorders";

import { useEffect } from "react";
import { toast } from "react-toastify";
import socket from "./socket";

import Notifications from "./pages/Notifications";


function App(){

    useEffect(() => {

    socket.on("low-stock", (data) => {

      console.log("Socket Event Received:", data);

toast.warning(
    `⚠ ${data.productName} is low in stock.\nCurrent Quantity: ${data.availableQuantity}`
);

    });

    return () => {
        socket.off("low-stock");
    };

}, []);

    return(

        <BrowserRouter>

            <MainLayout>

                <Routes>


                    <Route 
                    path="/" 
                    element={<Dashboard/>}
                    />


                    <Route 
                    path="/inventory" 
                    element={<Inventory/>}
                    />


                    <Route 
                    path="/reorders" 
                    element={<Reorders/>}
                    />

                    <Route
                path="/notifications"
                    element={<Notifications />}
/>


                </Routes>


            </MainLayout>


        </BrowserRouter>

    );

}


export default App;