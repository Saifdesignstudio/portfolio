(function(){
  "use strict";

  /* -----------------------------------------------------------
     PROJECT DATA
  ----------------------------------------------------------- */
  var projects = [
    {
      id: "independence-day",
      title: "Pakistan Independence Day",
      category: "Photo Manipulation / Social Media Design",
      image: "images/independence-day.jpg",
      wide: true,
      description: "A patriotic Independence Day composition combining Pakistani landmarks, national imagery, atmospheric effects and typography into a single layered visual.",
      approach: "Built as a layered composite — the Minar-e-Pakistan and Mazar-e-Quaid were placed against a soft green atmospheric backdrop, with portrait imagery and the national flag arranged to keep a clear focal hierarchy. Bold display type anchors the base of the composition so the piece reads instantly on a social feed.",
      tools: "Adobe Photoshop"
    },
    {
      id: "fantasy-manip",
      title: "Fantasy Creative Manipulation",
      category: "Photo Manipulation",
      image: "images/fantasy-manip.jpg",
      wide: true,
      description: "A fantasy-style composition featuring a figure in a magical forest environment with glowing butterflies, water reflection and atmospheric lighting.",
      approach: "The scene was built around a water-reflection effect, blending a portrait into a forest backdrop and rebalancing color and light so every element — the glowing butterflies, the accent flowers, the ripple in the water — feels like it belongs to one lit environment rather than separate cut-outs.",
      tools: "Adobe Photoshop"
    },
    {
      id: "aviation-logo",
      title: "Aviation Logo",
      category: "Logo Design / Branding",
      image: "images/aviation-logo.jpg",
      wide: false,
      description: "A modern aviation-inspired logo concept using stylized aircraft shapes and a clean wordmark.",
      approach: "The mark reduces an aircraft silhouette into a minimal geometric form, paired with a spaced serif wordmark to keep the identity feeling premium and travel-oriented rather than literal.",
      tools: "Adobe Illustrator"
    },
    {
      id: "pizza-time",
      title: "Pizza Time",
      category: "Logo Design / Restaurant Branding",
      image: "images/pizza-logo.png",
      wide: false,
      description: "A playful restaurant logo combining a chef character, pizza illustration, circular badge composition and bold typography.",
      approach: "Built as a circular badge to work well on packaging, signage and social profiles alike — the chef character and pizza illustration carry the personality, while the arched wordmark ties the composition together.",
      tools: "Adobe Illustrator, Adobe Photoshop"
    },
    {
      id: "summer-sale",
      title: "Summer Fashion Sale",
      category: "Social Media / Advertising Design",
      image: "images/summer-sale.jpg",
      wide: false,
      description: "A promotional fashion-sale design using bold typography, vibrant orange and yellow shapes, product imagery and a strong discount callout.",
      approach: "Organic curved shapes and a warm palette were used to frame the product photo and lead the eye toward the discount badge, keeping the offer legible at a glance while the composition still feels editorial rather than templated.",
      tools: "Adobe Photoshop, Canva"
    },
    {
      id: "booster-energy",
      title: "Booster Energy Drink",
      category: "Logo Design / Brand Identity",
      image: "images/booster-logo.jpg",
      wide: false,
      description: "An energetic logo concept featuring a lightning bolt, circular symbol and bold typography built around a strong purple and orange identity.",
      approach: "The lightning bolt and sphere form a self-contained mark that reads clearly at small sizes, paired with a heavy condensed wordmark to communicate energy and impact instantly on a can or a shelf.",
      tools: "Adobe Illustrator"
    }
  ];

  /* -----------------------------------------------------------
     RENDER WORK GRID
  ----------------------------------------------------------- */
  var grid = document.getElementById("work-grid");

  function renderProjects(){
    var html = projects.map(function(p){
      return (
        '<article class="project-card reveal' + (p.wide ? ' card-wide' : '') + '" data-id="' + p.id + '" tabindex="0" role="button" aria-label="View ' + p.title + ' project">' +
          '<div class="project-media">' +
            '<img src="' + p.image + '" alt="' + p.title + ' — ' + p.category + '" loading="lazy">' +
            '<span class="project-view">View Project ' +
              '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 8h10M9 4l4 4-4 4"/></svg>' +
            '</span>' +
          '</div>' +
          '<div class="project-info">' +
            '<div>' +
              '<h3>' + p.title + '</h3>' +
              '<p>' + p.description + '</p>' +
            '</div>' +
            '<span class="project-category">' + p.category + '</span>' +
          '</div>' +
        '</article>'
      );
    }).join("");
    grid.innerHTML = html;
    attachCardEvents();
    observeReveals();
  }

  function attachCardEvents(){
    var cards = grid.querySelectorAll(".project-card");
    cards.forEach(function(card){
      card.addEventListener("click", function(){
        openModal(card.getAttribute("data-id"));
      });
      card.addEventListener("keydown", function(e){
        if(e.key === "Enter" || e.key === " "){
          e.preventDefault();
          openModal(card.getAttribute("data-id"));
        }
      });
    });
  }

  /* -----------------------------------------------------------
     MODAL
  ----------------------------------------------------------- */
  var modal = document.getElementById("project-modal");
  var modalBackdrop = document.getElementById("modal-backdrop");
  var modalClose = document.getElementById("modal-close");
  var modalImage = document.getElementById("modal-image");
  var modalCategory = document.getElementById("modal-category");
  var modalTitle = document.getElementById("modal-title");
  var modalDesc = document.getElementById("modal-desc");
  var modalApproach = document.getElementById("modal-approach");
  var modalTools = document.getElementById("modal-tools");
  var lastFocused = null;

  function openModal(id){
    var p = projects.filter(function(item){ return item.id === id; })[0];
    if(!p) return;
    modalImage.src = p.image;
    modalImage.alt = p.title;
    modalCategory.textContent = p.category;
    modalTitle.textContent = p.title;
    modalDesc.textContent = p.description;
    modalApproach.textContent = p.approach;
    modalTools.textContent = p.tools;
    lastFocused = document.activeElement;
    modal.setAttribute("data-open", "true");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    modalClose.focus();
  }

  function closeModal(){
    modal.setAttribute("data-open", "false");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if(lastFocused) lastFocused.focus();
  }

  modalBackdrop.addEventListener("click", closeModal);
  modalClose.addEventListener("click", closeModal);
  document.addEventListener("keydown", function(e){
    if(e.key === "Escape" && modal.getAttribute("data-open") === "true"){
      closeModal();
    }
  });

  /* -----------------------------------------------------------
     MOBILE NAV
  ----------------------------------------------------------- */
  var navToggle = document.getElementById("nav-toggle");
  var mainNav = document.getElementById("main-nav");

  navToggle.addEventListener("click", function(){
    var isOpen = mainNav.getAttribute("data-open") === "true";
    mainNav.setAttribute("data-open", String(!isOpen));
    navToggle.setAttribute("aria-expanded", String(!isOpen));
  });

  mainNav.querySelectorAll("a").forEach(function(link){
    link.addEventListener("click", function(){
      mainNav.setAttribute("data-open", "false");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* -----------------------------------------------------------
     SCROLL REVEAL
  ----------------------------------------------------------- */
  var revealObserver = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });

  function observeReveals(){
    document.querySelectorAll(".reveal").forEach(function(el){
      revealObserver.observe(el);
    });
  }

  /* -----------------------------------------------------------
     CONTACT FORM (no backend — placeholder confirmation)
  ----------------------------------------------------------- */
  var form = document.getElementById("contact-form");
  var formNote = document.getElementById("form-note");

  form.addEventListener("submit", function(e){
    e.preventDefault();
    formNote.textContent = "Thanks — this form isn't connected yet. Add your email or a form service to receive messages.";
  });

  /* -----------------------------------------------------------
     INIT
  ----------------------------------------------------------- */
  document.getElementById("year").textContent = new Date().getFullYear();
  renderProjects();

  // Reveal for non-grid sections
  document.querySelectorAll(".about-body, .about-heading, .skills-col, .service-card, .contact-copy, .contact-form").forEach(function(el){
    el.classList.add("reveal");
  });
  observeReveals();

})();
