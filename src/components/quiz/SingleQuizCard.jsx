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
    <div className="flex flex-col items-center max-sm:pl-10">
      <div className="group flex flex-col items-center px-4 pt-2 pb-5 w-2/3 mb-10 bg-black text-white rounded-full max-sm:rounded-lg max-sm:pt-1 max-sm:pb-2 max-sm:px-1 max-sm:mb-5">
        <p className=" text-qxl pb-1 max-sm:text-md">{item.category.stringValue}</p>
        <div className="bg-yellow font-cursive text-black pt-6 pb-3 px-5 rounded-full w-full hover:bg-background max-sm:pt-3 max-sm:pb-1">
          <Link to={toValue}>
            <h2 className="bg-black text-white uppercase text-center p-2 rounded-full inline max-sm:bg-transparent max-sm:text-black max-sm:text-sm">{item.name.stringValue}</h2>
            <p className="font-cursive my-5 max-sm:text-xs max-sm:my-3">Questions: {item.numQuestions.stringValue}</p>
            <p className="font-sans max-sm:text-xs">Average: {item?.completed.integerValue > 0 ? (item?.results.integerValue / item?.completed.integerValue).toFixed(2) : 0}%</p>
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
