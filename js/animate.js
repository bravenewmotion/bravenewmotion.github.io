window.onload = function(e){ 

    var canvas = document.getElementById('aniCanvas');
    var ctx = canvas.getContext('2d');
    var actionID = 0;
    ctx.font="18px Arial";    
    ctx.lineWidth=2;    

    var nrFrames, start,counter, erased;
    var dataBig, Ffactor;
    //console.log('id2path', id2path)

    function init(json) 
    {

        dataBig = json;        

        /*
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
        */

        ctx.fillStyle = "red";

        var actionName = id2path[actionID]
        var i = actionName.indexOf("/data/") + "/data/".length; 
        var j = actionName.indexOf("/IDT.json");

        var txt = actionName.substring(i,j) ; 
        ctx.fillText('Playing now: ' + txt,10,415);

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
        
        ctx.globalAlpha = 5.0/255.0;
        ctx.strokeStyle = "white";

        // Start animation
        requestAnimationFrame(doAnimation);

        
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
                erased = 0;
                doRandomFile();
                //setTimeout(function(){requestAnimationFrame(doAnimation)}, 10);
                //requestAnimationFrame(doAnimation)
                
            }    
            
        
        }
      
    }



//    $.getJSON("http://bravenewmotion.github.io/sportsFeat/Riding-Horse/005/IDT.json", 'test', function(json) {
//        console.log('loaded')
//        console.log(json); // this will show the info it in firebug console
//    });            

    function doRandomFile()
    {
        var len = 150;
        //console.log(len)
        actionID = Math.floor(Math.random() * len);
        //actionID = 5;
        var idtURL = "http://bravenewmotion.github.io/" + id2path[actionID];
        //console.log(idtURL)
        //$.getJSON("http://bravenewmotion.github.io/sportsFeat/Riding-Horse/005/IDT.json", 'test', init );
        $.getJSON(idtURL, 'test', init );
    }
    
    doRandomFile();

};
