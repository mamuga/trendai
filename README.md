```markdown
# TrendAI - Influencer Campaign Management Platform

## Challenge Overview
This project implements a platform connecting brands with influencers for marketing campaigns. The implementation focuses on core functionalities from both influencer and brand perspectives.

### Implemented Features

#### Influencer View:
- Campaign List Page: Browse available campaigns with status and deadlines
- Campaign Details Page: View requirements and submit content

#### Brand View:
- Influencer List Page: View participating influencers and their submissions
- Submission Approval Page: Review and approve/reject influencer submissions

## Project Structure
```bash
trendai/
├── apps/
│   ├── api/                    # NestJS Backend
│   │   ├── src/
│   │   │   ├── auth/          # Authentication module
│   │   │   ├── campaign/      # Campaign management
│   │   │   ├── submission/    # Content submissions
│   │   │   ├── user/          # User management
│   │   │   ├── app.module.ts
│   │   │   └── main.ts
│   │   └── package.json
│   │
│   └── web/                    # Next.js Frontend
│       ├── app/
│       │   ├── (auth)/        # Public routes
│       │   │   └── login/     # Authentication
│       │   └── (dashboard)/   # Protected routes
│       │       ├── influencer/
│       │       │   └── campaigns/  # Influencer views
│       │       └── brand/
│       │           └── campaigns/  # Brand views
│       ├── components/        # Reusable components
│       └── package.json
│
├── packages/
│   ├── database/               # Database package
│   │   ├── prisma/             # Prisma schema and migrations
│   │   ├── src/                # Source code
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── shared/                 # Shared types package
│       ├── src/
│       │   ├── types/          # Type definitions
│       │   └── enums/          # Shared enums
│       └── package.json
```
```

## Tech Stack

Frontend: Next.js 15, TypeScript, Tailwind CSS, shadcn/ui
Backend: NestJS, Prisma ORM
Database: MongoDB
Authentication: JWT
Monorepo: Turborepo

## Quick Start

### Prerequisites

- Node.js 18+
- pnpm
- MongoDB (local or remote)

### Installation Steps

#### Clone and Install Dependencies

```bash
git clone https://github.com/mamuga/trendai.git
cd trendai
pnpm install
```

### Environment Setup

Create .env files:

For backend (`apps/api/.env`):
```env
JWT_SECRET="your-secret-key"
PORT=8000
```

For frontend (`apps/web/.env`):
```env
NEXT_PUBLIC_API_URL="http://localhost:8000"
```

### Database Setup

Create a MongoDB database and update the connection string in `packages/database/.env`:

```env
DATABASE_URL="mongodb+srv://username:password@cluster0.mvnef.mongodb.net/databasename?retryWrites=true&w=majority

```

Generate Prisma client run the database:

```bash
cd packages/database
pnpm db:generate
pnpm db:push
```

### Start Development Servers

```bash
# From root directory
pnpm run dev
```

This will start:

- Frontend: http://localhost:3000
- Backend: http://localhost:8000

## Testing the Application 

### Login Credentials

Brand Account:
- Email: brand@example.com
- Password: Brand123!

Influencer Account:
- Email: influencer@example.com
- Password: Influencer123!

### Flow Overview

#### Brand Flow:

- View campaign influencers
- Review and approve/reject submissions

#### Influencer Flow:

- Browse available campaigns
- Submit content for campaigns

## Implementation Details

### Backend Endpoints

- `/influencer/campaigns` - Get joined campaigns
- `/brand/campaigns/:id/influencers` - Get campaign influencers
- `/submissions/:id/status` - Approve/reject submissions

### Frontend Pages

- `/influencer/campaigns` - Campaign list
- `/influencer/campaigns/[id]` - Campaign details
- `/brand/campaigns/[id]` - Influencer list
- `/brand/campaigns/[id]/submissions` - Submission approval

