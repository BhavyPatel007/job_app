import { Link } from "wouter";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  const jobSeekerLinks = [
    { name: "Browse Jobs", href: "/jobs" },
    { name: "Career Advice", href: "/blog" },
    { name: "Resume Builder", href: "#" },
    { name: "Salary Guide", href: "#" },
    { name: "Interview Tips", href: "/blog" },
  ];

  const employerLinks = [
    { name: "Post a Job", href: "#" },
    { name: "Find Candidates", href: "#" },
    { name: "Recruiting Solutions", href: "#" },
    { name: "Pricing", href: "#" },
    { name: "Success Stories", href: "#" },
  ];

  const companyLinks = [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Help Center", href: "#" },
  ];

  const socialLinks = [
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold text-white mb-4">DataMind Jobs</h3>
            <p className="text-gray-400 mb-4">
              Connecting talent with opportunity. Your career journey starts here.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a 
                  key={social.label}
                  href={social.href} 
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={social.label}
                  data-testid={`link-social-${social.label.toLowerCase()}`}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Job Seekers */}
          <div>
            <h4 className="font-semibold text-white mb-4">For Job Seekers</h4>
            <ul className="space-y-2 text-gray-400">
              {jobSeekerLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} data-testid={`link-footer-${link.name.toLowerCase().replace(/\s+/g, '-')}`}>
                    <span className="hover:text-white transition-colors cursor-pointer">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Employers */}
          <div>
            <h4 className="font-semibold text-white mb-4">For Employers</h4>
            <ul className="space-y-2 text-gray-400">
              {employerLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="hover:text-white transition-colors"
                    data-testid={`link-footer-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} data-testid={`link-footer-${link.name.toLowerCase().replace(/\s+/g, '-')}`}>
                    <span className="hover:text-white transition-colors cursor-pointer">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 DataMind Jobs. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors" data-testid="link-footer-privacy">
                Privacy
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors" data-testid="link-footer-terms">
                Terms
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors" data-testid="link-footer-cookies">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
