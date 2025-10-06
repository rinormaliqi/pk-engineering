import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Sun, Zap, ArrowRight, MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, Home, Building, Factory, DollarSign, TrendingUp, Leaf, Shield, Users, CheckCircle, User, Award, Heart, Settings, Package, Battery, Star, Clock, ToolCase, Snowflake, Globe, Target } from "lucide-react";
import Header from "@/components/header";
import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import SolarCalculatorKosovo from "@/components/calc";

export default function Index() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen">      
      {/* Hero Section */}
    <div className="bg-gradient-to-br from-blue-50 via-white to-white">
  <div className="container mx-auto px-4 py-16 lg:py-24">
    <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
      {/* Left Content */}
      <div className="space-y-8">
        <div className="inline-flex items-center gap-3 bg-white rounded-full px-4 py-2 shadow-sm border border-gray-100">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-gray-700">{t('hero.company')}</span>
        </div>
        
        <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
          {t('hero.title1')}
          <span className="text-green-600 block">{t('hero.title2')}</span>
        </h1>
        
        <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
          {t('hero.subtitle')}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <a href="#contact">
            <Button 
              size="lg" 
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all"
            >
              {t('hero.button1')}
              <ArrowRight className="ml-2 size-5" />
            </Button>
          </a>
          
          <a href="/brochure.pdf" target="_blank" rel="noopener noreferrer">
            <Button 
              variant="outline" 
              size="lg"
              className="border-blue-400 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg"
            >
              {t('hero.button2')}
            </Button>
          </a>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">5+</div>
            <div className="text-sm text-gray-600">{t('hero.experience')}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">25</div>
            <div className="text-sm text-gray-600">{t('hero.warranty')}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">500+</div>
            <div className="text-sm text-gray-600">{t('hero.projects')}</div>
          </div>
        </div>
      </div>
      
      {/* Right Visual - Modern Energy Concept */}
      <div className="relative">
        {/* Main Card */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
          {/* Energy Flow Visualization */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Sun className="size-6 text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Energji Diellore</div>
                <div className="text-lg font-semibold text-gray-900">Active</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Zap className="size-6 text-green-600" />
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Energji e Gjeneruar</div>
                <div className="text-lg font-semibold text-green-600">24.7 kWh</div>
              </div>
            </div>
          </div>
          
          {/* Energy Flow Diagram */}
          <div className="relative mb-8">
            <div className="flex items-center justify-between">
              {/* Sun */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                  <Sun className="size-8 text-yellow-600" />
                </div>
                <span className="text-xs text-gray-500 mt-2">Dielli</span>
              </div>
              
              {/* Arrow */}
              <div className="flex-1 mx-4">
                <div className="h-1 bg-gradient-to-r from-yellow-400 via-blue-400 to-green-500 rounded-full"></div>
                <div className="flex justify-between mt-1">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
              </div>
              
              {/* Solar Panel */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center shadow-lg">
                  <div className="grid grid-cols-3 gap-1">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="w-2 h-4 bg-blue-400 rounded-sm"></div>
                    ))}
                  </div>
                </div>
                <span className="text-xs text-gray-500 mt-2">Panelet</span>
              </div>
              
              {/* Arrow */}
              <div className="flex-1 mx-4">
                <div className="h-1 bg-gradient-to-r from-green-500 to-green-600 rounded-full"></div>
              </div>
              
              {/* Home */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                  <Home className="size-6 text-white" />
                </div>
                <span className="text-xs text-gray-500 mt-2">Shtëpia</span>
              </div>
            </div>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <div className="text-sm text-blue-600 mb-1">Kursime Mujore</div>
              <div className="text-xl font-bold text-blue-700">€127.43</div>
            </div>
            <div className="bg-green-50 rounded-xl p-4 border border-green-100">
              <div className="text-sm text-green-600 mb-1">CO₂ Reduktuar</div>
              <div className="text-xl font-bold text-green-700">1.2 ton</div>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">Online</span>
          </div>
        </div>
        
        <div className="absolute -bottom-4 -left-4 bg-green-500 text-white rounded-2xl px-4 py-2 shadow-lg">
          <div className="text-sm font-medium">24/7 Support</div>
        </div>
      </div>
    </div>
  </div>
</div>

      {/* Çmimet Section */}
      <section id="insta" className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 text-green-600 mb-4">
              <DollarSign className="size-6" />
              <span className="text-sm font-medium tracking-wide uppercase">{t('pricing.title')}</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('pricing.subtitle')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('pricing.description')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2">
                  <Home className="size-6 text-green-600" />
                  {t('pricing.tile')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600 mb-4">450€<span className="text-sm font-normal text-gray-600"> / kWp</span></div>
                <p className="text-gray-500 mb-4">{t('pricing.withoutVat')}</p>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="size-4 text-green-500" />
                    Instalim profesional
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="size-4 text-green-500" />
                    Panele cilësore
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="size-4 text-green-500" />
                    Garanci 25 vjeçare
                  </li>
                </ul>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  {t('pricing.choose')}
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-2 border-yellow-400 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2">
                  <Building className="size-6 text-yellow-600" />
                  {t('pricing.tileRoof')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-yellow-600 mb-4">700€<span className="text-sm font-normal text-gray-600"> / kWp</span></div>
                <p className="text-gray-500 mb-4">{t('pricing.specialized')}</p>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="size-4 text-yellow-500" />
                    Teknologji e avancuar
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="size-4 text-yellow-500" />
                    Integrim perfekt
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="size-4 text-yellow-500" />
                    Rezistencë ndaj motit
                  </li>
                </ul>
                <Button className="w-full bg-yellow-600 hover:bg-yellow-700">
                  {t('pricing.choose')}
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2">
                  <Factory className="size-6 text-green-600" />
                  {t('pricing.sandwich')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600 mb-4">600€<span className="text-sm font-normal text-gray-600"> / kWp</span></div>
                <p className="text-gray-500 mb-4">{t('pricing.complex')}</p>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="size-4 text-green-500" />
                    Dizajn fleksibël
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="size-4 text-green-500" />
                    Instalim i shpejtë
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="size-4 text-green-500" />
                    Efikasitet maksimal
                  </li>
                </ul>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  {t('pricing.choose')}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Partnerët Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('partners.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('partners.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Zap className="size-6 text-yellow-500" />
                {t('partners.solarPanels')}
              </h3>
              <div className="space-y-4">
                {[
                  { name: "Luxor Solar Gmbh", desc: "Teknologji Gjermane - Cilësi Maksimale" },
                  { name: "AE Solar", desc: "Inovacion dhe Efikasitet" }
                ].map((panel, index) => (
                  <Card key={index} className="p-4">
                    <CardContent className="p-0">
                      <div className="flex items-center gap-4">
                        <div className="bg-green-100 p-3 rounded-lg">
                          <Sun className="size-6 text-green-600" />
                        </div>
                        <div>
                          <div className="font-bold text-gray-800">{panel.name}</div>
                          <div className="text-sm text-gray-600">{panel.desc}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Settings className="size-6 text-green-500" />
                {t('partners.inverters')}
              </h3>
              <div className="space-y-4">
                {[
                  { name: "Huawei", desc: "Teknologji e Avancuar Smart" },
                  { name: "Sungrow", desc: "Efikasitet dhe Besueshmëri" },
                  { name: "Growatt", desc: "Zgjidhje të Përballueshme" }
                ].map((inverter, index) => (
                  <Card key={index} className="p-4">
                    <CardContent className="p-0">
                      <div className="flex items-center gap-4">
                        <div className="bg-blue-100 p-3 rounded-lg">
                          <Zap className="size-6 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-bold text-gray-800">{inverter.name}</div>
                          <div className="text-sm text-gray-600">{inverter.desc}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rreth Nesh Section */}
 <div id="about" className="bg-gradient-to-br from-blue-50 via-white to-white py-20">
  <div className="container mx-auto px-4">
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-3 bg-white rounded-full px-4 py-2 shadow-sm border border-gray-100 mb-6">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm font-medium text-gray-700 tracking-wide uppercase">{t('about.title')}</span>
        </div>
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
          {t('about.company')}
          <span className="text-green-600 block">- {t('about.subtitle')}</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          {t('about.description')}
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Left Content */}
        <div className="space-y-8">
          {/* Mission Card */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Target className="size-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{t('about.mission')}</h3>
            </div>
            <p className="text-gray-600 leading-relaxed text-lg">
              {t('about.missionText')}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
              <div className="text-3xl font-bold mb-2">5+</div>
              <div className="text-green-100 font-medium">{t('hero.experience')}</div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="text-blue-100 font-medium">{t('hero.projects')}</div>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <Award className="size-5 text-green-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900">{t('about.whyChoose')}</h4>
            </div>
            <ul className="space-y-4">
              {[
                'about.reasons.quality',
                'about.reasons.savings', 
                'about.reasons.environment',
                'about.reasons.service'
              ].map((reason, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="size-4 text-green-600" />
                  </div>
                  <span className="text-gray-700 font-medium">{t(reason)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Visual */}
        <div className="relative">
          {/* Main Card */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            {/* Team/Projects Grid */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-square rounded-xl overflow-hidden border border-gray-200 bg-gray-100 flex items-center justify-center shadow-sm">
                  <img 
                    src={`/images/img${i}.jpg`}
                    alt={`Projekt ${i}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      // Fallback nëse foto nuk ekziston
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="hidden w-full h-full items-center justify-center bg-gradient-to-br from-blue-100 to-green-100">
                    <div className="text-center">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <CheckCircle className="size-4 text-white" />
                      </div>
                      <span className="text-xs font-medium text-gray-700">Projekt {i}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* International Experience */}
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="size-5 text-blue-600" />
                <h5 className="text-lg font-bold text-blue-700">{t('about.international')}</h5>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {['Itali', 'Gjermani', 'Shqipëri', 'Kosovë'].map((country, index) => (
                  <div key={index} className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-blue-200">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium text-blue-700">{country}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute -top-4 -right-4 bg-green-500 text-white rounded-2xl px-4 py-2 shadow-lg">
            <div className="text-sm font-medium">Professional Team</div>
          </div>
          
          <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-3 shadow-lg border border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">Certified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

      {/* Shërbimet Tona Section */}
      <div id="services" className="bg-gradient-to-br from-yellow-50 to-green-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-2 text-green-600 mb-4">
                <Settings className="size-6" />
                <span className="text-sm font-medium tracking-wide uppercase">{t('services.title')}</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                {t('services.subtitle')}
                <span className="text-yellow-500"></span>
              </h2>
            </div>

            {/* Services Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Solar Installation */}
              <Card className="p-6 hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <Sun className="size-5 text-green-600" />
                    </div>
                    <CardTitle className="text-lg">{t('services.solar.title')}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    {t('services.solar.description')}
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="size-4 text-green-500" />
                      {t('services.solar.residential')}
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="size-4 text-green-500" />
                      {t('services.solar.commercial')}
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="size-4 text-green-500" />
                      {t('services.solar.industrial')}
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Consultation */}
              <Card className="p-6 hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Users className="size-5 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">{t('services.consultation.title')}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    {t('services.consultation.description')}
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="size-4 text-blue-500" />
                      {t('services.consultation.needs')}
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="size-4 text-blue-500" />
                      {t('services.consultation.design')}
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="size-4 text-blue-500" />
                      {t('services.consultation.feasibility')}
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Maintenance */}
              <Card className="p-6 hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-yellow-100 p-2 rounded-lg">
                      <ToolCase className="size-5 text-yellow-600" />
                    </div>
                    <CardTitle className="text-lg">{t('services.maintenance.title')}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    {t('services.maintenance.description')}
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="size-4 text-yellow-500" />
                      {t('services.maintenance.monitoring')}
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="size-4 text-yellow-500" />
                      {t('services.maintenance.periodic')}
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="size-4 text-yellow-500" />
                      {t('services.maintenance.support')}
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Hydrosanitary */}
              <Card className="p-6 hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <Home className="size-5 text-purple-600" />
                    </div>
                    <CardTitle className="text-lg">{t('services.hydro.title')}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    {t('services.hydro.description')}
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="size-4 text-purple-500" />
                      {t('services.hydro.homes')}
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="size-4 text-purple-500" />
                      {t('services.hydro.businesses')}
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="size-4 text-purple-500" />
                      {t('services.hydro.new')}
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Air Conditioning */}
              <Card className="p-6 hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-cyan-100 p-2 rounded-lg">
                      <Snowflake className="size-5 text-cyan-600" />
                    </div>
                    <CardTitle className="text-lg">{t('services.ac.title')}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    {t('services.ac.description')}
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="size-4 text-cyan-500" />
                      {t('services.ac.residential')}
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="size-4 text-cyan-500" />
                      {t('services.ac.commercial')}
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="size-4 text-cyan-500" />
                      {t('services.ac.service')}
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Support */}
              <Card className="p-6 hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-red-100 p-2 rounded-lg">
                      <Shield className="size-5 text-red-600" />
                    </div>
                    <CardTitle className="text-lg">{t('services.support.title')}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    {t('services.support.description')}
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="size-4 text-red-500" />
                      {t('services.support.product')}
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="size-4 text-red-500" />
                      {t('services.support.installation')}
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="size-4 text-red-500" />
                      {t('services.support.assistance')}
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Solar Calculator Section */}
      <SolarCalculatorKosovo/>

      {/* Contact Form Section */}
<section id="contact" className="py-20 bg-white">
  <div className="container mx-auto px-4 max-w-4xl">
    {/* Header */}
    <div className="text-center mb-16">
      <div className="inline-flex items-center gap-3 bg-gray-50 rounded-full px-4 py-2 mb-6">
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        <span className="text-sm font-medium text-gray-700 tracking-wide uppercase">{t('contact.title')}</span>
      </div>
      
      <h2 className="text-4xl font-bold text-gray-900 mb-6">
        {t('contact.subtitle')}
      </h2>
      
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        {t('contact.description')}
      </p>
    </div>

    <div className="grid lg:grid-cols-2 gap-12 items-start">
      {/* Contact Info */}
      <div className="space-y-8">
        <div className="space-y-6">
          <div className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl transition-colors">
            <div className="bg-gray-100 p-3 rounded-lg">
              <Phone className="size-5 text-gray-600" />
            </div>
            <div>
              <div className="font-medium text-gray-900">{t('contact.phone')}</div>
              <div className="text-gray-600">+383 44 123 456</div>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl transition-colors">
            <div className="bg-gray-100 p-3 rounded-lg">
              <Mail className="size-5 text-gray-600" />
            </div>
            <div>
              <div className="font-medium text-gray-900">{t('contact.email')}</div>
              <div className="text-gray-600">info@pkengineering.com</div>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl transition-colors">
            <div className="bg-gray-100 p-3 rounded-lg">
              <MapPin className="size-5 text-gray-600" />
            </div>
            <div>
              <div className="font-medium text-gray-900">{t('contact.location')}</div>
              <div className="text-gray-600">{t('contact.locationText')}</div>
            </div>
          </div>
        </div>

        {/* Why Choose Us - Minimal */}
        <div className="border-t border-gray-200 pt-8">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Shield className="size-5 text-gray-600" />
            {t('contact.whyChoose')}
          </h3>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              {t('contact.reasons.experience')}
            </li>
            <li className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              {t('contact.reasons.brands')}
            </li>
            <li className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              {t('contact.reasons.support')}
            </li>
          </ul>
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('contact.form.title')}</h3>
          <p className="text-gray-600">Plotësoni formularin dhe ne do t'ju kontaktojmë brenda 24 orëve.</p>
        </div>

        <form className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName" className="text-gray-700 font-medium">{t('contact.form.firstName')}</Label>
              <Input 
                id="firstName" 
                placeholder={t('contact.form.firstName')} 
                required 
                className="mt-2 bg-white border-gray-300 focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <div>
              <Label htmlFor="lastName" className="text-gray-700 font-medium">{t('contact.form.lastName')}</Label>
              <Input 
                id="lastName" 
                placeholder={t('contact.form.lastName')} 
                required 
                className="mt-2 bg-white border-gray-300 focus:border-green-500 focus:ring-green-500"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email" className="text-gray-700 font-medium">{t('contact.form.email')}</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="email@example.com" 
              required 
              className="mt-2 bg-white border-gray-300 focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div>
            <Label htmlFor="phone" className="text-gray-700 font-medium">{t('contact.form.phone')}</Label>
            <Input 
              id="phone" 
              type="tel" 
              placeholder="+383 44 000 000" 
              className="mt-2 bg-white border-gray-300 focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div>
            <Label htmlFor="service" className="text-gray-700 font-medium">{t('contact.form.service')}</Label>
            <select 
              id="service" 
              className="w-full mt-2 p-3 bg-white border border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-colors"
            >
              <option value="solar">{t('contact.form.solar')}</option>
              <option value="hydro">{t('contact.form.hydro')}</option>
              <option value="ac">{t('contact.form.ac')}</option>
              <option value="consultation">{t('contact.form.consultation')}</option>
            </select>
          </div>

          <div>
            <Label htmlFor="message" className="text-gray-700 font-medium">{t('contact.form.message')}</Label>
            <Textarea 
              id="message" 
              placeholder={t('contact.form.message')}
              rows={4}
              className="mt-2 bg-white border-gray-300 focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <Button className="w-full bg-blue-400 hover:bg-blue-500 text-white py-3 rounded-lg transition-colors">
            {t('contact.form.send')}
            <ArrowRight className="ml-2 size-4" />
          </Button>
        </form>
      </div>
    </div>

    {/* Additional Info */}
    <div className="mt-16 text-center border-t border-gray-200 pt-12">
      <div className="grid md:grid-cols-3 gap-8 text-sm text-gray-600">
        <div>
          <div className="font-semibold text-gray-900 mb-2">Orari i Punës</div>
          <div>E Hënë - E Premte: 8:00 - 17:00</div>
          <div>E Shtunë: 9:00 - 13:00</div>
        </div>
        <div>
          <div className="font-semibold text-gray-900 mb-2">Përgjigjemi shpejt</div>
          <div>Përgjigjemi brenda 24 orëve</div>
          <div>Konsultime falas</div>
        </div>
        <div>
          <div className="font-semibold text-gray-900 mb-2">Na Ndiqni</div>
          <div className="flex justify-center gap-4">
            <a href="#" className="text-gray-400 hover:text-green-600 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-green-600 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-green-600 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.017z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  );
}
