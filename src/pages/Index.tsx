
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Logo from '@/components/Logo';
import { ArrowRight, CheckCircle, Shield, Zap, Globe } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-oaia-light to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Logo />
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost" className="text-oaia-blue hover:text-oaia-orange">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-oaia-blue hover:bg-oaia-blue/90 text-white">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Advance Tomorrow's 
              <span className="text-oaia-blue"> Payment</span>, 
              <span className="text-oaia-orange"> Today</span>
            </h1>
            <p className="text-xl text-oaia-gray mb-8 leading-relaxed">
              Empowering African SMEs with faster access to cash from approved government invoices. 
              Transparent, secure, and efficient invoice processing across Africa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="bg-oaia-blue hover:bg-oaia-blue/90 text-white px-8 py-3">
                  Start Your Application
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-oaia-blue text-oaia-blue hover:bg-oaia-blue hover:text-white px-8 py-3">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose OAIA?
            </h2>
            <p className="text-xl text-oaia-gray max-w-2xl mx-auto">
              Built for African businesses, designed for government transparency
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-l-4 border-l-oaia-blue hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-oaia-blue mb-4" />
                <CardTitle className="text-oaia-blue">Secure & Trustworthy</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-oaia-gray">
                  Bank-grade security with full transparency and compliance tracking
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-oaia-orange hover:shadow-lg transition-shadow">
              <CardHeader>
                <Zap className="h-12 w-12 text-oaia-orange mb-4" />
                <CardTitle className="text-oaia-blue">Fast Processing</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-oaia-gray">
                  Real-time status updates and automated workflows for quick approvals
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-oaia-green hover:shadow-lg transition-shadow">
              <CardHeader>
                <CheckCircle className="h-12 w-12 text-oaia-green mb-4" />
                <CardTitle className="text-oaia-blue">Compliant</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-oaia-gray">
                  Full regulatory compliance with African procurement standards
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-oaia-blue hover:shadow-lg transition-shadow">
              <CardHeader>
                <Globe className="h-12 w-12 text-oaia-blue mb-4" />
                <CardTitle className="text-oaia-blue">Pan-African</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-oaia-gray">
                  Connecting contractors and governments across the continent
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-oaia-blue to-oaia-orange">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of contractors already using OAIA to accelerate their cash flow
          </p>
          <Link to="/signup">
            <Button size="lg" variant="secondary" className="bg-white text-oaia-blue hover:bg-white/90 px-8 py-3">
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <Logo className="text-white" />
              <p className="text-gray-400 mt-2 max-w-md">
                Empowering African SMEs with transparent, secure invoice advancement
              </p>
            </div>
            <div className="text-center md:text-right text-gray-400">
              <p>&copy; 2024 OAIA. All rights reserved.</p>
              <p className="text-sm mt-1">One Africa Invoice Advance</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
