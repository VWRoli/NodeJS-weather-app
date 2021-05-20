console.log("Client side JS file is loaded");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

const fetchForecast = (location) => {
  //classes
  messageOne.classList.remove("error");
  messageOne.classList.remove("success");
  messageOne.classList.add("loading");
  messageOne.textContent = "Loading...";

  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.classList.remove("loading");
        messageOne.classList.add("error");
        return (messageOne.textContent = data.error);
      }
      messageOne.classList.remove("loading");
      messageOne.classList.add("success");
      messageOne.textContent = data.location + " " + data.forecast;
    });
  });
};

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;
  fetchForecast(location);
});
