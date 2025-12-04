"use client"

import { AdminNav } from "@/components/admin-nav"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus, Trash2, Edit } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { geneticsStore } from "@/lib/genetics-store"
import { toast } from "sonner"

export default function AdminGeneticsPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [genetics, setGenetics] = useState<any[]>([])

  useEffect(() => {
    const adminSession = localStorage.getItem("adminSession")
    if (adminSession !== "true") {
      router.push("/admin/login")
    } else {
      setIsAuthenticated(true)
      loadGenetics()
    }
  }, [router])

  const loadGenetics = () => {
    const data = geneticsStore.getAll()
    setGenetics(data)
  }

  const handleDelete = (id: string, name: string) => {
    if (confirm(`¿Estás seguro de eliminar la genética "${name}"?`)) {
      const success = geneticsStore.delete(id)
      if (success) {
        toast.success("Genética eliminada correctamente")
        loadGenetics()
      } else {
        toast.error("Error al eliminar la genética")
      }
    }
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminNav />
      <main className="container mx-auto p-6 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Genéticas</h1>
            <p className="text-muted-foreground">Gestiona todas las genéticas disponibles</p>
          </div>
          <Button asChild>
            <Link href="/admin/genetics/new">
              <Plus className="mr-2 h-4 w-4" />
              Nueva Genética
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {genetics.map((genetic) => (
            <Card key={genetic.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>
                    {genetic.number} - {genetic.name}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-[3/4] overflow-hidden rounded-lg">
                  <img
                    src={genetic.image_url || "/placeholder.svg"}
                    alt={genetic.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">THC:</span>
                  <span className="font-medium">{genetic.thc_percentage}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">CBD:</span>
                  <span className="font-medium">{genetic.cbd_percentage}</span>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Efecto:</span>
                  <p className="font-medium">{genetic.effect}</p>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button asChild variant="outline" className="flex-1 bg-transparent">
                    <Link href={`/admin/genetics/${genetic.id}/edit`}>
                      <Edit className="mr-2 h-4 w-4" />
                      Editar
                    </Link>
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={() => handleDelete(genetic.id, genetic.name)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Eliminar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
