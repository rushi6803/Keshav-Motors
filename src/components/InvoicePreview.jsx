import { useLocation } from "react-router-dom";
import qr from "./QR.jpg";

function InvoicePreview() {
  const { state } = useLocation();
  const total = state.items.reduce((acc, item) => acc + item.qty * item.rate, 0);

  // Add empty rows to make table at least 12 rows
  const totalRows = 10;
  const emptyRows = totalRows - state.items.length > 0 ? totalRows - state.items.length : 0;

  return (
    <div
      style={{
        width: "210mm",
        minHeight: "297mm",
        margin: "0px",
        padding: "0px",
        border: "0px solid black",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Header */}
      <h1 style={{ textAlign: "center", marginBottom: "2px" }}>Keshav Motors</h1>
      <p style={{ textAlign: "center", margin: "2px" }}>
        Sanket Patel: +91-9104213009<br />
        GF-15 Astha-2 Complex, Madhav School Road, Metro Pillar No: 156, Vastral, Ahmedabad
      </p>

      {/* Party Details Table */}
      <table
        border="1"
        cellPadding="5"
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px", marginBottom: "20px" }}
      >
        <tbody>
          <tr>
            <td><strong>Invoice No:</strong> {state.invoiceNo}</td>
            <td><strong>Date:</strong> {state.date}</td>
          </tr>
          <tr>
            <td><strong>Party Name:</strong> {state.partyName}</td>
            <td><strong>Mobile No:</strong> {state.mobileNo}</td>
          </tr>
          <tr>
            <td><strong>Vehicle Name:</strong> {state.vehicleName}</td>
            <td><strong>Vehicle No:</strong> {state.vehicleNo}</td>
          </tr>
          <tr>
            <td><strong>Kilometer:</strong> {state.kilometer} km</td>
            <td><strong>Payment Mode:</strong> {state.paymentMode}</td>
          </tr>
        </tbody>
      </table>

      {/* Items Table */}
      <table border="1" cellPadding="5" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ width: "5%", textAlign: "center" }}>Sr. No.</th>
            <th style={{ width: "55%" }}>Description</th>
            <th style={{ width: "10%", textAlign: "center" }}>Qty</th>
            <th style={{ width: "10%", textAlign: "right" }}>Rate</th>
            <th style={{ width: "10%", textAlign: "right" }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {state.items.map((item, i) => (
            <tr key={i}>
              <td style={{ textAlign: "center" }}>{i + 1}</td>
              <td>{item.description}</td>
              <td style={{ textAlign: "center" }}>{item.qty}</td>
              <td style={{ textAlign: "right" }}>{item.rate}</td>
              <td style={{ textAlign: "right" }}>{item.qty * item.rate}</td>
            </tr>
          ))}

          {/* Empty Rows */}
          {Array.from({ length: emptyRows }).map((_, i) => (
            <tr key={`empty-${i}`}>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
          ))}

          {/* Total Row */}
          <tr>
            <td colSpan="4" style={{ textAlign: "right", fontWeight: "bold" }}>Total</td>
            <td style={{ fontWeight: "bold", textAlign: "right" }}>₹ {total.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      {/* Remarks & Bank Details Table */}
      <table
        border="1"
        cellPadding="5"
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "22px", fontSize: "12px" }}
      >
        <tbody>
          <tr>
            <td style={{ width: "50%", verticalAlign: "top" }}>
              <strong>Remarks:</strong><br />
              Next Service Due on 10,000 km or 1 Year from invoice date
            </td>
            <td style={{ width: "50%", verticalAlign: "top", textAlign: "left" }}>
              <strong>From Keshav Motors</strong>
            </td>
          </tr>
          <tr>
            <td style={{ width: "50%", verticalAlign: "top" }}>
              <strong>Declaration:</strong><br />
              We declare that this invoice shows actual price of goods described and that all particulars are true and correct.
            </td>
            <td style={{ width: "50%", verticalAlign: "top", textAlign: "left" }}>
              <strong>Company's Bank Details:</strong><br />
              Bank Name: Kotak Mahindra<br />
              A/C No: 2749426875<br />
              Branch & IFSC: ODHAV & KKBK0002563<br />
              UPI ID: kaneriyasanket6377-1@oksbi<br /><br />
              <img
                src={qr}
                alt="QR Code"
                style={{ width: "100px", height: "100px" }}
              />
            </td>
          </tr>
        </tbody>
      </table>

      {/* Jurisdiction */}
      <p style={{ textAlign: "center", marginTop: "0px", fontWeight: "bold" }}>
        SUBJECT TO AHMEDABAD JURISDICTION
      </p>

      {/* Print Button */}
      <div style={{ marginTop: "10px", textAlign: "center" }}>
        <button onClick={() => window.print()}>Print</button>
      </div>
    </div>
  );
}

export default InvoicePreview;
