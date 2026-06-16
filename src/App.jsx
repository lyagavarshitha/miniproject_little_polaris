import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Auth from "./pages/Auth";

import StudentDashboard from "./pages/StudentDashboard";
import ParentDashboard from "./pages/ParentDashboard";
import AdminDashboard from "./pages/AdminDashboard";

import PremiumGamesPage from "./pages/PremiumGamesPage";
import ChoresPage from "./pages/ChoresPage";

import LessonsPage from "./pages/LessonsPage";
import LessonDetailPage from "./pages/LessonDetailPage";

import TinyExplorerWorld from "./pages/TinyExplorerWorld";

// Tiny Explorer Lessons
import AlphabetLesson from "./pages/lessons/tiny/AlphabetLesson";
import NumberLesson from "./pages/lessons/tiny/NumberLesson";
import ColorLesson from "./pages/lessons/tiny/ColorLesson";
import ShapeLesson from "./pages/lessons/tiny/ShapeLesson";
import AnimalLesson from "./pages/lessons/tiny/AnimalLesson";
import HabitsLesson from "./pages/lessons/tiny/HabitsLesson";
import AlphabetPop from "./pages/games/AlphabetPop";
import ColorMonsterPotionLab from "./pages/games/ColorMonsterPotionLab";
import ShapeMagicFactory from "./pages/games/ShapeMagicFactory";
import MemoryMatch from "./pages/games/MemoryMatch";
import WordHighwayRacer from "./pages/games/WordHighwayRacer";

const App = () => {
  return (
    <Router>
      <Routes>

        {/* Main Pages */}
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/auth"
          element={<Auth />}
        />

        {/* Student Dashboard */}
        <Route
          path="/student"
          element={<StudentDashboard />}
        />

        {/* Parent Dashboard */}
        <Route
          path="/parent"
          element={<ParentDashboard />}
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        {/* Lessons */}
        <Route
          path="/student/lessons"
          element={<LessonsPage />}
        />

        <Route
          path="/student/lesson-detail"
          element={<LessonDetailPage />}
        />

        {/* Games */}
        <Route
          path="/student/games"
          element={<PremiumGamesPage />}
        />

        {/* Chores */}
        <Route
          path="/student/chores"
          element={<ChoresPage />}
        />

        {/* Tiny Explorer World */}
        <Route
          path="/tiny-world"
          element={<TinyExplorerWorld />}
        />

        {/* Tiny Explorer Lessons */}

        <Route
          path="/lessons/alphabet"
          element={<AlphabetLesson />}
        />

        <Route
          path="/lessons/numbers"
          element={<NumberLesson />}
        />

        <Route
          path="/lessons/colors"
          element={<ColorLesson />}
        />

        <Route
          path="/lessons/shapes"
          element={<ShapeLesson />}
        />

        <Route
          path="/lessons/animals"
          element={<AnimalLesson />}
        />
        <Route
  path="/lessons/habits"
  element={<HabitsLesson />}
/>
<Route
  path="/games/alphabet-pop"
  element={<AlphabetPop />}
/>
<Route
  path="/games/color-monster"
  element={<ColorMonsterPotionLab />}
/>
<Route
  path="/games/shape-magic-factory"
  element={<ShapeMagicFactory />}
/>
<Route
  path="/games/memory-match"
  element={<MemoryMatch />}
/>
<Route
  path="/games/word-highway-racer"
  element={<WordHighwayRacer />}
/>

      </Routes>
    </Router>
  );
};

export default App;