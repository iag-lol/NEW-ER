"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/client"
import { User } from "@supabase/supabase-js"

type Role = "JT" | "SA" | "SP" | "IA" | "I"

interface Profile {
    id: string
    email: string
    full_name: string
    role: Role
}

interface AuthContextType {
    user: User | null
    profile: Profile | null
    loading: boolean
    signIn: () => Promise<void> // Mock sign in for demo or real auth
    signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [profile, setProfile] = useState<Profile | null>(null)
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        const getUser = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser()

            setUser(user)

            if (user) {
                const { data } = await supabase
                    .from("profiles")
                    .select("*")
                    .eq("id", user.id)
                    .single()
                setProfile(data)
            }
            setLoading(false)
        }

        getUser()

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                setUser(session?.user ?? null)
                if (session?.user) {
                    const { data } = await supabase
                        .from("profiles")
                        .select("*")
                        .eq("id", session.user.id)
                        .single()
                    setProfile(data)
                } else {
                    setProfile(null)
                }
                setLoading(false)
            }
        )

        return () => {
            subscription.unsubscribe()
        }
    }, [])

    const signIn = async () => {
        // For demo purposes, we might want a simple way to login
        // But in production, use supabase.auth.signInWithPassword
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${location.origin}/auth/callback`,
            },
        })
    }

    const signOut = async () => {
        await supabase.auth.signOut()
        setUser(null)
        setProfile(null)
    }

    return (
        <AuthContext.Provider value={{ user, profile, loading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
