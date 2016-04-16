$(function(){

    // inject user image
    var src = 'https://secure.gravatar.com/avatar/cb0853110a3e6c0f6220465716ff7fed.jpg';
    var img = new Image();
    img.src = src;
    $('#author').append(img);

    // inject website preview image
    var url = 'http://www.madx.nl';
    var src = 'http://api.screenshotlayer.com/api/capture?access_key=d6ae0602784f7d1f84ca3e3fe98bc301&url=http://madx.nl&viewport=1440x900&width=250';
    var img = new Image();
    img.src = src;
    $('#preview').append('<a href="' + url + '"></a>');
    $('#preview a').append(img);
    
});