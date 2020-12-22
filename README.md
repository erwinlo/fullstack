# fullstack
Fintech Fullstack Project

These commands need to be executed in your local pc/laptop:

    1. go to a folder, and right click > git bash
    2. execute: git clone https://github.com/erwinlo/fullstack
    3. go to frontend folder (cd frontend) and run: npm install
    4. go to backend folder (cd backend) and run: npm install

To test whether your setup is working:

    1. Go to frontend folder, and run: npm start
    2. a browser should open up and show our frontend page
    3. go to backend folder, and run: npm start
    4. open a browser and goto (Prof. Bhojan uses port 7000 for backend in pdf): http://localhost:7000/mypage
    5. you should see "I am sending this DATA from backend to Frontend"

To install sql database:

    1. run MySQL command prompt
    2. run: CREATE DATABASE fullstack_db;
    3. run: USE fullstack_db;
    4. run: SOURCE <your folder>\backend\sql\fullstack_db.sql
