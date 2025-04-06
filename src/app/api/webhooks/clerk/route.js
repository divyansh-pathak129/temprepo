import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { clerkClient } from '@clerk/nextjs';
import { fetchAllMakeupProducts } from '@/utils/makeupApi';

export async function POST(req) {
  // Verify the webhook
  const headerPayload = headers();
  const svixId = headerPayload.get('svix-id');
  const svixTimestamp = headerPayload.get('svix-timestamp');
  const svixSignature = headerPayload.get('svix-signature');

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response('Error: Missing webhook headers', { status: 400 });
  }

  // Get the Clerk webhook secret from environment variables
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return new Response('Error: Clerk webhook secret not configured', { status: 500 });
  }

  try {
    const payload = await req.json();
    const body = JSON.stringify(payload);

    // Create a new Svix instance with your webhook secret
    const wh = new Webhook(webhookSecret);

    // Verify the webhook
    const evt = wh.verify(body, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    });

    const { type, data } = evt;

    // Handle user creation event
    if (type === 'user.created') {
      try {
        // Fetch all makeup products
        const products = await fetchAllMakeupProducts();

        // Sync products to Clerk's user metadata
        await clerkClient.users.updateUser(data.id, {
          publicMetadata: {
            products: products
          }
        });

        return new Response('Products synced successfully', { status: 200 });
      } catch (syncError) {
        console.error('Error syncing products:', syncError);
        return new Response('Error syncing products', { status: 500 });
      }
    }

    // Return a success response for other events
    return new Response('Webhook received', { status: 200 });
  } catch (error) {
    console.error('Webhook error:', error);
    return new Response('Webhook error', { status: 500 });
  }
} 