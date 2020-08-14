# aimily

## **Aimily**

### An app for setting goals and making sure you achieve them

#### Database schema

![database schema](images/database_schema.jpg)

##### You will need to create 2 tables, the instructions are inside /model/aimily_tables_v2.sql

##### 1. "users" table it stores user's name and email and automatically adds an ID

![users](images/users.png)

##### 2. "goals" table, it stores the following infomration: goal, deadline, description and the userId that created the goal

![goals](images/goals.png)

#### Routes

Add new pic
![routes](/images/routesv2.png)

##### Please check routes/users.js for the backend routes, there are only POST and GET methods since I didn't need others for now

#### User flow

![user flow](images/user_flow.jpg)

##### The users incerts their name and email, presses "next" button and ideally it should lead to the next page (but I didn't have time to create componets and couldn't figure out how to do it with CSS) and there the user inputs information about their goal. Once they click "Let's get started" button, the final screen appears - telling them what their goal is and by when they want to acieve it. One of the features you can try to add is show the user not only the last goal, but also their previous goals. If you want, you can separate 3 screens into 3 components, I started "Step 1" for the first screen but didn't get to finish it

_Very excited!_
:smile:

_This is a student project that was created at [CodeOp](http://codeop.tech), a full stack development bootcamp in Barcelona._
