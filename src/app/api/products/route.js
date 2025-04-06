import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

// MongoDB connection info - using the same connection string format as your check-admin API
const uri = "mongodb+srv://atharvajadhav:M1Y2n0FvtZ2WIOPP@ecommerce.3qntr.mongodb.net/?retryWrites=true&w=majority&appName=ecommerce";
const dbName = "ecommerce";
const collectionName = "products";

// Helper function to connect to MongoDB
async function connectToDatabase() {
  const client = new MongoClient(uri);
  await client.connect();
  return {
    client,
    db: client.db(dbName),
    collection: client.db(dbName).collection(collectionName)
  };
}

// GET handler for retrieving all products or a specific product
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  let connection;
  try {
    connection = await connectToDatabase();
    const { collection } = connection;
    
    // If ID is provided, return the specific product, otherwise return all products
    if (id) {
      const product = await collection.findOne({ _id: new ObjectId(id) });
      
      if (!product) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
      }
      
      return NextResponse.json(product);
    } else {
      // Get all products
      const products = await collection.find({}).toArray();
      return NextResponse.json(products);
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  } finally {
    if (connection) await connection.client.close();
  }
}

// POST handler for creating a new product
export async function POST(request) {
  let connection;
  try {
    const productData = await request.json();
    
    // Validate required fields
    if (!productData.name || !productData.price || !productData.gender || !productData.category) {
      return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
    }
    
    connection = await connectToDatabase();
    const { collection } = connection;
    
    // Insert the new product
    const result = await collection.insertOne({
      ...productData,
      createdAt: new Date()
    });
    
    return NextResponse.json({
      message: "Product created successfully",
      productId: result.insertedId
    }, { status: 201 });
    
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  } finally {
    if (connection) await connection.client.close();
  }
}

// PUT handler for updating an existing product
export async function PUT(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (!id) {
    return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
  }
  
  let connection;
  try {
    const productData = await request.json();
    
    connection = await connectToDatabase();
    const { collection } = connection;
    
    // Remove fields that shouldn't be updated directly
    const { _id, createdAt, ...updateData } = productData;
    
    // Update the product
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...updateData, updatedAt: new Date() } }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    
    return NextResponse.json({
      message: "Product updated successfully",
      modifiedCount: result.modifiedCount
    });
    
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  } finally {
    if (connection) await connection.client.close();
  }
}

// DELETE handler for removing a product
export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (!id) {
    return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
  }
  
  let connection;
  try {
    connection = await connectToDatabase();
    const { collection } = connection;
    
    // Delete the product
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    
    return NextResponse.json({
      message: "Product deleted successfully"
    });
    
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  } finally {
    if (connection) await connection.client.close();
  }
}