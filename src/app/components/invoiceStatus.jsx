export default function InvoiceStatus({ status }) {
  const getStatusText = (status) => {
    switch (status) {
      case "unpaid":
        return "TAGIHAN KOSONG";
      case "halfPaid":
        return "SETENGAH BAYAR";
      case "paidOff":
        return "LUNAS";
      default:
        return status; // fallback untuk status yang tidak dikenal
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "unpaid":
        return "text-red-600 bg-red-100";
      case "halfPaid":
        return "text-yellow-600 bg-yellow-100";
      case "paidOff":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-md font-medium ${getStatusColor(
        status
      )}`}
    >
      {getStatusText(status)}
    </span>
  );
}
