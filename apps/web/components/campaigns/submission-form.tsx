"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { CreateSubmission, createSubmissionSchema } from "@repo/shared"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { api } from "@/lib/api"

interface SubmissionFormProps {
  campaignId: string
  onSubmitSuccess?: () => void
}

export function SubmissionForm({ campaignId, onSubmitSuccess }: SubmissionFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<CreateSubmission>({
    resolver: zodResolver(createSubmissionSchema),
    defaultValues: {
      content: {
        platform: "TIKTOK",
        link: ""
      }
    }
  })

  async function onSubmit(data: CreateSubmission) {
    setIsSubmitting(true)
    try {
      await api.influencer.submitContent(campaignId, data)
      form.reset()
      onSubmitSuccess?.()
    } catch (error) {
      console.error("Submission failed:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit Content</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="content.platform"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Platform</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a platform" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="TIKTOK">TikTok</SelectItem>
                      <SelectItem value="INSTAGRAM">Instagram</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content.link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content Link</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Paste your content URL here" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Content"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}