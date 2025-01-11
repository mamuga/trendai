import { Campaign, CampaignStatus } from "@repo/shared"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, DollarSign } from "lucide-react"
import Link from "next/link"

interface CampaignCardProps {
  campaign: Campaign
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const statusColor = {
    ACTIVE: "default",
    PENDING: "destructive",
    COMPLETED: "secondary"
  } as const

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">{campaign.title}</CardTitle>
          <Badge variant={statusColor[campaign.status]}>
            {campaign.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {campaign.description}
        </p>
        
        <div className="flex justify-between text-sm">
          <div className="flex items-center gap-1">
            <DollarSign className="h-4 w-4" />
            <span>{campaign.reward} USD</span>
          </div>
          <div className="flex items-center gap-1">
            <CalendarDays className="h-4 w-4" />
            <span>Due: {new Date(campaign.deadline).toLocaleDateString()}</span>
          </div>
        </div>

        <Button asChild className="w-full">
          <Link href={`/influencer/campaigns/${campaign.id}`}>
            View Details
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}