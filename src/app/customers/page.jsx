"use client";

import { useEffect, useState } from "react";
import ListCustomer from "../components/listCustomer";
import Swal from "sweetalert2";

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);

  const [formCustomer, setFormCustomer] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editMode, setEditMode] = useState(false);

  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const openModal = (customer = null) => {
    setEditMode(false);
    setSelectedCustomer(null);
    setFormCustomer({
      name: "",
      address: "",
      phone: "",
    });
    if (customer) {
      setSelectedCustomer(customer);
      setEditMode(true);
      setFormCustomer({
        name: customer.name || "",
        address: customer.address || "",
        phone: customer.phone || "",
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCustomer(null);
    setFormCustomer({
      name: "",
      address: "",
      phone: "",
    });
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setFormCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const createCustomer = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formCustomer),
      });

      if (response.ok) {
        const newCustomer = await response.json();
        setCustomers((prev) => [...prev, newCustomer]);
        setFormCustomer({
          name: "",
          address: "",
          phone: "",
        });
        closeModal();
        await Swal.fire({
          title: "Berhasil",
          text: "Supplier telah berhasil diedit.",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#50a2ff",
        });
      } else {
        await Swal.fire({
          title: "Terjadi Kesalahan",
          text: "Tidak dapat memproses permintaan. Silakan coba lagi nanti.",
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "#50a2ff",
        });
      }
      fetchCustomers();
    } catch (error) {
      console.log(error);
      await Swal.fire({
        title: "Terjadi Kesalahan",
        text: "Tidak dapat memproses permintaan. Silakan coba lagi nanti.",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#50a2ff",
      });
    }
  };

  const editCustomer = async (e) => {
    e.preventDefault();
    try {
      const customerId = selectedCustomer.id;
      const data = { customerId: customerId, ...formCustomer };
      const response = await fetch("/api/customers", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        closeModal();
        await Swal.fire({
          title: "Berhasil",
          text: "Supplier telah berhasil diedit.",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#50a2ff",
        });
        fetchCustomers();
      }
    } catch (error) {
      console.log(error);
      await Swal.fire({
        title: "Terjadi Kesalahan",
        text: "Tidak dapat memproses permintaan. Silakan coba lagi nanti.",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#50a2ff",
      });
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await fetch("api/customers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch customers");
      }
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);
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
                      DATA PELANGGAN
                    </h1>
                  </div>
                  <div className="flex justify-between items-center">
                    <p
                      className="rounded-3xl border-2 m-1 border-blue-400 text-blue-400 px-4 py-2 hover:bg-blue-400 hover:text-white transition-colors cursor-pointer"
                      onClick={() => openModal()}
                    >
                      TAMBAH PELANGGAN
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
                          NAMA PELANGGAN
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                          ALAMAT
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                          NOMOR TELEPON
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                          ACTION
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {customers.map((customer, index) => (
                        <ListCustomer
                          key={index}
                          customer={customer}
                          index={index + 1}
                          fetchCustomers={fetchCustomers}
                          openModal={openModal}
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
      {isModalOpen && (
        <dialog id="my_modal_1" className="modal" open>
          <div className="modal-box bg-white rounded-lg shadow-lg p-6">
            <h3 className="font-bold text-lg text-gray-800 mb-4 text-center">
              {editMode ? "Edit Pelanggan" : "Tambah Pelanggan"}
            </h3>

            <div className="flex flex-col items-center">
              <input
                type="text"
                name="name"
                placeholder="Nama Pelanggan"
                className="input border bg-gray-200 border-gray-300 rounded-md p-2 mb-4 w-3/4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formCustomer.name}
                onChange={handleChange}
              />

              <textarea
                name="address"
                placeholder="Alamat Pelanggan"
                className="input border bg-gray-200 border-gray-300 rounded-md p-2 mb-4 w-3/4 h-24 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formCustomer.address}
                onChange={handleChange}
              />

              <input
                type="text"
                name="phone"
                placeholder="Nomor Telepon"
                className="input border bg-gray-200 border-gray-300 rounded-md p-2 mb-4 w-3/4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formCustomer.phone}
                onChange={handleChange}
              />
            </div>

            <div className="modal-action mt-4 flex justify-center">
              <button
                className="btn bg-blue-400 text-white rounded-2xl px-4 py-2 hover:bg-blue-500 transition duration-200 mr-20"
                onClick={editMode ? editCustomer : createCustomer}
              >
                Simpan
              </button>
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button
                  className="btn bg-white text-blue-400 rounded-2xl px-4 py-2 hover:bg-blue-500 transition duration-200"
                  onClick={closeModal}
                >
                  Tutup
                </button>
              </form>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}
