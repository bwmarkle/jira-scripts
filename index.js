// ==UserScript==
// @name         Jira - Add story point summary.
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Description coming soon.
// @author       BradM
// @match        https://jira.imhdev.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var lowEnd = 0, highEnd = 0, totalStorypoints = 0;

    if( jQuery( '#total_storypoints').length === 0 ) {
        jQuery( '.count-pagination' ).after( '<div id="total_storypoints" title="Data via tamper / grease monkey"></div>' );
    }

    jQuery.each( jQuery( '.issuerow' ), function() {
        var $tr = jQuery( this ),
            status = $tr.find( 'td.status' ).text();

        if( ! status.includes( 'Open' ) ) {
            return;
        }

        var storypoints = parseInt( $tr.find( 'td.customfield_10004' ).text().trim() );

        totalStorypoints += storypoints;
        lowEnd += storypoints;
        highEnd += storypoints;
        if( storypoints > 3 ) {
            highEnd += storypoints;
        }
    });

    var table =
        '<style>' +
        '#total_storypoints{ padding: 8px 20px; }' +
        '#total_storypoints table{ border: 1px solid #ddd;}' +
        '#total_storypoints table th{ text-align:left; }' +
        '</style>' +
        '<strong>Story Point Summary</strong><br />' +
        'The following is a summary of all OPEN tickets in the above list.' +
        '<table>' +
        '<tr><th>Story Points:</th><td>' + totalStorypoints + '</td></tr>' +
        '<tr><th>Low end:</th><td>' + totalStorypoints + ' hours (' + totalStorypoints/8 + ' days / ' + totalStorypoints/40 + ' weeks)</td></tr>' +
        '<tr><th>High end:</th><td>' + highEnd + ' hours (' + highEnd/8 + ' days / ' + highEnd/40 + ' weeks)</td></tr>' +
        '</table>';

    jQuery( '#total_storypoints' ).html( table );
})();