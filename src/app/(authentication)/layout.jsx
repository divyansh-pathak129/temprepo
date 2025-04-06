import React from "react";

export default function UserStatusLayout({ children }) {
  const layoutData = {
    login: {
      title: "Login",
      description: "Get access to your Orders, Wishlist and Recommendations",
    },
    signup: {
      title: "Looks like you're new here!",
      description: "Sign up with your mobile number to get started",
    },
  };

  let title = "";
  let description = "";

  if (children.type.name === "Login") {
    title = layoutData.login.title;
    description = layoutData.login.description;
  } else if (children.type.name === "Signup") {
    title = layoutData.signup.title;
    description = layoutData.signup.description;
  }

  return (
    <div className="flex justify-center items-start py-20 min-h-screen bg-gray-100 px-4">
      <div className="flex shadow-lg rounded-lg overflow-hidden w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
        {/* Left Section - Dynamic Title and Description */}
        <div className="bg-pink-500 w-2/5 p-6 flex flex-col justify-center">
          <h1 className="text-white font-semibold text-2xl">{title}</h1>
          <p className="text-white text-sm mt-2">{description}</p>
        </div>

        {/* Right Section - Render Child Component (Login or Signup) */}
        <div className="w-3/5 bg-white p-6 flex flex-col justify-center gap-4">
          {React.cloneElement(children, { title, description })}
        </div>
      </div>
    </div>
  );
}
