let MASTERSERVER_IP = "master.aceattorneyonline.com:27016";
//  TODO split junk to a module
let masterserver = new WebSocket("ws://" + MASTERSERVER_IP);
masterserver.onopen = onOpen;
masterserver.onclose = onClose;
masterserver.onmessage = onMessage;
masterserver.onerror = onError;
// TODO rip this out
let idnow;
let descs = [];
descs[99]="This is your computer on port 27016";
let onlinec = [];
let serverpics = [];

// TODO rip out or fix, never used
function setServ(ID) {
    // console.log(descs[ID]);
    if (descs[ID] != undefined) {
        document.getElementById("serverdescC").innerHTML = "<b>Online: "+onlinec[ID]+"</b><br>" +descs[ID];
    }
    else {
        document.getElementById("serverdescC").innerHTML = "";
    }
//	idnow = ID;
//	document.getElementById("serverthumbC").src = serverpics[ID];
//	if (UrlExists(serverpics[ID])) {
//		document.getElementById("serverthumbC").src = serverpics[ID];
//	}
//	else {
//		document.getElementById("serverthumbC").src = "/images/static.gif";
//	}
}

function onOpen() {
    // console.log("Open");
    masterserver.send("askforservers#%");
    masterserver.send("VC#%");
}

function checkOnline(serverID,coIP) {
    function onCOOpen() {
        // console.log("Open");
        // console.log("YES");
        oserv.send("HI#" + navigator.userAgent + "#%");
        oserv.send("ID#webAO#2.4.5#%");
    }
    function onCOMessage(e) {
        let comsg = e.data;
        // console.log(comsg);
        // console.log("YES");
        let coheader = comsg.split("#", 2)[0];
        let coarguments = comsg.split("#").slice(1);
        if (coheader == "PN") {
            onlinec[serverID] = `${coarguments[0]}/${coarguments[1]}`;
            document.getElementById(`server${serverID}`).className = "available";
            oserv.close();
        }
    }

    // TODO rename, what is oserv
    let oserv = new WebSocket("ws://" + coIP);
    oserv.onopen = onCOOpen;
    oserv.onmessage = onCOMessage;
    
}

function onMessage(e) {
    let msg = e.data;
    // console.log(msg);
    let header = msg.split("#", 2)[0];
    let args = msg.split("#").slice(1);
    if (header == "SN") {
        // console.log(args[2].substring(0, 7));
        // TODO delete, never used
        // let unavv;
        // if (args[2].substring(0, 7) == "serverD") {
        //     unavv = "class='available' ";
        // }
        // else if (args[2] == "VANILLA"){
        //     unavv = "class='unavailable' ";
        // } else {
        //     unavv = "";
        // }
        document.getElementById("masterlist").innerHTML += `<li id="server${args[0]}" onmouseover="setServ(${args[0]})">
            <p>${args[4]}</p> 
            <a class="button" href="client.html?mode=watch&ip=${args[1]}:${args[3]}">Watch</a>
            <a class="button" href="client.html?mode=join&ip=${args[1]}:${args[3]}">Join</a>
        </li>
        <br/>`;
        serverpics[args[0]] = args[2];
        descs[args[0]] = args[5];
        setTimeout(checkOnline(args[0],`${args[1]}:${args[3]}`), 3);
    }
    else if (header == "servercheok") {
        document.getElementById("clientinfo").innerHTML = `Client version - ${args[0]}`;
    }
    else if (header == "SV") {
        document.getElementById("serverinfo").innerHTML = `Masterserver version - ${args[0]}`;
    }
}

function onError() {
    //Stub
}

function onClose() {
    //Stub
}
