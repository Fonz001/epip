$( document ).ready(function() {

	var tabInfo = null;

	get_current_tab( function( tab ) 
	{
		tabInfo = tab;

		get_data(
			function( data )
			{
				if( !data.user.name ) $('#edit').addClass('show');
				else {
					$('[name=name]').val(data.user.name);
					$('#name').text(data.user.name);
				}				 

				$.each(data.users, function( index, value ) {
					var isSend = data.shared.indexOf(value.userId)>-1;
	  				$("#users").append('<button class="'+(isSend?'sent':'')+'" data-id="'+value.userId+'">'+value.name+'</button>');
				});
				$("#users button").on( "click", share_tab);

				$("#profile").on( "click", function() 
				{
					$('#edit').addClass('show');
				} );

				$("#save-name").on( "click", function() 
				{
					var name = $('[name=name]').val();

					if(name) $('#edit').removeClass('show');
					
					$('#name').text(name);
					$('[data-id='+data.user.userId+']').text(name);

					set_data({name:name},function( data ){});
				} );
			},
			{
				url:tabInfo.url
			});
	});

	// SHARE TAB
	function share_tab(event)
	{	
		event.stopPropagation();

		var e = $(event.target);

		var data = {
			url:		tabInfo.url,
			title:		tabInfo.title,
			comment:	$('#comment').val(),
 			user:		e.attr('data-id')
		}

		if(e.hasClass('sent')) data.del = true;

		// SHARE TAB INFO
		set_data(data,
		// ON DONE SHARING
		function( data )
		{
			if(e.hasClass('sent'))  e.removeClass('sent');
			else					e.addClass('sent');
			//alert(JSON.stringify(data));
		});
	}

});


// https://developer.chrome.com/extensions/tabs#method-query
// tab.url is only available if the "activeTab" permission is declared.