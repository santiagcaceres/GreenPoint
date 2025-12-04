"use client"

import Link from "next/link"
import { useState } from "react"

const genetics = [
  {
    id: "og-kush",
    name: "OG Kush",
    slug: "og-kush",
    image: "/og-kush-cannabis-plant-green-buds.jpg",
    description: "Clásico de la costa oeste con potente efecto",
    thc: "22-25%",
  },
  {
    id: "purple-haze",
    name: "Purple Haze",
    slug: "purple-haze",
    image: "/purple-haze-cannabis-purple-buds.jpg",
    description: "Legendaria sativa con tonos violetas",
    thc: "18-21%",
  },
  {
    id: "white-widow",
    name: "White Widow",
    slug: "white-widow",
    image: "/white-widow-cannabis-frosty-white-trichomes.jpg",
    description: "Híbrido equilibrado cubierto de resina",
    thc: "20-23%",
  },
  {
    id: "sour-diesel",
    name: "Sour Diesel",
    slug: "sour-diesel",
    image: "/sour-diesel-cannabis-bright-green-plant.jpg",
    description: "Energizante sativa con aroma diesel",
    thc: "19-22%",
  },
  {
    id: "gelato",
    name: "Gelato",
    slug: "gelato",
    image: "/gelato-cannabis-colorful-purple-orange-buds.jpg",
    description: "Híbrido dulce con sabores complejos",
    thc: "23-26%",
  },
  {
    id: "blue-dream",
    name: "Blue Dream",
    slug: "blue-dream",
    image: "/blue-dream-cannabis-blue-green-plant.jpg",
    description: "Híbrido suave perfecto para principiantes",
    thc: "17-20%",
  },
]

export function GeneticsGrid() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
      {genetics.map((genetic) => (
        <Link
          key={genetic.id}
          href={`/genetics/${genetic.slug}`}
          className="group relative overflow-hidden rounded-xl bg-card border border-border transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
          onMouseEnter={() => setHoveredId(genetic.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          {/* Image Container */}
          <div className="relative h-80 overflow-hidden">
            <img
              src={genetic.image || "/placeholder.svg"}
              alt={genetic.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent opacity-90" />

            {/* THC Badge */}
            <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1.5 rounded-full text-xs font-bold">
              THC {genetic.thc}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 relative">
            <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
              {genetic.name}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{genetic.description}</p>

            {/* Hover indicator */}
            <div
              className={`mt-4 flex items-center gap-2 text-primary font-medium text-sm transition-all duration-300 ${
                hoveredId === genetic.id ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
              }`}
            >
              Ver detalles
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
