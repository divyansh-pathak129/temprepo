// src/components/ProductDetails.js
// import React from 'react';
// import { useParams } from 'react-router-dom';

// const ProductDetails = () => {
//     const { id } = useParams(); // Get the product ID from the URL

//     // Sample product data (you can replace this with your actual data source)
//     const products = [
//         {
//             id: 1,
//             name: "Lipstick",
//             description: "Matte finish, long-lasting color.",
//             rating: 4.5,
//             price: "₹399",
//             imageUrl: "https://images.unsplash.com/photo-1619352520578-8fefbfa2f904?w=600&auto=format&fit=crop&q=60",
//         },
//         // Add more products as needed
//     ];

//     const product = products.find((p) => p.id === Number(id));

//     if (!product) {
//         return <p>Product not found</p>;
//     }

//     return (
//         <div>
//             <h1>{product.name}</h1>
//             <img src={product.imageUrl} alt={product.name} />
//             <p>{product.description}</p>
//             <p>Price: {product.price}</p>
//             <p>Rating: {product.rating}</p>
//         </div>
//     );
// };

// export default ProductDetails;