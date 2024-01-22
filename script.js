//Getting the HTML elements



let habitSection = document.querySelector('.bottom')
let UserData = document.querySelector('form')
let addButton = document.querySelector('#add')

document.addEventListener('DOMContentLoaded',()=> {
    UserData.addEventListener('submit', (event)=>{
        event.preventDefault();
    
        //Collecting the data submitted by the user 
        let addedInfo = new FormData(UserData)
        //Converting the data into an object
        let data = Object.fromEntries(addedInfo)
    
    
        //Post the data to the db.json file of JSON server
        fetch('http://localhost:3000/users',{
            method: "POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify(data)//Convert the data to JSON format
        })
    
        //Navigate the user back to the index page
        window.location.href = "index.html"
    
            
        //Call the display habit function
      
        window.onload = displayHabits
    
    
    
    
        return data
    
    })
})

//Adding a event listener to the add habt button to navigate the user to the form

let displayHabits = new Promise(async(resolve, reject)=>{
    try {
            //Get the data from JSON server
    let userHabit = await fetch('http://localhost:3000/users')
    
    let newData = await userHabit.json();
    console.log(newData)

    newData.forEach(element => {
        let newHabit = document.createElement('div')
        newHabit.className = "newHabit"
        newHabit.textContent = element.Habit

        let date = document.createElement('div')
        date.className = "date"
        date.textContent = element.date

        let daysOff = document.createElement('div')
        daysOff.className = "daysOff"

        let image = document.createElement('img')
        image.setAttribute('src', './ban-solid.svg')
        image.className = "image"

        //count number of days since you stopped
    
        const today = new Date();
        const dateStopped = new Date(element.date)
        const day = 1000 * 60 * 60 * 24
        const diff = Math.ceil((today - dateStopped)/day);

        daysOff.textContent = `It has been ${diff} days since`


        console.log(diff);

        let streak = document.createElement('div')
        streak.className = "streak"

        streak.appendChild(image)
        streak.appendChild(newHabit)
        streak.appendChild(date)
        streak.appendChild(daysOff)

        habitSection.appendChild(streak)
        return newData
    });

    } catch (error) {
        reject("Error fetching habits", error)
    }  

})


