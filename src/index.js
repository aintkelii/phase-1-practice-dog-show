document.addEventListener('DOMContentLoaded', () => {

})

document.addEventListener("DOMContentLoaded", () => {
  const dogForm = document.getElementById("dog-form");
  const dogTable = document.getElementById("table-body");
  let currentDogId = null;

  // Fetch all dogs and render to table
  function fetchDogs() {
    fetch("http://localhost:3000/dogs")
      .then((res) => res.json())
      .then((dogs) => renderDogs(dogs));
  }

  // Render dogs to table
  function renderDogs(dogs) {
    dogTable.innerHTML = "";
    dogs.forEach((dog) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${dog.name}</td>
        <td>${dog.breed}</td>
        <td>${dog.sex}</td>
        <td><button data-id="${dog.id}">Edit</button></td>
      `;
      row
        .querySelector("button")
        .addEventListener("click", () => populateForm(dog));
      dogTable.appendChild(row);
    });
  }

  // Populate form with dog info for editing
  function populateForm(dog) {
    currentDogId = dog.id;
    dogForm.name.value = dog.name;
    dogForm.breed.value = dog.breed;
    dogForm.sex.value = dog.sex;
  }

  // Handle form submission
  dogForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!currentDogId) return;

    const updatedDog = {
      name: dogForm.name.value,
      breed: dogForm.breed.value,
      sex: dogForm.sex.value,
    };

    fetch(`http://localhost:3000/dogs/${currentDogId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedDog),
    }).then(() => {
      dogForm.reset();
      currentDogId = null;
      fetchDogs(); // Refresh the table
    });
  });

  // Initialize
  fetchDogs();
});