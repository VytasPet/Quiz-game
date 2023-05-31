import React from "react";
import { db } from "../../firebase/firebaseConfig";
import SingleQuizCard from "../quiz/SingleQuizCard";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuthCtx } from "../../store/AuthProvider";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import arrL from "/src/assets/images/arrow-leftback.svg";
import cate from "/src/assets/images/1quizlog.svg";
import awardM from "/src/assets/images/awardmedalblue.svg";
import notF from "/src/assets/images/Group 34notfoung.svg";
import start from "/src/assets/images/Group 13start.svg";

function MyQuizPage() {
  const { user, isLoggedIn } = useAuthCtx();
  const quizCollRef = collection(db, "quiz");
  const usersCollRef = collection(db, "users");
  const [value, loading, error] = useCollection(quizCollRef);
  const [valueInfo, loadingInfo, errorInfo] = useCollection(usersCollRef);
  const [arrToShow, setArr] = useState([]);
  const [arrFiltered, setArrFilt] = useState([]);
  const [loadingToast, setloadingToast] = useState(null);
  const [areSure, setareSure] = useState(false);
  const navigate = useNavigate();
  const [userUserName, setuserUserName] = useState("");
  const [activeFilter, setactiveFilter] = useState("show all");
  const [QuizUrl, setQuizUrl] = useState({});
  const [areSureDel, setareSureDel] = useState(false);

  console.log("user ===", user);

  let arrK = arrToShow;

  useEffect(() => {
    if (loading) {
      setloadingToast(toast.loading("Loading..."));
    } else {
      toast.dismiss(loadingToast);
    }
  }, [loading]);

  useEffect(() => {
    let arrK;
    if (value) {
      //console.log("value.docs.data ===", value.docs[0]._document.data.value.mapValue.fields);
      arrK = value.docs;
      // console.log("arrK ===", arrK);
      arrK = arrK.map((doc) => ({ uid: doc.id, ...doc._document.data.value.mapValue.fields }));
      // console.log("userio ===", user.uid);
      const myQuiz = arrK.filter((quiz) => quiz.userUid.stringValue === user.uid);
      // console.log("myQuiz ===", myQuiz);
      setArr(myQuiz);
      setArrFilt(myQuiz);
    }
  }, [value]);

  useEffect(() => {
    if (valueInfo) {
      let searchIt = valueInfo.docs;
      console.log("searchIt ===", searchIt);
      searchIt = searchIt.find((doc) => doc._document.data.value.mapValue.fields.userUid.stringValue == user.uid);
      //console.log("value.docs.data ===", value.docs[0]._document.data.value.mapValue.fields);
      console.log("searchIt ===", searchIt._document.data.value.mapValue.fields.username);
      setuserUserName(searchIt._document.data.value.mapValue.fields.username.stringValue);
    }
  }, [valueInfo]);
  function openQuiz(uid) {
    setareSure(!areSure);
    setQuizUrl(uid);
  }

  async function deleteQuiz(quizId) {
    // console.log("quizId ===", quizId);
    try {
      const itemRef = doc(db, "quiz", quizId);
      await deleteDoc(itemRef);
      // console.log("Item deleted successfully");
      toast.success("Successfully deleted Quiz!");
    } catch (error) {
      // console.error("Error deleting item:", error);
      toast.error("Error to delet Quiz!");
    }
  }

  // console.log("arrK ===", arrK);

  function filterWord(word) {
    setactiveFilter(word);
    console.log("word ===", word);
    // console.log("bum ===", bum);
    if (word === "show all") {
      // console.log("bum ===", bum);
      setArrFilt(arrToShow);
    } else {
      setArrFilt(arrToShow.filter((quiz) => quiz.category.stringValue === word));
    }
    console.log("arrFiltered ===", arrFiltered);
  }

  //   useEffect(() => {}, [third]);

  //   const shopsWithUid = value && value.docs.map((doc) => ({ uid: doc.id, ...doc.data() }));

  return (
    <div className="full">
      <div className={`${areSure ? "blur-[5px]" : ""} mx-auto max-w-5xl`}>
        <div className=" mt-[35px] px-[30px]">
          <img className="cursor-pointer" onClick={() => window.history.back()} src={arrL} alt="" />
          <h3 className="text-center mb-[30px]">My quiz</h3>
        </div>
        <div className="flex justify-center">
          <div className="max-w-full bg-lightBlue rounded-[16px] mb-[30px] p-1 flex justify-between items-center max-[380px]:text-[9px] max-[960px]:text-[13px] min-[780px]:w-2/3">
            <button
              onClick={() => filterWord("show all")}
              to={"/login"}
              className={`${activeFilter === "show all" ? "bg-blue text-white z-10" : ""} px-[45px] text-grey py-[13px] max-md:px-[20px] max-w-full rounded-[16px] z-10 hover:text-black`}
            >
              Show all
            </button>
            <button
              onClick={() => filterWord("geography")}
              className={`${activeFilter === "geography" ? "bg-blue text-white z-10" : ""} px-[45px] text-grey py-[13px] max-md:px-[20px] max-w-full rounded-[16px] z-10 hover:text-black`}
            >
              Geography
            </button>
            <button
              onClick={() => filterWord("sports")}
              className={`${activeFilter === "sports" ? "bg-blue text-white z-10" : ""} px-[45px] text-grey py-[13px] max-md:px-[20px] max-w-full rounded-[16px] z-10 hover:text-black`}
            >
              Sports
            </button>
            <button
              onClick={() => filterWord("history")}
              className={`${activeFilter === "history" ? "bg-blue text-white z-10" : ""} px-[45px] text-grey py-[13px] max-md:px-[20px] max-w-full rounded-[16px] z-10 hover:text-black`}
            >
              History
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center ">
          {/* One card */}

          {value && (
            <TransitionGroup className="w-full flex flex-col items-center">
              {arrFiltered.map((obj, i) => (
                <CSSTransition key={i} timeout={500} classNames="fade">
                  <div onClick={() => openQuiz(obj)} className={`bg-white cursor-pointer p-[20px] rounded-[20px] flex gap-5 mt-[25px] w-2/3 max-md:w-full`}>
                    <img className="bg-lightBlue p-[15px] rounded-[20px]" src={cate} alt="" />
                    <div className="flex flex-col w-full">
                      <h3 className="text-[20px] mb-[20px] font-light text-center">{obj.name.stringValue}</h3>
                      <div className="flex flex-col w-full gap-2 items-start justify-around">
                        <p className="text-[15px]">{obj.category.stringValue.charAt(0).toUpperCase() + obj.category.stringValue.slice(1)}</p>
                        <p className="text-[12px] font-bold">{obj.public ? "Public" : "Private"}</p>
                        <div className="flex w-full justify-between">
                          <h5 className="text-[10px] text-grey">
                            <span className="font-bold">Code: </span>
                            {obj.uid.slice(0, 5)}
                          </h5>
                          <div className="flex flex-row items-center  max-[450px]:flex-col gap-4 max-[450px]:gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setQuizUrl(obj);
                                setareSureDel(true);
                              }}
                              className="bg-lightRed rounded-[20px] px-5 py-2 text-[10px] text-white hover:outline hover:outline-black"
                            >
                              Delete
                            </button>
                            <p className=" text-[10px] text-grey font-bold pr-[20px]">
                              <span>
                                <img className="inline " src={awardM} alt="" />
                              </span>{" "}
                              {obj.completed.integerValue == 0 && "New"}
                              {obj.completed.integerValue > 0 && (obj.results.integerValue / obj.completed.integerValue).toFixed(2) + "%"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CSSTransition>
              ))}
            </TransitionGroup>
          )}

          {/* One card End */}
        </div>
      </div>
      {areSure && (
        <div className="statsMid  flex flex-col items-center">
          <img src={start} alt="" />
          <h2 className="text-black text-[20px] mb-[20px] font-normal">Are you ready to start quiz:</h2>
          <h2 className="text-blue text-[24px] mb-[20px] font-light">{QuizUrl.name.stringValue}</h2>

          <button
            onClick={() => navigate(`/quiz/${QuizUrl.uid}`)}
            className="bg-blue p-[6px] cursor-pointer mt-[30px] text-white w-full max-w-[400px] rounded-[20px] flex justify-center hover:text-grey hover:border-white "
          >
            Start
          </button>

          {/* <p className="border-y py-2 w-full">Your ranking: {position}</p>
<p className="border-y py-2 w-full">Created Quiz: {useris.created}</p>
<p className="border-y py-2 w-full">Quiz Completed: {useris.completed}</p>
<p className="border-y py-2 w-full">Average result: {(Number(useris.result) / Number(useris.completed > 1 ? useris.completed : 1)).toFixed(2)}%</p>
*/}

          <div
            onClick={() => setareSure(!areSure)}
            className="bg-white p-[6px] border-2 cursor-pointer border-lightGray mt-[10px] text-black w-full max-w-[400px] rounded-[20px] flex justify-center hover:outline-4 hover:border-blue "
          >
            <p>Back</p>
          </div>
        </div>
      )}
      {areSureDel && (
        <div className="statsMid flex flex-col items-center">
          <img src={notF} alt="" />
          <h2 className="text-[20px] text-red mb-[20px] font-normal">Are you sure want delete quiz:</h2>
          <h2 className="text-blue text-[24px] mb-[20px] font-light">{QuizUrl?.name?.stringValue}</h2>

          <button
            onClick={() => deleteQuiz(QuizUrl.uid)}
            className="bg-red p-[6px] cursor-pointer mt-[30px] text-white w-full max-w-[400px] rounded-[20px] flex justify-center hover:outline hover:outline-black "
          >
            Delete
          </button>

          {/* <p className="border-y py-2 w-full">Your ranking: {position}</p>
<p className="border-y py-2 w-full">Created Quiz: {useris.created}</p>
<p className="border-y py-2 w-full">Quiz Completed: {useris.completed}</p>
<p className="border-y py-2 w-full">Average result: {(Number(useris.result) / Number(useris.completed > 1 ? useris.completed : 1)).toFixed(2)}%</p>
*/}

          <div
            onClick={() => setareSureDel(false)}
            className="bg-white p-[6px] border-2 cursor-pointer border-lightGray mt-[10px] text-black w-full max-w-[400px] rounded-[20px] flex justify-center hover:outline-4 hover:border-blue "
          >
            <p>Back</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyQuizPage;

// import React from "react";
// import { db } from "../../firebase/firebaseConfig";
// import SingleQuizCard from "../quiz/SingleQuizCard";
// import { useCollection } from "react-firebase-hooks/firestore";
// import { collection, deleteDoc, doc } from "firebase/firestore";
// import { useState } from "react";
// import { useEffect } from "react";
// import toast from "react-hot-toast";
// import { useAuthCtx } from "../../store/AuthProvider";
// import { Link } from "react-router-dom";

// function QuizsPage() {
//   const quizCollRef = collection(db, "quiz");
//   const [value, loading, error] = useCollection(quizCollRef);
//   const [arrToShow, setArr] = useState([]);
//   const [arrFiltered, setArrFilt] = useState([]);
//   const [loadingToast, setloadingToast] = useState(null);
//   const { user } = useAuthCtx();

//   useEffect(() => {
//     if (loading) {
//       setloadingToast(toast.loading("Loading..."));
//     } else {
//       toast.dismiss(loadingToast);
//     }
//   }, [loading]);

//   useEffect(() => {
//     let arrK;
//     if (value) {
//       //console.log("value.docs.data ===", value.docs[0]._document.data.value.mapValue.fields);
//       arrK = value.docs;
//       // console.log("arrK ===", arrK);
//       arrK = arrK.map((doc) => ({ uid: doc.id, ...doc._document.data.value.mapValue.fields }));
//       // console.log("userio ===", user.uid);
//       const myQuiz = arrK.filter((quiz) => quiz.userUid.stringValue === user.uid);
//       // console.log("myQuiz ===", myQuiz);
//       setArr(myQuiz);
//       setArrFilt(myQuiz);
//     }
//   }, [value]);

//   function filterWord(word) {
//     const bum = word.target.innerHTML.toLowerCase();
//     // console.log("bum ===", bum);
//     if (bum === "show all") {
//       // console.log("bum ===", bum);
//       setArrFilt(arrToShow);
//     } else {
//       setArrFilt(arrToShow.filter((quiz) => quiz.category.stringValue === bum));
//     }
//   }

//   //   const shopsWithUid = value && value.docs.map((doc) => ({ uid: doc.id, ...doc.data() }));

//   return (
//     <div className="mt-20 box-border">
//       <h1 className="text-5xl mb-20">Active Quiz List</h1>
//       <div className="text-left fixed">
//         <h2 className="text-2xl mb-3">Filters:</h2>
//         <div className="flex flex-col items-start">
//           <button onClick={filterWord} className="border p-3 mb-1 rounded-full inline hover:bg-yellow">
//             Show all
//           </button>
//           <button onClick={filterWord} className="border p-3 mb-1 rounded-full inline hover:bg-yellow">
//             Sports
//           </button>
//           <Link onClick={filterWord} className="border p-3 mb-1 rounded-full inline hover:bg-yellow">
//             Geography
//           </Link>
//           <Link onClick={filterWord} className="border p-3 mb-1 rounded-full inline hover:bg-yellow">
//             History
//           </Link>
//         </div>
//       </div>
//       {value && arrFiltered.length < 1 && <h2>Sorry, there are no quiz...</h2>}
//       {value && arrFiltered.map((quiz) => <SingleQuizCard key={quiz.uid} item={quiz} />)}
//     </div>
//   );
// }

// export default QuizsPage;
