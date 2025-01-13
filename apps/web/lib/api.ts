import { ApiResponse, LoginCredentials, AuthResponse, CreateSubmission, Campaign, Submission } from "@repo/shared"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

function parseJwt(token: string) {
    try {
        const base64Url = token.split('.')[1]
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
        const payload = decodeURIComponent(atob(base64).split('').map(c =>
            '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        ).join(''))
        return JSON.parse(payload)
    } catch (error) {
        console.error('Token parse error:', error)
        return null
    }
}

async function fetchApi<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<ApiResponse<T>> {
    const token = localStorage.getItem("token")

    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
                ...options.headers,
            },
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.message || 'API Error')
        }

        return response.json()
    } catch (error) {
        console.error('API Call failed:', error)
        if (error instanceof Error) {
            throw new Error(error.message)
        }
        throw new Error('API Error')
    }
}

export const api = {
    auth: {
        login: async (credentials: LoginCredentials) => {
            const response = await fetchApi<AuthResponse>("/auth/login", {
                method: "POST",
                body: JSON.stringify(credentials),
            })

            if (response.data) {
                localStorage.setItem("token", response.data.token)
                localStorage.setItem("user", JSON.stringify(response.data.user))
            }

            return response
        },
    },

    brand: {
        // Get campaign influencers
        getCampaignInfluencers: (campaignId: string) => {
            return fetchApi(`/brands/campaigns/${campaignId}/influencers`)
        },

        // Update submission status
        updateSubmissionStatus: (submissionId: string, status: string) => {
            return fetchApi(`/brands/submissions/${submissionId}/status`, {
                method: "PATCH",
                body: JSON.stringify({ status }),
            })
        },
    },

    influencer: {
        // Get joined campaigns
        getCampaigns: () => {
            return fetchApi<Campaign[]>("/influencers/campaigns")
        },

        // Submit content for a campaign
        submitContent: (campaignId: string, data: CreateSubmission) => {
            return fetchApi(`/influencers/campaigns/${campaignId}/submit`, {
                method: "POST",
                body: JSON.stringify(data),
            })
        },
    },

    campaigns: {
        // Get single campaign details
        get: (campaignId: string) => {
            return fetchApi<Campaign>(`/campaigns/${campaignId}`)
        },
    },
}