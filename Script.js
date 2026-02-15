// --- TYPEWRITER EFFECT ---//
      const textElement = document.getElementById("typewriter");
      const phrases = ["intelligent systems.", "responsive webs.", "data-driven solutions.","myself perfect.", "the future."];
      let phraseIndex = 0;
      let charIndex = 0;
      let isDeleting = false;

      function type() {
        const currentPhrase = phrases[phraseIndex];
        if (isDeleting) {
          textElement.textContent = currentPhrase.substring(0, charIndex - 1);
          charIndex--;
        } else {
          textElement.textContent = currentPhrase.substring(0, charIndex + 1);
          charIndex++;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
          isDeleting = true;
          setTimeout(type, 2000);
        } else if (isDeleting && charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          setTimeout(type, 500);
        } else {
          setTimeout(type, isDeleting ? 100 : 200);
        }
      }
      document.addEventListener("DOMContentLoaded", type);

      // --- NEURAL NETWORK CANVAS ---//
      const canvas = document.getElementById("neuroCanvas");
      const ctx = canvas.getContext("2d");
      let width, height;
      let particles = [];

      function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      }
      window.addEventListener("resize", resize);
      resize();

      const mouse = { x: null, y: null };
      window.addEventListener("mousemove", (e) => { mouse.x = e.x; mouse.y = e.y; });
      window.addEventListener("mouseout", () => { mouse.x = null; mouse.y = null; });

      class Particle {
        constructor() {
          this.x = Math.random() * width;
          this.y = Math.random() * height;
          this.vx = (Math.random() - 0.5) * 1.5; 
          this.vy = (Math.random() - 0.5) * 1.5;
          this.size = Math.random() * 2 + 1;
        }
        update() {
          this.x += this.vx;
          this.y += this.vy;
          if (this.x < 0 || this.x > width) this.vx *= -1;
          if (this.y < 0 || this.y > height) this.vy *= -1;
          
          if (mouse.x != null) {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 200) {
              const force = (200 - distance) / 200;
              this.vx += (dx / distance) * force * 0.05;
              this.vy += (dy / distance) * force * 0.05;
            }
          }
        }
        draw() {
          ctx.fillStyle = "#64ffda";
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      for (let i = 0; i < 60; i++) particles.push(new Particle());

      function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach((p) => { p.update(); p.draw(); });
        for (let a = 0; a < particles.length; a++) {
          for (let b = a; b < particles.length; b++) {
            let dx = particles[a].x - particles[b].x;
            let dy = particles[a].y - particles[b].y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 150) {
              ctx.strokeStyle = `rgba(100, 255, 218, ${1 - distance / 150})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(particles[a].x, particles[a].y);
              ctx.lineTo(particles[b].x, particles[b].y);
              ctx.stroke();
            }
          }
        }
        requestAnimationFrame(animate);
      }
      animate();

      // --- MOBILE MENU LOGIC ---//
      const menuToggle = document.getElementById('mobile-menu');
      const navList = document.getElementById('nav-list');
      const icon = menuToggle.querySelector('i');

      menuToggle.addEventListener('click', () => {
          navList.classList.toggle('active');
          if(navList.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
          } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
          }
      });

      // Close menu when a link is clicked
      document.querySelectorAll('.nav-links a').forEach(link => {
          link.addEventListener('click', () => {
              navList.classList.remove('active');
              icon.classList.remove('fa-times');
              icon.classList.add('fa-bars');
          });
      });
