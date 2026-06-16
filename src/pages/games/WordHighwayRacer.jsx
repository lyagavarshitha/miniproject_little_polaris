import React, {
  useEffect,
  useState,
} from "react";

const questions = [

  {
    question: "Which animal says Moo?",
    options: ["🐶", "🐄", "🐱"],
    answer: 1,
  },

  {
    question: "Which animal barks?",
    options: ["Dog", "Fish", "Cow"],
    answer: 0,
  },

  {
    question: "Which animal meows?",
    options: ["Cat", "Horse", "Duck"],
    answer: 0,
  },

  {
    question: "2 + 3 = ?",
    options: ["4", "5", "6"],
    answer: 1,
  },

  {
    question: "5 - 2 = ?",
    options: ["3", "4", "2"],
    answer: 0,
  },

  {
    question: "4 + 4 = ?",
    options: ["7", "8", "9"],
    answer: 1,
  },

  {
    question: "10 - 5 = ?",
    options: ["4", "5", "6"],
    answer: 1,
  },

  {
    question: "3 + 6 = ?",
    options: ["8", "9", "10"],
    answer: 1,
  },

  {
    question: "Which starts with A?",
    options: ["Apple", "Ball", "Cat"],
    answer: 0,
  },

  {
    question: "Which starts with B?",
    options: ["Dog", "Ball", "Fish"],
    answer: 1,
  },

  {
    question: "Which starts with C?",
    options: ["Apple", "Cat", "Ball"],
    answer: 1,
  },

  {
    question: "Which starts with D?",
    options: ["Dog", "Apple", "Fish"],
    answer: 0,
  },

  {
    question: "Which color is Red?",
    options: ["🔴", "🟢", "🔵"],
    answer: 0,
  },

  {
    question: "Which color is Blue?",
    options: ["🟢", "🔵", "🔴"],
    answer: 1,
  },

  {
    question: "Which color is Green?",
    options: ["🟡", "🟢", "🔴"],
    answer: 1,
  },

  {
    question: "Red + Yellow = ?",
    options: ["Orange", "Purple", "Green"],
    answer: 0,
  },

  {
    question: "Blue + Yellow = ?",
    options: ["Purple", "Green", "Orange"],
    answer: 1,
  },

  {
    question: "Which shape is a Circle?",
    options: ["🔺", "⭕", "⬜"],
    answer: 1,
  },

  {
    question: "Which shape is a Triangle?",
    options: ["⬜", "🔺", "⭕"],
    answer: 1,
  },

  {
    question: "Which shape is a Square?",
    options: ["⭕", "⬜", "🔺"],
    answer: 1,
  },

  {
    question: "How many days in a week?",
    options: ["5", "7", "10"],
    answer: 1,
  },

  {
    question: "How many months in a year?",
    options: ["10", "11", "12"],
    answer: 2,
  },

  {
    question: "Which planet do we live on?",
    options: ["Mars", "Earth", "Venus"],
    answer: 1,
  },

  {
    question: "Which is a fruit?",
    options: ["Apple", "Car", "Chair"],
    answer: 0,
  },

  {
    question: "Which is a vegetable?",
    options: ["Potato", "Ball", "Dog"],
    answer: 0,
  },

  {
    question: "Which bird can fly?",
    options: ["Eagle", "Fish", "Tiger"],
    answer: 0,
  },

  {
    question: "What comes after 5?",
    options: ["6", "7", "4"],
    answer: 0,
  },

  {
    question: "What comes before 10?",
    options: ["8", "11", "9"],
    answer: 2,
  },

  {
    question: "Which is the largest?",
    options: ["🐘", "🐜", "🐭"],
    answer: 0,
  },

  {
    question: "Sun rises in the?",
    options: ["West", "East", "North"],
    answer: 1,
  },

  {
    question: "Which one can swim?",
    options: ["Fish", "Lion", "Cow"],
    answer: 0,
  },

  {
    question: "Which one gives milk?",
    options: ["Cow", "Tiger", "Duck"],
    answer: 0,
  },

  {
    question: "1 + 1 = ?",
    options: ["2", "3", "4"],
    answer: 0,
  },

  {
    question: "7 - 3 = ?",
    options: ["3", "4", "5"],
    answer: 1,
  },

  {
    question: "Which is a vehicle?",
    options: ["Car", "Apple", "Dog"],
    answer: 0,
  },

  {
    question: "Which is used to write?",
    options: ["Pencil", "Ball", "Shoe"],
    answer: 0,
  },

  {
    question: "Which season is very cold?",
    options: ["Summer", "Winter", "Rainy"],
    answer: 1,
  },

  {
    question: "Which is a star?",
    options: ["Moon", "Sun", "Cloud"],
    answer: 1,
  },

  {
    question: "How many legs does a spider have?",
    options: ["6", "8", "10"],
    answer: 1,
  },

  {
    question: "Which animal is known as King of Jungle?",
    options: ["Tiger", "Lion", "Cow"],
    answer: 1,
  }

];

const WordHighwayRacer = () => {
  const [lane, setLane] = useState(1);

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [score, setScore] = useState(0);

  const [lives, setLives] = useState(3);

  const [timeLeft, setTimeLeft] =
    useState(60);

  const [message, setMessage] =
    useState("");

  const [gameOver, setGameOver] =
    useState(false);

  const lanePositions = [
    "20%",
    "50%",
    "80%",
  ];
    useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameOver) return;

      if (e.key === "ArrowLeft") {
        setLane((prev) =>
          prev > 0 ? prev - 1 : prev
        );
      }

      if (e.key === "ArrowRight") {
        setLane((prev) =>
          prev < 2 ? prev + 1 : prev
        );
      }

      if (e.key === "ArrowUp") {
        checkAnswer();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, [
    lane,
    currentQuestion,
    gameOver,
  ]);

  const checkAnswer = () => {
    const question =
      questions[currentQuestion];

    if (lane === question.answer) {
      setScore((prev) => prev + 10);

      setMessage(
        "✅ Correct! +10 Points"
      );
    } else {
      setLives((prev) => prev - 1);

      setMessage("💥 Wrong Answer!");

      if (lives - 1 <= 0) {
        setGameOver(true);
      }
    }

    setTimeout(() => {
      setMessage("");
    }, 1000);

    const next =
      (currentQuestion + 1) %
      questions.length;

    setCurrentQuestion(next);
  };

  if (gameOver) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 to-pink-200">

        <div className="bg-white p-10 rounded-3xl shadow-2xl text-center">

          <h1 className="text-6xl mb-4">
            🏁
          </h1>

          <h2 className="text-4xl font-bold mb-4">
            Race Finished!
          </h2>

          <p className="text-2xl mb-2">
            Score: {score}
          </p>

          <p className="text-xl mb-6">
            Time Left: {timeLeft}s
          </p>

          <button
            onClick={() =>
              window.location.reload()
            }
            className="bg-green-500 text-white px-8 py-3 rounded-full text-xl"
          >
            Play Again 🔥
          </button>

        </div>

      </div>
    );
  }
    const question =
    questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 to-green-200 overflow-hidden">

      {/* Top Bar */}

      <div className="flex justify-between items-center p-6 text-4xl font-bold">

        <div>
          ❤️ {lives}
        </div>

        <div>
          ⏰ {timeLeft}
        </div>

        <div>
          ⭐ {score}
        </div>

      </div>

      {/* Question */}

      <div className="flex justify-center mb-6">

        <div className="bg-white px-8 py-4 rounded-3xl shadow-xl text-center">

          <h2 className="text-3xl font-bold mb-2">
            {question.question}
          </h2>

          <p className="text-gray-600">
            Move car under correct answer
          </p>

        </div>

      </div>

      {/* Road */}

      <div className="relative mx-auto w-[500px] h-[600px] bg-gray-800 rounded-3xl overflow-hidden border-8 border-gray-700">

        {/* Road Lines */}

        <div className="absolute left-1/3 top-0 h-full border-l-4 border-dashed border-white"></div>

        <div className="absolute left-2/3 top-0 h-full border-l-4 border-dashed border-white"></div>

        {/* Answer Boxes */}

        {question.options.map(
          (option, index) => (
            <div
              key={index}
              className="absolute top-24 bg-yellow-300 w-28 h-28 rounded-2xl flex items-center justify-center text-4xl font-bold shadow-xl"
              style={{
                left:
                  index === 0
                    ? "8%"
                    : index === 1
                    ? "39%"
                    : "70%",
              }}
            >
              {option}
            </div>
          )
        )}

        {/* Car */}

        <div
          className="absolute bottom-8 text-7xl transition-all duration-300"
          style={{
            left:
              lane === 0
                ? "12%"
                : lane === 1
                ? "43%"
                : "74%",
          }}
        >
          🏎️
        </div>

      </div>

      {/* Controls */}

      <div className="text-center mt-6">

        <p className="text-2xl font-bold">
          ⬅️ ➡️ Move Car
        </p>

        <p className="text-xl">
          ⬆️ Submit Answer
        </p>

      </div>

      {/* Message */}

      {message && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white px-8 py-4 rounded-full shadow-2xl text-2xl font-bold">
          {message}
        </div>
      )}

    </div>
  );
};

export default WordHighwayRacer;