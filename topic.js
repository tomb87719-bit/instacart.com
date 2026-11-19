(() => {
  const params = new URLSearchParams(window.location.search);
  const selectedId = params.get("category") || "order";
  const all = window.HELP_CATEGORIES || [];
  const selected = all.find(item => item.id === selectedId) || all[0];

  document.title = `${selected.title} Guides | Order & Delivery Help`;
  document.getElementById("crumb-current").textContent = selected.title;
  document.getElementById("topic-title").textContent = selected.title;
  document.getElementById("topic-intro").textContent = selected.intro;
  document.getElementById("guide-heading").textContent = `${selected.title}: Guides & Helpful Information`;
  document.getElementById("guide-count").textContent = ["order", "delivery"].includes(selected.id)
    ? "8 guides based on Home Depot's published help instructions. Each guide has its own steps and official source link."
    : `${selected.guides.length} helpful guides. Select any guide to see clear, step-by-step instructions.`;

  const guideGrid = document.getElementById("topic-guide-grid");
  selected.guides.forEach((guide, index) => {
    const card = document.createElement("article");
    card.className = "topic-guide-card";
    card.dataset.search = guide.slice(0,3).join(" ").toLowerCase();
    card.innerHTML = `
      <div class="guide-number">${String(index + 1).padStart(2, "0")}</div>
      <div class="topic-guide-copy">
        <span class="guide-label"></span>
        <h3></h3><p class="guide-summary"></p>
        <details>
          <summary>View step-by-step guide</summary>
          <div class="expanded-guide">
            <p class="guide-overview"></p>
            <h4>Follow these steps</h4>
            <ol class="guide-steps"></ol>
            <div class="guide-tip"><b>Helpful tip</b><p>Keep your order number, receipt, model number, or confirmation details available when following the relevant process.</p></div>
 
          </div>
        </details>
      </div>`;
    card.querySelector(".guide-label").textContent = `${selected.title} GUIDE`;
    card.querySelector("h3").textContent = guide[0];
    card.querySelector(".guide-summary").textContent = guide[1];
    card.querySelector(".guide-overview").textContent = guide[2] || guide[1];
    const steps = Array.isArray(guide[3]) ? guide[3] : [];
    const list = card.querySelector(".guide-steps");
    steps.forEach(step => {
      const li = document.createElement("li");
      li.textContent = step;
      list.appendChild(li);
    });
    guideGrid.appendChild(card);
  });

  const search = document.getElementById("topic-guide-search");
  if (search) {
    search.addEventListener("input", () => {
      const term = search.value.trim().toLowerCase();
      let visible = 0;
      guideGrid.querySelectorAll(".topic-guide-card").forEach(card => {
        const match = !term || card.dataset.search.includes(term);
        card.hidden = !match;
        if (match) visible++;
      });
      document.getElementById("guide-count").textContent = term
        ? `${visible} of ${selected.guides.length} guides match your search.`
        : `${selected.guides.length} helpful guides. Select any guide to see clear, step-by-step instructions.`;
    });
  }

  const relatedGrid = document.getElementById("related-grid");
  all.filter(item => item.id !== selected.id).forEach(item => {
    const link = document.createElement("a");
    link.className = "related-card";
    link.href = `topic.html?category=${encodeURIComponent(item.id)}`;
    link.innerHTML = `<span class="related-icon"></span><span class="related-copy"><b></b><small></small></span><span class="related-arrow">›</span>`;
    link.querySelector(".related-icon").textContent = item.icon;
    link.querySelector("b").textContent = item.title;
    link.querySelector("small").textContent = item.subtitle;
    relatedGrid.appendChild(link);
  });
})();