import React from "react";

const Privacy = () => (
  <div className="container mx-auto px-4 py-12 max-w-3xl">
    <h1 className="text-4xl font-bold mb-6 text-catering-orange text-center">Privacy Policy</h1>
    <p className="text-gray-700 mb-8 text-center">
      This Privacy Policy explains how CateringBook collects, uses, and protects your personal information when you use our platform.
    </p>

    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-2 text-gray-900">1. Information We Collect</h2>
      <ul className="list-disc pl-6 text-gray-700">
        <li>Personal information you provide when registering, booking, or contacting support (e.g., name, email, phone number).</li>
        <li>Booking and transaction details.</li>
        <li>Usage data, such as pages visited and actions taken on the platform.</li>
      </ul>
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-2 text-gray-900">2. How We Use Your Information</h2>
      <ul className="list-disc pl-6 text-gray-700">
        <li>To provide and improve our services.</li>
        <li>To process bookings and payments.</li>
        <li>To communicate with you about your account, bookings, or support requests.</li>
        <li>To send important updates, offers, or marketing communications (you can opt out at any time).</li>
      </ul>
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-2 text-gray-900">3. Information Sharing</h2>
      <ul className="list-disc pl-6 text-gray-700">
        <li>We do not sell your personal information.</li>
        <li>We may share information with vendors to fulfill your bookings.</li>
        <li>We may share information with service providers who help us operate our platform (e.g., payment processors).</li>
        <li>We may disclose information if required by law or to protect our rights and users.</li>
      </ul>
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-2 text-gray-900">4. Cookies & Tracking</h2>
      <p className="text-gray-700">We use cookies and similar technologies to enhance your experience, analyze usage, and deliver personalized content. You can manage cookie preferences in your browser settings.</p>
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-2 text-gray-900">5. Data Security</h2>
      <p className="text-gray-700">We implement industry-standard security measures to protect your data. However, no method of transmission over the internet is 100% secure.</p>
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-2 text-gray-900">6. Your Rights & Choices</h2>
      <ul className="list-disc pl-6 text-gray-700">
        <li>You can access, update, or delete your personal information by contacting us.</li>
        <li>You can opt out of marketing communications at any time.</li>
        <li>You can request information about how your data is used or shared.</li>
      </ul>
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-2 text-gray-900">7. Changes to This Policy</h2>
      <p className="text-gray-700">We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on our website.</p>
    </section>

    <section>
      <h2 className="text-2xl font-semibold mb-2 text-gray-900">8. Contact Us</h2>
      <p className="text-gray-700">If you have any questions about this Privacy Policy, please contact us at <a href="mailto:contact@cateringbook.com" className="text-catering-orange underline">contact@cateringbook.com</a>.</p>
    </section>
  </div>
);

export default Privacy; 