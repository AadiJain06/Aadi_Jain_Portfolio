import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, Mail, Phone, ChevronDown, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/Navbar';
import SkillItem from '@/components/SkillItem';
import SkillBar from '@/components/SkillBar';
import ProjectCard from '@/components/ProjectCard';
import ExperienceCard from '@/components/ExperienceCard';
import EducationCard from '@/components/EducationCard';
import ContactForm from '@/components/ContactForm';
import AnimatedBackground from '@/components/AnimatedBackground';
import SkillsCube from '@/components/SkillsCube';
import SectionHeading from '@/components/SectionHeading';

const Index = () => {
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Parallax effect
  const { scrollYProgress } = useScroll();
  const heroImageY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  
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

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Scroll to next section
  const scrollToNextSection = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Define core technical skills for the 3D cube
  const coreSkills = ["Python", "Machine Learning", "Computer Vision", "React", "Data Structures", "APIs"];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section 
        id="hero" 
        ref={heroRef}
        className="relative min-h-screen flex items-center pt-16 overflow-hidden"
      >
        <AnimatedBackground />
        
        <div className="section-container relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
            <div className="flex-1 text-center md:text-left">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold font-heading mb-6"
              >
                <span>Aadi </span>
                <span className="text-gradient">Jain</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl md:text-2xl text-muted-foreground mb-8"
              >
                <span className="typewriter">Computer Science Engineer & ML Enthusiast</span>
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap justify-center md:justify-start gap-4"
              >
                <Button 
                  size="lg"
                  className="animated-border"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Contact Me
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="/Aadi_Jain.pdf" download rel="noopener noreferrer" className="group">
                    Download Resume
                    <Download size={16} className="ml-2 group-hover:translate-y-1 transition-transform" />
                  </a>
                </Button>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="flex justify-center md:justify-start mt-8 space-x-6"
              >
                <a href="https://github.com/AadiJain06" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary hover:scale-110 transition-all">
                  <Github size={24} />
                </a>
                <a href="https://linkedin.com/in/aadi-jain-96059724b" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary hover:scale-110 transition-all">
                  <Linkedin size={24} />
                </a>
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=aadijainadj@gmail.com" className="text-muted-foreground hover:text-primary hover:scale-110 transition-all">
                  <Mail size={24} />
                </a>
                <a href="tel:+91 77469 10931" className="text-muted-foreground hover:text-primary hover:scale-110 transition-all">
                  <Phone size={24} />
                </a>
              </motion.div>
            </div>
            
            <motion.div 
              className="flex-1 max-w-md relative"
              style={{ y: heroImageY }}
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="rounded-full p-1 glass-card animate-float"
              >
                <div className="w-full aspect-square rounded-full bg-gradient-to-br from-primary/30 to-primary/5 flex items-center justify-center overflow-hidden">
                  <img 
                    src="/Profile.jpg" 
                    alt="Aadi Jain" 
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </motion.div>
              
              {/* Decorative elements */}
              <div className="absolute -top-8 -right-8 w-16 h-16 bg-primary/20 rounded-full blur-xl" />
              <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-primary/20 rounded-full blur-xl" />
            </motion.div>
          </div>
          
          {/* Scroll indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          >
            <span className="text-sm text-muted-foreground mb-2">Scroll to discover</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ChevronDown className="text-primary" size={24} onClick={scrollToNextSection} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-32 bg-gradient-to-b from-background to-secondary/20">
        <div className="section-container">
          <SectionHeading>About Me</SectionHeading>
          
          <div className="max-w-3xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6 text-center"
            >
              <p className="text-lg">
                I am a <span className="font-semibold text-primary">Computer Science Engineer</span> with a passion for building innovative solutions using machine learning and computer vision. Currently pursuing B.Tech in Computer Science at VIT University, I specialize in developing applications that leverage cutting-edge technologies for real-world problems.
              </p>
              
              <p className="text-lg">
                With expertise in <span className="font-semibold">Python, Machine Learning, Computer Vision,</span> and <span className="font-semibold">Web Development</span>, I have worked on projects ranging from dementia detection using CNN models to real-time recognition systems and mobile applications for agricultural improvements.
              </p>
              
              <p className="text-lg">
                I'm enthusiastic about collaborative environments where I can contribute my <span className="font-semibold">technical skills</span> and <span className="font-semibold">creative problem-solving</span> approach to develop solutions that make a difference.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 md:py-32">
        <div className="section-container">
          <SectionHeading>Technical Skills</SectionHeading>
          
          {/* 3D Skills Cube */}
          <SkillsCube skills={coreSkills} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto mt-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold mb-6 font-heading text-foreground">Programming Languages</h3>
              <div className="space-y-3">
                <SkillBar name="Python" />
                <SkillBar name="HTML/CSS/JavaScript" />
                <SkillBar name="ReactJS" />
                <SkillBar name="MySQL" />
                <SkillBar name="C/C++" />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold mb-6 font-heading text-foreground">Technologies & Tools</h3>
              <div className="space-y-3">
                <SkillBar name="Machine Learning" />
                <SkillBar name="Computer Vision" />
                <SkillBar name="Data Structures" />
                <SkillBar name="Power BI" />
                <SkillBar name="REST APIs" />
              </div>
            </motion.div>
          </div>
          
          <div className="mt-20 max-w-4xl mx-auto">
            <h3 className="text-xl font-bold mb-8 text-center font-heading text-foreground">Certifications</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[
                "Matlab Onramp",
                "Guvi Geek (IIT Madras)",
                "Python Essentials",
                "Cloud Computing (IIT Kharagpur)",
                "Data Analytics (Accenture)",
                "Postman API",
              ].map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  className="group"
                >
                  <Card className="p-6 text-center glass-card h-full flex items-center justify-center relative overflow-hidden hover:border-primary/50 transition-all duration-300">
                    <div className="z-10 relative">
                      <p className="font-medium text-card-foreground group-hover:text-primary transition-colors">{cert}</p>
                    </div>
                    <div className="absolute -inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-300"></div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Projects Section */}
      <section id="projects" className="py-20 md:py-32 bg-gradient-to-b from-secondary/20 to-background relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute top-1/3 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        </div>
        
        <div className="section-container relative z-10">
          <SectionHeading>Projects</SectionHeading>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="hover-lift"
            >
              <ProjectCard 
                title="Dementia Prediction" 
                date="Nov 23-Dec 23" 
                description={[
                  "Engineered a CNN-based model for early dementia detection using 1,000 MRI scans, improving baseline model accuracy by 18% through advanced preprocessing and data augmentation.",
                  "Optimized training via Bayesian hyperparameter tuning and dropout regularization, reducing validation error by 12% and boosting generalization.",
                  "Integrated SHAP for model interpretability, increasing clinical trust and usability by presenting explainable insights for 100% predictions."
                ]} 
                technologies={["CNN", "Python", "TensorFlow", "Data Augmentation", "SHAP"]}
              />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hover-lift"
            >
              <ProjectCard 
                title="FaceRecogPro" 
                date="Feb 24-May 24" 
                description={[
                  "Streamlined real-time recognition pipeline, achieving a consistent 20-30 FPS on low-powered Raspberry Pi installations, reducing latency by 40%.",
                  "Developed a Flask backend with SQLite backend, automating attendance logging and report generation, cutting manual effort time by 90%."
                ]} 
                technologies={["OpenCV", "Flask", "SQLite", "Raspberry Pi", "Face Recognition"]}
              />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="hover-lift"
            >
              <ProjectCard 
                title="KrishiAI" 
                date="June 24-May 25" 
                description={[
                  "Developed real-time database using Streamlit and simulated IoT inputs, enabling continuous monitoring of crop environments for key parameters.",
                  "Trained a crop yield forecasting model (MAE 0.3) tested on 3 major crops, and improved simulated yield predictions by 15%.",
                  "Delivered a localized, mobile-friendly UI, helping improve user decision-making accuracy in agricultural simulations by 22-25% through visual insights."
                ]} 
                technologies={["AI/ML", "Streamlit", "IoT", "Data Visualization", "Mobile UI"]}
              />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="hover-lift md:col-span-2"
            >
              <ProjectCard 
                title="BeyondEVENTS" 
                date="Jan 23-Apr 23" 
                description={[
                  "Created a full-stack event management platform with dynamic registration flows, payment integration, and automated communications.",
                  "Implemented real-time analytics dashboard tracking attendance, engagement metrics, and feedback patterns across multiple event categories.",
                  "Designed a mobile-responsive interface with contextual navigation and accessibility features, boosting user satisfaction by 37%."
                ]} 
                technologies={["React", "Node.js", "MongoDB", "Payment APIs", "Real-time Analytics"]}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 md:py-32">
        <div className="section-container">
          <SectionHeading>Work Experience</SectionHeading>
          
          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <ExperienceCard 
                company="EncureIT Systems Pvt Ltd" 
                position="Computer Vision Intern" 
                date="Feb 24 - May 24"
                description={[
                  "Modernized anomaly detection using YOLOv5/v7, achieving a measured 45% improvement in precision and improving speed of image-based data inspection tasks, increasing throughput by 209 images per minute.",
                  "Implemented an advanced object detection pipeline using YOLOv2, improving anomaly detection by 45% and automating inspection tasks for image-based datasets."
                ]} 
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 md:py-32 bg-gradient-to-b from-background to-secondary/20 relative">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        </div>
        
        <div className="section-container relative z-10">
          <SectionHeading>Education</SectionHeading>
          
          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <EducationCard 
                degree="B. Tech (CSE)" 
                institution="VIT University" 
                date="June 2022 - Present" 
                score="8.75/10"
              />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <EducationCard 
                degree="Class XII" 
                institution="AP Public School, Farrukhabad" 
                date="May 2022" 
                score="88%"
              />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <EducationCard 
                degree="Class X" 
                institution="Little Angels High School, Gwalior" 
                date="May 2020" 
                score="93.2%"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Achievement Section */}
      <section id="achievements" className="py-20 md:py-32">
        <div className="section-container">
          <SectionHeading>Achievements</SectionHeading>
          
          <div className="max-w-4xl mx-auto space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-card border rounded-xl p-8 hover-lift animated-border"
            >
              <h3 className="text-xl font-bold mb-6 text-gradient">Competitions & Hackathons</h3>
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
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-card border rounded-xl p-8 hover-lift animated-border"
            >
              <h3 className="text-xl font-bold mb-6 text-gradient">Leadership & Responsibilities</h3>
              <ul className="list-disc list-inside space-y-4">
                <li className="text-muted-foreground">
                  Conceptualized and executed a student-led environmental conservation event, featuring tree bug and stone painting competitions, directly engaging 200+ students and fostering awareness of ecological responsibility.
                </li>
                <li className="text-muted-foreground">
                  As a Core Member of the Photography and Videography Club within AdVITya, led production of high-impact event videos, reaching diverse audience across platforms with 75% engagement rate.
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32 bg-gradient-to-b from-secondary/20 to-background relative">
        {/* Background decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        </div>
        
        <div className="section-container relative z-10">
          <SectionHeading>Contact Me</SectionHeading>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-xl font-bold mb-6 text-gradient">Get In Touch</h3>
              <p className="text-muted-foreground mb-8">
                Have a question or want to work together? Feel free to contact me using the form or through any of the channels below.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 group hover-lift">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Mail className="text-primary group-hover:scale-110 transition-transform" size={18} />
                  </div>
                  <a href="https://mail.google.com/mail/?view=cm&fs=1&to=aadijainadj@gmail.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                    aadijainadj@gmail.com
                  </a>
                </div>
                
                <div className="flex items-center gap-4 group hover-lift">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Phone className="text-primary group-hover:scale-110 transition-transform" size={18} />
                  </div>
                  <a href="tel:+91 7746910931" className="hover:text-primary transition-colors">
                    +91 77469 10931
                  </a>
                </div>
                
                <div className="flex items-center gap-4 group hover-lift">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Linkedin className="text-primary group-hover:scale-110 transition-transform" size={18} />
                  </div>
                  <a 
                    href="https://linkedin.com/in/aadi-jain-96059724b" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    linkedin.com/in/aadi-jain-96059724b
                  </a>
                </div>
                
                <div className="flex items-center gap-4 group hover-lift">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Github className="text-primary group-hover:scale-110 transition-transform" size={18} />
                  </div>
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
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-card p-6 rounded-xl"
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background py-8 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-muted-foreground"
            >
              © {new Date().getFullYear()} Aadi Jain. All rights reserved.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex space-x-4 mt-4 md:mt-0"
            >
              <a href="https://github.com/AadiJain06" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary hover:scale-110 transition-all">
                <Github size={20} />
              </a>
              <a href="https://linkedin.com/in/aadi-jain-96059724b" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary hover:scale-110 transition-all">
                <Linkedin size={20} />
              </a>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=aadijainadj@gmail.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary hover:scale-110 transition-all">
                <Mail size={20} />
              </a>
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
