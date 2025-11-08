


    const textElement = document.getElementById("typing-text");
    const roles = ["Web Developer", "Digital Marketer", "UI/UX Designer"];
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

    document.addEventListener("DOMContentLoaded", typeEffect);