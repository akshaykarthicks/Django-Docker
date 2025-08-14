import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Zap, Shield, Layers } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <Zap className="h-8 w-8 text-primary-500" />,
      title: "AI-Powered Generation",
      description: "Transform your requirements into functional Python code using advanced AI"
    },
    {
      icon: <Code className="h-8 w-8 text-primary-500" />,
      title: "Django Integration",
      description: "Seamlessly integrate generated code with Django Ninja API framework"
    },
    {
      icon: <Shield className="h-8 w-8 text-primary-500" />,
      title: "Production Ready",
      description: "Generated code follows best practices and is ready for production use"
    },
    {
      icon: <Layers className="h-8 w-8 text-primary-500" />,
      title: "Modular Architecture",
      description: "Clean separation between business logic and API layer for maintainability"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center py-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Turn Ideas Into Code
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Transform your project ideas into production-ready applications with CodeCraft AI. 
          Generate complete Python backends, beautiful frontends, and technical documentation in minutes.
        </p>
        <Link
          to="/generate"
          className="inline-flex items-center px-8 py-4 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors"
        >
          Start Generating Code
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 py-16">
        {features.map((feature, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* How It Works */}
      <div className="py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How CodeCraft AI Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary-600">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Describe Your Requirements</h3>
            <p className="text-gray-600">Provide detailed project requirements in natural language</p>
          </div>
          <div className="text-center">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary-600">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">AI Crafts Your Code</h3>
            <p className="text-gray-600">CodeCraft AI analyzes your ideas and generates complete applications</p>
          </div>
          <div className="text-center">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary-600">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Deploy & Integrate</h3>
            <p className="text-gray-600">Review, test, and integrate the generated code into your project</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;