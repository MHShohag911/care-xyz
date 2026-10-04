# Care.xyz — Caregiving Service Platform

Care.xyz is a full-stack web application designed to make it easier for people to find and book caregiving services. The platform focuses on baby care, elderly care, and support for people who need assistance during illness or recovery.

## Overview

Finding reliable caregiving support can be challenging. Care.xyz aims to simplify the process by providing a platform where users can explore services, review pricing, select their preferred duration and location, and manage their bookings.

## Features

* **Caregiving Services:** Baby Care, Elderly Service, and Sick People Service.
* **Service Details:** View service descriptions, features, and hourly or daily rates.
* **Dynamic Booking Form:** Select service duration and calculate the estimated cost.
* **Location Selection:** Choose a division, district, city, and area, and provide a full address.
* **Form Validation:** Validate user input using React Hook Form and Zod.
* **User Authentication:** Email/password authentication and Google sign-in using Auth.js.
* **Secure Password Storage:** Hash passwords before storing them in the database.
* **Booking Management:** Planned functionality for viewing, tracking, and cancelling bookings.

> Note: Update this feature list as development progresses. Only mark a feature as complete after it has been implemented and tested.

## Technology Stack

**Frontend**

* Next.js
* React
* TypeScript
* Tailwind CSS
* HeroUI

**Backend**

* Next.js App Router
* Auth.js (NextAuth.js)
* MongoDB Native Driver
* MongoDB Atlas
* Zod
* React Hook Form
* bcryptjs

## Project Structure

```text
src/
├── actions/        # Server actions
├── app/            # Pages and API routes
├── components/     # Reusable UI components
├── data/           # Location data
├── lib/             # Database and authentication setup
├── models/          # MongoDB data access
├── types/           # TypeScript types
└── validations/     # Zod validation schemas

scripts/             # Database seed scripts
public/              # Static assets
```

## Getting Started

### Prerequisites

* Node.js (LTS recommended)
* npm
* A MongoDB Atlas account or accessible MongoDB database
* Google OAuth credentials for Google sign-in

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd care-xyz
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```env
MONGODB_URI="your_mongodb_connection_string"
MONGODB_DB="care_xyz"

AUTH_SECRET="your_generated_auth_secret"

AUTH_GOOGLE_ID="your_google_oauth_client_id"
AUTH_GOOGLE_SECRET="your_google_oauth_client_secret"
```

Replace the placeholder values with your own credentials. Never commit `.env.local` or expose secrets in your repository.

Generate an Auth.js secret using:

```bash
npx auth secret
```

### 4. Seed the service data

```bash
npm run seed:services
```

This inserts the initial caregiving services into the MongoDB `services` collection.

### 5. Start the development server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Database Collections

| Collection | Purpose                                                |
| ---------- | ------------------------------------------------------ |
| `services` | Caregiving service information and pricing             |
| `users`    | Registered user information and password hashes        |
| `bookings` | Booking details, duration, location, price, and status |

## Security Considerations

* Passwords are hashed before being stored.
* Environment variables keep database credentials and OAuth secrets out of source code.
* Server-side validation is used to validate submitted data.
* Booking operations must verify the authenticated user's identity and recalculate prices on the server.

## Future Improvements

* Complete the booking creation and management workflow.
* Add booking status tracking and cancellation.
* Send booking confirmation and invoice emails.
* Improve service imagery and responsive layouts.
* Add payment integration with Stripe.
* Build an administrative dashboard for managing services and bookings.

## License

This project is developed for learning and portfolio purposes. Add a license before distributing or reusing the code publicly.
