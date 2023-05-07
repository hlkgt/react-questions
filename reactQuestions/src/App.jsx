import { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";

const BoxQuest = ({ id, text, children }) => {
  return (
    <Fragment>
      <div className="col-span-4 col-start-1">
        <p>
          {id}. {text}
        </p>
      </div>
      <div className="col-span-4 grid grid-flow-col grid-cols-2 grid-rows-2">
        {children}
      </div>
    </Fragment>
  );
};
BoxQuest.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  children: PropTypes.array,
};

const QuestChoice = (props) => {
  const { id, choice, text, name } = props;
  return (
    <div className="col-span-1">
      <input
        type="radio"
        name={name}
        id={id}
        value={choice}
        className="mr-2"
        {...props}
      />
      <label htmlFor={id}>
        {choice}. {text}
      </label>
    </div>
  );
};
QuestChoice.propTypes = {
  choice: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const App = () => {
  const [kategori, setKategori] = useState("");
  const [questions, setQuestions] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [answers, setAnswers] = useState({});
  const [isStatus, setIsStatus] = useState(false);
  const [highScore, setHighScore] = useState(0);
  let [score, setScore] = useState(0);
  let [gettingScore, setGettingScore] = useState(0);

  useEffect(() => {
    localStorage.length > 0
      ? setHighScore(localStorage.getItem("highScore"))
      : setHighScore(0);
  }, []);

  const handleKategori = (e) => setKategori(e.target.value);

  const createRandomNumber = (max) => {
    return Math.floor(Math.random() * max) + 1;
  };

  const getQuestions = async () => {
    if (kategori.length <= 0 || kategori === "kategori") {
      alert("No Kategori Selected");
      return false;
    } else {
      try {
        const response = await fetch("http://127.0.0.1:5003/questions");
        const data = await response.json();
        let quests = [];
        while (quests.length < 5) {
          const getQuest =
            data[kategori][createRandomNumber(data[kategori].length)];
          if (!quests.includes(getQuest) && getQuest !== undefined) {
            quests.push(getQuest);
          }
        }
        setQuestions(quests);
        setIsDisabled(true);
      } catch (error) {
        console.log("Error Pada Bagian", error.message);
      }
    }
  };

  const handleAnswerChange = (event) => {
    const { name, value } = event.target;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [name]: value,
    }));
  };

  const handleDetailAnswer = (answer, myAnswer, status) => {
    const detailAnswer = {
      answer: answer,
      myAnswer: myAnswer,
      status: status,
    };
    setQuestions((detail) => [...detail, detailAnswer]);
  };

  handleDetailAnswer.propTypes = {
    answer: PropTypes.string.isRequired,
    myAnswer: PropTypes.string.isRequired,
    status: PropTypes.boolean,
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setQuestions([]);
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].answer === answers["answer" + i]) {
        setScore((score += questions[i].point));
        setGettingScore((gettingScore += questions[i].point));
        handleDetailAnswer(questions[i].answer, answers["answer" + i], true);
      } else if (questions[i].answer !== answers["answer" + i]) {
        if (answers["answer" + i] === undefined) {
          handleDetailAnswer(
            questions[i].answer,
            (answers["answer" + i] = "Tidak Dijawab"),
            false
          );
        } else {
          handleDetailAnswer(questions[i].answer, answers["answer" + i], false);
        }
      }
    }
    setIsStatus(!isStatus);
  };

  const handleResetGame = () => {
    if (score > highScore) {
      localStorage.setItem("highScore", score);
      setHighScore(localStorage.getItem("highScore"));
    }
    setKategori("kategori");
    setQuestions([]);
    setAnswers({});
    setIsDisabled(false);
    setIsStatus(false);
    setGettingScore(0);
  };

  return (
    <div className="lg:container bg-sky-400 lg:max-w-md lg:mx-auto">
      <div className="flex justify-center items-center min-h-screen">
        <div className="grid grid-cols-1 gap-12">
          <div className="grid grid-cols-4 grid-rows-4 gap-4 w-80 h-80 md:w-[35rem] md:h-[25rem] lg:w-80 lg:h-80 col-span-1 shadow-xl rounded-lg bg-slate-100">
            <div className="col-span-4 row-span-2 grid grid-cols-2 gap-4 px-4">
              <div className="col-span-1 rounded-md shadow-md flex justify-center items-center flex-col mt-4">
                <h1 className="font-medium md:text-2xl lg:text-xl">My Score</h1>
                <p className="text-4xl font-medium md:text-5xl lg:text-2xl">
                  {score}
                </p>
              </div>
              <div className="col-span-1 rounded-md shadow-md flex justify-center items-center flex-col mt-4">
                <h1 className="font-medium md:text-2xl lg:text-xl">
                  High Score
                </h1>
                <p className="text-4xl font-medium md:text-5xl lg:text-2xl">
                  {highScore}
                </p>
              </div>
            </div>
            <select
              name="select"
              id="select"
              className={
                "col-span-4 mx-4 text-center rounded-md shadow-md font-medium text-md md:text-xl lg:text-md"
              }
              onChange={handleKategori}
              value={kategori}
            >
              <option hidden value="kategori">
                Pilih Kategori Quest
              </option>
              <option value="matematika">Matematika</option>
              <option value="ipa">IPA</option>
              <option value="ips">IPS</option>
              <option value="sains">Sains</option>
            </select>
            <button
              disabled={isDisabled}
              onClick={getQuestions}
              type="button"
              className={
                (isDisabled
                  ? "bg-gray-400 "
                  : "bg-blue-600 hover:bg-blue-400 pointer ") +
                "col-span-4 mx-4 mb-4 rounded-md shadow-md font-medium md:text-xl lg:text-md text-white border-white"
              }
            >
              Generate Quest
            </button>
          </div>
          <div
            className={
              isStatus
                ? "w-80 h-80 md:w-[35rem] lg:w-80 lg:h-80 p-5 col-span-1 rounded-lg shadow-xl bg-slate-100 overflow-y-scroll"
                : (questions.length > 0
                    ? "grid grid-cols-1 gap-8 overflow-y-scroll"
                    : "flex justify-center items-center") +
                  " w-80 h-80 md:w-[35rem] lg:w-80 lg:h-80 p-5 col-span-1 rounded-lg shadow-xl bg-slate-100"
            }
          >
            {isStatus ? (
              <div className={"grid grid-cols-4 gap-4"}>
                {questions.map((item, index) => {
                  return (
                    <Fragment key={index}>
                      <div className={"col-span-4 flex gap-4"}>
                        <div
                          className={
                            (item.status ? "bg-teal-400 " : "bg-red-400 ") +
                            "w-5 h-full text-white flex justify-center items-center"
                          }
                        >
                          {index + 1}
                        </div>
                        <div>
                          <p>Jawaban Kamu : {item.myAnswer}</p>
                          <p>Jawaban Soal : {item.answer}</p>
                          <p>
                            Keterangan : {item.status ? "Benar✔" : "Salah❌"}
                          </p>
                        </div>
                      </div>
                      <hr className={"col-span-4 h-2 bg-blue-400"} />
                    </Fragment>
                  );
                })}
              </div>
            ) : questions.length > 0 ? (
              questions.map((quest, i) => {
                return (
                  <Fragment key={i}>
                    <div className="grid grid-cols-4">
                      <BoxQuest id={i + 1} text={quest.question}>
                        <QuestChoice
                          choice={"A"}
                          name={"answer" + i}
                          text={quest.choice.a}
                          id={quest.id + quest.choice.a}
                          onChange={handleAnswerChange}
                        />
                        <QuestChoice
                          choice={"B"}
                          name={"answer" + i}
                          text={quest.choice.b}
                          id={quest.id + quest.choice.b}
                          onChange={handleAnswerChange}
                        />
                        <QuestChoice
                          choice={"C"}
                          name={"answer" + i}
                          text={quest.choice.c}
                          id={quest.id + quest.choice.c}
                          onChange={handleAnswerChange}
                        />
                        <QuestChoice
                          choice={"D"}
                          name={"answer" + i}
                          text={quest.choice.d}
                          id={quest.id + quest.choice.d}
                          onChange={handleAnswerChange}
                        />
                      </BoxQuest>
                    </div>
                  </Fragment>
                );
              })
            ) : (
              <h1 className="text-lg font-semibold">
                Belum Ada Quest Yang Dipilih
              </h1>
            )}
            {isStatus ? (
              <div className="grid grid-cols-4">
                <div className="col-span-4 my-4 text-center">
                  Total Score Yang Didapat : {gettingScore}
                </div>
                <button
                  className="col-span-4 bg-teal-600 p-2 border border-white shadow-lg rounded-md font-medium text-lg text-white hover:bg-teal-400"
                  type="button"
                  onClick={handleResetGame}
                >
                  Mulai Lagi
                </button>
              </div>
            ) : questions.length > 0 ? (
              <div className="grid grid-cols-4">
                <button
                  className="col-span-4 bg-blue-600 p-2 border border-white shadow-lg rounded-md font-medium text-lg text-white hover:bg-blue-400"
                  type="button"
                  onClick={handleSubmit}
                >
                  Done Quest
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
