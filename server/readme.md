# How to setup your server:

## Setting up firebase

1. Create firebase project at https://firebase.google.com/
2. Activate firestore on project
3. Activate authentication with email and password (or choose whatever you want and edit the source code)
4. Set up billing profile and plan choose the Blaze plan (don't worry, you won't exceed the minimium limit for generating payments over 0 NOK)
5. Install `npm i firebase-tools -g`
6. Run `firebase login`
7. Run `firebase init firestore`
8. Add a config.ts and serviceAccount.json file in the [./keys](https://github.com/MathiasWP/Webutvikling-Prosjekt/tree/master/server/keys) directory.
   - config.ts: Export be the firebaseConfig object that you get (https://firebase.google.com/docs/web/setup#config-object)
   - serviceAccount.json: Must be the json file that you can download under "Service Accounts" on the "Settings" page of your firebase project.

## Starting server

Run `npm start`
