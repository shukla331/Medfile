# Backend

Node.js + Express backend for the Medfile journey.

## Run locally

```bash
npm install
npm run dev
```

The service will start on `http://localhost:4000`.

## Available endpoints (stubbed)

- `POST /auth/request-otp`
- `POST /auth/verify-otp`
- `GET /family`
- `POST /family`
- `POST /prescriptions/upload`
- `POST /provider/prescriptions/upload`
- `GET /review/queue`
- `POST /review/assign`
- `POST /review/complete`
- `GET /prescriptions/:id/pharmacy-ready`
- `GET /prescriptions/:id/timeline`
