const app = app || {};

app.init = app.init || {};
app.config = app.config || {};

/**
 * adds functionality of checking
 * validation for dynamically added
 * DOM elements to jQuery
 * 
 */
app.config.checkForm = () => {
  $.validator.prototype.checkForm = function() {
    //overriden in a specific page
    this.prepareForm();
    for (
      let i = 0, elements = (this.currentElements = this.elements());
      elements[i];
      i++
    ) {
      if (
        this.findByName(elements[i].name).length != undefined &&
        this.findByName(elements[i].name).length > 1
      ) {
        for (
          let cnt = 0;
          cnt < this.findByName(elements[i].name).length;
          cnt++
        ) {
          this.check(this.findByName(elements[i].name)[cnt]);
        }
      } else {
        this.check(elements[i]);
      }
    }
    return this.valid();
  };
};

/**
 * call to action button scroll to form action
 * 
 */
app.init.slideToForm = () => {
  const $callToActionButton = $("#callToActionButton");

  $callToActionButton.on("click", () => {
    $("html, body").animate(
      {
        scrollTop: $("#shareYourTopTipForm").offset().top
      },
      1000
    );
  });
};

/**
 * activating datepicker on birthdate
 * 
 */
app.init.activateDatepicker = () => {
  $("input[name=birthdate]").Zebra_DatePicker({
    default_position: "below"
  });
};

/**
 * add child form events
 * 
 */
app.init.addChildFormEvents = () => {
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

    app.init.activateDatepicker();
  });
};

/**
 * remove child button event
 * 
 */
app.init.removeChild = () => {
  $(document).on("click", ".remove .form__control--button-variant", e => {
    $(e.currentTarget).parent().remove();
  });
};

/**
 * form validation 
 * 
 */
app.init.formValidation = () => {
  const $form = $("#shareYourTopTipForm form");

  const validationRules = {
    errorClass: "form__control--error-variant",
    validClass: "form__control--valid-variant",
    errorPlacement: $.noop,
    highlight: (element, errorClass, validClass) => {
      const $el = $(element);
      const $formControl = $el.closest(".form__control");

      $formControl.removeClass(validClass).addClass(errorClass);
    },
    unhighlight: (element, errorClass, validClass) => {
      const $el = $(element);
      const $formControl = $el.closest(".form__control");

      $formControl.addClass(validClass).removeClass(errorClass);
    },
    // showing formData as JSON
    // on form submit
    submitHandler: () => {
      const formData = {
        email: $("input[name=email]").val(),
        mobile: $("input[name=mobile]").val(),
        parent: $("input[name=parent]:checked").val(),
        children: [],
        toptip: $("textarea").val()
      };

      const $addChildForm = $(".form__group--add-child-variant");

      if ($addChildForm.is(":visible")) {
        $addChildForm.each((key, value) => {
          const $el = $(value);

          formData.children.push({
            name: $el.find("input[name=name]").val(),
            birthdate: $el.find("input[name=birthdate]:visible").length
              ? Date.parse($el.find("input[name=birthdate]").val())
              : false,
            gender: $el.find("select[name=gender] option:checked").val()
          });
        });
      } else {
        formData.children = false;
      }

      alert(JSON.stringify(formData));
    },
    rules: {
      toptip: {
        maxlength: 200
      }
    }
  };

  $form.validate(validationRules);
};

/**
 * textarea wordcount check
 * 
 */
app.init.textareaWordcountCheck = () => {
  const $textarea = $("textarea");
  const $textareaError = $("#textareaError");
  const allowedWordCount = 200;

  $textarea.on("keyup", e => {
    if ($textarea.val().length > allowedWordCount) $textareaError.show();
    else $textareaError.hide();
  });
};

/**
 * submit button activation
 * 
 */
app.init.activateSubmitButton = () => {
  const $submit = $("#submit");
  const $form = $("#shareYourTopTipForm form");

  $submit.on("click", e => {
    $form.submit();
  });
};

/**
 * init functions
 * 
 */
(function() {
  "use strict";
  app.config.checkForm();

  app.init.slideToForm();
  app.init.activateDatepicker();
  app.init.addChildFormEvents();
  app.init.removeChild();
  app.init.formValidation();
  app.init.textareaWordcountCheck();
  app.init.activateSubmitButton();
})();
