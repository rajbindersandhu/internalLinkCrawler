# Internal Link Crawler

## Introduction

The application crawls through the base URL provided by the user and collects all the url with same domain as base url and keeps count for number time each url has appeared on the page.

The application recursively goes throug all the url with same domain and keep capturing all the url on respective pages and keeps updating the count.

## Project setup

 - Clone the project 

 ```
 git clone <PROJECT NAME>
 ```

 - Install all dependencies

 ```
 npm init
 ```

 !!! Congratulation your project is ready to be run ...

 ## Run

 To run the project use 

 ```
 npm run start <BASE URL>
 ```

* Note: pass only one Base URL for starting the crawler. *