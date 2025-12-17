# E-Commerce Admin CMS

A comprehensive, multi-store E-commerce Admin Dashboard built with modern web technologies. This application serves as a centralized content management system for managing products, categories, billboards, and store attributes across multiple storefronts.

## 🚀 Tech Stack

- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components:** [Radix UI](https://www.radix-ui.com/), Lucide Icons, Sonner (Toasts)
- **Database:** PostgreSQL (via [Prisma ORM](https://www.prisma.io/))
- **Authentication:** [Clerk](https://clerk.com/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **Forms:** React Hook Form + Zod
- **Image Storage:** Cloudinary
- **Date Handling:** date-fns

## ✨ Key Features

- **Multi-Store Architecture:** Create and manage multiple distinct stores from a single dashboard account.
- **Product Management:** Full CRUD capabilities for products, including price, archival status, and featured flags.
- **Categorization:** Organize products into hierarchical categories.
- **Billboard Management:** Create and manage banner images/billboards for store promotions.
- **Attribute Management:** Define and manage product attributes like **Sizes** and **Colors**.
- **Image Uploads:** Seamless image uploading and management via Cloudinary.
- **Secure Authentication:** Robust user authentication and management provided by Clerk.
- **Responsive Design:** A clean, modern, and mobile-responsive interface.
- **API First:** (Implied) Structure allows serving content to separate storefront applications (e.g., public e-commerce sites).

## 🛠️ Prerequisites

Before you begin, ensure you have the following ready:

- **Node.js**: (v18 or higher recommended)
- **PostgreSQL**: A running instance of a PostgreSQL database.
- **Clerk Account**: For authentication keys.
- **Cloudinary Account**: For image upload credentials.

## ⚙️ Environment Variables

Create a `.env` file in the root directory and configure the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@host:port/db_name?schema=public"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

## 📦 Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Saeed-Altout/Ecommerce-Admin-CMS.git
    cd ecommerce-admin
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Setup Database:**
    Push the Prisma schema to your database.

    ```bash
    npx prisma db push
    ```

4.  **Run the development server:**

    ```bash
    npm run dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📜 Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint to check for code quality issues.
- `npx prisma studio`: Opens a GUI to view and edit your database data.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Developed by Saeed Altour**
