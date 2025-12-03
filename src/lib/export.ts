import * as XLSX from "xlsx"
import { format } from "date-fns"

export function exportToExcel(data: any[], fileName: string) {
    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Datos")

    // Generate buffer
    XLSX.writeFile(workbook, `${fileName}_${format(new Date(), "yyyyMMdd_HHmm")}.xlsx`)
}
