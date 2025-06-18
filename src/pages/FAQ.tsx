import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How do I book a caterer through CateringBook?",
    answer:
      "Simply browse our list of verified caterers, select your preferred vendor, customize your menu, and book directly through our platform. You'll receive confirmation and can track your order in real time.",
  },
  {
    question: "Can I customize the menu for my event?",
    answer:
      "Yes! Most of our caterers offer customizable menus to suit your preferences, dietary needs, and event theme. You can discuss details with the vendor after booking.",
  },
  {
    question: "Is there a minimum order value?",
    answer:
      "Minimum order values vary by caterer and event type. You'll find this information on each vendor's profile page.",
  },
  {
    question: "How do I contact customer support?",
    answer:
      "You can reach us anytime at contact@cateringbook.com or call +91 9876543210. We're here to help!",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept all major credit/debit cards, UPI, and net banking. Payments are processed securely through our platform.",
  },
  {
    question: "Can I cancel or modify my booking?",
    answer:
      "Yes, you can cancel or modify your booking according to the vendor's cancellation policy. Please check the policy on the vendor's page or contact support for assistance.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-4xl font-bold mb-2 text-catering-orange text-center">FAQ</h1>
      <p className="text-lg text-gray-500 mb-10 text-center">Frequently Asked Questions</p>
      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="border rounded-lg bg-white shadow">
            <button
              className="w-full flex justify-between items-center px-4 py-3 text-left font-semibold text-gray-800 focus:outline-none"
              onClick={() => toggle(idx)}
            >
              {faq.question}
              <ChevronDown className={`ml-2 transition-transform ${openIndex === idx ? "rotate-180" : "rotate-0"}`} />
            </button>
            {openIndex === idx && (
              <div className="px-4 pb-4 text-gray-700 border-t">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ; 