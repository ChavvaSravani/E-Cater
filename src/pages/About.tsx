import React from "react";
import { CheckCircle2 } from "lucide-react";

const photos = [
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1605522469906-3fe226b356bc?auto=format&fit=crop&w=600&q=80"
];

const aboutPoints = [
  [
    "Affordable & Accessible – no inflated pricing.",
    "Hygiene-Focused – vendors are verified and quality-checked."
  ],
  [
    "Empowering Local Economy – support for small vendors.",
    "Hyperlocal Discovery – find stalls near you easily."
  ],
  [
    "Sustainable Growth – community-driven impact."
  ]
];

const About = () => (
  <div className="container mx-auto px-4 py-12 max-w-3xl">
    <h1 className="text-4xl font-bold mb-2 text-catering-orange text-center">About Us</h1>
    <p className="text-lg text-gray-500 mb-10 text-center">Redefining Catering, One Event at a Time</p>

    {/* Mission and Vision Section */}
    <section className="mb-10">
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-2xl font-bold mb-2 text-gray-900">Our Mission</h2>
          <p className="text-gray-700 text-base">
            To make event catering simple, reliable, and delightful for everyone. We strive to connect people with the best local caterers, ensuring every event is memorable with great food and seamless service.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2 text-gray-900">Our Vision</h2>
          <p className="text-gray-700 text-base">
            To become India's most trusted catering platform, empowering local food businesses and making high-quality catering accessible for all occasions, big or small.
          </p>
        </div>
      </div>
      <div className="flex gap-4 justify-center mb-8">
        {photos.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`CateringBook event ${idx + 1}`}
            className="rounded-xl shadow-md object-cover w-32 h-32 md:w-40 md:h-40 border-2 border-catering-orange"
          />
        ))}
      </div>
    </section>

    <section className="mb-10">
      <h2 className="text-2xl font-bold mb-2 text-gray-900">Who We Are</h2>
      <p className="text-gray-700 text-base">
        At <span className="font-semibold text-catering-orange">CateringBook</span>, we're a passionate team of foodies and techies committed to elevating the catering experience in India. We empower local food vendors and home chefs by giving them a digital platform to grow their business while offering customers affordable, hygienic, and flavorful meals for every occasion.
      </p>
    </section>

    <section className="mb-10">
      <h2 className="text-2xl font-bold mb-2 text-gray-900">What We Do</h2>
      <p className="text-gray-700 text-base">
        We connect food lovers with authentic caterers, street food vendors, and home-based cooks through a seamless online ordering system. Whether you're planning a wedding, corporate event, or family gathering, CateringBook delivers delicious food straight to your venue—fast, affordable, and with quality assurance.
      </p>
    </section>

    <section className="mb-10">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">Why CateringBook?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ul className="space-y-4">
          <li className="flex items-start">
            <CheckCircle2 className="text-catering-orange w-6 h-6 mt-1 mr-2" />
            Affordable & Accessible – no inflated pricing.
          </li>
          <li className="flex items-start">
            <CheckCircle2 className="text-catering-orange w-6 h-6 mt-1 mr-2" />
            Empowering Local Economy – support for small vendors.
          </li>
          <li className="flex items-start">
            <CheckCircle2 className="text-catering-orange w-6 h-6 mt-1 mr-2" />
            Sustainable Growth – community-driven impact.
          </li>
        </ul>
        <ul className="space-y-4">
          <li className="flex items-start">
            <CheckCircle2 className="text-catering-orange w-6 h-6 mt-1 mr-2" />
            Hygiene-Focused – vendors are verified and quality-checked.
          </li>
          <li className="flex items-start">
            <CheckCircle2 className="text-catering-orange w-6 h-6 mt-1 mr-2" />
            Hyperlocal Discovery – find caterers near you easily.
          </li>
        </ul>
      </div>
    </section>
  </div>
);

export default About; 