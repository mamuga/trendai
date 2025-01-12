import { ApiResponse, LoginCredentials, AuthResponse } from "@repo/shared"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

async function fetchApi<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = localStorage.getItem("token")
  
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  })

  if (!response.ok) {
    throw new Error("API Error")
  }

  return response.json()
}

export const api = {
  auth: {
    login: (credentials: LoginCredentials) =>
      fetchApi<AuthResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      }),
  },
  influencer: {
    getCampaigns: () => fetchApi("/influencer/campaigns"),
    submitContent: (campaignId: string, data: any) =>
      fetchApi(`/influencer/campaigns/${campaignId}/submit`, {
        method: "POST",
        body: JSON.stringify(data),
      }),
  },
  brand: {
    getInfluencers: (campaignId: string) =>
      fetchApi(`/brand/campaigns/${campaignId}/influencers`),
    updateSubmissionStatus: (submissionId: string, status: string) =>
      fetchApi(`/submissions/${submissionId}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      }),
  },
}