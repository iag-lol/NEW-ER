"use client"

import { useEffect, useState } from "react"
import { format } from "date-fns"
import { Check, X, Eye, MessageSquare, Download } from "lucide-react"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { usePermissions } from "@/hooks/use-permissions"
import { getNoMarcaciones, updateNoMarcacionStatus, type NoMarcacion } from "@/lib/api/asistencia"
import { useToast } from "@/components/ui/use-toast"
import { exportToExcel } from "@/lib/export"

export function NoMarcacionTable({ refreshTrigger }: { refreshTrigger: number }) {
    const [data, setData] = useState<NoMarcacion[]>([])
    const [loading, setLoading] = useState(true)
    const { canManageStatus } = usePermissions()
    const { toast } = useToast()

    const fetchData = async () => {
        setLoading(true)
        try {
            const records = await getNoMarcaciones()
            setData(records)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [refreshTrigger])

    const handleStatusChange = async (id: string, status: "Aprobado" | "Rechazado" | "Observado") => {
        try {
            await updateNoMarcacionStatus(id, status)
            toast({ title: "Estado actualizado", description: `El registro ha sido marcado como ${status}` })
            fetchData()
        } catch (error) {
            toast({ title: "Error", description: "No se pudo actualizar el estado", variant: "destructive" })
        }
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Aprobado":
                return <Badge className="bg-green-500 hover:bg-green-600">Aprobado</Badge>
            case "Rechazado":
                return <Badge variant="destructive">Rechazado</Badge>
            case "Observado":
                return <Badge variant="secondary" className="bg-yellow-500 text-white hover:bg-yellow-600">Observado</Badge>
            default:
                return <Badge variant="outline">Pendiente</Badge>
        }
    }

    const handleExport = () => {
        exportToExcel(data, "NoMarcacion")
    }

    if (loading) {
        return <div className="text-center py-4">Cargando registros...</div>
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-end">
                <Button variant="outline" size="sm" onClick={handleExport} disabled={data.length === 0}>
                    <Download className="mr-2 h-4 w-4" />
                    Exportar Excel
                </Button>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Fecha</TableHead>
                            <TableHead>RUT</TableHead>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Cargo</TableHead>
                            <TableHead>Tipo</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                                    No hay registros encontrados.
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{format(new Date(item.fecha), "dd/MM/yyyy")}</TableCell>
                                    <TableCell>{item.rut}</TableCell>
                                    <TableCell>{item.nombre}</TableCell>
                                    <TableCell>{item.cargo}</TableCell>
                                    <TableCell>
                                        <Badge variant={item.tipo === "ENTRADA" ? "default" : "secondary"}>
                                            {item.tipo}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{getStatusBadge(item.estado)}</TableCell>
                                    <TableCell className="text-right">
                                        {canManageStatus && item.estado === "Pendiente" ? (
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                                                    onClick={() => handleStatusChange(item.id, "Aprobado")}
                                                    title="Aprobar"
                                                >
                                                    <Check className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                                                    onClick={() => handleStatusChange(item.id, "Rechazado")}
                                                    title="Rechazar"
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="h-8 w-8 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50"
                                                    onClick={() => handleStatusChange(item.id, "Observado")}
                                                    title="Observar"
                                                >
                                                    <MessageSquare className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ) : (
                                            <Button size="icon" variant="ghost" className="h-8 w-8">
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
