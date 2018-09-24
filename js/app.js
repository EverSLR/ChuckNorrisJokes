//Init
document.querySelector("#optional").style.display = "none";
document.querySelector("h2").style.textAlign = "center"

//Variables


//Classes
class UI {
    showCustomize(checked) {
        let display = "";

        if(checked) {
            display = "";
        }
        else {
            display = "none";
            document.getElementById("first-name").value = "";
            document.getElementById("last-name").value = "";
        }

        document.querySelector("#optional").style.display = `${display}`;
    };
};

class Jokes {

    getJokes(e) {

        //Variables
        let firstName = document.getElementById("first-name").value;
        let lastName = document.getElementById("last-name").value;
        let numberJokes = 1;
        let url = "";

        //Create Object
        const xhr = new XMLHttpRequest();

        //Number of Jokes
        if (document.getElementById("number").value !== "") {
            numberJokes = Number(document.getElementById("number").value);
        }
    
        //Open
        url = lastName !== "" && firstName !== "" ? `${numberJokes}/?firstName=${firstName}&amp;lastName=${lastName}` : `${numberJokes}`;
        console.log(url);
        xhr.open("GET", `http://api.icndb.com/jokes/random/${url}`, true);
    
        //
        xhr.onload = function () {
            let li = "";
            if(this.status === 200) {
                let jokes = JSON.parse(this.responseText)
                jokes.value.forEach(function (element) {
                    li += `<li class="collection-item">${element.joke}</li>`
                });
                document.querySelector("ul").innerHTML = li;
            } else if (this.status === 404) {
                console.log("Forbidden");
    
            }
        };
        xhr.send();
        xhr.onerror = function() {
            alert("Request Error, check Internet Connection!")
        }
        e.preventDefault();
    }

};

//Events & Event Handlers
    //Events
    document.querySelector(".btn").addEventListener("click", function(e) {
        const joke = new Jokes();
        joke.getJokes(e);
    });

    //Event Handlers
    document.querySelector("#customize").addEventListener("change", function(e) {
        const ui = new UI();
        ui.showCustomize(e.target.checked);
    })