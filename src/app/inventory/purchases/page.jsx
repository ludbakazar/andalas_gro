"use client";

import ListPurchases from "@/app/components/listPurchases";
import Loading from "@/app/components/loading";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function PurchasesPage() {
  const [loading, setLoading] = useState(false);
  const [purchases, setPurchases] = useState([]);

  const fetchPurchases = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/inventory/purchases", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setPurchases(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {" "}
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
                      DAFTAR PEMBELIAN BARANG
                    </h1>
                  </div>
                  <div className="flex justify-between items-center">
                    <p
                      className="rounded-3xl border-2 m-1 border-blue-400 text-blue-400 px-4 py-2 hover:bg-blue-400 hover:text-white transition-colors cursor-pointer"
                      onClick={() => redirect("/inventory/purchases/create")}
                    >
                      TAMBAH PEMBELIAN
                    </p>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-md">
                  <table className="min-w-full divide-y divide-gray-200">
                    {/* head */}
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-center text-sm font-medium text-gray-600 w-10">
                          NO
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 w-20">
                          TANGGAL
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 w-50">
                          NOMOR PO
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 w-30">
                          PEMASOK
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 w-35">
                          TOTAL
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 w-50">
                          STATUS TAGIHAN
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium  text-gray-600 w-50">
                          AKSI
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {purchases.map((purchase, index) => (
                        <ListPurchases
                          key={index}
                          purchase={purchase}
                          i={index + 1}
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
    </>
  );
}
