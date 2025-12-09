$(document).ready(function() {
  // Helper function to toggle a specific section and close others
  var toggleSection = function(button, type) {
      var parent = button.parent().parent();
      
      // Toggle the clicked content block
      parent.find('.' + type + '.hidden').toggleClass('open');
      
      // Close any other open blocks (abstract, bibtex, etc.) in this entry
      parent.find('.hidden.open').not('.' + type).removeClass('open');
  };

  // Add click listeners to all buttons
  $("a.abstract").click(function() { toggleSection($(this), 'abstract'); });
  $("a.bibtex").click(function() { toggleSection($(this), 'bibtex'); });
  $("a.award").click(function() { toggleSection($(this), 'award'); });
  $("a.pdf").click(function() { toggleSection($(this), 'pdf'); });
  $("a.video").click(function() { toggleSection($(this), 'video'); });
  $("a.poster").click(function() { toggleSection($(this), 'poster'); });


  $("a").removeClass("waves-effect waves-light");

  // bootstrap-toc
  if ($("#toc-sidebar").length) {
    // remove related publications years from the TOC
    $(".publications h2").each(function () {
      $(this).attr("data-toc-skip", "");
    });
    var navSelector = "#toc-sidebar";
    var $myNav = $(navSelector);
    Toc.init($myNav);
    $("body").scrollspy({
      target: navSelector,
    });
  }

  // add css to jupyter notebooks
  const cssLink = document.createElement("link");
  cssLink.href = "../css/jupyter.css";
  cssLink.rel = "stylesheet";
  cssLink.type = "text/css";

  let jupyterTheme = determineComputedTheme();

  $(".jupyter-notebook-iframe-container iframe").each(function () {
    $(this).contents().find("head").append(cssLink);

    if (jupyterTheme == "dark") {
      $(this).bind("load", function () {
        $(this).contents().find("body").attr({
          "data-jp-theme-light": "false",
          "data-jp-theme-name": "JupyterLab Dark",
        });
      });
    }
  });

  // trigger popovers
  $('[data-toggle="popover"]').popover({
    trigger: "hover",
  });
});
