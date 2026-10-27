// Skovento – simple site script
var PHONE_WA = "919104450552"; // WhatsApp number (country code + number)

document.addEventListener("DOMContentLoaded", function () {
  var y = document.getElementById("yr");
  if (y) y.textContent = new Date().getFullYear();

  var burger = document.getElementById("burger");
  var links = document.getElementById("links");
  if (burger && links) {
    burger.addEventListener("click", function () {
      links.classList.toggle("open");
    });
  }

  var form = document.getElementById("enquiry");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var f = new FormData(form);
      var msg =
        "Hello Skovento, I want to enquire.\n" +
        "Name: " + (f.get("name") || "") + "\n" +
        "Phone: " + (f.get("phone") || "") + "\n" +
        "Business: " + (f.get("business") || "") + "\n" +
        "Service: " + (f.get("service") || "") + "\n" +
        "Details: " + (f.get("details") || "");
      window.open("https://wa.me/" + PHONE_WA + "?text=" + encodeURIComponent(msg), "_blank");
    });
  }
});
