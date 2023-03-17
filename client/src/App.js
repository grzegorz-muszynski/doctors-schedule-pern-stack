import { Route, Routes } from "react-router-dom";
import { Table } from "./components/Table";
import { Home } from './components/Home';
import { Visits } from './components/Visits';

export function App() {
    return (
        <Routes>
            <Route path="/" element={<Table />} />
            <Route path="/home" element={<Home />} />
            <Route path="/visits" element={<Visits />} />
        </Routes>
    )
}