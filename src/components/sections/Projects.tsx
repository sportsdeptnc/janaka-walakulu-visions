import { useState } from "react";
import { useInView } from "@/hooks/useInView";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";

interface ProjectCardProps {
  image: string;
  title: string;
  category: string;
  index: number;
}

const ProjectCard = ({ image, title, category, index }: ProjectCardProps) => {
  const { ref, inView } = useInView<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden rounded-2xl card-hover ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transition: `all 0.5s ease ${index * 100}ms` }}
    >
      <div className="aspect-[16/9] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
        <span className="text-primary-foreground text-sm font-medium">
          {category}
        </span>
        <h3 className="text-white text-xl font-bold mt-1">{title}</h3>
        <Link
          to={`/project/${index}`}
          className="mt-3 inline-flex items-center text-white font-medium"
        >
          View Project <ArrowRight size={16} className="ml-1" />
        </Link>
      </div>
    </div>
  );
};

const Projects = () => {
  const { ref, inView } = useInView<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [filter, setFilter] = useState("all");

  const projects = [
    {
      image: "/lovable-uploads/09f4d743-d3c6-4e51-b7ec-686748d11ffc.png",
      title: "E-commerce Platform",
      category: "Web Development",
    },
    {
      image: "/lovable-uploads/b5f0a097-4250-401f-b4a9-108272526121.png",
      title: "Agency Portfolio",
      category: "UI/UX Design",
    },
    {
      image: "/lovable-uploads/ffee2ae6-bda4-4c66-98dd-d63f0bf27837.png",
      title: "Analytics Dashboard",
      category: "Web Development",
    },
    {
      image: "/lovable-uploads/ad44da81-b985-49d4-89f7-8575aa22d09f.png",
      title: "Mobile App Interface",
      category: "UI/UX Design",
    },
    {
      image: "/lovable-uploads/4eca8c34-1ee7-4150-ae59-cf112ce7584e.png",
      title: "Booking Platform",
      category: "Web Development",
    },
    {
      image: "/lovable-uploads/e4d39ec5-47a1-4f86-8914-ffa74e5f1160.png",
      title: "Media Streaming Service",
      category: "UI/UX Design",
    },
  ];

  const categories = [
    "all",
    "Web Development",
    "UI/UX Design"
  ];

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);

  return (
    <section id="projects" className="section-spacing bg-gray-50">
      <div className="container-custom">
        <div className="text-center" ref={ref}>
          <h2
            className={`section-title gradient-text ${
              inView ? "opacity-100" : "opacity-0"
            }`}
            style={{ transition: "opacity 0.5s ease" }}
          >
            Featured Projects
          </h2>
          <p
            className={`section-subtitle ${
              inView ? "opacity-100" : "opacity-0"
            }`}
            style={{ transition: "opacity 0.5s ease 0.2s" }}
          >
            A showcase of my recent work and achievements
          </p>
        </div>

        <div className="flex justify-center mb-10 overflow-x-auto pb-2">
          <div className="flex gap-2 md:gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-full capitalize whitespace-nowrap transition-colors ${
                  filter === category
                    ? "gradient-bg text-white"
                    : "bg-white border border-gray-200 text-gray-700 hover:border-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <ProjectCard
                key={index}
                image={project.image}
                title={project.title}
                category={project.category}
                index={index}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">No projects found with this filter.</p>
            </div>
          )}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/projects"
            className="inline-flex items-center text-primary font-medium hover:underline text-lg"
          >
            View All Projects <ExternalLink size={18} className="ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Projects;
