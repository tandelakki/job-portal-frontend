import React from 'react'



const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-10">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        
                <div>
                    <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-3">
                        <li><a href="/about-us"className="text-gray-200 hover:text-white">About Us</a></li>
                        <li><a href="/contact-us" className="text-gray-200 hover:text-white">Contact Us</a></li>
                        <li><a href="/privacy-policy" className="text-gray-200 hover:text-white">Privacy Policy</a></li>
                        <li><a href="/terms-of-service" className="text-gray-200 hover:text-white">Terms of Service</a></li>
                        <li><a href="/faq" className="text-gray-200 hover:text-white">FAQ</a></li>
                    </ul>
                </div>
    
                
                <div>
                    <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
                    <div className="flex space-x-6">
                        <a href="https://facebook.com" target="_blank" className="text-gray-200 hover:text-white">
                            <i className="fab fa-facebook-f w-6 h-6"></i>
                        </a>
                        <a href="https://linkedin.com" target="_blank"className="text-gray-200 hover:text-white">
                            <i className="fab fa-linkedin-in w-6 h-6"></i>
                        </a>
                        <a href="https://twitter.com" target="_blank" className="text-gray-200 hover:text-white">
                            <i className="fab fa-twitter w-6 h-6"></i>
                        </a>
                        <a href="https://instagram.com" target="_blank" className="text-gray-200 hover:text-white">
                            <i className="fab fa-instagram w-6 h-6"></i>
                        </a>
                    </div>
                </div>
    
               
                <div>
                    <h3 className="text-xl font-semibold mb-4">Contact</h3>
                    <p className="text-gray-200">Job Portal © 2025 | All Rights Reserved</p>
                    <p className="text-gray-200 mt-2">Need help? <a href="mailto:support@jobportal.com" className="text-blue-300 hover:text-white">support@jobportal.com</a></p>
                </div>
            </div>
    
           
            <div className="text-center mt-8">
                <p className="text-sm text-gray-200">Job Portal | Empowering Your Career Journey</p>
            </div>
        </div>
    </footer>
    


    )

       
}

export default Footer;