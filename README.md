# SmartGym AI

An AI-powered fitness application that provides real-time posture correction, exercise recognition, and personalized workout and diet planning.

## Features

- **AI Posture Detection** — Real-time posture analysis and form correction during exercises using computer vision
- **Exercise Recognition** — AI-powered detection and classification of gym exercises
- **Workout Planner** — Create and manage personalized workout routines
- **Diet Planner** — Nutrition guidance and meal planning integration

## Tech Stack

- **Frontend:** React, TypeScript, Node.js
- **Backend:** Node.js, Express.js, TypeORM
- **Database:** PostgreSQL
- **AI/ML:** MediaPipe, Custom ML Models
- **Computer Vision:** Real-time pose estimation and exercise detection

## Project Structure

```
SmartGym-AI/
├── frontend/          # React TypeScript application
├── backend/           # Node.js/Express API server
├── core/              # ML models for posture and exercise detection
│   ├── bicep_model/
│   ├── squat_model/
│   ├── lunge_model/
│   ├── plank_model/
│   └── utils/
└── public/            # Static assets (images, videos, audio)
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- PostgreSQL

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/SmartGym-AI.git
   cd SmartGym-AI
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   npm run migration:run
   npm start
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm start
   ```

The application will be available at `http://localhost:3000`

### Configuration

Create a `.env` file in the backend directory with:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_db_user
DB_PASSWORD=your_db_password
DB_DATABASE=okgym
NODE_ENV=development
JWT_SECRET=your_secret_key
```

## Usage

1. Start the backend server
2. Start the frontend application
3. Sign up or log in
4. Use the workout planner to create a routine
5. Start a workout and use AI posture detection in real-time
6. Check the diet planner for nutrition guidance

## API Endpoints

Core endpoints:
- `POST /api/auth/register` — User registration
- `POST /api/auth/login` — User login
- `GET /api/workouts` — Get user workouts
- `POST /api/workouts` — Create new workout
- `GET /api/exercises` — Get all exercises
- `GET /api/diet-plans` — Get diet plans

## ML Models

The `core/` directory contains trained models for:
- **Squat Detection** — Identifies and corrects squat form
- **Lunge Detection** — Monitors lunge technique
- **Plank Detection** — Tracks plank posture
- **Bicep Curl Detection** — Analyzes bicep curl execution

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add YourFeature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

## Acknowledgments

- MediaPipe for pose detection
- Express.js community
- React community
