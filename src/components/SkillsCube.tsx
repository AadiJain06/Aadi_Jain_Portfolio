
import React, { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface SkillsCubeProps {
  skills: string[];
}

const defaultSkills = ["Python", "JavaScript", "React", "Machine Learning", "Computer Vision", "Data Science"];

const SkillsCube = ({ skills = defaultSkills }: SkillsCubeProps) => {
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rotateAnimation = async () => {
      while (true) {
        await controls.start({
          rotateX: 360,
          rotateY: 360,
          transition: { duration: 20, ease: 'linear', loop: Infinity },
        });
        controls.set({ rotateX: 0, rotateY: 0 });
      }
    };

    rotateAnimation();

    return () => {
      controls.stop();
    };
  }, [controls]);

  // Make sure we have a valid array to work with, even if skills is undefined
  const skillsToUse = skills?.length ? skills : defaultSkills;
  
  // Ensure we have exactly 6 skills to display on the cube
  const displaySkills = skillsToUse.slice(0, 6);
  
  // If we have less than 6 skills, fill with defaults
  const finalSkills = [...displaySkills];
  while (finalSkills.length < 6) {
    const remainingDefaults = defaultSkills.filter(skill => !finalSkills.includes(skill));
    if (remainingDefaults.length === 0) break;
    finalSkills.push(remainingDefaults[0]);
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-64 flex items-center justify-center perspective-500 my-12"
    >
      <motion.div
        animate={controls}
        className="relative w-48 h-48 transform-style-3d" // Increased size from w-32 h-32
      >
        {finalSkills.map((skill, index) => {
          const positions = [
            { rotateY: 0, translateZ: 80 }, // Front
            { rotateY: 180, translateZ: 80 }, // Back
            { rotateY: 90, translateZ: 80 }, // Right
            { rotateY: -90, translateZ: 80 }, // Left
            { rotateX: 90, translateZ: 80 }, // Top
            { rotateX: -90, translateZ: 80 }, // Bottom
          ];

          const { rotateX = 0, rotateY = 0, translateZ = 0 } = positions[index];

          return (
            <div
              key={skill}
              className="absolute w-full h-full flex items-center justify-center p-4 rounded-lg glass-card animated-border text-center font-medium text-foreground"
              style={{
                transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)`,
                backfaceVisibility: 'visible', // Changed to visible
              }}
            >
              {skill}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default SkillsCube;
