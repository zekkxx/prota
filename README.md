## Prota
A project management tool for GitHub developers - invite collaborators, develop projects, view sprints, and take on tasks in an agile-inspired service. 

**Created**: `2019 June 09`
Deployed at: https://prota.herokuapp.com/  
Repository: https://github.com/zekkxx/prota  

# Development:
## Project Team:

* Front End Development Team:
    * [Andrew Johnson](https://github.com/adj-dev) - Lead React Developer
    * [John Blake](https://github.com/johniblake) - Lead Engineer
    * [Nhu Richie](https://github.com/nhurichie) - Project Manger/Styles Designer

* Back End Development Team:
    * [Adam Schubert](https://github.com/leavinit) - Route Designer/QA Expert
    * [Kieran Anthony](https://github.com/zekkxx) - Database Architect

## Project Stack:

This project utilizes a __MERN__ stack. 

__M__ ongo : MongoDB , a non-relational database to store our User, Project, Sprint, and Task data. 

__E__ xpress : Express.js, a server framework to manage the flow between our front and back end systems.

__R__ eact : React.js, A UI development framework to handle how our app is displayed

__N__ ode :  Node.js, A Javascript runtime environment that allows for server-side scripting in Javascript


### Dependencies in the project also include:

__mongoose, axios, cookie-parser, and passport__.  
For a full list of dependencies reference the _package.json_ file(s) included in the project.

## Project Installation:
If hosting this application or trying to run it locally please follow these steps after cloning from our repository.
1. You will need __MongoDB__ installed on your machine and will need to be running `mongod` on a terminal.
```
mongod
```
2. Ensure that you have a `.env` file prepared on the root directory of the Prota clone, and include the following fields:
    * GITHUB_CLIENT_ID (From Github)
    * GITHUB_CLIENT_SECRET (From Github)
    * SESSION_SECRET (Your own creation)
3. Then, in a new terminal, you will need to run `npm run start` from the root directory of your Prota clone.  
```
npm run start
```

# Application Preview
In order to use this application, you will need to visit the deploy link referenced above and have a GitHub user account. If you don't have one, you'll need to create one. There is currently no independent login functionality associated with the application.

<img src='https://github.com/adj-dev/final-project/blob/master/client/public/assets/img/Prota.png?raw=true' width=600 />  

**Splash Page**: Has information regarding the development team and features of the application. It also features a login button that utiliizes _Passport_ with a Github authentication strategy to log the user into our application.

<img src='https://github.com/adj-dev/final-project/blob/master/client/public/assets/img/projects-tasks.png?raw=true' width=600 />  

**Profile Page**: This page will allow the user to see all of their active projects in the lefthand column, and all tasks assigned to them in the right. They can filter through their open tasks and even adjust the status of the tasks under their name from this page. They can also create a project by pressing the '+' button next to the project title. By selecting a project they will be moved into the Tasks/Sprints page.

<img src='https://github.com/adj-dev/final-project/blob/master/client/public/assets/img/sprints-tasks.png?raw=true' width=600 />  

**Project Page**: All of a project's sprints are shown in the left-hand column. Selecting one will open the tasks assigned to the sprint in the righthand column. You can also edit a Sprint, and change the sprint's status from this menu. On the right hand side are the sprint's tasks. You can edit these tasks by clicking on them, and adjust the status from the main window. Similar to the projects page, you can create a new sprint or task by clicking the '+' button next to the title.

### Additional Features

**Inviting a user to a Project**: In the event that a user does not have an account with Prota, but has a Github account, you may invite them to the project by typing their Github account name and clicking invite on the pop-up window. This will create a temporary account for them that will hold onto the projects that they are included in until they login to Prota for the first time to see their projects.

**Assigning a user to task**: In order to assign a user to a task, you will need to click on the users icon in the pop-up modal when creating or editing a task. In order to unassign them, simply click on their icon from the same selection list.

### Future Developments

**Project CRUD**: Currently Projects can be created and read, but not updated or deleted. This is in our list of things to implement with our next set of releases.

**Analytics**: We plan to add analytics for all current collections in our database and provide those analytics to the user in the form of graphs and charts.

**Fuzzy Search Updates**: While we have included searches to our database of users using a fuzzy search we haven't done the same yet for the Github user database so that the user isn't reliant upon knowing another users Github username perfectly in the event they aren't on Prota. So while doing that we also plan to add debouncing to our search in order to improve the search experience and reduce searches/calls in the database.
