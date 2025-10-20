import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Waitlist from '@/models/Waitlist';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, college } = body;

    // Validate input
    if (!name || !email || !college) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Connect to database
    try {
      await connectDB();
    } catch (dbError: any) {
      console.error('Database connection error:', dbError);
      return NextResponse.json(
        { 
          error: 'Database connection failed. Please ensure MONGODB_URI is set in .env.local',
          message: dbError.message 
        },
        { status: 503 }
      );
    }

    // Check if email already exists
    const existingUser = await Waitlist.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { 
          error: 'This email is already on the waitlist!',
          position: existingUser.position 
        },
        { status: 409 }
      );
    }

    // Create new waitlist entry
    const waitlistEntry = await Waitlist.create({
      name,
      email: email.toLowerCase(),
      college,
    });

    // Get total count for position
    const totalCount = await Waitlist.countDocuments();

    return NextResponse.json({
      success: true,
      message: 'Successfully joined the waitlist!',
      position: waitlistEntry.position || totalCount,
      data: {
        name: waitlistEntry.name,
        email: waitlistEntry.email,
        college: waitlistEntry.college,
      }
    }, { status: 201 });

  } catch (error: any) {
    console.error('Waitlist API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Something went wrong!' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const count = await Waitlist.countDocuments();
    
    return NextResponse.json({
      success: true,
      totalWaitlist: count,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
