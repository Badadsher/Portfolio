# Polina Studio Portfolio

React-сайт-портфолио для Полины, 3D-визуализатора интерьеров.

## Как открыть

Установите зависимости:

```bash
npm install
```

Запустите dev-сервер:

```bash
npm run dev
```

После этого сайт будет доступен по адресу, который покажет Vite, обычно `http://localhost:5173`.

Собрать production-версию:

```bash
npm run build
```

## Что заменить перед публикацией

- Фотографии проектов: положите реальные рендеры в `assets/projects/`, затем в `index.html`
  замените `image` внутри массива `projects` в `src/App.jsx` на путь вроде
  `/assets/projects/living-room.jpg`.
- Фото Полины: положите фото в `assets/about/`, затем замените `src` в блоке `portrait-panel`
  в `src/App.jsx` на путь вроде `/assets/about/polina.jpg`.
- Email, телефон и ссылку Telegram замените в секции `contact` в `src/App.jsx`.
- Описание опыта, софт и количество проектов можно поменять в массивах `stats`, `expertise`
  и `processSteps` в `src/App.jsx`.
- 3D-модель: текущая сцена собрана кодом в `src/components/HeroScene.jsx` из простых 3D-блоков.
  Чтобы заменить ее своей моделью, положите `.glb` файл в `assets/models/` и укажите путь
  в переменной `customModelPath`, например `/assets/models/interior-scene.glb`.
