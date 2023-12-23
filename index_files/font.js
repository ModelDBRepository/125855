/*
--- Written 03/24/2009 A.Burr
----------------------------------------------------------------------------------------------------
--- Source: http://www.white-hat-web-design.co.uk/articles/js-fontsize.php
----------------------------------------------------------------------------------------------------
*/

function resizeFont(whichSize) {

	var p = document.getElementById('content').getElementsByTagName('p');
	var li = document.getElementById('content').getElementsByTagName('li');
	
	if (whichSize == '+') 
	{ 
		changeFontSize(p, whichSize, 12, 14); 
		changeFontSize(li, whichSize, 12, 14); 
	}
	else if (whichSize == '-') 
	{ 
		changeFontSize(p, whichSize, 12, 10); 
		changeFontSize(li, whichSize, 12, 10); 
	}
	else 
	{ 
		resetFontSize(p, 12); 
		resetFontSize(li, 12); 
	}
}


function resetFontSize(elementArray, defaultSize) {
	for (i=0; i<elementArray.length; i++) 
	{
		elementArray[i].style.fontSize = defaultSize +"px";
	}
}

function changeFontSize(elementArray, whichSize, defaultSize, sizeLimit) 
{
	for (i=0; i<elementArray.length; i++) 
	{		
		if (elementArray[i].style.fontSize) 
			{ var s = parseInt(elementArray[i].style.fontSize.replace("px","")); } 
		else 
			{ var s = defaultSize; } 
		if (s != sizeLimit) 
		{ 
			if (whichSize == '+') { s += 1; }
			if (whichSize == '-') { s -= 1; }
		}
		elementArray[i].style.fontSize = s+"px";
	}
}