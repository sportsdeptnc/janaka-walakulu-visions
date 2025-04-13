
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
  const animationFrameRef = useRef<number | null>(null);

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

    // Throttled scroll handler using requestAnimationFrame
    const handleScroll = () => {
      if (animationFrameRef.current) {
        return;
      }

      animationFrameRef.current = requestAnimationFrame(() => {
        // Get section dimensions if not already calculated
        if (!calculateSectionDimensions()) {
          animationFrameRef.current = null;
          return;
        }
        
        const scrollY = window.scrollY;
        const scrollDirection = scrollY > previousScrollY.current ? 'down' : 'up';
        previousScrollY.current = scrollY;
        
        // Check if we're in the section's range
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          // Calculate which step should be active based on scroll position
          const scrollProgress = scrollY - sectionTop;
          const segmentHeight = stepHeight / totalSteps;
          let stepProgress = Math.min(Math.floor(scrollProgress / segmentHeight), totalSteps - 1);
          
          // Ensure stepProgress is valid
          stepProgress = Math.max(0, Math.min(stepProgress, totalSteps - 1));
          
          if (stepProgress !== activeStep) {
            // Only change step if we're not already animating
            if (!isScrolling.current) {
              console.log(`Changing step from ${activeStep} to ${stepProgress}`);
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
              }, 700); // Increased duration to ensure animation completes
            }
          }
        } else if (scrollY < sectionTop && activeStep !== 0) {
          // Reset when scrolling above the section
          setActiveStep(0);
        } else if (scrollY >= sectionTop + sectionHeight && activeStep < totalSteps - 1) {
          // Make sure all steps are visible when scrolling past the section
          setActiveStep(totalSteps - 1);
        }
        
        animationFrameRef.current = null;
      });
    };
    
    // Calculate dimensions initially and force a first calculation
    setTimeout(() => {
      calculateSectionDimensions();
      handleScroll();
    }, 300);
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', calculateSectionDimensions);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', calculateSectionDimensions);
      clearTimeout(scrollTimeout);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [activeStep, sectionId, totalSteps, startOffset, stepHeight]);
  
  // Prevent default scroll when jacking is active
  useEffect(() => {
    const preventScroll = (e: WheelEvent) => {
      if (isJacking) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
      return true;
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
