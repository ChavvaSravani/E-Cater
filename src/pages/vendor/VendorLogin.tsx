import React, { useState } from "react";
import { Mail, Lock, LogIn } from "lucide-react";

const VendorLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would normally handle authentication
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-md">
      <h1 className="text-3xl font-bold mb-6 text-catering-orange text-center">Vendor Login</h1>
      <div className="bg-white rounded-xl shadow p-6">
        {submitted ? (
          <div className="text-green-600 font-semibold text-center py-8">
            Login submitted! (Demo only)
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <div className="flex items-center border border-gray-300 rounded px-3 py-2 focus-within:ring-2 focus-within:ring-catering-orange">
                <Mail className="text-gray-400 mr-2" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full outline-none"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Password</label>
              <div className="flex items-center border border-gray-300 rounded px-3 py-2 focus-within:ring-2 focus-within:ring-catering-orange">
                <Lock className="text-gray-400 mr-2" />
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full outline-none"
                  placeholder="Enter your password"
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-catering-orange text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-catering-orange/90 transition w-full justify-center"
            >
              <LogIn className="w-5 h-5" /> Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default VendorLogin; 