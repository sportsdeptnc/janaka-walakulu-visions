
import { useEffect, useState, useRef } from 'react';

interface UseScrollJackingOptions {
  totalSteps: number;
  sectionId: string;
  startOffset?: number;
  stepHeight?: number;
}

export function useScrollJacking({
  totalSteps,
  sectionId,
  startOffset = 200,
  stepHeight = 500,
}: UseScrollJackingOptions) {
  const [activeStep, setActiveStep] = useState(0);
  const [isJacking, setIsJacking] = useState(false);
  const previousScrollY = useRef(0);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Set up refs array
  useEffect(() => {
    stepRefs.current = Array(totalSteps).fill(null);
  }, [totalSteps]);

  useEffect(() => {
    let scrollTimeout: number;
    let sectionElement: HTMLElement | null = null;
    let sectionTop = 0;
    let sectionHeight = 0;
    
    const handleScroll = () => {
      if (!sectionElement) {
        sectionElement = document.getElementById(sectionId);
        if (!sectionElement) return;
        
        const rect = sectionElement.getBoundingClientRect();
        sectionTop = window.scrollY + rect.top - startOffset;
        sectionHeight = rect.height + startOffset + 200; // Add extra space for completion
      }
      
      const scrollY = window.scrollY;
      const scrollDirection = scrollY > previousScrollY.current ? 'down' : 'up';
      previousScrollY.current = scrollY;
      
      // Check if we're in the section's range
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        // Calculate which step should be active based on scroll position
        const scrollProgress = scrollY - sectionTop;
        const stepProgress = Math.min(Math.floor(scrollProgress / (stepHeight / totalSteps)), totalSteps - 1);
        
        if (stepProgress !== activeStep) {
          setActiveStep(stepProgress);
          
          // Apply scroll jacking when changing steps
          if (stepProgress < totalSteps) {
            setIsJacking(true);
            clearTimeout(scrollTimeout);
            
            // Calculate the target scroll position for the current step
            const targetScrollPosition = sectionTop + (stepProgress * (stepHeight / totalSteps));
            
            // Smoothly scroll to the target position
            window.scrollTo({
              top: targetScrollPosition,
              behavior: 'smooth'
            });
            
            // Release scroll jacking after animation completes
            scrollTimeout = window.setTimeout(() => {
              setIsJacking(false);
            }, 800);
          } else {
            setIsJacking(false);
          }
        }
      } else if (scrollY < sectionTop && activeStep !== 0) {
        // Reset when scrolling above the section
        setActiveStep(0);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [activeStep, sectionId, totalSteps, startOffset, stepHeight]);
  
  // Prevent default scroll when jacking is active
  useEffect(() => {
    const preventScroll = (e: WheelEvent) => {
      if (isJacking) {
        e.preventDefault();
      }
    };
    
    window.addEventListener('wheel', preventScroll, { passive: false });
    return () => {
      window.removeEventListener('wheel', preventScroll);
    };
  }, [isJacking]);
  
  return {
    activeStep,
    isJacking,
    stepRefs: stepRefs.current,
    setStepRef: (index: number) => (node: HTMLDivElement | null) => {
      stepRefs.current[index] = node;
    }
  };
}
