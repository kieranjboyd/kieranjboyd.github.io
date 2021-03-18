function createTable(tableData) {
	var table = document.createElement('table');
	var tableBody = document.createElement('tbody');

	tableData.forEach(function(rowData) {
		var row = document.createElement('tr');

		rowData.forEach(function(cellData) {
			var cell = document.createElement('td');
			cell.appendChild(document.createTextNode(cellData));
			row.appendChild(cell);
		});

		tableBody.appendChild(row);
	});

	table.appendChild(tableBody);
	return table;
}

function createAnswerTable(answerData) {
	var table = document.createElement('table');
	var tableBody = document.createElement('tbody');
	
	var i = 0;
	
	for(var r = 0; r < 6; r++) {
		var row = document.createElement('tr');

		for(var c = 0; c < 6; c++) {
			var cell = document.createElement('td');
			var input = document.createElement("input");
			input.id = "answer-" + (i+1)
			input.type = "text";
			input.value = answerData[i][0];
			cell.appendChild(input);
			row.appendChild(cell);
			i++;
		};

		tableBody.appendChild(row);
	};

	table.appendChild(tableBody);
	return table;
}

function generateState() {
	var s = '[';
	for(var r = 0; r < 37; r++) {
		s += '["' + 'test' + '",0]';
		if(r < 36) { s += "," }
	}
	s += ']'
	return s;
}

function generateCurrentAnswersState() {
	var s = '[';
	for(var i = 0; i < 36; i++) {
		var myid = "answer-" + (i+1);
		var element = document.getElementById(myid);
		s += '["' + document.getElementById("answer-" + (i+1)).value + '",0]';
		if(i < 36) { s += "," }
	}
	s += ']'
	return s;
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
	alert("Setting '" + cname + "' to the following: '" + cvalue + "'");
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for(var i = 0; i < ca.length; i++) {
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
	var input		 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	var output		= 'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm';
	var index		 = x => input.indexOf(x);
	var translate = x => index(x) > -1 ? output[index(x)] : x;
	return str.split('').map(translate).join('');
}

function checkAnswers() {
	var username = getCookie("answers");
	if (username != "") {
		alert("Saved answers: " + username);
	} else {
		alert("No answers saved");
	}
}

function saveAnswers() {
	setCookie("answers", generateCurrentAnswersState(), 30);
}

var tableData = [["COME", "DANCE", "AROUND", "MY", "PUZZLE", "SET", "EYE", "AMPLE", "MENTOR", "ENVI", "SIBLEY", "AND", "INVISIBLE", "BIENNIAL", "STEVENSON", "SEXISTS", "BRIGHTEST", "NEWTONS", "FROM", "THE", "PAIN", "CENSORED", "THOUGHTS", "CONTAIN", "FREEPHONE", "KAPOSVÁR", "MOHÁCS", "VODAFONE", "SZIGETVÁR", "VESZPRÉM", "NUN", "REISH", "VAV", "KOOF", "SAMECH", "REISH"],["KNIT", "TOGETHER", "FROM", "MAGIC", "SHAPES", "ASCENDING", "ECESIS", "SWINGEBUCKLER", "SHARPSHOOTER", "ANTIQUATED", "TRANSGRESSION", "SECURITY", "FROUFROU", "UNIQUE", "SATIATION", "VERITY", "APPETITE", "HOTNESS", "STICKIN'", "UP", "WHITE", "CENSORED", "IN", "BALL", "KISKŐRÖS", "MARCALI", "KISKUNHALAS", "BÉKÉSCSABA", "MOHÁCS", "KAPOSVÁR", "ELIRZ", "URIEL", "ALORI", "ABRAHAM", "ELIOR", "ANYA"],["FROM", "ETERNAL", "TRUTHS", "YOU", "MUST", "USE", "ANT", "QUARANTINE", "INNUENDOS", "RASPBERRY", "ECHPORAXIA", "LITERALLY", "SIEROZEM", "PUZZLE", "FATIGUE", "GALAXY", "SWAP", "BOAT", "I", "CENSORED", "WITH", "THAT", "OL'", "LOCO", "VODAFONE", "SZIGETVÁR", "VODAFONE", "SIÓFOK", "PÁPA", "KISKŐRÖS", "EMIM", "ILAN", "AFI", "ALINE", "DINA", "EMILY"],["LOGIC", "AND", "REASONING", "PLUS", "LOVE", "FINALLY", "OFF", "ADMINISTRATION", "THANKSGIVING", "WELL-INFORMED", "IDENTIFICATION", "STEWARDSHIP", "CAVEFISH", "KICK", "PETITE", "PIPE", "COORDINATES", "TATTOO", "GOD", "CENSORED", "OUT", "OF", "NOWHERE", "GOD", "SZIGETVÁR", "KISKŐRÖS", "MOHÁCS", "KISKUNHALAS", "SZIGETVÁR", "KISKŐRÖS", "EHUD", "HADDAD", "AYA", "ANDY", "EZOV", "OHAD"],["MY", "OBTUSE", "KNOT", "TOOK", "ROOT", "EACH", "HUNTERS", "OSTEOARTHRITIS", "THUMBSCREW", "CHANCELLOR", "CITIZENSHIP", "BRILLIANT", "FREETHROW", "LETTERS", "PIPIPI", "TENDRILS", "TRUST", "INPATIENT", "CENSORED", "IS", "SHORT", "FOR", "THE", "RAZOR", "MARCALI", "KESZTHELY", "SIÓFOK", "TAPOLCA", "MOHÁCS", "KISKŐRÖS", "ELROY", "EMOR", "ORLY", "ARIELLA", "ILOR", "ANBEL"],["LETTER", "I", "SAW", "WAS", "QUITE", "RIGHT", "ECTOPLASM", "TREACHEROUS", "YELLOWISH", "ASBESTOSIS", "MIGRATION", "EXEMPLIFICATION", "IGNEOUS", "JOIN", "FRANCHISE", "ANALOGY", "THIRTEENTH", "CHROMOSOME", "POETRY'S", "IN", "MOTION", "CENSORED", "TO", "CENSORED", "SIÓFOK", "PÁPA", "VODAFONE", "BAJA", "MARCALI", "KAPOSVÁR", "ABIGAIL", "AYALA", "ENOCH", "AMMAH", "LEVI", "ELIJA"],["DEPENDING", "ON", "WHICH", "COUNTRY", "YOU'RE", "IN", "FIVE", "LORD", "POETRY", "FEVER", "FOUR", "GREECE", "I", "GONE", "IN", "ARTFUL", "AM", "IN", "ENTER", "A", "RESCUER", "A", "REVEALER", "AN", "BOARD", "KARBASSIOUN", "KNIGHTHOOD", "AUCTION", "FLUEGEL", "NICOLAI", "META", "THEME", "OF", "THIS", "DECEMBER", "CHALLENGE"],["IT'S", "EITHER", "RISKY", "OR", "EXTREMELY", "RISKY", "NORMA", "TEN", "BOMBSHELL", "TWO", "MULTIPLE", "USA", "THINGS", "TO", "IN", "OTHERS", "THAT", "COGITATE", "IDEAL", "AN", "OBJECT", "OF", "FATAL", "PASSION", "ALABAMA", "CYLINDER", "SULLIAGE", "RAIDERS", "CHLOROFORM", "ARMPIT", "WHERE", "PATRICK", "MADE", "SEXY", "CONGRATULATIONS", "POTTERY"],["BY", "CHANCE", "ANOTHER", "PUZZLE", "IS", "SIMILAR", "AUGUSTA", "MATHEMATICIAN", "FLYOLOGY", "CANCER", "THREE", "SIX", "ONE", "AS", "HINT", "TO", "OF", "SUCH", "A", "PROBLEM", "A", "CULPRIT", "A", "MADMAN", "GALAXIES", "JERMYN", "ARCENEAUX", "CELEBRATORY", "BROKERAGE", "KRYPTIC", "WHAT", "A", "CLOUD", "DOES", "RIGHT", "THERE"],["IN", "THEME", "AND", "COUNT", "OF", "COLOURS", "JOHN", "GAMBLER", "EIGHT", "TUBERCULOSIS", "KATE", "USA", "AT", "SQUARE", "EACH", "TAKE", "PATTERNS", "AWAY", "AND", "AN", "OBSTACLE", "EXIT", "A", "MASTER", "INDICATE", "TINDER", "ANTEATER", "ASTERISK", "EIGENVALUE", "ZENITH", "SATISFACTORY", "EARTH", "FIRST", "CALLED", "GREEDY", "GLUCINE"],["THIS", "HAS", "ONE", "OR", "TWO", "GREEN", "ONE", "NINE", "ACTIVISM", "CRASH", "CHARLES", "FRANCE", "OF", "HEART", "IT'S", "EACH", "SOME", "TO", "THE", "IMPRUDENT", "A", "THING", "COVETED", "AND", "THALAMUS", "LEDERMAN", "BUSINESS", "PALAIS", "FOSSILIZE", "TELECOMMUTER", "REST", "TIME", "ON", "THE", "POSITIONS", "HOUSE"],["AND", "SOMETHING", "ELSE", "THAT'S", "JUST", "BLANK", "ELEVEN", "SINGER", "TWELVE", "CANCER", "SEVEN", "USA", "MUCH", "HAZY", "AND", "FACTOR", "MORE", "STATEMENT", "AN", "EXECUTIONER", "FOLLOWED", "BY", "A", "BEAR", "NI'IHAU", "FLEURETTE", "MOSQUE", "LIVABLE", "TENSIOMETER", "OGDEN", "COITUS", "IN", "THE", "SERVER", "RESEARCH", "ROOM"],["STIRGE", "INTERRUPTION", "XVART", "HAWK", "STRIPED", "DOLPHIN", "THE", "BIBLIOPHILIC", "BRAMBERG", "BIBLE", "UTILISED", "IMPRESSIVE", "BESEECH", "ATTIC", "QDISC", "QUID", "KITH", "KUDOS", "CROATIA", "AMEGHINO", "JORDAN", "GUAYAQUIL", "GUAM", "PAQUISHA", "DAMN", "THIS", "PUZZLE", "SURE", "IS", "A", "BISECT", "AND", "SWAP", "REMOVE", "DUPLICATE", "LETTERS"],["WEASEL", "CONCEPT", "TIAMAT", "ETTERCAP", "MOCHA", "PEGASUS", "PAGINATIONS", "EACH", "A", "36-LINE", "ARTISTIC", "ELEGANT", "NEUROTIC", "AS", "ARCH", "QUASH", "OVERHEAD", "NASTINESS", "ISRAEL", "CANADA", "ARUBA", "SLOVENIA", "KURDISTAN", "SARAWAK", "RISKY", "ONE", "I'VE", "CONSTRUCTED", "A", "CHALLENGE", "APPEND", "ITALIAN", "RIVER", "FIND", "IN", "GRID"],["PANTHER", "STRANGE", "SHOOSUVA", "NAGPA", "CODEX", "IMIX", "BOOKBINDING", "TESTAMENT", "TYPOGRAPHIC", "TREATMENTS", "AND", "IMPRINTING", "JULES", "ORCHID", "REBOUND", "THRESHOLD", "KIND", "MOSAIC", "UNGUÍA", "WALES", "TULSA", "AMEGHINO", "DNIPRO", "MALAYSIA", "AND", "USED", "CLEVER", "HIDDEN", "REFERENCES", "TO", "STEP", "NORTH", "ONCE", "PREPEND", "INTO", "CHILD"],["AARAKOCRA", "SPLINT", "SPRITE", "STEGOSAURUS", "WISTFUL", "DRAGONBAIT", "CHARACTERISTICS", "WERE", "USED", "NAMELY", "FATTER", "DOWNWARD", "JDBC", "ESTABLISH", "LEMONGRASS", "KUFIC", "ADD", "JOSH", "OREGON", "ALBANIA", "CAIMITO", "NAURU", "HONDURAS", "BAHÁʼÍ", "OTHER", "PUZZLES", "ALL", "INEVITABLY", "BRINGING", "BACK", "POSTPEND", "INTO", "ANIMAL", "REMOVE", "PORK", "EATER"],["DEVOURER", "CHALLENGING", "GERYON", "CLOAKER", "LEWIS", "ASSASSIN", "BRUSHES", "JOINING", "INSIGNIA", "FINISHINGS", "ENSURED", "EACH", "ENCROACH", "QUAYS", "EIGHTEENTH", "EGOCENTRIC", "THESIS", "YELLOWS", "SONORA", "HOKKAIDO", "BHUTAN", "BAHÁʼÍ", "SATAKUNTA", "ANTWERP", "LOOT", "IN", "THE", "FORM", "OF", "ALMOST", "SPIN", "AROUND", "PLOSIVE", "PAD", "WITH", "LETTERS"],["KRAKEN", "DEXTROSE", "LEVIATHAN", "CAMBION", "SILICON", "BULETTE", "JOT", "AND", "CROSSBAR", "WAS", "VERIFIABLY", "MINIMISED", "HYDRAULIC", "IMPISH", "URAEMIC", "FOREGROUND", "JADED", "SPACIOUS", "COMOROS", "SARAWAK", "ISFENDIYARIDS", "CAMEROON", "AJAIGARH", "NEPAL", "ELEVEN", "LETTERS", "WHICH", "CAN", "BE", "EXTRACTED", "CULL", "THE", "HERD", "OUTPUT", "IS", "SQUARE"],["NORTH", "FROM", "THE", "ACCOMODATION", "ON", "CORNER", "THEN", "VIVEC", "THOUGHT", "OF", "THE", "ENANTIOMORPH", "OH", "KHET", "HUMANITY", "AND", "ALL", "THE", "INAPPLICABLE", "SPECTRES", "TULLES", "ZILCH", "WILDCATS", "CANNONS", "OXYD", "CHINON", "THAT'S", "LILIES", "ASTERIX", "DUCKTALES", "STY", "ALES", "INDEED", "AFFIX", "RICH", "ETERNAL"],["OF", "CITY", "ROAD", "AND", "PITTWATER", "ROAD", "THE", "SNAKE", "IN", "THE", "NIGHT", "SKY", "GRAPINESSES", "SCREAMING", "NODULAR", "HERE", "I", "TOLD", "WILDCATS", "INAPPLICABLE", "WILDCATS", "INAPPLICABLE", "MAGIC", "STING", "TWO", "STORMLORD", "VOLFIED", "VERYTEX", "CRATERMAZE", "TASKS", "FLEES", "EXCISE", "HARD", "OFF", "OUT", "AIR"],["TURN", "RIGHT", "ON", "THE", "PENINSULA", "LINK", "THE", "SECRET", "FIRE", "PLUS", "GOOD", "DAEDRA", "YOU", "LIT", "I", "ENACT", "NERVE", "TALK", "WILDCATS", "MAGIC", "INAPPLICABLE", "NADA", "BANK", "TITANS", "HOUSES", "SKYBUSTER", "MAGNAVOX", "LESS", "MACINTOSH", "BADLANDS", "BACK", "WAY", "PRICE", "BOY", "ZONE", "LEXICALLY"],["LEFT", "ON", "SPIT", "ROAD", "LEFT", "ON", "LISTENING", "TO", "THE", "CAPTIVE", "SAGE", "HE", "GOT", "PEOPLE", "THEIR", "FRIENDS", "RARE", "ION", "HAWKS", "NONE", "WILDCATS", "TIGERS", "BUSTLE", "TAIPANS", "PERESTROIKA", "THAN", "BOA", "HYPERBALL", "BEATERS", "IMPERIUM", "MULTIPLE", "EXPLOIT", "UP", "PAY", "TEAS", "LATE"],["SOUTH", "WESTERN", "MOTORWAY", "LEFT", "ON", "PENINSULA", "SAW", "THE", "HEART", "OF", "LORKHAN", "THE", "THERE", "PAH", "IT'S", "PIT", "IT'S", "AH", "INAPPLICABLE", "INAPPLICABLE", "BARKERS", "INAPPLICABLE", "INAPPLICABLE", "INAPPLICABLE", "SIMULCRA", "HYPERSPEED", "POLTERGEISTS", "SPELUNX", "DEATHTRACK", "LAST", "NET", "APE", "GENERAL", "MINES", "RADIX", "RENT"],["LINK", "AGAIN", "AND", "NOW", "YOU'RE", "OVERSEAS", "ENDING", "OF", "THE", "WORLD", "IS", "ALMSIVI", "I", "CAN'T", "TALK", "AEDILES", "AND", "GENTLEMEN", "INAPPLICABLE", "WILDCATS", "BEAKERS", "INAPPLICABLE", "HAWKS", "UNITED", "BATTLETOADS", "CURSES", "RALEIGH", "ROLEX", "YEAR", "PANASONIC", "PREEMPTIVE", "BOER", "DEUX", "MAIM", "FIRST", "HOME"],["LOOT", "WITH", "HEAVENS", "WHILE", "WINNING", "EAST", "SUPPORTERS", "IMPRINTS", "EXPLORE", "IDENTIFY", "IMPRESSIONS", "COMMENTATORS", "NEST", "SCOTCH", "SPRING", "NOISETTE", "SAUSAGE", "VIENNA", "IN", "THE", "FIRST", "CHAMBER", "IS", "NA", "ARCHITECTURE", "LANDMASS", "CAKE", "CONMAN", "HONKIE", "POULET", "FAULT", "CREAM", "DRAIN", "BUYER", "ATLAS", "EQUIP"],["WATCH", "REPAIR", "OPPORTUNIY", "ENEMY", "TO", "SMILE", "ESCORT", "ELLIOTT", "BLANEY", "ALMIROLA", "BOWYER", "DOG", "TIMER", "CINAMMON", "WATER", "SOLO", "DEATH", "CLIMBING", "CHA", "FIVE", "AFTER", "THE", "STAFF", "CHAMBER", "STREET", "BABKI", "COUNTRY", "NAMESAKE", "CAMP", "THULLA", "CREEP", "FELON", "EVENT", "DRESS", "BROOM", "AMBER"],["STRATEGEMS", "THE", "CORPSE", "BY", "ONE", "MOUNTAIN", "SONG", "BUSCH", "KESELOWSKI", "HAMLIN", "BUSCH", "NOTE", "GOOSE", "CALL", "CAGE", "SWISS", "CHRISTMAS", "BAD", "ARE", "PASQUAL", "AND", "GOLDEN", "ARMS", "THE", "DESIGNER", "ARSENAL", "PETI ", "RUSSELL", "POPO", "MAHARASHTRA", "BRASS", "AGENT", "CHAIR", "EPROM", "BLANK", "BLANK"],["OBTAIN", "THE", "WATER", "FROM", "CHAOS", "STRIKE", "GROOVE", "HARVICK", "DIBENEDETTO", "DILLON", "LOGANO", "TALLY", "QUARTZ", "FABERGE", "ANT", "DRUM", "RUBY", "CUP", "TWENTY-FOURTH", "CHAMBER", "FEATURES", "FARRAH", "CAT", "AND", "LUBYANKA", "MUSOR", "URL", "FRIC", "ROZZER", "ORFÈVRES", "ELFIN", "FIBER", "BLANK", "BLANK", "BLANK", "BLANK"],["POINT", "THE", "HOST", "WITH", "PROXIMATE", "TIMBERS", "RECORDING", "TRUEX", "BYRON", "BOWMAN", "CUSTER", "VESTIGE", "EASTER", "CHINA", "CODDLED", "BUDS", "SAC", "WINDOW", "BRUNETTE", "ZEALOT", "IN", "THE", "TOP", "CHAMBER", "PLAZA", "ARTICLE", "PIG", "PARÁK", "DATUNG", "HELICOIDE", "DONOR", "ETHOS", "BLANK", "BLANK", "BLANK", "BLANK"],["CHAIN", "BEAUTY", "DESPERATE", "STRATEGY", "TO", "SOW", "COMPETITORS", "NOSE", "WAND", "RUMP", "NUMBER", "AUTOMOBILES", "EDEN", "BARREL", "HIP", "TOILET", "COMPASS", "NOODLE", "AWAIT", "CHEN", "ZHEN", "AND", "THE", "AVATAR", "VIC", "TOMBO", "DOSH", "DOLLARYDOO", "YARD", "BOLO", "BLANK", "BLANK", "BLANK", "BLANK", "GUIDE", "SOLUTION"],["GALLONS", "NINE", "SEPARATION", "GRACELAND", "SEVEN", "LESS", "COVERED", "IN", "SLOW", "WILD", "HORDES", "GRIZZLIES", "PENCE", "ABSOLUTE", "BOYLE", "FANTASTIC", "BLUE", "COMMERCE", "FUSIONISM", "HOMOGENEITY", "DISPOSING", "CONDITION", "HOMOGENEOUS", "IRONING", "ARUERIS", "OMOT", "SRAT", "NIKE", "SEBOS", "ISI", "EDO", "NIHON-BATHI", "TŌTŌUMI", "JANCHŪ", "KAZUHA", "NO"],["SMOKING", "MOMENTS", "OF", "TO", "BIMESTERS", "OR", "MOST", "HOVEL", "ROOMS", "ALIGN", "SIGHTINGS", "TEAPOT", "MAITRE", "EDGAR", "HENRY", "INVERTED", "OXFORD", "BLESS", "VARIANT", "VOICING", "SANDY-RED", "SOLUBILITY", "HUMANITIES", "CORPOREOUS", "MENSOUR", "SODA", "SITH", "THUMI", "XU", "SAGON", "KAIRO", "SOSHŪ", "UMEMAWANOSHŌ", "GOHYAKU-RAKANJI", "BAZAIDŌ", "KANAGAWA"],["ELEVEN", "PHOTO", "DELISLES", "LEAGUES", "IN", "KÈ", "PATRICIA", "RYAN", "DIXON", "BATTLE", "BURN", "CLAW", "STRING", "MAGI", "ODDS", "CLOUD", "SQUARE", "MUSKETEERS", "RATION", "TRANS-SAHARAN", "WINNOW", "DICES", "HIDE", "INVITING", "XAU", "EROS", "KNUM", "BRYSOUS", "PROTEUS", "SATAN", "OKI", "SAMI-URA", "FUKAGAWA", "MANDEN-BASHI", "SHITA", "GAICŪ"],["AND", "THREE", "FIFTY", "SEVENTEEN", "TIBET", "SEVENTY", "POPPY", "MIDDEN", "CAVE", "SUPER", "GRID", "JUNIPER", "THREE", "DEEP", "SPECIAL", "ZERO", "DORADO", "SCOTT", "BELL-SHAPED", "GLORIOUS", "CITING", "ODOROUS", "JURY", "NUH-UH", "SERUCUTH", "ARON", "BAROCHE", "NYMPHS", "NEFTHADA", "PSERMES", "KAISEI", "BUSKŪ", "SENJU", "TŌMAIDŌ", "HODOGAYA", "TŌTO"],["STOCK", "BARLEYCORNS", "GONE", "IN", "ONE", "CENTIM", "FUSCHIA", "NEWT", "SIGNIFICANT", "PRODUCTION", "OF", "ASH", "HOLY", "JAY", "BRONTE", "MALCOLM", "MIDDLE", "ADRIATIC", "CONTINENT", "VOCATION", "VEST", "DENTED", "FIX", "BLACK", "AHARPH", "KAIROS", "FAMBAIS", "THOPIBUI", "AJARAS", "AZUEL", "AYAKUSA", "HONGANJI", "OMMAYAMASHI", "YORI", "RYŌGOKU-BASHI", "YŪHI"],["LOCK", "HERO", "HORSES", "SIXTY", "WHOLE", "THE", "CONDOR", "HOTEL", "GIRLS", "GOLF", "GOOF", "ROOM", "JUDAH", "SALVADOR", "OFF", "MOURNING", "PRE", "NOT", "CONSPICUOUS", "FINITE", "SUBORDINATE", "CORPOREALITY", "INSIDE", "KING", "ALATH", "ZALOIAS", "SIC", "SOUBETTI", "SPHANDOR", "CYCLOPS", "MI", "BISHŪ", "FUJIMIGAHASA", "SŌSHŪ", "HAGONE", "KOSUI"]];

document.getElementById("main-table").appendChild(createTable(tableData));
var mystate = generateState();
mystate = getStateFromCookies(mystate);
var myJSON = JSON.parse(generateState());
var answerTable = createAnswerTable(myJSON);
document.getElementById("answer-table").appendChild(answerTable);