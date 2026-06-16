import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const LessonDetailPage = () => {
  const location = useLocation();
  const { lesson } = location.state;

  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const user = JSON.parse(localStorage.getItem("user"));

  const selectAnswer = (questionIndex, option) => {
    setAnswers({
      ...answers,
      [questionIndex]: option,
    });
  };

  // 🔊 Read lesson aloud
  const speakLesson = () => {
    const speech = new SpeechSynthesisUtterance(
      lesson.content
    );

    speech.lang = "en-US";
    speech.rate = 0.9;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
  };

  // ⏹ Stop reading
  const stopSpeech = () => {
    window.speechSynthesis.cancel();
  };

  const submitQuiz = () => {
    let correct = 0;

    lesson.quiz.forEach((q, index) => {
      if (answers[index] === q.answer) {
        correct++;
      }
    });

    setScore(correct);
    setSubmitted(true);

    if (correct >= 3) {
      const updatedUser = {
        ...user,
        coins: (user.coins || 0) + lesson.reward,
        xp: (user.xp || 0) + 20,
      };

      updatedUser.level =
        Math.floor(updatedUser.xp / 100) + 1;

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      alert(
        `🎉 Great Job!\n\nScore: ${correct}/5\n\n💰 +${lesson.reward} Coins\n⭐ +20 XP\n🏆 Level ${updatedUser.level}`
      );
    } else {
      alert(
        `😢 You scored ${correct}/5.\nScore at least 3 to earn rewards.`
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eef5ff] via-[#f7efff] to-[#edf7ff] p-10">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-10">

        <h1 className="text-4xl font-bold mb-6">
          {lesson.title}
        </h1>

        {/* VIDEO SECTION */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Lesson Video 🎥
          </h2>

          <video
            controls
            className="w-full rounded-3xl shadow-lg"
          >
            <source
              src="/videos/alphabet.mp4"
              type="video/mp4"
            />
            Your browser does not support video.
          </video>
        </div>

        {/* AUDIO SECTION */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Audio Lesson 🔊
          </h2>

          <audio controls className="w-full">
            <source
              src="/audio/sample.mp3"
              type="audio/mpeg"
            />
          </audio>
        </div>

        {/* LESSON CONTENT */}
        <div className="bg-blue-50 rounded-3xl p-8 mb-10">
          <div className="flex flex-wrap gap-4 mb-5">
            <button
              onClick={speakLesson}
              className="px-6 py-3 rounded-xl bg-green-600 text-white font-semibold"
            >
              🔊 Read Lesson
            </button>

            <button
              onClick={stopSpeech}
              className="px-6 py-3 rounded-xl bg-red-500 text-white font-semibold"
            >
              ⏹ Stop Reading
            </button>
          </div>

          <h2 className="text-2xl font-bold mb-4">
            Lesson Content 📚
          </h2>

          <p className="text-lg text-gray-700 whitespace-pre-line leading-relaxed">
            {lesson.content}
          </p>
        </div>

        {/* QUIZ */}
        <div className="bg-purple-50 rounded-3xl p-8">
          <h2 className="text-3xl font-bold mb-8">
            Quiz Time 📝
          </h2>

          {lesson.quiz.map((q, qIndex) => (
            <div key={qIndex} className="mb-10">
              <p className="text-xl font-semibold mb-4">
                {qIndex + 1}. {q.question}
              </p>

              <div className="space-y-3">
                {q.options.map((option, oIndex) => (
                  <button
                    key={oIndex}
                    onClick={() =>
                      selectAnswer(qIndex, option)
                    }
                    disabled={submitted}
                    className={`w-full text-left p-4 rounded-2xl transition ${
                      answers[qIndex] === option
                        ? "bg-blue-500 text-white"
                        : "bg-white hover:bg-gray-100"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {!submitted && (
            <button
              onClick={submitQuiz}
              className="mt-6 px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-lg"
            >
              Submit Quiz 🚀
            </button>
          )}

          {submitted && (
            <div className="mt-8 text-2xl font-bold text-center">
              Your Score: {score}/5 🎯
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default LessonDetailPage;