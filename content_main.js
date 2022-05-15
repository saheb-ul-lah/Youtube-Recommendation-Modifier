function store_data(request)
{
  chrome.storage.sync.set({'data': JSON.stringify(request)}, function() {
    console.log('Settings saved');
  });
}

 chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    store_data(request)
    sendResponse({farewell: "received"});
    location.reload()
  }
);

let categories= {};
// Read it using the storage API
chrome.storage.sync.get(['data'], function(items) {
  try
  {
    categories =  JSON.parse(items.data);
  }
  catch
  {
    categories = {'data' : 15}    // Used at inital bootup
  }
  modify_page();
});


let NewLength = 0;
let OldLength = 0;
async function modify_page()
{
  let timer = setInterval(check, 1000);
  function check()
  {
    const elements =  document.querySelectorAll('.ytd-rich-grid-row');
    OldLength = elements.length;
    if (OldLength != 0)
    {
      clearInterval(timer);
      RemoveElements(elements)
    }
  }
}


window.onscroll = function(e) {  
  let elementsScroll =  document.querySelectorAll('.ytd-rich-grid-row');
  NewLength = elementsScroll.length;
  if (NewLength > OldLength)
  {
    elementsScroll = [...elementsScroll];
    elementsScroll = elementsScroll.slice(OldLength);
    OldLength = NewLength;
    RemoveElements(elementsScroll)
  }
} 

async function RemoveElements(elements)
{
  let sum = Object.values(categories).reduce((partialSum, a) => partialSum + a, 0);
  elements.forEach(item =>{
  let firstChild = item.firstElementChild;
  if( firstChild.id == "content")
  {
    if (sum == 15)
    {
      console.log("All categories selected");
    }
    else if(sum == 0)
    {
      firstChild.style.display = 'none';
    }
    else
    {
      link = firstChild.firstElementChild.firstElementChild.firstElementChild.firstElementChild.href;
      fetch(link)
      .then((response) => response.text())
      .then((text) => {
        let category = (text.substring( text.search('"category"')+12 , text.search('"category"') +15));
        if(!categories[category])
        {
          firstChild.style.display = 'none';
        }
      })
      .catch(
      )
    }
  }
  })
}