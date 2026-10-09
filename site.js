/* Thomas Boulet Coaching · scripts communs */
(function(){
  "use strict";

  // Les demandes arrivent dans la table « leads » de Supabase, la même que l'app TB my Coach.
  var SB_URL = "https://xtapitojdvicgcaygeqj.supabase.co";
  var SB_KEY = "sb_publishable_c1EzH7XuWPwsCizxuFCUTg_G3Z82B_M";
  var CONTACT = "thomasboulet.coaching@gmail.com";
  var CONFIDENTIALITE = "https://thomasbouletcoaching-lab.github.io/tb-coaching-app/confidentialite.html";

  function $(s, r){ return (r || document).querySelector(s); }
  function $$(s, r){ return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(t){ return String(t).replace(/[&<>"']/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]; }); }

  // Menu mobile
  var burger = $(".burger"), liens = $(".liens");
  if (burger && liens) {
    burger.addEventListener("click", function(){
      var ouvert = liens.classList.toggle("ouvert");
      burger.setAttribute("aria-expanded", ouvert ? "true" : "false");
      burger.textContent = ouvert ? "Fermer" : "Menu";
    });
  }

  // Année du pied de page
  $$("[data-annee]").forEach(function(el){ el.textContent = new Date().getFullYear(); });

  // La semaine de 168 heures : 3 cases allumées
  var sem = $("[data-semaine]");
  if (sem) {
    var jours = ["Lun","Mar","Mer","Jeu","Ven","Sam","Dim"];
    var seances = { "0-7": 1, "2-19": 2, "5-10": 3 }; // lundi 7 h, mercredi 19 h, samedi 10 h
    var html = "";
    jours.forEach(function(j, d){
      html += '<span class="jour">' + j + '</span><div class="heures">';
      for (var h = 0; h < 24; h++) {
        var n = seances[d + "-" + h];
        html += n ? '<i class="h on" style="--d:' + (0.3 + n * 0.35) + 's" title="Séance ' + n + '"></i>' : '<i class="h"></i>';
      }
      html += "</div>";
    });
    html += '<div class="repere" aria-hidden="true"><span>0 h</span><span>6 h</span><span>12 h</span><span>18 h</span><span>24 h</span></div>';
    sem.innerHTML = html;
    if ("IntersectionObserver" in window) {
      var obs = new IntersectionObserver(function(e){
        if (e[0].isIntersecting) { sem.classList.add("anim"); obs.disconnect(); }
      }, { threshold: .4 });
      obs.observe(sem);
    }
  }

  // Vidéo de présentation (VSL), réglée dans produits.js
  var vsl = (window.SITE && window.SITE.vsl || "").trim(), blocVsl = $("[data-vsl]");
  if (vsl && blocVsl) {
    var cadre = $("[data-vsl-cadre]", blocVsl), yt = vsl.match(/(?:youtu\.be\/|v=|shorts\/|embed\/)([\w-]{11})/), vm = vsl.match(/vimeo\.com\/(\d+)/);
    if (yt) cadre.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + yt[1] + '?rel=0" title="Présentation du cycle Charpente" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen loading="lazy"></iframe>';
    else if (vm) cadre.innerHTML = '<iframe src="https://player.vimeo.com/video/' + vm[1] + '" title="Présentation du cycle Charpente" allow="fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe>';
    else cadre.innerHTML = '<video src="' + esc(vsl) + '" controls playsinline preload="metadata"></video>';
    blocVsl.hidden = false;
  }

  // Résultats clients, réglés dans produits.js
  var res = window.RESULTATS || [];
  if (res.length) {
    $$("[data-resultats]").forEach(function(bloc){
      $("[data-resultats-liste]", bloc).innerHTML = res.map(function(r){
        return '<article class="resultat">' + (r.photo ? '<img src="' + esc(r.photo) + '" alt="Avant et après de ' + esc(r.prenom) + '" loading="lazy">' : "") +
          '<div class="resultat-corps"><ul class="resultat-chiffres">' + (r.chiffres || []).map(function(c){ return "<li>" + esc(c) + "</li>"; }).join("") + "</ul>" +
          (r.citation ? "<blockquote>« " + esc(r.citation) + " »</blockquote>" : "") +
          '<p class="resultat-qui"><b>' + esc(r.prenom) + "</b>" + (r.profil ? ", " + esc(r.profil) : "") + (r.duree ? " · " + esc(r.duree) : "") + "</p></div></article>";
      }).join("");
      bloc.hidden = false;
    });
  }

  // Envoi vers Supabase
  function envoyer(lead){
    return fetch(SB_URL + "/rest/v1/leads", {
      method: "POST",
      headers: { "apikey": SB_KEY, "Authorization": "Bearer " + SB_KEY, "Content-Type": "application/json", "Prefer": "return=minimal" },
      body: JSON.stringify(lead)
    }).then(function(r){ if (!r.ok) throw new Error(r.status); });
  }
  var emailOk = function(e){ return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e); };
  function dire(out, cls, html){ out.className = "retour " + cls; out.innerHTML = html; }
  var echec = "L'envoi n'a pas fonctionné. Réessaie dans un instant, ou écris-moi à <a href=\"mailto:" + CONTACT + "\">" + CONTACT + "</a>.";

  // Formulaires : data-lead="candidature" | "guide-3h" | "attente:<id>"
  $$("form[data-lead]").forEach(function(f){
    var out = $(".retour", f), btn = $("button[type=submit]", f), label = btn ? btn.textContent : "";
    f.addEventListener("submit", function(ev){
      ev.preventDefault();
      var v = {}; new FormData(f).forEach(function(val, k){ v[k] = typeof val === "string" ? val.trim() : val; });
      if (v.site_web) return dire(out, "ok", "Merci, c'est bien envoyé.");
      var type = f.getAttribute("data-lead");
      var name = v.name || "";
      var champNom = f.elements.namedItem("name");
      if (champNom && champNom.required && name.length < 2) return dire(out, "ko", "Indique ton prénom.");
      if (!emailOk(v.email || "")) return dire(out, "ko", "Vérifie ton adresse e-mail.");
      if (type === "candidature") {
        if (!v.goal) return dire(out, "ko", "Choisis ton objectif principal.");
        if (!v.practice) return dire(out, "ko", "Décris en quelques mots ta pratique actuelle.");
      }
      if (f.elements.consent && !f.elements.consent.checked) return dire(out, "ko", "Coche la case d'accord pour que je puisse te répondre.");
      var data = { origine: "site", demande: type, page: location.pathname.split("/").pop() || "index.html" };
      ["age","goal","practice","sessions","place","constraints","source"].forEach(function(k){ if (v[k]) data[k] = v[k]; });
      if (btn) { btn.disabled = true; btn.textContent = "Envoi…"; }
      envoyer({ name: name || (v.email.split("@")[0]), email: v.email, phone: v.phone || null, data: data, consent: true })
        .then(function(){
          $$("input,select,textarea,button", f).forEach(function(x){ x.disabled = true; });
          var prenom = esc((name || "").split(/\s+/)[0]);
          var msg = f.getAttribute("data-merci") || "C'est noté{p}. Je te tiens au courant par e-mail.";
          dire(out, "ok", msg.replace("{p}", prenom ? ", " + prenom : ""));
        })
        .catch(function(){ if (btn) { btn.disabled = false; btn.textContent = label; } dire(out, "ko", echec); });
    });
  });

  // Places au tarif fondateur, réglées dans produits.js
  var F = (window.SITE && window.SITE.fondateur) || { total: 0, prises: 0 };
  var restantes = Math.max(0, (F.total || 0) - (F.prises || 0)), complet = restantes === 0 || (F.fin && Date.now() > Date.parse(F.fin));
  $$("[data-si-places]").forEach(function(el){ el.hidden = complet; });
  $$("[data-si-complet]").forEach(function(el){ el.hidden = !complet; });
  $$("[data-places-restantes]").forEach(function(el){ el.textContent = restantes; });
  $$("[data-places-total]").forEach(function(el){ el.textContent = F.total; });
  $$("[data-places-mot]").forEach(function(el){ el.textContent = restantes > 1 ? "places fondateur restantes" : "place fondateur restante"; });
  $$("[data-places-jauge]").forEach(function(el){
    var h = ""; for (var k = 0; k < F.total; k++) h += '<i class="' + (k < F.prises ? "prise" : "") + '"></i>';
    el.innerHTML = h;
  });
  if (complet && window.CATALOGUE) window.CATALOGUE.forEach(function(o){
    if (o.prixApres) { o.prix = o.prixApres; o.prixApres = ""; o.note = "Le cycle de 12 semaines. TVA non applicable, art. 293 B du CGI."; }
  });

  // Page Offres : construite à partir de produits.js
  var cible = $("[data-catalogue]");
  if (cible && window.CATALOGUE) {
    var statuts = { dispo: "Disponible", attente: "Liste d'attente", bientot: "En préparation" };
    var html = "";
    Object.keys(window.FAMILLES).forEach(function(fam){
      var items = window.CATALOGUE.filter(function(o){ return o.famille === fam; });
      if (!items.length) return;
      var F = window.FAMILLES[fam];
      html += '<h2 class="famille" id="' + fam + '">' + esc(F.titre) + '</h2><p class="intro" style="margin-bottom:24px">' + esc(F.intro) + '</p><div class="offres">';
      items.sort(function(a, b){ return (b.phare ? 1 : 0) - (a.phare ? 1 : 0); }).forEach(function(o){
        var pts = (o.points || []).map(function(p){ return "<li>" + esc(p) + "</li>"; }).join("");
        var action;
        if (o.lien) {
          action = '<a class="btn ' + (o.phare ? "btn-plein" : "btn-ligne") + '" href="' + esc(o.lien) + '">' + esc(o.bouton) + "</a>";
        } else {
          action = '<button type="button" class="btn btn-ligne" data-ouvre="' + esc(o.id) + '">' + esc(o.bouton) + "</button>" +
            '<form class="form-mini" data-attente="' + esc(o.id) + '" hidden novalidate>' +
            '<label class="saut" for="m-' + esc(o.id) + '">Ton e-mail</label>' +
            '<input type="email" id="m-' + esc(o.id) + '" name="email" placeholder="Ton e-mail" required autocomplete="email">' +
            '<button class="btn btn-plein" type="submit">M\'inscrire</button>' +
            '<p class="aide" style="flex-basis:100%;margin:0;font-size:.85rem;color:var(--gris)">Un seul e-mail à l\'ouverture. Données traitées selon la <a href="' + CONFIDENTIALITE + '">politique de confidentialité</a>.</p>' +
            '<div class="retour" role="status" aria-live="polite" style="flex-basis:100%"></div></form>';
        }
        var corps = '<span class="statut ' + (o.statut === "dispo" ? "dispo" : "") + '">' + statuts[o.statut] + "</span>" +
          "<h3>" + esc(o.titre) + '</h3><p class="desc">' + esc(o.desc) + "</p>" + (pts ? "<ul>" + pts + "</ul>" : "");
        var prix = (o.prix ? '<p class="prix">' + esc(o.prix) + (o.prixBarre ? ' <s class="prix-barre">' + esc(o.prixBarre) + "</s>" : "") + "</p>" : "") + (o.note ? '<p class="note">' + esc(o.note) + "</p>" : "");
        html += o.phare
          ? '<article class="offre phare" id="' + esc(o.id) + '"><div>' + corps + "</div><div>" + prix + action + "</div></article>"
          : '<article class="offre" id="' + esc(o.id) + '">' + corps + prix + action + "</article>";
      });
      html += "</div>";
    });
    cible.innerHTML = html;

    $$("[data-ouvre]", cible).forEach(function(b){
      b.addEventListener("click", function(){
        var f = $('form[data-attente="' + b.getAttribute("data-ouvre") + '"]', cible);
        b.hidden = true; f.hidden = false; $("input", f).focus();
      });
    });
    $$("form[data-attente]", cible).forEach(function(f){
      f.addEventListener("submit", function(ev){
        ev.preventDefault();
        var out = $(".retour", f), email = $("input", f).value.trim(), id = f.getAttribute("data-attente");
        if (!emailOk(email)) return dire(out, "ko", "Vérifie ton adresse e-mail.");
        var btn = $("button", f); btn.disabled = true; btn.textContent = "Envoi…";
        envoyer({ name: email.split("@")[0], email: email, phone: null, data: { origine: "site", demande: "attente", offre: id }, consent: true })
          .then(function(){ $("input", f).disabled = true; btn.textContent = "Inscrit"; dire(out, "ok", "C'est noté. Tu recevras un e-mail à l'ouverture."); })
          .catch(function(){ btn.disabled = false; btn.textContent = "M'inscrire"; dire(out, "ko", echec); });
      });
    });
  }
})();
