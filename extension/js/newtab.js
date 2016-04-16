$(function(){

    // hardcoded user of the extension
    var slackUser = 'bits-michelangelo'

    $.get('http://local.funcolors.nl/get/?User=' + slackUser, function(data){

        // hardcoded slack user images
        var slackImage = 'https://secure.gravatar.com/avatar/cb0853110a3e6c0f6220465716ff7fed.jpg?s=512';
        switch(data.User)
        {
            case '@bits-donatello':    slackImage = 'https://secure.gravatar.com/avatar/e60cd391672beff50d78f7bb89b53d7c.jpg?s=512'; break;
            case '@bits-michelangelo': slackImage = 'https://secure.gravatar.com/avatar/cb0853110a3e6c0f6220465716ff7fed.jpg?s=512'; break;
            case '@bits-leonardo':     slackImage = 'https://secure.gravatar.com/avatar/d3a8f2ae8b4de30b8b1b336efd347984.jpg?s=512'; break;
            case '@bits-raphael':      slackImage = 'https://avatars.slack-edge.com/2016-04-16/35270980423_a0fcc743f3205ddc2e63_512.png'; break;
            case '@bits-splinter':     slackImage = 'https://avatars.slack-edge.com/2016-04-16/35247152228_9170719dadeafedd1b4c_512.jpg'; break;
        }

        // inject author image
        var combo = (data.Slack[0] == '@') ? ' <span>to</span> you' : ' <span>in</span> ' + data.Slack;
        var src = slackImage;
        var img = new Image();
        img.src = src;
        $('#author').append(img);
        $('#author').append('<p><strong>Shared by</strong></p><p>' + data.User + ' ' + combo + '</p>');
        $('#comment').append('<p><em>"' + data.Comment + '"</em></p>');

        // inject website preview image
        var url = data.Url;
        //var url = 'http://www.madx.nl';
        var src = 'http://api.screenshotlayer.com/api/capture?access_key=d6ae0602784f7d1f84ca3e3fe98bc301&url=' + encodeURIComponent(url) + '&viewport=1440x900&width=1280';
        var img = new Image();
        img.src = src;
        $('#preview').append('<a href="' + url + '"></a>');
        $('#preview a').append(img);
        $('#preview a').append('<div class="gradient"><strong>check it out!</strong></div>');

        // width fix
        $('#comment').width(($('#comment em').outerWidth() + 30) + 'px');

    });
    
});