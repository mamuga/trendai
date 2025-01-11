"use client"

import { useEffect, useState } from "react"
import { Campaign } from "@repo/shared"
import { CampaignCard } from "@/components/campaigns/campaign-card"
import { Loader2 } from "lucide-react"
import { api } from "@/lib/api"

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCampaigns() {
      try {
        const response = await api.influencer.getCampaigns()
        setCampaigns(response.data)
      } catch (error) {
        console.error("Failed to fetch campaigns:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCampaigns()
  }, [])

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Available Campaigns</h1>
      {campaigns.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">
          No campaigns available at the moment.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {campaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      )}
    </div>
  )
}