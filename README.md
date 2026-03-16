# Serverless URL Shortener

A serverless URL shortener built on AWS using SAM, Lambda, API Gateway, and DynamoDB.

## Architecture
- **API Gateway** — handles HTTP requests
- **Lambda** — two functions: shorten and redirect
- **DynamoDB** — stores short codes and original URLs
- **CloudWatch** — logs and monitoring

## Usage
Create a short URL:
```
curl -X POST https://d3wkj9enbl.execute-api.us-east-1.amazonaws.com/Prod/shorten \
  -H "Content-Type: application/json" \
  -d '{"url": "https://www.example.com"}'
```

## Deploy
```
sam build
sam deploy --guided
```
