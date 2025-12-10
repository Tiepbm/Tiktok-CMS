import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./layout/AdminLayout";
import Dashboard from "./pages/Dashboard";
import List from "./pages/articles/List";
import Create from "./pages/articles/Create";
import Edit from "./pages/articles/Edit";

export default function App() {
  return (
    <BrowserRouter>
      <AdminLayout>
        <Routes>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/articles" element={<List />} />
          <Route path="/admin/articles/create" element={<Create />} />
          <Route path="/admin/articles/:id/edit" element={<Edit />} />
        </Routes>
      </AdminLayout>
    </BrowserRouter>
  );
}