import { gql } from "@apollo/client";
const CREATE_NEW_HABIT = gql`
mutation createHabit($title:String!  $description:String! $userID:ID! $starred:Boolean!) {
    createHabit(title:$title  description:$description userID:$userID starred:$starred) 
  }
`;

export default CREATE_NEW_HABIT;