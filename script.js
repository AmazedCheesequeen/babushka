//Variables

let template = document.querySelector("template");

let dishCatagory = {
    "forretter": [],
    "hovedretter": [],
    "desserter": [],
    "sideorders": [],
    "drikkevarer": []
};

let activeButton = document.querySelector("#all");



function setActive(button) {
    activeButton.classList.remove("active");
    button.classList.add("active");
    activeButton = button;
}



//Fetch data from google sheets when site loads

document.addEventListener("DOMContentLoaded", getJson);

//Make function run parallel with rest of website
async function getJson() {

    setActive(activeButton);

    //Make a constant that fetches data from google sheet json file
    const response = await fetch("https://spreadsheets.google.com/feeds/list/17Dd7DvkPaFamNUdUKlrFgnH6POvBJXac7qyiS6zNRw0/1/public/values?alt=json");

    //Convert constant response to json objects
    const data = await response.json();

    //Log all json objects
    console.log(data.feed.entry);

    //Make variable with data from google sheet with lists of objects
    let dishes = data.feed.entry;

    //Sort dishes in catagories in lists
    dishes.forEach(dish => {
        dishCatagory[dish.gsx$kategori.$t].push(dish);
    });

    //Sort lists in right order

    for (let dishType in dishCatagory) {
        //Make loop so you can clone template for each person and their data

        dishCatagory[dishType].forEach(dish => {

            //Make a clone of template
            let clone = template.cloneNode(true).content;

            //Insert dish name

            clone.querySelector(".dish_name").textContent = dish.gsx$navn.$t;


            //Insert picture source and alt in .dish_img of clone template
            clone.querySelector(".dish_img").src = "../pics/imgs/small/" + dish.gsx$billede.$t + "-sm.jpg";

            clone.querySelector(".dish_img").alt = dish.gsx$navn.$t;

            //Insert short description in .short_txt of clone template
            clone.querySelector(".short_txt").textContent = dish.gsx$kort.$t;

            //Insert the now cloned template to section data_container´s children
            document.querySelector(".data_container").appendChild(clone);


        });

    }


}
