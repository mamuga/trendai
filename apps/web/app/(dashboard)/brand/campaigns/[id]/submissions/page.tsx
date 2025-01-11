"use client"

import { useEffect, useState } from "react"
import { Submission, SubmissionStatus } from "@repo/shared"
import { SubmissionApprovalCard } from "@/components/submissions/approval-card"
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import { api } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

export default function SubmissionApprovalPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>("all")
  const { toast } = useToast()

  useEffect(() => {
    fetchSubmissions()
  }, [params.id])

  async function fetchSubmissions() {
    try {
      const response = await api.brand.getCampaignSubmissions(params.id)
      setSubmissions(response.data)
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

  const handleStatusUpdate = async (
    submissionId: string, 
    status: SubmissionStatus
  ) => {
    try {
      await api.brand.updateSubmissionStatus(submissionId, status)
      toast({
        title: "Success",
        description: `Submission ${status.toLowerCase()} successfully.`
      })
      // Refresh submissions
      fetchSubmissions()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update submission status."
      })
    }
  }

  const filteredSubmissions = submissions.filter(submission => {
    if (filter === "all") return true
    return submission.status === filter
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
        <h1 className="text-3xl font-bold">Review Submissions</h1>
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
        <p className="text-muted-foreground text-center py-8">
          No submissions found.
        </p>
      ) : (
        <div className="space-y-6">
          {filteredSubmissions.map((submission) => (
            <SubmissionApprovalCard
              key={submission.id}
              submission={submission}
              onStatusUpdate={handleStatusUpdate}
            />
          ))}
        </div>
      )}
    </div>
  )
}