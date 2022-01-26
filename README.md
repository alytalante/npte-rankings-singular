

<p align="center">
<img src='https://i.imgur.com/7YUS9mM.png?1' alt='project home page' width='400'>
    </p>

<h1> Overview: </h1>

A full-stack project to display the current rankings for collegiate debate teams competing in the NPTE format.

The application includes a basic front-end to display points for competitors and coaches. It features pagination and dynamic routing for each team. The app also features a data-entry front-end that allows NPTE staff to enter data provided from debate tournament directors. The back-end uses a REST API to perform basic CRUD operations and interface with a MongoDB database.

<h1>Technologies</h1>

<ul>
  <li> HTML5
  <li> CSS
  <li> Javascript(ES6)
  <li> React
  <li> Node.js
  <li> Express
  <li> ChartJS
  <li> Mongoose
  <li> MongoDB
  <li> Git
  <li> Github 
</ul>

<h1>Approach Taken:</h1>

Since this project was designed for the National Parliamentary Tournament of Excellence, the goal was to create a simple and user friendly display to allow competitors, coaches, and tournamenmt adminstrators to quickly reference point totals per team. Additionally, the data-entry side of the application was designed to be straightforward, allowing for POST and PATCH requests to the API. 

<h1>What I learned:</h1>

This was one of my earliest projects working with NODE to make a REST API capable of CRUD operations. I had worked previously with 3rd party APIs, but this required me to understand how to develope my own as well as how to connect to a database. 

If I work to go back and rework the application from scratch, I would focus on performing more data operations server-side rather than client-side. I would also dive a bit deeper into best practices for constructing data-entry forms. This form is functional, but in the future I will aim for optimal. 


<h1>Code Samples, Visuals, and Features:</h1>

1. The homepage displays current rankings for NPTE debaters based on the points algorithm specified by the National Parliamentary Tournament of Excellence. This algorithm can be found  <a href='https://www.nptedebate.org/rules#article-i-section-4'> here </a>. This algorithm was converted to a function to allow the display of points in line with tournament guidelines. 

<label>Algorithm Code:</label>

```javascript 
    function calculatePoints(w, l, place, elims) {
    //convert values to int
    let wins = parseInt(w);
    let losses = parseInt(l);
    let breakpoints = 0;

    //calculate points from win percentage //
    let rounds = wins + losses;
    let raw = wins / rounds;
    let mult = raw * 2;

    //calculate win/loss points//
    let num1 = wins * 0.25;
    let num2 = losses * 0.25;

    //award two points for clearing
    if (wins > losses || place !== "0") {
      breakpoints = 2;
    }

    //Calculate prelim score and add 2 if broke
    let prelimScore = mult + num1 + breakpoints - num2;

    //get elim number and determine partial modifier

    let eNum = currentTourn.elimNumber;

    let mod = 0;
    if (eNum > 1) {
        mod = Math.pow(2, eNum - 1);
    } else if (eNum === 1) {
        mod = 1;
    }

    let partialModifier = currentTourn.partialFraction;

    let decimalMod = partialModifier / mod;

    //determine how many elims the team won

    let elimPoints = 0;
    let roundMod = 0.8;

     let subNum = place - 1

    for (let i = 0; i < eNum - subNum; i++){
      roundMod = roundMod + 0.2;
      elimPoints = elimPoints + roundMod;
    }

    let modDeduction = 0;

    if (decimalMod !== 0) {
      modDeduction = 1 - decimalMod;
    }

    if (elimPoints + prelimScore === 0 || elimPoints + prelimScore < 0) {
      setPoints({ points: 0 });
    } else {
      if (elimPoints > 0) {
        setPoints({
          points: prelimScore + elimPoints - modDeduction,
          prelimPs: prelimScore,
          elimPs: elimPoints - modDeduction,
        });
      } else if (elimPoints === 0) {
        setPoints({ points: prelimScore, prelimPs: prelimScore });
      }
    }}
```
    
<label> Dynamically rendered data: </label> <br>
<p align="center">
<img src='https://i.imgur.com/OV2ae39.png' alt='project home page' width='600'>
    </p>

2. Dynamic routing for individual teamas to display the points for each particular team. This displays not only point total, but tournament specific win/loss data as well as points. 

<p align="center">
<img src='https://i.imgur.com/oow23Cc.png' alt='project home page' width='600'>
    </p>

3. The project aslo features a data-entry panel to allow NPTE admins to update points, create new tournament schemas within the database, and to enter new teams into the database. 


<p align="center">
<img src='https://i.imgur.com/y21KnJX.png' alt='project home page' width='600'>
</p>

