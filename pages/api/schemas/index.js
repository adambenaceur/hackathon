import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type User {
    id: ID
    login: String
    avatar_url: String
  }
  enum MoodTypes {
    Dizzy
    Frown
    FrownOpen
    GrinHearts
    Laugh
    Meh
    Smile
  }
  type DayHabit {
    date: String!
    done: Boolean!
    id: ID!
  }
  type Habit {
    id: String!
    description: String
    title: String!
    habits(
      after: String
      before: String
      first: Int
      last: Int
      skip: Int
    ): [DayHabit!]
    starred: Boolean!
  }
  type Mood {
    date: String!
    type: MoodTypes!
  }
  type Query {
    habits(userID: String!, first: Int!): [Habit!]
  }
  type Mutation {
    createHabit(
      title: String!
      description: String!
      starred: Boolean!
      userID: ID!
    ): String
    setDailyHabit(habitId: ID!, date: String!, userID: ID!): String
    deleteHabit(habitId: ID!): String
    editHabit(
      habitId: ID!
      title: String
      description: String
      starred: Boolean
      userID: ID!
    ): String
    setMood(date: String, type: MoodTypes!, userID: String!): Mood
  }
`;

//     import { gql } from "apollo-server-micro";

// export const typeDefs = gql`

//   query me {
//     me {
//       name
//       email
//       pushToken
//       id
//       isPro
//     }

//     moods(first: 5, orderBy: date_DESC) {
//       id
//       type
//       date
//     }
// habits(first: 5) {
//   title
//   description
//   starred
//   habits(first: 5, orderBy: date_DESC) {
//     id
//     date
//     done
//   }
// }
//   }

//   query getHabits {
//     habits {
//       id
//       title
//       description
//       habits {
//         id
//         done
//         date
//       }
//     }
//   }

//   query myMoods {
//     moods(
//       where: { date_gte: "2019-03-01", date_lte: "2019-03-30" }
//       orderBy: date_ASC
//     ) {
//       id
//       type
//       date
//     }
//   }

//   //For changing the date for the current month + refreshing

//   this.props.data.stopPolling();
//   await this.props.data.refetch({
//     start,
//     end
//   });
//   this.props.data.startPolling(5000);`;
