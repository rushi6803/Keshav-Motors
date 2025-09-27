import { Routes, Route } from "react-router-dom";
import InvoiceForm from "./components/InvoiceForm";
import InvoicePreview from "./components/InvoicePreview";

function App() {
  return (
    <Routes>
      <Route path="/" element={<InvoiceForm />} />
      <Route path="/preview" element={<InvoicePreview />} />
    </Routes>
  );
}

export default App;
