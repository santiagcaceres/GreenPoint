"use client"

import { GeneticInfo } from "@/components/genetic-info"
import { GenealogyTree } from "@/components/genealogy-tree"
import { TechnicalSpecs } from "@/components/technical-specs"
import { PurchaseOptions } from "@/components/purchase-options"
import { Header } from "@/components/header"

interface GeneticDetailClientProps {
  genetic: any
  slug: string
}

export function GeneticDetailClient({ genetic, slug }: GeneticDetailClientProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Image */}
      <div className="relative h-96 overflow-hidden">
        <img src={genetic.image_url || "/placeholder.svg"} alt={genetic.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg">{genetic.name}</h1>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-12">
          <GeneticInfo data={genetic.general_info} />
          <GenealogyTree data={genetic.genealogy} />
          <TechnicalSpecs data={genetic.technical_specs} />
          <PurchaseOptions
            prices={genetic.prices}
            geneticName={genetic.name}
            geneticSlug={slug}
            geneticImage={genetic.image_url}
            geneticId={genetic.id}
          />
        </div>
      </div>
    </div>
  )
}
