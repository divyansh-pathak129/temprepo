import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

// Create or update user
export async function POST(request) {
  try {
    const body = await request.json();
    const { firebaseUid, email, displayName, photoURL } = body;

    await connectDB();

    const user = await User.findOneAndUpdate(
      { firebaseUid },
      {
        firebaseUid,
        email,
        displayName,
        photoURL,
      },
      { upsert: true, new: true }
    );

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('Error in user creation/update:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// Get user by Firebase UID
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const firebaseUid = searchParams.get('firebaseUid');

    if (!firebaseUid) {
      return NextResponse.json(
        { error: 'Firebase UID is required' },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findOne({ firebaseUid });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 