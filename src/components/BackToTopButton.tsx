import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ArrowUp } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function BackToTopButton() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const handleClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-blue-400 hover:bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
      aria-label={t('backToTop.ariaLabel')}
      title={t('backToTop.tooltip')}
    >
      <ArrowUp className="h-6 w-6" />
    </button>
  );
}