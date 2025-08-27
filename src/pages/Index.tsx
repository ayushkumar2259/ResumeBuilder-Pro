import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Zap, Download, Users, Check } from 'lucide-react';

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-primary mr-2" />
              <h1 className="text-2xl font-bold text-gray-900">ResumeBuilder Pro</h1>
            </div>
            <div className="flex gap-4">
              <Link to="/login">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Build Professional Resumes
            <span className="block text-primary">In Minutes</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Create stunning, ATS-friendly resumes with our intuitive builder. 
            Choose from professional templates and land your dream job faster.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="px-8">
                Create Your Resume
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" className="px-8">
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center">
            <CardHeader>
              <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Fast & Easy</CardTitle>
              <CardDescription>
                Build your resume in minutes with our intuitive drag-and-drop interface
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Download className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Professional Templates</CardTitle>
              <CardDescription>
                Choose from dozens of professionally designed, ATS-friendly templates
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Expert Approved</CardTitle>
              <CardDescription>
                Templates created by hiring managers and career experts
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose ResumeBuilder Pro?</h2>
            <p className="text-gray-600">Everything you need to create the perfect resume</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <Check className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900">ATS-Optimized</h3>
                <p className="text-gray-600">Beat applicant tracking systems with optimized formatting</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Check className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900">Multiple Formats</h3>
                <p className="text-gray-600">Download in PDF, Word, or share online</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Check className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900">Real-time Preview</h3>
                <p className="text-gray-600">See changes instantly as you edit</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Check className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900">Cloud Storage</h3>
                <p className="text-gray-600">Access your resumes anywhere, anytime</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
          <p className="text-gray-600 mb-8">Join thousands of job seekers who have landed their dream jobs</p>
          <Link to="/register">
            <Button size="lg" className="px-8">
              Create Your Free Resume Now
            </Button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 ResumeBuilder Pro. Built with modern web technologies.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}