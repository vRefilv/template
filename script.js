$(document).ready(function () {
    // Check the hash in the URL on page load
    var initialHash = window.location.hash;
    if (initialHash) {
        // Remove the '#' character
        var linkvalue = initialHash.substring(1);

        // Check if the hash includes the search parameter
        if (linkvalue.startsWith('search=')) {
            var searchTerm = decodeURIComponent(linkvalue.substring('search='.length));
            // Trigger the search with the specified term
            performSearch(searchTerm);
        }
        // Check if the hash includes the section parameter
        else if (linkvalue.startsWith('section=')) {
            var sectionId = linkvalue.substring('section='.length);
            openContentbasedonhash(sectionId);
        }
    } else {
        // Initialize animations on page load without a specific section
        initializeAnimations();
    }

    // Toggle functionality for the side navbar
    $('#toggleSideNavbarButton').click(function () {
        var sideNavbar = $('.side-navbar');
        var mainContent = $('main');
        var content = $('.content');

        var sideNavbarLeft = parseInt(sideNavbar.css('left'));

        if (sideNavbarLeft === 0) {
            sideNavbar.animate({ left: '-150px' }, 500);
            mainContent.animate({ paddingLeft: '0' }, 500);

        } else {
            sideNavbar.animate({ left: '0' }, 500);
            mainContent.animate({ paddingLeft: '150' }, 500);
        }
    });

    // Click event for the side navbar links
    $('.side-navbar a').click(function () {
        var sectionId = $(this).data('section');
        toggleContentVisibility(sectionId);
    });

    // Function to initialize animations
    function initializeAnimations() {
        var sections = $('main section');

        // Initialize animations for each section
        sections.each(function () {
            var section = $(this);
            if (!section.is('#home')) {
                // Exclude the home section from being initially hidden
                section.addClass('hidden').css({ opacity: 0 });
            }
        });
    }

    // Toggle functionality for the search input
    var searchInputWrapper = $('.search-input-wrapper');
    var searchInput = $('#search-input');
    var searchButton = $('#search-button');

    $('.search-container').mouseleave(function () {
        // Fade out the search input and fade in the button
        searchInputWrapper.animate({ width: '0', opacity: 0 }, 250, function () {
            searchButton.animate({ opacity: 1 }, 250);
        });
    });

    $('.search-container').mouseenter(function () {
        // Fade out the button and fade in the search input
        searchButton.animate({ opacity: 0 }, 250, function () {
            searchInputWrapper.animate({ width: '200px', opacity: 1 }, 250);
        });
    });

    // Enter key press event for the search input
    searchInput.keypress(function (e) {
        if (e.which === 13) {
            // 13 is the key code for the Enter key
            var searchTerm = searchInput.val().toLowerCase();
            performSearch(searchTerm);
        }
    });

    // Function to perform the search
    function performSearch(searchTerm) {
        // Update the URL hash to include the search term
        window.location.hash = 'search=' + encodeURIComponent(searchTerm);

        // Loop through each section and check if it contains the search term
        $('main section').each(function () {
            var section = $(this);
            var sectionContent = section.text().toLowerCase();

            // Check if the section content contains the search term
            if (sectionContent.includes(searchTerm)) {
                // Fade out the current section
                section.stop(true, true).animate({ opacity: 0 }, 500, function () {
                    // After fade out, fade in the target section
                    section.removeClass('hidden').animate({ opacity: 1 }, 500);
                });
            } else {
                // Fade out other sections
                section.stop(true, true).animate({ opacity: 0 }, 500, function () {
                    // After fade out, hide and set opacity to 0
                    section.addClass('hidden').css({ opacity: 0 });
                });
            }
        });
    }

    // Function to toggle visibility of content sections with fade-in and fade-out
    function toggleContentVisibility(sectionId) {
        var sections = $('main section');

        sections.each(function () {
            var section = $(this);
            if (section.attr('id') === sectionId) {
                // Fade out the current section
                section.stop(true, true).animate({ opacity: 0 }, 500, function () {
                    // After fade out, fade in the target section
                    section.removeClass('hidden').animate({ opacity: 1 }, 500);
                });
            } else {
                // Fade out other sections
                section.stop(true, true).animate({ opacity: 0 }, 500, function () {
                    // After fade out, hide and set opacity to 0
                    section.addClass('hidden').css({ opacity: 0 });
                });
            }
        });
    }

    // Function to open the sidebar based on the hash in the URL
    function openContentbasedonhash(sectionId) {
        // Toggle visibility of content sections based on the hash
        toggleContentVisibility(sectionId);
    }
});
