# TrendAI - Influencer Campaign Management Platform

TrendAI is a platform that connects brands with influencers for marketing campaigns. Built with Next.js, NestJS, and MongoDB in a Turborepo monorepo structure.

## Features

### For Influencers
- **Campaign Discovery**: Browse and view available marketing campaigns
- **Campaign Submission**: Submit content links (TikTok/Instagram) for campaigns
- **Performance Tracking**: Track submission status and engagement metrics

### For Brands
- **Campaign Management**: Overview of active campaigns and influencer participation
- **Submission Review**: Review and approve/reject influencer submissions
- **Performance Analytics**: Track campaign engagement and influencer metrics

## Tech Stack

- **Frontend**: Next.js 15, Tailwind CSS, shadcn/ui
- **Backend**: NestJS, Prisma ORM
- **Database**: MongoDB
- **Authentication**: JWT
- **Monorepo**: Turborepo

## Prerequisites

- Node.js 18 or higher
- pnpm (Package Manager)
- MongoDB instance
- Git

## Setup Instructions

 1. Clone the Repository

```bash
git clone 
cd trendai


2. Install Dependencies  


```bash
pnpm install


3. Environment Setup
Create .env files:

For backend (apps/api/.env):
env

```bash
DATABASE_URL="mongodb://localhost:27017/trendai"
JWT_SECRET="your-secret-key"
PORT=3000

For frontend (apps/web/.env):
env

```bash
NEXT_PUBLIC_API_URL="http://localhost:3000"


4. Database Setup

```bash
cd apps/api
pnpm prisma generate
pnpm prisma db push


5. Run Development Servers
From the root directory, run:

```bash
pnpm dev
This will start:

Frontend: http://localhost:3000
Backend: http://localhost:8000


API Endpoints
Authentication
POST /auth/login - User login
POST /auth/register - User registration
Influencer Endpoints
GET /influencer/campaigns - List joined campaigns
POST /influencer/campaigns/:id/submit - Submit campaign content
Brand Endpoints
GET /brand/campaigns/:id/influencers - List campaign influencers
PATCH /submissions/:id/status - Update submission status

