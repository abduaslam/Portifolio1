
   const textElement = document.getElementById("typing-text");
    const roles = ["Full Stack Developer", "Data analyst"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
      const current = roles[roleIndex];
      const displayed = current.substring(0, charIndex);
      textElement.textContent = `I'm a ${displayed}`;

      if (!isDeleting && charIndex < current.length) {
        charIndex++;
        setTimeout(typeEffect, 100);
      } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(typeEffect, 50);
      } else {
        isDeleting = !isDeleting;
        if (!isDeleting) roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeEffect, 1000);
      }
    }

    // Start typing once page loads
    document.addEventListener("DOMContentLoaded", typeEffect);

    // portifolio contact form
    let ContactBtn=document.getElementById("ContactBtn");
    ContactBtn.addEventListener('click',()=>{
      alert("Your data have been sent")
    })

