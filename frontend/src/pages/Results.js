import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Copy, Download, ArrowLeft, AlertCircle } from 'lucide-react';

const Results = () => {
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedResult = sessionStorage.getItem('generationResult');
    if (storedResult) {
      setResult(JSON.parse(storedResult));
    } else {
      navigate('/generate');
    }
  }, [navigate]);

  const handleCopy = async () => {
    if (result?.result) {
      try {
        await navigator.clipboard.writeText(result.result);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  };

  const handleDownload = () => {
    if (result?.result) {
      const blob = new Blob([result.result], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'generated_code.py';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  if (!result) {
    return (
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-yellow-800 mb-2">No Results Found</h2>
          <p className="text-yellow-700 mb-4">
            It looks like you haven't generated any code yet.
          </p>
          <button
            onClick={() => navigate('/generate')}
            className="inline-flex items-center px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go to Code Generator
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <button
            onClick={() => navigate('/generate')}
            className="mr-4 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Code Generation Results</h1>
            <p className="text-gray-600 mt-1">Your AI-generated code is ready!</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={handleCopy}
            className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Copy className="h-4 w-4 mr-2" />
            {copied ? 'Copied!' : 'Copy Code'}
          </button>
          <button
            onClick={handleDownload}
            className="inline-flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </button>
        </div>
      </div>

      {/* Success Message */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <div className="flex items-center">
          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
          <span className="text-green-800 font-medium">Code generated successfully!</span>
        </div>
      </div>

      {/* Generated Code */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">Generated Code</h2>
        </div>
        <div className="p-6">
          <pre className="bg-gray-50 rounded-lg p-4 overflow-x-auto text-sm">
            <code className="text-gray-800">{result.result}</code>
          </pre>
        </div>
      </div>

      {/* Next Steps */}
      <div className="mt-8 bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">🚀 Next Steps</h3>
        <div className="space-y-2 text-blue-800">
          <p>• Review the generated code for your specific requirements</p>
          <p>• Test the code in your development environment</p>
          <p>• Integrate with your Django project's models and views</p>
          <p>• Add any additional business logic or customizations</p>
          <p>• Run tests to ensure everything works as expected</p>
        </div>
      </div>

      {/* Generate More */}
      <div className="mt-6 text-center">
        <button
          onClick={() => navigate('/generate')}
          className="inline-flex items-center px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          Generate More Code
        </button>
      </div>
    </div>
  );
};

export default Results;