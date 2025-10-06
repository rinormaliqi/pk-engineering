import React from "react";
import { Sun, Facebook, Instagram, Linkedin, Phone, Mail, MapPin, Leaf } from "lucide-react";
import { useTranslation } from "react-i18next";

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-blue-900 text-white">
      <div className="container mx-auto px-4">
        {/* Main Footer */}
        <div className="py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-gradient-to-r from-green-300 to-blue-200 p-2 rounded-lg">
                  <Sun className="size-6 text-white" />
                </div>
                <span className="text-2xl font-bold">{t("hero.company")}</span>
              </div>

              <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
                {t("footer.description")}
              </p>

              <div className="flex gap-4">
                <a
                  href="https://www.facebook.com/profile.php?id=61577089900646"
                  className="bg-gray-800 hover:bg-green-600 p-2 rounded-lg transition-colors"
                >
                  <Facebook className="size-5" />
                </a>
                <a
                  href="https://www.instagram.com/eagreensolarshpk/"
                  className="bg-gray-800 hover:bg-green-600 p-2 rounded-lg transition-colors"
                >
                  <Instagram className="size-5" />
                </a>
                <a
                  href="#"
                  className="bg-gray-800 hover:bg-green-600 p-2 rounded-lg transition-colors"
                >
                  <Linkedin className="size-5" />
                </a>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-green-400">{t("footer.services")}</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    {t("footer.solarSystems")}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    {t("footer.consultation")}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    {t("footer.maintenance")}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    {t("footer.hydro")}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    {t("footer.ac")}
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-green-400">{t("footer.contact")}</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="size-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">+353 45 123 123</span>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="size-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">Engineering@gmail.com</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="size-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">{t("contact.locationText")}</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-green-900/50 to-yellow-900/50 rounded-lg border border-green-800/30">
                <div className="flex items-center gap-2 mb-2">
                  <Leaf className="size-4 text-green-400" />
                  <span className="text-sm font-medium text-green-400">{t("footer.cleanEnergy")}</span>
                </div>
                <p className="text-xs text-gray-300">{t("footer.cleanEnergyText")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">{t("footer.rights")}</p>
            <div className="flex gap-6 text-sm">
              <a href="/" className="text-gray-400 hover:text-white transition-colors">
                {t("footer.privacy")}
              </a>
              <a href="/" className="text-gray-400 hover:text-white transition-colors">
                {t("footer.terms")}
              </a>
              <a href="/" className="text-gray-400 hover:text-white transition-colors">
                {t("footer.license")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
