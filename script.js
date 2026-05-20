window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

function toggleMenu() {
  const navLinks = document.getElementById("navLinks");
  navLinks.classList.toggle("open");
}

document.querySelectorAll(".nav-links a").forEach(function (lien) {
  lien.addEventListener("click", function () {
    document.getElementById("navLinks").classList.remove("open");
  });
});

function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    const offset = 70; 
    const top = section.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: top, behavior: "smooth" });
  }
}

function animerCompteur(element) {
  const cible = parseInt(element.getAttribute("data-target"));
  const duree = 1500;
  const pas = Math.ceil(duree / cible);
  let compteur = 0;

  const timer = setInterval(function () {
    compteur++;
    element.textContent = compteur;
    if (compteur >= cible) {
      element.textContent = cible;
      clearInterval(timer);
    }
  }, pas);
}

const observerStats = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const chiffres = entry.target.querySelectorAll(".stat-number");
        chiffres.forEach(animerCompteur);
        observerStats.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.4 },
);

const sectionStats = document.querySelector(".stats");
if (sectionStats) {
  observerStats.observe(sectionStats);
}

const champMotivation = document.getElementById("motivation");
const affichageChars = document.getElementById("charCount");

if (champMotivation) {
  champMotivation.addEventListener("input", function () {
    const longueur = this.value.length;
    affichageChars.textContent = longueur + " / 50 caractères minimum";
    if (longueur >= 50) {
      affichageChars.classList.add("ok");
    } else {
      affichageChars.classList.remove("ok");
    }
  });
}

function afficherErreur(champId, message) {
  const champ = document.getElementById(champId);
  const erreur = document.getElementById("err-" + champId);
  if (champ) champ.classList.add("invalid");
  if (erreur) erreur.textContent = message;
}

function effacerErreur(champId) {
  const champ = document.getElementById(champId);
  const erreur = document.getElementById("err-" + champId);
  if (champ) champ.classList.remove("invalid");
  if (erreur) erreur.textContent = "";
}

function validerFormulaire() {
  let valide = true;

  const nom = document.getElementById("nom").value.trim();
  effacerErreur("nom");
  if (nom.length < 2) {
    afficherErreur("nom", "Veuillez entrer un nom valide.");
    valide = false;
  }

  const prenom = document.getElementById("prenom").value.trim();
  effacerErreur("prenom");
  if (prenom.length < 2) {
    afficherErreur("prenom", "Veuillez entrer un prénom valide.");
    valide = false;
  }

  const age = parseInt(document.getElementById("age").value);
  effacerErreur("age");
  if (isNaN(age) || age < 18 || age > 35) {
    afficherErreur("age", "L'âge doit être compris entre 18 et 35 ans.");
    valide = false;
  }

  const genre = document.getElementById("genre").value;
  effacerErreur("genre");
  if (!genre) {
    afficherErreur("genre", "Veuillez sélectionner votre genre.");
    valide = false;
  }

  const email = document.getElementById("email").value.trim();
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  effacerErreur("email");
  if (!regexEmail.test(email)) {
    afficherErreur("email", "Veuillez entrer une adresse email valide.");
    valide = false;
  }

  const telephone = document.getElementById("telephone").value.trim();
  effacerErreur("telephone");
  if (telephone.replace(/\s/g, "").length < 8) {
    afficherErreur("telephone", "Veuillez entrer un numéro valide.");
    valide = false;
  }

  const statut = document.getElementById("statut").value;
  effacerErreur("statut");
  if (!statut) {
    afficherErreur("statut", "Veuillez sélectionner votre statut.");
    valide = false;
  }

  const regionOrigine = document.getElementById("region-origine").value;
  effacerErreur("region-origine");
  if (!regionOrigine) {
    afficherErreur(
      "region-origine",
      "Veuillez sélectionner votre région d'origine.",
    );
    valide = false;
  }

  const domaine = document.getElementById("domaine").value;
  effacerErreur("domaine");
  if (!domaine) {
    afficherErreur("domaine", "Veuillez sélectionner un domaine d'intérêt.");
    valide = false;
  }

  const disponibilite = document.getElementById("disponibilite").value;
  effacerErreur("disponibilite");
  if (!disponibilite) {
    afficherErreur(
      "disponibilite",
      "Veuillez sélectionner votre disponibilité.",
    );
    valide = false;
  }

  const motivation = document.getElementById("motivation").value.trim();
  effacerErreur("motivation");
  if (motivation.length < 50) {
    afficherErreur(
      "motivation",
      "La motivation doit contenir au moins 50 caractères.",
    );
    valide = false;
  }

  const conditions = document.getElementById("conditions").checked;
  effacerErreur("conditions");
  if (!conditions) {
    afficherErreur(
      "conditions",
      "Vous devez accepter les conditions pour continuer.",
    );
    valide = false;
  }

  return valide;
}

function soumettreFormulaire(event) {
  event.preventDefault();

  if (!validerFormulaire()) {
    const premiereErreur = document.querySelector(".invalid");
    if (premiereErreur) {
      const top =
        premiereErreur.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: top, behavior: "smooth" });
    }
    return;
  }

  const btnText = document.getElementById("btnText");
  const btnLoader = document.getElementById("btnLoader");
  const submitBtn = document.getElementById("submitBtn");

  btnText.classList.add("hidden");
  btnLoader.classList.remove("hidden");
  submitBtn.disabled = true;

  const candidature = {
    nom: document.getElementById("nom").value.trim(),
    prenom: document.getElementById("prenom").value.trim(),
    age: document.getElementById("age").value,
    genre: document.getElementById("genre").value,
    email: document.getElementById("email").value.trim(),
    telephone: document.getElementById("telephone").value.trim(),
    statut: document.getElementById("statut").value,
    regionOrigine: document.getElementById("region-origine").value,
    regionSouhaitee: document.getElementById("region-souhaitee").value,
    domaine: document.getElementById("domaine").value,
    disponibilite: document.getElementById("disponibilite").value,
    niveau: document.getElementById("niveau").value,
    motivation: document.getElementById("motivation").value.trim(),
    date: new Date().toLocaleDateString("fr-FR"),
  };

  fetch("https://formspree.io/f/mojrrrdo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(candidature),
  })
    .then(function (response) {
      if (response.ok) {
        document.getElementById("inscriptionForm").classList.add("hidden");
        document.getElementById("successMsg").classList.remove("hidden");
        document.getElementById("prenomCandidat").textContent =
          candidature.prenom;
        scrollToSection("inscription");
        afficherToast("Candidature envoyée avec succès ! ✅");
      } else {
        afficherToast("Erreur lors de l'envoi. Réessaie.");
      }
    })
    .catch(function () {
      afficherToast("Erreur réseau. Vérifie ta connexion.");
    })
    .finally(function () {
      document.getElementById("btnText").classList.remove("hidden");
      document.getElementById("btnLoader").classList.add("hidden");
      document.getElementById("submitBtn").disabled = false;
    });

  setTimeout(function () {
    document.getElementById("inscriptionForm").classList.add("hidden");
    const successMsg = document.getElementById("successMsg");
    successMsg.classList.remove("hidden");
    document.getElementById("prenomCandidat").textContent = candidature.prenom;
    scrollToSection("inscription");
    afficherToast("Candidature envoyée avec succès ! ✅");
  }, 1500);
}

function resetForm() {
  document.getElementById("inscriptionForm").reset();
  document.getElementById("inscriptionForm").classList.remove("hidden");
  document.getElementById("successMsg").classList.add("hidden");

  document.getElementById("btnText").classList.remove("hidden");
  document.getElementById("btnLoader").classList.add("hidden");
  document.getElementById("submitBtn").disabled = false;

  if (affichageChars) {
    affichageChars.textContent = "0 / 50 caractères minimum";
    affichageChars.classList.remove("ok");
  }

  document.querySelectorAll(".invalid").forEach(function (el) {
    el.classList.remove("invalid");
  });
  document.querySelectorAll(".error-msg").forEach(function (el) {
    el.textContent = "";
  });
}

function afficherToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.remove("hidden");

  setTimeout(function () {
    toast.classList.add("hidden");
  }, 4000);
}

const observerSections = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.1 },
);

document
  .querySelectorAll(".apropos-card, .region-card, .step")
  .forEach(function (el) {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observerSections.observe(el);
  });
let chatOpen = false;
let chatHistory = [];

function toggleChat() {
  chatOpen = !chatOpen;
  document.getElementById("chatWindow").classList.toggle("hidden", !chatOpen);
  document.getElementById("chatFab").textContent = chatOpen ? "✕" : "💬";
}

function sendChip(text) {
  document.getElementById("chips").style.display = "none";
  document.getElementById("chatInput").value = text;
  sendMessage();
}

function sendMessage() {
  const input = document.getElementById("chatInput");
  const text = input.value.trim();
  if (!text) return;
  input.value = "";
  addChatMsg(text, "user");
  chatHistory.push({ role: "user", content: text });
  showTypingIndicator();
  callAgriBot();
}

function addChatMsg(text, who) {
  const box = document.getElementById("chatMessages");
  const d = document.createElement("div");
  d.className = "msg " + who;
  d.textContent = text;
  box.appendChild(d);
  box.scrollTop = box.scrollHeight;
}

function showTypingIndicator() {
  const box = document.getElementById("chatMessages");
  const t = document.createElement("div");
  t.className = "msg bot typing";
  t.id = "typingDot";
  t.innerHTML =
    '<div class="dot"></div><div class="dot"></div><div class="dot"></div>';
  box.appendChild(t);
  box.scrollTop = box.scrollHeight;
}

async function callAgriBot() {
  await new Promise((r) => setTimeout(r, 1000));
  document.getElementById("typingDot")?.remove();

  const lastMsg = chatHistory[chatHistory.length - 1].content
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  let reply = "";

  if (
    lastMsg.match(
      /secteur|domaine|correspond|choisir|agriculture|elevage|maraich|riz|production/,
    )
  ) {
    reply =
      "Tu aimes les plantes et les cultures ? L'agriculture ou le maraîchage est fait pour toi ! Tu préfères les animaux ? Opte pour l'élevage. Tu veux tout essayer ? Choisis 'Tous les domaines' dans le formulaire 😊";
  } else if (
    lastMsg.match(
      /region|kaolack|thies|saint.louis|tamba|destination|ou aller|ou partir/,
    )
  ) {
    reply =
      "On couvre 4 régions : Kaolack pour l'arachide, Saint-Louis pour le riz et la pêche, Thiès pour le maraîchage et les fruits, et Tambacounda pour l'élevage. Tu peux indiquer ta préférence dans le formulaire !";
  } else if (
    lastMsg.match(
      /fonctionne|programme|marche|comment|etape|deroulement|processus|selectionn/,
    )
  ) {
    reply =
      "C'est simple : tu t'inscris en ligne, notre équipe te sélectionne, tu pars en région pendant 2 à 3 mois. Tu es logé, nourri, formé par des agronomes et payé à la fin. 100% gratuit ! 🌾";
  } else if (
    lastMsg.match(/age|limite|condition|critere|eligible|qui peut|requis|exig/)
  ) {
    reply =
      "Le programme est ouvert à tous les jeunes de 18 à 35 ans, peu importe le niveau d'études. Étudiant, sans emploi, ou en activité — tout le monde est le bienvenu !";
  } else if (
    lastMsg.match(/pay|salaire|argent|remunera|combien|gain|revenu|finance/)
  ) {
    reply =
      "Tu es rémunéré à la fin du programme. En plus, tu es logé et nourri pendant toute la durée du séjour, donc zéro dépense. C'est une vraie opportunité pour démarrer avec un capital !";
  } else if (
    lastMsg.match(
      /inscri|candidat|formulaire|rejoindre|postuler|dossier|particip/,
    )
  ) {
    reply =
      "Pour t'inscrire, fais défiler la page jusqu'à la section 'S'inscrire', remplis le formulaire et envoie ta candidature. Notre équipe te contactera dans les jours suivants. Bonne chance ! 🍀";
  } else if (lastMsg.match(/duree|combien de temps|long|mois|semaine/)) {
    reply =
      "Le programme dure 2 à 3 mois selon ta disponibilité. Tu choisis la durée qui te convient dans le formulaire d'inscription.";
  } else if (
    lastMsg.match(/loge|nourri|hebergement|logement|manger|repas|dormir/)
  ) {
    reply =
      "Oui, tu es entièrement pris en charge ! Logement et repas sont inclus pendant tout le séjour. Tu n'as rien à payer. 🏡";
  } else if (
    lastMsg.match(
      /diplome|etude|niveau|bac|licence|bfem|sans diplome|formation/,
    )
  ) {
    reply =
      "Aucun diplôme n'est requis ! Que tu aies le bac, une licence, ou aucun diplôme, tu peux postuler. Ce qui compte c'est ta motivation ! 💪";
  } else if (
    lastMsg.match(/contact|email|telephone|appel|joindre|equipe|support/)
  ) {
    reply =
      "Tu peux contacter l'équipe AgriSn par email à contact@agrisn.sn ou par téléphone au +221 77 000 00 00. On est là pour toi !";
  } else if (lastMsg.match(/merci|super|genial|parfait|ok|cool|bien|bonne/)) {
    reply =
      "Avec plaisir ! N'hésite pas si tu as d'autres questions. Et surtout, pense à t'inscrire au programme 🌱";
  } else if (lastMsg.match(/bonjour|salut|hello|bonsoir|yo|hi/)) {
    reply =
      "Salut ! Bienvenue sur AgriSn 🌾 Comment puis-je t'aider aujourd'hui ? Tu peux me poser toutes tes questions sur le programme !";
  } else {
    reply =
      "Je ne suis pas sûr de bien comprendre ta question 😅 Tu peux me demander par exemple : comment s'inscrire, quelles régions sont disponibles, ou quel secteur te correspond. Je suis là pour t'aider !";
  }

  addChatMsg(reply, "bot");
  chatHistory.push({ role: "assistant", content: reply });

  const chipsDiv = document.getElementById("chips");
  const allChips = [
    {
      label: "Quel secteur me correspond ?",
      msg: "Quel secteur me correspond ?",
    },
    { label: "Comment ça marche ?", msg: "Comment fonctionne le programme ?" },
    { label: "Quelle région ?", msg: "Quelle région choisir ?" },
    { label: "Conditions d'âge ?", msg: "Quelles sont les conditions d'âge ?" },
    { label: "Suis-je payé ?", msg: "Est-ce que je suis payé ?" },
    { label: "Comment s'inscrire ?", msg: "Comment s'inscrire au programme ?" },
  ];

  const lastUserMsg =
    chatHistory[chatHistory.length - 2]?.content.toLowerCase() || "";
  const remaining = allChips.filter(
    (c) => !lastUserMsg.includes(c.msg.toLowerCase().slice(0, 10)),
  );

  chipsDiv.innerHTML = "";
  remaining.slice(0, 3).forEach((c) => {
    const btn = document.createElement("button");
    btn.className = "chip";
    btn.textContent = c.label;
    btn.onclick = () => sendChip(c.msg);
    chipsDiv.appendChild(btn);
  });
  chipsDiv.style.display = "flex";
}
