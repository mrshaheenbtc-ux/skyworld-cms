# Fly.io Deployment Guide for Sky World CMS

## Prerequisites

1. Install Fly CLI: https://fly.io/docs/hands-on/install-flyctl/
2. Create account: `fly auth signup`
3. Login: `fly auth login`

## Quick Deploy

```bash
# From strapi directory
fly launch --region fra --vm-size shared-cpu-1x --memory 512

# Set secrets (environment variables)
fly secrets set APP_KEYS="key1,key2,key3,key4"
fly secrets set API_TOKEN_SALT="random-string"
fly secrets set ADMIN_JWT_SECRET="random-string"
fly secrets set JWT_SECRET="random-string"
fly secrets set TRANSFER_TOKEN_SALT="random-string"
fly secrets set CLOUDINARY_NAME="your-cloud-name"
fly secrets set CLOUDINARY_KEY="your-api-key"
fly secrets set CLOUDINARY_SECRET="your-api-secret"

# Deploy
fly deploy
```

## PostgreSQL Database

Fly.io provides free PostgreSQL (limited). Create one:

```bash
# Create PostgreSQL app
fly pg create --name skyworld-db --region fra

# Attach to your app (sets DATABASE_URL automatically)
fly pg attach skyworld-db
```

## Free Tier Limits

- 3 VMs free (shared-cpu-1x)
- 3GB storage free
- PostgreSQL: 1GB free
- Bandwidth: Unlimited

## Useful Commands

```bash
fly status          # Check app status
fly logs            # View logs
fly ssh console     # SSH into container
fly scale vm shared-cpu-1x --memory 512  # Scale VM
```