# 32Co Take-Home Test

Author: Tung Nguyen

## Setup

- Run `docker-compose up -d` to start local MongoDB server
- Run `npm run start` to start the backend project
- Project starts at `localhost:3000`
- Swagger document located at `localhost:3000/api`

## API endpoints and examples

- Endpoints and examples are all included in Swagger document at `localhost:3000/api`

## Architecture decisions

- Using Nest.js + MongoDB to build the backend application rapidly.
- Using JwtPassport + Guard (AdminGuard, CustomerGuard) to authenticate using JWT token + authorize roles properly -> practice standard authen + author flow in Nest.js
- Use Controller + Service architecture. Use model to connect to database directly instead of Repository -> for rapid development.

## Assumption + Trade-offs

- Assume that cart infomation are saved in database instead of on devices.
- Can offload Authen + Author flow to a Auth0 service for better security.
- Need to add transaction to crucial services (create order, ...)
- Some services with high customers' usage can be changed to queue / event architecture for better throughput / performance (create order, update cart, ...)
