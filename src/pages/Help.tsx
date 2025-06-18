import React from "react";
import { HelpCircle, Mail, Phone, BookOpen } from "lucide-react";

const helpTopics = [
  {
    title: "Account & Login Issues",
    desc: "Trouble logging in or accessing your account? Learn how to reset your password, recover your account, or update your profile information.",
    link: "/faq#account",
  },
  {
    title: "Booking & Orders",
    desc: "Find answers about booking caterers, order tracking, cancellations, and modifications.",
    link: "/faq#bookings",
  },
  {
    title: "Payments & Refunds",
    desc: "Get help with payment methods, invoices, and refund requests.",
    link: "/faq#payments",
  },
  {
    title: "Vendor Support",
    desc: "Resources and support for vendors, including onboarding, menu management, and payout information.",
    link: "/vendor/resources",
  },
];

const Help = () => (
  <div className="container mx-auto px-4 py-12 max-w-3xl">
    <h1 className="text-4xl font-bold mb-2 text-catering-orange text-center">Help Center</h1>
    <p className="text-lg text-gray-500 mb-10 text-center">How can we assist you?</p>

    <section className="mb-10">
      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-gray-900">
        <HelpCircle className="w-6 h-6 text-catering-orange" /> Common Topics
      </h2>
      <div className="space-y-4">
        {helpTopics.map((t, idx) => (
          <a key={idx} href={t.link} className="block bg-white rounded-lg shadow p-4 hover:bg-catering-light-yellow/40 transition">
            <div className="font-semibold text-lg text-catering-orange">{t.title}</div>
            <div className="text-gray-700 text-sm">{t.desc}</div>
          </a>
        ))}
      </div>
    </section>

    <section className="mb-10">
      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-gray-900">
        <BookOpen className="w-6 h-6 text-catering-orange" /> Quick Links
      </h2>
      <ul className="space-y-3">
        <li><a href="/faq" className="text-catering-orange hover:underline font-medium">Frequently Asked Questions (FAQ)</a></li>
        <li><a href="/contact" className="text-catering-orange hover:underline font-medium">Contact Us</a></li>
        <li><a href="/vendor/resources" className="text-catering-orange hover:underline font-medium">Vendor Resources</a></li>
      </ul>
    </section>

    <section>
      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-gray-900">
        <Mail className="w-6 h-6 text-catering-orange" /> Still need help?
      </h2>
      <div className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <div className="font-medium text-gray-800">Contact our support team</div>
          <div className="text-gray-600 text-sm">We're here to help with any questions or issues you may have.</div>
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-2 mt-3 md:mt-0">
          <a href="mailto:contact@cateringbook.com" className="inline-flex items-center gap-2 bg-catering-orange text-white px-5 py-2 rounded-lg font-semibold hover:bg-catering-orange/90 transition">
            <Mail className="w-4 h-4" /> Email Support
          </a>
          <a href="tel:+919876543210" className="inline-flex items-center gap-2 bg-catering-orange text-white px-5 py-2 rounded-lg font-semibold hover:bg-catering-orange/90 transition">
            <Phone className="w-4 h-4" /> Call Support
          </a>
        </div>
      </div>
    </section>
  </div>
);

export default Help; 