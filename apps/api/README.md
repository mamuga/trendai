# API Documentation

## Base URL
`http://localhost:8000` (Development)

## Authentication
All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: 
```

## Auth Endpoints

### Login
```
POST /auth/login
```
**Request body:**
```json
{
  "email": "string",
  "password": "string"
}
```
**Response:**
```json
{
  "data": {
    "user": {
      "id": "string",
      "name": "string",
      "email": "string",
      "role": "INFLUENCER" | "BRAND",
      "createdAt": "string",
      "updatedAt": "string"
    },
    "token": "string"
  },
  "message": "Login successful"
}
```

## Influencer Endpoints

### Get Joined Campaigns
```
GET /influencer/campaigns
```
**Response:**
```json
{
  "data": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "requirements": ["string"],
      "reward": "number",
      "status": "ACTIVE" | "COMPLETED" | "PENDING",
      "deadline": "string",
      "submissionCount": "number",
      "createdAt": "string",
      "updatedAt": "string"
    }
  ],
  "message": "Campaigns retrieved successfully"
}
```

### Submit Campaign Content
```
POST /influencer/campaigns/:campaignId/submit
```
**Request body:**
```json
{
  "content": {
    "platform": "TIKTOK" | "INSTAGRAM",
    "link": "string"
  }
}
```
**Response:**
```json
{
  "data": {
    "id": "string",
    "campaignId": "string",
    "influencerId": "string",
    "content": {
      "platform": "TIKTOK" | "INSTAGRAM",
      "link": "string"
    },
    "status": "PENDING",
    "submittedAt": "string",
    "updatedAt": "string"
  },
  "message": "Content submitted successfully"
}
```

## Brand Endpoints

### Get Campaign Details
```
GET /brand/campaigns/:id
```
**Response:**
```json
{
  "data": {
    "id": "string",
    "title": "string",
    "description": "string",
    "requirements": ["string"],
    "reward": "number",
    "status": "ACTIVE" | "COMPLETED" | "PENDING",
    "deadline": "string",
    "brandId": "string",
    "createdAt": "string",
    "updatedAt": "string"
  },
  "message": "Campaign retrieved successfully"
}
```

### Get Campaign Influencers
```
GET /brand/campaigns/:id/influencers
```
**Response:**
```json
{
  "data": [
    {
      "id": "string",
      "user": {
        "name": "string",
        "email": "string"
      },
      "submissions": [
        {
          "id": "string",
          "content": {
            "platform": "TIKTOK" | "INSTAGRAM",
            "link": "string"
          },
          "status": "PENDING" | "APPROVED" | "REJECTED",
          "submittedAt": "string"
        }
      ]
    }
  ],
  "message": "Influencers retrieved successfully"
}
```

### Update Submission Status
```
PATCH /submissions/:id/status
```
**Request body:**
```json
{
  "status": "APPROVED" | "REJECTED"
}
```
**Response:**
```json
{
  "data": {
    "id": "string",
    "status": "APPROVED" | "REJECTED",
    "updatedAt": "string"
  },
  "message": "Submission status updated successfully"
}
```

## Error Responses

### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "errors": [
    {
      "field": "string",
      "message": "string"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

### 403 Forbidden
```json
{
  "statusCode": 403,
  "message": "Forbidden resource"
}
```

### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "Resource not found"
}
```
```