import { useState } from "react";

export default function TableInventory({ onTotalChange, i, setItems }) {
  const [qty, setQty] = useState(0);
  const [hargaBeli, setHargaBeli] = useState(0);
  const [total, setTotal] = useState(0);

  const handleQtyChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    const formattedValue = new Intl.NumberFormat("id-ID").format(value);
    e.target.value = formattedValue;
    setQty(Number(value));
    calculateTotal(Number(value), hargaBeli);
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[i] = { ...updatedItems[i], qty: Number(value) };
      return updatedItems;
    });
  };

  const handleHargaBeliChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    const formattedValue = new Intl.NumberFormat("id-ID").format(value);
    e.target.value = formattedValue;
    setHargaBeli(Number(value));
    calculateTotal(qty, Number(value));
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[i] = { ...updatedItems[i], basicPrice: Number(value) };
      return updatedItems;
    });
  };

  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[i] = { ...updatedItems[i], [name]: value };
      return updatedItems;
    });
  }

  const calculateTotal = (qty, hargaBeli) => {
    const newTotal = qty * hargaBeli;
    setTotal(newTotal);

    if (onTotalChange) {
      onTotalChange({ i, total: newTotal });
    }
  };

  return (
    <>
      <tr className="border-b border-gray-200">
        <td className="p-3">
          <input
            placeholder="Kode"
            name="code"
            className="border border-gray-300 rounded-md p-2 w-full"
            onChange={handleChange}
          />
        </td>
        <td className="p-3">
          <input
            placeholder="Nama Barang"
            name="name"
            className="border border-gray-300 rounded-md p-2 w-full"
            onChange={handleChange}
          />
        </td>
        <td className="p-3">
          <input
            placeholder="Merk"
            name="brand"
            className="border border-gray-300 rounded-md p-2 w-full"
            onChange={handleChange}
          />
        </td>
        <td className="p-3">
          <input
            placeholder="Type"
            name="type"
            className="border border-gray-300 rounded-md p-2 w-full"
            onChange={handleChange}
          />
        </td>
        <td className="p-3">
          <input
            placeholder="Uk"
            name="size"
            className="border border-gray-300 rounded-md p-2 w-full"
            onChange={handleChange}
          />
        </td>
        <td className="p-3">
          <select
            name="unit"
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
            onChange={handleChange}
          >
            <option value="BUAH">BUAH</option>
            <option value="SET">SET</option>
            <option value="PSG">PSG</option>
            <option value="STEL">STEL</option>
            <option value="TBG">TBG</option>
            <option value="KTK">KTK</option>
            <option value="PCS">PCS</option>
            <option value="BTL">BTL</option>
          </select>
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
