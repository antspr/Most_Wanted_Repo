"use strict"


//Menu functions.
//Used for the overall flow of the application.
/////////////////////////////////////////////////////////////////
//#region 

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      // TODO: search by traits,, add functionality to select known trait of list
      let searchBy = promptFor("Enter your search terms: '\r\n'1 for height '\r\n'2 for weight '\r\n'3 for gender '\r\n'4 for occupation '\r\n'5 for eye color  '\r\n'6 for multiple traits.  ", numerical);
      switch(searchBy){
        case '1':
          let heightMatch = searchHeight(people)
          var peopleWithMatch = heightMatch.map(function(eMatch){
            return (" " + eMatch.firstName + " " + eMatch.lastName)
          })
        alert(peopleWithMatch)
        break;
        case '2':
          let weightMatch = searchWeight(people)
          var peopleWithMatch = weightMatch.map(function(eMatch){
            return (" " + eMatch.firstName + " " + eMatch.lastName)
          })
        alert(peopleWithMatch)
        break;
        case '3':
          let genderMatch = searchGender(people)
          var peopleWithMatch = genderMatch.map(function(eMatch){
            return (" " + eMatch.firstName + " " + eMatch.lastName)
          })
        alert(peopleWithMatch)
        break;
        case '4':
          let occupationMatch = searchOccupation(people)
          peopleWithMatch = occupationMatch.map(function(eMatch){
            return (" " + eMatch.firstName + " " + eMatch.lastName)
          })
        alert(peopleWithMatch)
        break;
        case '5':
          let eyeMatch = searchByEyeColor(people)
          var peopleWithMatch = eyeMatch.map(function(eMatch){
            return (" " + eMatch.firstName + " " + eMatch.lastName)
          })
        alert(peopleWithMatch)
        break;
        case '6':
          let multiMatch = searchMultipleTraits(people, searchHeight, searchWeight, searchGender, searchOccupation, searchByEyeColor)
          var peopleWithMatch = multiMatch.map(function(eMatch){
            return (" " + eMatch.firstName + " " + eMatch.lastName)
          })
        alert(peopleWithMatch)
      }
       break;
      //WANTtODO:loop traits...
    case 'no':

      default:
    app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people)  
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){
   
  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = promptFor("Found " + person[0].firstName + " " + person[0].lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", autoValid).toLowerCase();

  switch(displayOption){
    case "info":
    // TODO: get person's info
    alert("First name: " + person[0].firstName + "\r\n" + 
      "Last name: " + person[0].lastName + "\r\n" +
      "Gender: " + person[0].gender + "\r\n" +
      "DOB: " + person[0].dob + "\r\n" +
      "Height: " + person[0].height + "\r\n" +
      "Weight: " + person[0].weight + "\r\n" +
      "Eye color: " + person[0].eyeColor + "\r\n" +
      "Occupation: " + person[0].occupation);
    break;
    case "family":
    // TODO: get person's family
          /* For Parent: find variables in parent
          for siblings: search all of people for same parent
          for spouse: currentSpouse
          for children: find all parent that match ID of person wanted*/
    returnFamily(person, people)
    break;
    case "descendants":
    // TODO: get person's descendants
    let children = searchChildren(person, people);
    for (let i = 0; i < children.length; i ++){
      alert("A descendant is " + children[i].firstName + " " + children[i].lastName)
    } 
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

//#endregion

//Filter functions.
//Ideally you will have a function for each trait.
/////////////////////////////////////////////////////////////////
//#region 

//nearly finished function used to search through an array of people to find matching first and last name and return a SINGLE
//  person object.
function searchByName(people){
  let firstName = promptFor("What is the person's first name?", autoValid).toLowerCase();
  let lastName = promptFor("What is the person's last name?", autoValid).toLowerCase();

  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.firstName.toLowerCase() === firstName && potentialMatch.lastName.toLowerCase() === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person single person object using the name they entered.
  return foundPerson;
}

//****Finished****unfinished function to search through an array of people to find matching eye colors. Use searchByName as reference.
function searchByEyeColor(people){
  let eyeColor = promptFor("What is the person's eye color?", autoValid);

  let foundEyeColor = people.filter(function(potentialMatch){
    if(potentialMatch.eyeColor.toLowerCase() === eyeColor.toLowerCase()){
      return true;
    }
    else{
      return false;
    }
  })
  return foundEyeColor;
}

//TODO: add other trait filter functions here.
function searchGender(people){
  let gender = promptFor("What is the person's gender?", autoValid);

  let foundGender = people.filter(function(potentialMatch){
    if(potentialMatch.gender.toLowerCase() === gender.toLowerCase()){
      return true;
    }
    else{
      return false;
    }
  })
  return foundGender;
}
function searchOccupation(people){
  let occupation = promptFor("What is the person's occupation?", autoValid);

  let foundOccupation = people.filter(function(potentialMatch){
    if(potentialMatch.occupation === occupation){
      return true;
    }
    else{
      return false;
    }
  })
  return foundOccupation;
}
function searchHeight(people){
  let height = promptFor("What is the person's height?", autoValid);

  let foundHeight = people.filter(function(potentialMatch){
    if(potentialMatch.height == height){
      return true;
    }
    else{
      return false;
    }
  })
  return foundHeight;
}
function searchWeight(people){
  let weight = promptFor("What is the person's Weight?", autoValid);

  let foundWeight = people.filter(function(potentialMatch){
    if(potentialMatch.weight == weight){
      return true;
    }
    else{
      return false;
    }
  })
  return foundWeight;
}
function searchCurrentSpouse(people){
  let CurrentSpouse = promptFor("What is the person's CurrentSpouse?", autoValid);

  let foundCurrentSpouse = people.filter(function(potentialMatch){
    if(potentialMatch.CurrentSpouse === CurrentSpouse){
      return true;
    }
    else{
      return false;
    }
  })
  return foundCurrentSpouse;
}

//Filter function for "family"

function searchParents(person, people){
  let parent;
  parent = people.filter(function(potentialParent){
    if(potentialParent.id === person[0].parents[0] || potentialParent.id === person[0].parents[1]){
      return true;
    }
    else{
      return false;
    }
  })
  return parent
}


function searchSpouse(person, people){
  let spouse;
  spouse = people.filter(function(potentialSpouse){
    if (potentialSpouse.id === person[0].currentSpouse){
      return true;
    }
    else{
      return false;
    }
  })
  return spouse
}

function searchChildren(person,people) {
  let children;
  children = people.filter(function(potentialChild){
    if (potentialChild.parents[0] === person[0].id || potentialChild.parents[1] === person[0].id  ){
      return true
    }
    else{
      return false
    }
  })
  return children
}

// Search multiple traits
function searchMultipleTraits(people, searchHeight, searchWeight, searchGender, searchOccupation, searchByEyeColor) {
  let peopleToRemoveList = [];
  let heightList = searchHeight(people);
  peopleToRemoveList = heightList.filter(function(el){
    if( el in people){
      return true;
    }
    else{
      return false;
    }
  });
  let weightList = searchWeight(people);
  peopleToRemoveList = weightList.filter(function(el){
    if( el in people){
      return true;
    }
    else{
      return false;
    }
  });
  let genderList = searchGender(people);
  peopleToRemoveList = genderList.filter(function(el){
    if( el in people){
      return true;
    }
    else{
      return false;
    }
  });
  let occupationList = searchOccupation(people);
  peopleToRemoveList = occupationList.filter(function(el){
    if( el in people){
      return true;
    }
    else{
      return false;
    }
  });
  let eyeColorList = searchByEyeColor(people);
  peopleToRemoveList = eyeColorList.filter(function(el){
    if( el in people){
      return true;
    }
    else{
      return false;
    }
  });
  return peopleToRemoveList;
  
  
}


function returnFamily(person, people){
  //Finds parents
  let parents = searchParents(person, people);
  for (let i = 0; i < parents.length; i ++){
    alert("Parent is " + parents[i].firstName + " " + parents[i].lastName)
  }
  //Find spouse
  let spouse = searchSpouse(person, people);
  alert("Spouse is " + spouse[0].firstName + " " + spouse[0].lastName)
  //Find children
  let children = searchChildren(person, people);
  for (let i = 0; i < children.length; i ++){
    alert("Child is " + children[i].firstName + " " + children[i].lastName)
  }
}
  
//#end region

//Display functions.
//Functions for user interface.
/////////////////////////////////////////////////////////////////
//#region 

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  // TODO: finish getting the rest of the information to display.
  alert(personInfo);
}

//#endregion



//Validation functions.
//Functions to validate user input.
/////////////////////////////////////////////////////////////////
//#region 

//a function that takes in a question to prompt, and a callback function to validate the user input.
//response: Will capture the user input.
//isValid: Will capture the return of the validation function callback. true(the user input is valid)/false(the user input was not valid).
//this function will continue to loop until the user enters something that is not an empty string("") or is considered valid based off 
// the callback function(valid).
function promptFor(question, valid){
  let isValid;
  do{
    var response = prompt(question).trim();
    isValid = valid(response);
  } while(response == ""  ||  isValid == false)  
  return response;
}



// helper function/callback to pass into promptFor to validate yes/no answers.
function yesNo(input){
  if(input.toLowerCase() == "yes" || input.toLowerCase() == "no"){
    return true;
  }
  else{
    return false;
  }
}

// Validate numerical selection
function numerical(input){
  let numericalList = [1,2,3,4,5,6,7]
  if(input in numericalList){
    return true;
  }
  else{
    return false;
  }
}

// helper function to pass in as default promptFor validation.
//this will always return true for all inputs.
function autoValid(input){
  return true; // default validation only
}

//Unfinished validation function you can use for any of your custom validation callbacks.
//can be used for things like eye color validation for example.
function customValidation(input){
  
}

//#end region