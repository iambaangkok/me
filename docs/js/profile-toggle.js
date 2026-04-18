(function () {
  function init(root) {
    var btn = root.querySelector(".profile-avatar__toggle");
    if (!btn) return;

    btn.addEventListener("click", function () {
      var on = root.classList.toggle("is-back");
      btn.setAttribute("aria-pressed", on ? "true" : "false");
      btn.setAttribute(
        "aria-label",
        on ? "Show front of profile photo" : "Show back of profile photo"
      );
    });
  }

  document.querySelectorAll("[data-profile-avatar]").forEach(init);
})();
