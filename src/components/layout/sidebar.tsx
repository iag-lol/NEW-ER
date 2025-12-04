"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    LayoutDashboard,
    ClipboardList,
    CalendarDays,
    Users,
    Settings,
    LogOut,
} from "lucide-react"

const sidebarItems = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Asistencia",
        href: "/asistencia",
        icon: ClipboardList,
    },
    // Placeholder for future modules
    // {
    //   title: "Personal",
    //   href: "/personal",
    //   icon: Users,
    // },
    // {
    //   title: "Configuración",
    //   href: "/settings",
    //   icon: Settings,
    // },
]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <div className="flex h-full w-64 flex-col border-r bg-white shadow-sm">
            <div className="flex h-16 items-center border-b px-6 bg-slate-900 text-white">
                <Link href="/" className="flex items-center gap-2 font-bold tracking-wide">
                    <span className="text-lg">LOGÍSTICA TERMINAL</span>
                </Link>
            </div>
            <div className="flex-1 overflow-auto py-6">
                <nav className="grid items-start px-4 text-sm font-medium gap-1">
                    {sidebarItems.map((item) => {
                        const isActive = pathname.startsWith(item.href)
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-md px-3 py-2.5 transition-all",
                                    isActive
                                        ? "bg-blue-50 text-blue-700 font-semibold shadow-sm border border-blue-100"
                                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                )}
                            >
                                <item.icon className={cn("h-4 w-4", isActive ? "text-blue-600" : "text-slate-500")} />
                                {item.title}
                            </Link>
                        )
                    })}
                </nav>
            </div>
            <div className="mt-auto border-t p-4 bg-slate-50">
                <Button variant="ghost" className="w-full justify-start gap-2 text-slate-600 hover:text-red-600 hover:bg-red-50">
                    <LogOut className="h-4 w-4" />
                    Cerrar Sesión
                </Button>
            </div>
        </div>
    )
}
