import React from "react";
import { BookOpen, FileText, HelpCircle, Mail } from "lucide-react";

const guides = [
  {
    title: "Getting Started as a Vendor",
    desc: "Learn how to register, set up your profile, and get verified on CateringBook. This guide covers the onboarding process, required documents, and tips for making your vendor profile stand out.",
    link: "https://cateringbook.com/guides/getting-started-vendor",
  },
  {
    title: "How to Manage Bookings",
    desc: "A comprehensive tutorial on viewing, accepting, and managing event bookings. Includes best practices for timely responses, communication with clients, and handling last-minute changes.",
    link: "https://cateringbook.com/guides/manage-bookings",
  },
  {
    title: "Menu Customization Tips",
    desc: "Discover how to create attractive, flexible menus that appeal to a wide range of clients. Learn about dietary options, pricing strategies, and how to update your menu seasonally.",
    link: "https://cateringbook.com/guides/menu-customization",
  },
];

const policies = [
  {
    title: "Vendor Terms & Conditions",
    link: "https://cateringbook.com/policies/vendor-terms",
    desc: "Understand your rights and responsibilities as a CateringBook vendor."
  },
  {
    title: "Payment & Refund Policy",
    link: "https://cateringbook.com/policies/payment-refund",
    desc: "Learn how payments are processed, payout schedules, and how refunds are handled."
  },
  {
    title: "Quality & Hygiene Standards",
    link: "https://cateringbook.com/policies/quality-hygiene",
    desc: "Review the standards all vendors must meet to ensure food safety and customer satisfaction."
  },
];

const Resources = () => (
  <div className="container mx-auto px-4 py-12 max-w-3xl">
    <h1 className="text-4xl font-bold mb-2 text-catering-orange text-center">Vendor Resources</h1>
    <p className="text-lg text-gray-500 mb-10 text-center">Helpful guides, policies, and support for our vendors</p>

    <section className="mb-10">
      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-gray-900">
        <BookOpen className="w-6 h-6 text-catering-orange" /> Guides & Tutorials
      </h2>
      <div className="space-y-4">
        {guides.map((g, idx) => (
          <a key={idx} href={g.link} target="_blank" rel="noopener noreferrer" className="block bg-white rounded-lg shadow p-4 hover:bg-catering-light-yellow/40 transition">
            <div className="font-semibold text-lg text-catering-orange">{g.title}</div>
            <div className="text-gray-700 text-sm">{g.desc}</div>
          </a>
        ))}
      </div>
    </section>

    <section className="mb-10">
      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-gray-900">
        <FileText className="w-6 h-6 text-catering-orange" /> Policies & Standards
      </h2>
      <ul className="space-y-3">
        {policies.map((p, idx) => (
          <li key={idx}>
            <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-catering-orange hover:underline font-medium flex items-center gap-2">
              <FileText className="w-4 h-4" /> {p.title}
            </a>
            <div className="text-gray-600 text-xs ml-6">{p.desc}</div>
          </li>
        ))}
      </ul>
    </section>

    <section>
      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-gray-900">
        <HelpCircle className="w-6 h-6 text-catering-orange" /> Support
      </h2>
      <div className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <div className="font-medium text-gray-800">Need more help?</div>
          <div className="text-gray-600 text-sm">Contact our vendor support team for assistance with onboarding, bookings, payments, or any other questions.</div>
        </div>
        <a href="mailto:contact@cateringbook.com" className="mt-3 md:mt-0 inline-flex items-center gap-2 bg-catering-orange text-white px-5 py-2 rounded-lg font-semibold hover:bg-catering-orange/90 transition">
          <Mail className="w-4 h-4" /> Email Support
        </a>
      </div>
    </section>
  </div>
);

export default Resources; 