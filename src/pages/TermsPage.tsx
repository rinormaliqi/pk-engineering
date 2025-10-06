import React from "react";
import { useTranslation } from "react-i18next";
import Header from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, CheckCircle, Settings, Shield, Scale, AlertTriangle, Gavel } from "lucide-react";

export default function TermsPage() {
  const { t } = useTranslation();

  const sections = [
    {
      icon: <CheckCircle className="h-6 w-6" />,
      key: "acceptance"
    },
    {
      icon: <Settings className="h-6 w-6" />,
      key: "services"
    },
    {
      icon: <FileText className="h-6 w-6" />,
      key: "userObligations"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      key: "intellectualProperty"
    },
    {
      icon: <AlertTriangle className="h-6 w-6" />,
      key: "limitation"
    },
    {
      icon: <Scale className="h-6 w-6" />,
      key: "changes"
    },
    {
      icon: <Gavel className="h-6 w-6" />,
      key: "governingLaw"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">      
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <FileText className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">
              {t('terms.title')}
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('terms.intro')}
          </p>
          <div className="mt-4 text-sm text-gray-500">
            {t('terms.lastUpdated')} {new Date().toLocaleDateString('sq-AL')}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <Card key={section.key} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-green-700">
                  <div className="bg-blue-50 p-2 rounded-lg">
                    {section.icon}
                  </div>
                  {t(`terms.sections.${section.key}.title`)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {t(`terms.sections.${section.key}.content`)}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Important Notice */}
        <Card className="mt-8 bg-red-50 border-red-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="bg-red-100 p-2 rounded-lg mt-1">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Shënim i Rëndësishëm / Important Notice
                </h3>
                <p className="text-gray-700 text-sm">
                  Këto kushte përbëjnë marrëveshjen e plotë midis jush dhe E&A GREEN SOLAR. 
                  These terms constitute the complete agreement between you and E&A GREEN SOLAR.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}