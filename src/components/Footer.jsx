import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#f1f2f6] border-t border-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm text-gray-600">
          {/* Quick Links */}
          <div>
            <h3 className="text-base font-semibold text-gray-800 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/about-us" className="hover:text-[#6A38C2]">About Us</a></li>
              <li><a href="/contact-us" className="hover:text-[#6A38C2]">Contact Us</a></li>
              <li><a href="/privacy-policy" className="hover:text-[#6A38C2]">Privacy Policy</a></li>
              <li><a href="/terms-of-service" className="hover:text-[#6A38C2]">Terms of Service</a></li>
              <li><a href="/faq" className="hover:text-[#6A38C2]">FAQ</a></li>
            </ul>
          </div>

          {/* Job Seekers */}
          <div>
            <h3 className="text-base font-semibold text-gray-800 mb-4">Job Seekers</h3>
            <ul className="space-y-2">
              <li><a href="/jobs" className="hover:text-[#6A38C2]">Search Jobs</a></li>
              <li><a href="/profile" className="hover:text-[#6A38C2]">My Profile</a></li>
              </ul>
          </div>

          {/* Recruiters */}
          <div>
            <h3 className="text-base font-semibold text-gray-800 mb-4">Recruiters</h3>
            <ul className="space-y-2">
              <li><a href="/admin/companies" className="hover:text-[#6A38C2]">Post a Job</a></li>
              <li><a href="/admin/jobs" className="hover:text-[#6A38C2]">Manage Jobs</a></li>
              </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-base font-semibold text-gray-800 mb-4">Contact Us</h3>
            <p className="text-gray-600">Need help? Email us at</p>
            <p className="mt-1">
              <a href="mailto:akkitandel111@gmail.com" className="text-[#6A38C2] hover:underline">akkitandel111@gmail.com</a>
            </p>
            <div className="mt-4">
              <p>Follow us:</p>
              <div className="flex space-x-4 mt-2">
                <a href="https://facebook.com" target="_blank" className="hover:text-[#6A38C2]">Facebook</a>
                <a href="https://linkedin.com" target="_blank" className="hover:text-[#6A38C2]">LinkedIn</a>
                <a href="https://twitter.com" target="_blank" className="hover:text-[#6A38C2]">Twitter</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="text-center text-xs text-gray-500 mt-10">
          © 2025 Job Portal — Empowering Your Career Journey.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
