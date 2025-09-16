import { formatNumber } from "@/lib/helpers";

export default function ListCustomerDebt({ customer, index }) {
  const calculateSisa = (debtAmount, paidAmount) => {
    return debtAmount - paidAmount;
  };
  return (
    <tr>
      <th className="px-4 py-6 text-sm text-gray-600">{index}</th>
      <td className="px-4 py-6 text-sm text-gray-800">{customer.name}</td>
      {/* <td className="px-4 py-6 text-sm text-gray-800">
        {formatNumber(customer.customerDebts.debtAmount)}
      </td> */}
      <td className="px-4 py-6 text-sm text-gray-800">
        {formatNumber(
          calculateSisa(
            customer.customerDebts.debtAmount,
            customer.customerDebts.debtPaid
          )
        )}
      </td>
      {/* <td className="px-4 py-6 text-sm text-gray-800">
        {formatNumber(customer.customerDebts?.claimAmount)}
      </td> */}
    </tr>
  );
}
