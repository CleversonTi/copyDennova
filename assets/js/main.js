$(function () {
  if ($(window).width() <= 768 && $(".header .header-profile").length) {
    // Adiciona botão hamburger ao final do .header-profile
    const $headerProfile = $(".header .header-profile");
    if ($headerProfile.length) {
      const $mobileToggle = $(`
        <div class="mobile-toggle d-md-none">
          <i class="fas fa-bars fa-2x"></i>
        </div>
      `);
      $headerProfile.append($mobileToggle);
    }
    // Adiciona botão close no início de .sidebar dentro do .nav-container
    const $sidebar = $(".nav-container .sidebar");
    if ($sidebar.length && $sidebar.find(".close-btn").length === 0) {
      const $closeBtn = $(`
        <div class="close-btn d-flex justify-content-end mb-3">
          <i class="fas fa-times fa-2x"></i>
        </div>
      `);
      $sidebar.prepend($closeBtn);
    }
  }

  const $searchHTML = $(`
  <div class="search-wrapper w-100 d-block d-md-none my-3 px-3">
    <div class="input-group rounded-pill bg-white shadow-sm">
      <span class="input-group-text border-0 bg-transparent">
        <i class="fas fa-search text-muted"></i>
      </span>
      <input
        type="text"
        class="form-control border-0 bg-transparent"
        placeholder="Buscar"
        aria-label="Buscar"
        id="searchInput"
      />
    </div>
  </div>
`);

  const isDesktop = $(window).width() >= 768;

  if (isDesktop) {
    const $logo = $(".logo-wrapper");
    const $profile = $(".header-profile");

    if ($logo.length && $profile.length) {
      $searchHTML.addClass("d-none d-md-block mx-3"); // visível só no desktop
      $searchHTML.insertAfter($logo);
    }
  } else {
    const $header = $(".header");
    if ($header.length) {
      $searchHTML.addClass("d-block d-md-none"); // visível só no mobile
      $searchHTML.insertAfter($header);
    }
  }

  // Toggle submenu da sidebar
  $(".sidebar .font-weight-bold").on("click", function () {
    const $clicked = $(this);
    const $item = $clicked.closest("li");
    const $submenu = $item.find(".subCat").first();

    $submenu.toggleClass("show");
    $clicked.toggleClass("icon-rotated");
  });

  // Toggle menu mobile
  $(".mobile-toggle").on("click", function () {
    $(".nav-container").toggleClass("open");
  });

  $(".close-btn").on("click", function () {
    $(".nav-container").removeClass("open");
  });
  function initSlickIfNeeded($carousel) {
    if (!$carousel.hasClass("slick-initialized")) {
      $carousel.slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: true,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 8000,
        swipeToSlide: true,
        responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 2,
              arrows: false,
            },
          },
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 1,
              arrows: false,
            },
          },
        ],
      });
    }
  }
  function initSlickPosts($carousel) {
    if (!$carousel.hasClass("slick-initialized")) {
      $carousel.slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: true,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 8000,
        swipeToSlide: true,
        responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 2,
              arrows: false,
            },
          },
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 1,
              arrows: false,
            },
          },
        ],
      });
    }
  }

  // Inicializa carrossel da aba ativa (normalmente "Todos")
  initSlickIfNeeded($("#todos .carousel-treinamentos"));

  // Inicializa carrossel da aba ativa (normalmente "Todos")
  initSlickPosts($("#posts .carousel-posts"));

  // Ao mudar de aba, espera a aba estar visível antes de inicializar slick
  $('a[data-toggle="tab"]').on("shown.bs.tab", function (e) {
    const target = $(e.target).attr("href");
    const $carousel = $(target).find(".carousel-treinamentos");

    setTimeout(() => {
      initSlickIfNeeded($carousel);
    }, 100); // Aguarda aba ser exibida
  });
  getGitHubProfile("cleversonti").then((data) => {
    const el = document.getElementById("footer-info");
    console.log(el);
    if (!el) {
      console.warn("Elemento #footer-info não encontrado.");
      return;
    }

    el.innerHTML = "";

    if (data) {
      el.innerHTML = `
        <small>
          Desenvolvido por <a href="${data.html_url}" target="_blank">@${
        data.login
      }</a> • 
          ${data.public_repos} repositórios públicos • 
          Desde ${new Date(data.created_at).getFullYear()}
        </small>
      `;
    } else {
      el.innerText = "Desenvolvedor: cleversonti";
    }
  });
});

$(window).on("scroll", function () {
  const $header = $(".header");
  const $main = $(".main-content");

  if ($(this).scrollTop() > 50) {
    if (!$header.hasClass("fixed-header")) {
      $header.addClass("fixed-header");

      // Adiciona margin-top baseado na altura real do header
      const headerHeight = $header.outerHeight();
      $main.css("margin-top", headerHeight + "px");
    }
  } else {
    $header.removeClass("fixed-header");
    $main.css("margin-top", "0");
  }
});

$(document).on("input", "#searchInput", function () {
  const search = $(this).val().toLowerCase().trim();

  // Filtra cards de treinamento
  $(".card-training").each(function () {
    const title = $(this).find("h5").text().toLowerCase();
    $(this).toggle(title.includes(search));
  });

  // Filtra posts
  $(".post-card").each(function () {
    const title = $(this).find(".card-title").text().toLowerCase();
    $(this).toggle(title.includes(search));
  });
});
