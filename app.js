const buttons = [
  {
    button: document.getElementById("btn1"),
    closeBtn: document.getElementById("closeBtn1"),
    dialog: document.getElementById("dialog1"),
  },
  {
    button: document.getElementById("btn2"),
    closeBtn: document.getElementById("closeBtn2"),
    dialog: document.getElementById("dialog2"),
  },
  {
    button: document.getElementById("btn3"),
    closeBtn: document.getElementById("closeBtn3"),
    dialog: document.getElementById("dialog3"),
  },
  {
    button: document.getElementById("btn4"),
    closeBtn: document.getElementById("closeBtn4"),
    dialog: document.getElementById("dialog4"),
  },
  {
    button: document.getElementById("btn5"),
    closeBtn: document.getElementById("closeBtn5"),
    dialog: document.getElementById("dialog5"),
  },
];

buttons.forEach(({ button, closeBtn, dialog }) => {
  button.addEventListener("click", () => {
    dialog.show();
  });

  closeBtn.addEventListener("click", () => {
    dialog.close();
  });
});

const likeButton = document.getElementById("likeButton");

function fetchLikesCounter() {
  var appId = "gkNcgfBICttnjEYlDshHX4VUSnf4FwGbYtl5C9ru";
  var apiKey = "FaxxyBYgRNTPt2QAK93FnFuo6d5KUJVhrNRIZdi9";
  var classUrl = "https://parseapi.back4app.com/classes/likes";

  fetch(classUrl, {
    headers: {
      "X-Parse-Application-Id": appId,
      "X-Parse-REST-API-Key": apiKey,
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.results.length > 0) {
        var counter = data.results[0].counter;
        document.getElementById("likes-counter").textContent = counter;
      }
    })
    .catch(function (error) {
      console.log("Error fetching likes counter: " + error.message);
    });
}

function incrementLikesCounter() {
  var appId = "gkNcgfBICttnjEYlDshHX4VUSnf4FwGbYtl5C9ru";
  var apiKey = "FaxxyBYgRNTPt2QAK93FnFuo6d5KUJVhrNRIZdi9";
  var classUrl = "https://parseapi.back4app.com/classes/likes";

  fetch(classUrl, {
    headers: {
      "X-Parse-Application-Id": appId,
      "X-Parse-REST-API-Key": apiKey,
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.results.length > 0) {
        var objectId = data.results[0].objectId;
        var counter = data.results[0].counter + 1;

        fetch(classUrl + "/" + objectId, {
          method: "PUT",
          headers: {
            "X-Parse-Application-Id": appId,
            "X-Parse-REST-API-Key": apiKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ counter: counter }),
        })
          .then(function (response) {
            if (response.ok) {
              fetchLikesCounter(); // Atualiza o contador após a incrementação
            } else {
              throw new Error("Failed to increment likes counter");
            }
          })
          .catch(function (error) {
            console.log("Error incrementing likes counter: " + error.message);
          });
      } else {
        var newCounter = 1;

        fetch(classUrl, {
          method: "POST",
          headers: {
            "X-Parse-Application-Id": appId,
            "X-Parse-REST-API-Key": apiKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ counter: newCounter }),
        })
          .then(function (response) {
            if (response.ok) {
              fetchLikesCounter(); // Atualiza o contador após a criação
            } else {
              throw new Error("Failed to create likes counter");
            }
          })
          .catch(function (error) {
            console.log("Error creating likes counter: " + error.message);
          });
      }
    });
}

likeButton.addEventListener("click", () => {
  incrementLikesCounter();
});
