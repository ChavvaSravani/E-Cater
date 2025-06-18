import React from "react";
import { CheckCircle2, Users, TrendingUp, ShieldCheck, Clock, Wallet } from "lucide-react";

const benefits = [
  {
    icon: <Users className="w-8 h-8 text-catering-orange mb-2" />,
    title: "Reach More Customers",
    desc: "Expand your business by connecting with a large audience actively seeking catering services for events of all sizes.",
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-catering-orange mb-2" />,
    title: "Grow Your Revenue",
    desc: "Get more bookings and increase your income with our easy-to-use platform and marketing support.",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-catering-orange mb-2" />,
    title: "Verified Vendor Status",
    desc: "Build trust with customers through our verification process and quality assurance checks.",
  },
  {
    icon: <Clock className="w-8 h-8 text-catering-orange mb-2" />,
    title: "Flexible Scheduling",
    desc: "Manage your availability and accept bookings that fit your schedule, with real-time updates.",
  },
  {
    icon: <Wallet className="w-8 h-8 text-catering-orange mb-2" />,
    title: "Secure Payments",
    desc: "Receive payments securely and on time, with transparent pricing and no hidden fees.",
  },
  {
    icon: <CheckCircle2 className="w-8 h-8 text-catering-orange mb-2" />,
    title: "Dedicated Support",
    desc: "Get help whenever you need it from our vendor support team, so you can focus on your business.",
  },
];

const Benefits = () => (
  <div className="container mx-auto px-4 py-12 max-w-4xl">
    <h1 className="text-4xl font-bold mb-2 text-catering-orange text-center">Vendor Benefits</h1>
    <p className="text-lg text-gray-500 mb-10 text-center">Why join CateringBook as a vendor?</p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {benefits.map((b, idx) => (
        <div key={idx} className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center">
          {b.icon}
          <h2 className="text-xl font-semibold mb-2 text-gray-900">{b.title}</h2>
          <p className="text-gray-700">{b.desc}</p>
        </div>
      ))}
    </div>
  </div>
);

export default Benefits; 