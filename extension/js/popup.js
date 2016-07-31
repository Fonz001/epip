$(function(){
  var tabInfo = null;

  get_current_tab(function(tab){
    tabInfo = tab;

    // check if tab can be shared
    if (0 != tabInfo.url.indexOf('http')) {
      selectTab('noshare');
      return;
    }

    selectTab('share');

    get_data(function(data){
      // determine if profile data exists or show edit form
      if (!data.user.name) {
        selectTab('edit');
      } else {
        $('#input_name').val(data.user.name).parent().addClass('is-dirty');
        $('#name').text(data.user.name);
        if (data.user.email) {
          $('#input_email').val(data.user.email).parent().addClass('is-dirty');
        }
      }

      // generate users to share with
      $.each(data.users, function(index, value) {
        var isSend = data.shared.indexOf(value.userId) >- 1;
        $('#users').append(
          '<button class="mdl-button mdl-js-button mdl-js-ripple-effect' + (isSend ? ' mdl-button--colored' : '') + '" data-id="' + value.userId + '">' +
          '<i class="material-icons">share</i> ' + value.name +
          '</button>');
      });
      $('#users button').on('click', share_tab);

      // save edit form action
      $('#edit_form').on('submit', function(){
        var name = $('#input_name').val();
        var email = $('#input_email').val();

        $('#name').text(name);
        $('[data-id=' + data.user.userId + ']').text(name);

        // send new data to API
        set_data({
          name: name,
          email: email
        }, function(data){
          if (data.name) {
            selectTab('share');
          }
        });
        return false;
      });
    }, {
      url: tabInfo.url
    });
  });

  // profile edit page link
  $('#profile').on('click', function(){
    selectTab('edit');
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

    // delete if item was already shared
    if(e.hasClass('mdl-button--colored')) {
      data.del = true;
    }

    // share tab info
    set_data(data, function(response){
      if(e.hasClass('mdl-button--colored')) {
        e.removeClass('mdl-button--colored');
      } else {
        e.addClass('mdl-button--colored');
      }
    });
  }
});
