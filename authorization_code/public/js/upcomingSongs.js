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
        
        $.ajax({
            type: "GET",
        url: "https://api.spotify.com/v1/users/" + userID + "/playlists/" + localStorage["Snapster"] +"/tracks",
            headers: { 'Authorization': 'Bearer ' + access_token },
            dataType: "json",
            data: "formdata",
            success: function (trackData) {
                currentTracks = [];
                for (i = 0; i < trackData.items.length; i++) {
                    currentTracks.push(trackData.items[i].track.name);
                }
                localStorage["currentlyPlaying"] = currentTracks.indexOf(localStorage["currentlyPlaying"]);
                if (localStorage["currentlyPlaying"]  > 4) {
                    localStorage["currentTrackNumber"] = localStorage["currentlyPlaying"] - 5;
                }
                else if (localStorage["currentlyPlaying"] == 4) {
                    localStorage["currentTrackNumber"] = localStorage["currentlyPlaying"] - 4;
                }
                else if (localStorage["currentlyPlaying"] == 3) {
                    localStorage["currentTrackNumber"] = localStorage["currentlyPlaying"] - 3;
                }
                else if (localStorage["currentlyPlaying"] ==  2) {
                    localStorage["currentTrackNumber"] = localStorage["currentlyPlaying"] - 2;
                }
                else if (localStorage["currentlyPlaying"] ==  1) {
                    localStorage["currentTrackNumber"] = localStorage["currentlyPlaying"] - 1;
                }
                else if (localStorage["currentlyPlaying"] == 0) {
                    localStorage["currentTrackNumber"] = 0;
                }
                else if (localStorage["currentlyPlaying"] < 0) {
                    localStorage["currentTrackNumber"] = currentTracks.length - 5;
                }
                currentTracks = [];
                console.log(localStorage["currentTrackNumber"] + " " + localStorage["currentTrackNumber"]);
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
                    url: "https://api.spotify.com/v1/users/" + userID + "/playlists/" + Snapster + "/tracks?limit=100&offset=" + localStorage["currentTrackNumber"],
                    headers: { 'Authorization': 'Bearer ' + access_token },
                    dataType: "json",
                    data: "formdata",
                    success: function (currentPLData) {
                        $('#results').empty();
                        for (i = 0; i < currentPLData.items.length; i++) {
                                $('#results').append("<header alt='0' class='songLinkClick' id='songLinkClick" + i + "'>" + currentPLData.items[i].track.artists[0].name + "<br />" + currentPLData.items[i].track.name + "</header><br/>");
                            }
                            if (localStorage["currentlyPlaying"] > 4) {
                                document.getElementById("songLinkClick0").style.color = "gray";
                                document.getElementById("songLinkClick1").style.color = "gray";
                                document.getElementById("songLinkClick2").style.color = "gray";
                                document.getElementById("songLinkClick3").style.color = "gray";
                                document.getElementById("songLinkClick4").style.color = "#ec6a70";
                            }
                            else if (localStorage["currentlyPlaying"] == 4) {
                                document.getElementById("songLinkClick0").style.color = "gray";
                                document.getElementById("songLinkClick1").style.color = "gray";
                                document.getElementById("songLinkClick2").style.color = "gray";
                                document.getElementById("songLinkClick3").style.color = "gray";
                                document.getElementById("songLinkClick4").style.color = "#ec6a70";
                            }
                            else if (localStorage["currentlyPlaying"] == 3) {
                                document.getElementById("songLinkClick0").style.color = "gray";
                                document.getElementById("songLinkClick1").style.color = "gray";
                                document.getElementById("songLinkClick2").style.color = "gray";
                                document.getElementById("songLinkClick3").style.color = "#ec6a70";
                            }
                            else if (localStorage["currentlyPlaying"] == 2) {
                                document.getElementById("songLinkClick0").style.color = "gray";
                                document.getElementById("songLinkClick1").style.color = "gray";
                                document.getElementById("songLinkClick2").style.color = "#ec6a70";
                            }
                            else if (localStorage["currentlyPlaying"] == 1) {
                                document.getElementById("songLinkClick0").style.color = "gray";
                                document.getElementById("songLinkClick1").style.color = "#ec6a70";
                            }
                            else if (localStorage["currentlyPlaying"] == 0) {
                                document.getElementById("songLinkClick0").style.color = "#ec6a70";
                            }
                            else if (localStorage["currentlyPlaying"] < 0) {
                                document.getElementById("songLinkClick0").style.color = "gray";
                                document.getElementById("songLinkClick1").style.color = "gray";
                                document.getElementById("songLinkClick2").style.color = "gray";
                                document.getElementById("songLinkClick3").style.color = "gray";
                                document.getElementById("songLinkClick4").style.color = "#ec6a70";
                            }
                    }
                });
                playlists = [];
            }
        }

   });
}
});
