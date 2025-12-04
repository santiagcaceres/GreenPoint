"use client"

interface Genetic {
  id: string
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

const STORAGE_KEY = "greenpoint_genetics"

export const geneticsStore = {
  getAll: (): Genetic[] => {
    if (typeof window === "undefined") return []
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) {
      // Datos iniciales
      const initialGenetics: Genetic[] = [
        {
          id: "1",
          number: "#1",
          name: "Golden Glove",
          slug: "golden-glove-1",
          image_url: "/images/24.png",
          description: "Genética estimulante ideal para el día",
          thc_percentage: "20%",
          cbd_percentage: "<1",
          effect: "Estimulante",
          general_info: {
            type: "Sativa dominante",
            origin: "California, USA",
            flavor: "Cítrico y dulce",
            effects: "Energético y estimulante",
            ideal: "Uso diurno, creatividad",
          },
          genealogy: {
            parents: ["Golden Goat", "Agent Orange"],
            lineage: "Híbrido Sativa",
          },
          technical_specs: {
            flowering_time: "8-9 semanas",
            thc: "20%",
            cbd: "<1%",
            yield: "450-550g/m²",
            height: "100-150cm",
            difficulty: "Media",
          },
          prices: {
            pot: { single: 1500, five: 7000, ten: 13000 },
            dome: { twentyFive: 30000, fifty: 55000, hundred: 100000 },
          },
        },
        {
          id: "2",
          number: "#28",
          name: "Golden Glove",
          slug: "golden-glove-28",
          image_url: "/images/27.png",
          description: "Variante potente y relajante",
          thc_percentage: "29.6%",
          cbd_percentage: "<1",
          effect: "Relajante, potente",
          general_info: {
            type: "Híbrido balanceado",
            origin: "California, USA",
            flavor: "Terroso y dulce",
            effects: "Relajante profundo",
            ideal: "Uso nocturno, relajación",
          },
          genealogy: {
            parents: ["Golden Goat", "Agent Orange"],
            lineage: "Híbrido 50/50",
          },
          technical_specs: {
            flowering_time: "9-10 semanas",
            thc: "29.6%",
            cbd: "<1%",
            yield: "500-600g/m²",
            height: "120-180cm",
            difficulty: "Alta",
          },
          prices: {
            pot: { single: 2000, five: 9500, ten: 18000 },
            dome: { twentyFive: 42000, fifty: 80000, hundred: 150000 },
          },
        },
        {
          id: "3",
          number: "#6",
          name: "Piña Tropical",
          slug: "pina-tropical-6",
          image_url: "/images/25.png",
          description: "Sabor tropical con efectos narcóticos",
          thc_percentage: "15.7%",
          cbd_percentage: "<1",
          effect: "Narcótico, eufórico",
          general_info: {
            type: "Indica dominante",
            origin: "Hawai, USA",
            flavor: "Piña tropical y mango",
            effects: "Narcótico y eufórico",
            ideal: "Relajación profunda",
          },
          genealogy: {
            parents: ["Pineapple", "Trainwreck"],
            lineage: "Híbrido Indica",
          },
          technical_specs: {
            flowering_time: "7-8 semanas",
            thc: "15.7%",
            cbd: "<1%",
            yield: "400-500g/m²",
            height: "80-120cm",
            difficulty: "Baja",
          },
          prices: {
            pot: { single: 1200, five: 5500, ten: 10000 },
            dome: { twentyFive: 25000, fifty: 47000, hundred: 90000 },
          },
        },
        {
          id: "4",
          number: "#007",
          name: "SheinBon",
          slug: "sheinbon-007",
          image_url: "/images/29.png",
          description: "Relajante y muy potente",
          thc_percentage: "20.9%",
          cbd_percentage: "<1",
          effect: "Relajante, muy potente",
          general_info: {
            type: "Indica pura",
            origin: "Afganistán",
            flavor: "Terroso y especiado",
            effects: "Relajación extrema",
            ideal: "Dolor crónico, insomnio",
          },
          genealogy: {
            parents: ["Afghan Kush", "Northern Lights"],
            lineage: "Indica pura",
          },
          technical_specs: {
            flowering_time: "8-9 semanas",
            thc: "20.9%",
            cbd: "<1%",
            yield: "450-550g/m²",
            height: "90-130cm",
            difficulty: "Media",
          },
          prices: {
            pot: { single: 1700, five: 8000, ten: 15000 },
            dome: { twentyFive: 35000, fifty: 65000, hundred: 120000 },
          },
        },
        {
          id: "5",
          number: "#088",
          name: "SheinBon",
          slug: "sheinbon-088",
          image_url: "/images/26.png",
          description: "Efecto cerebral y relajante",
          thc_percentage: "20.6%",
          cbd_percentage: "<1",
          effect: "Relajante, cerebral",
          general_info: {
            type: "Híbrido Indica",
            origin: "Afganistán",
            flavor: "Dulce y herbal",
            effects: "Cerebral y corporal",
            ideal: "Meditación, creatividad nocturna",
          },
          genealogy: {
            parents: ["Afghan Kush", "Skunk #1"],
            lineage: "Híbrido Indica",
          },
          technical_specs: {
            flowering_time: "8-9 semanas",
            thc: "20.6%",
            cbd: "<1%",
            yield: "500-600g/m²",
            height: "100-140cm",
            difficulty: "Media",
          },
          prices: {
            pot: { single: 1600, five: 7500, ten: 14000 },
            dome: { twentyFive: 32000, fifty: 60000, hundred: 110000 },
          },
        },
        {
          id: "6",
          number: "#7",
          name: "Piña Tropical",
          slug: "pina-tropical-7",
          image_url: "/images/28.png",
          description: "Variante proactiva y creativa",
          thc_percentage: "15.9%",
          cbd_percentage: "<1",
          effect: "Proactivo, creativo",
          general_info: {
            type: "Sativa dominante",
            origin: "Hawai, USA",
            flavor: "Piña dulce",
            effects: "Energía creativa",
            ideal: "Proyectos creativos, socialización",
          },
          genealogy: {
            parents: ["Pineapple Express", "Haze"],
            lineage: "Híbrido Sativa",
          },
          technical_specs: {
            flowering_time: "9-10 semanas",
            thc: "15.9%",
            cbd: "<1%",
            yield: "400-500g/m²",
            height: "120-160cm",
            difficulty: "Media",
          },
          prices: {
            pot: { single: 1300, five: 6000, ten: 11000 },
            dome: { twentyFive: 27000, fifty: 50000, hundred: 95000 },
          },
        },
      ]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialGenetics))
      return initialGenetics
    }
    return JSON.parse(data)
  },

  getById: (id: string): Genetic | undefined => {
    const genetics = geneticsStore.getAll()
    return genetics.find((g) => g.id === id)
  },

  getBySlug: (slug: string): Genetic | undefined => {
    const genetics = geneticsStore.getAll()
    return genetics.find((g) => g.slug === slug)
  },

  add: (genetic: Omit<Genetic, "id">): Genetic => {
    const genetics = geneticsStore.getAll()
    const newGenetic = {
      ...genetic,
      id: Date.now().toString(),
    }
    genetics.push(newGenetic)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(genetics))
    return newGenetic
  },

  update: (id: string, genetic: Partial<Genetic>): Genetic | undefined => {
    const genetics = geneticsStore.getAll()
    const index = genetics.findIndex((g) => g.id === id)
    if (index === -1) return undefined

    genetics[index] = { ...genetics[index], ...genetic }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(genetics))
    return genetics[index]
  },

  delete: (id: string): boolean => {
    const genetics = geneticsStore.getAll()
    const filtered = genetics.filter((g) => g.id !== id)
    if (filtered.length === genetics.length) return false
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
    return true
  },
}
