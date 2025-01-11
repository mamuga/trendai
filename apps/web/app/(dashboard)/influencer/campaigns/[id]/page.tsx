"use client"

import { useEffect, useState } from "react"
import { Campaign } from "@repo/shared"
import { SubmissionForm } from "@/components/campaigns/submission-form"
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, DollarSign, Loader2 } from "lucide-react"
import { api } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

export default function CampaignDetailsPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const [campaign, setCampaign] = useState<Campaign>()
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    async function fetchCampaign() {
      try {
        const response = await api.campaigns.get(params.id)
        setCampaign(response.data)
      } catch (error) {
        console.error("Failed to fetch campaign:", error)
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load campaign details."
        })
      } finally {
        setLoading(false)
      }
    }

    fetchCampaign()
  }, [params.id, toast])

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!campaign) return null

  return (
    <div className="container py-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{campaign.title}</h1>
        <Badge>{campaign.status}</Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Campaign Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">
              {campaign.description}
            </p>
            
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                <span className="font-medium">{campaign.reward} USD</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5" />
                <span className="font-medium">
                  Due: {new Date(campaign.deadline).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Requirements</h3>
              <ul className="list-disc pl-5 space-y-1">
                {campaign.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        <SubmissionForm 
          campaignId={campaign.id} 
          onSubmitSuccess={() => {
            toast({
              title: "Success",
              description: "Your content has been submitted successfully."
            })
          }}
        />
      </div>
    </div>
  )
}