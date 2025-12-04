interface GeneticInfoProps {
  data: {
    type: string
    origin: string
    flavor: string
    effects: string
    ideal: string
  }
}

export function GeneticInfo({ data }: GeneticInfoProps) {
  return (
    <section className="bg-card border border-border rounded-xl p-8">
      <h2 className="text-3xl font-bold text-foreground mb-6">Información General</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">Tipo</h3>
          <p className="text-foreground leading-relaxed">{data.type}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">Origen</h3>
          <p className="text-foreground leading-relaxed">{data.origin}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">Sabor</h3>
          <p className="text-foreground leading-relaxed">{data.flavor}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">Efectos</h3>
          <p className="text-foreground leading-relaxed">{data.effects}</p>
        </div>
        <div className="md:col-span-2">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">Ideal para</h3>
          <p className="text-foreground leading-relaxed">{data.ideal}</p>
        </div>
      </div>
    </section>
  )
}
