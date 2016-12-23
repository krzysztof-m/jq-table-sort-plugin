//cache rows and cells

(function($) {
  $.fn.sortTable = function( options ) {
    var settings = $.extend(true,{
      compare: {
       number: function(a,b) {
         return Number(a) - Number(b);
       },
       string: function(a,b) {
         a = a.replace(/(\(|\))/g,'');
         b = b.replace(/(\(|\))/g,'');
         if (a < b)
            return -1;
          else
            return (a > b) ? 1 : 0;
       }
      }
    },options);
    
    return this.each(function() {
      var $table = $(this),
          $thead = $table.find('thead'),
          $headers = $thead.find('th'),
          $tbody = $table.find('tbody'),
          rows = $tbody.find('tr').toArray();
      
      $headers.on('click',function() {
        var $header = $(this),
            column,
            compare;
        
        if ($header.hasClass('ascending') || $header.hasClass('descending')) {
          $header.toggleClass('ascending descending');
          $tbody.append($(rows.reverse()));
        } else {
          compare = $header.data('compare');
          if(settings.compare.hasOwnProperty(compare)) {
            $header.addClass('ascending').siblings().removeClass('ascending descending');
            column = $headers.index($header);
            
            rows.sort(function(a,b) {
              a = $(a).find('td').eq(column).text();
              b = $(b).find('td').eq(column).text();
              return settings.compare[compare](a,b);
            });
            
            $tbody.append($(rows));
          }
        }
      });
    });
  }
}(jQuery));

$(document).ready(function() {
  var $table = $('.sortable-table');
  $table.sortTable({
    compare: {
      artist: function(a,b) {
        a = a.split(' ');
        a = a[a.length - 1];
        b = b.split(' ');
        b = b[b.length - 1];
        if (a < b)
            return -1;
          else
            return (a > b) ? 1 : 0;
    }
    }
  });
});