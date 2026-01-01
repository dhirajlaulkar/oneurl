<img width="2752" height="1536" alt="og" src="https://github.com/user-attachments/assets/3449d15c-1ebc-4f69-8d16-c2d85aee597f" />


# OneURL

**One URL for all your links** - An open-source alternative to Linktree. Create a beautiful profile page to share all your important links in one place.

## Features

- Google OAuth Authentication - Sign in with your Google account
- Custom Profile Pages - Create personalized profile pages with your username
- Link Management - Add, edit, and organize your links
- Analytics - Track clicks and view detailed analytics
- Customizable - Upload avatar, add bio, and customize your profile
- Responsive Design - Works beautifully on all devices
- Fast & Modern - Built with Next.js 16 and React 19

## Tech Stack

- Framework: Next.js 16 (App Router)
- Language: TypeScript
- Database: PostgreSQL with Prisma ORM
- Authentication: Better Auth
- Styling: Tailwind CSS
- UI Components: Base UI React

## Prerequisites

Before you begin, ensure you have:

- Node.js 20+ or Bun installed
- PostgreSQL database (local or cloud like Neon)
- Google OAuth credentials

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/KartikLabhshetwar/oneurl.git
cd oneurl
```

### 2. Install Dependencies

```bash
bun install
# or
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/oneurl"

# Better Auth
BETTER_AUTH_SECRET="your-secret-key-here"
BETTER_AUTH_URL="http://localhost:3000"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### 4. Set Up Database

```bash
# Generate Prisma Client
bun prisma generate

# Run migrations
bun prisma migrate dev
```

### 5. Run the Development Server

```bash
bun run dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
oneurl/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication routes (login, signup)
│   ├── (dashboard)/       # Dashboard routes (protected)
│   ├── (onboarding)/      # Onboarding flow
│   ├── [username]/        # Public profile pages
│   └── api/               # API routes
├── components/            # React components
│   ├── landing/           # Landing page components
│   └── ui/                # UI component library
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions and services
│   ├── generated/         # Generated Prisma client
│   ├── hooks/             # Custom hooks
│   ├── services/          # Business logic services
│   └── validations/       # Zod schemas
├── prisma/                # Prisma schema and migrations
└── public/                # Static assets
```

## Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun run lint` - Run ESLint

## Additional Setup

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Client Secret to `.env`

## Usage

1. Sign In - Click "Sign In" and authenticate with Google
2. Onboarding - Complete the onboarding flow:
   - Choose a username
   - Upload an avatar (optional)
   - Add your links
   - Preview your profile
3. Dashboard - Manage your profile, links, and view analytics
4. Share - Your profile is available at `oneurl.live/yourusername`

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Database

For production, use a managed PostgreSQL service like:
- [Neon](https://neon.tech/)
- [Supabase](https://supabase.com/)
- [Railway](https://railway.app/)

Update your `DATABASE_URL` in the deployment environment variables.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

Made with ❤️ by [Kartik Labhshetwar](https://github.com/KartikLabhshetwar)
