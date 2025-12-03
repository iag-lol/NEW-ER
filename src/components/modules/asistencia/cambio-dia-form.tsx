"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { Loader2, Search, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

import { cambioDiaSchema, type CambioDiaFormValues } from "@/lib/schemas/asistencia"
import { getPersonalByRut } from "@/lib/api/personal"
import { uploadComprobante } from "@/lib/api/storage"
import { createClient } from "@/utils/supabase/client"
import { useAuth } from "@/context/auth-context"

export function CambioDiaForm({ onSuccess }: { onSuccess?: () => void }) {
    const { user } = useAuth()
    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(false)
    const [isSearching, setIsSearching] = useState(false)
    const [file, setFile] = useState<File | null>(null)

    const form = useForm<CambioDiaFormValues>({
        resolver: zodResolver(cambioDiaSchema),
        defaultValues: {
            rut: "",
            nombre: "",
            cargo: "",
            terminal: "",
            turno: "",
            fecha_libre: "",
            fecha_trabajada: "",
            fecha_solicitud: format(new Date(), "yyyy-MM-dd"),
            hora_solicitud: format(new Date(), "HH:mm"),
            observacion: "",
        },
    })

    const rut = form.watch("rut")

    const handleSearchPersonal = async () => {
        if (!rut) return
        setIsSearching(true)
        try {
            const personal = await getPersonalByRut(rut)
            if (personal) {
                form.setValue("nombre", personal.nombre)
                form.setValue("cargo", personal.cargo)
                form.setValue("terminal", personal.terminal)
                form.setValue("turno", personal.turno)
            } else {
                toast({ title: "No encontrado", description: "RUT no existe en la base de datos", variant: "destructive" })
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsSearching(false)
        }
    }

    const onSubmit = async (data: CambioDiaFormValues) => {
        setIsLoading(true)
        const supabase = createClient()

        try {
            let fileUrl = null
            if (file) {
                const fileExt = file.name.split(".").pop()
                const fileName = `${Date.now()}_${data.rut}.${fileExt}`
                fileUrl = await uploadComprobante(file, fileName)
            }

            const { error } = await supabase.from("asistencia_cambio_dia").insert({
                rut: data.rut,
                nombre: data.nombre,
                cargo: data.cargo,
                terminal: data.terminal,
                turno: data.turno,
                fecha_libre: data.fecha_libre,
                fecha_trabajada: data.fecha_trabajada,
                fecha_solicitud: data.fecha_solicitud,
                hora_solicitud: data.hora_solicitud,
                archivo_url: fileUrl,
                observacion: data.observacion,
                created_by: user?.id,
            })

            if (error) throw error

            toast({ title: "Solicitud creada", description: "El cambio de día ha sido registrado." })
            form.reset({
                rut: "",
                nombre: "",
                cargo: "",
                terminal: "",
                turno: "",
                fecha_libre: "",
                fecha_trabajada: "",
                fecha_solicitud: format(new Date(), "yyyy-MM-dd"),
                hora_solicitud: format(new Date(), "HH:mm"),
                observacion: "",
            })
            setFile(null)
            onSuccess?.()
        } catch (error) {
            console.error(error)
            toast({ title: "Error", description: "No se pudo crear el registro.", variant: "destructive" })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="rut"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>RUT</FormLabel>
                                <div className="flex gap-2">
                                    <FormControl>
                                        <Input placeholder="12.345.678-9" {...field} />
                                    </FormControl>
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        size="icon"
                                        onClick={handleSearchPersonal}
                                        disabled={isSearching}
                                    >
                                        {isSearching ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                            <Search className="h-4 w-4" />
                                        )}
                                    </Button>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="nombre"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombre</FormLabel>
                                <FormControl>
                                    <Input {...field} readOnly className="bg-muted" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="cargo"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Cargo</FormLabel>
                                <FormControl>
                                    <Input {...field} readOnly className="bg-muted" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="terminal"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Terminal</FormLabel>
                                <FormControl>
                                    <Input {...field} readOnly className="bg-muted" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="turno"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Turno</FormLabel>
                                <FormControl>
                                    <Input {...field} readOnly className="bg-muted" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="fecha_libre"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Fecha Libre</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="fecha_trabajada"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Fecha Trabajada</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="space-y-2">
                        <FormLabel>Adjuntar Archivo (Opcional)</FormLabel>
                        <div className="flex items-center gap-2">
                            <Input
                                type="file"
                                accept=".pdf,image/*"
                                onChange={(e) => setFile(e.target.files?.[0] || null)}
                            />
                        </div>
                    </div>
                </div>

                <FormField
                    control={form.control}
                    name="observacion"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Observación</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Detalles adicionales..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end">
                    <Button type="submit" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Guardar Solicitud
                    </Button>
                </div>
            </form>
        </Form>
    )
}
