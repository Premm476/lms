#!/bin/bash
# Script to run prisma migrations and generate client

echo "Running prisma migrate deploy..."
npx prisma migrate deploy

echo "Generating prisma client..."
npx prisma generate

echo "Migration and generation complete."
