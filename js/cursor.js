// List of sentences
var _CONTENT = [
  "_ write C--",
  "_ love Wireless Tech",
  "_ whoami",
  "I am Joseph Yang", 
  "_ engineer Embedded Software",
  "_ devote to inspiring work", 
  "_ whoami",
  "I am Joseph Yang",
  "_ am a CMU Tartan",
  "_ am a NTUEEr",
  "_ whoami",
  "I am Joseph Yang",
];

var _FIXED_TEXT_LEN = 2;
var _SLOW_INDEX = 4; // slow down every _SLOW_INDEX line

// Current sentence being processed
var _PART = 0;

// Character number of the current sentence being processed 
var _PART_INDEX = 0;

// Holds the handle returned from setInterval
var _INTERVAL_VAL;

// Element that holds the text
var _ELEMENT = document.querySelector("#text");

// Cursor element 
var _CURSOR = document.querySelector("#cursor");

// Wait time to delete
var _WAIT_TO_DEL;

// Implements typing effect
function Type() { 
	// Get substring with 1 characater added
	var text =  _CONTENT[_PART].substring(0, _PART_INDEX + 1);
	_ELEMENT.innerHTML = text + "<div id=\"cursor\"></div>";
	_PART_INDEX++;

	// If full sentence has been displayed then start to delete the sentence after some time
	if(text === _CONTENT[_PART]) {
		// Hide the cursor
//    _CURSOR.style.display = 'none';
    
    if(((_PART + 1) % _SLOW_INDEX) == 0) {
      _WAIT_TO_DEL = 3000;
    } else {
      _WAIT_TO_DEL = 1500;
    }
		clearInterval(_INTERVAL_VAL);
		setTimeout(function() {
			_INTERVAL_VAL = setInterval(Delete, 50);
		}, _WAIT_TO_DEL);
	}
}

// Implements deleting effect
function Delete() {
	// Get substring with 1 characater deleted
	var text =  _CONTENT[_PART].substring(0, _PART_INDEX - 1);
	_ELEMENT.innerHTML = text;
	_PART_INDEX--;
	// If sentence has been deleted then start to display the next sentence
	if(text.length === _FIXED_TEXT_LEN) {
		clearInterval(_INTERVAL_VAL);

		// If current sentence was last then display the first one, else move to the next
		if(_PART == (_CONTENT.length - 1))
			_PART = 0;
		else
			_PART++;
		
		_PART_INDEX = _FIXED_TEXT_LEN-1;

		// Start to display the next sentence after some time
		setTimeout(function() {
			_CURSOR.style.display = 'inline-block';
			_INTERVAL_VAL = setInterval(Type, 100);
		}, 200);
	}
}

// Start the typing effect on load
_INTERVAL_VAL = setInterval(Type, 100);
