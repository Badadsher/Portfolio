import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import HeroScene from "./components/HeroScene.jsx";
import Polya from "../assets/about/avatar.jpg";
import Sigar from "../assets/projects/sigar/sigarny_klub_podsvetka/podsvet9.jpg";
import OfficeOne from "../assets/projects/ofis/ofic3.jpg";
import ZK9 from "../assets/projects/ZK9/zhk9_render_kukhnya-gostinnaya_2026g/9.png";
import Mytna from "../assets/projects/Мытная/РЕНДЕР/spal3.jpg";
import Archyz from "../assets/projects/Arkhyz/spa3.jpg";
import Socialistic from "../assets/projects/Sotsialisticheskaya/gostin5.jpg";
import Krasno from "../assets/projects/Dizayn_proekt_ofisa_prodazh_na_Krasnoarmeyskoy/7.jpg";
import Shaht from "../assets/projects/Proekt_ofis_Shakhty/14.jpg";
import { motion } from "framer-motion";
const projects = [
  {
    id: "club",
    category: "public",
    label: "Общественный клуб",
    title: "Сигарный клуб Чнибалаянц Кировский",
    description:
      "Современная классика, благородные материалы, теплое интерьерное освещение.",
    image: Sigar,
    alt: "Сигарный клуб",
  },
  {
    id: "Mytna",
    category: "residential",
    label: "Интерьер квартиры",
    title: "Проект интерьера квартиры на ул. Мытная",
    description:
      "Современная эстетика с элементами ар-деко, акцентные текстуры и дизайнерское освещение.",
    image: Mytna,
    alt: "Интерьер квартиры на ул. Мытная",
  },
  {
    id: "office-one",
    category: "commercial",
    label: "Офисное пространство",
    title: "Проект офисного пространства в г. Краснодар",
    description:
      "Фотореалистичный рендер с акцентом на деловую атмосферу, комфорт и статус.",
    image: OfficeOne,
    alt: "Офисное пространство",
  },
  {
    id: "Social",
    category: "residential",
    label: "Интерьер квартиры",
    title: "Проект интерьера квартиры на ул. Социалистическая",
    description:
      "Современное жилое пространство, светлые древесные фактуры, лаконичные формы и теплые акценты.",
    image: Socialistic,
    alt: "Интерьер квартиры на ул. Социалистическая",
  },
  {
    id: "gostin",
    category: "public",
    label: "Гостиница",
    title: "Архыз Гостиница Романтик APRES-SKI",
    description:
      "Современное wellness-пространство, натуральные материалы, тактильные поверхности и деликатное освещение.",
    image: Archyz,
    alt: "Гостиница",
  },
  {
    id: "office-three",
    category: "commercial",
    label: "Офисное пространство",
    title: "Проект офисного пространства в г. Шахты",
    description:
      "Детализированная визуализация для демонстрации эргономики, гибкости и эффективности офисного пространства.",
    image: Shaht,
    alt: "Офисное пространство",
  },
  {
    id: "Kotelnik",
    category: "residential",
    label: "Интерьер квартиры",
    title: "Проект интерьера квартиры в ЖК9 Котельники",
    description:
      "Фотореалистичная визуализация с акцентом на комфорт, эстетику и функциональность пространства.",
    image: ZK9,
    alt: "Интерьер квартиры в ЖК9 Котельники",
  },
  {
    id: "office-two",
    category: "commercial",
    label: "Офисное пространство",
    title: "Проект офисного пространства на Красноармейской",
    description:
      "Лаконичный бизнес-интерьер, благородная цветовая палитра и выразительная архитектура.",
    image: Krasno,
    alt: "Офисное пространство",
  },
];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 80,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const filters = [
  { id: "all", label: "Все" },
  { id: "residential", label: "Жилые" },
  { id: "commercial", label: "Коммерция" },
  { id: "public", label: "Публичные" },
];

const stats = [
  { value: "42+", label: "визуализации" },
  { value: "9", label: "стилей интерьера" },
  { value: "4K", label: "финальный рендер" },
];

const expertise = [
  ["Сильные стороны", "Композиция, свет, материалы, фотореализм"],
  ["Форматы", "Рендеры, close-up, mood shots, визуализации для продаж"],
  [
    "Софт",
    "3ds Max, Corona Renderer, V-Ray, Archicad, Revit, SketchUp, AutoCAD, Lumen, Photoshop",
  ],
];

const processSteps = [
  [
    "01",
    "Бриф и материалы",
    "Собираю планировку, референсы, ведомость отделки, мебель и нужное настроение.",
  ],
  [
    "02",
    "Сцена и свет",
    "Собираю геометрию, настраиваю камеры, дневные и вечерние сценарии.",
  ],
  [
    "03",
    "Материалы",
    "Довожу ткани, камень, дерево, металл и фактуры до тактильного ощущения.",
  ],
  [
    "04",
    "Финальный рендер",
    "Готовлю цвет, постобработку, 4K-изображения и файлы для презентации.",
  ],
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
          <motion.div
            className="hero-content"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <motion.p variants={fadeUp} className="eyebrow">
              3D Визуализатор интерьера
            </motion.p>
            <motion.h1 variants={fadeUp} id="hero-title">
              Я создаю интерьерные визуализации, которые передают атмосферу еще
              до ремонта.
            </motion.h1>
            <motion.p variants={fadeUp} className="hero-copy">
              Меня зовут Полина. Я делаю фотореалистичные 3D-рендеры для
              дизайнеров, студий и частных клиентов, чтобы будущий интерьер
              можно было почувствовать до первой стройки.
            </motion.p>
            <motion.div variants={fadeUp} className="hero-actions">
              <a className="button primary" href="#projects">
                Смотреть портфолио
              </a>
              <a className="button secondary" href="#about">
                Обо мне
              </a>
            </motion.div>
          </motion.div>
          <motion.div
            className="hero-stats"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.6,
            }}
          >
            {stats.map((item) => (
              <div key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </motion.div>
        </section>

        <section
          id="projects"
          className="section projects-section"
          aria-labelledby="projects-title"
        >
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
            {visibleProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{
                  opacity: 0,
                  filter: "blur(10px)",
                }}
                whileInView={{
                  opacity: 1,
                  filter: "blur(0px)",
                }}
                viewport={{
                  once: false,
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.8,
                }}
              >
                <Link
                  to={`/project/${project.id}`}
                  className="project-card"
                  data-category={project.category}
                >
                  <img src={project.image} alt={project.alt} />

                  <div className="project-meta">
                    <span>{project.label}</span>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        <section
          id="about"
          className="about section"
          aria-labelledby="about-title"
        >
          <motion.div
            className="portrait-panel"
            initial={{
              opacity: 0,
              scale: 0.94,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: false,
              amount: 0.2,
            }}
            transition={{
              duration: 1,
            }}
          >
            <img
              src={Polya}
              alt="Фрагмент интерьерного мудборда с материалами и тканями"
            />
          </motion.div>
          <motion.div
            className="about-copy"
            initial={{
              opacity: 0,
              y: 60,
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
            }}
          >
            <h2 id="about-title">Превращаю идеи в интерьерные визуализации.</h2>
            <p>
              Я работаю с интерьерными дизайнерами, архитектурными бюро и
              частными заказчиками. Для меня важна не просто красивая картинка,
              а решение: показать масштаб, подчеркнуть материалы, проверить
              световые сценарии и сделать презентацию проекта по-настоящему
              дорогой.
            </p>
            <dl className="expertise-list">
              {expertise.map(([term, description]) => (
                <div key={term}>
                  <dt>{term}</dt>
                  <dd>{description}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </section>

        <section
          id="process"
          className="process section"
          aria-labelledby="process-title"
        >
          <div className="section-heading">
            <div>
              <p className="section-kicker">О рабочем процессе</p>
              <h2 id="process-title">Мой процесс без хаоса</h2>
            </div>
            <p className="section-note">
              Я веду проект по понятным этапам, чтобы быстрее согласовать
              результат и сохранить премиальный уровень деталей.
            </p>
          </div>
          <div className="process-steps">
            {processSteps.map(([number, title, description], index) => (
              <motion.article
                className="step"
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
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                }}
              >
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <motion.section
          id="contact"
          className="contact section"
          aria-labelledby="contact-title"
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
            amount: 0.2,
          }}
          transition={{
            duration: 0.8,
          }}
        >
          <div>
            <p className="section-kicker">Связаться со мной</p>
            <h2 id="contact-title">
              Давайте соберем визуализацию, от которой проект захочется купить
              сразу.
            </h2>
          </div>
          <div className="contact-panel">
            <a href="mailto:polina.visual@gmail.com">
              Polinatiurina1@yandex.ru
            </a>
            <a href="tel:+79990000000">+7 988 946 87 30</a>
            <a
              href="https://t.me/Polinnnnnnnnnnnnnnnnnnnnnnna"
              target="_blank"
              rel="noreferrer"
            >
              Telegram @Polinnnnnnnnnnnnnnnnnnnnnnna
            </a>
            <a
              href="https://max.ru/u/f9LHodD0cOIbR7U8fSwAqvsAzMcdMf8lEtfr_2bpiwoKrVpZbciUNExu4v4"
              target="_blank"
              rel="noreferrer"
            >
              Max *КЛИК СЮДА*
            </a>
          </div>
        </motion.section>
      </main>

      <footer className="footer">
        <span>Полина Тюрина</span>
        <span>Портфолио</span>
      </footer>
    </>
  );
}

export default App;
