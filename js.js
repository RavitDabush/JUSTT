jQuery(document).ready(function(){
    $("html, body").animate({
        scrollTop: $("#product-navbar").offset().top
    }, 20);
    jQuery("body").addClass("no-scroll");
    
});

jQuery(document).ready(function(){
    
    setTimeout(function() { 
        jQuery(".h1-stage-01").animate({width: '150px', opacity: '0', display: 'none'}, 800);
        //jQuery(".h1-stage-01").addClass('animate');
    }, 5000);
    setTimeout(function() { 
        //jQuery(".h1-stage-02").fadeIn(1000);
        jQuery(".h1-stage-02").addClass('animate');
        jQuery(".js-wrapper").addClass("bg-blur");
    }, 5500);
    setTimeout(function() { 
        jQuery("body").removeClass("no-scroll");
    }, 6000);
    
});

jQuery(document).on('click','a[href*="#"]',function(t){if(jQuery(t.target).closest('.wc-tabs').length>0){return}if(jQuery(this).is('[href="#"]')||jQuery(this).is('[href="#0"]')||jQuery(this).is('[href*="replytocom"]')){return};if(location.pathname.replace(/^\//,"")==this.pathname.replace(/^\//,"")&&location.hostname==this.hostname){var e=jQuery(this.hash);(e=e.length?e:jQuery("[name="+this.hash.slice(1)+"]")).length&&(t.preventDefault(),jQuery("html, body").animate({scrollTop:e.offset().top-0},1000))}});

const ToggleMobileIcons = (link) =>
{
    console.log("toggling mobile icons");

    if (link.isActive === 1)
    {
        link.querySelector(".hamburger").style.display = "none";
        link.querySelector(".close").style.display = "block";
    }
    
    else
    {
        link.querySelector(".hamburger").style.display = "block";
        link.querySelector(".close").style.display = "none";
    }
};


const AddHeaderLinkAction = (link) =>
{
	link.isActive = 0;
	
	link.addEventListener
	(
		"click",
		(evt) =>
		{
			evt.preventDefault();
			//evt.stopPropagation();
			let lm = link.dataset["justtHeaderMenu"];
			
			console.log("header menu value: " + link.dataset["justtHeaderMenu"]);

			let menus = document.querySelectorAll(".justt-header-menu");
			
			for (let i = 0; i < menus.length; i++)
			{
				let m = menus[i].dataset["justtHeaderMenu"];
				
				console.log("is active? " + link.isActive);
				
				if (link.isActive === 0 && m === lm)
				{
					console.log("setting menu to block");
					menus[i].style.display = "block";
				}
				
				else
				{
					menus[i].style.display = "none";
				}
			}
			
			link.isActive = link.isActive === 1 ? 0 : 1;

            if (link.id === "justt-mobile-menu-trigger")
            {
                ToggleMobileIcons(link);
            }
			
			for (let i = 0; i < headerLinks.length; i++)
			{
				if (headerLinks[i] !== link)
				{
					headerLinks[i].isActive = 0;
				}
			}
		}
	);
};

const headerMenus = document.querySelectorAll(".justt-header-menu");

for (let i = 0; i < headerMenus.length; i++)
{
	//headerMenus[i].style.display = "none";
}

const headerLinks = document.querySelectorAll(".justt-header-link");

for (let i = 0; i < headerLinks.length; i++)
{
	headerLinks.isActive = 0;
	console.log(i + ": " + headerLinks[i]);
	AddHeaderLinkAction(headerLinks[i]);
}


const AddMobileMenuLinkToggle = (topLevelLink, mobileMenuGroup) =>
{
	topLevelLink.isActive = 0;
	
	topLevelLink.addEventListener
	(
		"click",
		(evt) =>
		{
			evt.preventDefault();
			
			let displayValue = topLevelLink.isActive === 1 ? "none" : "block";
			let mobileLinks = mobileMenuGroup.querySelectorAll("a");
			
			let open = mobileMenuGroup.querySelector(".open");
			let closed = mobileMenuGroup.querySelector(".closed");
			
			if (topLevelLink.isActive === 1)
			{
				open.style.display = "none";
				closed.style.display = "block";
			}
			
			else
			{
				open.style.display = "block";
				closed.style.display = "none";
			}

			for (let i = 1; i < mobileLinks.length; i++)
			{
				mobileLinks[i].style.display = displayValue;
			}
			
			topLevelLink.isActive = topLevelLink.isActive === 1 ? 0 : 1;
		}
	);
};


const mobileMenu = document.querySelector("#justt-mobile-menu");
const mobileMenuGroups = document.querySelectorAll("#justt-mobile-menu .justt-mobile-menu-group");

for (let i = 0; i < mobileMenuGroups.length; i++)
{
	let mobileLinks = mobileMenuGroups[i].querySelectorAll("a");
	
	for (let j = 0; j < mobileLinks.length; j++)
	{
		console.log("in group " + i + " and on link " + j);
		
		if (j === 0)
		{
			if (mobileLinks[j].parentNode.querySelector(".open"))
			{
				mobileLinks[j].addEventListener("click", (evt) => { evt.preventDefault(); });
				AddMobileMenuLinkToggle(mobileLinks[j].parentNode, mobileMenuGroups[i]);
			}
			
			continue;
		}

		mobileLinks[j].style.display = "none";
	}
}

document.addEventListener
(
	"click",
	(evt) =>
	{
        console.log(evt.target);

		for (let i = 0; i < headerMenus.length; i++)
		{
			if (headerMenus[i].contains(evt.target) === false)
			{
                let isHeaderLink = false;

                for (let j = 0; j < headerLinks.length; j++)
                {
                    if (headerLinks[j].contains(evt.target))
                    {
                        isHeaderLink = true;
                        break;
                    }
                }

                if (isHeaderLink === false)
                {
                    headerMenus[i].style.display = "none";
                    
                    for (let j = 0; j < headerLinks.length; j++)
                    {
                        headerLinks[j].isActive = 0;
                    }

                    document.querySelector(".justt-header-link .hamburger").style.display = "block";
                    document.querySelector(".justt-header-link .close").style.display = "none";
                }
			}
		}
	}
);