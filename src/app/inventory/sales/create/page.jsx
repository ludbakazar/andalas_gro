"use client";

import TabelSales from "@/app/components/tableSales";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function InboundPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [customer, setCustomer] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState({
    id: null,
    name: "",
  });

  const [selectedProducts, setSelectedProducts] = useState([
    {
      id: null,
      qty: 0,
      basicPrice: 0,
      sellingPrice: 0,
    },
  ]);
  const [grandTotal, setGrandTotal] = useState(0);
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const getCurrentDate = () => {
    return new Date().toISOString().split("T")[0];
  };

  const generateInvoiceNumber = (poType = "SO") => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");
    const poNumber = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(5, "0");

    setInvoiceNumber(`${poType}-${year}${month}${day}-${poNumber}`);
  };

  const fetchCustomers = async () => {
    try {
      const response = await fetch("/api/customers");
      const data = await response.json();

      setCustomer(data);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  const handleGrandTotalChange = ({ i, total }) => {
    setGrandTotal((prev) => ({ ...prev, [i]: total }));
  };

  useEffect(() => {
    generateInvoiceNumber();
    fetchCustomers();
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

  const filteredCustomer = customer.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const gTot = Object.values(grandTotal).reduce((sum, val) => sum + val, 0);

  const submitPo = async () => {
    const data = {
      customerId: selectedCustomer.id,
      date: getCurrentDate(),
      invoiceNumber,
      items: selectedProducts,
      paymentMethod,
      total: gTot,
    };

    try {
      const response = await fetch("/api/inventory/sales", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit purchase order");
      }

      const result = await response.json();
      router.push("/inventory/sales");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6 sm:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <a
              href="/inventory/purchases"
              className="rounded-full border-2 border-blue-500 text-blue-500 px-6 py-2 hover:bg-blue-500 hover:text-white transition-colors duration-300"
            >
              Kembali
            </a>
          </div>

          <div className="flex flex-col bg-white rounded-lg shadow-lg p-8 mt-4">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              PENJUALAN BARANG
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
                      defaultValue={getCurrentDate()}
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
                      Customer
                    </label>
                    <div className="relative">
                      <input
                        placeholder="Pilih / cari Customer"
                        className="border-2 border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={selectedCustomer.name || searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                          setSelectedCustomer({ id: null, name: "" });
                          setIsDropdownOpen(true);
                        }}
                        onFocus={() => setIsDropdownOpen(true)}
                        onBlur={() =>
                          setTimeout(() => setIsDropdownOpen(false), 400)
                        }
                      />
                      {isDropdownOpen && filteredCustomer.length > 0 && (
                        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 border border-gray-200 max-h-60 overflow-auto">
                          {filteredCustomer.map((customer) => (
                            <div
                              key={customer.id}
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                              onMouseDown={() => {
                                setSelectedCustomer(customer);
                                setSearchTerm("");
                                setIsDropdownOpen(false);
                              }}
                            >
                              {customer.name}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {/* Hidden input to store supplier ID for form submission */}
                    <input
                      type="hidden"
                      name="supplier_id"
                      value={selectedCustomer.id || ""}
                    />
                  </div>

                  <div className="grid gap-2 relative">
                    <label className="text-sm font-medium text-gray-700">
                      Pembayaran
                    </label>
                    <div className="relative">
                      <select
                        name="paymentMethod"
                        id="paymentMethod"
                        className="border-2 border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      >
                        <option value="cash">Cash</option>
                        <option value="credit">Credit</option>
                      </select>
                    </div>
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
                        <th className="p-3 text-left text-sm font-medium text-gray-700 w-40 ">
                          KODE
                        </th>
                        <th className="p-3 text-left text-sm font-medium text-gray-700 w-90">
                          NAMA
                        </th>

                        <th className="p-3 text-left text-sm font-medium text-gray-700 w-30">
                          UNIT
                        </th>
                        <th className="p-3 text-left text-sm font-medium text-gray-700 w-20">
                          QTY
                        </th>
                        <th className="p-3 text-left text-sm font-medium text-gray-700 w-35">
                          HARGA BELI
                        </th>
                        <th className="p-3 text-left text-sm font-medium text-gray-700 w-35">
                          HARGA JUAL
                        </th>
                        <th className="p-3 text-left text-sm font-medium text-gray-700">
                          TOTAL
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from({ length: 10 }).map((_, index) => (
                        <TabelSales
                          key={index}
                          onTotalChange={handleGrandTotalChange}
                          i={index}
                          setItems={setSelectedProducts}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>

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

                  <button
                    className="px-6 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    onClick={submitPo}
                  >
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
