"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Pencil, Trash2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useState } from "react"

type Genetic = {
  id: string
  name: string
  number: string
  type: string
  thc_percentage: number
  image_url: string
  slug: string
}

export function GeneticsTable({ genetics }: { genetics: Genetic[] }) {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar esta genética?")) return

    setDeletingId(id)
    const supabase = createClient()
    const { error } = await supabase.from("genetics").delete().eq("id", id)

    if (error) {
      alert("Error al eliminar: " + error.message)
    } else {
      router.refresh()
    }
    setDeletingId(null)
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {genetics.map((genetic) => (
        <Card key={genetic.id}>
          <CardContent className="p-4 space-y-4">
            <div className="aspect-[3/4] relative rounded-lg overflow-hidden bg-muted">
              <Image
                src={genetic.image_url || "/placeholder.svg"}
                alt={`${genetic.name} ${genetic.number}`}
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">
                {genetic.name} {genetic.number}
              </h3>
              <p className="text-sm text-muted-foreground">{genetic.type}</p>
              <p className="text-sm font-medium">THC: {genetic.thc_percentage}%</p>
            </div>
            <div className="flex gap-2">
              <Button asChild variant="outline" className="flex-1 bg-transparent">
                <Link href={`/admin/genetics/${genetic.id}/edit`}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Editar
                </Link>
              </Button>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => handleDelete(genetic.id)}
                disabled={deletingId === genetic.id}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
