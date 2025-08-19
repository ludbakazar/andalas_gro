import { useState } from "react";

export default function TableInventory({ onTotalChange }) {
  const [qty, setQty] = useState(0);
  const [hargaBeli, setHargaBeli] = useState(0);
  const [total, setTotal] = useState(0);

  const handleQtyChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    const formattedValue = new Intl.NumberFormat("id-ID").format(value);
    e.target.value = formattedValue;
    setQty(Number(value));
    calculateTotal(Number(value), hargaBeli);
  };

  const handleHargaBeliChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    const formattedValue = new Intl.NumberFormat("id-ID").format(value);
    e.target.value = formattedValue;
    setHargaBeli(Number(value));
    calculateTotal(qty, Number(value));
  };

  const calculateTotal = (qty, hargaBeli) => {
    const newTotal = qty * hargaBeli;
    setTotal(newTotal);
    if (onTotalChange) {
      onTotalChange(newTotal);
    }
  };

  return (
    <>
      <tr className="border-b border-gray-200">
        <td className="p-3">
          <input
            placeholder="Kode"
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </td>
        <td className="p-3">
          <input
            placeholder="Nama Barang"
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </td>
        <td className="p-3">
          <input
            placeholder="Merk"
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </td>
        <td className="p-3">
          <input
            placeholder="Type"
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </td>
        <td className="p-3">
          <input
            placeholder="Uk"
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </td>
        <td className="p-3">
          <input
            type="text"
            placeholder="0"
            className="border border-gray-300 rounded-md p-2 w-full text-left"
            onKeyUp={handleQtyChange}
          />
        </td>
        <td className="p-3">
          <input
            type="text"
            placeholder="0"
            className="border border-gray-300 rounded-md p-2 w-full text-left"
            onKeyUp={handleHargaBeliChange}
          />
        </td>
        <td className="p-3 font-medium">
          {new Intl.NumberFormat("id-ID").format(total)}
        </td>
      </tr>
    </>
  );
}
