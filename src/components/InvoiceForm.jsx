import { useState } from "react";
import { useNavigate } from "react-router-dom";

function InvoiceForm() {
  const navigate = useNavigate();
  const [invoiceData, setInvoiceData] = useState({
    invoiceNo: "",
    date: `${String(new Date().getDate()).padStart(2,'0')}/${String(new Date().getMonth()+1).padStart(2,'0')}/${new Date().getFullYear()}`,
    partyName: "",
    vehicleName: "",
    vehicleNo: "",
    kilometer: "",
    mobileNo: "",
    paymentMode: "",
    items: [{ description: "", qty: 0, rate: 0, per: "pcs" }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData({ ...invoiceData, [name]: value });
  };

  const handleItemChange = (i, field, value) => {
    const newItems = [...invoiceData.items];
    newItems[i][field] = value;
    setInvoiceData({ ...invoiceData, items: newItems });
  };

  const addItem = () => {
    setInvoiceData({
      ...invoiceData,
      items: [...invoiceData.items, { description: "", qty: 0, rate: 0, }],
    });
  };

  const removeItem = (i) => {
    const newItems = invoiceData.items.filter((_, index) => index !== i);
    setInvoiceData({ ...invoiceData, items: newItems });
  };

  const goToPreview = () => {
    if (!invoiceData.invoiceNo) {
      alert("Please enter Invoice Number!");
      return;
    }
    navigate("/preview", { state: invoiceData });
  };

  const containerStyle = {
    maxWidth: "800px",
    margin: "30px auto",
    padding: "30px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const labelStyle = {
    display: "block",
    fontWeight: "bold",
    marginBottom: "5px",
    marginTop: "15px",
  };

  const inputStyle = {
    width: "100%",
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "14px",
  };

  const itemInputStyle = {
    padding: "6px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "14px",
    marginRight: "5px",
  };

  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px",
  };

  const removeBtnStyle = {
    padding: "6px 12px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Keshav Motors Invoice</h2>

      <label style={labelStyle}>Invoice Number:</label>
      <input
        name="invoiceNo"
        value={invoiceData.invoiceNo}
        onChange={handleChange}
        placeholder="Enter Invoice Number"
        style={inputStyle}
      />

      <label style={labelStyle}>Party Name:</label>
      <input name="partyName" value={invoiceData.partyName} onChange={handleChange} style={inputStyle} />

      <label style={labelStyle}>Vehicle Name:</label>
      <input name="vehicleName" value={invoiceData.vehicleName} onChange={handleChange} style={inputStyle} />

      <label style={labelStyle}>Vehicle No:</label>
      <input name="vehicleNo" value={invoiceData.vehicleNo} onChange={handleChange} style={inputStyle} />

      <label style={labelStyle}>Kilometer:</label>
      <input name="kilometer" value={invoiceData.kilometer} onChange={handleChange} style={inputStyle} />

      <label style={labelStyle}>Mobile No:</label>
      <input name="mobileNo" value={invoiceData.mobileNo} onChange={handleChange} style={inputStyle} />

      <label style={labelStyle}>Payment Mode:</label>
      <input name="paymentMode" value={invoiceData.paymentMode} onChange={handleChange} style={inputStyle} />

      <h3 style={{ marginTop: "25px" }}>Items</h3>
     <table border= "0" >
      <tr>
        <td style={{ width: "400px", verticalAlign: "top", fontWeight:"bold" }}>Description</td>
        <td style={{ width: "200px", verticalAlign: "top", fontWeight:"bold" }}>Quantity</td>
        <td style={{ width: "300px", verticalAlign: "top", fontWeight:"bold" }}>Rate</td>
      </tr>
      </table>
      {invoiceData.items.map((item, i) => (
        <div key={i} style={{ marginBottom: "10px", display: "flex", alignItems: "center" }}>
          <input
            placeholder="Description"
            value={item.description}
            onChange={(e) => handleItemChange(i, "description", e.target.value)}
            style={{ ...itemInputStyle, flex: 2 }}
          />
          <input
            type="number"
            placeholder="Qty"
            value={item.qty}
            onChange={(e) => handleItemChange(i, "qty", e.target.value)}
            style={{ ...itemInputStyle, flex: 1 }}
          />
          <input
            type="number"
            placeholder="Rate"
            value={item.rate}
            onChange={(e) => handleItemChange(i, "rate", e.target.value)}
            style={{ ...itemInputStyle, flex: 1 }}
          />
         
          <button type="button" onClick={() => removeItem(i)} style={removeBtnStyle}>
            Remove
          </button>
        </div>
      ))}

      <button onClick={addItem} style={{ ...buttonStyle, backgroundColor: "#28a745" }}>
        + Add Item
      </button>
      <br />
      <button onClick={goToPreview} style={buttonStyle}>
        Preview Invoice
      </button>
    </div>
  );
}

export default InvoiceForm;
