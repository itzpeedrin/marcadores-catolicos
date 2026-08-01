(function () {
  "use strict";

  /* ---------- Data de hoje (topbar) ---------- */
  var today = new Date();
  var todayEl = document.getElementById("todayDate");
  if (todayEl) {
    todayEl.textContent = today.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  /* ---------- Countdown até 23:59:59 ---------- */
  function pad(n) {
    return String(n).padStart(2, "0");
  }
  function updateCountdown() {
    var el = document.getElementById("countdown");
    if (!el) return;
    var now = new Date();
    var end = new Date(now);
    end.setHours(23, 59, 59, 999);
    var diff = Math.max(0, end.getTime() - now.getTime());
    var h = Math.floor(diff / 3600000);
    var m = Math.floor((diff % 3600000) / 60000);
    var s = Math.floor((diff % 60000) / 1000);
    el.textContent = pad(h) + ":" + pad(m) + ":" + pad(s);
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ---------- Progresso da leitura + back to top ---------- */
  var progressBar = document.getElementById("progressBar");
  var backTop = document.getElementById("backTop");

  function onScroll() {
    var y = window.scrollY;
    if (backTop) backTop.classList.toggle("visible", y > 600);
    if (progressBar) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      var pct = h > 0 ? (y / h) * 100 : 0;
      progressBar.style.width = pct + "%";
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll(".faq-item").forEach(function (item) {
    var btn = item.querySelector(".faq-q");
    var answer = item.querySelector(".faq-a");
    btn.addEventListener("click", function () {
      var isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach(function (other) {
        other.classList.remove("open");
        other.querySelector(".faq-a").style.maxHeight = null;
        other.querySelector(".faq-q").setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        item.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("in-view");
    });
  }

  /* ---------- Back to top ---------- */
  if (backTop) {
    backTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
})();
