import { gql } from "@apollo/client";
const EDIT_HABIT = gql`
mutation DeleteHabit(
    $habitId: ID!
    $title: String!
    $description: String!
    $userID: ID!
    $starred: Boolean!
  ) {
    editHabit(
      habitId: $habitId
      title: $title
      description: $description
      userID: $userID
      starred: $starred
    )
  }
`;

export default EDIT_HABIT;



