import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Plus, 
  Trash2, 
  Save, 
  Eye, 
  Download, 
  ArrowLeft,
  User,
  Briefcase,
  GraduationCap,
  Award,
  Code
} from 'lucide-react';

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  summary: string;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

interface Skill {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

interface ResumeData {
  title: string;
  template: string;
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
}

export default function ResumeBuilder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [resumeData, setResumeData] = useState<ResumeData>({
    title: 'Untitled Resume',
    template: 'modern',
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      summary: ''
    },
    experience: [],
    education: [],
    skills: []
  });

  useEffect(() => {
    if (id) {
      fetchResume();
    } else {
      // Initialize with user data for new resume
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        setResumeData(prev => ({
          ...prev,
          personalInfo: {
            ...prev.personalInfo,
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            email: user.email || ''
          }
        }));
      }
    }
  }, [id]);

  const fetchResume = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/resumes/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setResumeData(data);
      }
    } catch (error) {
      console.error('Error fetching resume:', error);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const url = id ? `/api/resumes/${id}` : '/api/resumes';
      const method = id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(resumeData)
      });

      if (response.ok) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error saving resume:', error);
      // For demo purposes, just navigate back
      navigate('/dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    setResumeData({
      ...resumeData,
      experience: [...resumeData.experience, newExp]
    });
  };

  const updateExperience = (id: string, field: string, value: string | boolean) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    });
  };

  const removeExperience = (id: string) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.filter(exp => exp.id !== id)
    });
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: ''
    };
    setResumeData({
      ...resumeData,
      education: [...resumeData.education, newEdu]
    });
  };

  const updateEducation = (id: string, field: string, value: string) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    });
  };

  const removeEducation = (id: string) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.filter(edu => edu.id !== id)
    });
  };

  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: '',
      level: 'Intermediate'
    };
    setResumeData({
      ...resumeData,
      skills: [...resumeData.skills, newSkill]
    });
  };

  const updateSkill = (id: string, field: string, value: string) => {
    setResumeData({
      ...resumeData,
      skills: resumeData.skills.map(skill =>
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    });
  };

  const removeSkill = (id: string) => {
    setResumeData({
      ...resumeData,
      skills: resumeData.skills.filter(skill => skill.id !== id)
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/dashboard')}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
              <div>
                <Input
                  value={resumeData.title}
                  onChange={(e) => setResumeData({ ...resumeData, title: e.target.value })}
                  className="text-lg font-semibold border-none shadow-none p-0 h-auto"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
              <Button onClick={handleSave} disabled={isLoading}>
                <Save className="mr-2 h-4 w-4" />
                {isLoading ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personal" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Personal Info
            </TabsTrigger>
            <TabsTrigger value="experience" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Experience
            </TabsTrigger>
            <TabsTrigger value="education" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Education
            </TabsTrigger>
            <TabsTrigger value="skills" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              Skills
            </TabsTrigger>
          </TabsList>

          {/* Personal Information Tab */}
          <TabsContent value="personal" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={resumeData.personalInfo.firstName}
                      onChange={(e) => setResumeData({
                        ...resumeData,
                        personalInfo: { ...resumeData.personalInfo, firstName: e.target.value }
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={resumeData.personalInfo.lastName}
                      onChange={(e) => setResumeData({
                        ...resumeData,
                        personalInfo: { ...resumeData.personalInfo, lastName: e.target.value }
                      })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={resumeData.personalInfo.email}
                      onChange={(e) => setResumeData({
                        ...resumeData,
                        personalInfo: { ...resumeData.personalInfo, email: e.target.value }
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={resumeData.personalInfo.phone}
                      onChange={(e) => setResumeData({
                        ...resumeData,
                        personalInfo: { ...resumeData.personalInfo, phone: e.target.value }
                      })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={resumeData.personalInfo.address}
                    onChange={(e) => setResumeData({
                      ...resumeData,
                      personalInfo: { ...resumeData.personalInfo, address: e.target.value }
                    })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="summary">Professional Summary</Label>
                  <Textarea
                    id="summary"
                    rows={4}
                    placeholder="Write a brief summary of your professional background and career objectives..."
                    value={resumeData.personalInfo.summary}
                    onChange={(e) => setResumeData({
                      ...resumeData,
                      personalInfo: { ...resumeData.personalInfo, summary: e.target.value }
                    })}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Experience Tab */}
          <TabsContent value="experience" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Work Experience</h2>
              <Button onClick={addExperience}>
                <Plus className="mr-2 h-4 w-4" />
                Add Experience
              </Button>
            </div>

            {resumeData.experience.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Briefcase className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No work experience added</h3>
                  <p className="text-gray-600 text-center mb-4">
                    Add your work experience to showcase your professional background
                  </p>
                  <Button onClick={addExperience}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Your First Experience
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {resumeData.experience.map((exp) => (
                  <Card key={exp.id}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-semibold">Work Experience</h3>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeExperience(exp.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <Label>Company</Label>
                          <Input
                            value={exp.company}
                            onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                            placeholder="Company name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Position</Label>
                          <Input
                            value={exp.position}
                            onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                            placeholder="Job title"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <Label>Start Date</Label>
                          <Input
                            type="month"
                            value={exp.startDate}
                            onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>End Date</Label>
                          <Input
                            type="month"
                            value={exp.endDate}
                            onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                            disabled={exp.current}
                          />
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 mb-4">
                        <Checkbox
                          id={`current-${exp.id}`}
                          checked={exp.current}
                          onCheckedChange={(checked) => updateExperience(exp.id, 'current', checked)}
                        />
                        <Label htmlFor={`current-${exp.id}`}>I currently work here</Label>
                      </div>

                      <div className="space-y-2">
                        <Label>Job Description</Label>
                        <Textarea
                          rows={4}
                          value={exp.description}
                          onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                          placeholder="Describe your responsibilities, achievements, and key contributions..."
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Education Tab */}
          <TabsContent value="education" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Education</h2>
              <Button onClick={addEducation}>
                <Plus className="mr-2 h-4 w-4" />
                Add Education
              </Button>
            </div>

            {resumeData.education.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <GraduationCap className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No education added</h3>
                  <p className="text-gray-600 text-center mb-4">
                    Add your educational background to strengthen your resume
                  </p>
                  <Button onClick={addEducation}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Your First Education
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {resumeData.education.map((edu) => (
                  <Card key={edu.id}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-semibold">Education</h3>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeEducation(edu.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <Label>Institution</Label>
                          <Input
                            value={edu.institution}
                            onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                            placeholder="University or school name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Degree</Label>
                          <Input
                            value={edu.degree}
                            onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                            placeholder="Bachelor's, Master's, etc."
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <Label>Field of Study</Label>
                          <Input
                            value={edu.field}
                            onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                            placeholder="Major or field of study"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>GPA (Optional)</Label>
                          <Input
                            value={edu.gpa || ''}
                            onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                            placeholder="3.8/4.0"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Start Date</Label>
                          <Input
                            type="month"
                            value={edu.startDate}
                            onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>End Date</Label>
                          <Input
                            type="month"
                            value={edu.endDate}
                            onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Skills</h2>
              <Button onClick={addSkill}>
                <Plus className="mr-2 h-4 w-4" />
                Add Skill
              </Button>
            </div>

            {resumeData.skills.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Code className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No skills added</h3>
                  <p className="text-gray-600 text-center mb-4">
                    Add your technical and professional skills
                  </p>
                  <Button onClick={addSkill}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Your First Skill
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {resumeData.skills.map((skill) => (
                  <Card key={skill.id}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-semibold">Skill</h3>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeSkill(skill.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Skill Name</Label>
                          <Input
                            value={skill.name}
                            onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                            placeholder="e.g., JavaScript, Project Management"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Proficiency Level</Label>
                          <Select
                            value={skill.level}
                            onValueChange={(value) => updateSkill(skill.id, 'level', value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Beginner">Beginner</SelectItem>
                              <SelectItem value="Intermediate">Intermediate</SelectItem>
                              <SelectItem value="Advanced">Advanced</SelectItem>
                              <SelectItem value="Expert">Expert</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <Badge variant="secondary" className="w-fit">
                          {skill.level}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}