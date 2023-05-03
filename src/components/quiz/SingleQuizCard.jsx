import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { db } from "../../firebase/firebaseConfig";
import { useAuthCtx } from "../../store/AuthProvider";

function SingleQuizCard({ item }) {
  const { user } = useAuthCtx();
  console.log("item ===", item.userUid.stringValue);
  const { isLoggedIn } = useAuthCtx();
  const toValue = isLoggedIn ? `/quiz/${item?.uid}` : "/login";
  const isYou = item.userUid.stringValue === user?.uid;

  async function delQuiz(quizId) {
    console.log("quizId ===", quizId);
    try {
      const itemRef = doc(db, "quiz", quizId);
      await deleteDoc(itemRef);
      console.log("Item deleted successfully");
      toast.success("Successfully deleted Quiz!");
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Error to delet Quiz!");
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="group flex flex-col items-center px-4 pt-2 pb-5 w-2/3 mb-10 bg-black text-white rounded-full">
        <p className=" text-qxl pb-1">{item.category.stringValue}</p>
        <div className="bg-yellow font-cursive text-black pt-6 pb-3 px-5 rounded-full w-full hover:bg-background">
          <Link to={toValue}>
            <h2 className="bg-black text-white uppercase text-center p-2 rounded-full inline ">{item.name.stringValue}</h2>
            <p className="font-cursive my-5">Questions: {item.numQuestions.stringValue}</p>
            <p className="font-sans">Average result: {item?.completed.integerValue > 0 ? (item?.results.integerValue / item?.completed.integerValue).toFixed(2) : 0}%</p>
          </Link>
          {isYou && (
            <button onClick={() => delQuiz(item.uid)} className="bg-red rounded-lg p-1">
              Delete Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default SingleQuizCard;
