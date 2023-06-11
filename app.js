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




