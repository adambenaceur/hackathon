import { async } from "@firebase/util";
import axios from "axios";
import {
  collection,
  addDoc,
  getDoc,
  doc,
  query,
  where,
  setDoc,
  updateDoc,
  arrayUnion,
  getDocs,
  limit,
  deleteDoc,
} from "firebase/firestore";

import { db } from "./../../../lib/firebase";
export const resolvers = {
  Query: {
    habits: async (_, args) => {
      try {
        let result = [];
        const q = query(
          collection(db, "DailyHabits"),
          where("userID", "==", args.userID),
          limit(args.frist || 5)
        );

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const habit = doc.data();
          habit.id = doc.id;
          result.push(habit);
        });

        return result;
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    createHabit: async (_, args) => {
      try {
        const docRef = await addDoc(collection(db, "DailyHabits"), {
          userID: args.userID,
          starred: args.starred,
          title: args.title,
          description: args.description,
          habits: [],
        });
        return docRef.id;
      } catch (error) {
        throw error;
      }
    },

    setDailyHabit: async (_, args) => {
      try {
        const formatedDate = new Date(args.date).toISOString().split("T")[0];
        const res = await getDoc(doc(db, "DailyHabits", args.habitId));
        // if (res.data().habits && res.data().habits.length > 0) {
        //   const { habits } = res.data();
        //   const DailyHabit = habits.filter(
        //     (habit) => habit.date === formatedDate
        //   );
        //   if (DailyHabit.length === 0) {
        //     const newHabit = {
        //       id: new Date().getTime(),
        //       date: formatedDate,
        //       done: true,
        //     };
        //     await updateDoc(doc(db, "DailyHabits", args.habitId), {
        //       habits: arrayUnion({
        //         id: new Date().getTime(),
        //         date: formatedDate,
        //         done: true,
        //       }),
        //     });

        //     return "When the habit with older date not exit";
        //   } else {
        //     await updateDoc(doc(db, "DailyHabits", args.habitId), {
        //       habits: {
        //         done: false,
        //       },
        //     });

        //     return "When the habit is updated with older date";
        //   }
        // } else {
        await updateDoc(doc(db, "DailyHabits", args.habitId), {
          habits: arrayUnion({
            id: new Date().getTime(),
            date: formatedDate,
            done: true,
          }),
        });

        //   return "When the habit is  new created";
        // }

        return args.habitId;
      } catch (error) {
        throw error;
      }
    },
    editHabit: async (_, args) => {
      try {
        await updateDoc(doc(db, "DailyHabits", args.habitId), {
          userID: args.userID,
          title: args.title,
          description: args.description,
          starred: args.starred,
        });
        return args.habitId;
      } catch (error) {
        throw error;
      }
    },
    setMood: async (_, args) => {
      try {
        const formatedDate = new Date(args.date).toISOString().split("T")[0];

        await addDoc(collection(db, "DailyMood"), {
          date: formatedDate,
          mood: args.type,
          userID: args.userID,
        });

        // const docRef = await addDoc(collection(db, "DailyMood"), {
        //   type: args.type,
        //   date: formatedDate,
        //   userID: args.userID,
        // });
        return {
          type: args.type,
          date: formatedDate,
        };
      } catch (error) {
        throw error;
      }
    },
    deleteHabit: async (_, args) => {
      try {
        await deleteDoc(doc(db, "DailyHabits", args.habitId));
        return `Habit ID: ${args.habitId} is deleted`;
      } catch (error) {
        throw error;
      }
    },
  },
};
