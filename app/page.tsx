import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Leaf, Award, TrendingUp } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-secondary/20 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 text-balance">
              Cultiva calidad premium con nuestras genéticas
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 text-pretty leading-relaxed">
              Greenpoint ofrece las mejores genéticas de cannabis seleccionadas para cultivadores profesionales. Calidad
              garantizada, resultados excepcionales.
            </p>
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link href="/geneticas">Explora nuestras genéticas</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Leaf className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Genéticas premium</h3>
              <p className="text-muted-foreground text-pretty leading-relaxed">
                Variedades cuidadosamente seleccionadas con altos niveles de THC y CBD
              </p>
            </div>

            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Calidad garantizada</h3>
              <p className="text-muted-foreground text-pretty leading-relaxed">
                Todas nuestras plantas son de la más alta calidad y están listas para cultivar
              </p>
            </div>

            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Resultados excepcionales</h3>
              <p className="text-muted-foreground text-pretty leading-relaxed">
                Genéticas probadas que garantizan cosechas abundantes y de excelente calidad
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              ¿Listo para comenzar tu cultivo?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 text-pretty leading-relaxed">
              Explora nuestras 6 genéticas premium y elige la perfecta para ti
            </p>
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link href="/geneticas">Ver genéticas disponibles</Link>
            </Button>
          </div>
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
