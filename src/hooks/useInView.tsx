
import { useState, useEffect, useRef, RefObject } from 'react';

interface InViewOptions {
  threshold?: number;
  triggerOnce?: boolean;
  rootMargin?: string;
}

export function useInView({
  threshold = 0.1,
  triggerOnce = false,
  rootMargin = '0px',
}: InViewOptions = {}): {
  ref: RefObject<HTMLElement>;
  inView: boolean;
} {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const enteredView = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (triggerOnce && enteredView.current && inView) return;
        
        const isInView = entry.isIntersecting;
        setInView(isInView);
        
        if (isInView) {
          enteredView.current = true;
          if (triggerOnce) {
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold, rootMargin }
    );

    const element = ref.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin, triggerOnce, inView]);

  return { ref, inView };
}
