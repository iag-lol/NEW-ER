"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { Loader2, Search } from "lucide-react"

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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

import { noMarcacionSchema, type NoMarcacionFormValues } from "@/lib/schemas/asistencia"
import { getPersonalByRut } from "@/lib/api/personal"
import { createClient } from "@/utils/supabase/client"
import { useAuth } from "@/context/auth-context"

export function NoMarcacionForm({ onSuccess }: { onSuccess?: () => void }) {
    const { user } = useAuth()
    // const { toast } = useToast() // Need to implement toast
    const [isLoading, setIsLoading] = useState(false)
    const [isSearching, setIsSearching] = useState(false)

    const form = useForm<NoMarcacionFormValues>({
        resolver: zodResolver(noMarcacionSchema),
        defaultValues: {
            rut: "",
            nombre: "",
            cargo: "",
            terminal: "",
            turno: "",
            tipo: "ENTRADA",
            fecha: format(new Date(), "yyyy-MM-dd"),
            hora: "",
            observacion: "",
        },
    })

    const rut = form.watch("rut")

    // Auto-search when RUT changes (debounced or manual trigger preferred, implementing manual for now or effect)
    // For simplicity, let's add a search button or effect with debounce.
    // Let's use a blur handler or a button for now to be safe.

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
                // toast({ title: "No encontrado", description: "RUT no existe en la base de datos", variant: "destructive" })
                alert("Personal no encontrado")
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsSearching(false)
        }
    }

    const onSubmit = async (data: NoMarcacionFormValues) => {
        setIsLoading(true)
        const supabase = createClient()

        try {
            const { error } = await supabase.from("asistencia_no_marcacion").insert({
                rut: data.rut,
                nombre: data.nombre,
                cargo: data.cargo,
                terminal: data.terminal,
                turno: data.turno,
                tipo: data.tipo,
                fecha: data.fecha,
                hora: data.hora,
                observacion: data.observacion,
                created_by: user?.id,
            })

            if (error) throw error

            // toast({ title: "Registro creado", description: "La no marcación ha sido registrada exitosamente." })
            form.reset({
                rut: "",
                nombre: "",
                cargo: "",
                terminal: "",
                turno: "",
                tipo: "ENTRADA",
                fecha: format(new Date(), "yyyy-MM-dd"),
                hora: "",
                observacion: "",
            })
            onSuccess?.()
        } catch (error) {
            console.error(error)
            // toast({ title: "Error", description: "No se pudo crear el registro.", variant: "destructive" })
            alert("Error al guardar")
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
                        name="tipo"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tipo de No Marcación</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccione tipo" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="ENTRADA">ENTRADA</SelectItem>
                                        <SelectItem value="SALIDA">SALIDA</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="fecha"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Fecha</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="hora"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Hora</FormLabel>
                                <FormControl>
                                    <Input type="time" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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
                        Guardar Registro
                    </Button>
                </div>
            </form>
        </Form>
    )
}
