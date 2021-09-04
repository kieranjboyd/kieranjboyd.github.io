document.querySelectorAll('h3').forEach(item => {
	if (item.innerHTML.substring(0, 1) == 'R') {
		item.id = item.innerHTML;
	}
});

document.querySelectorAll('.blurable').forEach(item => {
	item.classList.add('blur');
	item.addEventListener('click', e => {
		if (!e.currentTarget.parentElement.classList.contains('blur')) {
			removeBlur(item);
		}
	})
});

document.querySelectorAll('div.blurable a').forEach(item => {
	if (item.href.substring(0, 4) == "http") {
		item.target = "_blank";
		item.rel = "noopener noreferrer"
	}
});

var showall = document.getElementById('showall');
showall.addEventListener('click', function() {
	if (showall.innerHTML == "Show All") {
		document.querySelectorAll('.blurable').forEach(function(item) {
			removeBlur(item)
		});
		showall.innerHTML = "Hide All"
	} else {
		document.querySelectorAll('.blurable').forEach(function(item) {
			addBlur(item)
		});
		showall.innerHTML = "Show All"
	}
});

var tbody = document.getElementById('grid').children[0];
for (let r = 1; r <= 6; r++) {
	var row = document.createElement('tr');
	for (let c = 1; c <= 6; c++) {
		var ref = 'R' + r + 'C' + c;
		var cell = document.createElement('td');
		var a = document.createElement('a');
		var text = document.createTextNode(ref);
		a.appendChild(text);
		a.title = ref;
		a.href = '#' + ref;
		cell.appendChild(a);
		row.appendChild(cell);
	}
	tbody.appendChild(row);
}

function removeBlur(el) {
	el.classList.remove('blur');
}

function addBlur(el) {
	el.classList.add('blur');
}