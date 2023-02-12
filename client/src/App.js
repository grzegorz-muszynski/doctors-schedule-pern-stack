import { Route, Routes } from "react-router-dom";
import { Table } from "./components/Table";
import { Home } from './components/Home';

export function App() {
    return (
        <Routes>
            <Route path="/" element={<Table />} />
            <Route path="/home" element={<Home />} />
        </Routes>
    )
}