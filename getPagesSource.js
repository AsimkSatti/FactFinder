function DOMtoString(document_root) {
    var html = '',
        node = document_root.firstChild;
    while (node) {
        switch (node.nodeType) {
        case Node.ELEMENT_NODE:
            html += node.innerText;
            break;
        }
        node = node.nextSibling;
    }
        var percent="";
        var count=0
    //return newhtml
//console.log(newhtml);
    for(var char=0;char<html.length;char++){
         
        //    Dollars / Percent / Years (4 Digit Numbers) // 
        
        if(html[char]=="%" ||(html[char]=="$")||(html[char]==" " && html.charCodeAt(char+1)<10 &&
            html.charCodeAt(char+2)<10  && html.charCodeAt(char+3)<10 && html.charCodeAt(char+4)<10 &&
             html.charCodeAt(char+5)==32   )){
            count+=1
            var perc=html.slice(char-95,char+90);
            for (var elem=0;elem<perc.length;elem++){
                if(perc[elem]=="%"){
                    char+=20;
                }
               
        
        }
         percent=percent+"\n"+count+")"+"\n"+"...  "+perc+"  ..."+"\n\n";
        
    }
        // Hundred/ thousand million billion
        if (html[char]==" " && html[char+1]=="h" && html[char+2]=="u" && html[char+3]=="n" && html[char+4]=="d"    ){
            count+=1
            var perc=html.slice(char-95,char+90);
            for (var elem=0;elem<perc.length;elem++){
                if(perc[elem]=="%"){
                    char+=20;
                }

        }
             
             percent=percent+"\n"+count+")"+"\n"+"...  "+perc+"  ..."+"\n\n";

     
 }
           
   }

 return percent;
}

chrome.runtime.sendMessage({
    action: "getSource",
    source: DOMtoString(document)
});