// Class Node {
    
//     Node(x, y, parentX, parentY, child, showOrHide, showInfo)
//     {
//         this.x;
//         this.y;
//         this.parentX;
//         this.parentY;
//         this.child;
//         this.showOrHide;
//         this.showInfo;

//     }

// }

let canv = document.querySelector("canvas");
let cont = canv.getContext("2d");
let root = document.querySelector("html");
const downloadButton = document.querySelector("#downloadButton");
const circSize = 30;
let x = 400, y = 40, h = 700, w = 900;

//draw root node
cont.beginPath();
cont.arc(x, y, 30, 0, 2 * Math.PI);
drawText(root.nodeName,x-20,y, 40)
drawText("+", x - 42, y + 10, 40, "Green");
drawText("-", x - 40, y + 20, 40, "Red");
cont.rect(x - 50, y - 15, 20, 10);
drawText("...", x - 50, y - 10, 40);
cont.stroke();

function draw(parent, parentX, parentY, xStart, xEnd)
{
    //_y is the node Y position
    let _y = parentY + 100;


    let child = parent.children;

    let allowedSpace = (xEnd - xStart)/child.length;

    let tempStart = xStart;
    let tempEnd = xStart + allowedSpace;

        for(let i = 0; i < child.length; i++)
        {
            //to center the node
            let x = (tempStart + tempEnd)/2;

            cont.beginPath();
                drawText(child[i].nodeName, x - 20, _y, 40)

                cont.arc(x, _y, circSize, 0, 2 * Math.PI);

                drawText("+", x - 42, _y + 10, 40, "Green");
                drawText("-", x - 40, _y + 20, 40, "Red");
                cont.rect(x - 50, _y - 15, 20, 10);
                drawText("...", x-50, _y - 10, 40);
                cont.moveTo(parentX, parentY + 30);
                cont.lineTo(x, _y - 30);

            cont.stroke();

            displayTageContent(child[i].childNodes, x, _y);
            



            draw(child[i],x,_y, tempStart, tempEnd);

            tempStart += allowedSpace;
            tempEnd += allowedSpace;
        }
    
}

draw(root, x, y, 0, canv.width);



function displayTageContent(arr, x, y) 
{ 
    for (let i = 0; i < arr.length; i++) 
    {
      if(arr[i].nodeType == Node.TEXT_NODE && arr[i].nodeValue.trim() != "")
      {
        cont.beginPath();
        cont.rect(x - 50, y + 30, 70, 40);
        cont.stroke();
        drawText(arr[i].nodeValue, x - 40, y + 60, 50, "Black", "10px Arial");
      }
    }
  }

  function drawText(text, x, y, maxWidth = "", color = "black", font = "20px Arial")
  {
    cont.font = font;
    cont.fillStyle = color;
    if(maxWidth != "")
    {
        cont.fillText(text, x,y, maxWidth);
        cont.stroke();
    }
    else
    {
        cont.fillText(text, x, y);
        cont.stroke();
    }
    cont.font = "Black";
  }

  downloadButton.addEventListener("click", function()
  {
      //for IE
    if(window.navigator.msSaveBlob)
    {
      window.navigator.msSaveBlob(canvas.msToBlob(), "TreeImage.png");
    }
    else
    {
      const link = document.createElement("a");
      document.body.appendChild(link);
      link.href = canv.toDataURL("image/png");
      link.download = "TreeImage.png";
      link.click();
      document.body.removeChild(link);
    }
  });

  //code from Fai Alotabi:
  //event
function getXY(canvas, event){ //shape 
    const rect = canvas.getBoundingClientRect()
    const y = event.clientY - rect.top //mouse event
    const x = event.clientX - rect.left 
    return {x:x, y:y}
  }
  //end of Fai code. To be used to add functionalities to the drawn buttons.