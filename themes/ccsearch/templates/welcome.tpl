{include file='header.tpl'}


</head>
<body class="<?=$body_class?>">
<?require_once 'comm/inc.go_detail.php';?>
<div id="wrap">
<?require_once 'comm/inc.header.php';?>
	<div id="msgDisableOption">
	Videos are only for (<strong>BY</strong>) license applied contents.
	</div>
	<div id="body" class="all">
	  <div class="main">
			<ul class="desc">
				<li class="desc1"><img src="i/main_desc1.gif" width="195" height="44" alt="about lets'cc" title="about lets'cc" /><span><a href="/about.php" onFocus="blur()"><img src="i/main_desc1_detail.gif" width="288" height="90" alt="" title="" /></a></span></li>
				<li class="desc2"><img src="i/main_desc2.gif" width="195" height="44" alt="about CC" title="about CC" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><a href="http://creativecommons.org/" onFocus="blur()"><img src="i/main_desc2_detail.gif" width="288" height="90" alt="" title="" /></a></span></li>
				<li class="desc3"><img src="i/main_desc3.gif" width="243" height="44" alt="about CCL" title="about CCL" /><span><a href="http://creativecommons.org/licenses/" onFocus="blur()"><img src="i/main_desc3_detail.gif" width="288" height="90" alt="" title="" /></a></span></li>
			</ul>
			<div class="footer">
				<ul class="links">
					<li>© 2011 CC Korea Except where otherwise noted, content on this site is licensed 
					<a href="http://creativecommons.org/licenses/by/2.0/kr/deed.en">under a Creative Commons Attribution 2.0 Korea License.</a> <br>
					<a href="http://creativecommons.org/licenses/by/2.0/" target="_blank" class="logocc"><img src="http://i.creativecommons.org/l/by/2.0/kr/80x15.png" alt="creative commons korea" /></a>
				    <a href="http://www.cckorea.org/xe/?mid=english" target="_blank" class="logo"><img src="i/logo_init_bottom.gif" width="94" height="17" alt="creative commons korea" /></a>			        </li>
				</ul>
		  </div>
		</div>
		<ul id="searchType">
			<li class="all"><a href="#">All</a></li>
			<li class="image"><a href="#">images</a></li>
			<li class="music"><a href="#">sounds</a></li>
			<li class="video"><a href="#">videos</a></li>
			<li class="doc"><a href="#">docs</a></li>
		</ul>
		<div class="license-area">
			<ul class="cc-licenses">
				<li class="by lic1"><dl>
					<dt class="lic-by">by</dt>
					<dd><strong>(BY)</strong><span>You're free to use-modify, commercialize-it only with attribution.<br/></span></dd>
				</dl></li>
				<li class="by sa lic2"><dl>
					<dt class="lic-by-sa">by sa</dt>
					<dd><strong>(BY-SA)</strong><span>With Attribution, free to modify but carry the same license.</span></dd>
				</dl></li>
				<li class="by nc lic3"><dl>
					<dt class="lic-by-nc">by nc</dt>
					<dd><strong>(BY-NC)</strong><span>You're free to use but for non-commercial.</span></dd>
				</dl></li>
				<li class="by nc sa lic4"><dl>
					<dt class="lic-by-nc-sa">by nc sa</dt>
					<dd><strong>(BY-NC-SA)</strong><span>No commercial use allowed, free to modify carrying same license.</span></dd>
				</dl></li>
				<li class="by nd lic5"><dl>
					<dt class="lic-by-nd">by nd</dt>
					<dd><strong>(BY-ND)</strong><span>With attribution, without any modification.</span></dd>
				</dl></li>
				<li class="by nc nd lic6"><dl>
					<dt class="lic-by-nc-nd">by nc nd</dt>
					<dd><strong>(BY-NC-ND)</strong><span>Use it with attribution, but no change and commercial use allowed.</span></dd>
				</dl></li>
			</ul>
			<div class="desc">
				
				<p>
					<img src="i/cc_search_notice.gif" width="322" alt="CC Korea makes no warranty whatsoever in connection with the result of Search. You need to verify that the work is actually underr a CCL by following the link or clear the licensor." />
			  </p>
		  </div>
	  </div>
		<div id="searchResult">
			<h2>Search Result</h2>
			<div class="image type">
				<h3><a href="">images</a></h3>
				<div class="no-result">
					<img src="i/no_result.gif" width="353" height="15" alt="No results for your search terms." title="No results for your search terms." />
					<p>
						<span><strong>Tip)</strong> Let'sCC draws search result using API from various global service. </span>
						<span style="position:relative;left:6px;">You can get more contents via English keywords.</span>
					</p>
				</div>
				<a href="#" class="more">+ More</a>
				<ul id="imageFavoriteResult" class="favorite image list">
					<li class="link-detail">
						
					</li>
				</ul>				
				<ul id="imageResult" class="image list">
					<li class="link-detail">
						
					</li>
				</ul>
				<div id="imagePaging" class="paging"></div>
			</div>
			<div class="music type">
				<h3><a href="">sounds</a></h3>
				<div class="no-result">
					<img src="i/no_result.gif" width="353" height="15" alt="No results for your search terms." title="No results for your search terms." />
					<p>
						<span><strong>Tip)</strong> Let'sCC draws search result using API from various global service. </span>
						<span style="position:relative;left:6px;">You can get more contents via English keywords.</span>
					</p>
				</div>
				<a href="#" class="more">+ More</a>
				<ul id="musicFavoriteResult" class="favorite music list">
					<li>
						
					</li>
				</ul>				
				<ul id="musicResult" class="music list">
					<li>
						
					</li>
				</ul>
				<div id="musicPaging" class="paging"></div>
			</div>
			<div class="video type">
				<h3>videos</h3>
				<div class="no-result">
					<img src="i/no_result.gif" width="353" height="15" alt="No results for your search terms." title="No results for your search terms." />
					<p>
						<span><strong>Tip)</strong> Let'sCC draws search result using API from various global service. </span>
						<span style="position:relative;left:6px;">You can get more contents via English keywords.</span>
					</p>
				</div>
				<a href="#" class="more">+ More</a>
				<ul id="videoFavoriteResult" class="favorite video list">
					<li>
						
					</li>
				</ul>				
				<ul id="videoResult" class="video list">
					<li>
						
					</li>
				</ul>
				<div id="videoPaging" class="paging"></div>
			</div>
			<div class="doc type">
				<h3>docs</h3>
				<div class="no-result">
					<img src="i/no_result.gif" width="353" height="15" alt="No results for your search terms." title="No results for your search terms." />
					<p>
						<span><strong>Tip)</strong> Let'sCC draws search result using API from various global service. </span>
						<span style="position:relative;left:6px;">You can get more contents via English keywords.</span>
					</p>
				</div>
				<a href="#" class="more">+ More</a>
				<ul id="docFavoriteResult" class="favorite doc list">
					<li>
						
					</li>
				</ul>				
				<ul id="docResult" class="doc list">
					<li>
						
					</li>
				</ul>
				<div id="docPaging" class="paging"></div>
			</div>
			<div class="end"></div>
		</div>
	</div>
<?require_once 'comm/inc.add_favorite.php';?>
{include file='footer.tpl'}
</div>
<?require_once 'comm/inc.fixed.php';?>
<?require_once 'comm/inc.alert.php';?>
<script id="imageTemplate" type="text/x-jquery-tmpl">
					<li class="link-detail">
						<a href="${href}" class="img go-detail"><img src="${tbURL}" alt="${title}" title="${title}" /></a>
						<a href="#" class="favorite"><img src="i/btn_favorite.gif" width="13" height="13" alt="add favorite"></a>
					</li>
</script>
<script id="musicTemplate" type="text/x-jquery-tmpl">
					<li class="link-detail">
						<dl>
							<dt><span class="desc"><a href="${url}" class="go-detail">${name} <span class="by">by</span> ${artist_name}</a></span></dt>
							<dd class="download">
								<object type="application/x-shockwave-flash" data="i/player_mp3_maxi.swf" width="25" height="20">
									<param name="movie" value="i/player_mp3_maxi.swf" />
									<param name="wmode" value="transparent" />
									<param name="FlashVars" value="mp3=${download_url}&amp;showslider=0&amp;width=25" />
								</object>
							</dd>
							<dd class="favorite"><a href="#" class="favorite"><img src="i/btn_favorite.gif" width="13" height="13" alt="add favorite"></a></dd>
						</dl>
					</li>
</script>


<script id="videoTemplate" type="text/x-jquery-tmpl">
					<li class="link-detail">
						<dl>
							<dt><a href="${href}" class="title go-detail">${title}</a><a href="#" class="favorite"><img src="i/btn_favorite.gif" width="13" height="13" alt="add favorite"></a></dt>
							<dd class="desc"><a href="${href}" class="go-detail">${desc}</a></dd>
							<dd class="hits">read : ${hits}</dd>
							<dd class="image"><a href="${href}" class="go-detail"><img src="${thumb}" width="125" height="80" alt="${title}"	title="${title}" /></a></dd>
						</dl>
					</li>
</script>
<script id="docTemplate" type="text/x-jquery-tmpl">
					<li class="link-detail">
						<dl>
							<dt><a href="${href}" class="title go-detail">${title}</a><a href="#" class="favorite"><img src="i/btn_favorite.gif" width="13" height="13" alt="add favorite"></a></dt>
							<dd class="desc"><a href="${href}" class="go-detail">${desc}</a></dd>
							<dd class="image"><a href="${href}" class="go-detail"><img src="${thumb}" width="125" height="80" alt="${title}"	title="${title}" /></a></dd>
						</dl>
					</li>
</script>
<script id="imageFavoriteTemplate" type="text/x-jquery-tmpl">
					<li class="link-detail">
						<a href="${href}" class="img go-detail"><img src="${tbURL}" alt="${title}" title="${title}" /></a>
						<a href="#" class="favorite"><img src="i/btn_favorite.gif" width="13" height="13" alt="add favorite"><span>${f_count}<em>${f_count}users marked it as favorite.</em></span></a>
					</li>
</script>
<script id="musicFavoriteTemplate" type="text/x-jquery-tmpl">
					<li class="link-detail">
						<dl>
							<dt><span class="desc go-detail"><a href="${url}">${name} <span class="by">by</span> ${artist_name}</a></span></dt>
							<dd class="download">
								<object type="application/x-shockwave-flash" data="i/player_mp3_maxi.swf" width="25" height="20">
									<param name="movie" value="i/player_mp3_maxi.swf" />
									<param name="wmode" value="transparent" />
									<param name="FlashVars" value="mp3=${download_url}&amp;showslider=0&amp;width=25" />
								</object>
							</dd>
							<dd class="favorite"><a href="#" class="favorite"><img src="i/btn_favorite.gif" width="13" height="13" alt="add favorite"><span>${f_count}<em>${f_count}users marked it as favorite.</em></span></a></dd>
						 </dl>
					</li>
</script>


<script id="videoFavoriteTemplate" type="text/x-jquery-tmpl">
					<li class="link-detail">
						<dl>
							<dt><a href="${href}" class="title go-detail">${title}</a><a href="#" class="favorite"><img src="i/btn_favorite.gif" width="13" height="13" alt="add favorite"><span>${f_count}<em>${f_count}users marked it as favorite.</em></span></a></dt>
							<dd class="desc"><a href="${href}" class="go-detail">${desc}</a></dd>
							<dd class="hits">read : ${hits}</dd>
							<dd class="image"><a href="${href}" class="go-detail"><img src="${thumb}" width="125" height="80" alt="${title}"	title="${title}" /></a></dd>
						</dl>
					</li>
</script>
<script id="docFavoriteTemplate" type="text/x-jquery-tmpl">
					<li class="link-detail">
						<dl>
							<dt><a href="${href}" class="title go-detail">${title}</a><a href="#" class="favorite"><img src="i/btn_favorite.gif" width="13" height="13" alt="add favorite"><span>${f_count}<em>${f_count}users marked it as favorite.</em></span></a></dt>
							<dd class="desc"><a href="${href}" class="go-detail">${desc}</a></dd>
							<dd class="image"><a href="${href}" class="go-detail"><img src="${thumb}" width="125" height="80" alt="${title}"	title="${title}" /></a></dd>
						</dl>
					</li>
</script>
</body>
</html>

