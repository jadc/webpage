let lastID;

(() => {
  // Set age value
  document.getElementById("age").innerHTML = new Date().getFullYear() - 2003;

  
  for(let btn of document.getElementsByTagName("button")){

    // Assigns icons to all buttons
    btn.style.backgroundImage = `url(assets/buttons/${btn.id}.svg)`;

    // Handles button functionality
    btn.addEventListener("click", () => {

      if(lastID == btn.id) return;
      lastID = btn.id;

      // Redirecting button
      if(btn.getAttribute("url") != null){
        return window.location.href = btn.getAttribute("url");
      }

      // Displays text button
      if(btn.getAttribute("text") != null){
        let text = "An error occured.";

        switch(btn.id){
          default:
            break;
          
          case "discord":
            text = "My Discord is <code>jad#0024</code>";
            break;
        }

        document.getElementById("info").style.opacity = 0;
        setTimeout(() => {
          document.getElementById("info").children[0].innerHTML = text;
          document.getElementById("info").style.opacity = 1;
        }, 250);
        return;
      }

    });

  }

})();
