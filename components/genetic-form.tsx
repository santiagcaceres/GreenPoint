"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { geneticsStore } from "@/lib/genetics-store"
import { toast } from "sonner"

type Genetic = {
  id?: string
  number: string
  name: string
  slug: string
  image_url: string
  description: string
  thc_percentage: string
  cbd_percentage: string
  effect: string
  general_info: {
    type: string
    origin: string
    flavor: string
    effects: string
    ideal: string
  }
  genealogy: {
    parents: string[]
    lineage: string
  }
  technical_specs: {
    flowering_time: string
    thc: string
    cbd: string
    yield: string
    height: string
    difficulty: string
  }
  prices: {
    pot: { single: number; five: number; ten: number }
    dome: { twentyFive: number; fifty: number; hundred: number }
  }
}

export function GeneticForm({ genetic }: { genetic?: Genetic }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    number: genetic?.number || "",
    name: genetic?.name || "",
    slug: genetic?.slug || "",
    image_url: genetic?.image_url || "",
    description: genetic?.description || "",
    thc_percentage: genetic?.thc_percentage || "",
    cbd_percentage: genetic?.cbd_percentage || "<1",
    effect: genetic?.effect || "",

    // General Info
    type: genetic?.general_info.type || "",
    origin: genetic?.general_info.origin || "",
    flavor: genetic?.general_info.flavor || "",
    effects: genetic?.general_info.effects || "",
    ideal: genetic?.general_info.ideal || "",

    // Genealogy
    parents: genetic?.genealogy.parents.join(", ") || "",
    lineage: genetic?.genealogy.lineage || "",

    // Technical Specs
    flowering_time: genetic?.technical_specs.flowering_time || "",
    thc: genetic?.technical_specs.thc || "",
    cbd: genetic?.technical_specs.cbd || "",
    yield: genetic?.technical_specs.yield || "",
    height: genetic?.technical_specs.height || "",
    difficulty: genetic?.technical_specs.difficulty || "",

    // Prices
    pot_single: genetic?.prices.pot.single || 1500,
    pot_five: genetic?.prices.pot.five || 7000,
    pot_ten: genetic?.prices.pot.ten || 13000,
    dome_twentyFive: genetic?.prices.dome.twentyFive || 30000,
    dome_fifty: genetic?.prices.dome.fifty || 55000,
    dome_hundred: genetic?.prices.dome.hundred || 100000,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const data = {
      number: formData.number,
      name: formData.name,
      slug: formData.slug,
      image_url: formData.image_url,
      description: formData.description,
      thc_percentage: formData.thc_percentage,
      cbd_percentage: formData.cbd_percentage,
      effect: formData.effect,
      general_info: {
        type: formData.type,
        origin: formData.origin,
        flavor: formData.flavor,
        effects: formData.effects,
        ideal: formData.ideal,
      },
      genealogy: {
        parents: formData.parents
          .split(",")
          .map((p) => p.trim())
          .filter(Boolean),
        lineage: formData.lineage,
      },
      technical_specs: {
        flowering_time: formData.flowering_time,
        thc: formData.thc,
        cbd: formData.cbd,
        yield: formData.yield,
        height: formData.height,
        difficulty: formData.difficulty,
      },
      prices: {
        pot: {
          single: formData.pot_single,
          five: formData.pot_five,
          ten: formData.pot_ten,
        },
        dome: {
          twentyFive: formData.dome_twentyFive,
          fifty: formData.dome_fifty,
          hundred: formData.dome_hundred,
        },
      },
    }

    try {
      if (genetic?.id) {
        geneticsStore.update(genetic.id, data)
        toast.success("Genética actualizada correctamente")
      } else {
        geneticsStore.add(data)
        toast.success("Genética creada correctamente")
      }
      router.push("/admin/genetics")
    } catch (err) {
      toast.error("Error al guardar la genética")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="max-w-4xl">
      <CardHeader>
        <CardTitle>{genetic ? "Editar" : "Nueva"} Genética</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Información Básica</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="number">Número</Label>
                <Input
                  id="number"
                  placeholder="#1"
                  value={formData.number}
                  onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug (URL amigable)</Label>
              <Input
                id="slug"
                placeholder="golden-glove-1"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">URL de Imagen</Label>
              <Input
                id="image"
                type="url"
                placeholder="https://..."
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                required
              />
              {formData.image_url && (
                <div className="mt-2 rounded-lg overflow-hidden border border-border">
                  <img
                    src={formData.image_url || "/placeholder.svg"}
                    alt="Preview"
                    className="w-full h-48 object-contain bg-secondary/20"
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción Corta</Label>
              <Textarea
                id="description"
                rows={2}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="thc_percentage">THC %</Label>
                <Input
                  id="thc_percentage"
                  placeholder="20%"
                  value={formData.thc_percentage}
                  onChange={(e) => setFormData({ ...formData, thc_percentage: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cbd_percentage">CBD</Label>
                <Input
                  id="cbd_percentage"
                  placeholder="<1"
                  value={formData.cbd_percentage}
                  onChange={(e) => setFormData({ ...formData, cbd_percentage: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="effect">Efecto Principal</Label>
                <Input
                  id="effect"
                  placeholder="Estimulante"
                  value={formData.effect}
                  onChange={(e) => setFormData({ ...formData, effect: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          {/* General Info */}
          <div className="space-y-4 border-t pt-6">
            <h3 className="text-lg font-semibold">Información General</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="type">Tipo</Label>
                <Input
                  id="type"
                  placeholder="Sativa dominante"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="origin">Origen</Label>
                <Input
                  id="origin"
                  placeholder="California, USA"
                  value={formData.origin}
                  onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="flavor">Sabor</Label>
                <Input
                  id="flavor"
                  placeholder="Cítrico y dulce"
                  value={formData.flavor}
                  onChange={(e) => setFormData({ ...formData, flavor: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="effects">Efectos</Label>
                <Input
                  id="effects"
                  placeholder="Energético y estimulante"
                  value={formData.effects}
                  onChange={(e) => setFormData({ ...formData, effects: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ideal">Ideal para</Label>
              <Input
                id="ideal"
                placeholder="Uso diurno, creatividad"
                value={formData.ideal}
                onChange={(e) => setFormData({ ...formData, ideal: e.target.value })}
              />
            </div>
          </div>

          {/* Genealogy */}
          <div className="space-y-4 border-t pt-6">
            <h3 className="text-lg font-semibold">Genealogía</h3>
            <div className="space-y-2">
              <Label htmlFor="parents">Padres (separados por coma)</Label>
              <Input
                id="parents"
                placeholder="Golden Goat, Agent Orange"
                value={formData.parents}
                onChange={(e) => setFormData({ ...formData, parents: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lineage">Linaje</Label>
              <Input
                id="lineage"
                placeholder="Híbrido Sativa"
                value={formData.lineage}
                onChange={(e) => setFormData({ ...formData, lineage: e.target.value })}
              />
            </div>
          </div>

          {/* Technical Specs */}
          <div className="space-y-4 border-t pt-6">
            <h3 className="text-lg font-semibold">Especificaciones Técnicas</h3>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="flowering_time">Tiempo de Floración</Label>
                <Input
                  id="flowering_time"
                  placeholder="8-9 semanas"
                  value={formData.flowering_time}
                  onChange={(e) => setFormData({ ...formData, flowering_time: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="thc">THC Detallado</Label>
                <Input
                  id="thc"
                  placeholder="20%"
                  value={formData.thc}
                  onChange={(e) => setFormData({ ...formData, thc: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cbd">CBD Detallado</Label>
                <Input
                  id="cbd"
                  placeholder="<1%"
                  value={formData.cbd}
                  onChange={(e) => setFormData({ ...formData, cbd: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="yield">Rendimiento</Label>
                <Input
                  id="yield"
                  placeholder="450-550g/m²"
                  value={formData.yield}
                  onChange={(e) => setFormData({ ...formData, yield: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Altura</Label>
                <Input
                  id="height"
                  placeholder="100-150cm"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="difficulty">Dificultad</Label>
                <Input
                  id="difficulty"
                  placeholder="Media"
                  value={formData.difficulty}
                  onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Prices */}
          <div className="space-y-4 border-t pt-6">
            <h3 className="text-lg font-semibold">Precios</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <h4 className="font-medium">En Maceta</h4>
                <div className="space-y-2">
                  <Label htmlFor="pot_single">1 Planta ($)</Label>
                  <Input
                    id="pot_single"
                    type="number"
                    value={formData.pot_single}
                    onChange={(e) => setFormData({ ...formData, pot_single: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pot_five">5 Plantas ($)</Label>
                  <Input
                    id="pot_five"
                    type="number"
                    value={formData.pot_five}
                    onChange={(e) => setFormData({ ...formData, pot_five: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pot_ten">10 Plantas ($)</Label>
                  <Input
                    id="pot_ten"
                    type="number"
                    value={formData.pot_ten}
                    onChange={(e) => setFormData({ ...formData, pot_ten: Number(e.target.value) })}
                  />
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium">En Domo</h4>
                <div className="space-y-2">
                  <Label htmlFor="dome_twentyFive">25 Plantas ($)</Label>
                  <Input
                    id="dome_twentyFive"
                    type="number"
                    value={formData.dome_twentyFive}
                    onChange={(e) => setFormData({ ...formData, dome_twentyFive: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dome_fifty">50 Plantas ($)</Label>
                  <Input
                    id="dome_fifty"
                    type="number"
                    value={formData.dome_fifty}
                    onChange={(e) => setFormData({ ...formData, dome_fifty: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dome_hundred">100 Plantas ($)</Label>
                  <Input
                    id="dome_hundred"
                    type="number"
                    value={formData.dome_hundred}
                    onChange={(e) => setFormData({ ...formData, dome_hundred: Number(e.target.value) })}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-6">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Guardando..." : genetic ? "Actualizar" : "Crear"}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.push("/admin/genetics")}>
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
