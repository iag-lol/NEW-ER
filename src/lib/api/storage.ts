import { createClient } from "@/utils/supabase/client"

export async function uploadComprobante(file: File, path: string) {
    const supabase = createClient()

    const { data, error } = await supabase.storage
        .from("comprobantes")
        .upload(path, file)

    if (error) {
        throw error
    }

    const { data: { publicUrl } } = supabase.storage
        .from("comprobantes")
        .getPublicUrl(path)

    return publicUrl
}
