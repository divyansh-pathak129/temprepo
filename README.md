This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Checkout Page

The checkout page is implemented in `src/pages/AccountCheckout.jsx`. It provides three options for users:

1. **Login** - For existing users to log in and access their rewards
2. **Sign Up** - For new users with a special offer of ₹300 off on their first app order
3. **Guest Checkout** - For users who want to checkout without creating an account

### Required Assets

The checkout page requires the following images in the `public/images` directory:

- `id-card.png` - Icon for the login section
- `new-user.png` - Icon for the sign up section
- `guest.png` - Icon for the guest checkout section
- `secure-payment.png` - Icon for the secure payment badge

### Features

- Progress indicator showing the current checkout step (Sign Up → Address → Payment)
- Order summary with item count and price details
- Savings amount display
- Secure payment badge with trust indicators

### Usage

The checkout page can be accessed at `/checkout` route. It's designed to be the first step in the checkout process, followed by the address and payment pages.

```jsx
// Example usage in Next.js
import AccountCheckout from '../components/AccountCheckout';

export default function CheckoutPage() {
  return <AccountCheckout />;
}
```

Note: Make sure to have all the required image assets in place before using this component.
#   t e m p r e p o  
 