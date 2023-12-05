const personList = document.getElementById("person-list");

async function addRandomPerson() {
    fetch("https://randomuser.me/api", {
        method: "GET",
    })
    .then((response) => {return response.json()})
    .then((result) => {return renderPerson(result.results[0])})
    .catch((e) => {
        console.error("Error with getting a random user:", e);
    });
}

function renderPerson(person){
    const card = document.createElement("div");
    card.classList+= "card"
    card.innerHTML = `
    <img src="${person.picture.large}">
    <ul>
        <li>Name: ${fullName(person.name)}</li>
        <li>Cell: ${person.cell}</li>
        <li>City: ${person.location.city}</li>
        <li>Country: ${person.location.country}</li>
    </ul>`;

    personList.appendChild(card);
}

function fullName(name){
    return `${name.title} ${name.first} ${name.last}` 
}

function removeAll() {
    personList.innerHTML = "";
}

addRandomPerson();
