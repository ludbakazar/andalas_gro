export default function PaymentStatus({ status }) {
  const getStatusText = (status) => {
    switch (status) {
      case "credit":
        return "HUTANG";
      case "cash":
        return "CASH";

      default:
        return status; // fallback untuk status yang tidak dikenal
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "credit":
        return "text-red-600 bg-red-100";
      case "cash":
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
