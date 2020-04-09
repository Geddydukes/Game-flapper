function displayInstructions() {
    let instruc = document.getElementById("instructions");
    if(instruc.style.display === "none") {
        instruc.style.display = "flex";
    } else {
        instruc.style.display = "none";
    }
}