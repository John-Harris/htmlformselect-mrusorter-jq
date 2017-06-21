// ==UserScript==
// @name         load up htmlformselect_mru_jq.js
// @namespace    http://gameteamlead.com/
// @version      0.1
// @description  demo using htmlformselect_mru_jq in a 'old web app'
// @author       John Harris
// @include      https://webmail.gameteamlead.com/src/right_main.php*
// @grant        no-none
// @require      http://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js
// @require      https://webmail.gameteamlead.com/src/js/htmlformselect_mru_jq.js
// ==/UserScript==



(function(){
    // alert($); // check if the dollar (jquery) function works
    // alert($().jquery); // check jQuery version
    console.log ("$('form select').attr('data-sortmru', '');");
    $('form select').attr('data-sortmru', '');
})();
