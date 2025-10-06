import React from "react";
import { useTranslation } from "react-i18next";
import Header from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, Eye, FileText, Mail, UserCheck } from "lucide-react";

export default function PrivacyPage() {
  const { t } = useTranslation();

  const sections = [
    {
      icon: <FileText className="h-6 w-6" />,
      key: "dataCollection"
    },
    {
      icon: <Eye className="h-6 w-6" />,
      key: "dataUsage"
    },
    {
      icon: <Lock className="h-6 w-6" />,
      key: "dataProtection"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      key: "cookies"
    },
    {
      icon: <UserCheck className="h-6 w-6" />,
      key: "rights"
    },
    {
      icon: <Mail className="h-6 w-6" />,
      key: "contact"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-green-100 p-3 rounded-full">
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">
              {t('privacy.title')}
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('privacy.intro')}
          </p>
          <div className="mt-4 text-sm text-gray-500">
            {t('privacy.lastUpdated')} {new Date().toLocaleDateString('sq-AL')}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <Card key={section.key} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-green-700">
                  <div className="bg-green-50 p-2 rounded-lg">
                    {section.icon}
                  </div>
                  {t(`privacy.sections.${section.key}.title`)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {t(`privacy.sections.${section.key}.content`)}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <Card className="mt-8 bg-yellow-50 border-yellow-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="bg-yellow-100 p-2 rounded-lg mt-1">
                <Shield className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {t('privacy.title')}
                </h3>
                <p className="text-gray-700 text-sm">
                  {t('privacy.intro')} {t('privacy.sections.contact.content')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}