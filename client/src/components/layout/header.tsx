import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Jobs", href: "/jobs" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/" && location === "/") return true;
    if (href !== "/" && location.startsWith(href)) return true;
    return false;
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" data-testid="link-home">
              <h1 className="text-2xl font-bold text-primary cursor-pointer">DataMind Jobs</h1>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href} data-testid={`link-${item.name.toLowerCase()}`}>
                  <span className={`px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${
                    isActive(item.href) 
                      ? "text-gray-900" 
                      : "text-neutral hover:text-primary"
                  }`}>
                    {item.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
          
          <div className="hidden md:block">
            <Button className="bg-primary text-white hover:bg-secondary" data-testid="button-post-job">
              Post a Job
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" data-testid="button-mobile-menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => (
                    <Link 
                      key={item.name} 
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      data-testid={`link-mobile-${item.name.toLowerCase()}`}
                    >
                      <span className={`block px-3 py-2 text-base font-medium cursor-pointer ${
                        isActive(item.href) 
                          ? "text-primary" 
                          : "text-gray-700 hover:text-primary"
                      }`}>
                        {item.name}
                      </span>
                    </Link>
                  ))}
                  <Button className="w-full bg-primary text-white hover:bg-secondary mt-4" data-testid="button-mobile-post-job">
                    Post a Job
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
