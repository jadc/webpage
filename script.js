(() => {
  // Age
  document.getElementById("age").innerHTML = new Date().getFullYear() - 2003;
})();

function cpToClip(text) {
  // Copy
  let clicked = document.getElementById(event.srcElement.id);
  let form = document.createElement("textarea");

  form.style.position = "fixed";
  form.style.top = 0;
  form.style.left = 0;
  form.style.width = "2em";
  form.style.height = "2em";
  form.style.padding = 0;
  form.style.border = "none";
  form.style.outline = "none";
  form.style.boxShadow = "none";
  form.style.background = "transparent";
  form.value = text;
  document.body.appendChild(form);
  form.focus();
  form.select();

  try {
    document.execCommand("copy");
  } catch (err) {
    alert("Failed to copy to clipboard.")
  }

  document.body.removeChild(form);

  ///// Toast

  // Remove any other toasts
  let toasts = document.getElementsByClassName("toast");
  while(toasts[0]){
    toasts[0].parentNode.removeChild(toasts[0]);
  }

  // Create new toast
  let toast = document.createElement("div");
  toast.className = "toast";
  let toastP = document.createElement("p");
  toast.appendChild(toastP);
  clicked.appendChild(toast);
  setTimeout(() => {
    clicked.removeChild(toast);
  }, 5*1000);
}

function nav(url){
  window.location.href = url;
}
