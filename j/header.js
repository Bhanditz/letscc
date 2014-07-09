//<![CDATA[
$(function() {
	$('#keyword').focus();

	$('#searchType li, .cc-licenses li, #body .main li').hover(function(e) {
		$(this).addClass('over');
	}, function(e) {
		$(this).removeClass('over');
	});

	$('#searchType li').click(function() {
		$('#contentType option').attr('selected', false);
		var type = this.className.replace(' over','');
		
		if (type == 'video') $('#msgDisableOption').show();
		else $('#msgDisableOption').hide();
		
		var selectedIndex = $("#contentType option").index($('#contentType option[value="' + type + '"]'));
		$("#contentType").prop('selectedIndex', selectedIndex);
		$('#body').attr('class','').addClass(this.className);
		$('#searchType li').removeClass('selected');
		$(this).addClass('selected');

		changeLicenseStatus();			
		return false;
	});
	changeLicenseStatus();
	$('.cc-licenses li').hover(function() {
		$(this).find('dd').show();
	}, function() {
		$(this).find('dd').hide();
	});

	$('.setFavorite').live('click', function() {
		$.ajax({
			url:'proc_favorite.php',
			dataType:'json',
			data:{
				type:'p',
				cid:'',
				url:'',
				midx:1,	//member idx
				kw:''
			},
			success:function(data) {
			},
			context:this
		});
	});
	CCFavoriteImageSearch = new CCFavoriteSearch('image', 7);
	CCFavoriteMusicSearch = new CCFavoriteSearch('music', 2);
	CCFavoriteVideoSearch = new CCFavoriteSearch('video', 1);
	CCFavoriteDocSearch = new CCFavoriteSearch('doc', 1);

	if ($('#keyword').val() != "") {
		$('body').attr('class', 'search');
		var type = $('#contentType').val();
		$('#body').attr('class','').addClass(type);
		$('#searchType li').removeClass('selected');
		$('#searchType li.' + type).addClass('selected');	
		search();
	}
});
function changeLicenseStatus() {
	var comm = $('#comm').attr('checked');
	var deriv = $('#deriv').attr('checked');
	$('.cc-licenses li dt').removeClass('disabled');
	if (comm) {
		$('.cc-licenses li.nc dt').addClass('disabled');
	}
	if (deriv) {
		$('.cc-licenses li.nd dt').addClass('disabled');
	}		
	if ($("#contentType").val() == 'video') {
		$('#msgDisableOption').show();
		$('.cc-licenses li.nc dt').addClass('disabled');
		$('.cc-licenses li.nd dt').addClass('disabled');
		$('.cc-licenses li.sa dt').addClass('disabled');
	}
	else $('#msgDisableOption').hide();
}
var searchAjaxCalls = [];
function getFlickrData(data, callback) {
	data.api_key = 'ec72ae6aba33c60bff198220d36e08b7';
	data.format = 'json';
	searchAjaxCalls.push($.ajax({
		url:'http://api.flickr.com/services/rest/',
		dataType:'jsonp',
		crossDomain:true,
		data: data,
		jsonp:'jsoncallback',
		success:callback
	}));
}
function getJamendoData(data, callback) {
	searchAjaxCalls.push($.ajax({
		url:'http://api.jamendo.com/get2/id+name+url+image+artist_name/track/jsoncallback/track_album+album_artist/',
		dataType:'jsonp',
		crossDomain:true,
		data: data,
		jsonp:'jsoncallbackfunction',
		success:callback
	}));
}
function getYoutubeData(data, callback) {
	searchAjaxCalls.push($.ajax({
		url:'http://gdata.youtube.com/feeds/api/videos',
		dataType:'jsonp',
		crossDomain:true,
		data: data,
		jsonp:'callback',
		success:callback
	}));
}

function getCCMixterData(data, callback ) {
	data.f = "js";

	searchAjaxCalls.push($.ajax({
		url:'query_ccmixter.php',
		dataType:'text',
		data: data,
		success:callback
	}));
}

function getSlideShareData(data, callback) {
	searchAjaxCalls.push($.ajax({
		url:'query_slideshare.php',
		dataType:'json',
		data: data,
		success:callback
	}));
}

CCImageSearch = {};
CCImageSearch.search = function(keyword, deriv, comm) {
	this.keyword = keyword;
	this.deriv = deriv;
	this.comm = comm;
	this.showPage(0);
}
CCImageSearch.showPage = function(p) {
	$("#imageResult").html('');
	$("#imageTemplate").template("imageTemplate");
	if (!p) p = 0;

	var deriv = this.deriv;
	var comm = this.comm;

	var rights = '';
	if (deriv && comm) {
		rights = '4,5';
	} else if (deriv) {
		rights = '1,2,4,5';
	} else if (comm) {
		rights = '4,5,6';
	} else {
		rights = '1,2,3,4,5,6';
	}
	$("#imageResult").html('');
	
	getFlickrData({
		method:'flickr.photos.search',
		text:this.keyword,
		page:p + 1,
		sort:'relevance',
		per_page:70,
		license:rights
	}, function(data) {
		var photos = data.photos.photo;
		if (photos.length == 0) {
			$("#imageResult").parent().addClass('none');
			return;
		}
		for(var i = 0, len = photos.length; i < len; i++) {
			var photo = photos[i];
			photo.tbURL = 'http://farm' + photo.farm + '.static.flickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_t.jpg';
			photo.imgURL = 'http://farm' + photo.farm + '.static.flickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_z.jpg';
			photo.href = 'http://www.flickr.com/photos/' + photo.owner + '/' + photo.id;
			var tmpl = $.tmpl( "imageTemplate" , photo);
			if (i % 7 == 0) tmpl.addClass('nl');
			tmpl.data('keyword',$('#keyword').val()).data('info',photo).data('s_name','flickr').data('type','image').appendTo( "#imageResult" );
		}
		if (p == 0) {
			var total = data.photos.total;
			$('#imagePaging').pagination(total,{
				callback:function(p, jq){CCImageSearch.showPage(p); return false;},
				items_per_page:70,
				num_display_entries:10,
				num_edge_entries:1,
				prev_text:'<',
				next_text:'>'
			});	
		}		
	});
}
var CCMusicSearch = {};
CCMusicSearch.list1 = [];
CCMusicSearch.list2 = [];
CCMusicSearch.list1Recevied = false;
CCMusicSearch.list2Recevied = false;
CCMusicSearch.limit = 15;
CCMusicSearch.search = function(keyword, deriv, comm) {
	this.keyword = keyword.replace(/[,]+/g, ' ');
	
	this.list1 = [];
	this.list1Cursor = 0;
	this.list2 = [];
	this.list2Cursor = 0;
	this.list1Recevied = false;
	this.list2Recevied = false;

	$("#musicResult").html('');
	$('#musicPaging').html('');
	var music_rights = '';
	if (deriv && comm) {
		music_rights = 'by+c+d';
	} else if (deriv) {
		music_rights = 'by+d';
	} else if (comm) {
		music_rights = 'by+c';
	} else {
		music_rights = 'by';
	}


	getJamendoData({
		tag_idstr:this.keyword,
		n:100,
		pn:1,
		license_minrights:music_rights
	}, function(data) {
		var listMusic = data;
		var tempHtml = "";
		if(listMusic) {
			for(var i = 0, len = listMusic.length; i < len; i++) {
				var music = listMusic[i];
				var music_license = "";
				music.download_url = 'http://api.jamendo.com/get2/stream/track/redirect/?id=' + music.id + '&streamencoding=mp31';		  			
				CCMusicSearch.list1.push(music);		
			}
		}
		CCMusicSearch.list1Recevied = true;
		CCMusicSearch.fillList();
	});

	var mixterRights = '';
	if (deriv && comm) {
		mixterRights = 'by,sa';
	} else if (deriv) {
		mixterRights = 'by,sa,nc,ncsa';
	} else if (comm) {
		mixterRights = 'by,sa,nd';
	} else {
		mixterRights = 'by,sa,ncsa,nd,nc,ncnd';
	}


	getCCMixterData( {
		limit:100,
		offset:1,
		search_type:"any",
		search:this.keyword,
		lic:mixterRights
	}, function(data) {
		eval("var listMusic = " + data);
		var tempHtml = "";
		
		if (listMusic) {
			for(var i = 0, len = listMusic.length; i < len; i++) {
				var music = listMusic[i];
				var music_license = "";
				
				var obj = {};
	
				obj.id = music.upload_id;
				obj.name = music.upload_name;
				obj.artist_name = music.user_name;
				obj.url = music.file_page_url;
				obj.download_url = music.files[0].download_url;
	
				CCMusicSearch.list2.push(obj);
			}
		}
		CCMusicSearch.list2Recevied = true;
		CCMusicSearch.fillList();
	});

}

CCMusicSearch.fillList = function() {
	if (this.list1Recevied && this.list2Recevied) {
		CCMusicSearch.showPage(0);
		
		$('#musicPaging').pagination(this.list1.length + this.list2.length,{
			callback:function(p, jq){CCMusicSearch.showPage(p); return false;},
			items_per_page:15,
			num_display_entries:10,
			num_edge_entries:1,
			prev_text:'<',
			next_text:'>'
		});
	}
}
CCMusicSearch.showPage = function(p) {
	if (this.list1.length == 0 && this.list2.length == 0) {
		$("#musicResult").parent().addClass('none');
		return;
	}
	$("#musicResult").html('');
	$("#musicTemplate").template("musicTemplate");
	if (!p) p = 0;
	this.list1Cursor = this.list2Cursor = 0;
	var shownItemCount = this.limit * p;
	if (shownItemCount > 0) {
		for (var i = 0; i < shownItemCount; i++) {
			if (this.list1Cursor < this.list2Cursor || this.list2.length == this.list2Cursor) {
				if (this.list1.length > this.list1Cursor) {			
					this.list1Cursor++;
					continue;
				}
			}
			if (this.list2.length > this.list2Cursor) {
				this.list2Cursor++;
			}
		}
	}
	
	for (var i = shownItemCount, len = shownItemCount + this.limit; i < len; i++) {
		if (this.list1Cursor < this.list2Cursor || this.list2.length == this.list2Cursor) {
			if (this.list1.length > this.list1Cursor) {
				var info = this.list1[this.list1Cursor];
				var musicTmpl = $.tmpl( "musicTemplate" , info);
				musicTmpl.appendTo( "#musicResult" );
				musicTmpl.data('keyword',$('#keyword').val()).data('info',info).data('s_name','jamendo').data('type','music');
				this.list1Cursor++;
				continue;
			}
		} 

		if (this.list2.length > this.list2Cursor) {
			var info = this.list2[this.list2Cursor];
			var musicTmpl = $.tmpl( "musicTemplate" , info );
			musicTmpl.appendTo( "#musicResult" );
			musicTmpl.data('keyword',$('#keyword').val()).data('info',info).data('s_name','ccmixter').data('type','music');
			this.list2Cursor++;
		}
	}
}

CCVideoSearch = {};
CCVideoSearch.search = function(keyword, deriv, comm) {
	this.keyword = keyword;
	this.showPage(0);
}
CCVideoSearch.showPage = function(p) {
	$("#videoResult").html('');
	$("#videoTemplate").template("videoTemplate");
	if (!p) p = 0;
	getYoutubeData( {
			q:this.keyword+" creativecommons", 
			v:2, 
			alt:"jsonc",
			'start-index':1 + (10 * p),
			"max-results":10
		}, function(data) {
			var objData = data.data;
			var listVideo = objData.items || [];
			if (objData.totalItems == 0) {
				$("#videoResult").parent().addClass('none');
				return;
			}
			for(var i = 0, len = listVideo.length; i < len; i++) {
				var video = listVideo[i];

				var obj = {};
				obj.id = video.id;
				obj.title = video.title;
				obj.thumb = video.thumbnail.sqDefault;
				obj.href = video.player['default'];
				obj.url = video.content[5];
				obj.hits = video.viewCount;
				obj.desc = video.description;
			
				var videoTmpl = $.tmpl( "videoTemplate", obj );
				videoTmpl.appendTo( "#videoResult" );
				videoTmpl.data('keyword',$('#keyword').val()).data('info',obj).data('s_name','youtube').data('type','video');
			}
			if (p == 0) {
				var total = objData ? objData.totalItems : 0;
				if (total > 1000) total = 1000;
				$('#videoPaging').pagination(total,{
					callback:function(p, jq){CCVideoSearch.showPage(p); return false;},
					items_per_page:10,
					num_display_entries:10,
					num_edge_entries:1,
					prev_text:'<',
					next_text:'>'
				});	
			}
	});
}
CCDocSearch = {}
CCDocSearch.search = function(keyword, deriv, comm) {
	this.keyword = keyword.replace(/\s+/g, ',');
	this.deriv = deriv;
	this.comm = comm;	
	this.showPage(0);
}
CCDocSearch.showPage = function(p) {
	var deriv = this.deriv;
	var comm = this.comm;	

	var docCC_cc = 1;
	var docCC_adapt = 1, docCC_commercial = 1;

	if (deriv && comm) {
		docCC_adapt = 0;
		docCC_commercial = 0;
	} else if (deriv) {
		docCC_commercial = 0;
	} else if (comm) {
		docCC_adapt = 0;
	} 

	$("#docTemplate").template("docTemplate");
	$("#docResult").html('');
	
	getSlideShareData( {
		limit:10,
		offset:p,
		search:this.keyword,
		cc:docCC_cc,
		cc_adapt:docCC_adapt,
		cc_commercial:docCC_commercial
	}, function(data) {
		if (data.Meta.TotalResults == 0) {
			$("#docResult").parent().addClass('none');
			return;
		}
		var listDoc = data.Slideshow;
		if (listDoc) {
			for(var i = 0, len = listDoc.length; i < len; i++) {
				var doc = listDoc[i];

				var obj = {};

				obj.id = doc.ID;
				obj.title = doc.Title;
				obj.href = doc.URL;
				obj.desc = typeof doc.Description == 'object' ? '' : doc.Description;
				obj.thumb = doc.ThumbnailSmallURL;
				var docTmpl = $.tmpl("docTemplate", obj);
				docTmpl.appendTo("#docResult");
				docTmpl.data('keyword',$('#keyword').val()).data('info',obj).data('s_name','slideshare').data('type','doc');
			}
		}
		if (p == 0) {
			var total = data.Meta.TotalResults;
			//if (total > 1000) total = 1000;
			$('#docPaging').pagination(total,{
				callback:function(p, jq){CCDocSearch.showPage(p); return false;},
				items_per_page:10,
				num_display_entries:10,
				num_edge_entries:1,
				prev_text:'<',
				next_text:'>'
			});	
		}		
	});
}
function search() {
	for (var i = 0; i < searchAjaxCalls.length; i++) {
		var call = searchAjaxCalls[i];
		call.abort();
	}
	searchAjaxCalls = [];
	var keyword = $('#keyword').val();

	if ( keyword == '' ) 
	{
		location.href = '/favorite.php';
		return false;
	}

	var comm = $('#comm').attr('checked');
	var deriv = $('#deriv').attr('checked');

	CCFavoriteImageSearch.search(keyword, deriv, comm);
	CCFavoriteMusicSearch.search(keyword, deriv, comm);
	CCFavoriteVideoSearch.search(keyword, deriv, comm);
	CCFavoriteDocSearch.search(keyword, deriv, comm);
	
	CCImageSearch.search(keyword, deriv, comm);
	CCMusicSearch.search(keyword, deriv, comm);
	CCVideoSearch.search(keyword, deriv, comm);
	CCDocSearch.search(keyword, deriv, comm);
}

$('.cc-options input').live('click', function() {
	var comm = $('#comm').attr('checked');
	var deriv = $('#deriv').attr('checked');
	$('.cc-licenses li dt').removeClass('disabled');
	if (comm) {
		$('.cc-licenses li.nc dt').addClass('disabled');
	}
	if (deriv) {
		$('.cc-licenses li.nd dt').addClass('disabled');
	}
	if($('body').hasClass('search')) {
	  $('#searchForm').submit();
	}
});

var CCFavoriteImageSearch, CCFavoriteMusicSearch, CCFavoriteVideoSearch, CCFavoriteDocSearch;
CCFavoriteSearch = function(type, limit) {
	this.type = type;
	this.limit = limit;
};
CCFavoriteSearch.prototype.search = function(keyword, deriv, comm) {
	this.keyword = keyword;
	this.deriv = deriv;
	this.comm = comm;
	
	this.showPage(0);
}
CCFavoriteSearch.prototype.showPage = function(p) {
	$('#' + this.type + 'FavoriteResult').html('').hide();
	$('#' + this.type + 'FavoriteTemplate').template(this.type + 'FavoriteTemplate');
	if (!p) p = 0;

	searchAjaxCalls.push($.ajax({
		url: 'comm/search_favorite.php',
		type: 'post',
		dataType:'json',
		context:this,
		data:{
			keyword:this.keyword,
			type:this.type,
			c:this.comm ? 'y':'n',
			d:this.deriv ? 'y':'n',
			cur_page:p,
			page_cnt:this.limit
		},
		success:function(data){
			var list = data.data || [];
			if (list.length > 0) {
				$( '#' + this.type + 'FavoriteResult' ).show();
			}
			for(var i = 0, len = list.length; i < len; i++) {
				var item = list[i];
				var tmpl = $.tmpl( this.type + 'FavoriteTemplate', item );
				tmpl.appendTo( '#' + this.type + 'FavoriteResult' );
				tmpl.data('keyword',$('#keyword').val()).data('info',item).data('s_name',item.s_name).data('type',this.type).data('idx',item.idx);
			}
		}
	}));
}
//]]>
