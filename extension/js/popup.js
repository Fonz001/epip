$(document).ready(function() {
  var tabInfo = null;

  get_current_tab(function(tab) {
    tabInfo = tab;

    if (0 != tabInfo.url.indexOf('http')) {
      document.write('<img src="https://img.youtube.com/vi/3ge8RjQQvY8/maxresdefault.jpg" style="height:145px;float:left;margin-right:10px;"><h1>this<br>is<br>not<br>a<br>website</h1>');
      return;
    }

    get_data(function(data) {
      // determine if profile data exists
      if (!data.user.name) {
        $('#edit').addClass('show');
      } else {
        $('#input_name').val(data.user.name);
        $('#input_email').val(data.user.email);
        $('#name').text(data.user.name);
      }

      // generate users to share with
      $.each(data.users, function(index, value) {
        var isSend = data.shared.indexOf(value.userId) >- 1;
        $('#users').append('<button class="' + (isSend?'sent':'') + '" data-id="' + value.userId + '">' + value.name + '</button>');
      });
      $('#users button').on('click', share_tab);

      // show edit page action
      $('#profile').on('click', function() {
        $('#edit').addClass('show');
      });

      // save edit form action
      $("#save-name").on('click', function() {
        var name = $('#input_name').val();
        var email = $('#input_email').val();

        $('#name').text(name);
        $('[data-id=' + data.user.userId + ']').text(name);

        set_data({
          name: name,
          email: email
        }, function(data){
          if (data.name) {
            $('#edit').removeClass('show');
          }
        });
      });
    }, {
      url: tabInfo.url
    });
  });

  // share tab
  function share_tab(event) {
    event.stopPropagation();

    var e = $(event.target);
    var data = {
      url:     tabInfo.url,
      title:   tabInfo.title,
      comment: $('#comment').val(),
      user:    e.attr('data-id')
    };

    if(e.hasClass('sent')) {
      data.del = true;
    }

    // share tab info
    set_data(data, function(response) {
      if(e.hasClass('sent')) {
        e.removeClass('sent');
      } else {
        e.addClass('sent');
      }
    });
  }
});

// https://developer.chrome.com/extensions/tabs#method-query
// tab.url is only available if the "activeTab" permission is declared.
