import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const navigate = useNavigate();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Use Cases", href: "/#use-cases" },
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    {
      label: "Resources",
      children: [
        { label: "Webinars", href: "/webinars" },
        { label: "Case Studies", href: "/case-studies" },
        { label: "Blog", href: "/blog" },
        { label: "Knowledge Base", href: "/knowledge-base" },
      ]
    },
    {
      label: "Company",
      children: [
        { label: "About Us", href: "/about-us" },
        { label: "Newsroom", href: "/newsroom" },
        { label: "Careers", href: "/careers" },
        { label: "Contact Us", href: "/contact" },
      ]
    },
    { label: "FAQ", href: "/#faq" },
  ];

  const handleSignIn = () => {
    navigate("/auth");
  };

  const handleStartAudit = () => {
    navigate("/auth");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-slate-200">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-start gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center group-hover:bg-primary/90 transition-colors mt-1">
              <span className="text-primary-foreground font-bold text-sm">A</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-navy group-hover:text-primary transition-colors leading-tight">AuditAI</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[10px] font-medium text-slate-500 uppercase tracking-tight">Powered by</span>
                <img src="/jhanvi-tech-logo.png" alt="Jhanvi Technologies" className="h-6 w-auto object-contain" />
              </div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.children ? (
                <div key={link.label} className="relative group">
                  <button className="flex items-center gap-1 text-slate-600 hover:text-navy font-medium transition-colors duration-200">
                    {link.label}
                    <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                  </button>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                    <div className="bg-white rounded-xl shadow-xl border border-slate-100 py-2 overflow-hidden">
                      {link.children.map((child) => (
                        <a
                          key={child.label}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-navy transition-colors"
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-slate-600 hover:text-navy font-medium transition-colors duration-200"
                >
                  {link.label}
                </a>
              )
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              variant="ghost"
              className="text-slate-600"
              onClick={handleSignIn}
            >
              Sign In
            </Button>
            <Button onClick={handleStartAudit}>
              Start Free Audit
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="h-6 w-6 text-slate-600" />
            ) : (
              <Menu className="h-6 w-6 text-slate-600" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-slate-200 animate-fade-in max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                link.children ? (
                  <div key={link.label} className="flex flex-col">
                    <button
                      onClick={() => setMobileExpanded(mobileExpanded === link.label ? null : link.label)}
                      className="flex items-center justify-between text-slate-600 hover:text-navy font-medium py-3 px-2 rounded-lg hover:bg-slate-50 transition-all"
                    >
                      {link.label}
                      <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${mobileExpanded === link.label ? "rotate-180" : ""}`} />
                    </button>
                    <div className={`flex flex-col gap-1 pl-4 overflow-hidden transition-all duration-300 ${mobileExpanded === link.label ? "max-h-64 opacity-100 mb-2" : "max-h-0 opacity-0"}`}>
                      {link.children.map((child) => (
                        <a
                          key={child.label}
                          href={child.href}
                          className="text-slate-500 hover:text-navy text-sm py-2 px-2 hover:bg-slate-50 rounded-lg transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-slate-600 hover:text-navy font-medium py-3 px-2 rounded-lg hover:bg-slate-50 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </a>
                )
              ))}
              <div className="flex flex-col gap-3 pt-6 mt-2 border-t border-slate-200">
                <Button
                  variant="ghost"
                  className="justify-start w-full"
                  onClick={() => {
                    handleSignIn();
                    setIsOpen(false);
                  }}
                >
                  Sign In
                </Button>
                <Button
                  className="w-full"
                  onClick={() => {
                    handleStartAudit();
                    setIsOpen(false);
                  }}
                >
                  Start Free Audit
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
