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
        <div className="flex h-full w-64 flex-col border-r bg-card">
            <div className="flex h-14 items-center border-b px-4">
                <Link href="/" className="flex items-center gap-2 font-semibold">
                    <span className="text-lg">Logística Terminal</span>
                </Link>
            </div>
            <div className="flex-1 overflow-auto py-4">
                <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                    {sidebarItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                                pathname.startsWith(item.href)
                                    ? "bg-muted text-primary"
                                    : "text-muted-foreground"
                            )}
                        >
                            <item.icon className="h-4 w-4" />
                            {item.title}
                        </Link>
                    ))}
                </nav>
            </div>
            <div className="mt-auto border-t p-4">
                <Button variant="ghost" className="w-full justify-start gap-2">
                    <LogOut className="h-4 w-4" />
                    Cerrar Sesión
                </Button>
            </div>
        </div>
    )
}
