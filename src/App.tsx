import { BrowserRouter, Route, Routes } from "react-router-dom";

import { DefaultProviders } from "./components/providers/default.tsx";
import Index from "./pages/index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Calculator from "./components/Calculator.tsx";
import Header from "./components/header.tsx";
import LicensePage from "./pages/LicensePage.tsx";
import TermsPage from "./pages/TermsPage.tsx";
import PrivacyPage from "./pages/PrivacyPage.tsx";
import Footer from "./components/footer.tsx";
import BackToTopButton from "./components/BackToTopButton.tsx";

export default function App() {
  return (
    <DefaultProviders>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/calc" element={<Calculator />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/license" element={<LicensePage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        {/* BackToTopButton duhet të jetë brenda BrowserRouter por jashtë Routes */}
        <BackToTopButton />
      </BrowserRouter>
    </DefaultProviders>
  );
}