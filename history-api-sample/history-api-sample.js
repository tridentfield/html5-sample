
var defaultContents_ = '<span>ここに外部コンテンツが表示されます。</span>';

function initPage()
{
	if (!window.history) {
		document.getElementById('message').innerHTML = 'このブラウザはHistory APIをサポートしていません。'
		return;
	}
	setEventHandler();
}

function setEventHandler()
{
	document.getElementById('menu1').addEventListener('click', menuItemClickHandler, false);
	document.getElementById('menu2').addEventListener('click', menuItemClickHandler, false);

	window.addEventListener('popstate',
		function(e) {
			if (console && e.state != null) {	// for Chrome
				console.log('previous access title=[' + e.state.title + '] ' +
					'time=[' + e.state.previous_access_time + ']');
			}
			swapContents(location.pathname);
		}, false
	);
}

function menuItemClickHandler(e)
{
	swapContents(this.href);
//	history.pushState({'title':this.title, 'previous_access_time':new Date()}, this.title, this.href);
	history.pushState({'title':this.title, 'previous_access_time':new Date()}, this.title);
	e.preventDefault();
}

function swapContents(url)
{
	if (url.indexOf('index.html') >= 0) {
		document.getElementById('contents-body').innerHTML = defaultContents_;
	} else {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url, false);
		xhr.send(null);
		if (xhr.status == 200) {
			document.getElementById('contents-body').innerHTML = xhr.responseText;
		}
	}
}