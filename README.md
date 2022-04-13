# face-detector

An app where you can register, sign in and submit image urls and have the human faces on the image detected by AI and drawn by bounding boxes.

Written in React, JavaScript, Tachyons (CSS) and deployed on Heroku. 

To run:

1. Clone the project
2. replace all URLs with http://localhost...
3. run <code>npm install</code>
4. run <code>npm start</code>

If the project doesn't start, replace the start command in **package.json** <code>serve -s build</code> with <code>react-scripts start</code>

There are 4 endpoints that are hard-coded to point to the published online back-end API of the app at Heroku. The reason they are hard-coded was that Heroku would (at the time of writing) sometimes fail to pick up the .env variables that were setup when deploying and would stop the site from working.