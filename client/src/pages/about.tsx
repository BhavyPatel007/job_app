import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function About() {
  const stats = {
    jobsPosted: "5,000+",
    companiesServed: "500+",
    candidatesPlaced: "15,000+"
  };

  const missionPoints = [
    {
      title: "Quality First",
      description: "We carefully vet all job postings and companies to ensure legitimate opportunities."
    },
    {
      title: "Personal Support", 
      description: "Our team provides personalized guidance throughout your job search journey."
    },
    {
      title: "Industry Expertise",
      description: "Deep knowledge across multiple industries and career levels."
    },
    {
      title: "Innovation Focus",
      description: "Leveraging cutting-edge technology to match talent with opportunities."
    },
    {
      title: "Success Driven",
      description: "Committed to delivering measurable results for both candidates and employers."
    },
    {
      title: "Ethical Standards",
      description: "Operating with transparency, integrity, and respect for all stakeholders."
    }
  ];

  return (
    <div className="min-h-screen pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-about-hero-title">
              About DataMind Jobs
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto" data-testid="text-about-hero-subtitle">
              Connecting talent with opportunity since our founding. We're dedicated to transforming careers and building exceptional teams.
            </p>
          </div>
        </div>
      </section>

      {/* Main About Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6" data-testid="text-about-main-title">
                Your Trusted Career Partner
              </h2>
              <p className="text-lg text-gray-600 mb-6" data-testid="text-about-description">
                DataMind Jobs is your trusted partner in professional career development. We connect talented individuals with leading companies, creating opportunities that transform careers and businesses alike.
              </p>
              <p className="text-gray-600 mb-6" data-testid="text-about-mission">
                Since our founding, we've helped thousands of professionals find their ideal roles while assisting companies in building exceptional teams. Our platform combines cutting-edge technology with personalized service to deliver results that matter.
              </p>
              <p className="text-gray-600 mb-8" data-testid="text-about-vision">
                We believe that the right opportunity can change everything. That's why we're committed to creating meaningful connections between exceptional talent and forward-thinking organizations.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8" data-testid="about-stats">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary" data-testid="stat-jobs-posted">
                    {stats.jobsPosted}
                  </div>
                  <div className="text-sm text-neutral">Jobs Posted</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary" data-testid="stat-companies-served">
                    {stats.companiesServed}
                  </div>
                  <div className="text-sm text-neutral">Companies</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary" data-testid="stat-candidates-placed">
                    {stats.candidatesPlaced}
                  </div>
                  <div className="text-sm text-neutral">Candidates Hired</div>
                </div>
              </div>
            </div>
            
            <div>
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Professional team meeting and collaboration" 
                className="rounded-lg shadow-lg w-full h-auto"
                data-testid="img-about-team"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Points */}
      <section className="py-16 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4" data-testid="text-mission-title">
              Our Core Values
            </h2>
            <p className="text-xl text-neutral" data-testid="text-mission-subtitle">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="mission-points">
            {missionPoints.map((point, index) => (
              <Card key={index} className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <CheckCircle className="text-accent w-6 h-6 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2" data-testid={`mission-title-${index}`}>
                        {point.title}
                      </h4>
                      <p className="text-gray-600 text-sm" data-testid={`mission-description-${index}`}>
                        {point.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Image Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4" data-testid="text-team-title">
              Our Professional Environment
            </h2>
            <p className="text-xl text-neutral" data-testid="text-team-subtitle">
              Where innovation meets expertise
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <img 
              src="https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Professional office workplace environment" 
              className="rounded-lg shadow-lg w-full h-auto"
              data-testid="img-office-environment"
            />
            <img 
              src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Professional job interview and career consultation" 
              className="rounded-lg shadow-lg w-full h-auto"
              data-testid="img-career-consultation"
            />
          </div>
        </div>
      </section>

      {/* AdSense Placeholder */}
      <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 mx-4 sm:mx-6 lg:mx-8 mb-8 text-center text-gray-500">
        <div className="h-20 flex items-center justify-center text-sm" data-testid="ad-space-about">
          Advertisement Space
        </div>
      </div>
    </div>
  );
}
