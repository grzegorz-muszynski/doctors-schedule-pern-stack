import { Route, Routes } from "react-router-dom";
import { Table } from "./components/Table";
import { Home } from './components/Home';
import { Visits } from './components/Visits';

export function App() {
    return (
        <Routes>
            <Route exact path="/" element={<Table />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/visits" element={<Visits />} />
        </Routes>
    )
}