/* global jQuery */
jQuery(function($) {
  'use strict';

  // Check if the JS is working because you can never be too careful
  console.log('Initilize?');
  
  // Variables
  var data;
  
  // Add a hover class for the rows
  $("table").on('mouseover mouseleave', 'td', function(e) {
        if (e.type == 'mouseover') {
          $(this).parent().addClass("hover");
        }
        else {
          $(this).parent().removeClass("hover");
        }
    });
  
    $.ajax({
        type: 'POST', 
        url: "../rentable.php",
        dataType: 'json',
        data: data,
        success: function (data) { 
            $.each(data, function(index, item) {
                 $('table tbody').append(
                     '<tr><td>' + item.ApartmentName + '</td><td>' + item.Beds + '</td><td>' + item.Baths + '</td><td>' + item.FloorplanName + '</td><td>' + '&dollar;' + item.MinimumRent + ' to &dollar;' + item.MaximumRent + '</td><td>' + '<a href="' + item.ApplyOnlineURL + '" target="_blank">Link</a></td>'
                 );
            });
            $('table').addClass('success');
        },
        error: function() {
            $('.error-message').addClass('error');
        }
    });
});