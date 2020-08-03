# Tideman Testing Application

A single-page app that lets you model various combinations for the Tideman problem and review results of the individual steps of the algorithm. The purpose of the application is to allow testing your own implementation in C.

The app also shows an interactive graph of locked pairs, and also shows non-locked pairs that would create circles in red.

Further down the app generates text that you can copy-paste to a data.txt file and feed it to your C code in cs50 IDE to validate your results.

The app is written in Typescript & React. The tideman functions written in Typescript have very similar syntax to C, the code is almost identical, bar some minor syntax details. For future, I am thinking of taking my C implementation, compile it to WebAssembly and use it in the app. This app has no backend, no database, it's purely client-side React, hosted on Netlify.

(c) 2020 Josef Richter
Olomouc, Czech Republic, EU
josef.richter@me.com
