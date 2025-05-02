window.addEventListener("DOMContentLoaded", function () {
  var add = document.getElementById("add");
  var items = document.getElementById("items");
  var item = document.getElementById("item");

  function addItem(item) {
    var newItem = document.createElement("li");
    newItem.innerHTML = item;
    if (item !== "") items.appendChild(newItem);
  }

  add.addEventListener("click", function () {
    addItem(item.value);
    item.value = "";
  });

  item.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      add.click();
    }
  });
});
