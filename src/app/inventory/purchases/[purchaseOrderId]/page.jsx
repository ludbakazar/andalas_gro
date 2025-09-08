"use client";

import Loading from "@/app/components/loading";
import PurchaseOrderPDF from "@/app/components/print/purchaseOrderPDF";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DetailPurchasePage() {
  const params = useParams();
  const { purchaseOrderId } = params;

  const [PO, setPO] = useState({});
  const [loading, setLoading] = useState(true); // ⬅️ state loading

  const fetchPurchaseDetails = async () => {
    try {
      setLoading(true); // mulai loading
      const response = await fetch(
        `/api/inventory/purchases/details?purchaseOrderId=${purchaseOrderId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      setPO(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchaseDetails();
  }, []);

  const totalAmount =
    PO?.purchaseOrderItems?.reduce(
      (sum, item) => sum + item.product.basicPrice * item.product.qty,
      0
    ) || 0;

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6 sm:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col">
          {/* Tombol kembali */}
          <div className="flex justify-between items-center">
            <a
              href="/inventory/purchases"
              className="rounded-3xl border-2 border-blue-400 text-blue-400 px-4 py-2 hover:bg-blue-400 hover:text-white transition-colors"
            >
              Kembali
            </a>
            <PDFDownloadLink
              document={<PurchaseOrderPDF PO={PO} />}
              fileName={`PurchaseOrder-${PO.invNumber || "export"}.pdf`}
            >
              {({ loading }) => (
                <button
                  disabled={loading}
                  className="rounded-3xl bg-green-500 text-white px-4 py-2 hover:bg-green-600 transition-colors"
                >
                  {loading ? "Menyiapkan PDF..." : "Download PDF"}
                </button>
              )}
            </PDFDownloadLink>
          </div>

          {/* Card detail PO */}
          <div className="flex flex-col bg-white rounded-lg shadow-md p-6 mt-4">
            <h1 className="text-2xl font-bold text-gray-700 mb-4">
              Detail Purchase Order
            </h1>

            {/* Info PO */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-gray-500">Nomor Invoice</p>
                <p className="font-semibold">{PO.invNumber}</p>
              </div>
              <div>
                <p className="text-gray-500">Tanggal</p>
                <p className="font-semibold">
                  {new Date(PO.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Nama Supplier</p>
                <p className="font-semibold">{PO?.supplier?.name}</p>
              </div>
              <div>
                <p className="text-gray-500">Status Pembayaran</p>
                <p
                  className={`font-semibold px-3 py-1 rounded-full inline-block ${
                    PO.invoiceStatus === "Paid"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {PO.invoiceStatus === "Paid" ? "Lunas" : "Belum Lunas"}
                </p>
              </div>
            </div>

            {/* Detail Barang */}
            <h2 className="text-xl font-semibold mb-3">Detail Barang</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left px-4 py-2 border-b">
                      KODE BARANG
                    </th>
                    <th className="text-left px-4 py-2 border-b">
                      NAMA BARANG
                    </th>
                    <th className="text-right px-4 py-2 border-b">JUMLAH</th>
                    <th className="text-right px-4 py-2 border-b">
                      HARGA SATUAN
                    </th>
                    <th className="text-right px-4 py-2 border-b">SUBTOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {PO?.purchaseOrderItems?.map((item, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border-b">
                        {item.product.code}
                      </td>
                      <td className="px-4 py-2 border-b">
                        {`${item.product.name} - ${item.product.brand} - ${item.product.type} - ${item.product.size}`}
                      </td>
                      <td className="px-4 py-2 border-b text-right">
                        {item.product.qty} {item.product.unit}
                      </td>
                      <td className="px-4 py-2 border-b text-right">
                        Rp {item.product.basicPrice.toLocaleString()}
                      </td>
                      <td className="px-4 py-2 border-b text-right">
                        Rp{" "}
                        {(
                          item.product.basicPrice * item.product.qty
                        ).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="font-bold">
                    <td colSpan="4" className="px-4 py-2 text-right">
                      Total
                    </td>
                    <td className="px-4 py-2 text-right">
                      Rp {totalAmount.toLocaleString()}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
