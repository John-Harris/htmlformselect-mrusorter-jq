/**
 *  A jQuery plugin that can provide two value-add services to html form select controls
 *  first optional service is alphabetical sorting via the labels text
 *  second optional service is 'mru' most-recently-used
 *  the web page user's most recently selected choices from that select list can be made to appear at the top of the list 
 */

(function($) {

	var myoptions = {};
	myoptions.verbose_debug = false;
	myoptions.memoryPrefix = 'hfsmru_';
	
	myoptions.verbose_debug && console.log ('htmlformselect_mru_jq.js running');
	
	$.fn.htmlformselect_mru = function(method, options) {
		
		myoptions.verbose_debug |= options.debug;
		if (options.memoryPrefix !== undefined) {
			myoptions.memoryPrefix = options.memoryPrefix;
		}
		
		myoptions.verbose_debug && console.log ('$.fn.htmlformselect_mru running');
		
	    settings = {
	        onLoaded: function() {},
	        onSelect: function() {}
	    }
	
	    if (methods[method]) {
	        return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
	    } else if (typeof method === 'object' || ! method) {
	        return methods.init.apply(this, arguments);
	    } else {
	        $.error('Method ' +  method + ' does not exist');
	    }
	}

	function toArray( obj ) {
		var i, arr = [];
		for ( i = obj.length; i--; ){
			arr[i] = obj[i];
		}
		return arr;
	}
	
	function sortAlpha (index, element) {
		// here we are copng with elements that might not have an 'id' but only a ;name'
		// such as the Mail Folder Lister box in SquirelMail
		var myId;
		var domSelectElement;
		domSelectElement = document.getElementById(myId);
		myId = $(element).attr('id');
		if (typeof myID === 'undefined') {
			myId = $(element).attr('name');
			domSelectElement = document.getElementsByName(myId)[0];
		} else {
			domSelectElement = document.getElementById(myId);
		}

		var domSelectOptions = domSelectElement.children;
		var optionsList = domSelectElement.options;
		
		var optionsArray = toArray (optionsList);
		
		var sortedOptions = optionsArray.sort (
			function (a, b) {
				return (a.text >= b.text)? 1: -1; 
			}
		);
		
		// set them back into the original source select in a performant manner
		var fragment = document.createDocumentFragment();
		sortedOptions.forEach(
			function(option, index) {
			    var opt = document.createElement('option');
			    opt.innerHTML = option.text;
			    opt.value = option.value;
			    fragment.appendChild(opt);
			}
		);
		$(element).html (fragment);
	} 

	function sortMRU (index, element) {
		//debugger;
		
		// here we are copng with elements that might not have an 'id' but only a ;name'
		// such as the Mail Folder Lister box in SquirelMail
		var myId;
		var domSelectElement;
		domSelectElement = document.getElementById(myId);
		myId = $(element).attr('id');
		if (typeof myID === 'undefined') {
			myId = $(element).attr('name');
			domSelectElement = document.getElementsByName(myId)[0];
		} else {
			domSelectElement = document.getElementById(myId);
		}


		var domSelectOptions = domSelectElement.children;
		var optionsList = domSelectElement.options;
		
		var optionsArray = toArray (optionsList);

		// get the MRU memory
		var storageName = myoptions.memoryPrefix + myId;
		var storedString = localStorage.getItem(storageName);
		var storedObject =  storedString === null ? {}: JSON.parse(storedString);
		
		if (myoptions.verbose_debug) {
			$(optionsArray).each (function (index, element) { console.log ("%02d %s", index, element.text); });
		}
		// sort options on the basis of (possibly missing/null) mru time

		var sortedOptions = optionsArray.sort (
			function (a, b) {
				// where mruime is 0 r equal, use the item index to detemine sort order
				// this is so it works in select optin lists that are in som sense hierachicalrather than alphabetic
				var AbeforeB;
				var mruTimeA = parseInt(storedObject[a.value]);
				var mruTimeB = parseInt(storedObject[b.value]);
				mruTimeA = isNaN(mruTimeA)? 0: mruTimeA;
				mruTimeB = isNaN(mruTimeB)? 0: mruTimeB;
				if (mruTimeA == mruTimeB) {
					AbeforeB = (a.index > b.index);
					return AbeforeB? 1: -1; 
				}
				AbeforeB = (mruTimeA < mruTimeB);
				return AbeforeB? 1: -1; 
			}
		);
		
		// set them back into the original source select in a performant manner
		var fragment = document.createDocumentFragment();
		sortedOptions.forEach(
			function(option, index) {
			    var opt = document.createElement('option');
			    opt.innerHTML = option.text;
			    opt.value = option.value;
			    fragment.appendChild(opt);
			}
		);
		$(element).html (fragment);
		
		// hook up a 'select' listener to record mruTime
		$(element).on( "click",
			function (obj, event) {
				// record timestamp to memory 
				//myoptions.verbose_debug || console.log ('click detected on option: ', this);
				var selectedIndex = this.selectedIndex;
				var selectedValue = String(this.value);
				storedObject [selectedValue] = Date.now();		// unixtimestamp
				localStorage.setItem(storageName, JSON.stringify(storedObject));
				//myoptions.verbose_debug || console.log ('memorized:: ', JSON.stringify(storedObject));
			}
		);
	} 

	var sortAlphaTargets = [];
	var sortMRUTargets = [];
	
	var methods = {
			
		// PUBLIC FUNCTIONS
	    init: function(options) {
	    	myoptions.verbose_debug && console.log ('htmlformselect_mru_jq.js init() running');
	    	
	    	sortAlphaTargets = jQuery("select[data-sortalpha]");
	    	myoptions.verbose_debug && console.log ('data-sortalpha targets: ', sortAlphaTargets);

	    	sortAlphaTargets.each (
	    		sortAlpha
	    	);
	    	
	    	sortMRUTargets = jQuery("select[data-sortmru]");
	    	myoptions.verbose_debug && console.log ('data-sortmru targets: ', sortMRUTargets);

	    	sortMRUTargets.each (
	    		sortMRU
	    	);
	    	
	        return this.each(
	        	function() {
		
		            if (options) {
		            	$.extend({}, settings, options);
		            }
		
		            var $this = $(this);
		
		            // PRIVATE FUNCTIONS
		            var onLoaded = function() {
		                sortContentAlpha();
		            }
		
		            var sortContentAlpha = function() {
		            }
		        }
	        );
	    }
	}

	$(document).ready (function () {
		$.fn.htmlformselect_mru ('init', typeof htmlformselect_mru_options === 'undefined'? {}: htmlformselect_mru_options);
	});
	
})(jQuery);
