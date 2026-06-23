import { Link, useParams } from "react-router-dom";
import { projects } from "../data/projects";
import "./ProjectPage.css";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProjectPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setSelectedImage(null);
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);
  const { id } = useParams();

  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="project-page">
        <h1>Проект не найден</h1>
      </div>
    );
  }

  return (
    <motion.div
      className="project-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <Link className="project-back" to="/">
        ← Назад к проектам
      </Link>

      <header className="project-header">
        <h1 className="project-title">{project.title}</h1>

        <p className="project-description">{project.description}</p>
      </header>

      <div className="project-gallery">
        {project.images?.map((image, index) => (
          <motion.div
            key={image}
            className={`project-image ${index === 0 ? "hero-image" : ""}`}
            initial={{
              opacity: 0,
              y: 80,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: false,
              amount: 0.15,
            }}
            transition={{
              duration: 0.8,
              delay: index * 0.08,
            }}
          >
            <img
              src={image}
              alt={project.title}
              onClick={() => setSelectedImage(image)}
            />
          </motion.div>
        ))}
      </div>

      <section className="project-software">
        <h2>Используемый софт</h2>

        <div className="project-tools">
          {project.software?.map((tool) => (
            <span key={tool} className="project-tool">
              {tool}
            </span>
          ))}
        </div>
      </section>
     <AnimatePresence>
  {selectedImage && (
    <motion.div
      className="lightbox"
      onClick={() => setSelectedImage(null)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <motion.img
        src={selectedImage}
        alt=""
        className="lightbox-image"
        onClick={() => setSelectedImage(null)}
        initial={{
          opacity: 0,
          scale: 0.9,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          scale: 0.9,
        }}
        transition={{
          duration: 0.3,
          ease: [0.22, 1, 0.36, 1],
        }}
      />
    </motion.div>
  )}
</AnimatePresence>
    </motion.div>
  );
}
