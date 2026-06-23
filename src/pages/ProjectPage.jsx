import { Link, useParams } from "react-router-dom";
import { projects } from "../data/projects";
import "./ProjectPage.css";

export default function ProjectPage() {
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
    <div className="project-page">
      <Link className="project-back" to="/">
        ← Назад к проектам
      </Link>

      <header className="project-header">
        <h1 className="project-title">
          {project.title}
        </h1>

        <p className="project-description">
          {project.description}
        </p>
      </header>

      <div className="project-gallery">
        {project.images?.map((image, index) => (
          <div
            key={image}
            className={`project-image ${
              index === 0 ? "hero-image" : ""
            }`}
          >
            <img
              src={image}
              alt={project.title}
            />
          </div>
        ))}
      </div>

      <section className="project-software">
        <h2>Используемый софт</h2>

        <div className="project-tools">
          {project.software?.map((tool) => (
            <span
              key={tool}
              className="project-tool"
            >
              {tool}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}