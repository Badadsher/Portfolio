import React, { useMemo, useState } from "react";
import HeroScene from "./components/HeroScene.jsx";
import Polya from "../assets/about/avatar.jpg"
const projects = [
  {
    id: "quiet-residence",
    category: "residential",
    label: "Жилая визуализация",
    title: "Quiet Residence",
    description: "Теплый минимализм, натуральный камень, мягкие дневные сценарии.",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85",
    alt: "Светлая гостиная с камином и мягкой мебелью",
  },
  {
    id: "marble-suite",
    category: "commercial",
    label: "Бутик-апартаменты",
    title: "Marble Suite",
    description: "Контрастный рендер для презентации инвесторам и каталога продаж.",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85",
    alt: "Современный интерьер кухни и обеденной зоны",
  },
  {
    id: "soft-horizon",
    category: "residential",
    label: "Спальня",
    title: "Soft Horizon",
    description: "Сцена для согласования мебели, текстиля и вечернего освещения.",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=85",
    alt: "Спокойная современная спальня в бежевых оттенках",
  },
  {
    id: "atelier-lounge",
    category: "commercial",
    label: "HoReCa",
    title: "Atelier Lounge",
    description: "Камерное пространство с акцентом на материал, свет и посадку гостей.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
    alt: "Премиальный интерьер с панорамными окнами",
  },
];

const filters = [
  { id: "all", label: "Все" },
  { id: "residential", label: "Жилые" },
  { id: "commercial", label: "Коммерция" },
];

const stats = [
  { value: "42+", label: "визуализации" },
  { value: "9", label: "стилей интерьера" },
  { value: "4K", label: "финальный рендер" },
];

const expertise = [
  ["Сильные стороны", "Композиция, свет, материалы, фотореализм"],
  ["Форматы", "Рендеры, close-up, mood shots, визуализации для продаж"],
  ["Софт", "3ds Max, Corona Renderer, V-Ray, Archicad, Revit, SketchUp, AutoCAD, Lumen, Photoshop"],
];

const processSteps = [
  ["01", "Бриф и материалы", "Собираю планировку, референсы, ведомость отделки, мебель и нужное настроение."],
  ["02", "Сцена и свет", "Собираю геометрию, настраиваю камеры, дневные и вечерние сценарии."],
  ["03", "Материалы", "Довожу ткани, камень, дерево, металл и фактуры до тактильного ощущения."],
  ["04", "Финальный рендер", "Готовлю цвет, постобработку, 4K-изображения и файлы для презентации."],
];

function App() {
  const [activeFilter, setActiveFilter] = useState("all");

  const visibleProjects = useMemo(() => {
    if (activeFilter === "all") {
      return projects;
    }

    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  return (
    <>
      <div className="grain" aria-hidden="true" />

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Polina Studio">
          <span>Полина</span>
          <span>3D Визуализатор</span>
        </a>
        <nav className="nav" aria-label="Основная навигация">
          <a href="#projects">Проекты</a>
          <a href="#about">Обо мне</a>
          <a href="#process">Процесс</a>
          <a href="#contact">Контакты</a>
        </nav>
        <a className="header-cta" href="#contact">
          Обсудить проект
        </a>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          {/* <HeroScene /> */}
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="eyebrow">3D Визуализатор интерьера</p>
            <h1 id="hero-title">Я создаю интерьерные визуализации, которые передают атмосферу еще до ремонта.</h1>
            <p className="hero-copy">
              Меня зовут Полина. Я делаю фотореалистичные 3D-рендеры для дизайнеров,
              студий и частных клиентов, чтобы будущий интерьер можно было почувствовать
              до первой стройки.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#projects">
                Смотреть портфолио
              </a>
              <a className="button secondary" href="#about">
                Обо мне
              </a>
            </div>
          </div>
          <div className="hero-stats" aria-label="Ключевые показатели">
            {stats.map((item) => (
              <div key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </section>


        <section id="projects" className="section projects-section" aria-labelledby="projects-title">
          <div className="section-heading">
            <div>
              <p className="section-kicker">Примеры работ</p>
              <h2 id="projects-title">Портфолио проектов</h2>
            </div>
            <div className="filter-bar" aria-label="Фильтр проектов">
              {filters.map((filter) => (
                <button
                  className={`filter ${activeFilter === filter.id ? "is-active" : ""}`}
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveFilter(filter.id)}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          <div className="projects-grid">
            {visibleProjects.map((project) => (
              <article className="project-card reveal is-visible" data-category={project.category} key={project.id}>
                <img src={project.image} alt={project.alt} />
                <div className="project-meta">
                  <span>{project.label}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
  
        <section id="about" className="about section" aria-labelledby="about-title">
          <div className="portrait-panel reveal is-visible">
            <img
              src={Polya}
              alt="Фрагмент интерьерного мудборда с материалами и тканями"
            />
          </div>
          <div className="about-copy reveal is-visible">
            <h2 id="about-title">Превращаю идеи в интерьерные визуализации.</h2>
            <p>
              Я работаю с интерьерными дизайнерами, архитектурными бюро и частными заказчиками.
              Для меня важна не просто красивая картинка, а решение: показать масштаб,
              подчеркнуть материалы, проверить световые сценарии и сделать презентацию
              проекта по-настоящему дорогой.
            </p>
            <dl className="expertise-list">
              {expertise.map(([term, description]) => (
                <div key={term}>
                  <dt>{term}</dt>
                  <dd>{description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="process" className="process section" aria-labelledby="process-title">
          <div className="section-heading">
            <div>
              <p className="section-kicker">О рабочем процессе</p>
              <h2 id="process-title">Мой процесс без хаоса</h2>
            </div>
            <p className="section-note">
              Я веду проект по понятным этапам, чтобы быстрее согласовать результат и сохранить
              премиальный уровень деталей.
            </p>
          </div>
          <div className="process-steps">
            {processSteps.map(([number, title, description]) => (
              <article className="step reveal is-visible" key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="contact section" aria-labelledby="contact-title">
          <div>
            <p className="section-kicker">Связаться со мной</p>
            <h2 id="contact-title">Давайте соберем визуализацию, от которой проект хочется купить сразу.</h2>
          </div>
          <div className="contact-panel">
            <a href="mailto:polina.visual@gmail.com">Polinatiurina1@yandex.ru</a>
            <a href="tel:+79990000000">+7 988 946 87 30</a>
            <a href="https://t.me/@Polinnnnnnnnnnnnnnnnnnnnnnna" target="_blank" rel="noreferrer">
              Telegram @Polinnnnnnnnnnnnnnnnnnnnnnna
            </a>
             <a href="https://max.ru/u/f9LHodD0cOIbR7U8fSwAqvsAzMcdMf8lEtfr_2bpiwoKrVpZbciUNExu4v4" target="_blank" rel="noreferrer">
              Max *КЛИК СЮДА*
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>Полина Тюрина</span>
        <span>Портфолио</span>
      </footer>
    </>
  );
}

export default App;
