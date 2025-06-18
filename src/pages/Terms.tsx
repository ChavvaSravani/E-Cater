import React from "react";

const Terms = () => (
  <div className="container mx-auto px-4 py-12 max-w-3xl">
    <h1 className="text-4xl font-bold mb-6 text-catering-orange text-center">Terms of Service</h1>
    <p className="text-gray-700 mb-8 text-center">
      Please read these Terms of Service ("Terms") carefully before using CateringBook. By accessing or using our platform, you agree to be bound by these Terms.
    </p>

    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-2 text-gray-900">1. Acceptance of Terms</h2>
      <p className="text-gray-700">By using CateringBook, you agree to comply with and be legally bound by these Terms, our Privacy Policy, and all applicable laws and regulations.</p>
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-2 text-gray-900">2. User Responsibilities</h2>
      <ul className="list-disc pl-6 text-gray-700">
        <li>Provide accurate and up-to-date information when creating an account or booking services.</li>
        <li>Maintain the confidentiality of your account credentials.</li>
        <li>Use the platform only for lawful purposes and not for any fraudulent or harmful activity.</li>
      </ul>
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-2 text-gray-900">3. Vendor Obligations</h2>
      <ul className="list-disc pl-6 text-gray-700">
        <li>Vendors must provide accurate business information and maintain high standards of quality and hygiene.</li>
        <li>Vendors are responsible for fulfilling bookings as agreed with customers.</li>
        <li>Vendors must comply with all applicable food safety and business regulations.</li>
      </ul>
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-2 text-gray-900">4. Payments & Fees</h2>
      <ul className="list-disc pl-6 text-gray-700">
        <li>All payments are processed securely through our platform.</li>
        <li>Vendors receive payouts according to the schedule and terms outlined in their agreement.</li>
        <li>Service fees may apply and will be clearly communicated before booking.</li>
      </ul>
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-2 text-gray-900">5. Cancellations & Refunds</h2>
      <ul className="list-disc pl-6 text-gray-700">
        <li>Cancellation and refund policies vary by vendor and will be displayed at the time of booking.</li>
        <li>Contact support for assistance with cancellations or disputes.</li>
      </ul>
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-2 text-gray-900">6. Limitation of Liability</h2>
      <p className="text-gray-700">CateringBook is not liable for any direct, indirect, incidental, or consequential damages arising from your use of the platform or services provided by vendors.</p>
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-2 text-gray-900">7. Changes to Terms</h2>
      <p className="text-gray-700">We reserve the right to update or modify these Terms at any time. Continued use of the platform after changes constitutes acceptance of the new Terms.</p>
    </section>

    <section>
      <h2 className="text-2xl font-semibold mb-2 text-gray-900">8. Contact Us</h2>
      <p className="text-gray-700">If you have any questions about these Terms, please contact us at <a href="mailto:contact@cateringbook.com" className="text-catering-orange underline">contact@cateringbook.com</a>.</p>
    </section>
  </div>
);

export default Terms; 