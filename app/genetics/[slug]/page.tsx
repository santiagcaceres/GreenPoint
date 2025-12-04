"use client"

import { notFound } from "next/navigation"
import { GeneticDetailClient } from "@/components/genetic-detail-client"
import { geneticsStore } from "@/lib/genetics-store"

export default async function GeneticDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const genetic = geneticsStore.getBySlug(slug)

  if (!genetic) {
    notFound()
  }

  return <GeneticDetailClient genetic={genetic} slug={slug} />
}
