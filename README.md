# Portfolio Overview

## Описание проекта
**Portfolio Overview** — это веб-приложение для управления инвестиционным портфелем. Оно позволяет пользователям добавлять активы, отслеживать их стоимость, изменение цены за 24 часа и долю в портфеле.

## Стек технологий
- **React 19** — библиотека для построения пользовательского интерфейса.
- **Redux Toolkit** — управление состоянием приложения.
- **TypeScript** — статическая типизация.
- **SCSS (SASS)** — стилизация компонентов.
- **Chart.js + react-chartjs-2** — графики и визуализация данных.
- **Axios** — работа с HTTP-запросами.
- **React-Window** — виртуализация списков для улучшения производительности.
- **Socket.io-client** — работа с веб-сокетами.
- **uuid** — генерация уникальных идентификаторов.

## Деплой проекта
* [https://portfolio-overview-gamma.vercel.app/](https://portfolio-overview-gamma.vercel.app/)

## Архитектура проекта
```
portfolio-overview/
│   ├── public/             # Публичные файлы и фавикон
│   ├── src/
│   │   ├── components/     # Компоненты
│   │   ├── hooks/          # Пользовательские хуки
│   │   ├── pages/          # Страница приложения
│   │   ├── store/          # Redux-хранилище
│   │   ├── types/          # Типы TypeScript
│   │   ├── utils/          # Вспомогательные функции
│   ├── .eslintrc.json      # Конфигурация ESLint
│   ├── tsconfig.json       # Конфигурация TypeScript
│   ├── vite.config.ts      # Конфигурация Vite
│   ├── package.json        # Список зависимостей и скриптов
│   ├── README.md           # Документация проекта
```

## Установка и запуск проекта
### 1. Клонирование репозитория
```sh
git clone https://github.com/massaracsh7/portfolio-overview.git
cd portfolio-overview
```
### 2. Установка зависимостей
```sh
npm install
```
### 3. Запуск в режиме разработки
```sh
npm run dev
```
### 4. Сборка проекта
```sh
npm run build
```
### 5. Предпросмотр собранного проекта
```sh
npm run preview
```
### 6. Линтинг кода
```sh
npm run lint
```


