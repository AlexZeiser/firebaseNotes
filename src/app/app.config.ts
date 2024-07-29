import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"danotes-12694","appId":"1:181428849814:web:202a0d895b3252105006b7","storageBucket":"danotes-12694.appspot.com","apiKey":"AIzaSyAHvPJbV1zMChrk8gp9VdhOoBl7A-hI8iQ","authDomain":"danotes-12694.firebaseapp.com","messagingSenderId":"181428849814"}))), 
    importProvidersFrom(provideFirestore(() => getFirestore()))]
};
