import { useEffect, useState } from "react";

export default function TabelSales({ onTotalChange, i, setItems }) {
  const [products, setProducts] = useState([]);
  const [qty, setQty] = useState(0);
  const [sellingPrice, setSellingPrice] = useState(0);
  const [total, setTotal] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) =>
    product.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/inventory/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleQtyChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    const numericValue = Number(value);

    // Validasi: tidak boleh melebihi stok produk
    const maxQty = selectedProduct.qty || 0;
    const limitedValue = Math.min(numericValue, maxQty);

    const formattedValue = new Intl.NumberFormat("id-ID").format(limitedValue);
    e.target.value = formattedValue;

    setQty(limitedValue);
    calculateTotal(limitedValue, sellingPrice);

    if (selectedProduct.id) {
      setItems((prevItems) => {
        const updatedItems = [...prevItems];
        updatedItems[i] = {
          ...updatedItems[i],
          qty: limitedValue,
          sellingPrice: sellingPrice,
        };
        return updatedItems;
      });
    }
  };

  const handleSellingPriceChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    const formattedValue = new Intl.NumberFormat("id-ID").format(value);
    e.target.value = formattedValue;
    setSellingPrice(Number(value));
    calculateTotal(qty, Number(value));
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[i] = { ...updatedItems[i], sellingPrice: Number(value) };
      return updatedItems;
    });
  };

  const calculateTotal = (qty, sellingPrice) => {
    const newTotal = qty * sellingPrice;
    setTotal(newTotal);

    if (onTotalChange) {
      onTotalChange({ i, total: newTotal });
    }
  };

  const [selectedProduct, setSelectedProduct] = useState({
    id: null,
    code: "",
    name: "",
    brand: "",
    type: "",
    size: "",
    unit: "",
    basicPrice: 0,
    qty: 0,
  });

  useEffect(() => {
    fetchProducts();
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

  return (
    <>
      <tr className="border-b border-gray-200">
        <td className="p-3">
          <div className="relative">
            <input
              placeholder="Kode"
              name="code"
              className="border border-gray-300 rounded-md p-2 w-full"
              value={selectedProduct.code || searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setSelectedProduct({
                  id: null,
                  code: "",
                  name: "",
                  brand: "",
                  type: "",
                  size: "",
                  unit: "",
                  basicPrice: 0,
                  qty: 0,
                });
                setIsDropdownOpen(true);
              }}
              onFocus={() => setIsDropdownOpen(true)}
              onBlur={() => setTimeout(() => setIsDropdownOpen(false), 400)}
            />
            {isDropdownOpen && filteredProducts.length > 0 && (
              <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 border text-black border-gray-200 max-h-60 overflow-auto">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onMouseDown={() => {
                      setSelectedProduct(product);
                      setItems((prevItems) => {
                        const updatedItems = [...prevItems];
                        updatedItems[i] = {
                          ...updatedItems[i],
                          id: product.id,
                          basicPrice: product.basicPrice,
                        };
                        return updatedItems;
                      });
                      setSearchTerm("");
                      setIsDropdownOpen(false);
                    }}
                  >
                    {product.code}
                  </div>
                ))}
              </div>
            )}
          </div>
        </td>
        <td className="p-3">
          <input
            placeholder="Nama Barang"
            name="name"
            className="border border-gray-300 bg-gray-200 rounded-md p-2 w-full cursor-not-allowed"
            value={`${selectedProduct.name} - ${selectedProduct.brand} - ${selectedProduct.type} - `}
            readOnly
          />
        </td>

        <td className="p-3">
          <input
            placeholder="Unit"
            name="size"
            className="border border-gray-300 bg-gray-200 rounded-md p-2 w-full"
            value={selectedProduct.unit || ""}
            readOnly
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
            className="border border-gray-300 bg-gray-200 rounded-md p-2 w-full text-left"
            value={new Intl.NumberFormat("id-ID").format(
              selectedProduct.basicPrice
            )}
            readOnly
          />
        </td>
        <td className="p-3">
          <input
            type="text"
            placeholder="0"
            className="border border-gray-300 rounded-md p-2 w-full text-left"
            onKeyUp={handleSellingPriceChange}
          />
        </td>
        <td className="p-3 font-medium">
          {new Intl.NumberFormat("id-ID").format(total)}
        </td>
      </tr>
    </>
  );
}
