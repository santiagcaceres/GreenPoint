import { GeneticsCarousel } from "@/components/genetics-carousel"
import { Header } from "@/components/header"

export default function GeneticasPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/20 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              Nuestras genéticas premium
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground text-pretty leading-relaxed">
              Seis variedades cuidadosamente seleccionadas para obtener los mejores resultados en tu cultivo
            </p>
          </div>
        </div>
      </section>

      {/* Genetics Carousel Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <GeneticsCarousel />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="text-2xl font-bold mb-4">Greenpoint</div>
            <p className="text-sm opacity-80 mb-6">Genéticas premium para cultivadores profesionales</p>
            <p className="text-xs opacity-60">© 2025 Greenpoint. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
