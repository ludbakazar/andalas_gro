import { formatNumber } from "@/lib/helpers";

export default function ListDebtSupplier({ supplier, index }) {
  const calculateSisa = (debtAmount, paidAmount) => {
    return debtAmount - paidAmount;
  };
  return (
    <tr>
      <th className="px-4 py-6 text-sm text-gray-600">{index}</th>
      <td className="px-4 py-6 text-sm text-gray-800">{supplier.name}</td>
      <td className="px-4 py-6 text-sm text-gray-800">
        {formatNumber(supplier.supplierDebts.debtAmount)}
      </td>
      <td className="px-4 py-6 text-sm text-gray-800">
        {formatNumber(
          calculateSisa(
            supplier.supplierDebts.debtAmount,
            supplier.supplierDebts.debtPaid
          )
        )}
      </td>
      <td className="px-4 py-6 text-sm text-gray-800">
        {formatNumber(supplier.supplierDebts?.claimAmount)}
      </td>
    </tr>
  );
}
