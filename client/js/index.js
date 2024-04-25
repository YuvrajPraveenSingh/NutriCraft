let tabs = document.querySelectorAll(".tabs h3");
let tabContents = document.querySelectorAll(".tab-content div");
tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    tabContents.forEach((content) => {
      content.classList.remove("active");
    });
    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });
    tabContents[index].classList.add("active");
    tabs[index].classList.add("active");
  });
});


function openForm() {
  var form = document.getElementById("optionForm");
  var selectedOption;
  for (var i = 0; i < form.option.length; i++) {
    if (form.option[i].checked) {
      selectedOption = form.option[i].value;
      break;
    }
  }
  document.getElementById("selectedOption").innerHTML = selectedOption;
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}


