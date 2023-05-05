const App = () => {
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
                "mx-auto mt-5 md:mt-10 lg:mt-5 mb-5 md:mb-7 lg:mb-5 block px-16 md:px-40 lg:px-12 py-2 md:py-4 lg:py-2 rounded-md shadow-lg font-medium text-md md:text-xl lg:text-md"
              }
            >
              <option className="hidden">Pilih Kategori Soal</option>
              <option value="matematika">Matematika</option>
            </select>
            <button
              type="button"
              className="block mx-auto px-12 md:px-40 lg:px-12 py-1 md:py-3 lg:py-1 bg-sky-500 rounded-md shadow-md font-medium md:text-xl lg:text-md text-slate-100 hover:bg-blue-400 hover:text-slate-900"
            >
              Generate Soal
            </button>
          </div>
          <div className="w-80 h-80 md:w-[35rem] lg:w-80 lg:h-80 p-5 col-span-1 rounded-lg shadow-xl bg-slate-100 grid grid-cols-4 grid-rows-3">
            <div className="col-span-4 col-start-1">
              <p>
                1. Dari Abjad Dibawah Mana Yang Tidak Termasuk Ejaan Dari Nama
                Saya?
              </p>
            </div>
            <div className="col-span-4 grid grid-flow-col grid-cols-2 grid-rows-2">
              <div className="col-span-1">
                <input
                  type="radio"
                  name="answer"
                  id="answerA"
                  className="mr-2"
                />
                <label htmlFor="answerA">A. Q</label>
              </div>
              <div className="col-span-1">
                <input
                  type="radio"
                  name="answer"
                  id="answerB"
                  className="mr-2"
                />
                <label htmlFor="answerB">B. L</label>
              </div>
              <div className="col-span-1">
                <input
                  type="radio"
                  name="answer"
                  id="answerC"
                  className="mr-2"
                />
                <label htmlFor="answerC">C. O</label>
              </div>
              <div className="col-span-1">
                <input
                  type="radio"
                  name="answer"
                  id="answerD"
                  className="mr-2"
                />
                <label htmlFor="answerD">D. E</label>
              </div>
            </div>
            <div className="col-span-4 mt-12">
              <div className="grid grid-cols-2 gap-4">
                <button
                  className="bg-red-600 p-2 border border-white shadow-lg rounded-md font-medium text-lg text-white hover:bg-red-400"
                  type="button"
                >
                  Prev
                </button>
                <button
                  className="bg-blue-600 p-2 border border-white shadow-lg rounded-md font-medium text-lg text-white hover:bg-blue-400"
                  type="button"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
