// Generated by CoffeeScript 1.3.3
(function() {
  var jQueryIntroJs;

  jQueryIntroJs = (function() {

    function jQueryIntroJs(steps) {
      this.steps = $.extend([], steps);
      this.currentStep = 0;
      if (!(this.steps.length > 0)) {
        return;
      }
      this.start();
    }

    jQueryIntroJs.prototype.start = function() {
      var _this = this;
      this.addOverlay();
      this.addHelperLayer();
      this.showCurrentStep();
      $(document).on("keydown.introjs", (function(e) {
        return _this.keydown(e);
      }));
      $(document).on("click.introjs", ".introjs-nextbutton", (function() {
        return _this.nextStep();
      }));
      return $(document).on("click.introjs", ".introjs-skipbutton", (function() {
        return _this.endTour();
      }));
    };

    jQueryIntroJs.prototype.keydown = function(e) {
      switch (e.keyCode) {
        case 27:
          return this.endTour();
        case 37:
          return this.previousStep();
        case 39:
          return this.nextStep();
      }
    };

    jQueryIntroJs.prototype.addOverlay = function() {
      var _this = this;
      this.$overlayDiv = $("<div class='introjs-overlay'></div>");
      this.$overlayDiv.on("click", function() {
        return _this.endTour();
      });
      this.$overlayDiv.appendTo("body");
      return this.$overlayDiv.animate({
        opacity: 0.5
      }, 10);
    };

    jQueryIntroJs.prototype.addHelperLayer = function() {
      this.$helperLayerDiv = $("<div class=\"introjs-helperLayer\">\n  <span class=\"introjs-helperNumberLayer\"></span>\n</div>");
      return this.$helperLayerDiv.appendTo("body");
    };

    jQueryIntroJs.prototype.setHelperLayer = function($el, text, placement, minWidth) {
      var _this = this;
      if (placement == null) {
        placement = 'bottom';
      }
      if (minWidth == null) {
        minWidth = false;
      }
      this.$helperLayerDiv.popover('destroy');
      this.$helperLayerDiv.css({
        width: $el.outerWidth() + 10,
        height: $el.outerHeight() + 10,
        top: $el.offset().top - 5,
        left: $el.offset().left - 5
      });
      this.$helperLayerDiv.find(".introjs-helperNumberLayer").text(this.currentStep + 1);
      return setTimeout(function() {
        _this.$helperLayerDiv.popover({
          content: text,
          trigger: 'manual',
          template: "<div class=\"popover\">\n  <div class=\"arrow\"></div>\n  <div class=\"popover-inner\">\n    <div class=\"popover-content\">\n      <p></p>\n    </div>\n    <div class=\"introjs-tooltipbuttons\">\n      <a class=\"introjs-skipbutton\">Skip</a>\n      <a class=\"introjs-nextbutton\">" + (_this.steps[_this.currentStep + 1] != null ? 'Next →' : 'Done!') + "</a>\n    </div>\n  </div>\n</div>",
          placement: placement
        });
        return _this.$helperLayerDiv.popover('show');
      }, 300);
    };

    jQueryIntroJs.prototype.showCurrentStep = function() {
      var $el, step,
        _this = this;
      step = this.steps[this.currentStep];
      if (typeof step['el'] === 'function') {
        $el = step['el']().slice(0, 1);
      } else {
        $el = $(step['el']).slice(0, 1);
      }
      if ($el.length === 0) {
        this.steps.splice(this.currentStep, 1);
        return (this.steps.length === this.currentStep ? this.endTour() : this.showCurrentStep());
      }
      this.setHelperLayer($el, step['text'], step['placement'], step['minWidth']);
      setTimeout(function() {
        return $el.addClass('introjs-showElement');
      }, 200);
      if (!(this.steps[this.currentStep + 1] != null)) {
        return this.$helperLayerDiv.find(".introjs-nextbutton").text("Done!");
      }
    };

    jQueryIntroJs.prototype.previousStep = function() {
      return this.changeStep(-1);
    };

    jQueryIntroJs.prototype.nextStep = function() {
      return this.changeStep(1);
    };

    jQueryIntroJs.prototype.changeStep = function(delta) {
      $(".introjs-showElement").removeClass("introjs-showElement");
      if (this.steps[this.currentStep + delta] == null) {
        return this.endTour();
      }
      this.currentStep = this.currentStep + delta;
      return this.showCurrentStep();
    };

    jQueryIntroJs.prototype.endTour = function() {
      $(".introjs-showElement").removeClass("introjs-showElement");
      this.$helperLayerDiv.popover('destroy');
      this.$helperLayerDiv.remove();
      this.$overlayDiv.fadeOut(100, function() {
        return $(this).remove();
      });
      return $(document).off("introjs");
    };

    return jQueryIntroJs;

  })();

  (function($) {
    return $.extend({
      intro: function(steps) {
        return new jQueryIntroJs(steps);
      }
    });
  })(jQuery);

}).call(this);
