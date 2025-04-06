import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

// Use environment variables for security
const uri = "mongodb+srv://atharvajadhav:M1Y2n0FvtZ2WIOPP@ecommerce.3qntr.mongodb.net/?retryWrites=true&w=majority&appName=ecommerce";
const dbName = "ecommerce";
const collectionName = "admin"; // Collection where user roles are stored

export async function POST(request) {
  try {
    const { email } = await request.json();
    
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    
    // Connect to MongoDB with proper options
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    await client.connect();
    
    const db = client.db("ecommerce");
    const collection = db.collection("admin");
    
    // Find user by email
    const user = await collection.findOne({ email });
    
    await client.close();
    
    if (!user) {
      return NextResponse.json({ isAdmin: false, message: "User not found" }, { status: 200 });
    }
    
    // Check if user has admin role
    const isAdmin = user.role === "admin";
    
    return NextResponse.json({ isAdmin: true }, { status: 200 });
  } catch (error) {
    console.error("Error checking admin status:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// export async function POST(request) {
//     const { email } = await request.json();
    
//     if (!email) {
//       return NextResponse.json({ error: "Email is required" }, { status: 400 });
//     }

//     const client = new MongoClient(uri);

//     // Connect to MongoDB

//     await client.connect();

//     try{
//         const db = client.db("ecommerce");
//         const collection = db.collection("admin");

//         // Find user by email
//         const user = await collection.findOne({ email });
//         console.log(user);

//     }catch(error){
//         console.error("Error checking admin status:", JSON.stringify(error));
//         return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//     }finally{
//         await client.close();
//     };

// }
