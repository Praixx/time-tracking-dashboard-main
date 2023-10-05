import users from "./data.json"assert{ type: "json"};

(function(){

"use strict"    
    
const controls = document.querySelectorAll(".controls nav ul li a");
const currentData = document.querySelectorAll(".card .details .current");
const previousData = document.querySelectorAll(".card .details .previous");

let selectedControl = "daily";


window.addEventListener("load", changeData);


document.addEventListener('keydown', function (event) {
    
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        
        event.preventDefault();
 
        const currentIndex = Array.from(controls).findIndex(control => control.className === 'clicked');
        
        let nextIndex;
        if (event.key === 'ArrowUp') { 
            nextIndex = currentIndex > 0 ? currentIndex - 1 : controls.length - 1;
        } else {
            nextIndex = currentIndex < controls.length - 1 ? currentIndex + 1 : 0;
        }

        controls.forEach(eachControl => {
            eachControl.classList.remove('clicked');
        });
        
        controls[nextIndex].classList.add('clicked');
        
        selectedControl = controls[nextIndex].innerHTML.toLowerCase();

        changeData();
    }
});


controls.forEach(control => {
    control.addEventListener("click", function(event){
        event.preventDefault();

        controls.forEach( eachControl => {
            eachControl.className = "";
        })

        control.className = "clicked";

        selectedControl = control.innerHTML.toLowerCase();

        if(control.classList.contains("clicked")){
            changeData()
        }

       changeData()

    })
})



function changeData(){

    if(selectedControl == "daily"){

        for(let i = 0; i < users.length; i++){
            currentData[i].innerHTML = `${users[i].timeframes.daily.current}hrs`;
            previousData[i].innerHTML = `Last Week - ${users[i].timeframes.daily.previous}hrs`
        }

    }else if(selectedControl == "weekly"){

        for(let i = 0; i < users.length; i++){
            currentData[i].innerHTML = `${users[i].timeframes.weekly.current}hrs`;
            previousData[i].innerHTML = `Last Week - ${users[i].timeframes.weekly.previous}hrs`
        }

    }else{

        for(let i = 0; i < users.length; i++){
            currentData[i].innerHTML = `${users[i].timeframes.monthly.current}hrs`;
            previousData[i].innerHTML = `Last Week - ${users[i].timeframes.monthly.previous}hrs`
        }
    }

}
})();