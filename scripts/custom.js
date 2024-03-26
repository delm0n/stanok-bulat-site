$(document).ready(function () {
  // преобразование select в ul/li
  var selects = [];
  $("body")
    .find(".custom-list")
    .each(function () {
      selects.push($(this));
    });

  selects.forEach(function (item, i, selects) {
    // Элемент select, который будет замещаться:
    var select = item;
    var selectBoxContainer = $("<div>", {
      class: "custom-select",
      html: '<div class="selectBox"></div>',
    });
    var dropDown = $("<ul>", { class: "dropDown" });
    var selectBox = selectBoxContainer.find(".selectBox");

    // Цикл по оригинальному элементу select
    select.find("option").each(function (i) {
      var option = $(this);
      if (i == 0) {
        selectBox.html(option.text());
        //return true;
      }

      // Создаем выпадающий пункт в соответствии с данными select:
      var li = $("<li>", {
        html: option.text(),
      });

      li.on("click touchstart", function () {
        selectBox.html(option.text());
        dropDown.trigger("hide");

        // Когда происходит событие click, мы также отражаем изменения в оригинальном элементе select:
        select.val(option.val());
        return false;
      });

      dropDown.append(li);
    });

    selectBoxContainer.append(dropDown.hide());
    select.hide().after(selectBoxContainer);

    // Привязываем пользовательские события show и hide к элементу dropDown:
    dropDown
      .bind("show", function () {
        if (dropDown.is(":animated")) {
          return false;
        }
        selectBox.addClass("expanded");
        dropDown.slideDown();
      })
      .bind("hide", function () {
        if (dropDown.is(":animated")) {
          return false;
        }
        selectBox.removeClass("expanded");
        dropDown.slideUp();
      })
      .bind("toggle", function () {
        if (selectBox.hasClass("expanded")) {
          dropDown.trigger("hide");
        } else dropDown.trigger("show");
      });

    selectBox.on("click touchstart", function () {
      dropDown.trigger("toggle");
      return false;
    });

    // Если нажать кнопку мыши где-нибудь на странице при открытом элементе dropDown, он будет спрятан:
    $(document).on("click touchstart", function () {
      dropDown.trigger("hide");
    });
  });

  // всплывающее окно
  $(".fancybox").fancybox();

  // галерея
  $(".fancybox-gallery").fancybox({
    loop: true,
    animationEffect: "zoom",
    transitionEffect: "slide",
    transitionDuration: 500,
  });

  $(".fancybox-gallery-gnutik").fancybox({
    loop: true,
    animationEffect: "zoom",
    transitionEffect: "slide",
    transitionDuration: 500,
  });

  $(".fancybox-gallery-ulitka").fancybox({
    loop: true,
    animationEffect: "zoom",
    transitionEffect: "slide",
    transitionDuration: 500,
  });

  $(".fancybox-gallery-torsion").fancybox({
    loop: true,
    animationEffect: "zoom",
    transitionEffect: "slide",
    transitionDuration: 500,
  });

  $(".fancybox-real-photo").fancybox({
    loop: true,
    animationEffect: "zoom",
    transitionEffect: "slide",
    transitionDuration: 500,
  });

  $("#success").fancybox({
    afterClose: $.redirectFunc,
  });

  $.goods = JSON.parse(document.body.getAttribute("data-goods"));
  $.model = {
    481387: {
      image: "images/ulitka-modal-min.png",
      model_name: "ulitka",
      model_name_form: "Улитка",
      sale: "50",
    },
    481465: {
      image: "images/models/complect-ulitka_opravki-form.jpg",
      model_name: "ulitka_opravki",
      model_name_form: "улитку с оправкой",
      sale: "29",
    },
    481466: {
      image: "images/ulitka-dop/ulitka-dop.png",
      model_name: "",
      model_name_form: "оправку для улитки",
      sale: "40",
    },
    481388: {
      image: "images/gnutik-modal-min.png",
      model_name: "gnutik",
      model_name_form: "Гнутик",
      sale: "27",
    },
    481386: {
      image: "images/torsion-modal-min.png",
      model_name: "torsion",
      model_name_form: "Торсион",
      sale: "33",
    },
    481389: {
      image: "images/complect-modal-min.png",
      model_name: "",
      model_name_form: "Комплект из 3 станков",
      sale: "40",
    },
    481464: {
      image: "images/models/set-opr.jpg",
      model_name: "",
      model_name_form: "",
      sale: "40",
    },
    482030: {
      image: "images/models/komplekt_s_opravkoi.jpg",
      model_name: "",
      model_name_form: "",
      sale: "40",
    },
  };

  $(".present-sale .button").on("click touchstart", function () {
    var id = $(this).data("id");
    var sale = $(this).data("sale");
    var price = $(this).data("price");

    $("#dop-modal input[name=id]").val(id);
    $("#dop-modal .sale").text(sale);
    $("#dop-modal .new-price").text(price);
  });

  $('[href="#order-model"]').on("click touchstart", function () {
    var id, sale, name;
    id = $(this).data("id");
    saleNum = $(this).data("sale");
    name = $(this).data("name");
    img = $(this).data("img");

    console.log(id);

    // $('#order-model form input[name="id"]').val(id);
    $("#order-model .img-container img").attr("src", img);
    $("#order-model .modal-title .model-name").text(name);
    $("#order-model .modal-title .model-sale").text(saleNum + "%");
    $("#order-model .modal-title .model-price span").text(
      $.goods[id]["priceF"]
    );

    $("#order-model form .main_product_id").attr("value", id);
    $("#order-model form .main_product_q").attr("name", "quantity[" + id + "]");
  });

  // меняем цены на формах в зависимости от модели
  $(".form-container .custom-select li").on("click touchstart", function () {
    var id = $(this).closest(".form-container").find(".custom-list").val();
    $(this)
      .closest(".columns")
      .find(".model-sale")
      .text($.model[id].sale + "%");

    $(this)
      .closest(".columns")
      .find(".old-price span")
      .text($.goods[id]["oldPriceF"]);
    $(this)
      .closest(".columns")
      .find(".new-price span")
      .text($.goods[id]["priceF"]);

    $(this).closest(".columns").find(".main_product_id").attr("value", id);
    $(this)
      .closest(".columns")
      .find(".main_product_q")
      .attr("name", "quantity[" + id + "]");
  });

  // меняем картинку на всплывашке в зависимости от модели
  $(".custom-select li").on("click touchstart", function () {
    var id = $(this).closest("form").find(".custom-list").val();
    var form = $(this).closest(".form-popup");
    form.find("img").attr("src", $.model[id].image);
  });

  // наведение на миниатюры галереи
  var a = jQuery;
  a(
    "#gallery .fancybox-gallery, #store .fancybox-gallery, #photo .fancybox-gallery"
  )
    .mouseenter(function () {
      var b = a("div.vlb_zoom", this);
      if (!b.length) {
        b = a('<div class="vlb_zoom" style="position:absolute">')
          .hide()
          .appendTo(this);
        a("img:first", b).detach();
      }
      b.fadeIn("fast");
    })
    .mouseleave(function () {
      a("div", this).fadeOut("fast");
    });

  // вставить фото на всплывашку
  $(".button.fancybox").on("click touchstart", function () {
    var photo, popup;
    photo = $(this).data("img");
    popup = $(this).attr("href");
    $(popup).find(".img-container img").attr("src", photo);
  });

  //меню бургер на мобильных new
  $("#header .burger-container span").on("click", function () {
    $("#header .navbar-block").toggleClass("navbar-block__visible");
    $("#header .burger-container").toggleClass("burger-wrap");

    setTimeout(function () {
      $("#header .navbar-block").toggleClass("navbar-block__visible-animation");
    }, 10);
  });

  $("#header .navbar-block .navbar-block__item a").on("click", function () {
    var scroll_el = $(this).attr("href");
    $("html, body").animate({ scrollTop: $(scroll_el).offset().top }, 500);
    return false;
  });

  function scrolling(upSelector) {
    $(window).scroll(function () {
      if ($(this).scrollTop() > 1000) {
        $(upSelector).fadeIn(1000);
      } else {
        $(upSelector).fadeOut(1000);
      }
    });
    $(upSelector).click(function () {
      $("body, html").animate({ scrollTop: 0 }, 800);
    });
  }
  scrolling(".button-up");

  $("#header .header-main-container .pulse-container")
    .mouseenter(function () {
      var classStr = $(this).attr("class").split(/\s+/)[1];
      var hoverdiv = $(
        "<div class='pulse-container-modal " +
          classStr +
          "-modal" +
          " pulse-container-modal__active '><img src='images/" +
          classStr +
          ".png' alt=''></div>"
      );

      $("#header .header-main-container .img-tablet-block").append(hoverdiv);
      var animationSvgContainer = $(
        "#header .header-main-container" +
          " ." +
          classStr +
          " .animation-svg-container"
      );

      var leftNum =
        animationSvgContainer.offset().left -
        hoverdiv.width() / 2 +
        animationSvgContainer.width() / 2 -
        5;
      var topNum =
        animationSvgContainer.offset().top -
        hoverdiv.height() -
        animationSvgContainer.height() / 2 +
        20;

      hoverdiv.fadeIn(500);
      if ($(this).hasClass("pulse-container__gnutic")) {
        leftNum =
          animationSvgContainer.offset().left -
          hoverdiv.width() / 2 +
          animationSvgContainer.width() / 2;
        topNum =
          animationSvgContainer.offset().top + animationSvgContainer.height();
      }

      hoverdiv.offset({ top: topNum, left: leftNum });
    })
    .mouseleave(function () {
      // var hoverdiv = document.querySelector('.pulse-container-modal__active');
      var hoverdiv = $(
        "#header .header-main-container .pulse-container-modal__active"
      );
      hoverdiv.fadeOut();
      setTimeout(function () {
        hoverdiv.remove();
      }, 400);
    });
  //слайдеры на странице
  init_slider_ulitka();
  init_slider_gnutik();
  init_slider_torsion();
  init_slider();
  init_slider_decstop();

  $(window).resize(function () {
    waitForFinalEvent(
      function () {
        setEqualHeight();
      },
      500,
      "some unique string"
    );
  });
});

$(window).on("load", function () {
  setEqualHeight();
});

// высота блоков отзывов
function setEqualHeight() {
  if (document.documentElement.clientWidth > 979) {
    $("#decstop-slider .feedback-item").css("height", "auto");

    var tallestcolumn = 0;
    $("#decstop-slider")
      .children()
      .each(function () {
        var currentHeight = $(this).height();
        if (currentHeight > tallestcolumn) {
          tallestcolumn = currentHeight;
        }
      });

    $("#decstop-slider .feedback-item").css("height", tallestcolumn - 80);
  }
}

function init_slider() {
  $("#mobile-slider").slick({
    infinite: true,
    arrows: true,
    dots: true,
    adaptiveHeight: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  });
}

function init_slider_decstop() {
  $("#decstop-slider").slick({
    infinite: true,
    arrows: true,
    dots: true,
    adaptiveHeight: true,
    slidesToShow: 2,
    slidesToScroll: 2,
    speed: 800,
  });
}

function init_slider_ulitka() {
  $("#ulitka-slider-1").slick({
    infinite: true,
    arrows: true,
    dots: false,
    loop: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 800,
  });

  $("#ulitka-slider-2").slick({
    infinite: true,
    arrows: true,
    dots: false,
    loop: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 800,
  });

  $("#ulitka-slider-3").slick({
    infinite: true,
    arrows: true,
    dots: false,
    loop: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 800,
  });

  $("#ulitka-slider-4").slick({
    infinite: true,
    arrows: true,
    dots: false,
    loop: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 800,
  });
}

function init_slider_gnutik() {
  $("#gnutik-slider-1").slick({
    infinite: true,
    arrows: true,
    dots: false,
    loop: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 800,
  });

  $("#gnutik-slider-2").slick({
    infinite: true,
    arrows: true,
    dots: false,
    loop: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 800,
  });

  $("#gnutik-slider-3").slick({
    infinite: true,
    arrows: true,
    dots: false,
    loop: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 800,
  });
}

function init_slider_torsion() {
  $("#torsion-slider-1").slick({
    infinite: true,
    arrows: true,
    dots: false,
    loop: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 800,
  });

  $("#torsion-slider-2").slick({
    infinite: true,
    arrows: true,
    dots: false,
    loop: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 800,
  });
}
// рассрочка

//цена для рассрочки
const priceFormat = (num) => new Intl.NumberFormat("ru-RU").format(num);
const priceRassrochka = $("#tinkoff-block .new-price span");
const fullPriceRassrochka = $("#tinkoff-block .old-price span")
  .text()
  .replace(/\s+/g, "");
priceRassrochka.text(priceFormat(Math.floor(Number(fullPriceRassrochka) / 4)));

var waitForFinalEvent = (function () {
  var timers = {};
  return function (callback, ms, uniqueId) {
    if (!uniqueId) {
      uniqueId = "Don't call this twice without a uniqueId";
    }
    if (timers[uniqueId]) {
      clearTimeout(timers[uniqueId]);
    }
    timers[uniqueId] = setTimeout(callback, ms);
  };
})();
