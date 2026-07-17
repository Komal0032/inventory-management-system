import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportProductsToExcel = (products) => {

  const data = products.map((product) => ({
    ID: product.id,
    "Product Name": product.product_name,
    SKU: product.sku,
    Quantity: product.available_quantity,
    "Low Stock Threshold": product.low_stock_threshold,
    "Cost Price": product.cost_price,
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Products"
  );

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const file = new Blob([excelBuffer], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(file, "Inventory.xlsx");
};