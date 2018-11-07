function DOMtoString(document_root) {
    var html = '',
        node = document_root.firstChild;
    while (node) {
        switch (node.nodeType) {
        case Node.ELEMENT_NODE:
            html += node.outerHTML;
            break;
        case Node.TEXT_NODE:
            html += node.nodeValue;
            break;
        case Node.CDATA_SECTION_NODE:
            html += '<![CDATA[' + node.nodeValue + ']]>';
            break;
        case Node.COMMENT_NODE:
            html += '<!--' + node.nodeValue + '-->';
            break;
        case Node.DOCUMENT_TYPE_NODE:
            // (X)HTML documents are identified by public identifiers
            html += "<!DOCTYPE " + node.name + (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '') + (!node.publicId && node.systemId ? ' SYSTEM' : '') + (node.systemId ? ' "' + node.systemId + '"' : '') + '>\n';
            break;
        }
        node = node.nextSibling;
    }


    length=html.length;
    newhtml="";
 
   var start=html.indexOf("<body");
   start+=5;
   console.log(start);

   var realhtml=html.slice(start,length);
   var reallength=realhtml.length;  



   for (var i=0;i<reallength;i++){
        if(realhtml[i]==">"){
            var secondhtml='';
            secondhtml+=realhtml.slice(i+1,reallength);
            var end=secondhtml.indexOf("<");
             var text='';
             text+=secondhtml.slice(0,end);
             console.log(text);
                newhtml+=text;


        }

    } 

    return newhtml;
    console.log(newhtml);

}

chrome.runtime.sendMessage({
    action: "getSource",
    source: DOMtoString(document)
});