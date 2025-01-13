"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Submission, SubmissionStatus } from "@repo/shared"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2, ArrowLeft, Globe, User, Clock } from "lucide-react"
import { api } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

// Mock data for testing
const mockSubmissions = [
  {
    id: "sub1",
    influencerId: "inf1",
    campaignId: "campaign1",
    status: "PENDING",
    content: {
      platform: "Instagram",
      link: "https://instagram.com/post1"
    },
    submittedAt: new Date().toISOString(),
    influencer: {
      name: "Sarah Smith",
      email: "sarah@example.com"
    }
  },
  {
    id: "sub2",
    influencerId: "inf2",
    campaignId: "campaign1",
    status: "APPROVED",
    content: {
      platform: "TikTok",
      link: "https://tiktok.com/video1"
    },
    submittedAt: new Date().toISOString(),
    influencer: {
      name: "John Doe",
      email: "john@example.com"
    }
  },
  {
    id: "sub3",
    influencerId: "inf1",
    campaignId: "campaign1",
    status: "REJECTED",
    content: {
      platform: "YouTube",
      link: "https://youtube.com/video1"
    },
    submittedAt: new Date().toISOString(),
    influencer: {
      name: "Sarah Smith",
      email: "sarah@example.com"
    }
  }
]

function getStatusBadgeColors(status: string) {
  switch (status.toLowerCase()) {
    case 'approved':
      return 'bg-green-500/10 text-green-500 border-green-500/20'
    case 'pending':
      return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
    case 'rejected':
      return 'bg-red-500/10 text-red-500 border-red-500/20'
    default:
      return ''
  }
}

export default function SubmissionsPage({
                                          params
                                        }: {
  params: { id: string }
}) {
  const [submissions, setSubmissions] = useState<any[]>(mockSubmissions)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>("all")
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const influencerId = searchParams.get('influencer')

  useEffect(() => {
    async function fetchSubmissions() {
      try {
        // In real implementation, would fetch from API
        // const response = await api.brand.getCampaignSubmissions(params.id)
        // setSubmissions(response.data)
        setSubmissions(mockSubmissions)
      } catch (error) {
        console.error("Failed to fetch submissions:", error)
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load submissions."
        })
      } finally {
        setLoading(false)
      }
    }

    fetchSubmissions()
  }, [params.id, toast])

  const handleStatusUpdate = async (
      submissionId: string,
      newStatus: SubmissionStatus
  ) => {
    try {
      await api.brand.updateSubmissionStatus(submissionId, newStatus)
      toast({
        title: "Success",
        description: `Submission ${newStatus.toLowerCase()} successfully.`
      })

      // Update local state
      setSubmissions(submissions.map(sub =>
          sub.id === submissionId ? { ...sub, status: newStatus } : sub
      ))
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update submission status."
      })
    }
  }

  const filteredSubmissions = submissions.filter(submission => {
    const matchesInfluencer = influencerId ? submission.influencerId === influencerId : true
    const matchesStatus = filter === "all" ? true : submission.status === filter
    return matchesInfluencer && matchesStatus
  })

  if (loading) {
    return (
        <div className="flex h-96 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
    )
  }

  return (
      <div className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-1">
            <div className="flex items-center space-x-4">
              <Button
                  variant="ghost"
                  size="sm"
                  asChild
              >
                <Link href={`/dashboard/brand/campaigns/${params.id}`}>
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to Campaign
                </Link>
              </Button>
            </div>
            <h1 className="text-3xl font-bold">Review Submissions</h1>
            {influencerId && (
                <p className="text-muted-foreground">
                  Viewing submissions for selected influencer
                </p>
            )}
          </div>

          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All Submissions</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="APPROVED">Approved</SelectItem>
                <SelectItem value="REJECTED">Rejected</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {filteredSubmissions.length === 0 ? (
            <div className="text-center py-12 border rounded-lg">
              <p className="text-muted-foreground text-lg">
                No submissions found
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {filter !== "all"
                    ? "Try changing your filter to see more submissions"
                    : "Check back later for new submissions"}
              </p>
            </div>
        ) : (
            <div className="space-y-6">
              {filteredSubmissions.map((submission) => (
                  <Card key={submission.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <User className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <CardTitle>{submission.influencer.name}</CardTitle>
                            <CardDescription>{submission.influencer.email}</CardDescription>
                          </div>
                        </div>
                        <Badge
                            variant="outline"
                            className={getStatusBadgeColors(submission.status)}
                        >
                          {submission.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Globe className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{submission.content.platform}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                        Submitted on {new Date(submission.submittedAt).toLocaleDateString()}
                      </span>
                          </div>
                        </div>
                        <div>
                          <a
                              href={submission.content.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline"
                          >
                            View Content
                          </a>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end space-x-2">
                      <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStatusUpdate(submission.id, "REJECTED")}
                          disabled={submission.status === "REJECTED"}
                      >
                        Reject
                      </Button>
                      <Button
                          size="sm"
                          onClick={() => handleStatusUpdate(submission.id, "APPROVED")}
                          disabled={submission.status === "APPROVED"}
                      >
                        Approve
                      </Button>
                    </CardFooter>
                  </Card>
              ))}
            </div>
        )}
      </div>
  )
}