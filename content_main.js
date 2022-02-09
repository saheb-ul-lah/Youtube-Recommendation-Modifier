if (window.location.href == 'https://www.youtube.com/') {
  //get values
  chrome.storage.sync.get(
      ['enab']
    , function(storage) {
      Parse_categories(storage.enab);
    });

    function Parse_categories(value){
      if (value == undefined){
          categories_send =[];
          // console.log("categories if: ", categories_send);
          scroll(categories_send);
      }
      else{
          categories_send= value;  // value contains categories to be removed
          // console.log("categories else: ", categories_send);
          scroll(categories_send);
      }
    } 


  chrome.runtime.onMessage.addListener(gotMessage);   // submit button received message

  function gotMessage(message, sender, sendResponse){
    categories = ['Edu', 'Sci', 'Ent','Fil','Mus' ,'Spo' ,'Tra' ,'Gam' ,'Peo' ,'Com' ,'Aut' ,'Pet' ,'New' ,'How' ,'Non'];
    categories_set = [];
    for(var j=0; j<15;j++){
      if (message[j] == false){
        categories_set.push(categories[j]);
      }
    }
    //set valuies
    chrome.storage.sync.set({
      enab: categories_set
    },
    function() {
      //toggleEnabledUI(enabl);
      if (callback) callback(enab);
    }
    );

    location.reload();    // page reload
  }


  function scroll(categories_received){
    // console.log("categories scroll: ", categories_received);

    var myVar = setInterval(myTimer, 1000);
    let epochs = 0;

    function myStopFunction() {
      clearInterval(myVar);
      window.scrollTo(0,0);
      modify_page(categories_received);
    }

    function myTimer(){
          window.scrollTo(0,10000);
          epochs = epochs + 1;
          if (epochs == 3)
          {
              myStopFunction();
          }
    }
  }


  function modify_page(categories_final){
    // k=0;
    for (let i =0;i < document.getElementById('contents').childNodes.length ; i=i+1) {
      try{
      link = document.getElementById('contents').childNodes[i].getElementsByClassName('yt-simple-endpoint')[2].href;
      if (!link.includes("watch")){
        document.getElementById('contents').childNodes[i].style.display = 'none';
        console.log("working")
      }
      else{
        fetch(link)
        .then((response) => response.text())
        .then((text) =>{
          // console.log("-----------------------------------------");
          let cat = (text.substring( text.search('"category"')+12 , text.search('"category"') +15));
          // console.log('category of video is ', (text.substring( text.search('"category"')+12 , text.search('"category"') +30)));
          // console.log("categories modify_page: ", categories_final);
          if( categories_final.includes(cat)){
            // console.log('category of removed video is ', (text.substring( text.search('"category"')+12 , text.search('"category"') +30)));
            document.getElementById('contents').childNodes[i].style.display = 'none';
            // console.log(k = k+1);
          }
        }
        )    
      }
    }
    catch{
      //console.log(document.getElementById('contents').childNodes[i], "some error", i);
      document.getElementById('contents').childNodes[i].style.display = 'none';

    }
  }
  }
}
