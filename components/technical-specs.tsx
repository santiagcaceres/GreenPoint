interface TechnicalSpecsProps {
  data: {
    flowering_time: string
    thc: string
    cbd: string
    yield: string
    height: string
    difficulty: string
  }
}

export function TechnicalSpecs({ data }: TechnicalSpecsProps) {
  return (
    <section className="bg-card border border-border rounded-xl p-8">
      <h2 className="text-3xl font-bold text-foreground mb-6">Especificaciones Técnicas</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-secondary/30 rounded-lg p-6 border border-border">
          <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">Floración</div>
          <div className="text-2xl font-bold text-foreground">{data.flowering_time}</div>
        </div>

        <div className="bg-accent/20 rounded-lg p-6 border border-accent/30">
          <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">THC</div>
          <div className="text-2xl font-bold text-accent">{data.thc}</div>
        </div>

        <div className="bg-secondary/30 rounded-lg p-6 border border-border">
          <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">CBD</div>
          <div className="text-2xl font-bold text-foreground">{data.cbd}</div>
        </div>

        <div className="bg-secondary/30 rounded-lg p-6 border border-border">
          <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">Rendimiento</div>
          <div className="text-lg font-bold text-foreground">{data.yield}</div>
        </div>

        <div className="bg-secondary/30 rounded-lg p-6 border border-border">
          <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">Altura</div>
          <div className="text-lg font-bold text-foreground">{data.height}</div>
        </div>

        <div className="bg-secondary/30 rounded-lg p-6 border border-border">
          <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">Dificultad</div>
          <div className="text-lg font-bold text-foreground">{data.difficulty}</div>
        </div>
      </div>
    </section>
  )
}
