(function ($, window, undefined) {

  function getQueryVariable(variable) {
    var query = window.location.search.substring(1),
      vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] === variable) {
        return pair[1];
      }
    }
  }

  function initBarProgress(query) {
    var percentage = document.getElementById("percentage");
    var elem = document.getElementById("progress_bar");
    var width = 1;
    var id = setInterval(frame, 14);

    function frame() {
      if (width === 100) {
        clearInterval(id);
      } else {
        width++;
        percentage.innerHTML = width + '%';
        elem.style.width = width + '%';
        if (width === 100) {
          window.location.href = query;
          // console.log(query);
        }
      }
    }
  }

  var query = decodeURIComponent(getQueryVariable("redirect") || "").replace(/\+/g, "%20");
  if (query != "") {
    $('.lead').html("Aguarde estamos redirecionando para <span>" + query + "</span>");
    initBarProgress(query);
  }

})(jQuery, window);
