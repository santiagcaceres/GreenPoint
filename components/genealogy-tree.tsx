interface GenealogyTreeProps {
  data: {
    parents: string[]
    lineage: string
  }
}

export function GenealogyTree({ data }: GenealogyTreeProps) {
  return (
    <section className="bg-card border border-border rounded-xl p-8">
      <h2 className="text-3xl font-bold text-foreground mb-6">Árbol Genealógico</h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
            Genética Parental
          </h3>
          <div className="flex flex-wrap gap-3">
            {data.parents.map((parent, index) => (
              <div
                key={index}
                className="bg-primary/10 border border-primary/20 text-primary px-4 py-2 rounded-lg font-medium"
              >
                {parent}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">Linaje</h3>
          <p className="text-foreground leading-relaxed">{data.lineage}</p>
        </div>

        {/* Visual tree */}
        <div className="mt-8 flex justify-center">
          <div className="relative">
            {/* Parents */}
            <div className="flex gap-8 mb-8">
              {data.parents.map((parent, index) => (
                <div
                  key={index}
                  className="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-semibold text-center min-w-[140px]"
                >
                  {parent}
                </div>
              ))}
            </div>

            {/* Connection lines */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-px h-8 bg-border" />

            {/* Result */}
            <div className="flex justify-center pt-8">
              <div className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-bold text-lg">
                Resultado Híbrido
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
