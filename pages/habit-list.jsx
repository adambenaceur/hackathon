import React, { useContext, useState, useEffect, useLayoutEffect } from "react";
import GET_ALL_USER_HABIT from "../lib/apollo/queries/getHabits";
import DELETE_HABIT from "../lib/apollo/mutations/deleteHabit";
import { useMutation, useLazyQuery, useQuery } from "@apollo/client";
import Head from "next/head";
import EditHabit from "../components/EditHabit";
import { Context } from "../context";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useRouter } from "next/router";

function HabitList() {
  const router = useRouter();

  const { state } = useContext(Context);
  const [show, setShow] = useState(false);
  const [habit, setHabit] = useState({});
  const [habitCount, setHabitCount] = useState(5);
  const [deleteHabit] = useMutation(DELETE_HABIT);
  const handleShow = (habit) => {
    setShow(true);
    setHabit(habit);
  };
  const HanldeShowModal = (state) => setShow(state);

  const { loading, error, data } = useQuery(GET_ALL_USER_HABIT, {
    variables: { userID: state?.user?.id, first: habitCount },
  });
  const handleDeleteHabit = (habitId) => {
    deleteHabit(
      { variables: { habitId } },
      {
        refetchQueries: [GET_ALL_USER_HABIT],
      }
    );
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      }
    });
  }, []);

  return (
    <>
      <Head>
        <title>All Habit List | Habit Tracker App</title>
      </Head>
      <div className="container px-5 py-4">
        <p className="h4 text-center border-bottom pb-2">All Habit Lists</p>
        {loading && loading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : null}
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Descriptions</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>

          <tbody>
            {data &&
              data.habits.map((habit, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{++index}</th>
                    <td>
                      {habit.title} {habit.starred && "🌟"}
                    </td>
                    <td>{habit.description}</td>
                    <td>
                      <button
                        onClick={() => handleShow(habit)}
                        className="btn btn-sm btn-light"
                      >
                        ✏️
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-light"
                        onClick={() => handleDeleteHabit(habit.id)}
                      >
                        ❌
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <EditHabit
        habit={habit}
        status={show}
        HanldeShowModal={HanldeShowModal}
      />
    </>
  );
}

export default HabitList;
