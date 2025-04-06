import { headers } from "next/headers";
import { comments } from "./data";

export async function GET() {
  return Response.json(comments);
}

export async function POST(request) {
  try {
    const body = await request.json(); // Await JSON data

    const newComment = {
      id: comments.length + 1,
      comment: body.text, // Use `body.text` instead of `comments.text`
    };

    comments.push(newComment);

    return new Response(JSON.stringify(newComment), {
      headers: { "Content-Type": "application/json" },
      status: 201, // Use 201 for resource creation
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Invalid request" }), {
      headers: { "Content-Type": "application/json" },
      status: 400, // Bad Request
    });
  }
}
