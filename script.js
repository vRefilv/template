$(document).ready(function () {
    // Check the hash in the URL on page load
    var initialHash = window.location.hash;
    if (initialHash) {
        // Remove the '#' character
        var sectionId = initialHash.substring(1);
        // Open the sidebar based on the hash
        openContentbasedonhash(sectionId);
    } else {
        // Initialize animations on page load without specific section
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
});

// Function to initialize animations
function initializeAnimations() {
    var sections = $('main section');

    // Initialize animations for each section
    sections.each(function () {
        var section = $(this);
        if (!section.is('#home')) {
            // Exclude home section from being initially hidden
            section.addClass('hidden').css({ opacity: 0 });
        }
    });
}

// Function to toggle visibility of content sections with fade-in and fade-out
function toggleContentVisibility(sectionId) {
    var sections = $('main section');

    sections.each(function () {
        var section = $(this);
        if (section.attr('id') === sectionId) {
            // Fade out current section
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
