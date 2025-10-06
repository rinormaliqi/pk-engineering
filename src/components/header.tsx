import { useState } from "react";
import { Menu, X, Phone, Mail, MapPin, Calculator, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/LanguageToggle.tsx";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Top Bar - Minimal */}
      <div className="hidden lg:block bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 py-1">
          <div className="flex justify-between items-center text-xs text-gray-600">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Phone className="size-3" />
                <span>{t('header.topBar.phone')}</span>
              </div>
              <div className="flex items-center gap-1">
                <Mail className="size-3" />
                <span>{t('header.topBar.email')}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="size-3" />
                <span>Skenderaj, Kosovë</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <LanguageToggle />
              <a
                href="https://me.rks-gov.net/blog/prezantohet-skema-e-granteve-per-energji-te-paster-mbeshtetje-per-ndermarrjet-prodhuese-ne-vlere-deri-ne-25-mije-euro-per-biznes/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-700 font-medium"
              >
                {t('header.topBar.promotion')}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo Side */}
            <div className="flex items-center gap-4">
      <div className="bg-gradient-to-r from-green-300 to-blue-200 p-2 rounded-lg">
                  <Sun className="size-6 text-white" />
                </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold text-gray-900">PK Engineering</h1>
                <p className="text-sm text-gray-600">Energy Solutions & Consulting</p>
              </div>
            </div>

            {/* Desktop Navigation - Center */}
            <nav className="hidden lg:flex items-center gap-1 bg-gray-50 rounded-full px-2 py-1">
              {[
                { href: "/", label: 'home' },
                { href: "#services", label: 'services' },
                { href: "#projects", label: 'projects' },
                { href: "#about", label: 'about' },
                { href: "#contact", label: 'contact' }
              ].map((item) => (
                <a 
                  key={item.label}
                  href={item.href}
                  className="px-6 py-2 text-gray-700 hover:text-green-600 font-medium rounded-full transition-all duration-200 hover:bg-white hover:shadow-sm"
                >
                  {t(`header.nav.${item.label}`)}
                </a>
              ))}
            </nav>

            {/* Desktop CTA Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm"
                className="border-gray-300 text-gray-700 hover:border-blue-400 hover:text-blue-500"
              >
                <a href="/calc" className="flex items-center gap-2">
                  <Calculator className="size-4" />
                  {t('header.buttons.calculate')}
                </a>
              </Button>
              <a href="#contact">
                <Button 
                  size="sm"
                  className="bg-blue-400 hover:bg-blue-500 text-white px-6"
                >
                  {t('header.buttons.quote')}
                </Button>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center gap-3">
              <LanguageToggle />
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMobileMenu}
                className="p-2 hover:bg-gray-100"
              >
                {isMobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu - Full Screen */}
          {isMobileMenuOpen && (
            <div className="fixed inset-0 z-50 bg-white lg:hidden mt-20">
              <div className="container mx-auto px-4 py-8">
                {/* Mobile Navigation */}
                <nav className="flex flex-col gap-1 mb-8">
                  {[
                    { href: "/", label: 'home' },
                    { href: "#services", label: 'services' },
                    { href: "#projects", label: 'projects' },
                    { href: "#about", label: 'about' },
                    { href: "#contact", label: 'contact' }
                  ].map((item) => (
                    <a 
                      key={item.label}
                      href={item.href}
                      className="px-4 py-4 text-lg text-gray-700 hover:text-green-600 font-medium border-b border-gray-100 hover:bg-gray-50 rounded-lg transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t(`header.nav.${item.label}`)}
                    </a>
                  ))}
                </nav>

                {/* Contact Info */}
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Contact Info</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3 text-gray-600">
                      <Phone className="size-4" />
                      <span>{t('header.topBar.phone')}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <Mail className="size-4" />
                      <span>{t('header.topBar.email')}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <MapPin className="size-4" />
                      <span>Prishtinë, Kosovë</span>
                    </div>
                  </div>
                </div>

                {/* Mobile CTA Buttons */}
                <div className="flex flex-col gap-3">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-gray-300 text-gray-700 justify-center gap-2 py-3"
                  >
                    <Calculator className="size-4" />
                    <a href="/calc">
                      {t('header.buttons.calculate')}
                    </a>
                  </Button>
                  <Button 
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-white justify-center py-3"
                  >
                    {t('header.buttons.quote')}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
