function h(){j=requestAnimFrame(h),i.loop()}var a=null,b={},c=$("title").html(),d=d||null,e=null,f=function(e){var f={};return f.start=function(){if(!e){$("#wrapper").html("<h2>The socket2m server is not running at the moment. Please come back later.</h2>");return}d==null&&(d=io.connect()),d.on("connect",function(){console.log("connected")}),d.on("state:change",function(e){var f=!1,g=null,h=function(h,i){h!=null&&(f=h),i!=null&&(g=i);if(f&&g){$("#wrapper").html(g);var j=$("#wrapper h1:first");$("#state-wrapper").hide().children("#state-title").html(j.html()),$("title").html(c+" - "+j.html()),j.parent("div.page-header").remove(),j.remove(),$("#state-wrapper").fadeIn("fast"),$("#wrapper").fadeIn("fast"),window[e.charAt(0)+"a"].init(),a=e;for(var k in b)d.on(k,b[k]);console.log("changed state to "+e),typeof _gaq!="undefined"&&_gaq.push(["_trackPageview","/"+e])}};$("#state-wrapper").fadeOut("fast"),$("#wrapper").fadeOut("fast",function(){h(!0,null)});for(var i in b)d.removeListener(i,b[i]);d.emit("state:fetch",e,function(a){h(null,a)})}),d.on("msg",function(a){mbalert(a)}),loadScript("/shared/js/utils.js")},f.isTouchDevice=function(){return"ontouchstart"in document.documentElement},f.iOS=function(){return"ontouchstart"in document.documentElement},f}(typeof io!="undefined");$(function(){g.preloadSound("/sounds/bang.wav","weapon:fire"),f.iOS()||(g.preloadSound("/sounds/applause.wav","player:kill"),g.preloadSound("/sounds/boo.wav","player:die"),g.preloadSound("/sounds/chat.wav","chat"),g.preloadSound("/sounds/sudden_death.wav","game:suddendeath"),g.preloadSound("/sounds/win.wav","game:win"),g.preloadSound("/sounds/lose.wav","game:lose"),g.preloadSound("/sounds/teleport.wav","player:teleport"),g.preloadSound("/sounds/weapon.wav","weapon:change"),g.preloadSound("/sounds/powerup.wav","game:powerup:spawn")),f.start()});Bullet=function(){this._x=0,this._y=0,this._a=0,this._v=0,this._alive=!1,this._owner=0,this._vx=0,this._vy=0,this._w=0,this._id=0},Bullet.prototype={spawn:function(a){this._x=a.x,this._y=a.y,this._a=a.a,this._v=a.v,this._owner=a.o,this._id=a.id,this._alive=!0,this._w=3,this._vx=Math.cos(this._a/180*Math.PI)*this._v,this._vy=Math.sin(this._a/180*Math.PI)*this._v},getOwner:function(){return this._owner},getId:function(){return this._id},tick:function(a){this._x+=this._vx*a,this._y+=this._vy*a,this._vy+=20*a;if(this._x<i.getLeft()||this._x>i.getRight()||this._y<i.getTop()||this._y>i.getBottom())this._alive=!1},isDead:function(){return!this._alive},preRender:function(){e.clearRect(this._x|0,this._y|0,this._w,this._w)},render:function(){e.square(this._x|0,this._y|0,this._w,"rgb(255, 0, 0)")},kill:function(){this._alive=!1},getLeft:function(){return this._x},getTop:function(){return this._y},getRight:function(){return this.getLeft()+this._w},getBottom:function(){return this.getTop()+this._w}},Bullet.factory=function(){return new Bullet};Platform=function(){this.x=0,this.y=0,this.w=0,this.h=0},Platform.prototype={setCoordinates:function(a,b,c,d){this.x=a,this.y=b,this.w=c,this.h=d},render:function(){e.fillRect(this.x,this.y,this.w,this.h,"rgb(0, 0, 0)")},getLeft:function(){return this.x},getTop:function(){return this.y},getRight:function(){return this.getLeft()+this.w},getBottom:function(){return this.getTop()+this.h}};Powerup=function(){this.x=0,this.y=0,this.r=0,this.type=0,this.alive=!1,this.id=0,this.letter=""},Powerup.prototype={spawn:function(a){this.x=a.x,this.y=a.y,this.r=a.r,this.type=a.type,this.id=a.id,this.alive=!0,this.letter=a.letter},preRender:function(){e.clearRect(this.x-1,this.y-1,(this.r+1)*2,(this.r+1)*2)},render:function(){e.circle(this.x,this.y,this.r,"rgb(0, 255, 128)"),e.fillText(this.x+this.r,this.y+1,this.letter,"rgb(100, 100, 100)",{font:"bold 13px sans-serif",textBaseline:"hanging",textAlign:"center"})},getLeft:function(){return this.x},getTop:function(){return this.y},getRight:function(){return this.getLeft()+this.r*2},getBottom:function(){return this.getTop()+this.r*2},getId:function(){return this.id},kill:function(){this.alive=!1},isDead:function(){return!this.alive}},Powerup.factory=function(){return new Powerup};var g=function(){var a={},b={},c={},d=!1,e=!1;return a.toggleSounds=function(){d=!d},a.mute=function(){d=!0},a.unmute=function(){d=!1},a.preloadSound=function(a,d){if(b[a]==null){var e=document.createElement("audio");e.src=a,e.preload="auto",b[a]=e,$("body").append(e),b[a].load()}else console.log("not preloading sound - already loaded ["+a+"]");d!=null&&(c[d]=a)},a.playSound=function(a){if(d)return;if(b[a]==null)if(c[a]!=null)a=c[a];else{console.log("warning - "+a+" was not preloaded - aborting");return}b[a].play()},a.pauseSound=function(a){if(d)return;b[a]==null&&c[a]!=null&&(a=c[a]),b[a].pause()},a}();var i=function(){var a={},b=0,c=0,h=0,i=0,l=0,m=0,n=0,o=null,p=null,q=null,r=[],s=[],t=[],u=[],v=[],w=[],x=0,y=-1,z=!1,A=null,B=!1,C=!1,D=!1,E=!1,F=null,G=null;return a.loop=function(){if(B)return;h=(new Date).getTime(),l=(h-c)/1e3,c=h;if(h>=i+1e3){i=h;var b=Math.round(10/l)/10;F.innerHTML=b+" fps"}C||(x>0?(x-=l,Math.ceil(x)!=y&&(y=Math.ceil(x),G.innerHTML=Utils.formatTime(y))):z||(z=!0,d.emit("game:timeup"))),a.preRender(),a.handleInput(),a.tick(),a.render()},a.preRender=function(){p.preRender(),q.preRender();var a=u.length;while(a--)u[a].preRender();a=v.length;while(a--)v[a].preRender()},a.handleInput=function(){if(E)return;k.isKeyDown("SPACE_BAR")&&p.fireWeapon(),k.isKeyDown("LEFT_ARROW")?p.decreaseAngle(l):k.isKeyDown("RIGHT_ARROW")&&p.increaseAngle(l),k.isKeyDown("DOWN_ARROW")?p.decreaseVelocity(l):k.isKeyDown("UP_ARROW")&&p.increaseVelocity(l)},a.tick=function(){v.length<3&&Math.floor(Math.random()*2501)==0&&a.spawnPowerup();var b=r.length,c;if(b)while(b--){var d=r[b],e=d.socket_id==p.getId()?p:q;e.spawn({x:d.x,y:a.getCoordinateForPlatform(d.platform)}),e.getId()==q.getId()&&(D=!1),r=[]}b=s.length;if(b){c=u.length;while(b--)while(c--)if(u[c].getId()==s[b]){console.log("killing entity "+u[c].getId()),u[c].kill(),u.splice(c,1);break}s=[]}b=t.length;if(b){c=v.length;while(b--)while(c--)if(v[c].getId()==t[b]){console.log("killing powerup "+v[c].getId()),v[c].kill(),v.splice(c,1);break}t=[]}b=u.length;while(b--){u[b].tick(l);if(!u[b].isDead()){D==0&&u[b].getOwner()==p.getId()&&a.entitiesTouching(u[b],q)?(D=!0,u[b].kill(),a.killPlayer(q.getId(),u[b].getId())):u[b].getOwner()==q.getId()&&a.entitiesTouching(u[b],p)&&u[b].kill();if(!u[b].isDead()){c=v.length;while(c--)u[b].getOwner()==p.getId()&&a.entitiesTouching(u[b],v[c])?(u[b].kill(),a.claimPowerup(v[c].getId(),u[b].getId())):u[b].getOwner()==q.getId()&&a.entitiesTouching(u[b],v[c])&&u[b].kill(),!v[c].isDead()}if(!u[b].isDead()){var c=4;while(c--)if(a.entitiesTouching(u[b],w[c])){u[b].kill();break}}}u[b].isDead()&&(console.log("found dead entity ID "+u[b].getId()),u.splice(b,1))}},a.render=function(){p.render(),p.renderSight(),q.render();var a=0;a=w.length;while(a--)w[a].render();a=u.length;while(a--)u[a].render();a=v.length;while(a--)v[a].render()},a.setPlayer=function(a){p=a},a.setOpponent=function(a){q=a},a.spawnPowerup=function(){d.emit("game:powerup:spawn")},a.actuallySpawnPowerup=function(a){console.log("spawning powerup",a);var b=Powerup.factory();b.spawn(a),v.push(b),g.playSound("game:powerup:spawn")},a.fireWeapon=function(a){d.emit("game:weapon:fire",a)},a.actuallyFireWeapon=function(b){var c=b.x,d=b.o,e=a.getCoordinateForPlatform(b.platform);b.o==p.getId()&&p.setReloadTime(b.reloadIn);for(var f=0,h=b.bullets.length;f<h;f++){var i=Bullet.factory(),j=b.bullets[f];j.o=d,j.x=c,j.y=e,i.spawn(j),u.push(i)}g.playSound("weapon:fire")},a.reloadPlayerWeaponIn=function(a){p.setReloadTime(a)},a.getLeft=function(){return 0},a.getTop=function(){return 0},a.getBottom=function(){return n},a.getRight=function(){return m},a.entitiesTouching=function(a,b){return a.getLeft()<=b.getRight()&&b.getLeft()<=a.getRight()&&a.getTop()<=b.getBottom()&&b.getTop()<=a.getBottom()},a.claimPowerup=function(a,b){console.log("requesting claim powerup "+a+" from bullet "+b),d.emit("game:powerup:claim",{id:a,eId:b})},a.actuallyClaimPowerup=function(a){console.log("killing bullet "+a.eId+" and queueing powerup removal "+a.id),t.push(a.id),s.push(a.eId)},a.killPlayer=function(a,b){console.log("requesting kill player "+a+" from bullet "+b),d.emit("game:player:kill",{id:a,eId:b})},a.actuallyKillPlayer=function(a){var b=a.id;console.log("actually killing player "+b),$("#game #p1").html(a.scores[0]),$("#game #p2").html(a.scores[1]),b==p.getId()?(a.doRespawn&&(g.playSound("player:die"),d.emit("game:player:respawn")),console.log("queuing entity death "+a.eId),s.push(a.eId)):b==q.getId()?a.doRespawn&&g.playSound("player:kill"):console.log("unknown ID "+b)},a.actuallyRespawnPlayer=function(a){console.log("queuing respawning player",a.player),r.push(a.player),a.teleport&&g.playSound("player:teleport")},a.getCoordinateForPlatform=function(a){return(a+1)*200-32},a.beginChatting=function(){k.releaseKeys(),console.log("beginning chat"),E=!0;var b=$("#viewport").offset(),c=$("<form id='chatform' style='display:none;'><input type='text' placeholder='type your message' autocomplete='off' /></form>").css({left:p.getLeft()+b.left-100,top:p.getTop()+b.top-50});$("body").append(c),$("input",c).blur(function(){a.endChatting()}),c.submit(function(b){b.preventDefault();var e=$.trim($("input",c).val());e.length&&(console.log("chatting: "+e),d.emit("game:player:chat",e),a.endChatting())}),c.show(),$("input",c).focus()},a.endChatting=function(){k.bindKeys(),E=!1,$("#chatform").fadeOut("fast",function(){$(this).remove()})},a.isChatting=function(){return E},a.showChatMessage=function(a){var b=$("#viewport").offset(),c=q.getId()==a.id?q:p,d=$("<div class='chatbubble' style='display:none;'>"+a.msg+"</div>");d.addClass(c.getSide()),$("body").append(d),d.css("top",c.getTop()+b.top-40-d.height()/2),c.getSide()=="left"?d.css("left",b.left+8):d.css("left",b.left+$("#viewport").width()-d.width()-21),d.fadeIn("normal",function(){setTimeout(function(){d.fadeOut("normal",function(){d.remove()})},3500)}),c.getId()==q.getId()&&g.playSound("chat")},a.prepare=function(b){var c=b.challenger,g=b.challengee;$("#state-title").html("Game On: "+c.username+" Vs "+g.username),$("#game .stats").html("0"),a.bindKeys();var h=Player.factory({id:c.socket_id,x:c.x,y:a.getCoordinateForPlatform(c.platform),a:c.a,v:c.v,c:"rgb(0, 255, 0)",side:"left",username:c.username}),i=Player.factory({id:g.socket_id,x:g.x,y:a.getCoordinateForPlatform(g.platform),a:g.a,v:g.v,c:"rgb(0, 0, 255)",side:"right",username:g.username});c.socket_id==b.user.sid?(a.setPlayer(h),a.setOpponent(i)):(a.setPlayer(i),a.setOpponent(h)),e=new Surface("viewport"),n=a.getTop()+e.getHeight(),m=a.getLeft()+e.getWidth(),a.addPlatforms(),D=!1,B=!1,C=!1,E=!1,z=!1,y=-1,x=b.duration,u=[],v=[],r=[],s=[],t=[],f.isTouchDevice()&&($(".topbar").hide(),$("#footer").hide(),$("#touchControls").show(),document.getElementById("left").ontouchstart=function(){k.keyDown("LEFT_ARROW")},document.getElementById("left").ontouchend=function(){k.keyUp("LEFT_ARROW")},document.getElementById("right").ontouchstart=function(){k.keyDown("RIGHT_ARROW")},document.getElementById("right").ontouchend=function(){k.keyUp("RIGHT_ARROW")},document.getElementById("up").ontouchstart=function(){k.keyDown("UP_ARROW")},document.getElementById("up").ontouchend=function(){k.keyUp("UP_ARROW")},document.getElementById("down").ontouchstart=function(){k.keyDown("DOWN_ARROW")},document.getElementById("down").ontouchend=function(){k.keyUp("DOWN_ARROW")},document.getElementById("space").ontouchstart=function(){k.keyDown("SPACE_BAR")},document.getElementById("space").ontouchend=function(){k.keyUp("SPACE_BAR")}),F=document.getElementById("fps"),G=document.getElementById("countdown"),d.emit("game:prepared")},a.start=function(a){c=(new Date).getTime(),i=c},a.handleWin=function(b){g.playSound("game:win");var c=b.scores.win==1?"point":"points",d="<h2>Congratulations - you win!</h2><p>Well done - you beat "+q.getUsername()+" by <strong>"+b.scores.win+"</strong> "+c+" to <strong>"+b.scores.lose+"</strong>.</p>"+"<h3>Ranking change</h3>"+"<p>Your rank has increased to <strong>"+b.rank+"</strong> (+"+b.increase+")</p>"+"<h3>Tweet all about it</h3>"+"<p>Why not let the world know about your victory? Tweet and find some new people to beat!</p>"+tweetButton({text:"I just won a game of Sock it to 'em - why not come and challenge me to a duel?",count:"none"});a.endGame(d)},a.handleLose=function(b){g.playSound("game:lose");var c=b.scores.win==1?"point":"points",d="<h2>Oh no - you lose!</h2><p>Bad luck - you lost to "+q.getUsername()+" by <strong>"+b.scores.win+"</strong> "+c+" to <strong>"+b.scores.lose+"</strong>.</p>"+"<h3>Ranking change</h3>";b.decrease?d+="<p>Your rank has decreased to <strong>"+b.rank+"</strong> (-"+b.decrease+")</p>":d+="<p>Your rank has remained unchanged at <strong>"+b.rank+"</strong></p>",d+="<h3>Spread the word</h3><p>Why not challenge someone else? Spread the word to find some new people to beat!</p>"+tweetButton({text:"Fancy a duel? Come and have a game of Sock it to em'!",count:"none"}),a.endGame(d)},a.cancelGame=function(b){var c="<h2>Game aborted!</h2><p>Oh no - "+q.getUsername()+" left the game! ";b.defaulted?c+="As it was underway, they have <strong>forfeited</strong> it. You don't get the glory of a win, but your rank has increased by <strong>one</strong> point, and theirs has decreased due to bailing out of your duel.</p>":c+="As it hadn't got properly underway it has been <strong>cancelled</strong>.</p>",a.endGame(c)},a.endGame=function(a,b){clearTimeout(A),cancelRequestAnimFrame(j),B=!0,k.releaseKeys(),$("#countdown").html("Game Over"),mbalert(a,function(){d.emit("game:finish")}),f.isTouchDevice()&&($(".topbar").show(),$("#footer").show())},a.setSuddenDeath=function(){C=!0,g.playSound("game:suddendeath"),$("#countdown").html("Sudden Death")},a.bindKeys=function(){k.captureKeys(["SPACE_BAR","UP_ARROW","DOWN_ARROW","LEFT_ARROW","RIGHT_ARROW"]),k.bindTo(window),k.bindKeys(),k.onKeyPress("T",function(b){a.isChatting()||a.beginChatting()}),k.onKeyPress("ESC",function(b){a.isChatting()&&a.endChatting()})},a.addPlatforms=function(){w[0]=new Platform,w[0].setCoordinates(0,this.getBottom()/3*1,48,10),w[1]=new Platform,w[1].setCoordinates(0,this.getBottom()/3*2,48,10),w[2]=new Platform,w[2].setCoordinates(this.getRight()-48,this.getBottom()/3*1,48,10),w[3]=new Platform,w[3].setCoordinates(this.getRight()-48,this.getBottom()/3*2,48,10)},a.changePlayerWeapon=function(a){g.playSound("weapon:change"),p.changeWeapon(a)},a.delayTimeup=function(a){console.log("retrying timeup in "+a),A=setTimeout(function(){console.log("retrying timeup..."),d.emit("game:timeup")},a)},a}(),j=null;Surface=function(a){var b,c=document.getElementById(a);if(!c.getContext)throw new Error("Canvas not available");b=c.getContext("2d"),c.width=b.canvas.clientWidth,c.height=b.canvas.clientHeight,this.line=function(a,c,d,e,f){b.strokeStyle=f,b.beginPath(),b.moveTo(a,c),b.lineTo(d,e),b.closePath(),b.stroke()},this.fillRect=function(a,c,d,e,f){b.fillStyle=f,b.fillRect(a,c,d,e)},this.getWidth=function(){return b.canvas.clientWidth},this.getHeight=function(){return b.canvas.clientHeight},this.pixel=function(a,c,d){b.fillStyle=d,this.fillRect(a,c,1,1)},this.square=function(a,c,d,e){b.fillStyle=e,this.fillRect(a,c,d,d)},this.drawImage=function(a,c,d,e,f){b.drawImage(a,c,d,e,f)},this.clear=function(){b.clearRect(0,0,c.width,c.height)},this.clearRect=function(a,c,d,e){b.clearRect(a,c,d,e)},this.circle=function(a,c,d,e){b.fillStyle=e,b.beginPath(),b.arc(a+d,c+d,d,0,Math.PI*2,!0),b.closePath(),b.fill()},this.fillText=function(a,c,d,e,f){b.fillStyle=e,f.font&&(b.font=f.font),f.textBaseline&&(b.textBaseline=f.textBaseline),f.textAlign&&(b.textAlign=f.textAlign),b.fillText(d,a,c)}};var k={keyMap:{27:"ESC",32:"SPACE_BAR",37:"LEFT_ARROW",38:"UP_ARROW",39:"RIGHT_ARROW",40:"DOWN_ARROW",84:"T"},keysPressed:{},capturedKeys:{},target:null,triggers:{},upHandlers:{},keyDown:function(a){k.keysPressed[a]=!0},keyUp:function(a){k.keysPressed[a]=!1},isKeyDown:function(a){return k.keysPressed[a]==1},captureKeys:function(a){for(var b=0;b<a.length;b++)k.capturedKeys[a[b]]=!0},isCapturedKey:function(a){return k.capturedKeys[a]==1},mapKey:function(a){return typeof k.keyMap[a]!="undefined"?k.keyMap[a]:"KEY_NOT_MAPPED"},releaseKeys:function(){$(k.target).unbind("keydown"),$(k.target).unbind("keyup")},bindKeys:function(){$(k.target).keydown(function(a){var b=k.mapKey(a.which);k.isCapturedKey(b)&&a.preventDefault(),clearTimeout(k.upHandlers[b]),k.keyDown(b)}),$(k.target).keyup(function(a){var b=k.mapKey(a.which);k.isCapturedKey(b)?a.preventDefault():k.triggers[b]!=null&&k.triggers[b](a),k.upHandlers[b]=setTimeout(function(){k.keyUp(b)},35)})},bindTo:function(a){k.target=a},onKeyPress:function(a,b){k.triggers[a]=b}};var l=function(){function a(a){var b=a.sid==g.sid?"me":"opponent",c=a.sid==g.sid?"your":""+a.username+"'s";return a.rank==null&&(a.rank=0),a.wins==null&&(a.wins=0),a.losses==null&&(a.losses=0),$("<tr><td data-id='"+a.sid+"' "+"data-username='"+a.username+"' "+"data-rank='"+a.rank+"' "+"class='"+b+"'>"+a.username+" "+'<a title="View '+c+" profile in a new window\" href='/user/"+a.username+"' target='_blank'><img src='/img/profile.png' alt='View "+a.username+"'s profile' /></a>"+"<td>"+a.rank+"</td>"+"<td>"+a.wins+"</td>"+"<td>"+a.losses+"</td>"+"</tr>")}function b(a){var b=new Date(a.started);console.log("game started at: "+b.getTime()+" with duration: "+a.duration+" current TS: "+h.getTime());var c=Math.round((b.getTime()+a.duration*1e3-h.getTime())/1e3),d="";return c<=0?d="due to finish...":(d=Utils.formatTime(c),i[a._id]=setInterval(function(){c--,c<=0?(clearInterval(i[a._id]),$("td[data-game-time='"+a._id+"']").html("due to finish...")):$("td[data-game-time='"+a._id+"']").html(Utils.formatTime(c))},1e3)),$("<tr data-id='"+a._id+"'><td>"+a.challenger.username+" Vs "+a.challengee.username+"</td><td><span class='challenger'>"+a.challenger.score+"</span> - <span class='challengee'>"+a.challengee.score+"</span></td><td data-game-time='"+a._id+"'>"+d+"</td>")}function c(){$("#users table").unbind("click"),$("#users table").bind("click",function(a){var b=$(a.target),c=b.attr("data-id");if(c!=null&&c!=g.sid)if(j)mbalert("You've got a challenge outstanding - please wait.");else{var f=e(g,{rank:b.data("rank")}),h="<p>Do you want to challenge <strong>"+b.data("username")+"</strong>? "+f+"<h4 class='challenge'>Issue the challenge?</h4>";mbconfirm(h,function(a){a&&(j=!0,console.log("issuing challenge to "+c),d.emit("lobby:challenge:issue",c))},"Yes","No")}})}function e(a,b){var c="",d="",e="";return a.rank>b.rank?(e="lower than",c="increase by <strong>one</strong> point",d="decrease by <strong>two</strong> points"):a.rank<b.rank?(e="higher than",c="increase by <strong>three</strong> points",d="not change"):(e="the same as",c="increase by <strong>two</strong> points",d="decrease by <strong>one</strong> point"),a.rank<=0&&(d="not change as you are currently unranked"),"Their rank is currently <strong>"+b.rank+"</strong>, which is "+e+" yours.</p>"+"<h3>If you win...</h3>"+"<p>Your ranking will "+c+".</p>"+"<h3>But if you lose...</h3>"+"<p>Your ranking will "+d+".</p>"}var f={},g=null,h=null,i={},j=!1;return f.addChatLine=function(a){var b=new Date(a.timestamp),c=$("<div class='chatline "+a.type+"'><time datetime='"+a.timestamp+"'>"+Utils.formatDate(b)+"</time><span class='author'>"+a.author.username+"</span>: <span class='msg'>"+a.msg+"</span></div>");$("#lobby #chat").append(c)},f.init=function(e){$("#lobby form").submit(function(a){a.preventDefault();var b=$(this).find("input"),c=$.trim(b.val());c.length&&(b.prop("disabled",!0),b.val(""),setTimeout(function(){b.prop("disabled",!1)},250),d.emit("lobby:chat",c))});var i,j;h=new Date(e.timestamp),g=e.user,console.log("lobby state",e);var k=$("#users table tbody");k.hide();for(i=0,j=e.users.length;i<j;i++)k.append(a(e.users[i]));k.show(),e.users.length<2&&($("#tweet-challengers #tweet-frame").html(tweetButton({text:"I'm in the #socket2m lobby - come and challenge me to a duel!",count:"none"})),$("#tweet-challengers").show());var l=$("#games table tbody");l.hide();for(i=0,j=e.games.length;i<j;i++)l.append(b(e.games[i]));l.show(),e.games.length==0&&l.append("<tr class='placeholder'><td>-</td><td>-</td><td>-</td></tr>");for(i=0,j=e.chatlines.length;i<j;i++)f.addChatLine(e.chatlines[i]);c()},f.addUser=function(b){console.log("user joining lobby",b);var d=a(b);$("#users table tbody").append(d),d.hide(),d.fadeIn("slow"),$("#tweet-challengers").hide(),c()},f.removeUser=function(a){console.log("received user leave for ID "+a),$("#users table tbody tr td[data-id='"+a+"']").parent().fadeOut("slow",function(){$(this).remove(),$("#users table tbody tr").length<2&&($("#tweet-challengers #tweet-frame").html(tweetButton({text:"I'm in the #socket2m lobby - come and challenge me to a duel!",count:"none"})),$("#tweet-challengers").fadeIn("slow"))})},f.addGame=function(a){console.log("game starting",a),h=new Date(a.started);var c=b(a);$("#games table tr.placeholder").remove(),$("#games table tbody").append(c),c.hide(),c.fadeIn("slow")},f.removeGame=function(a){console.log("received game end for ID "+a),clearInterval(i[a]),$("#games table tr[data-id='"+a+"']").fadeOut("slow",function(){$(this).remove(),$("#games table tbody tr").length==0&&$("#games table tbody").append("<tr class='placeholder'><td>-</td><td>-</td><td>-</td></tr>")})},f.updateGameScore=function(a){$("#games tr[data-id='"+a.id+"']").length&&$("#games tr[data-id='"+a.id+"'] span."+a.player).html(a.score)},f.receiveChallenge=function(a){var b=e(g,a),c="<h2>Incoming challenge!</h2><p>You've received a challenge from <strong>"+a.username+"</strong>. "+b+"<h4 class='challenge'>Accept the challenge?</h4>";mbconfirm(c,function(a){d.emit("lobby:challenge:respond",a)},"Yes","No")},f.challengeResponse=function(a){j=!1,$(".modal").modal("hide"),a.accepted?(console.log("requesting game start..."),d.emit("lobby:startgame")):a.to!=g.sid&&mbalert("The opponent declined your challenge.")},f.challengeBlocked=function(){j=!1,mbalert("Sorry, this user has just challenged (or been challenged by) someone else. Try again in a moment.")},f.cancelChallenge=function(){$(".modal").modal("hide"),mbalert("The opponent withdrew their challenge.")},f.couldNotCancelChallenge=function(){console.log("could not cancel challenge")},f.confirmChallenge=function(a){mbmodal("<p>You challenge has been issued. If your opponent accepts it your game will begin immediately. You'll be notified if they reject it.</p><p>You can't challenge anyone else - and nobody can challenge you - while you wait for your opponent's decision. If you don't hear anything you can cancel this challenge whenever you wish.</p>",{"Withdraw challenge":{"class":"danger",callback:function(){j=!1,d.emit("lobby:challenge:cancel",a)}}})},f}();Weapon=function(){var a=!0,b=(new Date).getTime(),c=0;this.isLoaded=function(){var c;return a?!0:b==0?!1:(c=(new Date).getTime(),a=c>=b,a)},this.fire=function(d){d.type=c,i.fireWeapon(d),a=!1,b=(new Date).getTime()+3e3},this.reloadIn=function(a){b=(new Date).getTime()+a},this.setType=function(a){c=a}},Weapon.factory=function(a){var b=new Weapon;return b.setType(a),b};Player=function(a){this._id=a.id,this._x=a.x,this._y=a.y,this._a=a.a,this._v=a.v,this._c=a.c,this._username=a.username,this._side=a.side,this._cWeapon=0,this._weapons={0:Weapon.factory(0),1:Weapon.factory(1)},this.aim={x:0,y:0},this.oldAim={x:0,y:0},this.oldX=this._x,this.oldY=this._y,this.tick=function(){},this.getId=function(){return this._id},this.preRender=function(){e.clearRect(this.aim.x|0,this.aim.y|0,5,5),e.clearRect(this._x|0,this._y|0,16,32)},this.render=function(){e.fillRect(this._x|0,this._y|0,16,32,this._c)},this.renderSight=function(){this.aim.x=this._x+Math.cos(this._a/180*Math.PI)*this._v|0,this.aim.y=this._y+Math.sin(this._a/180*Math.PI)*this._v|0,e.square(this.aim.x,this.aim.y,5,"rgb(0, 0, 0)")},this.fireWeapon=function(){var a;if(!this.getWeapon().isLoaded())return;a={a:this._a,v:this._v},this.getWeapon().fire(a)},this.setReloadTime=function(a){this.getWeapon().reloadIn(a)},this.changeWeapon=function(a){console.log("changing to weapon "+a),this._cWeapon=a},this.getWeapon=function(){return this._weapons[this._cWeapon]},this.getUsername=function(){return this._username},this.decreaseAngle=function(a){this._a-=50*a},this.increaseAngle=function(a){this._a+=50*a},this.decreaseVelocity=function(a){this._v-=60*a,this._v<25&&(this._v=25)},this.increaseVelocity=function(a){this._v+=60*a,this._v>200&&(this._v=200)},this.getLeft=function(){return this._x},this.getTop=function(){return this._y},this.getRight=function(){return this.getLeft()+16},this.getBottom=function(){return this.getTop()+32},this.spawn=function(a){this._x=a.x,this._y=a.y},this.getSide=function(){return this._side}},Player.factory=function(a){return console.log("Player::factory",a),new Player(a)};this.mbalert=function(a,b){var c=$(["<div class='modal hide fade'>","<div class='modal-body'>",a,"</div>","<div class='modal-footer'>","<a class='btn primary' href='#'>OK</a>","</div>","</div>"].join("\n"));$("body").append(c),c.bind("hidden",function(){c.remove()}),c.bind("shown",function(){$("a.primary",c).focus()}),c.bind("hide",function(){typeof b=="function"&&b()}),$("a",c).click(function(a){a.preventDefault(),c.modal("hide")}),c.modal({backdrop:"static",keyboard:!0,show:!0})},this.mbconfirm=function(a,b,c,d){var e,f;c==null&&(c="OK"),d==null&&(d="Cancel"),e=!1,f=$(["<div class='modal hide fade'>","<div class='modal-body'>",a,"</div>","<div class='modal-footer'>","<a class='btn primary' href='#'>"+c+"</a>","<a class='btn danger' href='#'>"+d+"</a>","</div>","</div>"].join("\n")),$("body").append(f),f.bind("hidden",function(){f.remove()}),f.bind("hide",function(){}),f.bind("shown",function(){$("a.primary",f).focus()}),$("a",f).click(function(a){var c;e=!0,c=$(this).hasClass("primary"),a.preventDefault(),f.modal("hide"),typeof b=="function"&&b(c)}),f.modal({backdrop:"static",show:!0})},this.mbmodal=function(a,b){var c,d,e,f="";for(c in b)d=b[c],f+="<a data-handler='"+c+"' class='btn "+d.class+"' href='#'>"+c+"</a>";e=$(["<div class='modal hide fade'>","<div class='modal-body'>",a,"</div>","<div class='modal-footer'>",f,"</div>","</div>"].join("\n")),e.bind("hidden",function(){e.remove()}),e.bind("hide",function(){}),e.bind("shown",function(){$("a.primary",e).focus()}),$("a",e).click(function(a){var c,d;a.preventDefault(),e.modal("hide"),c=$(this).data("handler"),d=b[c].callback,typeof d=="function"&&d()}),e.modal({backdrop:"static",show:!0}),$("body").append(e)},loadScript("/js/deps/bootstrap-modal.1.3.0.js");var ga=function(){var a={};return a.init=function(){console.log("game init"),b={"game:prepare":function(a){console.log("preparing game"),i.prepare(a)},"game:start":function(){console.log("starting game..."),i.start(d),h()},"game:weapon:fire":function(a){i.actuallyFireWeapon(a)},"game:weapon:fire:wait":function(a){i.reloadPlayerWeaponIn(a)},"game:powerup:spawn":function(a){i.actuallySpawnPowerup(a)},"game:powerup:claim":function(a){i.actuallyClaimPowerup(a)},"game:weapon:change":function(a){i.changePlayerWeapon(a)},"game:bullet:die":function(a){},"game:player:kill":function(a){i.actuallyKillPlayer(a)},"game:player:respawn":function(a){i.actuallyRespawnPlayer(a)},"game:player:chat":function(a){i.showChatMessage(a)},"game:timeup:rejected":function(a){i.delayTimeup(a)},"game:win":function(a){i.handleWin(a)},"game:lose":function(a){i.handleLose(a)},"game:cancel":function(a){i.cancelGame(a)},"game:suddendeath":function(){i.setSuddenDeath()}},$("#game #volume").click(function(a){a.preventDefault(),g.toggleSounds()}),d.emit("game:ready")},a}();var la=function(){var a={};return a.init=function(){console.log("lobby init"),b={"lobby:users":function(a){l.init(a)},"lobby:user:join":function(a){l.addUser(a)},"user:leave":function(a){l.removeUser(a)},"lobby:game:start":function(a){l.addGame(a)},"lobby:game:end":function(a){l.removeGame(a)},"lobby:challenge:receive":function(a){l.receiveChallenge(a)},"lobby:challenge:response":function(a){l.challengeResponse(a)},"lobby:challenge:blocked":function(){l.challengeBlocked()},"lobby:challenge:cancel":function(){l.cancelChallenge()},"lobby:challenge:cancel:invalid":function(){l.couldNotCancelChallenge()},"lobby:challenge:confirm":function(a){l.confirmChallenge(a)},"lobby:game:scorechange":function(a){l.updateGameScore(a)},"lobby:chat":function(a){l.addChatLine(a)}},d.emit("lobby:ready")},a}();var ra=function(){var a={},b={email:"",username:"",password:""};return a.init=function(){console.log("register init"),$("#register form input").bind("change keyup",function(a){var c=$.trim($(this).val());b[$(this).attr("name")]=c;var d=!0;for(var e in b)if(!b[e].length){d=!1;break}d&&($("#register form input").unbind(),$("#register p.alert-message").fadeIn())}),$("#register form").submit(function(a){a.preventDefault(),d.emit("register:register",$(this).serialize())})},a}();var wa=function(){return self={},self.init=function(){console.log("welcome init"),$("#login form").submit(function(a){a.preventDefault(),f.iOS()&&(g.playSound("weapon:fire"),g.pauseSound("weapon:fire")),d.emit("welcome:login",$(this).serialize())}),$("#login a.register").click(function(a){a.preventDefault(),d.emit("welcome:register")}),b={"welcome:count":function(a){var b=a.users,c=b!=1?"are":"is",d=b!=1?"users":"user",e=a.games,f=e!=1?"games":"game";$("#login form").after("<p>There "+c+" <strong>"+b+"</strong> active "+d+" and <strong>"+e+"</strong> "+f+" in progress right now.</p>")}},d.emit("welcome:ready")},self}()