import mongoose,{ Document, Schema, Model } from "mongoose";
import { unique } from "next/dist/build/utils";

const productSchema = new Schema({
  name: String,
  price: Number,
  brand: String,
  unique: true,
  category: String,
  gender: String,
  description: String,
  countInStock: Number,
  imageUrl: String,
});