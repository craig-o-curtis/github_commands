/* myscripts.js */

$(document).ready(function(){
	var $sidebarCheckbox = $('.sidebar_checkbox');
	var $mainButtons = $('.mainButtons');
	var $sideBarButton = $('.mainButton');
	var $sideBar = $('#sidebar');
	var $mainContent = $('.main-content');
	var $refreshSpinner = $('.fa-refresh');
	/* to locate sidebar_checkbox */
	var $buttonContainer = $('.button-container');
	/* collapse modules w/o bootstrap */
	var $collapseModules = $('#collapseModules');
	var $card = $('.card'); /* array */
	var $toggleNav = $('.toggle-nav');
	/* next button */
	var $nextButton = $('.nextCard');
	/* progbar init */
	var $progbar = $('#progbar');
	var $progTotal = ($card.length);
	var $newProgValue;
	$progbar.attr('max', $progTotal);
	/* sweet entry */
	var $jumbo = $('.jumbotron');
	var $nav = $('.navbar');
	/* sweet action buttons! bottom of page */
	var $actionButtons = $('.action-buttons');
	var $actionDesktop = $actionButtons.find('#actionDesktop');
	var $actionNext = $actionButtons.find('#actionNext');
	/* reset button */
	var $reset = $('.reset-button');
	/* page load */
	$actionButtons.slideUp();
	$card.slideUp();
	$jumbo.slideUp(10);
	$nav.slideUp(10);
	$jumbo.slideDown(1000);
	$nav.slideDown(1100);
	/* sweet entry over */
	$sideBar.hide();
	$toggleNav.hide();
	$collapseModules.hide();

	/* actionDesktop function */
	var actionDesktopUpdate = function(){
		/* sets target dymagically, tons of traversing I know..*/
		var $thisTarget = $buttonContainer.find('.btn-primary');
		var $targetString = $thisTarget.attr('href');
		var $targetCard = $('#collapseModules').find($targetString);
		$targetCard = $targetCard.find('.card-img-top'); // finds that image
		var $targetModal = $targetCard.attr('data-target');
		$actionDesktop.attr('data-target', $targetModal);
		// BUG - doesn't update back to btn-primary when done //
	}

	$sideBarButton.on('click', function(){
		if ( $('#sidebar').css('display') === "none" ) {
			$sideBar.delay(400).show(1000);
		} else {
			$sideBar.hide(250);
		}
		$actionButtons.slideDown(1200);
		$toggleNav.show(1200);
		$collapseModules.fadeIn(1000);
		if ($mainContent.hasClass('col-lg-12')) {
			$mainContent.removeClass('col-lg-12')
		} else {
			$mainContent.addClass('col-lg-12')
		}
		/* show first lesson */
		$('#card1').slideDown(1500);
		
		/* automatically update $actionDesktop's target */
		actionDesktopUpdate();
	});

	/* initialize progbar max and value */
	$progbar.attr('max', $progTotal);
	$sidebarCheckbox.slideUp();
	$sidebarCheckbox.first().slideDown();

	/* update actionNext href function */
	var $updateNextHref = function(){
		/* find button-container a with btn-primary */
		// stick in actionNext
		var $newHref = $buttonContainer.find('.btn-primary').next().attr('href');
		$actionNext.attr('href', $newHref);
		console.log($newHref);
		console.log(parseInt($newHref));
		// if at maximum, set to 1
		if ($buttonContainer.find('.btn-primary').index() >= $sidebarCheckbox.length ) {
			console.log($buttonContainer.find('.btn-primary').index());
			$actionNext.attr('href', '#card1');
		}
			
	}

	var $sideBarClick = function(){
		/* slideDown */
		var $self;
		if ($(this).hasClass('sidebar_checkbox')) { // sidebar
			$self = $(this);
		} else if ( $(this).hasClass('nextCard')) { // next button
			$self = $(this).closest($card).next($card).attr('id');
			$self = "#" + $self;
			var $findSelf = $buttonContainer.find('a[href="'+$self+'"]');
			$self = $findSelf;
			console.log($self.index());
			/* stying to first git-guy */
			if ($self.index() === 1) {
				$buttonContainer.find('a[href="#card1"]').find('.fa-github-alt').removeClass('opaque');
			}
		} else if ( $(this).hasClass('actionNext') ) {
			/* update a tag inside this button */
			var $thisSidebarButton = $buttonContainer.find('.btn-primary');
			$thisSidebarButton.find('.fa-github-alt').removeClass('opaque');
			if ( parseInt($(this).closest('a').attr('href')) >= $card.length ){
				/* resets to first */
				$(this).closest('a').attr('href', '#card1');
			}
			/* target sidebar, click that */
			$self = $buttonContainer.find('.btn-primary').next();
		}
		// update Next
		$updateNextHref();
		// var $targetCard = $(this).attr('href'); change down
		var $targetCard = $self.attr('href');
		/* update actionNext here */
		$targetCard = $($targetCard);
		$targetCard.slideDown();
		/* shows gitguy */
		// var $gitGuy = $(this).find('.fa-github-alt'); change
		var $gitGuy = $self.find('.fa-github-alt');
		$gitGuy.removeClass('opaque');
		/* focus stying */
		$sidebarCheckbox.each(function(){
			// $(this).removeClass('btn-primary'); change
			$(this).removeClass('btn-primary');
		});
		// $(this).addClass('btn-primary'); change
		$self.addClass('btn-primary');
		/* shows next & prev limiting 5 */
		// var $checkIndex = $(this).index(); change
		var $checkIndex = $self.index();
		console.log('$checkIndex ' + $checkIndex);
		$sidebarCheckbox.each(function(){
			if ( $(this).index() < $checkIndex-2 || $(this).index() > $checkIndex+2) {
				$(this).slideUp();
			} else {
				$(this).slideDown();
			}
		actionDesktopUpdate();
		});

		$('.row-offcanvas-right').removeClass('active');
		/* progress bar styling */
		var $progbarVal = $progbar.val();
		if ( !$self.hasClass('progbarAdded') ){
			$newProgValue = ($progbarVal + 1);
			$newValue = ($progbarVal + 1);
		} 
		$self.addClass('progbarAdded');
		$progbar.val($newValue);
		if ($progbarVal >= $progTotal) {
			$progbarVal = 0;
		}
	};

	$sidebarCheckbox.on('click', $sideBarClick);
	$nextButton.on('click', $sideBarClick);
	$actionNext.on('click', $sideBarClick);

	/* on page load create modal src strings */
	var $setImage = $('.modal-image');
	var $imageSrc = "";
	var stringIndex = 0;
	var endString = 0;
	var newString = "";
	$setImage.each(function(){
		// error not fetching images...
		var $cardImage = $(this).closest('.card').find('.card-img-top');
		$imageSrc = $cardImage.css('background-image');
		stringIndex = $imageSrc.lastIndexOf('/');
		var endString = $imageSrc.length - 2;
		newString = $imageSrc.slice((stringIndex+1),endString);
		$(this).attr('src', 'img/modals/' + newString);
	});

	/* mouseover spinner */
	$refreshSpinner.mouseover(function(){
		$(this).addClass('fa-spin');
	}).mouseleave(function(){
		$(this).removeClass('fa-spin');
	});

	/* progress reset */
	$reset.on('click',function(){
		$progbar.val(0);
		$sidebarCheckbox.each(function(){
			$(this).removeClass('progbarAdded');
			$(this).find('.fa-github-alt').addClass('opaque');	
			$(this).slideUp();
		});
		$sidebarCheckbox.first().addClass('btn-primary');
		$card.slideUp();
		$sidebarCheckbox.first().slideDown();
		$actionButtons.slideUp();
	});

});