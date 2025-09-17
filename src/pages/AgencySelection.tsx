// OAIA Digital - Agency Selection Page
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Logo from '@/components/Logo';
import { Search, Building2, ArrowRight } from 'lucide-react';

const AgencySelection = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const agencies = [
    {
      id: 'getfund',
      name: 'Ghana Education Trust Fund (GETFund)',
      description: 'Educational infrastructure and development projects',
      url: '/agency/getfund'
    },
    {
      id: 'nhis',
      name: 'National Health Insurance Scheme (NHIS)',
      description: 'Healthcare services and medical infrastructure',
      url: '/agency/nhis'
    },
    {
      id: 'roadfund',
      name: 'Road Fund',
      description: 'Road construction and maintenance projects',
      url: '/agency/roadfund'
    },
    {
      id: 'ministry-health',
      name: 'Ministry of Health',
      description: 'Public health services and medical facilities',
      url: '/login?type=agency&agency=ministry-health'
    },
    {
      id: 'ministry-education',
      name: 'Ministry of Education',
      description: 'Educational services and school infrastructure',
      url: '/login?type=agency&agency=ministry-education'
    },
    {
      id: 'ministry-transport',
      name: 'Ministry of Transport',
      description: 'Transportation infrastructure and services',
      url: '/login?type=agency&agency=ministry-transport'
    },
    {
      id: 'ministry-works',
      name: 'Ministry of Works and Housing',
      description: 'Public works and housing development',
      url: '/login?type=agency&agency=ministry-works'
    },
    {
      id: 'ministry-water',
      name: 'Ministry of Water Resources',
      description: 'Water infrastructure and sanitation projects',
      url: '/login?type=agency&agency=ministry-water'
    }
  ];

  const filteredAgencies = agencies.filter(agency =>
    agency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agency.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAgencySelect = (agency: typeof agencies[0]) => {
    navigate(agency.url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-oaia-light via-white to-oaia-light flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <Logo />
          </Link>
          <h1 className="mt-6 text-3xl font-bold text-gray-900">Select Your Agency</h1>
          <p className="mt-2 text-oaia-gray">Choose your government agency to proceed to sign-in</p>
        </div>

        {/* Search */}
        <Card className="mb-6 shadow-lg border-0">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-oaia-gray" />
              <Input
                placeholder="Search agencies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 focus:ring-oaia-blue focus:border-oaia-blue"
              />
            </div>
          </CardContent>
        </Card>

        {/* Agency Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgencies.map((agency) => (
            <Card 
              key={agency.id} 
              className="hover:shadow-lg transition-all duration-200 cursor-pointer border-0 shadow-md hover:scale-105"
              onClick={() => handleAgencySelect(agency)}
            >
              <CardHeader className="text-center pb-3">
                <div className="w-16 h-16 bg-oaia-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-oaia-blue text-lg leading-tight">
                  {agency.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center pt-0">
                <CardDescription className="text-oaia-gray mb-4 min-h-[3rem] flex items-center justify-center">
                  {agency.description}
                </CardDescription>
                <Button 
                  className="w-full bg-oaia-blue hover:bg-oaia-blue/90 group"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAgencySelect(agency);
                  }}
                >
                  Sign In
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link to="/" className="text-oaia-blue hover:text-oaia-blue/80 text-sm">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AgencySelection;