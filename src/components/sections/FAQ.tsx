
import { useInView } from "react-intersection-observer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const faqs = [
    {
      question: "What services do you offer exactly?",
      answer:
        "I offer a comprehensive range of web development services including front-end and full-stack development, responsive design, UI/UX implementation, performance optimization, and integration with various APIs and content management systems. I specialize in creating beautiful, functional websites with smooth animations and interactions.",
    },
    {
      question: "How much does a project typically cost?",
      answer:
        "Project costs vary depending on complexity, features, and timeline requirements. I offer flexible pricing models including fixed-price quotes for well-defined projects and hourly rates for ongoing work. Each quote is customized based on your specific needs after a thorough consultation.",
    },
    {
      question: "Which technologies do you specialize in?",
      answer:
        "I specialize in modern web technologies including React, TypeScript, Next.js, and Tailwind CSS. I also have experience with backend technologies like Node.js, database systems, and various content management systems. My focus is always on using the right technology stack that best serves your project's unique requirements.",
    },
    {
      question: "Do you work internationally?",
      answer:
        "Yes, I work with clients globally and have experience collaborating remotely across different time zones. I ensure clear communication through regular video calls, project management tools, and timely updates regardless of geographic location.",
    },
    {
      question: "What is your typical project timeline?",
      answer:
        "Project timelines vary based on scope and complexity. Simple websites might take 2-4 weeks, while more complex applications can require 2-3 months or more. I always provide a detailed timeline during the proposal stage and keep you updated on progress throughout the project.",
    },
    {
      question: "What are your payment terms?",
      answer:
        "I typically work with a 50% upfront deposit to begin work, with the remaining balance due upon project completion. For larger projects, I can arrange milestone-based payments. I accept payments via bank transfer and various online payment methods.",
    },
  ];

  return (
    <section id="faq" className="section-spacing bg-gray-50">
      <div className="container-custom">
        <div className="text-center" ref={ref}>
          <h2
            className={`section-title gradient-text ${
              inView ? "opacity-100" : "opacity-0"
            }`}
            style={{ transition: "opacity 0.5s ease" }}
          >
            Frequently Asked Questions
          </h2>
          <p
            className={`section-subtitle ${
              inView ? "opacity-100" : "opacity-0"
            }`}
            style={{ transition: "opacity 0.5s ease 0.2s" }}
          >
            Find answers to common questions about my services
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className={`bg-white my-4 rounded-xl shadow-sm border border-gray-100 overflow-hidden ${
                  inView ? "opacity-100" : "opacity-0"
                }`}
                style={{ transition: `opacity 0.5s ease ${index * 100 + 300}ms` }}
              >
                <AccordionTrigger className="px-6 py-4 text-lg font-medium hover:no-underline data-[state=open]:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
