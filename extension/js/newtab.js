$(function(){
  get_data(function(data){
    console.log(data);

    var epip = {
      name: 'Team Epiphany',
      comment: 'Nothing is shared yet.<br>If others share something with you, it will show up here.',
      avatar: '',
      url: 'http://www.epip.nl',
      screenshot: '../img/logo.png'
    };

    if (0 != data.shares.length) {
      var share   = data.shares[0];
      var creator = data.users[share.creatorId];

      epip.name       = creator.name;
      epip.comment    = share.comment;
      epip.avatar     = creator.avatar;
      epip.url        = share.url;
      epip.screenshot = 'http://api.screenshotlayer.com/api/capture?access_key=d6ae0602784f7d1f84ca3e3fe98bc301&url=' + encodeURIComponent(share.url) + '&viewport=1440x900&width=1280';

      // inject gravatar image
      if (creator.email) {
        epip.avatar = '<img src="http://www.gravatar.com/avatar/' + md5(creator.email.toLowerCase()) + '">';
      }

      // overwrite screenshotlayer api with youtube image url
      var youtube = parseYoutube(share.url);
      if (youtube) {
        epip.screenshot = 'https://img.youtube.com/vi/' + youtube + '/0.jpg';
      }
    }

    $('#name').append(epip.name);
    $('#comment').append(epip.comment);
    $('#avatar').prepend(epip.avatar);
    $('#preview a').prop('href', epip.url);
    $('#preview img').prop('src', epip.screenshot);
  });
});
