import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 11, fontFamily: "Helvetica" },

  card: {
    padding: 20,
    border: "1px solid #ddd",
    borderRadius: 6,
    backgroundColor: "#fff",
  },

  title: { fontSize: 16, fontWeight: "bold", marginBottom: 12 },

  infoGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  infoBlock: {
    flexDirection: "column",
  },
  label: { color: "#6b7280", fontSize: 10 },
  value: { fontSize: 12, fontWeight: "bold", marginBottom: 6 },

  statusPaid: {
    fontSize: 11,
    fontWeight: "bold",
    color: "green",
  },
  statusUnpaid: {
    fontSize: 11,
    fontWeight: "bold",
    color: "orange",
  },

  table: {
    display: "table",
    width: "100%", // biar full page
    marginTop: 10,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableHeader: {
    backgroundColor: "#f3f4f6",
  },
  tableCellHeader: {
    borderRight: "1px solid #d1d5db",
    padding: 6,
    fontSize: 10,
    fontWeight: "bold",
  },
  tableCell: {
    borderRight: "1px solid #e5e7eb",
    borderTop: "1px solid #e5e7eb",
    padding: 6,
    fontSize: 10,
  },
  colKode: { width: "10%" },
  colNama: { width: "40%" },
  colQty: { width: "15%", textAlign: "right" },
  colHarga: { width: "15%", textAlign: "right" },
  colSubtotal: { width: "20%", textAlign: "right" },

  totalRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 8,
    paddingTop: 6,
    borderTop: "1px solid #d1d5db",
  },
  totalText: {
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default function PurchaseOrderPDF({ PO }) {
  const totalAmount =
    PO?.purchaseOrderItems?.reduce(
      (sum, item) => sum + item.product.basicPrice * item.product.qty,
      0
    ) || 0;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.card}>
          <Text style={styles.title}>Detail Purchase Order</Text>

          {/* Info Grid */}
          <View style={styles.infoGrid}>
            <View style={styles.infoBlock}>
              <Text style={styles.label}>Nomor Invoice</Text>
              <Text style={styles.value}>{PO.invNumber || "-"}</Text>

              <Text style={styles.label}>Nama Supplier</Text>
              <Text style={styles.value}>{PO?.supplier?.name || "-"}</Text>
            </View>

            <View style={styles.infoBlock}>
              <Text style={styles.label}>Tanggal</Text>
              <Text style={styles.value}>
                {PO.createdAt
                  ? new Date(PO.createdAt).toLocaleDateString()
                  : "-"}
              </Text>

              <Text style={styles.label}>Status Pembayaran</Text>
              <Text
                style={
                  PO.invoiceStatus === "Paid"
                    ? styles.statusPaid
                    : styles.statusUnpaid
                }
              >
                {PO.invoiceStatus === "Paid" ? "Lunas" : "Belum Lunas"}
              </Text>
            </View>
          </View>

          {/* Tabel Barang */}
          <Text style={{ fontSize: 13, fontWeight: "bold", marginBottom: 6 }}>
            Detail Barang
          </Text>

          <View style={styles.table}>
            {/* Header */}
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={[styles.tableCellHeader, styles.colKode]}>
                Kode Barang
              </Text>
              <Text style={[styles.tableCellHeader, styles.colNama]}>
                Nama Barang
              </Text>
              <Text style={[styles.tableCellHeader, styles.colQty]}>
                Jumlah
              </Text>
              <Text style={[styles.tableCellHeader, styles.colHarga]}>
                Harga
              </Text>
              <Text style={[styles.tableCellHeader, styles.colSubtotal]}>
                Subtotal
              </Text>
            </View>

            {/* Rows */}
            {PO?.purchaseOrderItems?.map((item, i) => (
              <View style={styles.tableRow} key={i}>
                <Text style={[styles.tableCell, styles.colKode]}>
                  {item.product.code}
                </Text>
                <Text style={[styles.tableCell, styles.colNama]}>
                  {`${item.product.name} - ${item.product.brand} - ${item.product.type} - ${item.product.size}`}
                </Text>
                <Text style={[styles.tableCell, styles.colQty]}>
                  {item.product.qty} {item.product.unit}
                </Text>
                <Text style={[styles.tableCell, styles.colHarga]}>
                  Rp {item.product.basicPrice.toLocaleString()}
                </Text>
                <Text style={[styles.tableCell, styles.colSubtotal]}>
                  Rp{" "}
                  {(
                    item.product.basicPrice * item.product.qty
                  ).toLocaleString()}
                </Text>
              </View>
            ))}
          </View>

          {/* Total */}
          <View style={styles.totalRow}>
            <Text style={styles.totalText}>
              Total: Rp {totalAmount.toLocaleString()}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
