"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, LineChart, Line } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
    {
        name: "Lun",
        total: Math.floor(Math.random() * 50) + 10,
    },
    {
        name: "Mar",
        total: Math.floor(Math.random() * 50) + 10,
    },
    {
        name: "Mie",
        total: Math.floor(Math.random() * 50) + 10,
    },
    {
        name: "Jue",
        total: Math.floor(Math.random() * 50) + 10,
    },
    {
        name: "Vie",
        total: Math.floor(Math.random() * 50) + 10,
    },
    {
        name: "Sab",
        total: Math.floor(Math.random() * 50) + 10,
    },
    {
        name: "Dom",
        total: Math.floor(Math.random() * 50) + 10,
    },
]

export function Overview() {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
                <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                />
                <Tooltip
                    contentStyle={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}
                    itemStyle={{ color: 'var(--foreground)' }}
                />
                <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
            </BarChart>
        </ResponsiveContainer>
    )
}

export function RecentActivity() {
    return (
        <div className="space-y-8">
            <div className="flex items-center">
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Juan Pérez</p>
                    <p className="text-sm text-muted-foreground">
                        No Marcación - Entrada
                    </p>
                </div>
                <div className="ml-auto font-medium">Hace 2h</div>
            </div>
            <div className="flex items-center">
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Maria Gonzalez</p>
                    <p className="text-sm text-muted-foreground">
                        Sin Tarjeta
                    </p>
                </div>
                <div className="ml-auto font-medium">Hace 4h</div>
            </div>
            <div className="flex items-center">
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Carlos Ruiz</p>
                    <p className="text-sm text-muted-foreground">
                        Cambio de Día
                    </p>
                </div>
                <div className="ml-auto font-medium">Hace 5h</div>
            </div>
        </div>
    )
}
