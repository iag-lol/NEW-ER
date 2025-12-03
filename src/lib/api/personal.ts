import { createClient } from "@/utils/supabase/client"

export interface Personal {
    id: string
    rut: string
    nombre: string
    cargo: string
    terminal: string
    turno: string
    activo: boolean
}

export async function getPersonalByRut(rut: string): Promise<Personal | null> {
    const supabase = createClient()

    const { data, error } = await supabase
        .from("personal")
        .select("*")
        .eq("rut", rut)
        .single()

    if (error) {
        console.error("Error fetching personal:", error)
        return null
    }

    return data
}
