import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Loader2, FileText, Settings } from 'lucide-react';
import { generateCode } from '../services/api';

const CodeGenerator = () => {
  const [formData, setFormData] = useState({
    requirements: '',
    module_name: '',
    class_name: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await generateCode(formData);
      // Store result in sessionStorage to pass to results page
      sessionStorage.setItem('generationResult', JSON.stringify(result));
      navigate('/results');
    } catch (err) {
      setError(err.message || 'Failed to generate code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = formData.requirements.trim() && formData.module_name.trim() && formData.class_name.trim();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Craft Your Application</h1>
        <p className="text-lg text-gray-600">
          Describe your project idea and watch CodeCraft AI build it for you
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Requirements Section */}
          <div>
            <label className="flex items-center text-lg font-semibold text-gray-900 mb-3">
              <FileText className="h-5 w-5 mr-2 text-primary-500" />
              Project Requirements
            </label>
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleInputChange}
              placeholder="Describe your project requirements in detail. For example: 'Create a task management system with users, projects, tasks, and progress tracking. Users should be able to create projects, add tasks to projects, assign tasks to team members, and track completion status.'"
              className="w-full h-40 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              required
            />
            <p className="text-sm text-gray-500 mt-2">
              Be as specific as possible about the functionality, data models, and business logic you need.
            </p>
          </div>

          {/* Configuration Section */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center text-lg font-semibold text-gray-900 mb-3">
                <Settings className="h-5 w-5 mr-2 text-primary-500" />
                Module Name
              </label>
              <input
                type="text"
                name="module_name"
                value={formData.module_name}
                onChange={handleInputChange}
                placeholder="e.g., task_manager"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
              <p className="text-sm text-gray-500 mt-2">
                The name of the Python module to generate (snake_case)
              </p>
            </div>

            <div>
              <label className="flex items-center text-lg font-semibold text-gray-900 mb-3">
                <Settings className="h-5 w-5 mr-2 text-primary-500" />
                Main Class Name
              </label>
              <input
                type="text"
                name="class_name"
                value={formData.class_name}
                onChange={handleInputChange}
                placeholder="e.g., TaskManager"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
              <p className="text-sm text-gray-500 mt-2">
                The main class name for your module (PascalCase)
              </p>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <button
              type="submit"
              disabled={!isFormValid || isLoading}
              className="inline-flex items-center px-8 py-4 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  Generating Code...
                </>
              ) : (
                <>
                  <Play className="h-5 w-5 mr-2" />
                  Generate Code
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Tips Section */}
      <div className="mt-8 bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">✨ Tips for Better Results</h3>
        <ul className="space-y-2 text-blue-800">
          <li>• Be specific about features and functionality you want</li>
          <li>• Include styling preferences (modern, minimalist, cyberpunk, etc.)</li>
          <li>• Mention any specific technologies or patterns you prefer</li>
          <li>• Describe the main user interactions and workflows</li>
        </ul>
      </div>
    </div>
  );
};

export default CodeGenerator;