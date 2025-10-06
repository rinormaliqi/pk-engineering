import React from "react";
import { useTranslation } from "react-i18next";
import Header from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scale, Ban, Copyright, Award, AlertTriangle, FileWarning, Mail } from "lucide-react";

export default function LicensePage() {
  const { t } = useTranslation();

  const sections = [
    {
      icon: <Scale className="h-6 w-6" />,
      key: "grant"
    },
    {
      icon: <Ban className="h-6 w-6" />,
      key: "restrictions"
    },
    {
      icon: <Copyright className="h-6 w-6" />,
      key: "intellectualProperty"
    },
    {
      icon: <Award className="h-6 w-6" />,
      key: "attribution"
    },
    {
      icon: <FileWarning className="h-6 w-6" />,
      key: "termination"
    },
    {
      icon: <AlertTriangle className="h-6 w-6" />,
      key: "warranty"
    },
    {
      icon: <Mail className="h-6 w-6" />,
      key: "contact"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-green-50">
      
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <Scale className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">
              {t('license.title')}
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('license.intro')}
          </p>
          <div className="mt-4 text-sm text-gray-500">
            {t('license.lastUpdated')} {new Date().toLocaleDateString('sq-AL')}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <Card key={section.key} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-green-700">
                  <div className="bg-purple-50 p-2 rounded-lg">
                    {section.icon}
                  </div>
                  {t(`license.sections.${section.key}.title`)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {t(`license.sections.${section.key}.content`)}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* License Summary */}
        <Card className="mt-8 bg-green-50 border-green-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-2 rounded-lg mt-1">
                <Award className="h-5 w-5 text-green-300" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Përmbledhje e Licensës / License Summary
                </h3>
                <p className="text-gray-700 text-sm">
                  Kjo është një licensë e kufizuar për përdorim personal. Për përdorime komerciale, kërkohet leje e veçantë. 
                  This is a limited license for personal use. For commercial uses, special permission is required.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}