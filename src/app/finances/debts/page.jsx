"use client";

import ListDebtSupplier from "@/app/components/listDebtSupplier";
import { useEffect, useState } from "react";

export default function DebtPage() {
  const [supplierDebts, setSupplierDebts] = useState([]);

  const fetchSupplierDebts = async () => {
    try {
      const response = await fetch("/api/finances/debts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setSupplierDebts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSupplierDebts();
  }, []);
  return (
    <div className="bg-gray-100 min-h-screen p-6 sm:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col ">
          <div className="flex justify-between items-center">
            <a
              href="/"
              className="rounded-3xl border-2 border-blue-400 text-blue-400 px-4 py-2 hover:bg-blue-400 hover:text-white transition-colors"
            >
              Kembali
            </a>
          </div>

          <div className="flex flex-col min-h-screen  bg-white rounded-lg shadow-md p-6 mt-4">
            <div className="flex flex-col mt-4">
              <div className="flex justify-between items-center">
                <div className="flex justify-between items-center p-2">
                  <h1 className="p-2 text-2xl font-semibold">
                    DATA HUTANG PEMASOK
                  </h1>
                </div>
                <div className="flex justify-between items-center">
                  <p
                    className="rounded-3xl border-2 m-1 border-blue-400 bg-blue-400 text-white px-4 py-2 hover:bg-blue-500 transition-colors cursor-pointer"
                    onClick={() =>
                      alert("Fitur ini belum tersedia, segera hadirkan!")
                    }
                  >
                    DOWNLOAD
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-md">
                <table className="min-w-full divide-y divide-gray-200">
                  {/* head */}
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-center text-sm font-medium text-gray-600">
                        NO
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                        NAMA PEMASOK
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                        HUTANG BARANG
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                        SISA HUTANG
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                        RETUR BARANG
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {supplierDebts.map((supplierDebt, index) => (
                      <ListDebtSupplier
                        key={index}
                        supplier={supplierDebt}
                        index={index + 1}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
