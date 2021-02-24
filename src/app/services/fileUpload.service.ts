// import { HttpClient } from "@angular/common/http";
// import { Injectable } from "@angular/core";
// import { Observable, throwError } from 'rxjs';
// import { catchError, map } from 'rxjs/operators';

// @Injectable({
//     providedIn: 'root'
//   })
//   export class FileUploadService {

//     constructor(private httpClient: HttpClient) {}

//     postFile(fileToUpload: File): Observable<boolean> {
//         const endpoint = 'your-destination-url';
//         const formData: FormData = new FormData();
//         formData.append('fileKey', fileToUpload, fileToUpload.name);
//         return this.httpClient
//           .post(endpoint, formData, { headers: yourHeadersConfig })
//           .pipe(map(() => { return true; }))
//           .pipe(catchError(this.errorHandler));
//     }
//   }