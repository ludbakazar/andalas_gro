"use client";

import TableInventory from "@/app/components/tableIventory";
import { useEffect, useState } from "react";

// const suppliers = [
//   "PT. Supplier Abadi Jaya",
//   "CV. Makmur Sentosa",
//   "UD. Sumber Rejeki",
//   "Toko Bangunan Jaya",
//   "Supplier Bahan Bangunan Prima",
// ];

export default function InboundPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState({
    id: null,
    name: "",
  });
  const [grandTotal, setGrandTotal] = useState(0);

  const [invoiceNumber, setInvoiceNumber] = useState("");

  const generateInvoiceNumber = (poType = "PO") => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const poNumber = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(5, "0");

    setInvoiceNumber(`${poType}-${year}${month}-${poNumber}`);
  };

  const fetchSupplier = async () => {
    try {
      const response = await fetch("/api/finances/suppliers");
      const data = await response.json();

      setSuppliers(data);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  const handleGrandTotalChange = ({ i, total }) => {
    setGrandTotal((prev) => ({ ...prev, [i]: total }));
  };

  useEffect(() => {
    generateInvoiceNumber();
    fetchSupplier();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm) {
        setIsDropdownOpen(true);
      } else {
        setIsDropdownOpen(false);
      }
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const gTot = Object.values(grandTotal).reduce((sum, val) => sum + val, 0);

  return (
    <div className="bg-gray-100 min-h-screen p-6 sm:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <a
              href="/"
              className="rounded-full border-2 border-blue-500 text-blue-500 px-6 py-2 hover:bg-blue-500 hover:text-white transition-colors duration-300"
            >
              Kembali
            </a>
          </div>

          <div className="flex flex-col bg-white rounded-lg shadow-lg p-8 mt-4">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              PEMBELIAN BARANG
            </h2>
            <div className="flex flex-col mt-4">
              <div className="rounded-2xl shadow-xl p-6 bg-white divide-y divide-gray-200">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="grid gap-2">
                    <label className="text-sm font-medium text-gray-700">
                      Tanggal
                    </label>
                    <input
                      type="date"
                      className={`border-2 border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200 text-gray-500 cursor-not-allowed`}
                      defaultValue={new Date().toISOString().split("T")[0]}
                      readOnly
                      disabled
                    />
                  </div>

                  <div className="grid gap-2">
                    <label className="text-sm font-medium text-gray-700">
                      No. Faktur
                    </label>
                    <input
                      placeholder="Nomor Faktur"
                      className="border-2 border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200 text-gray-500 cursor-not-allowed"
                      value={invoiceNumber}
                      readOnly
                      disabled
                    />
                  </div>

                  <div className="grid gap-2 relative">
                    <label className="text-sm font-medium text-gray-700">
                      Supplier
                    </label>
                    <div className="relative">
                      <input
                        placeholder="Pilih / cari supplier"
                        className="border-2 border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={selectedSupplier.name || searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                          setSelectedSupplier({ id: null, name: "" });
                          setIsDropdownOpen(true);
                        }}
                        onFocus={() => setIsDropdownOpen(true)}
                        onBlur={() =>
                          setTimeout(() => setIsDropdownOpen(false), 400)
                        }
                      />
                      {isDropdownOpen && filteredSuppliers.length > 0 && (
                        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 border border-gray-200 max-h-60 overflow-auto">
                          {filteredSuppliers.map((supplier) => (
                            <div
                              key={supplier.id}
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                              onMouseDown={() => {
                                setSelectedSupplier(supplier);
                                setSearchTerm("");
                                setIsDropdownOpen(false);
                              }}
                            >
                              {supplier.name} {/* Display supplier name */}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {/* Hidden input to store supplier ID for form submission */}
                    <input
                      type="hidden"
                      name="supplier_id"
                      value={selectedSupplier.id || ""}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col mt-6">
              <div className="rounded-2xl shadow-xl p-6 bg-white divide-y divide-gray-200">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  Daftar Barang
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="p-3 text-left text-sm font-medium text-gray-700 w-30">
                          Kode Barang
                        </th>
                        <th className="p-3 text-left text-sm font-medium text-gray-700 w-45">
                          Nama
                        </th>
                        <th className="p-3 text-left text-sm font-medium text-gray-700 w-45">
                          Merk
                        </th>
                        <th className="p-3 text-left text-sm font-medium text-gray-700 w-45">
                          Type
                        </th>
                        <th className="p-3 text-left text-sm font-medium text-gray-700 w-20">
                          Ukuran
                        </th>
                        <th className="p-3 text-left text-sm font-medium text-gray-700 w-20">
                          Qty
                        </th>
                        <th className="p-3 text-left text-sm font-medium text-gray-700 w-45">
                          Harga Beli
                        </th>
                        <th className="p-3 text-left text-sm font-medium text-gray-700">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from({ length: 10 }).map((_, index) => (
                        <TableInventory
                          key={index}
                          onTotalChange={handleGrandTotalChange}
                          i={index}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* <div className="flex gap-4 mt-4">
                  <button className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-md px-4 py-2 transition-colors">
                    + Tambah Barang
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 text-white rounded-md px-4 py-2 transition-colors">
                    Hapus Baris
                  </button>
                </div> */}
                <div className="rounded-2xl shadow p-4 w-full md:w-1/3 ml-auto mt-6 bg-white">
                  <div className="flex justify-between font-bold text-lg  pt-2">
                    <span>Total</span>
                    <span>{gTot.toLocaleString("id-ID")}</span>
                  </div>
                </div>
                <div className="flex gap-4 justify-end mt-8">
                  <button className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-200 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    Batal
                  </button>

                  <button className="px-6 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    Simpan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
