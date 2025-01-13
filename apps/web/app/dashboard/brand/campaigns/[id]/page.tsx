"use client"

import { useEffect, useState } from "react"
import { Campaign } from "@repo/shared"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Calendar,
  DollarSign,
  ExternalLink,
  Clock,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

// Mock data for testing
const mockCampaign = {
  id: "campaign-1",
  title: "Summer Fashion Campaign",
  description: "Promote our new summer collection",
  status: "ACTIVE",
  reward: 500,
  requirements: [
    "Post 3 Instagram stories",
    "1 TikTok video",
    "Tag @brandname"
  ],
  deadline: new Date("2025-06-01").toISOString()
}

const mockInfluencers = [
  {
    id: "inf1",
    user: {
      name: "Sarah Lofa",
      email: "sarah@example.com",
    },
    submissions: [
      {
        id: "sub1",
        submittedAt: new Date("2024-01-10").toISOString()
      }
    ]
  },
  {
    id: "inf2",
    user: {
      name: "John Kiplimo",
      email: "john@example.com",
    },
    submissions: []
  }
]

export default function CampaignDetailsPage({
                                              params,
                                            }: {
  params: { id: string }
}) {
  const [campaign, setCampaign] = useState<Campaign | null>(mockCampaign)
  const [influencers, setInfluencers] = useState(mockInfluencers)
  const { toast } = useToast()

  useEffect(() => {
    async function fetchData() {
      try {
        const influencersRes = await api.brand.getCampaignInfluencers(params.id)
        setInfluencers(influencersRes.data)
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load campaign details."
        })
      }
    }

    // Uncomment to use real API
    // fetchData()
  }, [params.id, toast])

  if (!campaign) return null

  const totalSubmissions = influencers.reduce(
      (acc, inf) => acc + inf.submissions.length,
      0
  )

  return (
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{campaign.title}</h1>
            <p className="text-muted-foreground mt-1">
              {campaign.description}
            </p>
          </div>
          <Badge
              variant={campaign.status === 'ACTIVE' ? 'default' : 'secondary'}
              className="text-sm"
          >
            {campaign.status}
          </Badge>
        </div>

        {/* Campaign Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium">Total Influencers</p>
              </div>
              <p className="text-2xl font-bold mt-2">{influencers.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium">Total Submissions</p>
              </div>
              <p className="text-2xl font-bold mt-2">{totalSubmissions}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium">Reward</p>
              </div>
              <p className="text-2xl font-bold mt-2">${campaign.reward}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium">Deadline</p>
              </div>
              <p className="text-2xl font-bold mt-2">
                {new Date(campaign.deadline).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Campaign Requirements */}
        <Card>
          <CardHeader>
            <CardTitle>Campaign Requirements</CardTitle>
            <CardDescription>Guidelines for influencers to follow</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              {campaign.requirements.map((req, index) => (
                  <li key={index} className="text-muted-foreground">{req}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Influencers Table */}
        <Card>
          <CardHeader>
            <CardTitle>Campaign Influencers</CardTitle>
            <CardDescription>Overview of participating influencers</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Influencer</TableHead>
                  <TableHead>Submissions</TableHead>
                  <TableHead>Latest Activity</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {influencers.map((influencer) => (
                    <TableRow key={influencer.id}>
                      <TableCell className="font-medium">
                        {influencer.user.name}
                      </TableCell>
                      <TableCell>{influencer.submissions.length}</TableCell>
                      <TableCell>
                        {influencer.submissions.length > 0 ? (
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              {new Date(
                                  influencer.submissions[0].submittedAt
                              ).toLocaleDateString()}
                            </div>
                        ) : (
                            <span className="text-muted-foreground">
                        No submissions yet
                      </span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                            variant="outline"
                            size="sm"
                            asChild
                        >
                          <Link href={`/dashboard/brand/campaigns/${params.id}/submissions?influencer=${influencer.id}`}>
                            View Submissions
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button asChild>
            <Link href={`/dashboard/brand/campaigns/${params.id}/submissions`}>
              Review All Submissions
            </Link>
          </Button>
        </div>
      </div>
  )
}