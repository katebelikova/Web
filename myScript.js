(function () {
    let nodes = [];             
    let currentIndex = 0;      

    function collectNodes(node) {
        nodes.push(node);
        for (let i = 0; i < node.childNodes.length; i++) {
            collectNodes(node.childNodes[i]);  
        }
    }


    function showNode(index) {
        const node = nodes[index];
        let nodeInfo = `Тип вузла: ${node.nodeName}`;

        if (node.nodeType === Node.ELEMENT_NODE) {
            nodeInfo += `\nТег: <${node.tagName.toLowerCase()}>`;
        } else if (node.nodeType === Node.TEXT_NODE) {
            let text = node.textContent.trim();
            if (text) nodeInfo += `\nТекст: "${text}"`;
        }

        let message = `${nodeInfo}\n\nХочете перейти далі?\nOK – далі\nСкасувати – назад`;
        if (!confirm(message)) {

            if (currentIndex > 0) {
                currentIndex--;
                showNode(currentIndex);
            } else {
                alert("Ви вже на початку. Вихід.");
            }
        } else {

            if (currentIndex < nodes.length - 1) {
                currentIndex++;
                showNode(currentIndex);
            } else {
                alert("Це останній вузол. Вихід.");
            }
        }
    }

    collectNodes(document.body); 
    showNode(currentIndex);      
})();

document.addEventListener("DOMContentLoaded", function () {
  // Плавна прокрутка до секції
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Підсвічування активного пункту меню
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav ul li a");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 80;
      if (scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  });

  // Модальне вікно для сертифікатів
  const gallery = document.querySelector(".gallery");
  if (gallery) {
    gallery.addEventListener("click", function (e) {
      if (e.target.tagName === "IMG") {
        const modal = document.createElement("div");
        modal.style.position = "fixed";
        modal.style.top = 0;
        modal.style.left = 0;
        modal.style.width = "100vw";
        modal.style.height = "100vh";
        modal.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
        modal.style.display = "flex";
        modal.style.alignItems = "center";
        modal.style.justifyContent = "center";
        modal.style.zIndex = 1000;
        modal.innerHTML = `<img src="${e.target.src}" style="max-width: 90%; max-height: 90%; border: 4px solid white; border-radius: 10px;">`;

        modal.addEventListener("click", () => {
          document.body.removeChild(modal);
        });

        document.body.appendChild(modal);
      }
    });
  }

  // Кнопка "До початку"
  const topBtn = document.createElement("button");
  topBtn.innerText = "⬆ До початку";
  topBtn.style.position = "fixed";
  topBtn.style.bottom = "20px";
  topBtn.style.right = "20px";
  topBtn.style.padding = "10px 15px";
  topBtn.style.fontSize = "16px";
  topBtn.style.display = "none";
  topBtn.style.border = "none";
  topBtn.style.backgroundColor = "#333";
  topBtn.style.color = "white";
  topBtn.style.borderRadius = "8px";
  topBtn.style.cursor = "pointer";
  topBtn.style.zIndex = 999;

  topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  document.body.appendChild(topBtn);

  window.addEventListener("scroll", () => {
    topBtn.style.display = window.scrollY > 300 ? "block" : "none";
  });
});
