# Australian Household Carbon Calculator

**ITO5002-TP6-25** - (SDG 13: Climate Action)

## Project Overview

This application helps Australian homeowners calculate and reduce their carbon footprint through solar panel installation and electric vehicle adoption. The goal is to address the 50% emissions reduction gap between Australia's climate targets and current pledges by empowering households to take action.

## Team Members

- Matt
- Phillip
- Dasith
- Haseung

## Problem Statement

Australia needs a 60% emissions reduction to meet climate targets, but current pledges only achieve 10%. This leaves a critical 50% gap that household action could help close. Solar panels and EVs can reduce household emissions by up to 50%, but homeowners lack tools to understand their specific impact and make informed decisions.

## Solution

A focused household carbon calculator that:
- Calculates carbon savings from solar panel installation (4-6 tonnes CO2e/year)
- Calculates carbon savings from EV adoption (2-4 tonnes CO2e/year)
- Uses Australian government data and state-specific emissions factors
- Provides actionable insights for homeowners aged 30-50

## Setup Instructions

### Prerequisites
- Node.js v18+ and npm
- Git

### Installation

1. **Clone the repository:**
```bash
   git clone https://github.com/pwal0022/ito5002_team_4_website.git .
```

2. **Install dependencies:**
```bash
   npm install
```

3. **Run development server:**
```bash
   npm run dev
```

4. **Open browser to:** http://localhost:5173/

### Available Commands
```bash
npm run dev         # Start development server
npm run build       # Build for production
npm run preview     # Preview production build
npm run test:unit   # Run unit tests with Vitest
npm run lint        # Run ESLint for code quality
```

## Project Structure
```
src/
├── assets/       # Images, global styles
├── components/   # Reusable Vue components
├── views/        # Page components (Home, About, Calculator pages)
├── services/     # Calculation logic & data services
├── router/       # Vue Router configuration
├── stores/       # Pinia state management
├── App.vue       # Root component
└── main.js       # Application entry point
```

## Tech Stack

- **Vue.js** 3.5.22 - Progressive JavaScript framework
- **Vue Router** 4.6.3 - Client-side routing
- **Bootstrap** 5.3.8 - UI components and styling
- **Pinia** - State management
- **Vite** 7.2+ - Build tool and dev server
- **Vitest** - Unit testing framework
- **ESLint** - Code quality
- **Prettier** - Code formatting
- **Firebase** - Hosting and deployment

## Data Sources

- **Clean Energy Regulator (CER)** - Solar installation data and generation statistics
- **Electric Vehicle Council** - EV adoption statistics and emissions data
- **Department of Climate Change, Energy, Environment and Water (DCCEEW)** - State-specific emissions factors
- **Australian Bureau of Statistics (ABS)** - Household demographic data

## Development Workflow

This project follows Agile methodology with two-week iterations:

1. Pull latest changes: `git pull origin main`
2. Create feature branch: `git checkout -b feature/your-feature-name`
3. Make changes and commit: `git commit -m "Description"`
4. Push branch: `git push origin feature/your-feature-name`
5. Create Pull Request on GitHub for team review
6. After merge, switch back to main: `git checkout main && git pull origin main`

## UN Sustainable Development Goal

**SDG 13: Climate Action** - Take urgent action to combat climate change and its impacts.

This project specifically targets:
- Target 13.2: Integrate climate change measures into policies and planning
- Target 13.3: Improve education and awareness on climate change mitigation

## Assessment Information

- **Unit:** ITO5002-TP6-25
- **Assessment 2 - Iteration 1:** Working prototype + presentation (Week 5, Tuesday)
- **Assessment 2 - Iteration 2:** Enhanced prototype based on feedback (Week 7)

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Vue Official Extension](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- Disable Vetur if installed (conflicts with Vue Official)

## Browser DevTools

- **Chrome/Edge/Brave:** [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
- **Firefox:** [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)

## License

Educational project for Monash University ITO5002

---

**Team 4** - Building solutions for a sustainable future 🌱