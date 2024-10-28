/*****************************************************************************************************************
Ashraful hoda 29th Oct 2024
note that while testing on local machine CORS errors may occur when running directly from the file system.
As it happend to me ...so use some sort of server....preferably python server
******************************************************************************************************************/


fetch("data/events.json")
  .then((response) => response.json())
  .then((data) => {
    const eventsContainer = document.getElementById("events-container");
    data.events.forEach((event) => {
      const eventCard = document.createElement("div");
      eventCard.classList.add("col-md-6", "d-flex", "align-items-stretch");
      eventCard.innerHTML = `
        <div class="card">
          <div class="card-img">
            <img src="${event.banner}" alt="${event.title}" />
          </div>
          <div class="card-body">
            <h5 class="card-title"><a href="#">${event.title}</a></h5>
            <p class="fst-italic text-center">${event.date} at ${event.time}</p>
            <p class="card-text">${event.content}</p>
          </div>
        </div>
      `;
      eventsContainer.appendChild(eventCard);
    });
  })
  .catch((error) => console.error("Error loading events:", error));
