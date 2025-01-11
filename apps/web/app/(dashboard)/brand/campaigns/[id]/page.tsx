"use client"

import { useEffect, useState } from "react"
import { Campaign, Submission } from "@repo/shared"
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
import { Separator } from "@/components/ui/separator"
import {
  Loader2,
  Users,
  Calendar,
  DollarSign,
  ExternalLink,
  Clock
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import { api } from "@/lib/api"

interface Influencer {
  id: string;
  user: {
    name: string;
    email: string;
  };
  submissions: Submission[];
}

export default function CampaignDetailsPage({
                                              params,
                                            }: {
  params: { id: string }
}) {
  const [campaign, setCampaign] = useState<Campaign | null>(null)
  const [influencers, setInfluencers] = useState<Influencer[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    async function fetchData() {
      try {
        const [campaignRes, influencersRes] = await Promise.all([
          api.brand.getCampaign(params.id),
          api.brand.getCampaignInfluencers(params.id)
        ])
        setCampaign(campaignRes.data)
        setInfluencers(influencersRes.data)
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load campaign details."
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [params.id, toast])

  if (loading) {
    return (
        <div className="flex h-96 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
    )
  }

  if (!campaign) return null

  const totalSubmissions = influencers.reduce(
      (acc, inf) => acc + inf.submissions.length,
      0
  )

  return (
      <div className="container py-8 space-y-8">
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
                <CardTitle className="text-sm font-medium">
                  Total Influencers
                </CardTitle>
              </div>
              <p className="text-2xl font-bold mt-2">{influencers.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
                <CardTitle className="text-sm font-medium">
                  Total Submissions
                </CardTitle>
              </div>
              <p className="text-2xl font-bold mt-2">{totalSubmissions}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <CardTitle className="text-sm font-medium">
                  Reward
                </CardTitle>
              </div>
              <p className="text-2xl font-bold mt-2">${campaign.reward}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <CardTitle className="text-sm font-medium">
                  Deadline
                </CardTitle>
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
            <CardDescription>
              Guidelines for influencers to follow
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              {campaign.requirements.map((req, index) => (
                  <li key={index} className="text-muted-foreground">
                    {req}
                  </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Influencers Table */}
        <Card>
          <CardHeader>
            <CardTitle>Campaign Influencers</CardTitle>
            <CardDescription>
              Overview of participating influencers
            </CardDescription>
          </CardHeader>
          <CardContent>
            {influencers.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">
                  No influencers have joined this campaign yet.
                </div>
            ) : (
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
                          <TableCell>
                            {influencer.submissions.length}
                          </TableCell>
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
                              <Link
                                  href={`/brand/campaigns/${params.id}/submissions?influencer=${influencer.id}`}
                              >
                                View Submissions
                              </Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button asChild>
            <Link href={`/brand/campaigns/${params.id}/submissions`}>
              Review All Submissions
            </Link>
          </Button>
        </div>
      </div>
  )
}