
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
  const sectionRef = useRef<HTMLElement | null>(null);
  const isScrolling = useRef(false);

  // Set up refs array
  useEffect(() => {
    stepRefs.current = Array(totalSteps).fill(null);
  }, [totalSteps]);

  useEffect(() => {
    let scrollTimeout: number;
    let sectionTop = 0;
    let sectionHeight = 0;
    
    const calculateSectionDimensions = () => {
      if (!sectionRef.current) {
        sectionRef.current = document.getElementById(sectionId);
        if (!sectionRef.current) return false;
      }
      
      const rect = sectionRef.current.getBoundingClientRect();
      sectionTop = window.scrollY + rect.top - startOffset;
      sectionHeight = rect.height + startOffset + 200; // Add extra space for completion
      return true;
    };
    
    const handleScroll = () => {
      // Get section dimensions if not already calculated
      if (!calculateSectionDimensions()) return;
      
      const scrollY = window.scrollY;
      const scrollDirection = scrollY > previousScrollY.current ? 'down' : 'up';
      previousScrollY.current = scrollY;
      
      // Check if we're in the section's range
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        // Calculate which step should be active based on scroll position
        const scrollProgress = scrollY - sectionTop;
        const segmentHeight = stepHeight / totalSteps;
        const rawStepProgress = scrollProgress / segmentHeight;
        const stepProgress = Math.min(Math.floor(rawStepProgress), totalSteps - 1);
        
        if (stepProgress !== activeStep) {
          // Only change step if we're not already animating
          if (!isScrolling.current) {
            setActiveStep(stepProgress);
            setIsJacking(true);
            isScrolling.current = true;
            
            // Calculate the target scroll position for the current step
            const targetScrollPosition = sectionTop + (stepProgress * segmentHeight);
            
            // Smoothly scroll to the target position
            window.scrollTo({
              top: targetScrollPosition,
              behavior: 'smooth'
            });
            
            // Release scroll jacking after animation completes
            clearTimeout(scrollTimeout);
            scrollTimeout = window.setTimeout(() => {
              setIsJacking(false);
              isScrolling.current = false;
            }, 600);
          }
        }
      } else if (scrollY < sectionTop && activeStep !== 0) {
        // Reset when scrolling above the section
        setActiveStep(0);
      } else if (scrollY >= sectionTop + sectionHeight && activeStep < totalSteps - 1) {
        // Make sure all steps are visible when scrolling past the section
        setActiveStep(totalSteps - 1);
      }
    };
    
    // Calculate dimensions initially
    calculateSectionDimensions();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', calculateSectionDimensions);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', calculateSectionDimensions);
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
    },
    sectionRef
  };
}
