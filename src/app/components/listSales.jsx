import { formatDate, formatNumber } from "@/lib/helpers";
import InvoiceStatus from "./invoiceStatus";
import { redirect } from "next/navigation";
import PaymentStatus from "./paymentStatus";

export default function ListSales({ sale, i }) {
  return (
    <tr>
      <th className="px-4 py-6 text-sm text-gray-600">{i}</th>
      <td className="px-4 py-6 text-sm text-gray-800">
        {formatDate(sale.createdAt)}
      </td>
      <td className="px-4 py-6 text-sm text-gray-800">{sale.invNumber}</td>
      <td className="px-4 py-6 text-sm text-gray-800">{sale.customer.name}</td>
      <td className="px-4 py-6 text-sm text-gray-800">
        {formatNumber(sale.total)}
      </td>
      <td className="px-4 py-6 text-sm text-gray-800">
        <PaymentStatus status={sale.paymentMethod} />
      </td>
      <td className="px-4 py-6 text-sm text-gray-800">
        <InvoiceStatus status={sale.paymentStatus} />
      </td>
      <td className="flex item-center px-4 py-6 text-sm text-gray-800">
        <div className="mr-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 cursor-pointer"
            onClick={() => redirect(`/inventory/sales/${sale.id}`)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </div>
      </td>
    </tr>
  );
}
