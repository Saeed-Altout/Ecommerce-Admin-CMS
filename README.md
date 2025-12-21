# Vendo

A comprehensive, multi-store E-commerce Admin Dashboard and Storefront built with modern web technologies. This application serves as a centralized content management system for managing products, categories, billboards, orders, and store attributes across multiple storefronts, with integrated payment processing.

## 🚀 Tech Stack

- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components:** [Radix UI](https://www.radix-ui.com/), Lucide Icons, Sonner (Toasts)
- **Database:** PostgreSQL (via [Prisma ORM](https://www.prisma.io/))
- **Authentication:** [NextAuth.js v5](https://next-auth.js.org/) with Prisma Adapter
- **Payment Processing:** [Stripe](https://stripe.com/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching:** [TanStack Query](https://tanstack.com/query)
- **Forms:** React Hook Form + Zod
- **Image Storage:** [Cloudinary](https://cloudinary.com/)
- **Date Handling:** date-fns
- **Email:** Resend

## ✨ Key Features

### Admin Dashboard

- **Multi-Store Architecture:** Create and manage multiple distinct stores from a single dashboard account
- **Product Management:** Full CRUD capabilities for products with:
  - Price management
  - Featured and archived status
  - Multiple images per product
  - Category, size, and color associations
- **Category Management:** Organize products into hierarchical categories with billboard associations
- **Billboard Management:** Create and manage promotional banner images for stores
- **Attribute Management:** Define and manage product attributes (Sizes and Colors)
- **Order Management:** View and track all orders with payment status, customer details, and order items
- **Store Settings:** Configure individual store settings
- **Analytics Dashboard:** Overview of store performance and metrics

### Storefront (Public)

- **Product Catalog:** Browse products by category
- **Product Details:** View detailed product information with image galleries
- **Shopping Cart:** Add products to cart with persistent storage
- **Checkout:** Secure checkout process via Stripe
- **Order Tracking:** View order status after payment

### Authentication & Security

- **NextAuth.js Integration:** Secure authentication with multiple providers
- **Two-Factor Authentication:** Enhanced security with 2FA support
- **Role-Based Access Control:** Admin and User roles
- **Email Verification:** Account verification via email
- **Password Reset:** Secure password reset functionality
- **OAuth Providers:** Support for Google and GitHub authentication

### Payment Processing

- **Stripe Integration:** Secure payment processing
- **Webhook Handling:** Automatic order updates after payment
- **Order Management:** Automatic order status updates and product archiving

## 🛠️ Prerequisites

Before you begin, ensure you have the following ready:

- **Node.js**: v18 or higher
- **PostgreSQL**: A running instance of PostgreSQL database
- **Stripe Account**: For payment processing (test mode for development)
- **Cloudinary Account**: For image upload credentials
- **Resend Account**: For email functionality (optional, for email verification)

## ⚙️ Environment Variables

Create a `.env` file in the root directory and configure the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@host:port/db_name?schema=public"

# NextAuth.js
AUTH_SECRET="your-secret-key-here" # Generate with: openssl rand -base64 32
AUTH_URL="http://localhost:3000" # Your application URL

# OAuth Providers (Optional)
AUTH_GOOGLE_ID="your-google-client-id"
AUTH_GOOGLE_SECRET="your-google-client-secret"
AUTH_GITHUB_ID="your-github-client-id"
AUTH_GITHUB_SECRET="your-github-client-secret"

# Email (Resend)
RESEND_API_KEY="your-resend-api-key"

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..." # Get from Stripe Dashboard → Webhooks

# Application
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## 📦 Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Saeed-Altout/Ecommerce-Admin-CMS.git
   cd vendo
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Setup Database:**

   Push the Prisma schema to your database:

   ```bash
   npx prisma db push
   ```

   Generate Prisma Client:

   ```bash
   npx prisma generate
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📜 Scripts

- `npm run dev`: Starts the development server
- `npm run build`: Builds the application for production
- `npm run start`: Starts the production server
- `npm run lint`: Runs ESLint to check for code quality issues
- `npx prisma studio`: Opens a GUI to view and edit your database data
- `npx prisma db push`: Pushes Prisma schema changes to the database
- `npx prisma generate`: Generates Prisma Client

## 🏗️ Project Structure

```
vendo/
├── app/                          # Next.js App Router pages
│   ├── (root)/                   # Public storefront routes
│   │   ├── (routes)/             # Public pages (home, cart, products, categories)
│   │   └── _components/          # Public components (navbar, footer)
│   ├── api/                      # API routes
│   │   ├── [storeId]/            # Store-specific API endpoints
│   │   │   ├── checkout/         # Stripe checkout endpoint
│   │   │   ├── products/         # Product CRUD endpoints
│   │   │   ├── categories/        # Category CRUD endpoints
│   │   │   ├── billboards/       # Billboard CRUD endpoints
│   │   │   ├── sizes/            # Size CRUD endpoints
│   │   │   └── colors/           # Color CRUD endpoints
│   │   ├── webhook/               # Stripe webhook handler
│   │   ├── auth/                  # NextAuth.js endpoints
│   │   └── stores/                # Store management endpoints
│   ├── auth/                      # Authentication pages
│   ├── dashboard/                 # Admin dashboard
│   │   └── [storeId]/             # Store-specific dashboard
│   │       └── (routes)/          # Dashboard routes (products, orders, etc.)
│   └── getting-started/          # Getting started page
├── components/                    # React components
│   ├── auth/                      # Authentication components
│   ├── ui/                        # Reusable UI components
│   ├── store/                     # Storefront components
│   └── modals/                    # Modal components
├── lib/                           # Utility libraries
│   ├── db.ts                      # Prisma database client
│   ├── stripe.ts                  # Stripe client
│   ├── auth.ts                    # NextAuth configuration
│   └── utils.ts                   # Utility functions
├── prisma/                        # Prisma schema and migrations
│   └── schema.prisma              # Database schema
├── data/                          # Data access layer
├── services/                      # API service functions
├── hooks/                         # Custom React hooks
├── schemas/                       # Zod validation schemas
└── providers/                     # React context providers
```

## 🔌 API Endpoints

### Store Management

- `GET /api/stores` - List all stores
- `POST /api/stores` - Create a new store
- `GET /api/stores/[storeId]` - Get store details
- `PATCH /api/stores/[storeId]` - Update store
- `DELETE /api/stores/[storeId]` - Delete store

### Products

- `GET /api/[storeId]/products` - List products
- `POST /api/[storeId]/products` - Create product
- `GET /api/[storeId]/products/[productId]` - Get product details
- `PATCH /api/[storeId]/products/[productId]` - Update product
- `DELETE /api/[storeId]/products/[productId]` - Delete product

### Categories

- `GET /api/[storeId]/categories` - List categories
- `POST /api/[storeId]/categories` - Create category
- `GET /api/[storeId]/categories/[categoryId]` - Get category details
- `PATCH /api/[storeId]/categories/[categoryId]` - Update category
- `DELETE /api/[storeId]/categories/[categoryId]` - Delete category

### Billboards

- `GET /api/[storeId]/billboards` - List billboards
- `POST /api/[storeId]/billboards` - Create billboard
- `GET /api/[storeId]/billboards/[billboardId]` - Get billboard details
- `PATCH /api/[storeId]/billboards/[billboardId]` - Update billboard
- `DELETE /api/[storeId]/billboards/[billboardId]` - Delete billboard

### Checkout & Payments

- `POST /api/[storeId]/checkout` - Create Stripe checkout session
- `POST /api/webhook` - Stripe webhook handler (updates orders after payment)

## 💳 Stripe Webhook Setup

### Local Development

1. Install Stripe CLI:

   ```bash
   # macOS
   brew install stripe/stripe-cli/stripe

   # Windows (via Scoop)
   scoop install stripe
   ```

2. Login to Stripe:

   ```bash
   stripe login
   ```

3. Forward webhooks to local server:

   ```bash
   stripe listen --forward-to localhost:3000/api/webhook
   ```

4. Copy the webhook signing secret and add it to your `.env` file as `STRIPE_WEBHOOK_SECRET`

### Production

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/webhooks)
2. Click "Add endpoint"
3. Set endpoint URL: `https://your-domain.com/api/webhook`
4. Select event: `checkout.session.completed`
5. Copy the webhook signing secret to your environment variables

## 🗄️ Database Schema

The application uses PostgreSQL with Prisma ORM. Key models include:

- **User**: Authentication and user management
- **Store**: Multi-store support
- **Product**: Product catalog with images, prices, and attributes
- **Category**: Product categorization
- **Billboard**: Promotional banners
- **Size & Color**: Product attributes
- **Order**: Order management
- **OrderItem**: Order line items

See `prisma/schema.prisma` for complete schema definition.

## 🔐 Authentication Flow

1. User registers/logs in via NextAuth.js
2. Email verification required (if enabled)
3. Two-factor authentication (optional)
4. Role-based access control (Admin/User)
5. Session management via JWT

## 🛒 Shopping Cart & Checkout Flow

1. Customer browses products on storefront
2. Adds products to cart (stored in Zustand state)
3. Proceeds to checkout
4. Creates order in database (unpaid)
5. Redirects to Stripe Checkout
6. After payment, Stripe webhook updates order:
   - Sets `isPaid` to `true`
   - Updates customer address and phone
   - Archives purchased products

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms

The application can be deployed to any platform supporting Next.js:

- Railway
- Render
- AWS Amplify
- DigitalOcean App Platform

## 📝 Documentation

- [Webhook Fix Documentation](./WEBHOOK_FIX_DOCUMENTATION.md) - Detailed explanation of Stripe webhook integration fixes

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Developed by Saeed Altour**
