import { gql } from "@apollo/client";
const DELETE_HABIT = gql`
  mutation DeleteHabit($habitId: ID!) {
    deleteHabit(habitId: $habitId)
  }
`;

export default DELETE_HABIT;
