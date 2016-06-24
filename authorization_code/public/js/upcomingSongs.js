$(document).ready(function () {
    $('#results').empty;
    var userID = localStorage['userID'];
    var Snapster;
    var playlists = [];
    var currentTracks = [];
    var j;
    // $("#filename").focus(function (event) {
    $('#infoHeader').empty();
    $('#infoHeader').append("Upcoming Songs");
    if (localStorage.getItem("lastFM") != "null" || localStorage.getItem("lastFM") != "") {
        $.ajax({
            type: "GET",
            url: "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=" + localStorage.getItem("lastFM") + "&api_key=9fc54977379828d52d1d779dc62f569b&format=json",
            dataType: "json",
            data: "formdata",
            success: function (currentData) {
                $('#footer2').append("<header alt='0' class='currentSong' id='currentSong'>" + currentData.recenttracks.track[0].artist['#text'] + " - " + "<em>" + currentData.recenttracks.track[0].name + "</em>" + "</header><br/>");
                localStorage["currentlyPlaying"] = currentData.recenttracks.track[0].name.toUpperCase();
            }
        });
        
        $.ajax({
            type: "GET",
            url: "https://api.spotify.com/v1/users/" + userID + "/playlists/" + localStorage["Snapster"] + "/tracks",
            headers: { 'Authorization': 'Bearer ' + access_token },
            dataType: "json",
            data: "formdata",
            success: function (trackData) {
                currentTracks = [];
                for (i = 0; i < trackData.items.length; i++) {
                    currentTracks.push(trackData.items[i].track.name.toUpperCase());
                }
                localStorage["songArray"] = currentTracks;
                localStorage["currentlyPlayingWC"] = localStorage["currentlyPlaying"].replace(/,/g, '');
                localStorage["currentTrack"] = currentTracks.indexOf(localStorage["currentlyPlayingWC"]);
                console.log(localStorage["songArray"]);
                console.log(localStorage["currentTrack"]);
                console.log(currentTracks);
                console.log(localStorage["currentlyPlaying"]);
                for (i = 0; i < currentTracks.length; i++) {
                    if (localStorage["currentTrack"] >= 5) {
                        localStorage["offsetNumber"] = localStorage["currentTrack"] - 4;
                    }
                    else {
                        localStorage["offsetNumber"] = 0;
                    }
                    currentTracks = [];
                    console.log(localStorage["currentTrack"] + " " + localStorage["offsetNumber"] + localStorage["currentTrackNumber"]);
                }
            }
        });
        $.ajax({
            type: "GET",
            url: "https://api.spotify.com/v1/users/" + userID + "/playlists",
            headers: { 'Authorization': 'Bearer ' + access_token },
            dataType: "json",
            data: "formdata",
            success: function (data) {
                for (i = 0; i < data.items.length; i++) {
                    playlists.push(data.items[i].name);
                }
                partyPlaylist = playlists.indexOf("Partify");
                if (playlists.indexOf("Partify") != -1 && data.items[partyPlaylist].id === localStorage['Snapster']) {
                    for (i = 0; i < data.items.length; i++) {
                        localStorage['Snapster'] = data.items[partyPlaylist].id;
                        Snapster = localStorage['Snapster'];
                    }
                    $("#results").css("text-align", "center");
                    $.ajax({
                        type: "GET",
                        url: "https://api.spotify.com/v1/users/" + userID + "/playlists/" + Snapster + "/tracks?limit=100&offset=" + localStorage["offsetNumber"],
                        headers: { 'Authorization': 'Bearer ' + access_token },
                        dataType: "json",
                        data: "formdata",
                        success: function (currentPLData) {
                            $('#results').empty();
                            for (i = 0; i < currentPLData.items.length; i++) {
                                $('#results').append("<header alt='" + currentPLData.items[i].track.id + "' style='color: gray;' class='songLinkClick' id='songLinkClick" + i + "'>" + currentPLData.items[i].track.artists[0].name + "<br />" + currentPLData.items[i].track.name + "</header><br/>");
                               /* if (i == localStorage["currentTrack"] - 1) {
                                    $('#results').append("<header alt='0' style='color: yellow;' class='songLinkClick' id='songLinkClick" + i + "'>" + currentPLData.items[i].track.artists[0].name + "<br />" + currentPLData.items[i].track.name + "</header><br/>");
                                }*/
                            }
                           
                            for (i = 0; i < localStorage["songArray"].length + 1; i++) {
                                if (i >= localStorage["currentTrack"] && localStorage["currentTrack"] > 3) {
                                    document.getElementById("songLinkClick" + 4).style.color = "#00FF00";
                                    $(".songLinkClick:gt(4)").css("color", "white");
                                    console.log("HI");        
                                }
                                else if (i >= localStorage["currentTrack"] && localStorage["currentTrack"]  == 0) {
                                    document.getElementById("songLinkClick" + 0).style.color = "#00FF00";
                                    $(".songLinkClick:gt(0)").css("color", "white");
                                }
                                else if (i >= localStorage["currentTrack"] && localStorage["currentTrack"]  == 1) {
                                    document.getElementById("songLinkClick" + 1).style.color = "#00FF00";
                                    $(".songLinkClick:gt(1)").css("color", "white");
                                }
                                else if (i >= localStorage["currentTrack"] && localStorage["currentTrack"]  == 2) {
                                    document.getElementById("songLinkClick" + 2).style.color = "#00FF00";
                                    $(".songLinkClick:gt(2)").css("color", "white");
                                }
                                else if (i >= localStorage["currentTrack"] && localStorage["currentTrack"]  == 3) {
                                    document.getElementById("songLinkClick" + 3).style.color = "#00FF00";
                                    $(".songLinkClick:gt(3)").css("color", "white");
                                    console.log("ahoy");
                                }
                                alert(i);
                                alert(localStorage["currentTrack"])
                            }
                            
                            localStorage["currentTrack"] = 0;
                            localStorage["currentlyPlaying"] = 0;
                            localStorage["currentTrackNumber"] = 0;
                            currentTracks = [];
                        }
                    });
                    playlists = [];
                }
            }

        });

    }
});
