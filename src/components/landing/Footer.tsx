import { Linkedin, Twitter, Github } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    Company: ["About Us", "Careers", "Press", "Contact"],
    Product: ["Features", "Pricing", "Enterprise", "Security"],
    Resources: ["Documentation", "Blog", "Case Studies", "Webinars"],
    Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR"],
  };

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Github, href: "#", label: "GitHub" },
  ];

  return (
    <footer className="bg-navy py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">A</span>
              </div>
              <span className="text-xl font-bold text-white">AuditAI</span>
            </div>
            <p className="text-slate-400 text-sm mb-6">
              Enterprise-grade website intelligence platform powered by AI.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors"
                >
                  <social.icon className="h-5 w-5 text-slate-400" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="text-slate-400 hover:text-white text-sm transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">
            © 2024 AuditAI. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-slate-500 text-sm">SOC 2 Type II Certified</span>
            <span className="text-slate-500 text-sm">GDPR Compliant</span>
            <span className="text-slate-500 text-sm">ISO 27001</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
