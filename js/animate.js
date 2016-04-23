window.onload = function(e){ 

    var canvas = document.getElementById('aniCanvas');
    var ctx = canvas.getContext('2d');
    ctx.font="18px Arial";    
    



    var idNR = true;
    var nrFrames, start,counter, erased;
    var dataBig, Ffactor;

    function init() 
    {
        
        if(idNR)
        {
            //console.log(dataBig0);
            dataBig = JSON.parse(dataBig0);
            //console.log(dataBig);
            ctx.fillStyle = "red";
            ctx.fillText("Diving",10,20);
        }
        else
        {
            dataBig= JSON.parse(dataBig1);
            ctx.fillStyle = "red";
            ctx.fillText("Swing-Bench",10,20);
        }

        Ffactor = dataBig[0];
        //dataBig = Array.prototype.slice.call( dataBig[1] );  
        dataBig = dataBig[1];  
            
        nrFrames = Object.keys(dataBig).length;
        //console.log(dataBig)
        //console.log(nrFrames);

        start = +new Date(); // get unix-timestamp in milliseconds        

        counter = 1;
        erased = 0;

        //ctx.fillStyle = "black";
        //ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.globalAlpha = 10.0/255.0;
        ctx.strokeStyle = "blue";

        
    }

    function doAnimation(timestamp) 
    {

        var totRow = 0

        for(tID= Math.max(counter-14,0); tID < counter; tID++)
        {
            if(tID < nrFrames)
            {
                //console.log(tID)
                //console.log(dataBig);
                var data = dataBig[ tID ];

                nrRow = data.length;
                totRow += nrRow;

                //console.log(nrRow)
                offSet = 1 + counter - tID;
                //console.log(counter, tID, nrRow, offSet)            
                for(i=0; i<nrRow;i++)
                {
                    fNr = data[i][0];
                    //console.log(fNr);
                    ctx.beginPath()                    
                    ctx.moveTo((fNr+offSet-1) * Ffactor, data[i][offSet-1]) ;
                    ctx.lineTo((fNr+offSet) * Ffactor, data[i][offSet]); 
                    ctx.closePath();
                    ctx.stroke();            
                }
            }
        }
        

        //console.log('p', progress);
        //console.log("c", counter);
      // Do animation ...
        counter++;
        if (counter < nrFrames+14) 
        //if (counter < nrFrames) 
        {
            if (erased == 0)
                timeOutVal = 50;
            else
                timeOutVal = 10;

            if(totRow <10)
            {
                //console.log(totRow);
                timeOutVal = 0;
            }                

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
                ctx.globalAlpha = 1.0;
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