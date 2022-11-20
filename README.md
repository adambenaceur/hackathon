# Habit Tracker App

## About

Habit Tracker is user friendly habit tracking Web based application. User can register for his account , add his habits and track his habits for whole month.

## Technology Used

- NextJs (Frontend )
- GraphQL-NextJS API (Backend)
- Firebase (Database)
- Authunteication (Firebase)

## How to use

A New user can register his account and login to portal. Then A User can add his habits to portal and select daily complete habits by double clicking on date of month. Complete habit will be marked as green and pending habits shown in gray color. User only selects current and privios days of the month. Upcomming days of month are disabled that can't be marked as completed.

### To run locallay

Download source code of this project and install dependency by running
`npm instal`

    or

    `yarn`

After installing dependency run
`npm run dev`
to start development server. For productions server create build of project by running
`npm run build`
and then run `npm start`

## GraphQL Backend

Created Graphql server usign Nextjs's API routes feature.

- _Query_

1.  **habits** Query to fetch all habits from backend.

- _Mutation_

1.  **createHabit** to create new habit entry in database.

2.  **setDailyHabit** to setDaily Habit of user

3.  **editHabit** to Edit title , description and starred property of habit.

4.  **deleteHabit** to delete habit of user.

### Database

For storing data , Firebase firestore is used. Firebase is cloud service provider which offers multiple cloud services. Firestore is NOSql database.

### Authentications

For Authentication, Firebase Auth service is used to authenticate users and save users for future.

