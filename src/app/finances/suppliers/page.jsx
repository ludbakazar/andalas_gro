"use client";
import ListSupplier from "@/app/components/listSuppliers";
import { useEffect, useState } from "react";

export default function SuppliersPage() {
  const [supplier, setSupplier] = useState([]);
  const [formSupplier, setFormSupplier] = useState({
    code: "",
    name: "",
    address: "",
    phone: "",
  });

  const fetchSupplier = async () => {
    try {
      const response = await fetch("/api/finances/suppliers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        setSupplier(data);
      } else {
        console.error("Failed to fetch suppliers:", data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setFormSupplier((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const createSupplier = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/finances/suppliers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formSupplier),
      });

      if (response.ok) {
        const newSupplier = await response.json();
        setSupplier((prev) => [...prev, newSupplier]);
        setFormSupplier({
          code: "",
          name: "",
          address: "",
          phone: "",
        });
        document.getElementById("my_modal_1").close();
      } else {
        console.error("Failed to create supplier");
      }
      fetchSupplier(); // Refresh the supplier list after adding a new supplier
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSupplier();
  }, []);

  return (
    <>
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
                  <div className="flex justify-between items-center">
                    <h1 className="p-2 text-2xl font-semibold">Data Pemasok</h1>
                  </div>
                  <div className="flex justify-between items-center">
                    <p
                      className="rounded-3xl border-2 m-1 border-blue-400 text-blue-400 px-4 py-2 hover:bg-blue-400 hover:text-white transition-colors cursor-pointer"
                      onClick={() =>
                        document.getElementById("my_modal_1").showModal()
                      }
                    >
                      Tambah Pemasok
                    </p>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-md">
                  <table className="min-w-full divide-y divide-gray-200">
                    {/* head */}
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                          No
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                          Kode
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                          Nama Pemasok
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                          Alamat
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                          No Telepon
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {supplier.map((item, index) => (
                        <ListSupplier
                          key={index}
                          supplier={item}
                          no={index + 1}
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

      {/* Modal Tambah Pemasok */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box bg-white rounded-lg shadow-lg p-6">
          <h3 className="font-bold text-lg text-gray-800 mb-4 text-center">
            Tambah Pemasok Baru
          </h3>

          <div className="flex flex-col items-center">
            <input
              type="text"
              name="code"
              placeholder="Kode Pemasok"
              className="input border bg-gray-200 border-gray-300 rounded-md p-2 mb-4 w-3/4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formSupplier.code}
              onChange={handleChange}
            />

            <input
              type="text"
              name="name"
              placeholder="Nama Pemasok"
              className="input border bg-gray-200 border-gray-300 rounded-md p-2 mb-4 w-3/4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formSupplier.name}
              onChange={handleChange}
            />

            <textarea
              name="address"
              placeholder="Alamat Pemasok"
              className="input border bg-gray-200 border-gray-300 rounded-md p-2 mb-4 w-3/4 h-24 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formSupplier.address}
              onChange={handleChange}
            />

            <input
              type="text"
              name="phone"
              placeholder="Nomor Pemasok"
              className="input border bg-gray-200 border-gray-300 rounded-md p-2 mb-4 w-3/4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formSupplier.phone}
              onChange={handleChange}
            />
          </div>

          <div className="modal-action mt-4 flex justify-center">
            <button
              className="btn bg-blue-400 text-white rounded-2xl px-4 py-2 hover:bg-blue-500 transition duration-200 mr-20"
              onClick={createSupplier}
            >
              Simpan
            </button>
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn bg-white text-blue-400 rounded-2xl px-4 py-2 hover:bg-blue-500 transition duration-200">
                Tutup
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
