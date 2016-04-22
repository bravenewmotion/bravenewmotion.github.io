window.onload = function(e){ 

    var canvas = document.getElementById('aniCanvas');
    var ctx = canvas.getContext('2d');
    
	//var fgColor = "#ffffff";
	//var bgColor = "#000000";
	//document.body.style.backgroundColor = bgColor;
    //document.body.style.color = fgColor;


    var idNR = true;
    var nrFrames, start,counter, erased;
    

    function init() 
    {
        
        if(idNR)
            dataBig= JSON.parse(dataBig0);
        else
            dataBig= JSON.parse(dataBig1);
            
        nrFrames = Object.keys(dataBig).length;
        console.log(nrFrames);

        start = +new Date(); // get unix-timestamp in milliseconds        

        counter = 1;
        erased = 0;

        //ctx.fillStyle = "black";
        //ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.globalAlpha = 20.0/255.0;
        ctx.strokeStyle = "blue";
        
    }

    function doAnimation(timestamp) 
    {

        for(tID= Math.max(counter-14,0); tID < counter; tID++)
        {
            if(tID < nrFrames)
            {
                data = dataBig[ tID ];
                nrRow = data.length;

                
                offSet = 1 + counter - tID;
                //console.log(counter, tID, nrRow, offSet)            
                for(i=0; i<nrRow;i++)
                {
                    fNr = data[i][0];
                    //console.log(fNr);
                    ctx.beginPath()                    
                    ctx.moveTo((fNr+offSet-1) * 14, data[i][offSet-1]) ;
                    ctx.lineTo((fNr+offSet) * 14, data[i][offSet]); 
                    ctx.closePath();
                    ctx.stroke();            
                }
            }
        }
        

        //console.log('p', progress);
        //console.log("c", counter);
      // Do animation ...
        counter++;
        //if (counter < nrFrames+14) 
        if (counter < nrFrames) 
        {
            if (erased == 0)
                timeOutVal = 50;
            else
                timeOutVal = 10;
            setTimeout(function(){requestAnimationFrame(doAnimation)}, timeOutVal);
          
        }
        else
        {
            console.log('stop counter')
            end = +new Date(); // get unix-timestamp in milliseconds
            var diff = end - start; // time difference in milliseconds
            console.log(diff/1000)
            
            ctx.strokeStyle = "black";
            ctx.globalAlpha = 0.3;
            counter = 1;
            if (erased==0)
            {
                //setTimeout(function(){requestAnimationFrame(doAnimation)}, 10);
                requestAnimationFrame(doAnimation)
                erased = 1;
            }
            else
            {
            
                ctx.fillStyle = "black";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                //ctx.clearRect(0, 0, canvas.width, canvas.height);
                idNR = ! idNR
                init();
                //setTimeout(function(){requestAnimationFrame(doAnimation)}, 10);
                requestAnimationFrame(doAnimation)
                erased = 0;
            }    
            
        
        }
      
    }

    init();
    // Start animation
    requestAnimationFrame(doAnimation);

};