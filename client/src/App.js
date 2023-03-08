import { Route, Routes } from "react-router-dom";
import { Table } from "./components/Table";
import { Home } from './components/Home';
import { Doctors } from './components/Doctors';

export function App() {
    return (
        <Routes>
            <Route path="/" element={<Table />} />
            <Route path="/home" element={<Home />} />
            <Route path="/home/doctors" element={<Doctors />} />
        </Routes>
    )
}