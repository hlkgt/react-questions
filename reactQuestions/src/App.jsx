import { useState, Fragment } from "react";
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

const QuestChoice = (props) => {
  const { id, choice, textChoice, name } = props;
  return (
    <div className="col-span-1">
      <input
        type="radio"
        name={name}
        id={id}
        value={textChoice}
        className="mr-2"
        {...props}
      />
      <label htmlFor={id}>
        {choice}. {textChoice}
      </label>
    </div>
  );
};

BoxQuest.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  children: PropTypes.func,
};
QuestChoice.propTypes = {
  choice: PropTypes.string.isRequired,
  textChoice: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const App = () => {
  const [kategori, setKategori] = useState("");
  const [questions, setQuestions] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [answers, setAnswers] = useState({});

  const getKategori = (kategori) => setKategori(kategori);

  const getQuestions = async () => {
    if (kategori.length <= 0) {
      alert("No Kategori Selected");
      return false;
    } else {
      try {
        const response = await fetch("http://127.0.0.1:5003/questions");
        const data = await response.json();
        setQuestions(data[kategori]);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    // Menggunakan nilai dari setiap soal
    console.log("Jawaban:", answers);
  };

  return (
    <div className="lg:container bg-sky-400 lg:max-w-md lg:mx-auto">
      <div className="flex justify-center items-center min-h-screen">
        <div className="grid grid-cols-1 gap-12">
          <div className="w-80 h-80 md:w-[35rem] md:h-[25rem] lg:w-80 lg:h-80 col-span-1 shadow-xl rounded-lg bg-slate-100">
            <div className="grid grid-cols-2 gap-4 px-5">
              <div className="col-span-1 h-32 mt-12 bg-slate-100 rounded-md shadow-md flex justify-center items-center flex-col">
                <h1 className="font-medium md:text-2xl lg:text-xl">My Score</h1>
                <p className="text-4xl font-medium md:text-5xl lg:text-2xl">
                  50
                </p>
              </div>
              <div className="col-span-1 h-32 mt-12 bg-slate-100 rounded-md shadow-md flex justify-center items-center flex-col">
                <h1 className="font-medium md:text-2xl lg:text-xl">
                  High Score
                </h1>
                <p className="text-4xl font-medium md:text-5xl lg:text-2xl">
                  50
                </p>
              </div>
            </div>
            <select
              name="select"
              id="select"
              className={
                "mx-auto mt-5 md:mt-10 lg:mt-5 mb-5 md:mb-7 lg:mb-5 block px-16 md:px-40 lg:px-12 py-2 md:py-4 lg:py-2 rounded-md shadow-md font-medium text-md md:text-xl lg:text-md"
              }
              onChange={(e) => getKategori(e.target.value)}
            >
              <option className="hidden">Pilih Kategori Soal</option>
              <option value="matematika">Matematika</option>
              <option value="ipa">IPA</option>
              <option value="ips">IPS</option>
              <option value="sains">Sains</option>
            </select>
            <button
              disabled={isDisabled}
              onClick={getQuestions}
              type="button"
              className="block mx-auto px-12 md:px-40 lg:px-12 py-1 md:py-3 lg:py-1 bg-blue-600 rounded-md shadow-md font-medium md:text-xl lg:text-md text-white hover:bg-blue-400 border-white"
              data-click="generate"
            >
              Generate Soal
            </button>
          </div>
          <div
            className={
              (questions.length > 0
                ? "grid grid-cols-1 gap-8 overflow-y-scroll"
                : "flex justify-center items-center") +
              " w-80 h-80 md:w-[35rem] lg:w-80 lg:h-80 p-5 col-span-1 rounded-lg shadow-xl bg-slate-100"
            }
          >
            {questions.length > 0 ? (
              questions.map((quest, i) => {
                return (
                  <Fragment key={i}>
                    <div className="grid grid-cols-4">
                      <BoxQuest id={quest.id} text={quest.question}>
                        <QuestChoice
                          choice={"A"}
                          name={"answer" + quest.id}
                          textChoice={quest.choice.a}
                          answerId={quest.id}
                          id={quest.id + quest.choice.a}
                          onChange={handleAnswerChange}
                        />
                        <QuestChoice
                          choice={"B"}
                          name={"answer" + quest.id}
                          textChoice={quest.choice.b}
                          answerId={quest.id}
                          id={quest.id + quest.choice.b}
                          onChange={handleAnswerChange}
                        />
                        <QuestChoice
                          choice={"C"}
                          name={"answer" + quest.id}
                          textChoice={quest.choice.c}
                          answerId={quest.id}
                          id={quest.id + quest.choice.c}
                          onChange={handleAnswerChange}
                        />
                        <QuestChoice
                          choice={"D"}
                          name={"answer" + quest.id}
                          textChoice={quest.choice.d}
                          id={quest.id + quest.choice.d}
                          onChange={handleAnswerChange}
                        />
                      </BoxQuest>
                    </div>
                  </Fragment>
                );
              })
            ) : (
              <h1>Belum Ada Quest Yang Dipilih</h1>
            )}
            {questions.length > 0 ? (
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
