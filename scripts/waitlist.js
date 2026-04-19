// Placeholder waitlist handler. Shows a thank-you modal; no network request.
// TODO: wire to Substack (or alternative) — swap handleSubmit body with an iframe embed
//       or a fetch() to the provider's subscribe endpoint.

(function () {
  function buildModal() {
    const backdrop = document.createElement("div");
    backdrop.className = "modal-backdrop";
    backdrop.setAttribute("role", "dialog");
    backdrop.setAttribute("aria-modal", "true");
    backdrop.setAttribute("aria-labelledby", "waitlist-modal-title");
    backdrop.innerHTML = `
      <div class="modal animate-fade-in">
        <div class="rule mb-6"></div>
        <h2 id="waitlist-modal-title" class="font-display text-3xl mb-3">You're on the list.</h2>
        <p class="text-ink/70 mb-6 leading-relaxed">
          We'll reach out when the next cohort opens. In the meantime, keep training.
        </p>
        <p class="text-xs text-ink/50 mb-6">
          <!-- PLACEHOLDER: this is a demo confirmation. No email has been captured yet. -->
          This is a placeholder confirmation &mdash; real waitlist capture is coming soon.
        </p>
        <button type="button" data-modal-close class="btn-primary w-full">Back to the site</button>
      </div>
    `;
    document.body.appendChild(backdrop);

    function close() {
      backdrop.classList.remove("is-open");
      document.removeEventListener("keydown", onKey);
    }
    function onKey(e) { if (e.key === "Escape") close(); }

    backdrop.querySelector("[data-modal-close]").addEventListener("click", close);
    backdrop.addEventListener("click", (e) => { if (e.target === backdrop) close(); });

    return {
      open() {
        backdrop.classList.add("is-open");
        backdrop.querySelector("[data-modal-close]").focus();
        document.addEventListener("keydown", onKey);
      },
    };
  }

  document.addEventListener("DOMContentLoaded", () => {
    const modal = buildModal();

    document.querySelectorAll("form[data-waitlist]").forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = form.querySelector("input[type=email]")?.value?.trim();
        if (!email) return;
        // TODO: wire to Substack / ConvertKit / Buttondown / Formspree here.
        form.reset();
        modal.open();
      });
    });
  });
})();
