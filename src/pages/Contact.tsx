import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would normally send the form data to your backend or email service
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-4xl font-bold mb-2 text-catering-orange text-center">Contact Us</h1>
      <p className="text-lg text-gray-500 mb-10 text-center">We'd love to hear from you! Reach out with your questions, feedback, or partnership inquiries.</p>

      <div className="grid md:grid-cols-2 gap-8 mb-10">
        <div className="space-y-4">
          <div className="flex items-center text-gray-700">
            <Mail className="text-catering-orange mr-2" />
            <span>contact@cateringbook.com</span>
          </div>
          <div className="flex items-center text-gray-700">
            <Phone className="text-catering-orange mr-2" />
            <span>+91 9876543210</span>
          </div>
          <div className="flex items-center text-gray-700">
            <MapPin className="text-catering-orange mr-2" />
            <span>GLEC,Hyderabad,Telangana, India</span>
          </div>
        </div>
        <div>
          <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" alt="Map location" className="rounded-xl w-full h-40 object-cover border-2 border-catering-orange" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Send Us a Message</h2>
        {submitted ? (
          <div className="text-green-600 font-semibold text-center py-8">
            Thank you for reaching out! We'll get back to you soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-catering-orange"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-catering-orange"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-catering-orange"
              />
            </div>
            <button
              type="submit"
              className="bg-catering-orange text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-catering-orange/90 transition"
            >
              <Send className="w-5 h-5" /> Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Contact; 