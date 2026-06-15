import { Navigate, Route, Routes } from "react-router-dom";

import Header from "./components/Header";

import RFQList from "./pages/RFQList";
import CreateRFQ from "./pages/CreateRFQ";
import RFQDetails from "./pages/RFQDetails";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-8">
        <Routes>
          <Route path="/" element={<RFQList />} />

          <Route path="/rfqs/new" element={<CreateRFQ />} />

          <Route path="/rfqs/:id" element={<RFQDetails />} />

          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;