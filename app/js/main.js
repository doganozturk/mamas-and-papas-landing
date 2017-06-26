(function() {
  "use strict";
  // call to action button scroll to form action
  const $callToActionButton = $("#callToActionButton");

  $callToActionButton.on("click", () => {
    $("html, body").animate(
      {
        scrollTop: $("#shareYourTopTipForm").offset().top
      },
      1000
    );
  });

  // activating datepicker on birthdate
  const activeDatepicker = () => {
    $("input[name=birthdate]").Zebra_DatePicker({
      default_position: "below"
    });
  };

  activeDatepicker();

  // add child form events
  const $parent = $("#parent");
  const $parentToBe = $("#parentToBe");
  const $other = $("#other");
  const $formGroupAddChildVariant = $(".form__group--add-child-variant");

  $parent.on("click", () => {
    $(".form__group--add-child-variant").removeClass(
      "form__group--add-child-variant--arrow-position-middle form__group--add-child-variant--arrow-position-right"
    );

    $("input[name=birthdate]")
      .parents(".form__control--birthdate-variant")
      .fadeIn();

    $(".form__group--add-child-variant").fadeIn();
  });

  $parentToBe.on("click", () => {
    $(".form__group--add-child-variant")
      .addClass("form__group--add-child-variant--arrow-position-middle")
      .removeClass("form__group--add-child-variant--arrow-position-right");

    $("input[name=birthdate]")
      .parents(".form__control--birthdate-variant")
      .fadeOut();

    $(".form__group--add-child-variant").fadeIn();
  });

  $other.on("click", () => {
    $(".form__group--add-child-variant")
      .addClass("form__group--add-child-variant--arrow-position-right")
      .removeClass("form__group--add-child-variant--arrow-position-middle");

    $(".form__group--add-child-variant").fadeOut();
  });

  // add child button event
  const $addChild = $("#addChild").parent();

  $addChild.on("click", () => {
    const $clone = $formGroupAddChildVariant.clone();
    const id = $clone.attr("id");
    const length = $(".form__group--add-child-variant").length + 1;

    const name = $clone.find("input[name=name]");
    const birthdate = $clone.find("input[name=birthdate]");

    name.val("");
    birthdate.val("");

    $clone
      .addClass("duplicate")
      .find("#addChild")
      .val("REMOVE")
      .attr("id", "removeChild_" + length);

    $clone
      .attr("id", id + "_" + length)
      .addClass("remove")
      .insertAfter($formGroupAddChildVariant);

    activeDatepicker();
  });

  // remove child button event
  $(document).on("click", ".remove .form__control--button-variant", e => {
    $(e.currentTarget).parent().remove();
  });

  // form validation
  const form = $("#shareYourTopTipForm form");

  form.validate({
    errorClass: "form__control--error-variant",
    validClass: "form__control--valid-variant",
    errorPlacement: $.noop,
    highlight: (element, errorClass, validClass) => {
      const $el = $(element);
      const $formControl = $el.closest(".form__control");

      $formControl.removeClass(validClass).addClass(errorClass);

      if ($el.is("textarea")) {
      }
    },
    unhighlight: (element, errorClass, validClass) => {
      const $el = $(element);
      const $formControl = $el.closest(".form__control");

      $formControl.addClass(validClass).removeClass(errorClass);

      if ($el.is("textarea")) {
      }
    },
    rules: {
      toptip: {
        maxlength: 200
      }
    }
  });
})();
