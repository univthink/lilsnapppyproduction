$(document).ready(function () {
    $('#results').empty;
    var userID = localStorage['userID'];
    var Snapster;
    var playlists = [];
    var currentTracks = [];
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
                localStorage["currentlyPlaying"] = currentData.recenttracks.track[0].name;
            }
        });
        
        $.ajax( {
            type: "GET",
            url: "https://api.spotify.com/v1/users/" + userID + "/playlists/" + localStorage["Snapster"] + "/tracks",
            headers: { 'Authorization': 'Bearer ' + access_token },
            dataType: "json",
            data: "formdata",
            success: function (trackData) {
                currentTracks = [];
                for (i = 0; i < trackData.items.length; i++) {
                    currentTracks.push(trackData.items[i].track.name);
                }
                localStorage["currentTrack"] = currentTracks.indexOf(localStorage["currentlyPlaying"]);
                if (localStorage["currentTrack"] > 4) {
                    localStorage["currentTrackNumber"] = currentTracks.length - (currentTracks.length - localStorage["currentTrack"]);
                    localStorage["offsetNumber"] = currentTracks.length - (currentTracks.length - localStorage["currentTrack"]) - 4;
                }
                else if (localStorage["currentTrack"] == 4) {
                    localStorage["currentTrackNumber"] = currentTracks.length - (currentTracks.length - localStorage["currentTrack"]);
                    localStorage["offsetNumber"] = currentTracks.length - (currentTracks.length - localStorage["currentTrack"]) - 4;
                }
                else if (localStorage["currentTrack"] == 3) {
                    localStorage["currentTrackNumber"] = currentTracks.length - (currentTracks.length - localStorage["currentTrack"]);
                    localStorage["offsetNumber"] = currentTracks.length - (currentTracks.length - localStorage["currentTrack"]) - 3;
                }
                else if (localStorage["currentTrack"] ==  2) {
                    localStorage["currentTrackNumber"] = currentTracks.length - (currentTracks.length - localStorage["currentTrack"]);
                    localStorage["offsetNumber"] = currentTracks.length - (currentTracks.length - localStorage["currentTrack"]) - 2;
                }
                else if (localStorage["currentTrack"] ==  1) {
                    localStorage["currentTrackNumber"] = currentTracks.length - (currentTracks.length - localStorage["currentTrack"]);
                    localStorage["offsetNumber"] = currentTracks.length - (currentTracks.length - localStorage["currentTrack"]) - 1;
                }
                else if (localStorage["currentTrack"] == 0) {
                    localStorage["currentTrackNumber"] = currentTracks.length - (currentTracks.length - localStorage["currentTrack"]);
                    localStorage["offsetNumber"] = currentTracks.length - (currentTracks.length - localStorage["currentTrack"]);
                }
                currentTracks = [];
                console.log(localStorage["currentTrack"] + " " + localStorage["offsetNumber"] + localStorage["currentTrackNumber"]);
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
                                $('#results').append("<header alt='0' class='songLinkClick' id='songLinkClick" + i + "'>" + currentPLData.items[i].track.artists[0].name + "<br />" + currentPLData.items[i].track.name + "</header><br/>");
                            }
                            if (localStorage["currentTrackNumber"] > 4) {
                                document.getElementById("songLinkClick0").style.color = "gray";
                                document.getElementById("songLinkClick1").style.color = "gray";
                                document.getElementById("songLinkClick2").style.color = "gray";
                                document.getElementById("songLinkClick3").style.color = "gray";
                                document.getElementById("songLinkClick4").style.color = "#ec6a70";
                            }
                            else if (localStorage["currentTrackNumber"] == 4) {
                                document.getElementById("songLinkClick0").style.color = "gray";
                                document.getElementById("songLinkClick1").style.color = "gray";
                                document.getElementById("songLinkClick2").style.color = "gray";
                                document.getElementById("songLinkClick3").style.color = "gray";
                                document.getElementById("songLinkClick4").style.color = "#ec6a70";
                            }
                            else if (localStorage["currentTrackNumber"] == 3) {
                                document.getElementById("songLinkClick0").style.color = "gray";
                                document.getElementById("songLinkClick1").style.color = "gray";
                                document.getElementById("songLinkClick2").style.color = "gray";
                                document.getElementById("songLinkClick3").style.color = "#ec6a70";
                            }
                            else if (localStorage["currentTrackNumber"] == 2) {
                                document.getElementById("songLinkClick0").style.color = "gray";
                                document.getElementById("songLinkClick1").style.color = "gray";
                                document.getElementById("songLinkClick2").style.color = "#ec6a70";
                            }
                            else if (localStorage["currentTrackNumber"] == 1) {
                                document.getElementById("songLinkClick0").style.color = "gray";
                                document.getElementById("songLinkClick1").style.color = "#ec6a70";
                            }
                            else if (localStorage["currentTrackNumber"] == 0) {
                                document.getElementById("songLinkClick0").style.color = "#ec6a70";
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
