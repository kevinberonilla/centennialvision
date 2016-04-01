var page = $('html, body');

$(document).ready(function() {
    /* ----------------------------------------
    Page Load Functions
    ---------------------------------------- */
    $(window).load(function() {
        $('body').addClass('loaded');
    });
    
//    /* ----------------------------------------
//    Full Screen Height Functions
//    ---------------------------------------- */
//    var fullScreenHeight = $('.full-screen-height'),
//        doubleScreenHeight = $('.double-screen-height'),
//        firstSection = $('#home + section'),
//        windowWidth = $(window).width(),
//        windowHeight = $(window).height();
//    
//    function recalculateFullScreenHeight(multiplier) {
//        var newWindowWidth = $(window).width();
//        
//        if (windowWidth != newWindowWidth) {
//            windowWidth = newWindowWidth;
//            
//            windowHeight = $(window).height();
//            
//            fullScreenHeight.css('min-height', windowHeight + 'px');
//            doubleScreenHeight.css('min-height', (windowHeight * 2) + 'px');
//            firstSection.css('margin-top', windowHeight + 'px');
//        }
//    }
//    
//    fullScreenHeight.css('min-height', windowHeight + 'px');
//    doubleScreenHeight.css('min-height', (windowHeight * 2) + 'px');
//    firstSection.css('margin-top', windowHeight + 'px');
//    $(window).resize(recalculateFullScreenHeight);
    
    /* ----------------------------------------
    Full Parent Height Functions
    ---------------------------------------- */
    var fullParentHeight = $('.full-parent-height');
    
    function calculateFullParentHeight() {
        var windowHeight = $(window).height();
        
        fullParentHeight.css('height', windowHeight + 'px');
    }
    
    calculateFullParentHeight();
    $(window).resize(calculateFullParentHeight);
    
    /* ----------------------------------------
    Video Background Functions
    ---------------------------------------- */    
    var videoBackground = $('.video-background'),
        isMobile,
        scrollPos,
        adjustedPos,
        videoOffset,
        windowHeight;
    
    if (matchMedia('only screen and (max-width: 768px)').matches) { // Don't load the video for tablet portrait and smaller
        videoBackground.remove();
        isMobile = true;
    }
    
    function setCenter() {
        videoBackground.each(function() {
            var pageWidth = page.width(),
                pageHeight = page.height(),
                videoBackgroundWidth = $(this).width(),
                videoBackgroundHeight = $(this).height(),
                newPosX = (pageWidth / 2) - (videoBackgroundWidth / 2) + 'px',
                newPosY = (pageHeight / 2) - (videoBackgroundHeight / 2) + 'px';
            
            $(this).css({
                'left': newPosX,
                'top': newPosY
            });
        });
    }
    
    function playVideo() {
        videoBackground.each(function() {
            $(this).get(0).play();
        });
    }
    
    $(window).resize(setCenter);
    $(window).load(setCenter);
    
    if (!isMobile && videoBackground.length > 0) {
        $(window).load(playVideo);
    }
    
    /* ----------------------------------------
    Nav Functions
    ---------------------------------------- */
    var navEntry = $('nav > ul > li'),
        navLink = $('a', navEntry),
        linkCount = navEntry.length,
        openNavButton = $('#open-nav-button'),
        closeNavButton = $('#close-nav-button');
    
    function calculatenavEntryHeight() {
        var currentWindowHeight = $(window).height(),
            linkHeight = (currentWindowHeight / linkCount) - 1;
        
        navEntry.css('height', linkHeight + 'px');
    }
    
    function openNav() {
        $('body').addClass('nav-open')
            .addClass('disable-scroll');
        
        navEntry.each(function() {
            var self = this,
                index = $(self).index();
            
            setTimeout(function() {
                $(self).addClass('show');
            }, (index + 1) * 75);
        });
    }
    
    function closeNav() {
        $('body').removeClass('nav-open')
            .removeClass('disable-scroll');
        
        navEntry.removeClass('show');
    }
    
    navLink.click(function(e) {
        e.preventDefault();
        
        var href = $(this).attr('href'),
            targetPos = $(href).offset().top;
        
        closeNav();
        
        setTimeout(function() {
            page.animate({
                scrollTop: targetPos
            }, 1250);
        }, 250)
    });
    
//    page.on('scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove', function() { // Prevent scroll hijacking
//        page.stop();
//    });
    
    calculatenavEntryHeight();
    $(window).resize(calculatenavEntryHeight);
    openNavButton.click(openNav);
    closeNavButton.click(closeNav);
    
    /* ----------------------------------------
    One Page Scroll Functions
    ---------------------------------------- */
    var underlay = $('#underlay'),
        overlay = $('#overlay'),
        homeVideo = $('#home-video'),
        backgroundVideo = $('#background-video'),
        title = $('#home #title'),
        horizontalLogo = $('.logo-container.horizontal');
    
    function processBeforeMove() {
        var activeSection = $('section.active');
        
        if (activeSection.is('#home')) {
            homeVideo.stop()
                .fadeIn(1000);
            
            title.stop()
                .fadeIn(1000);
            
            horizontalLogo.removeClass('show');
        } else {
            homeVideo.stop()
                .fadeOut(1000);
            
            title.stop()
                .fadeOut(1000);
        }
        
        if (activeSection.hasClass('has-overlay')) {
            overlay.stop()
                .fadeIn(1000);
            
            horizontalLogo.removeClass('show');
        } else {
            overlay.stop()
                .fadeOut(1000);
        }
        
        if (activeSection.hasClass('has-underlay')) {
            var underlayBackground = activeSection.data('underlay-background');
            
            underlay.css('background-image', 'url(' + underlayBackground + ')')
                .stop()
                .fadeIn(1000);
            
            horizontalLogo.removeClass('show');
        } else {
            underlay.stop()
                .fadeOut(1000);
        }
        
        if (!activeSection.is('#home') && !activeSection.hasClass('has-overlay') && !activeSection.hasClass('has-underlay')) {
            horizontalLogo.addClass('show');
        }
    }
    
    $('#main').onepage_scroll({
        sectionContainer: 'section',
        easing: 'ease',
        animationTime: 1000,
        keyboard: true,
        direction: 'vertical',
        pagination: false,
        loop: false,
        beforeMove: processBeforeMove,
        afterMove: function() { console.log('afterMove'); }
    });
    
//    /* ----------------------------------------
//    Home Scroll Functions
//    ---------------------------------------- */
//    var home = $('#home'),
//        homeHeight = home.height();
//    
//    function adjustOpacity() {
//        var scrollPos = $(window).scrollTop();
//        
//        if (scrollPos <= windowHeight) {
//            home.css('opacity', ((homeHeight - scrollPos) / 1000));
//        } else {
//            home.css('opacity', 0);
//        }
//    }
//    
//    /* ----------------------------------------
//    Section Scroll Functions
//    ---------------------------------------- */
//    var section = $('section');
//    
//    function revealIntroBg() {
//        var scrollPos = $(window).scrollTop();
//        section.each(function() {
//            var self = $(this),
//                intro = $('.intro', self),
//                overlay = $('.overlay', intro),
//                underlay = $('.underlay', intro),
//                introheight = intro.height(),
//                thisHeight = self.height(),
//                overlayHeight = overlay.height(),
//                offsetTop = self.offset().top,
//                offsetBottom = offsetTop + overlayHeight,
//                overlayHeight = overlay.height();
//            
//            if (offsetTop <= scrollPos && (overlayHeight * 2) >= scrollPos) {
////                underlay.css('opacity', ((offsetTop + (overlayHeight * 2)) - scrollPos) / 1000); // THIS USED TO WORK
////                overlay.css('opacity', ((offsetTop + overlayHeight) - scrollPos) / 1000);
//                overlay.css('opacity', (offsetTop + overlayHeight) / (scrollPos + overlayHeight));
//            } else {
//                underlay.css('opacity', 1);
//                overlay.css('opacity', 1);
//            }
//        });
//    }
//    
//    /* ----------------------------------------
//    requestAnimationFrame Functions
//    ---------------------------------------- */
//    function animate() {
//        adjustOpacity();
//        revealIntroBg();
//    }
//    
//    animate();
//        
//    $(window).scroll(function() {
//        requestAnimationFrame(animate);
//    });
});