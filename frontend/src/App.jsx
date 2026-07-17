import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";

import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Reorders from "./pages/Reorders";
import Notifications from "./pages/Notifications";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import socket from "./socket";

function App() {

  useEffect(() => {
    socket.on("low-stock", (data) => {
      toast.warning(
        `⚠ ${data.productName} is low in stock.\nCurrent Quantity: ${data.availableQuantity}`
      );
    });

    return () => socket.off("low-stock");
  }, []);

  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/inventory" element={<Inventory />} />
                  <Route path="/reorders" element={<Reorders />} />
                  <Route path="/notifications" element={<Notifications />} />
                </Routes>
              </MainLayout>
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;