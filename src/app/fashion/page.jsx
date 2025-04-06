"use client";  // Required for Client Components in Next.js

import axios from "axios";
import { useEffect, useState } from "react";

export default function Fashion() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/api/fashion").then((response) => {
      setProducts(response.data);
    });
  }
  , []);

  return (
    <div>
      Fashion
    </div>
  );
}
