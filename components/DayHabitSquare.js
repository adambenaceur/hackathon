import { useMutation } from "@apollo/client";
import { useContext } from "react";
import SET_DAILY_HABIT from "../lib/apollo/mutations/setDailyHabit";
import GET_ALL_USER_HABIT from "../lib/apollo/queries/getHabits";
import { Context } from "./../context";

function DayHabitSquare({ day, habitId }) {
  const { done, disabled } = day;
  const { state, dispatch } = useContext(Context);

  const [setDailyHabit] = useMutation(SET_DAILY_HABIT, {
    refetchQueries: [GET_ALL_USER_HABIT],
  });

  const handleSetHabit = () => {
    if (done) {
      return;
    }
    if (disabled) {
      return;
    }
    setDailyHabit({
      variables: {
        habitId,
        date: day.date,
        done: !done,
        userID: state.user.id,
      },
    });
  };
  let bg;
  let cursorStyle;
  if (disabled) {
    bg = "white";
    cursorStyle = "not-allowed";
  } else if (done) {
    bg = "green";
    cursorStyle = "default";
  } else {
    bg = "gray";
    cursorStyle = "pointer";
  }

  return (
    <div
      style={{
        border: `1px solid gray`,
        width: "40px",
        height: "40px",
        display: "flex",
        justifyContent: "center",
        alignContent: "center ",
        fontSize: "20px",
        background: bg,
        color: day.done ? "white" : "black",
        margin: "3px",
        cursor: cursorStyle,
      
      }}
    >
      <p onDoubleClick={handleSetHabit}>{new Date(day.date).getDate()} </p>
    </div>
  );
}

export default DayHabitSquare;
