function setup() {
    let cb_Education            =   select('#Education', false);
    let cb_ScienceTechnology    =   select('#ScienceTechnology', false);
    let cb_Entertainment        =   select('#Entertainment', false);
    let cb_FilmAnimation        =   select('#FilmAnimation', false);
    let cb_Music                =   select('#Music', false);
    let cb_Sports               =   select('#Sports', false);
    let cb_TravelEvents         =   select('#TravelEvents', false);
    let cb_Gaming               =   select('#Gaming', false);
    let cb_PeopleBlogs          =   select('#PeopleBlogs', false);
    let cb_Comedy               =   select('#Comedy', false);
    let cb_AutosVehicles        =   select('#AutosVehicles', false);
    let cb_PetsAnimals          =   select('#PetsAnimals', false);
    let cb_NewsPolitics         =   select('#NewsPolitics', false);
    let cb_HowtoStyle           =   select('#HowtoStyle', false);
    let cb_NonprofitsActivism   =   select('#NonprofitsActivism', false);

    //Set values from local storage on popup
    //Get Values from local storage
    chrome.storage.sync.get(
      ['enab']
    , function(storage) {
      parse_set_on_popup(storage.enab);
    });
   

    let submit_button   =   select('#submit1');
    submit_button.mousePressed(greet);

    let reset_button   =   select('#reset');
    reset_button.mousePressed(parse_reset);

    let selectAll_button   =   select('#selectAll');
    selectAll_button.mousePressed(parse_selectall);

/// Code for Donate Button
    button = createButton('Feedback');
    button.position(140, 200);
    button.style('color:red');
    button.size(100,40);
    button.mousePressed(donate);

    function donate(){
    window.open("https://forms.gle/bL5kWc3nnKnJdCdi7");
  }


function greet(){
  // console.log("submit button working");
  let params = {
      active: true,
      currentWindow: true
    };
  chrome.tabs.query(params, gotTabs);
  
  function gotTabs(tabs) {
  // console.log('got tabs');
  // console.log(tabs);
  // send a message to the content script
  let message = [
                cb_Education.checked(),
                cb_ScienceTechnology.checked(),
                cb_Entertainment.checked(),
                cb_FilmAnimation.checked(),
                cb_Music.checked(),
                cb_Sports.checked(),
                cb_TravelEvents.checked(),
                cb_Gaming.checked(),
                cb_PeopleBlogs.checked(),
                cb_Comedy.checked(),
                cb_AutosVehicles.checked(),
                cb_PetsAnimals.checked(),
                cb_NewsPolitics.checked(),
                cb_HowtoStyle.checked(),
                cb_NonprofitsActivism.checked()
                ];
  // console.log("message sending");
  chrome.tabs.sendMessage(tabs[0].id, message);
  }
}





function parse_set_on_popup(value=[]){
  let categories_name = new Map([["Edu",1], ["Sci",1], ["Ent",1], ["Fil",1], ["Mus",1], ["Spo",1], ["Tra",1], ["Gam",1], ["Peo",1], ["Com",1], ["Aut",1], ["Pet",1], ["New",1], ["How",1], ["Non",1]]);

   
  for (i=0; i<value.length;i++){
      categories_name.set(value[i],0);
  }

  cb_Education.checked(categories_name.get("Edu")),
  cb_ScienceTechnology.checked(categories_name.get("Sci")),
  cb_Entertainment.checked(categories_name.get("Ent")),
  cb_FilmAnimation.checked(categories_name.get("Fil")),
  cb_Music.checked(categories_name.get("Mus")),
  cb_Sports.checked(categories_name.get("Spo")),
  cb_TravelEvents.checked(categories_name.get("Tra")),                
  cb_Gaming.checked(categories_name.get("Gam")),
  cb_PeopleBlogs.checked(categories_name.get("Peo")),
  cb_Comedy.checked(categories_name.get("Com")),
  cb_AutosVehicles.checked(categories_name.get("Aut")),
  cb_PetsAnimals.checked(categories_name.get("Pet")),
  cb_NewsPolitics.checked(categories_name.get("New")),
  cb_HowtoStyle.checked(categories_name.get("How")),
  cb_NonprofitsActivism.checked(categories_name.get("Non"))
}

function parse_reset(){
  categories_reset = ['Edu', 'Sci', 'Ent','Fil','Mus' ,'Spo' ,'Tra' ,'Gam' ,'Peo' ,'Com' ,'Aut' ,'Pet' ,'New' ,'How' ,'Non'];
  parse_set_on_popup(categories_reset);

}

function parse_selectall(){
  categories_selectAll = [];
  parse_set_on_popup(categories_selectAll);
}

}
