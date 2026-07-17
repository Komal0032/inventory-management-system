import * as XLSX from "xlsx";
import { saveAs } from "file-saver";


export const exportDashboardExcel = (stats) => {


  const data = [
    {
      Metric: "Total Products",
      Value: stats.totalProducts
    },
    {
      Metric: "Total Reorders",
      Value: stats.totalReorders
    },
    {
      Metric: "Low Stock Products",
      Value: stats.lowStockProducts
    },
    {
      Metric: "Inventory Value",
      Value: `₹${stats.inventoryValue}`
    },
    {
      Metric: "Pending Reorders",
      Value: stats.pendingReorders
    },
    {
      Metric: "Completed Reorders",
      Value: stats.completedReorders
    },
    {
      Metric: "Failed Reorders",
      Value: stats.failedReorders
    }
  ];


  const worksheet = XLSX.utils.json_to_sheet(data);


  const workbook = XLSX.utils.book_new();


  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Dashboard Report"
  );


  const excelBuffer = XLSX.write(
    workbook,
    {
      bookType: "xlsx",
      type: "array"
    }
  );


  const file = new Blob(
    [excelBuffer],
    {
      type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    }
  );


  saveAs(
    file,
    "Inventory_Dashboard_Report.xlsx"
  );


};