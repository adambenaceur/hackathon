import { gql } from "@apollo/client";
const SET_DAILY_HABIT = gql`
mutation setDailyHabit($habitId: ID!  $date:String! $userID :ID!) {
    setDailyHabit(habitId:$habitId  , date :$date ,userID :$userID)
  }
`;

export default SET_DAILY_HABIT;