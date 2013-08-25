function Minimize() 
	{
	
		if (typeof Minimize.counter == 'undefined')
		{
        	Minimize.counter = 0; 
    }
        elem = document.getElementById('PopUpSearch');
        elem1 = document.getElementById('MaxMin');
        if (Minimize.counter == 0)
        {
        	elem.style.height = '50px';
       		elem1.title = 'Maximize';
       		elem1.src = 'externals/img/maximize2.png';
          	Minimize.counter = 1;
          } 
        else if (Minimize.counter == 1)
        {
        	Minimize.counter = 0;
       	elem.style.height = '500px';
       		elem1.title = 'Minimize';
      		elem1.src = 'externals/img/minimize2.png';
          }
	}

