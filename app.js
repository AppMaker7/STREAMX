(function(){
  "use strict";
  var titles=[
    {id:"naruto",name:"Naruto",type:"Anime",year:"2002",language:"English dub catalog",initial:"N",tone:"orange",description:"Follow Naruto Uzumaki's journey from an energetic young ninja toward becoming a respected leader. STREAMX lists this title as an English-dub interest; playback availability depends on your authorized streaming services."},
    {id:"solo-leveling",name:"Solo Leveling",type:"Anime",year:"2024",language:"English dub catalog",initial:"SL",tone:"purple",description:"A fantasy action series about a hunter who gains a mysterious ability to grow stronger. Check an authorized service for current English-dub availability."},
    {id:"one-piece",name:"One Piece",type:"Anime",year:"1999",language:"English dub catalog",initial:"OP",tone:"teal",description:"Join a pirate crew on a huge adventure across the seas. Check an authorized service for current English-dub availability."},
    {id:"your-library",name:"Your next favorite",type:"Coming soon",year:"",language:"Add titles as you go",initial:"✦",tone:"purple",description:"Your personal library will grow as you save titles and connect services you are allowed to use."}
  ];
  var channels=[];
  var activeView="home";
  var selected=null;
  var favorites=readFavorites();
  function readFavorites(){try{return JSON.parse(localStorage.getItem("streamx-favorites")||"[]")}catch(e){return[]}}
  function saveFavorites(){try{localStorage.setItem("streamx-favorites",JSON.stringify(favorites))}catch(e){}}
  function toast(msg){var el=document.getElementById("toast");el.textContent=msg;el.classList.add("show");clearTimeout(toast.timer);toast.timer=setTimeout(function(){el.classList.remove("show")},2400)}
  function showView(view){
    activeView=view;
    document.querySelectorAll(".nav-item").forEach(function(b){b.classList.toggle("active",b.dataset.view===view)});
    ["live","settings"].forEach(function(id){document.getElementById(id+"-section").classList.toggle("hidden",view!==id)});
    document.getElementById("hero").classList.toggle("hidden",view!=="home");
    document.getElementById("continue-section").classList.toggle("hidden",view!=="home");
    document.getElementById("catalog-section").classList.toggle("hidden",!["home","anime","movies","shows","mylist"].includes(view));
    var heading={home:["HAND-PICKED STARTING POINTS","Anime to explore","English dub focus"],anime:["ANIME LIBRARY","Anime","English dub focus"],movies:["MOVIE LIBRARY","Movies","Connect your services"],shows:["SERIES LIBRARY","TV Shows","Connect your services"],mylist:["SAVED FOR LATER","My List","Your favorites"]}[view];
    if(heading){document.getElementById("catalog-eyebrow").textContent=heading[0];document.getElementById("catalog-title").textContent=heading[1];document.getElementById("catalog-note").textContent=heading[2]}
    renderCatalog();
    window.scrollTo(0,0);
  }
  function renderCatalog(query){
    var grid=document.getElementById("catalog-grid");grid.innerHTML="";
    var list=titles.filter(function(t){
      if(activeView==="mylist"&&!favorites.includes(t.id))return false;
      if(["movies","shows"].includes(activeView))return false;
      var q=(query||"").toLowerCase();return !q||(t.name+" "+t.type+" "+t.language).toLowerCase().includes(q);
    });
    if(["movies","shows"].includes(activeView)){grid.innerHTML='<div class="empty-state" style="grid-column:1/-1"><h3>Connect your own library</h3><p>This section is ready for services and media sources you are authorized to access.</p></div>';return}
    if(!list.length){grid.innerHTML='<div class="empty-state" style="grid-column:1/-1"><h3>Nothing here yet</h3><p>Save a title to My List or try another search.</p></div>';return}
    list.forEach(function(t){
      var card=document.createElement("button");card.className="poster-card";card.type="button";
      card.innerHTML='<div class="poster-art '+t.tone+'"><span class="poster-initial"></span></div><div class="poster-info"><b></b><small></small><span class="tag">ENGLISH DUB</span></div>';
      card.querySelector(".poster-initial").textContent=t.initial;card.querySelector("b").textContent=t.name;card.querySelector("small").textContent=t.year?t.type+" · "+t.year:t.type;
      card.addEventListener("click",function(){openDetail(t)});grid.appendChild(card);
    });
  }
  function openDetail(t){selected=t;document.getElementById("detail-title").textContent=t.name;document.getElementById("detail-description").textContent=t.description;document.getElementById("detail-save").textContent=favorites.includes(t.id)?"✓ Saved to My List":"＋ Add to My List";document.getElementById("detail-modal").classList.remove("hidden")}
  function closeDetail(){document.getElementById("detail-modal").classList.add("hidden")}
  function choosePlaylist(){document.getElementById("playlist-file").click()}
  function parseM3U(text){
    var lines=text.split(/\r?\n/),result=[],meta=null;
    lines.forEach(function(line){line=line.trim();if(!line)return;if(line.indexOf("#EXTINF:")===0){var name=line.split(",").slice(1).join(",").trim()||"Untitled channel";var group=(line.match(/group-title="([^"]*)"/)||[])[1]||"Other";meta={name:name,group:group}}else if(line[0]!=="#"&&meta){result.push({name:meta.name,group:meta.group,url:line});meta=null}});
    return result;
  }
  function renderChannels(){
    var list=document.getElementById("channel-list"),empty=document.querySelector("#live-section .empty-state");list.innerHTML="";
    empty.classList.toggle("hidden",channels.length>0);
    channels.forEach(function(c,i){var row=document.createElement("div");row.className="channel-row";var num=document.createElement("span");num.className="channel-number";num.textContent=String(i+1).padStart(2,"0");var name=document.createElement("span");name.className="channel-name";name.textContent=c.name;var group=document.createElement("span");group.className="channel-group";group.textContent=c.group;row.append(num,name,group);list.appendChild(row)});
  }
  document.querySelectorAll("[data-view]").forEach(function(b){b.addEventListener("click",function(){showView(b.dataset.view)})});
  document.getElementById("browse-anime").addEventListener("click",function(){showView("anime")});
  ["open-playlist","live-add","live-add-2","settings-playlist"].forEach(function(id){document.getElementById(id).addEventListener("click",choosePlaylist)});
  document.getElementById("settings-open").addEventListener("click",function(){showView("settings")});
  document.getElementById("search-toggle").addEventListener("click",function(){var p=document.getElementById("search-panel");p.classList.toggle("hidden");if(!p.classList.contains("hidden"))document.getElementById("search-input").focus()});
  document.getElementById("search-input").addEventListener("input",function(e){renderCatalog(e.target.value)});
  document.getElementById("playlist-file").addEventListener("change",function(e){
    var file=e.target.files&&e.target.files[0];if(!file)return;
    var reader=new FileReader();reader.onload=function(){channels=parseM3U(String(reader.result||""));renderChannels();showView("live");toast(channels.length+" channels imported")};reader.onerror=function(){toast("Could not read that playlist")};reader.readAsText(file);e.target.value="";
  });
  document.getElementById("modal-close").addEventListener("click",closeDetail);
  document.getElementById("detail-done").addEventListener("click",closeDetail);
  document.getElementById("detail-modal").addEventListener("click",function(e){if(e.target.id==="detail-modal")closeDetail()});
  document.getElementById("detail-save").addEventListener("click",function(){if(!selected)return;var i=favorites.indexOf(selected.id);if(i<0){favorites.push(selected.id);toast("Added to My List")}else{favorites.splice(i,1);toast("Removed from My List")}saveFavorites();document.getElementById("detail-save").textContent=favorites.includes(selected.id)?"✓ Saved to My List":"＋ Add to My List";renderCatalog()});
  document.addEventListener("keydown",function(e){if(e.key==="Escape")closeDetail();if(e.key==="Enter"&&document.activeElement===document.body){var first=document.querySelector(".nav-item.active");if(first)first.focus()}});
  renderCatalog();renderChannels();
})();