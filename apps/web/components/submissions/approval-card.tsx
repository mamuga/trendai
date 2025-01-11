import { useState } from "react"
import { Submission, SubmissionStatus } from "@repo/shared"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, ThumbsUp, ThumbsDown } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface ApprovalCardProps {
  submission: Submission
  onStatusUpdate: (submissionId: string, status: SubmissionStatus) => Promise<void>
}

export function SubmissionApprovalCard({ 
  submission, 
  onStatusUpdate 
}: ApprovalCardProps) {
  const [isUpdating, setIsUpdating] = useState(false)

  const handleStatusUpdate = async (status: SubmissionStatus) => {
    setIsUpdating(true)
    try {
      await onStatusUpdate(submission.id, status)
    } catch (error) {
      console.error("Status update failed:", error)
    } finally {
      setIsUpdating(false)
    }
  }

  const statusColor: { [key in SubmissionStatus]: "default" | "success" | "destructive" } = {
    PENDING: "default",
    APPROVED: "success",
    REJECTED: "destructive"
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Content Submission</CardTitle>
            <CardDescription>
              Submitted at: {new Date(submission.submittedAt).toLocaleString()}
            </CardDescription>
          </div>
          <Badge variant={statusColor[submission.status]}>
            {submission.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="outline">{submission.content.platform}</Badge>
            <a
              href={submission.content.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-blue-500 hover:underline"
            >
              View Content <ExternalLink className="h-4 w-4" />
            </a>
          </div>
          
          {submission.metrics && (
            <div className="flex gap-4 text-sm text-muted-foreground">
              <span>👍 {submission.metrics.likes}</span>
              <span>🔄 {submission.metrics.shares}</span>
              <span>💬 {submission.metrics.comments}</span>
            </div>
          )}
        </div>

        {submission.status === "PENDING" && (
          <div className="flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => handleStatusUpdate("APPROVED")}
                    disabled={isUpdating}
                    className="flex-1"
                  >
                    <ThumbsUp className="mr-2 h-4 w-4" />
                    Approve
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Approve this submission</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => handleStatusUpdate("REJECTED")}
                    disabled={isUpdating}
                    variant="destructive"
                    className="flex-1"
                  >
                    <ThumbsDown className="mr-2 h-4 w-4" />
                    Reject
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Reject this submission</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
      </CardContent>
    </Card>
  )
}