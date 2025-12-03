import { createClient } from "@/utils/supabase/client"

export interface NoMarcacion {
    id: string
    rut: string
    nombre: string
    cargo: string
    terminal: string
    turno: string
    tipo: "ENTRADA" | "SALIDA"
    fecha: string
    hora: string
    observacion: string | null
    estado: "Pendiente" | "Aprobado" | "Rechazado" | "Observado"
    created_by: string
    created_at: string
}

export async function getNoMarcaciones() {
    const supabase = createClient()

    const { data, error } = await supabase
        .from("asistencia_no_marcacion")
        .select("*")
        .order("created_at", { ascending: false })

    if (error) {
        console.error("Error fetching no marcaciones:", error)
        return []
    }

    return data as NoMarcacion[]
}

export async function updateNoMarcacionStatus(id: string, status: string, observacion?: string) {
    const supabase = createClient()

    // If status is 'Observado', we might want to append to observation or handle it differently
    // For now, we just update the status.

    const { error } = await supabase
        .from("asistencia_no_marcacion")
        .update({ estado: status })
        .eq("id", id)

    if (error) {
        throw error
    }
}

export interface SinTarjeta {
    id: string
    rut: string
    nombre: string
    cargo: string
    terminal: string
    turno: string
    fecha: string
    hora: string
    observacion: string | null
    estado: "Pendiente" | "Aprobado" | "Rechazado" | "Observado"
    created_by: string
    created_at: string
}

export async function getSinTarjeta() {
    const supabase = createClient()

    const { data, error } = await supabase
        .from("asistencia_sin_tarjeta")
        .select("*")
        .order("created_at", { ascending: false })

    if (error) {
        console.error("Error fetching sin tarjeta:", error)
        return []
    }

    return data as SinTarjeta[]
}

export async function updateSinTarjetaStatus(id: string, status: string) {
    const supabase = createClient()

    const { error } = await supabase
        .from("asistencia_sin_tarjeta")
        .update({ estado: status })
        .eq("id", id)

    if (error) {
        throw error
    }
}

export interface CambioDia {
    id: string
    rut: string
    nombre: string
    cargo: string
    terminal: string
    turno: string
    fecha_libre: string
    fecha_trabajada: string
    fecha_solicitud: string
    hora_solicitud: string
    archivo_url: string | null
    observacion: string | null
    estado: "Pendiente" | "Aprobado" | "Rechazado" | "Observado"
    created_by: string
    created_at: string
}

export async function getCambioDia() {
    const supabase = createClient()

    const { data, error } = await supabase
        .from("asistencia_cambio_dia")
        .select("*")
        .order("created_at", { ascending: false })

    if (error) {
        console.error("Error fetching cambio dia:", error)
        return []
    }

    return data as CambioDia[]
}

export async function updateCambioDiaStatus(id: string, status: string) {
    const supabase = createClient()

    const { error } = await supabase
        .from("asistencia_cambio_dia")
        .update({ estado: status })
        .eq("id", id)

    if (error) {
        throw error
    }
}
