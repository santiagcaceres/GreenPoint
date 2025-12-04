"use client"

import Link from "next/link"
import { useCallback, useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { geneticsStore } from "@/lib/genetics-store"

interface Genetic {
  id: string
  name: string
  slug: string
  image_url: string
  description: string
  thc_percentage: string
  cbd_percentage: string
}

export function GeneticsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
  })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
  const [genetics, setGenetics] = useState<Genetic[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadGenetics = () => {
      const data = geneticsStore.getAll()
      setGenetics(data)
      setLoading(false)
    }

    loadGenetics()
  }, [])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index)
    },
    [emblaApi],
  )

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on("select", onSelect)
    onSelect()

    return () => {
      emblaApi.off("select", onSelect)
    }
  }, [emblaApi, onSelect])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="relative max-w-7xl mx-auto">
      {/* Carousel Container */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6 touch-pan-y">
          {genetics.map((genetic) => (
            <div key={genetic.id} className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-3">
              <Link
                href={`/genetics/${genetic.slug}`}
                className="group relative overflow-hidden rounded-2xl bg-card border border-border transition-all duration-500 hover:shadow-2xl hover:scale-105 hover:border-primary/50 block"
              >
                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden bg-secondary/10">
                  <img
                    src={genetic.image_url || "/placeholder.svg"}
                    alt={genetic.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Hover Text */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                    <p className="text-white font-bold text-lg mb-2">{genetic.name}</p>
                    <p className="text-white/90 text-sm mb-3">{genetic.description}</p>
                    <div className="flex items-center gap-3 text-xs text-white/80">
                      <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                        THC {genetic.thc_percentage}
                      </span>
                      <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                        CBD {genetic.cbd_percentage}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-card/90 backdrop-blur-sm border border-border rounded-full p-3 hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 shadow-lg"
        aria-label="Anterior"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-card/90 backdrop-blur-sm border border-border rounded-full p-3 hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 shadow-lg"
        aria-label="Siguiente"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Navigation */}
      <div className="flex justify-center gap-2 mt-8">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === selectedIndex ? "w-8 bg-primary" : "w-2 bg-border hover:bg-primary/50"
            }`}
            aria-label={`Ir a genética ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
