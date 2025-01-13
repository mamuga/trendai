// app/dashboard/influencer/campaigns/page.tsx
"use client"

import { useEffect, useState } from "react"
import { Campaign } from "@repo/shared"
import { CampaignCard } from "@/components/campaigns/campaign-card"
import {
  Loader2,
  Filter,
  Search,
  PlusCircle
} from "lucide-react"
import { api } from "@/lib/api"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Mock data for testing
const mockCampaigns = [
  {
    id: "1",
    title: "Summer Fashion Campaign",
    description: "Share our latest summer collection with your followers",
    status: "ACTIVE",
    reward: 500,
    requirements: ["3 Instagram posts", "2 TikTok videos"],
    deadline: new Date("2025-06-01").toISOString()
  },
  {
    id: "2",
    title: "Fitness Challenge",
    description: "30-day fitness challenge promotion",
    status: "PENDING",
    reward: 800,
    requirements: ["Daily Instagram stories", "Weekly YouTube video"],
    deadline: new Date("2025-07-15").toISOString()
  },
  {
    id: "3",
    title: "Tech Review Series",
    description: "Review our new gadget lineup",
    status: "COMPLETED",
    reward: 1000,
    requirements: ["Detailed YouTube review", "Instagram highlights"],
    deadline: new Date("2024-12-31").toISOString()
  }
]

export default function InfluencerCampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

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

    // Comment out for testing with mock data
    // fetchCampaigns()
    setLoading(false)
  }, [])

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campaign.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || campaign.status === filterStatus
    return matchesSearch && matchesFilter
  })

  if (loading) {
    return (
        <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto" />
            <p className="mt-4 text-muted-foreground">Loading campaigns...</p>
          </div>
        </div>
    )
  }

  return (
      <div className="space-y-8 p-8">
        {/* Header Section */}
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Available Campaigns</h1>
            <p className="text-muted-foreground mt-1">
              Browse and discover campaigns that match your profile
            </p>
          </div>
        </div>

        {/* Filters Section */}
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
                placeholder="Search campaigns..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select
              value={filterStatus}
              onValueChange={setFilterStatus}
          >
            <SelectTrigger className="w-full md:w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Campaigns</SelectItem>
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="COMPLETED">Completed</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Campaigns Grid */}
        {filteredCampaigns.length === 0 ? (
            <div className="flex h-[400px] flex-col items-center justify-center rounded-lg border border-dashed">
              <div className="text-center">
                <Filter className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <h3 className="mt-4 text-lg font-semibold">No campaigns found</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {searchTerm
                      ? "Try adjusting your search terms"
                      : "Check back later for new campaigns"}
                </p>
              </div>
            </div>
        ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCampaigns.map((campaign) => (
                  <CampaignCard
                      key={campaign.id}
                      campaign={campaign}
                      href={`/dashboard/influencer/campaigns/${campaign.id}`}
                  />
              ))}
            </div>
        )}
      </div>
  )
}