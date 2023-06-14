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
              fetchLikesCounter();
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
              fetchLikesCounter();
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

const url = "https://parseapi.back4app.com/classes/lista";

document
  .getElementById("itemForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const itemInput = document.getElementById("itemInput");
    const itemValue = itemInput.value.trim();

    if (itemValue !== "") {
      const listItem = {
        item: itemValue,
      };

      fetch(url, {
        method: "POST",
        headers: {
          "X-Parse-Application-Id": "gkNcgfBICttnjEYlDshHX4VUSnf4FwGbYtl5C9ru",
          "X-Parse-JavaScript-Key": "1fpS0qTrj2d5jenvEY2Ts1sQVHeMFygWmifbECTt",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(listItem),
      })
        .then(function (response) {
          if (response.ok) {
            itemInput.value = "";

            updateItemList();
          } else {
            console.log("Erro ao salvar o item:", response.statusText);
          }
        })
        .catch(function (error) {
          console.log("Erro ao salvar o item:", error);
        });
    }
  });

function updateItemList() {
  const itemList = document.getElementById("itemList");
  itemList.innerHTML = "";

  fetch(url, {
    headers: {
      "X-Parse-Application-Id": "gkNcgfBICttnjEYlDshHX4VUSnf4FwGbYtl5C9ru",
      "X-Parse-JavaScript-Key": "1fpS0qTrj2d5jenvEY2Ts1sQVHeMFygWmifbECTt",
    },
  })
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    })
    .then(function (data) {
      data.results.forEach(function (result) {
        const listItem = document.createElement("li");
        listItem.textContent = result.item;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "X";
        deleteButton.addEventListener("click", function () {
          deleteItem(result.objectId);
        });

        listItem.appendChild(deleteButton);
        itemList.appendChild(listItem);
      });
    })
    .catch(function (error) {
      console.log("Erro ao obter os itens:", error);
    });
}

function deleteItem(itemId) {
  fetch(url + "/" + itemId, {
    method: "DELETE",
    headers: {
      "X-Parse-Application-Id": "gkNcgfBICttnjEYlDshHX4VUSnf4FwGbYtl5C9ru",
      "X-Parse-JavaScript-Key": "1fpS0qTrj2d5jenvEY2Ts1sQVHeMFygWmifbECTt",
    },
  })
    .then(function (response) {
      if (response.ok) {
        updateItemList();
      } else {
        console.log("Erro ao deletar o item:", response.statusText);
      }
    })
    .catch(function (error) {
      console.log("Erro ao deletar o item:", error);
    });
}
updateItemList();
