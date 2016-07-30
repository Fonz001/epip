$(function(){
  get_data(function(data) {
    console.log(data);

    if(data.shares.length < 1)
    {
      var avatar  = '<img src="http://www.iconsfind.com/wp-content/uploads/2015/08/20150831_55e46b18e2a80.png">';
      var name    = '<p><strong>Nothing was shared yet</strong></p><p></p>';
      var comment = '<p><em>If others share links with you they will show up here</em></p>';
      $('#preview').hide();
    }
    else
    {
      var share   = data.shares[0];
      var creator = data.users[share.creatorId];
      var name    = creator.name;
      var email   = creator.email;
      var avatar  = creator.avatar;

      // TMP
      var avatar  = 'http://www.iconsfind.com/wp-content/uploads/2015/08/20150831_55e46b18e2a80.png';
      if(email) {
        avatar = 'http://www.gravatar.com/avatar/' + md5(email.toLowerCase());
      }
      var avatar  = '<img src="' + avatar + '">';
      var name    = '<p><strong>Shared by</strong></p><p>' + name + '</p>';
      var comment = '<p><em>"' + share.comment + '"</em></p>';
      var screenshot = 'http://api.screenshotlayer.com/api/capture?access_key=d6ae0602784f7d1f84ca3e3fe98bc301&url=' + encodeURIComponent(share.url) + '&viewport=1440x900&width=1280';

      var youtube = parseYoutube(share.url);
      if(youtube) {
        screenshot = 'https://img.youtube.com/vi/' + youtube + '/0.jpg';
      }

      var screenshot = '<a href="' + share.url + '"><img src="' + screenshot + '"><div class="gradient"><strong>check it out!</strong></div></a>';
    }

    $('#author').append(avatar).append(name);
      $('#preview').append(screenshot);
      $('#comment').append(comment).width(($('#comment em').outerWidth() + 30) + 'px');  // width fix
  });
});
