import { comments } from "../data";

export async function GET(_request, { params }) {
  const { id } = await params;
  const comment = comments.find((c) => c.id === parseInt(id));
  return Response.json(comment)
}

