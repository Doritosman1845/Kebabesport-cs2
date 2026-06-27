document.addEventListener('DOMContentLoaded', async () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  try {
    const res = await fetch('./data/team.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('Kunne ikke hente team.json');
    const team = await res.json();

    // Oppdater tittel
    const h1 = document.querySelector('.hero h1');
    if (h1 && team?.name) h1.innerHTML = `${team.name} <span>${team?.game?.acronym ?? ''}</span>`;

    // Oppdater subtekst
    const sub = document.querySelector('.hero .sub');
    if (sub) sub.textContent = team?.description || 'Official site for roster, matches, and highlights.';

    // Oppdater logo hvis du vil bruke den i brand-logoen
    const logoSpan = document.querySelector('.brand .logo');
    if (logoSpan && team?.logo?.url) {
      logoSpan.innerHTML = `<img src="${team.logo.url}" alt="${team.name}" style="width:28px;height:28px;border-radius:50%;object-fit:cover;">`;
    }

    // Oppdater Join-seksjon med URL
    const joinSection = document.querySelector('#join');
    if (joinSection && team?.url) {
      const p = document.createElement('p');
      p.innerHTML = `Team page: <strong><a href="${team.url}" target="_blank" rel="noopener">GG Arena</a></strong>`;
      joinSection.appendChild(p);
    }
  } catch (err) {
    console.error(err);
  }
});document.getElementById("year").textContent = new Date().getFullYear();
