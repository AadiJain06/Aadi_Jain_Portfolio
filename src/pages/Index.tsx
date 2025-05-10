
import { useEffect } from 'react';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/Navbar';
import SkillBar from '@/components/SkillBar';
import ProjectCard from '@/components/ProjectCard';
import ExperienceCard from '@/components/ExperienceCard';
import EducationCard from '@/components/EducationCard';
import ContactForm from '@/components/ContactForm';

const Index = () => {
  // Initialize animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      el.classList.add('opacity-0');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section id="hero" className="pt-28 md:pt-36 pb-16 md:pb-24">
        <div className="section-container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-4">
                Aadi <span className="text-primary">Jain</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                Computer Science Engineer & ML Enthusiast
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <Button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                  Contact Me
                </Button>
                <Button variant="outline" asChild>
  <a href="/Aadi_Jain.pdf" download rel="noopener noreferrer">
    Download Resume
  </a>
</Button>
              </div>
              <div className="flex justify-center md:justify-start mt-8 space-x-4">
                <a href="https://github.com/AadiJain06" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <Github size={24} />
                </a>
                <a href="https://linkedin.com/in/aadi-jain-96059724b" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <Linkedin size={24} />
                </a>
<a href="mailto:aadijainadj@gmail.com" class="text-muted-foreground hover:text-primary transition-colors">
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
</a>
                </a>
                <a href="tel:+91 77469 10931" className="text-muted-foreground hover:text-primary transition-colors">
                  <Phone size={24} />
                </a>
              </div>
            </div>
            <div className="flex-1 max-w-md">
              <div className="aspect-square rounded-full bg-gradient-to-br from-primary/20 to-primary/40 p-1">
                <div className="w-full h-full rounded-full bg-card flex items-center justify-center overflow-hidden">
                  <img 
                    src="\Profile.jpg" 
                    alt="Aadi Jain" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24 bg-secondary/30">
        <div className="section-container">
          <h2 className="section-title animate-on-scroll">About Me</h2>
          <div className="max-w-3xl mx-auto text-center animate-on-scroll">
            <p className="text-lg mb-6">
              I am a Computer Science Engineer with a passion for building innovative solutions using machine learning and computer vision. Currently pursuing B.Tech in Computer Science at VIT University, I specialize in developing applications that leverage cutting-edge technologies for real-world problems.
            </p>
            <p className="text-lg mb-6">
              With expertise in Python, Machine Learning, Computer Vision, and Web Development, I have worked on projects ranging from dementia detection using CNN models to real-time recognition systems and mobile applications for agricultural improvements.
            </p>
            <p className="text-lg">
              I'm enthusiastic about collaborative environments where I can contribute my technical skills and creative problem-solving approach to develop solutions that make a difference.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 md:py-24">
        <div className="section-container">
          <h2 className="section-title animate-on-scroll">Technical Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="space-y-6 animate-on-scroll">
              <h3 className="text-xl font-bold mb-6">Programming Languages & Frameworks</h3>
              <SkillBar name="Python" percentage={90} />
              <SkillBar name="HTML/CSS/JavaScript" percentage={85} />
              <SkillBar name="ReactJS" percentage={80} />
              <SkillBar name="MySQL" percentage={85} />
              <SkillBar name="C/C++" percentage={75} />
            </div>
            <div className="space-y-6 animate-on-scroll">
              <h3 className="text-xl font-bold mb-6">Technologies & Tools</h3>
              <SkillBar name="Machine Learning" percentage={85} />
              <SkillBar name="Computer Vision" percentage={80} />
              <SkillBar name="Data Structures" percentage={90} />
              <SkillBar name="Power BI" percentage={75} />
              <SkillBar name="REST APIs" percentage={85} />
            </div>
          </div>
          
          <div className="mt-16 max-w-4xl mx-auto animate-on-scroll">
            <h3 className="text-xl font-bold mb-6 text-center">Certifications</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <Card className="p-4 text-center hover:shadow-md transition-all">
                <p className="font-medium">Matlab Onramp</p>
              </Card>
              <Card className="p-4 text-center hover:shadow-md transition-all">
                <p className="font-medium">Gayi Geek (IIT Madras)</p>
              </Card>
              <Card className="p-4 text-center hover:shadow-md transition-all">
                <p className="font-medium">Python Essentials</p>
              </Card>
              <Card className="p-4 text-center hover:shadow-md transition-all">
                <p className="font-medium">Cloud Computing (IIT Kharagpur)</p>
              </Card>
              <Card className="p-4 text-center hover:shadow-md transition-all">
                <p className="font-medium">Data Analytics (Accenture)</p>
              </Card>
              <Card className="p-4 text-center hover:shadow-md transition-all">
                <p className="font-medium">Postman API</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 md:py-24 bg-secondary/30">
        <div className="section-container">
          <h2 className="section-title animate-on-scroll">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="animate-on-scroll">
              <ProjectCard 
                title="Dementia Prediction" 
                date="Nov 23-Dec 23" 
                description={[
                  "Engineered a CNN-based model for early dementia detection using 1,000 MRI scans, improving baseline model accuracy by 18% through advanced preprocessing and data augmentation.",
                  "Optimized training via Bayesian hyperparameter tuning and dropout regularization, reducing validation error by 12% and boosting generalization.",
                  "Integrated SHAP for model interpretability, increasing clinical trust and usability by presenting explainable insights for 100% predictions."
                ]} 
              />
            </div>
            <div className="animate-on-scroll">
              <ProjectCard 
                title="FaceRecogPro" 
                date="Feb 24-May 24" 
                description={[
                  "Streamlined real-time recognition pipeline, achieving a consistent 20-30 FPS on low-powered Raspberry Pi installations, reducing latency by 40%.",
                  "Developed a Flask backend with SQLite backend, automating attendance logging and report generation, cutting manual effort time by 90%."
                ]} 
              />
            </div>
            <div className="animate-on-scroll">
              <ProjectCard 
                title="KrishiAI" 
                date="June 24-May 25" 
                description={[
                  "Developed real-time database using Streamlit and simulated IoT inputs, enabling continuous monitoring of crop environments for key parameters.",
                  "Trained a crop yield forecasting model (MAE 0.3) tested on 3 major crops, and improved simulated yield predictions by 15%.",
                  "Delivered a localized, mobile-friendly UI, helping improve user decision-making accuracy in agricultural simulations by 22-25% through visual insights."
                ]} 
              />
            </div>
            <div className="animate-on-scroll">
              <ProjectCard 
                title="Google Assistant Trivia Game" 
                date="Jan 20" 
                description={[
                  "Developed a voice-controlled AI quiz on Google's Actions platform, achieving a 90% user completion rate for the quizzes and identified key insights into user engagement with voice applications."
                ]} 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 md:py-24">
        <div className="section-container">
          <h2 className="section-title animate-on-scroll">Work Experience</h2>
          <div className="max-w-4xl mx-auto">
            <div className="animate-on-scroll">
              <ExperienceCard 
                company="EncureIT Systems Pvt Ltd" 
                position="Computer Vision Intern" 
                date="Feb 24 - May 24"
                description={[
                  "Modernized anomaly detection using YOLOv5/v7, achieving a measured 45% improvement in precision and improving speed of image-based data inspection tasks, increasing throughput by 209 images per minute.",
                  "Implemented an advanced object detection pipeline using YOLOv2, improving anomaly detection by 45% and automating inspection tasks for image-based datasets."
                ]} 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-16 md:py-24 bg-secondary/30">
        <div className="section-container">
          <h2 className="section-title animate-on-scroll">Education</h2>
          <div className="max-w-4xl mx-auto">
            <div className="animate-on-scroll">
              <EducationCard 
                degree="B. Tech (CSE)" 
                institution="VIT University" 
                date="June 2022 - Present" 
                score="8.75/10"
              />
            </div>
            <div className="animate-on-scroll">
              <EducationCard 
                degree="Class XII" 
                institution="AP Public School, Farrukhabad" 
                date="May 2022" 
                score="88%"
              />
            </div>
            <div className="animate-on-scroll">
              <EducationCard 
                degree="Class X" 
                institution="Little Angels High School, Gwalior" 
                date="May 2020" 
                score="93.2%"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Achievement Section */}
      <section id="achievements" className="py-16 md:py-24">
        <div className="section-container">
          <h2 className="section-title animate-on-scroll">Achievements</h2>
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-card border rounded-xl p-6 animate-on-scroll">
              <h3 className="text-xl font-bold mb-4">Competitions & Hackathons</h3>
              <ul className="list-disc list-inside space-y-4">
                <li className="text-muted-foreground">
                  <span className="text-foreground font-medium">Secured First Place:</span> Blockchain Android App Competition at IIT Delhi Tryst (Jan '19), developing a decentralized mobile solution for secure data management.
                </li>
                <li className="text-muted-foreground">
                  <span className="text-foreground font-medium">Selected participant:</span> IEEE MOVE-A-THON 2023, focusing on innovative mobility solutions using emerging technologies.
                </li>
                <li className="text-muted-foreground">
                  <span className="text-foreground font-medium">Competed:</span> IGDTUW UI/UX Hackathon (Apr '23), designing user-centric web solutions under time constraints.
                </li>
              </ul>
            </div>
            
            <div className="bg-card border rounded-xl p-6 animate-on-scroll">
              <h3 className="text-xl font-bold mb-4">Leadership & Responsibilities</h3>
              <ul className="list-disc list-inside space-y-4">
                <li className="text-muted-foreground">
                  Conceptualized and executed a student-led environmental conservation event, featuring tree bug and stone painting competitions, directly engaging 200+ students and fostering awareness of ecological responsibility.
                </li>
                <li className="text-muted-foreground">
                  As a Core Member of the Photography and Videography Club within AdVITya, led production of high-impact event videos, reaching diverse audience across platforms with 75% engagement rate.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 bg-secondary/30">
        <div className="section-container">
          <h2 className="section-title animate-on-scroll">Contact Me</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="animate-on-scroll">
              <h3 className="text-xl font-bold mb-6">Get In Touch</h3>
              <p className="text-muted-foreground mb-8">
                Have a question or want to work together? Feel free to contact me using the form or through any of the channels below.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="text-primary" size={20} />
                  <a href="mailto:aadijainadj@gmail.com" className="hover:text-primary transition-colors">
                    aadijainadj@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="text-primary" size={20} />
                  <a href="tel:+91 7746910931" className="hover:text-primary transition-colors">
                    +91 77469 10931
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Linkedin className="text-primary" size={20} />
                  <a 
                    href="https://linkedin.com/in/aadi-jain-96059724b" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    linkedin.com/in/aadi-jain-96059724b
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Github className="text-primary" size={20} />
                  <a 
                    href="https://github.com/AadiJain06" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    github.com/AadiJain06
                  </a>
                </div>
              </div>
            </div>
            
            <div className="animate-on-scroll">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background py-8 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground">
              &copy; {new Date().getFullYear()} Aadi Jain. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="https://github.com/AadiJain06" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Github size={20} />
              </a>
              <a href="https://linkedin.com/in/aadi-jain-96059724b" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="mailto:aadijainadj@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
