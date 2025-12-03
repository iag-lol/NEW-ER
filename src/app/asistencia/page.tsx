"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { NoMarcacionForm } from "@/components/modules/asistencia/no-marcacion-form"
import { NoMarcacionTable } from "@/components/modules/asistencia/no-marcacion-table"

import { SinTarjetaForm } from "@/components/modules/asistencia/sin-tarjeta-form"
import { SinTarjetaTable } from "@/components/modules/asistencia/sin-tarjeta-table"
import { CambioDiaForm } from "@/components/modules/asistencia/cambio-dia-form"
import { CambioDiaTable } from "@/components/modules/asistencia/cambio-dia-table"

export default function AsistenciaPage() {
    const [refreshTrigger, setRefreshTrigger] = useState(0)

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Asistencia</h1>
            </div>

            <Tabs defaultValue="no-marcacion" className="w-full">
                <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
                    <TabsTrigger value="no-marcacion">No Marcación</TabsTrigger>
                    <TabsTrigger value="sin-tarjeta">Sin Tarjeta</TabsTrigger>
                    <TabsTrigger value="cambio-dia">Cambio de Día</TabsTrigger>
                </TabsList>

                <TabsContent value="no-marcacion" className="mt-6 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Nuevo Registro</CardTitle>
                            <CardDescription>
                                Registro de entradas o salidas no marcadas.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <NoMarcacionForm onSuccess={() => setRefreshTrigger((prev) => prev + 1)} />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Historial</CardTitle>
                            <CardDescription>
                                Últimos registros de no marcación.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <NoMarcacionTable refreshTrigger={refreshTrigger} />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="sin-tarjeta" className="mt-6 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Nuevo Registro</CardTitle>
                            <CardDescription>
                                Registro de asistencia sin tarjeta (entrada y salida).
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <SinTarjetaForm onSuccess={() => setRefreshTrigger((prev) => prev + 1)} />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Historial</CardTitle>
                            <CardDescription>
                                Últimos registros sin tarjeta.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <SinTarjetaTable refreshTrigger={refreshTrigger} />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="cambio-dia" className="mt-6 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Nueva Solicitud</CardTitle>
                            <CardDescription>
                                Solicitud de cambio de día libre por trabajado.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <CambioDiaForm onSuccess={() => setRefreshTrigger((prev) => prev + 1)} />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Historial</CardTitle>
                            <CardDescription>
                                Solicitudes de cambio de día.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <CambioDiaTable refreshTrigger={refreshTrigger} />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
