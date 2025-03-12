# Recipe Book

A full-stack application for exploring recipes from around the world. This application allows users to browse recipes, filter by ingredients, countries, and categories, and view detailed recipe information.

## Features

- Browse all available recipes
- Filter recipes by ingredient, country, or category
- View detailed recipe information including ingredients, instructions, and related recipes
- Responsive design for all device sizes

## Tech Stack

### Frontend
- Next.js
- React
- TypeScript
- SCSS for styling

### Backend
- Next.js API Routes
- TheMealDB API integration

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd recipe-book
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

- `/app` - Next.js application pages and components
  - `/api` - API routes for fetching recipe data
  - `/components` - Reusable React components
  - `/recipe` - Recipe detail page
- `/assets` - Global styles and variables
- `/public` - Static assets
