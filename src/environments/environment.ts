// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
 const API_HOST = `https://elaachi-hrm.herokuapp.com/`;
// const API_HOST = 'https://70ad0a3d8a3d.ngrok.io';
export const environment = {
  production: false,
  // firebase: {
  //   apiKey: "AIzaSyDTutrwPGlH9qKhTQV6HIB1cLhE4aDyE7k",
  //   authDomain: "hrm-project-3767e.firebaseapp.com",
  //   databaseURL: "https://hrm-project-3767e-default-rtdb.firebaseio.com",
  //   projectId: "hrm-project-3767e",
  //   storageBucket: "hrm-project-3767e.appspot.com",
  //   messagingSenderId: "687665848911",
  //   appId: "1:687665848911:web:958b18524361032488803a",
  //   measurementId: "G-C807FD9582"
  // }
  BASE_API_URL: `${API_HOST}api/v1`,
  API_HOST
 
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
