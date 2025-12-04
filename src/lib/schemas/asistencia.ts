import { z } from "zod"

export const noMarcacionSchema = z.object({
    rut: z.string().min(1, "El RUT es obligatorio"),
    nombre: z.string().min(1, "Nombre es obligatorio"),
    cargo: z.string().min(1, "Cargo es obligatorio"),
    terminal: z.string().min(1, "Terminal es obligatorio"),
    turno: z.string().min(1, "Turno es obligatorio"),
    tipo: z.enum(["ENTRADA", "SALIDA"], {
        errorMap: () => ({ message: "Seleccione el tipo de marcación" }),
    }),
    fecha: z.string().min(1, "Fecha es obligatoria"),
    hora: z.string().min(1, "Hora es obligatoria"),
    observacion: z.string().optional(),
})

export const sinTarjetaSchema = z.object({
    rut: z.string().min(1, "El RUT es obligatorio"),
    nombre: z.string().min(1, "Nombre es obligatorio"),
    cargo: z.string().min(1, "Cargo es obligatorio"),
    terminal: z.string().min(1, "Terminal es obligatorio"),
    turno: z.string().min(1, "Turno es obligatorio"),
    fecha: z.string().min(1, "Fecha es obligatoria"),
    hora: z.string().min(1, "Hora es obligatoria"),
    observacion: z.string().optional(),
})

export const cambioDiaSchema = z.object({
    rut: z.string().min(1, "El RUT es obligatorio"),
    nombre: z.string().min(1, "Nombre es obligatorio"),
    cargo: z.string().min(1, "Cargo es obligatorio"),
    terminal: z.string().min(1, "Terminal es obligatorio"),
    turno: z.string().min(1, "Turno es obligatorio"),
    fecha_libre: z.string().min(1, "Fecha libre es obligatoria"),
    fecha_trabajada: z.string().min(1, "Fecha trabajada es obligatoria"),
    fecha_solicitud: z.string().min(1, "Fecha solicitud es obligatoria"),
    hora_solicitud: z.string().min(1, "Hora solicitud es obligatoria"),
    observacion: z.string().optional(),
    // File validation is handled separately or via custom validation if needed
})

export type NoMarcacionFormValues = z.infer<typeof noMarcacionSchema>
export type SinTarjetaFormValues = z.infer<typeof sinTarjetaSchema>
export type CambioDiaFormValues = z.infer<typeof cambioDiaSchema>
