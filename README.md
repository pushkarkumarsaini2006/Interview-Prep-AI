# Interview Prep AI

An AI-powered interview preparation platform for generating role-specific questions, studying guided answers, exploring technical concepts, and organizing interview preparation sessions. The application combines a React and Vite web client with an Express REST API, MongoDB persistence, JWT authentication, profile image uploads, and Google Gemini-powered learning assistance.

## Executive Summary

Interview Prep AI is structured as a deployable full-stack application containing:

- A React and Vite web client for authentication, session management, and interview study.
- An Express REST API for users, preparation sessions, questions, notes, pins, uploads, and AI services.
- MongoDB persistence through Mongoose.
- Render Blueprint configuration for repeatable frontend and backend deployment.

The platform is designed for candidates who want a reusable workspace instead of disconnected AI chats. A user can create a preparation session for a role and experience level, generate question-and-answer material, save the session, pin important questions, add notes, request concept explanations, and return to the session later.

## Business Capabilities

### Interview preparation

- Create sessions by job role, experience level, and topics to focus on.
- Generate interview questions and answers with Google Gemini.
- Load additional questions into an existing session.
- Review answers in an expandable study interface.
- Request AI-generated explanations for individual technical questions.
- Pin important questions for later review.
- Add and update notes attached to questions.
- Delete completed or unwanted preparation sessions.

### Account and profile

- Register and log in with email and password.
- Password hashing with bcryptjs.
- JWT-based authentication with seven-day token expiry.
- Load the authenticated user profile.
- Upload a JPEG, JPG, or PNG profile image up to 5 MB.

### Dashboard experience

- Landing page with product overview and authentication entry points.
- Authenticated dashboard with saved preparation sessions.
- Session cards showing role, experience, topics, question count, description, and update date.
- Responsive interview study view for desktop and mobile layouts.
- Loading states, error messages, toast notifications, and animated question presentation.

## User Roles

| Role | Capabilities |
| --- | --- |
| Visitor | View the landing page, register, or log in. |
| Authenticated user | Create sessions, generate questions, review answers, request explanations, pin questions, update notes, upload a profile image, and delete owned sessions. |

The current data model does not define administrator roles or an administrative dashboard.

## Technology Stack

### Backend

- Node.js 22 LTS recommended; the backend declares support for Node.js 18 through 24.
- Express 4
- MongoDB and Mongoose 8
- JWT authentication with jsonwebtoken
- bcryptjs password hashing
- Multer multipart upload handling
- Google GenAI SDK
- CORS and dotenv configuration

### Frontend

- React 19
- Vite 6
- React Router 7
- Tailwind CSS 4
- Axios
- Framer Motion
- React Markdown with remark-gfm
- React Hot Toast
- React Icons
- Moment.js

### Hosting and operations

- Render web service for the API
- Render static site for the frontend
- MongoDB Atlas or another reachable MongoDB deployment
- Optional Google AI Studio/Gemini API access

## Architecture

```text
                    +----------------------+
                    | Visitor / Candidate  |
                    +----------+-----------+
                               |
                               v
                    +----------------------+
                    | React + Vite client  |
                    | Auth, dashboard,     |
                    | interview workspace  |
                    +----------+-----------+
                               |
                         REST / JSON
                               |
                               v
                    +----------------------+
                    | Express REST API     |
                    | Routes and middleware|
                    +----+-------------+---+
                         |             |
                  Mongoose             | Google GenAI
                         v             v
              +----------+---+   +-----+----------------+
              | MongoDB       |   | Question generation  |
              | users,        |   | and explanations    |
              | sessions,     |   +----------------------+
              | questions     |
              +--------------+
                         |
                         v
              +----------------------+
              | backend/uploads      |
              | Local profile media  |
              +----------------------+
```

## Backend Request Flow

1. The frontend builds API URLs from `VITE_API_URL` and sends requests through Axios.
2. Express parses JSON and URL-encoded data; Multer handles multipart uploads.
3. CORS validates configured frontend origins and local development origins.
4. Protected routes validate a JWT from the `Authorization: Bearer <token>` header.
5. Route modules delegate request handling to controllers.
6. Controllers validate input and read or write MongoDB through Mongoose models.
7. AI controllers call Google Gemini for question generation and explanations.
8. The API returns JSON responses to the frontend.

## Repository Responsibilities

```text
backend/config       MongoDB connection setup
backend/controllers  Authentication, sessions, questions, and AI behavior
backend/middlewares  JWT protection and image-upload constraints
backend/models       User, Session, and Question schemas
backend/routes       HTTP route registration and middleware composition
backend/scripts      Maintenance utilities
backend/utils        AI prompt construction
frontend/.../pages   Landing, authentication, dashboard, and study screens
frontend/.../components Reusable cards, layouts, inputs, loaders, and overlays
frontend/.../context Authenticated user state
frontend/.../utils   API paths, Axios configuration, helpers, and uploads
render.yaml          Render backend and frontend services
```

## Data Model

### User

Stores account identity and profile information:

- `name`
- Unique `email`
- Bcrypt-hashed `password`
- Optional `profileImageUrl`
- `createdAt` and `updatedAt` timestamps

### Session

Stores one interview preparation workspace:

- Owning `user` reference
- `role`
- `experience`
- `topicsToFocus`
- Optional `description`
- References to generated `questions`
- `createdAt` and `updatedAt` timestamps

### Question

Stores one question within a session:

- Parent `session` reference
- `question`
- AI-generated `answer`
- Optional `note`
- `isPinned` flag
- `createdAt` and `updatedAt` timestamps

## Frontend Routes

| Route | Access | Purpose |
| --- | --- | --- |
| `/` | Public | Landing page and authentication entry point. |
| `/dashboard` | Authenticated | View and manage saved preparation sessions. |
| `/interview-prep/:sessionId` | Authenticated | Study questions, pin items, load more questions, and request explanations. |

## API Reference

The local API base URL is `http://localhost:5000`. Deployed clients use the Render backend URL supplied through `VITE_API_URL`.

### System and media

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `GET` | `/health` | Public | Returns `{ "status": "ok" }` as a process-level monitoring and Render health check. |
| `GET` | `/uploads/:filename` | Public | Serves an uploaded profile image. |

### Authentication and profile

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `POST` | `/api/auth/register` | Public | Creates a user and returns a JWT. |
| `POST` | `/api/auth/login` | Public | Authenticates a user and returns a JWT. |
| `GET` | `/api/auth/profile` | JWT required | Returns the authenticated profile. |
| `POST` | `/api/auth/upload-image` | Public | Accepts one multipart file in the `image` field and returns its URL. |

### AI assistance

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `POST` | `/api/ai/generate-questions` | JWT required | Generates role- and topic-specific question-and-answer pairs. |
| `POST` | `/api/ai/generate-explanation` | JWT required | Generates an explanation for a supplied interview question. |

### Preparation sessions

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `POST` | `/api/sessions/create` | JWT required | Creates a session and its initial questions. |
| `GET` | `/api/sessions/my-sessions` | JWT required | Lists the authenticated user’s sessions. |
| `GET` | `/api/sessions/:id` | JWT required | Loads one session with populated questions. |
| `DELETE` | `/api/sessions/:id` | JWT required | Deletes a session and its questions. |

### Questions

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `POST` | `/api/questions/add` | JWT required | Adds generated questions to a session. |
| `POST` | `/api/questions/:id/pin` | JWT required | Toggles the pinned state of a question. |
| `POST` | `/api/questions/:id/note` | JWT required | Adds or updates a question note. |

Protected requests use:

```http
Authorization: Bearer <jwt>
```

## Environment Configuration

Create `backend/.env`:

```dotenv
MONGO_URI=mongodb://127.0.0.1:27017/interview-prep-ai
JWT_SECRET=replace-with-a-long-random-secret
GEMINI_API_KEY=replace-with-a-google-ai-studio-key
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173,http://127.0.0.1:5173
```

Create `frontend/interview-prep-ai/.env`:

```dotenv
VITE_API_URL=http://localhost:5000
```

Only variables prefixed with `VITE_` are exposed to the browser. Never place `MONGO_URI`, `JWT_SECRET`, or `GEMINI_API_KEY` in frontend environment files.

| Variable | Application | Required | Purpose |
| --- | --- | --- | --- |
| `MONGO_URI` | Backend | Yes | MongoDB connection string. |
| `JWT_SECRET` | Backend | Yes | Signs and verifies seven-day JWTs. |
| `GEMINI_API_KEY` | Backend | Yes for AI | Authenticates Google GenAI requests. |
| `PORT` | Backend | No | API port; defaults to `5000` locally or the hosting platform port. |
| `NODE_ENV` | Backend | No | Controls production behavior and upload URL protocol. |
| `CLIENT_URL` | Backend | Yes in deployment | Comma-separated allowed frontend origins for CORS. |
| `VITE_API_URL` | Frontend | Yes | API base URL compiled into the frontend. |

## Local Development

### Prerequisites

- Node.js 22 LTS recommended; Node.js 18 through 24 are supported.
- npm 8 or later.
- A reachable MongoDB instance, local or hosted.
- A Google AI Studio API key for AI generation.

### Installation

From the repository root:

```powershell
cd backend
npm install

cd ..\frontend\interview-prep-ai
npm install
```

Create the two environment files described above before starting the services.

### Start the API

In one terminal:

```powershell
cd backend
npm run dev
```

The API is available at `http://localhost:5000`.

### Start the web client

In a second terminal:

```powershell
cd frontend/interview-prep-ai
npm run dev -- --host 127.0.0.1
```

The Vite development server is available at `http://127.0.0.1:5173`.

## Deployment on Render

The repository includes `render.yaml`, which defines:

- `interview-prep-ai-api`: Node web service rooted at `backend`.
- `interview-prep-ai-web`: static site rooted at `frontend/interview-prep-ai`.
- Backend build command: `npm install`.
- Backend start command: `npm start`.
- Backend health check: `/health`.
- Frontend build command: `npm install && npm run build`.
- Frontend publish directory: `dist`.
- SPA rewrite from `/*` to `/index.html`.

### Deployment procedure

1. Push the repository to GitHub.
2. Open the Render dashboard and choose **New +** -> **Blueprint**.
3. Select `pushkarkumarsaini2006/Interview-Prep-AI` and the `main` branch.
4. Apply the services defined in `render.yaml`.
5. Review or override the Blueprint environment variables. The backend should use:

```text
NODE_ENV=production
CLIENT_URL=https://<frontend-service>.onrender.com
MONGO_URI=<mongodb-connection-string>
JWT_SECRET=<long-random-secret>
GEMINI_API_KEY=<google-ai-studio-key>
```

6. Confirm or override the frontend Blueprint variable:

```text
VITE_API_URL=https://<backend-service>.onrender.com
```

7. Confirm the API health check returns HTTP 200.
8. Open the frontend and verify registration, login, session creation, AI generation, uploads, notes, pins, and session deletion.

## Media Storage Limitation

The current upload implementation stores profile images under `backend/uploads` and serves them from the API. Render web-service disks are ephemeral, so uploaded images can be lost during restarts, redeployments, or instance replacement. For durable production media, integrate an object-storage provider such as Amazon S3, Cloudflare R2, or Cloudinary and persist the returned URL in MongoDB.

## Security and Operational Posture

Current controls include:

- Bcrypt password hashing.
- JWT authentication with seven-day token expiry.
- Protected session, question, and AI endpoints.
- CORS origin configuration through `CLIENT_URL`.
- JSON and URL-encoded request limits of 10 MB.
- Image type filtering and a 5 MB upload limit.
- Production-compatible Render health checking.

Before positioning the application as a hardened enterprise production service, address these gaps:

- Move uploads to durable object storage.
- Protect the currently public image-upload endpoint.
- Add request validation and security headers.
- Enforce ownership checks consistently for every session and question mutation.
- Add structured logging, monitoring, and audit trails.
- Add automated unit, integration, API, and browser-level tests.
- Add CI checks for linting, builds, dependency scanning, and deployment validation.
- Rotate the JWT secret and API credentials if they have been exposed outside local environment files.

## Quality and Verification

The repository currently provides frontend linting, frontend production builds, backend syntax checks, and the `/health` endpoint. It does not currently define an automated test suite.

Recommended verification before release:

```powershell
cd frontend/interview-prep-ai
npm run lint
npm run build

cd ..\..\backend
node --check server.js
```

For a deployment smoke test, verify:

- `GET /health` returns a successful response.
- The frontend loads from the deployed static site.
- Registration and login return a usable JWT.
- Protected dashboard and interview routes enforce authentication.
- AI question and explanation actions work with the configured Gemini model.
- Profile image upload returns a reachable image URL.
- Notes, pins, additional questions, and session deletion behave correctly.

## Project Structure

```text
Interview-Prep-AI/
├── backend/
│   ├── config/                 MongoDB connection
│   ├── controllers/            Authentication, sessions, questions, and AI
│   ├── middlewares/            JWT protection and image uploads
│   ├── models/                 User, session, and question schemas
│   ├── routes/                 API route modules
│   ├── scripts/                Maintenance utilities
│   ├── uploads/                Local uploaded media directory
│   ├── utils/                  AI prompt helpers
│   ├── server.js               Express application entry point
│   └── package.json             Backend scripts and dependencies
├── frontend/interview-prep-ai/
│   ├── public/                 Static assets and SPA fallback
│   ├── src/
│   │   ├── components/         Reusable cards, layouts, inputs, and loaders
│   │   ├── context/            Authenticated user state
│   │   ├── pages/              Landing, auth, dashboard, and study screens
│   │   └── utils/              API, Axios, upload, and shared helpers
│   ├── index.html
│   └── package.json             Frontend scripts and dependencies
├── render.yaml                  Render deployment definition
├── DEPLOYMENT.md                Deployment notes
└── README.md                    Project documentation
```

## Product Roadmap

- Durable object-storage integration for profile images.
- Stronger ownership checks across session and question mutations.
- Request validation, security headers, and structured audit logging.
- Automated unit, integration, and browser test coverage.
- CI/CD quality gates and dependency security scanning.
- Improved study analytics such as progress tracking and question history.
- Additional practice modes, timed mock interviews, and richer feedback workflows.

## License

This project is licensed under the MIT License.

## Developer

**Pushkar Kumar Saini**