import { gql } from "@apollo/client";
const GET_ALL_USER_HABIT = gql`
  query GetHabits($userID: String!, $first: Int!) {
    habits(userID: $userID, first: $first) {
      title
      id
      description
      starred
      habits {
        date
        done
        id
      }
    }
  }
`;
export default GET_ALL_USER_HABIT;
