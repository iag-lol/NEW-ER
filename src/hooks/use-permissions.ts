import { useAuth } from "@/context/auth-context"

type Role = "JT" | "SA" | "SP" | "IA" | "I"

export function usePermissions() {
    const { profile } = useAuth()
    const role = profile?.role

    const canManageStatus = role === "JT" || role === "SA" || role === "IA"
    const isDirector = role === "JT" || role === "SA"
    const isInspector = role === "IA" || role === "I"
    const isSupervisor = role === "SP"

    return {
        role,
        canManageStatus,
        isDirector,
        isInspector,
        isSupervisor,
    }
}
