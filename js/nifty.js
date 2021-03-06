function createTable(tableData) {
	var table = document.createElement('table');
	table.id = "grid-table";
	var tbody = document.createElement('tbody');

	tableData.forEach(function(rowData) {
		var row = document.createElement('tr');

		rowData.forEach(function(cellData) {
			var cell = document.createElement('td');
			cell.appendChild(document.createTextNode(cellData));
			row.appendChild(cell);
		});

		tbody.appendChild(row);
	});

	table.appendChild(tbody);
	return table;
}

function cancelSelectionEvent() {
	this.blur;
	event.preventDefault();
	event.stopImmediatePropagation();
	event.stopPropagation();
	return false;
}

function showHintsEvent() {
	showHints(parseInt(this.id.split('-')[1]) - 1);
}

function showHints(ID) {
	clearHints();
	var row = document.createElement("tr");
	row.id = "hints-row";
	row.tabIndex = 0;
	var tbody = document.getElementById("answer-table").children[0];
	tbody.insertBefore(row, tbody.children[Math.floor(ID / 6)].nextSibling);
	refreshHints(ID);
}

function refreshHints(cellID) {
	var row = document.getElementById("hints-row");
	row.innerHTML = '';
	var cell;
	var currentScore = myJSON[cellID][1];
	for (var i = 0; i < 3; i++) {
		cell = row.insertCell(i);
		cell.colSpan = 2;
		cell.tabIndex = 0;
		cell.style.backgroundColor = hintButtonDetails[i][1];
		cell.addEventListener('mousedown', cancelSelectionEvent);
		if ((currentScore & Math.pow(2, i)) == 0) {
			var button = document.createElement("BUTTON");
			button.classList.add("hint-button", hintButtonDetails[i][0]);
			button.innerHTML = hintButtonDetails[i][0] + " Hint";
			button.id = "hint-" + cellID + "-" + i;
			button.addEventListener("click", revealHintEvent);
			cell.appendChild(button);
		} else {
			cell.innerHTML = rot13(hints[cellID][i]);
		}
	}
}

function leaveHintsEvent() {
	if (event.relatedTarget != null) {
		if (document.getElementById("answer-div").contains(event.relatedTarget)) {
			if (document.getElementById("hints-row").contains(event.relatedTarget)) {
				event.target.focus();
				event.preventDefault();
				event.stopImmediatePropagation();
				event.stopPropagation();
				return false
			}
		} else {
			clearHints();
		}
	} else {
		clearHints();
	}
}

function clearHints() {
	var oldRow = document.getElementById("hints-row");
	if (typeof(oldRow) != 'undefined' && oldRow != null) {
		oldRow.parentNode.removeChild(oldRow);
	}
}

function revealHintEvent() {
	var cellID = parseInt(this.id.split("-")[1]);
	var hintID = parseInt(this.id.split("-")[2]);
	myJSON[cellID][1] += Math.pow(2, hintID);
	refreshHints(cellID);
	checkAnswer(cellID);
}

function createAnswerTable(answerData) {
	var table = document.createElement('table');
	table.id = "answer-table";
	table.style.margin = "0 auto";
	//table.tabIndex = "0";
	//table.addEventListener('click', cancelSelectionEvent);
	var tbody = document.createElement('tbody');
	//tbody.tabIndex = "0";
	//tbody.addEventListener('click', cancelSelectionEvent);
	
	var i = 0;
	for (var r = 0; r < 6; r++) {
		var row = document.createElement('tr');

		for (var c = 0; c < 6; c++) {
			var cell = document.createElement('td');
			var input = document.createElement("input");
			input.id = "answer-" + (i+1)
			input.type = "text";
			input.value = answerData[i][0];
			input.addEventListener("focus", showHintsEvent);
			input.addEventListener("focusout", leaveHintsEvent);
			input.addEventListener("input", checkAnswerEvent);
			cell.appendChild(input);
			row.appendChild(cell);
			i++;
		};

		tbody.appendChild(row);
	};

	table.appendChild(tbody);
	return table;
}

function generateState() {
	var s = '[';
	for (var r = 0; r < 37; r++) {
		s += '["",0]';
		if (r < 36) { s += ","; }
	}
	s += ']'
	return s;
}

function generateCurrentAnswersState() {
	var s = '[';
	for (var i = 0; i < 37; i++) {
		var myid = "answer-" + (i+1);
		var element = document.getElementById(myid);
		s += '["' + document.getElementById("answer-" + (i+1)).value + '",';
		if (i < 36) {
			s += myJSON[i][1] + ']';
		} else {
			s += '0]'
		}
		if (i < 36) {
			s += ",";
		}
	}
	s += ']'
	return s;
}

function checkAnswerEvent() {
	checkAnswer(parseInt(this.id.split("-")[1])-1, true);
}

function checkAllAnswers() {
	for (var i = 0; i < 37; i++) {
		checkAnswer(i, false);
	}
}

function checkAnswer(ID, userInput) {
	var answer = document.getElementById("answer-" + (ID+1));
	if (answer.value == "") {
		if (myJSON[ID][1] != 0) {
			answer.parentElement.style.background = 'silver';
		} else {
			answer.parentElement.style.removeProperty('background');
		}
	} else if (answer.value.toUpperCase() == rot13(answers[ID])) {
		answer.parentElement.style.background = 'lightblue';
		if (ID == 36 && userInput) {
			alert("Congratulations! You've finished the Nifty Puzzle Hunt! If you have any thoughts or feedback, please send them through via the email listed above on this page. Hope it was fun!");
		}
	} else {
		answer.parentElement.style.background = 'pink';
	}
}

function getStateFromCookies(input) {
	var answers = getCookie("answers");
	if (answers != "") {
		return answers;
	} else {
		return input;
	}
}

function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+ d.toUTCString();
	//alert("Setting '" + cname + "' to the following: '" + cvalue + "'");
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

function rot13(str) {
	var input		= 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	var output		= 'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm';
	var index		= x => input.indexOf(x);
	var translate	= x => index(x) > -1 ? output[index(x)] : x;
	return str.split('').map(translate).join('');
}

function saveAnswers() {
	setCookie("answers", generateCurrentAnswersState(), 30);
}

var tableData = [["COME", "DANCE", "AROUND", "MY", "PUZZLE", "SET", "MULTIPLEX", "INGRAINED", "REFRACTOR", "REINFORCE", "OVERJOYED", "RECROWNED", "UNIQUE", "SATIATION", "VERITY", "APPETITE", "HOTNESS", "HUNT", "FROM", "THE", "PAIN", "CENSORED", "THOUGHTS", "CONTAIN", "FREEPHONE", "KAPOSV??R", "MOH??CS", "VODAFONE", "SZIGETV??R", "VESZPR??M", "NUN", "REISH", "VAV", "KOOF", "SAMECH", "REISH"],["KNIT", "TOGETHER", "FROM", "MAGIC", "SHAPES", "ASCENDING", "EUCALYPTI", "DEPRAVITY", "LETHARGIC", "EVERGREEN", "TURNSTILE", "TELEGRAPH", "PUZZLE", "FATIGUE", "GALAXY", "SWAP", "TABOO", "FEATURING", "STICKIN'", "UP", "WHITE", "CENSORED", "IN", "BALL", "KISK??R??S", "MARCALI", "KISKUNHALAS", "B??K??SCSABA", "MOH??CS", "KAPOSV??R", "ELIRZ", "URIEL", "ALORI", "ABRAHAM", "ELIOR", "ANYA"],["FROM", "ETERNAL", "TRUTHS", "YOU", "MUST", "USE", "EMERGENCY", "REACCUSED", "SHRUBBERY", "FLORISTRY", "RAINCOATS", "OUTLAYING", "KICK", "PETITE", "PIPE", "COORDINATES", "TATTOO", "SECOND", "I", "CENSORED", "WITH", "THAT", "OL'", "LOCO", "VODAFONE", "SZIGETV??R", "VODAFONE", "SI??FOK", "P??PA", "KISK??R??S", "EMIM", "ILAN", "AFI", "ALINE", "DINA", "EMILY"],["LOGIC", "AND", "REASONING", "PLUS", "LOVE", "FINALLY", "MICROBIAL", "TARANTULA", "HOURGLASS", "INITIALLY", "RATIFYING", "TASTELESS", "LETTERS", "PIPIPI", "TENDRILS", "TRUST", "INPATIENT", "VESSEL", "GOD", "CENSORED", "OUT", "OF", "NOWHERE", "GOD", "SZIGETV??R", "KISK??R??S", "MOH??CS", "KISKUNHALAS", "SZIGETV??R", "KISK??R??S", "EHUD", "HADDAD", "AYA", "ANDY", "EZOV", "OHAD"],["MY", "OBTUSE", "KNOT", "TOOK", "ROOT", "EACH", "YACHTSMEN", "SNIVELING", "IDIOLECTS", "XENOMANIA", "OVERBLOWN", "VOICELESS", "JOIN", "FRANCHISE", "ANALOGY", "THIRTEENTH", "CHROMOSOME", "AT", "CENSORED", "IS", "SHORT", "FOR", "THE", "RAZOR", "MARCALI", "KESZTHELY", "SI??FOK", "TAPOLCA", "MOH??CS", "KISK??R??S", "ELROY", "EMOR", "ORLY", "ARIELLA", "ILOR", "ANBEL"],["LETTER", "I", "SAW", "WAS", "QUITE", "RIGHT", "ECCENTRIC", "RESETTING", "LIBRARIAN", "ANIMATORS", "PRINCEDOM", "STINKIEST", "PUZZLE", "WITH", "UNSEEN", "LANDMASS", "AMIDST", "SEA", "POETRY'S", "IN", "MOTION", "CENSORED", "TO", "CENSORED", "SI??FOK", "P??PA", "VODAFONE", "BAJA", "MARCALI", "KAPOSV??R", "ABIGAIL", "AYALA", "ENOCH", "AMMAH", "LEVI", "ELIJA"],["DEPENDING", "ON", "WHICH", "COUNTRY", "YOU'RE", "IN", "EIGHT", "KING", "TACTICS", "UNCLEAR", "NONE", "NORWAY", "I", "GONE", "IN", "ARTFUL", "AM", "IN", "ENTER", "A", "RESCUER", "A", "REVEALER", "AN", "BOARD", "KARBASSIOUN", "KNIGHTHOOD", "AUCTION", "FLUEGEL", "NICOLAI", "META", "THEME", "OF", "THIS", "DECEMBER", "CHALLENGE"],["IT'S", "EITHER", "RISKY", "OR", "EXTREMELY", "RISKY", "FIVE", "LORD", "POETRY", "FEVER", "FOUR", "GREECE", "THINGS", "TO", "IN", "OTHERS", "THAT", "COGITATE", "IDEAL", "AN", "OBJECT", "OF", "FATAL", "PASSION", "ALABAMA", "CYLINDER", "SULLIAGE", "RAIDERS", "CHLOROFORM", "ARMPIT", "WHERE", "PATRICK", "MADE", "SOME", "CONGRATULATIONS", "POTTERY"],["BY", "CHANCE", "ANOTHER", "PUZZLE", "IS", "SIMILAR", "AUGUSTA", "WRITER", "FLYOLOGY", "CANCER", "THREE", "SIX", "ONE", "AS", "HINT", "TO", "OF", "SUCH", "A", "PROBLEM", "A", "CULPRIT", "A", "MADMAN", "GALAXIES", "JERMYN", "ARCENEAUX", "CELEBRATORY", "BROKERAGE", "KRYPTIC", "A", "PULLING", "IN", "OF", "MOONLIGHT", "AIR"],["IN", "THEME", "AND", "COUNT", "OF", "COLOURS", "NORMA", "TEN", "BOMBSHELL", "TWO", "MULTIPLE", "USA", "AT", "SQUARE", "EACH", "TAKE", "PATTERNS", "AWAY", "AND", "AN", "OBSTACLE", "EXIT", "A", "MASTER", "INDICATE", "TINDER", "ANTEATER", "ASTERISK", "EIGENVALUE", "ZENITH", "SATISFACTORY", "EARTH", "FIRST", "CALLED", "GREEDY", "GLUCINE"],["THIS", "HAS", "ONE", "OR", "TWO", "GREEN", "ELEVEN", "SINGER", "TWELVE", "CANCER", "SEVEN", "USA", "OF", "HEART", "IT'S", "EACH", "SOME", "TO", "THE", "IMPRUDENT", "A", "THING", "COVETED", "AND", "THALAMUS", "LEDERMAN", "BUSINESS", "PALAIS", "FOSSILIZE", "TELECOMMUTER", "REST", "TIME", "ON", "THE", "BOYFRIEND", "HOUSE"],["AND", "SOMETHING", "ELSE", "THAT'S", "JUST", "BLANK", "ONE", "NINE", "ACTIVISM", "CRASH", "CHARLES", "FRANCE", "MUCH", "HAZY", "AND", "FACTOR", "MORE", "STATEMENT", "AN", "EXECUTIONER", "FOLLOWED", "BY", "A", "BEAR", "NI'IHAU", "FLEURETTE", "MOSQUE", "LIVABLE", "TENSIOMETER", "OGDEN", "COITUS", "IN", "THE", "SERVER", "RESEARCH", "ROOM"],["STIRGE", "INTERRUPTION", "XVART", "HAWK", "STRIPED", "TROGLODYTE", "THE", "BIBLIOPHILIC", "BAMBERG", "BIBLE", "UTILISED", "IMPRESSIVE", "BESEECH", "ATTIC", "QDISC", "QUID", "KUDOS", "KITH", "CROATIA", "AMEGHINO", "JORDAN", "GUAYAQUIL", "GUAM", "PAQUISHA", "DAMN", "THIS", "PUZZLE", "SURE", "IS", "A", "BISECT", "AND", "SWAP", "REMOVE", "DUPLICATE", "LETTERS"],["WEASEL", "CONCEPT", "TIAMAT", "ETTERCAP", "MOCHA", "PEGASUS", "PAGINATIONS", "EACH", "A", "36-LINE", "ARTISTIC", "ELEGANT", "NEUROTIC", "AS", "ARCH", "QUASH", "NASTINESS", "OVERHEAD", "ISRAEL", "CANADA", "ARUBA", "SLOVENIA", "KURDISTAN", "SARAWAK", "RISKY", "ONE", "I'VE", "CONSTRUCTED", "A", "CHALLENGE", "APPEND", "ITALIAN", "RIVER", "FIND", "IN", "GRID"],["PANTHER", "STRANGE", "SHOOSUVA", "BALOR", "CODEX", "IMIX", "BOOKBINDING", "TESTAMENT", "TYPOGRAPHIC", "TREATMENTS", "AND", "IMPRINTING", "JULES", "ORCHID", "REBOUND", "THRESHOLD", "MOSAIC", "KIND", "UNGU??A", "WALES", "TULSA", "AMEGHINO", "DNIPRO", "MALAYSIA", "AND", "UTILISED", "CLEVER", "HIDDEN", "REFERENCES", "TO", "STEP", "NORTH", "ONCE", "PREPEND", "INTO", "CHILD"],["AARAKOCRA", "SPLINT", "SPRITE", "STEGOSAURUS", "WISTFUL", "DRAGONBAIT", "CHARACTERISTICS", "WERE", "MAINTAINED", "NAMELY", "FATTER", "DOWNWARD", "JDBC", "ESTABLISH", "LEMONGRASS", "KUFIC", "ADD", "JOSH", "PORTLAND", "ALBANIA", "CAIMITO", "NAURU", "HONDURAS", "BAH??????", "OTHER", "PUZZLES", "ALL", "INEVITABLY", "BRINGING", "BACK", "POSTPEND", "INTO", "ANIMAL", "REMOVE", "PORK", "EATER"],["DEVOURER", "CHALLENGING", "GERYON", "CLOAKER", "LEWIS", "ASSASSIN", "BRUSHES", "JOINING", "INSIGNIA", "FINISHINGS", "ENSURED", "EACH", "ENCROACH", "QUAYS", "EIGHTEENTH", "EGOCENTRIC", "THESIS", "YELLOWS", "SONORA", "HOKKAIDO", "BHUTAN", "BAH??????", "SATAKUNTA", "ANTWERP", "LOOT", "IN", "THE", "FORM", "OF", "ALMOST", "SPIN", "AROUND", "PLOSIVE", "PAD", "WITH", "LETTERS"],["KRAKEN", "DEXTROSE", "LEVIATHAN", "CAMBION", "SILICON", "BULETTE", "JOT", "AND", "CROSSBAR", "WAS", "VERIFIABLY", "MINIMISED", "HYDRAULIC", "IMPISH", "URAEMIC", "FOREGROUND", "JADED", "SPACIOUS", "COMOROS", "SARAWAK", "ISFENDIYARIDS", "CAMEROON", "AJAIGARH", "NEPAL", "ELEVEN", "LETTERS", "WHICH", "CAN", "BE", "EXTRACTED", "CULL", "THE", "HERD", "OUTPUT", "IS", "SQUARE"],["NORTH", "FROM", "THE", "ACCOMODATION", "ON", "CORNER", "THEN", "VIVEC", "THOUGHT", "OF", "THE", "ENANTIOMORPH", "OH", "KHET", "HUMANITY", "AND", "ALL", "THE", "INAPPLICABLE", "SPECTRES", "TULLES", "ZILCH", "WILDCATS", "CANNONS", "OXYD", "CHINON", "THAT'S", "LILIES", "ASTERIX", "DUCKTALES", "STY", "ALES", "INDEED", "AFFIX", "RICH", "ETERNAL"],["OF", "CITY", "ROAD", "AND", "PITTWATER", "ROAD", "THE", "SNAKE", "IN", "THE", "NIGHT", "SKY", "GRAPINESSES", "SCREAMING", "NODULAR", "HERE", "I", "TOLD", "WILDCATS", "INAPPLICABLE", "WILDCATS", "INAPPLICABLE", "MAGIC", "STING", "TWO", "STORMLORD", "VOLFIED", "CRATERMAZE", "VERYTEX", "TASKS", "FLEES", "EXCISE", "HARD", "OFF", "OUT", "AIR"],["TURN", "RIGHT", "ON", "THE", "PENINSULA", "LINK", "THE", "SECRET", "FIRE", "PLUS", "GOOD", "DAEDRA", "YOU", "LIT", "I", "ENACT", "NERVE", "TALK", "WILDCATS", "MAGIC", "INAPPLICABLE", "NADA", "BANK", "TITANS", "HOUSES", "SKYBUSTER", "MAGNAVOX", "LESS", "MACINTOSH", "BADLANDS", "BACK", "WAY", "PRICE", "BOY", "ZONE", "LEXICALLY"],["LEFT", "ON", "SPIT", "ROAD", "LEFT", "ON", "LISTENING", "TO", "THE", "CAPTIVE", "SAGE", "HE", "GOT", "PEOPLE", "THEIR", "FRIENDS", "RARE", "ION", "HAWKS", "NONE", "WILDCATS", "TIGERS", "BUSTLE", "TAIPANS", "PERESTROIKA", "THAN", "BOA", "HYPERBALL", "BEATERS", "IMPERIUM", "MULTIPLE", "EXPLOIT", "UP", "PAY", "TEAS", "LATE"],["SOUTH", "WESTERN", "MOTORWAY", "LEFT", "ON", "PENINSULA", "SAW", "THE", "HEART", "OF", "LORKHAN", "THE", "THERE", "PAH", "IT'S", "PIT", "IT'S", "AH", "INAPPLICABLE", "INAPPLICABLE", "BARKERS", "INAPPLICABLE", "INAPPLICABLE", "INAPPLICABLE", "SIMULCRA", "HYPERSPEED", "POLTERGEISTS", "SPELUNX", "DEATHTRACK", "LAST", "NET", "APE", "GENERAL", "MINES", "RADIX", "RENT"],["LINK", "AGAIN", "AND", "NOW", "YOU'RE", "OVERSEAS", "ENDING", "OF", "THE", "WORLD", "IS", "ALMSIVI", "I", "CAN'T", "TALK", "AEDILES", "AND", "GENTLEMEN", "INAPPLICABLE", "WILDCATS", "BEAKERS", "INAPPLICABLE", "HAWKS", "UNITED", "BATTLETOADS", "CURSES", "RALEIGH", "ROLEX", "YEAR", "PANASONIC", "PREEMPTIVE", "BOER", "DEUX", "MAIM", "FIRST", "HOME"],["LOOT", "WITH", "HEAVENS", "WHILE", "WINNING", "EAST", "SUPPORTERS", "IMPRINTS", "EXPLORE", "IDENTIFY", "IMPRESSIONS", "COMMENTATORS", "NEST", "SCOTCH", "SPRING", "NOISETTE", "SAUSAGE", "VIENNA", "IN", "THE", "FIRST", "CHAMBER", "IS", "NA", "ARCHITECTURE", "LANDMASS", "CAKE", "CONMAN", "HONKIE", "POULET", "FAULT", "CREAM", "DRAIN", "BUYER", "ATLAS", "EQUIP"],["WATCH", "REPAIR", "OPPORTUNITY", "ENEMY", "TO", "SMILE", "ESCORT", "ELLIOTT", "BLANEY", "ALMIROLA", "BOWYER", "DOG", "TIMER", "CINAMMON", "WATER", "SOLO", "DEATH", "CLIMBING", "CHA", "FIVE", "AFTER", "THE", "STAFF", "CHAMBER", "STREET", "BABKI", "COUNTRY", "NAMESAKE", "CAMP", "THULLA", "CREEP", "FIBER", "EVENT", "DRESS", "BROOM", "APRON"],["STRATAGEMS", "THE", "CORPSE", "BY", "ONE", "MOUNTAIN", "SONG", "BUSCH", "KESELOWSKI", "HAMLIN", "BUSCH", "NOTE", "GOOSE", "CALL", "CAGE", "SWISS", "CHRISTMAS", "BAD", "ARE", "PASQUAL", "AND", "GOLDEN", "ARMS", "THE", "DESIGNER", "ARSENAL", "PETI ", "RUSSELL", "POPO", "MAHARASHTRA", "BRASS", "AGENT", "CHAIR", "EPROM", "BLANK", "BLANK"],["OBTAIN", "THE", "WATER", "FROM", "CHAOS", "STRIKE", "GROOVE", "HARVICK", "DIBENEDETTO", "DILLON", "LOGANO", "TALLY", "QUARTZ", "FABERGE", "ANT", "DRUM", "RUBY", "CUP", "TWENTY-FOURTH", "CHAMBER", "FEATURES", "FARRAH", "CAT", "AND", "LUBYANKA", "MUSOR", "URL", "FRIC", "ROZZER", "ORF??VRES", "ELFIN", "DROOP", "BLANK", "BLANK", "BLANK", "BLANK"],["POINT", "THE", "HOST", "WITH", "PROXIMATE", "TIMBERS", "RECORDING", "TRUEX", "BYRON", "BOWMAN", "CUSTER", "VESTIGE", "EASTER", "CHINA", "CODDLED", "BUDS", "SAC", "WINDOW", "BRUNETTE", "ZEALOT", "IN", "THE", "TOP", "CHAMBER", "PLAZA", "ARTICLE", "PIG", "PAR??K", "DATUNG", "HELICOIDE", "DONOR", "ETHOS", "BLANK", "BLANK", "BLANK", "BLANK"],["CHAIN", "BEAUTY", "DESPERATE", "STRATEGY", "TO", "SOW", "COMPETITORS", "NOSE", "WAND", "RUMP", "NUMBER", "AUTOMOBILES", "EDEN", "BARREL", "HIP", "TOILET", "COMPASS", "NOODLE", "AWAIT", "CHEN", "ZHEN", "AND", "THE", "AVATAR", "VIC", "TOMBO", "DOSH", "DOLLARYDOO", "YARD", "BOLO", "BLANK", "BLANK", "BLANK", "BLANK", "GUIDE", "SOLUTION"],["GALLONS", "NINE", "SEPARATION", "GRACELAND", "SEVEN", "LESS", "COVERED", "IN", "SLOW", "WILD", "HORDES", "GRIZZLIES", "PENCE", "ABSOLUTE", "BOYLE", "FANTASTIC", "BLUE", "COMMERCE", "FUSIONISM", "HOMOGENEITY", "DISPOSING", "CONDITION", "HOMOGENEOUS", "IRONING", "ARUERIS", "OMOT", "SRAT", "NIKE", "SEBOS", "ISI", "EDO", "NIHON-BATHI", "T??T??UMI", "JANCH??", "KAZUHA", "NO"],["SMOKING", "MOMENTS", "OF", "TO", "BIMESTERS", "OR", "MOST", "HOVEL", "ROOMS", "ALIGN", "SIGHTINGS", "TEAPOT", "MAITRE", "EDGAR", "HENRY", "INVERTED", "OXFORD", "BLESS", "VARIANT", "VOICING", "SANDY-RED", "SOLUBILITY", "HUMANITIES", "CORPOREOUS", "MENSOUR", "SODA", "SITH", "THUMI", "XU", "SAGON", "KAIRO", "SOSH??", "UMEMAWANOSH??", "GOHYAKU-RAKANJI", "BAZAID??", "KANAGAWA"],["ELEVEN", "PHOTO", "DELISLES", "LEAGUES", "IN", "K??", "PATRICIA", "RYAN", "DIXON", "BATTLE", "BURN", "CLAW", "STRING", "MAGI", "ODDS", "CLOUD", "SQUARE", "MUSKETEERS", "RATION", "TRANS-SAHARAN", "WINNOW", "DICES", "HIDE", "INVITING", "XAU", "EROS", "KNUM", "BRYSOUS", "PROTEUS", "SATAN", "OKI", "SAMI-URA", "FUKAGAWA", "MANDEN-BASHI", "SHITA", "GAIC??"],["AND", "THREE", "FIFTY", "SEVENTEEN", "TIBET", "SEVENTY", "POPPY", "MIDDEN", "CAVE", "SUPER", "GRID", "JUNIPER", "THREE", "DEEP", "SPECIAL", "ZERO", "DORADO", "SCOTT", "BELL-SHAPED", "GLORIOUS", "CITING", "ODOROUS", "JURY", "NUH-UH", "SERUCUTH", "ARON", "BAROCHE", "NYMPHS", "NEFTHADA", "PSERMES", "KAISEI", "BUSK??", "SENJU", "T??MAID??", "HODOGAYA", "T??TO"],["STOCK", "BARLEYCORNS", "GONE", "IN", "ONE", "CENTIM", "FUSCHIA", "NEWT", "SIGNIFICANT", "PRODUCTION", "OF", "ASH", "HOLY", "JAY", "BRONTE", "MALCOLM", "MIDDLE", "ADRIATIC", "CONTINENT", "VOCATION", "VEST", "DENTED", "FIX", "BLACK", "AHARPH", "KAIROS", "FAMBAIS", "THOPIBUI", "AJARAS", "AZUEL", "AYAKUSA", "HONGANJI", "OMMAYAMASHI", "YORI", "RY??GOKU-BASHI", "Y??HI"],["LOCK", "HERO", "HORSES", "SIXTY", "WHOLE", "THE", "CONDOR", "HOTEL", "GIRLS", "GOLF", "GOOF", "ROOM", "JUDAH", "SALVADOR", "OFF", "MOURNING", "PRE", "NOT", "CONSPICUOUS", "FINITE", "SUBORDINATE", "CORPOREALITY", "INSIDE", "KING", "ALATH", "ZALOIAS", "SIC", "SOUBETTI", "SPHANDOR", "CYCLOPS", "MI", "BISH??", "FUJIMIGAHASA", "S??SH??", "HAGONE", "KOSUI"]];
var hints = [["ZRGN FUNCR JBEQF","GUR ZNTVP FDHNER EBBG BS 36 VF 6","GENPR FDHNER/GEVNATYR/PVEPYR ERSRERAPRF"], ["VAVGVNYYL PURPX VAGREFRPGVBAF","ZVEEBEVAT = E, FLZZRGEVP = L","GNXR BCCBFVGRF BS YRGGREF FUNERQ JVGU 36"], ["VFYNAQ YNAQF FNAQ","ERSRE 2 CHMMYR NAQ BEQRE YRGGREF","C. OBNG 2 V. VFYNAQ SVKRQ YRGGRE BEQRE"], ["PNFU EHYRF RIRELGUVAT","RAGRE GUR ARJ FYNAT YLEVPF","PBZCYRGR 'RAGRE GUR JH-GNAT' YLEVPF"], ["TL??E?? TL??E??, URYY???","JUNG'F GUR HAVPBQR SBE OHQNCRFG?","RKGENPG YRGGREF ONFRQ BA UHATNEVNA PBQRF"], ["QRIVYVFU AHZORE ANZRF","UROERJ AHZREBYBTL ERIRNYF JUB'F JEBAT","HAVPBQR EBJ BQQ-BARF-BHG HFVAT TRZNGEVN"], ["TNZR BS PUNAPR","ORG LBH FUBHYQ TVIR GUR BGUREF N FCVA","NYY GUR YRNQF VA QRRE UHAGRE JRER GUVF"], ["ERFG AHZORE CRNPR","GURL NER FHEIVIRQ OL GURVE FCBHFRF","SVYY VA OYNAXF SBE GUR 36 PYHO"], ["FXVC SBE ERSNPGBE","TB SBHEGU NAQ FRRX AHZREVPNY CNGGREAF","ZRFFNTR RAPBQRF AHZORE BS SNPGBEF"], ["UVTUYL QENZNGVP GENAFNPGVBAF","CBYGV NQQF N OHAPU NAQ ERZBIRF FBZR","QENZNGVP FVGHNGVBAF VAVGVNYF ZNGUF"], ["PURDHRERQ GUR GNOYR","SVEFG SBHE: ULQEN URNYVAT OHEAG YVGUTBJ","SVAQ GUR ZVFCYNPRQ CREVBQVP RYRZRAGF"], ["'OVT' CBCFGNE'F ERIREFRQ","V YBIRQ URE FBATF SEVRAQOBL NAQ VQRN ONQ","ERIREFR NEVNAN TENAQR FBATF VAQRK RKGENF"], ["EHA GUR FGNGF","JUB JBHYQ JVA: N QENTBA BE N ORUBYQRE?","QVSSRERAPR VA ZVQQYR JBEQ FGNGF, 5R Q&Q"], ["YBJREPNFR GLCBTENCUL SRNGHERF","WHFG YVFGRA N GVGGYR GB GUR PUNENPGREF","YBJREPNFR WBGF NAQ PEBFFONEF VA ZBEFR"], ["FHVG VA UNAQ","TBGGN HFR JUNG'F VA LBHE UNAQF, GJVPR","AHZORE PNEQF OL FHVG FCRYY FBZRGUVAT"], ["GJVAXYR GJVAXYR ONAARE","AB NYCUNORG PBHYQ UNAQYR ORGFL'F JBEX","AHZORE BS FGNEF QRFPEVORF CBYLTBA"], ["ZNGPUVAT TEVQ SRNGHERF","BAYL BAR VAFGNAPR BS ERSRERAPRF, JRVEQ","VQRAGVSL JBEQF VA PBEERFCBAQVAT TEVQF"], ["FURYGRE ENFPNY PEHFGNPRNA","FGNEG JURERIRE LBH JNAG, QBA'G YBBX SNE","EVIRE VF CB, XVQ VF FPNZC, TBBQ YHPX"], ["ANIVTNGVAT AFJ PBBEQVANGRF","GUR JVYY EBTREF UVTUJNL VF GBB YBAT URER","UVTUJNL AHZOREF VAQVPNGR CBF/QVFGNAPR"], ["IVQRBTNZR YBER'F QRRC","GBZBEEBJ JVAQVAT FBZR EVQQYR AHZOREF","ZBEEBJJVAQ TVIRF VAQRK VAGB FGNE JBHAQ"], ["CHG VA SYNZRF","UREOREG ZBEEVFBA JNF PUNATRQ SBERIRE","JEBAT YRGGREF SEBZ UVAQRAOHET ERCBEG"], ["OBHAPR VAGB NQRYNVQR","JUB JBHYQ JVA: 1 CUBRAVK BE ZNAL UNJF?","36REF SVANYF UVFGBEL UNF FBZR PUNATRF"], ["QHQ TVSG ZNTVP","ABGUVAT NF TBBQ NF N AVZOHF, GUBHTU","VAQRK QHQYRL'F CERFRAGF OL PBYHZA PBHAGF"], ["FGEVXVAT NQQVGVBAF ERDHVERQ","FBZRGUVAT ZNEXF GUR FCBG SBE GUVF FCBEG","NQQ FGEVXR BE NA K NAQ HFR OVANEL"], ["ZVKRQ HC GNPGVPF","PBZCNERQ GB NEG BS JNE GUVF VF YNPXVAT","ZVFFVAT 36 FGENGNTRZF NAQ PUNCGREF"], ["IEBBZ NEBHAQ JVAAREF","WHFG BAR PVEPHYNE GENPX? OBEVAT","FJNC 2020 ANFPNE GBC 16 JVGU GENPX JBEQF"], ["PNEGBA EBLPR OBHDHRG","ONFVPNYYL GUERR QBMRA VA FRGF BS GUERR","GREANEL FRGF SEBZ RTTF, EBYYF, NAQ EBFRF"], ["NPGBEF VA GRZCYR","WRG YV VF 2 ZNXR XHAT SH ZBIVRF","VAQRK VAGB XHAT SH NPGBE FHEANZRF"], ["YNJ RASBEPRZRAG DHNEGREF","YNJ NAQ BEQRE NAQ PNFU NAQ OHVYQVATF","SNPGF NOBHG ANGVBANY CBYVPR NAQ ZBARL"], ["BVY BE QRQHPGVBA","RIRAGHNYYL ENAXF NAQ ERTVZRAGF BIREYNC","SNZBHF CHMMYR RHYRE CEBIRQ VZCBFFVOYR"], ["ZBIVRF GB HAVPBQR","V NZ GUR ZBIVR 8 SBEGAVTUGF ABGVPR","PBAIREG GB ZBIVRF HAVPBQR SEBZ BSSFRG"], ["FGNGR BS ZRAQ","SNPGF NOBHG URER ZNYR ZR TERRA JVGU ??","SVK SNPGF NOBHG ARINQN NZBAT ARVTUOBHEF"], ["YRGGREF XRLOBNEQ PELCGVP","GLCVAT VF RNFL NF CEVBEV FGVAT FRPGVBA","BSSFRG XRLOBNEQ YRGGREF GB SBEZ PELCGVP"], ["VAPBZCYRGR PBAIREFVBA ERDHVERQ","GUR ONFVP SBEZNGVBA VF UNEQ GB JBEX","NSSVK VA/BHG NAQ PBAIREG OVANEL GB URK"], ["URYVNPNY ANHGVPNY ERSRERAPRF","V'IR SYNTTRQ N OHAPU BS QRPNAGREF","HFR QRPNAF OL MBQVNP GB ERNQ FRZNCUBER"], ["PLPYR ZBHAGNVA REEBEF","GUVF EBGGRA SHWV NCCYR VF N OVG BSS!","EBG 36 IVRJF GVGYRF OEBGURE VF N OENAQ"]];
var answers = ["URJ","JUNG","UNGGRE","RNFG","ONYNFFNTLNEZNG","ORNFG","JUVGR","PNGUREVAR","VAANGR","QVFNFGRE","CNGGREAF","OHGREN","LNUGMRR","UBEVMBAGNY","GNYBA","CRAGNTENZ","CEBPHENOYR","BHGCHG","UNMNEQ","PVIVYVMNGVBA","VASYHRAMN","ONYYRE","CVCROBZO","OBHYRF","LNATGMR","SVGMTRENYQ","SYBEVFG","SVTUGRE","OEVOREVRF","FCBVYREF","UNAQ","FNAQFGBAR","FUVSGRQ","UVFGBEL","NCBCUVF","CEVAGRE","SEVRAQFUVC"];

var hintButtonDetails = [["Bronze", "#E0BD89"], ["Silver", "#d3d3d3"], ["Gold", "#FCE36A"]];
document.getElementById("grid-div").appendChild(createTable(tableData));
var myState = generateState();
myState = getStateFromCookies(myState);
var myJSON = JSON.parse(myState);
var answerTable = createAnswerTable(myJSON);
document.getElementById("answer-div").appendChild(answerTable);
document.getElementById("answer-37").value = myJSON[36][0];
document.getElementById("answer-37").addEventListener("input", checkAnswerEvent);
checkAllAnswers();

window.onbeforeunload = function(){
	saveAnswers();
};