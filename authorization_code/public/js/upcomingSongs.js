$(document).ready(function () {
    $('#results').empty;
    var userID = localStorage['userID'];
    var Snapster;
    var playlists = [];
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
                $('#footer2').append("<header alt='0' class='currentSong' id='currentSong'>" + currentData.recenttracks.track[0].artist['name'] + "<br />" + currentData.recenttracks.track[0].name + "</header><br/>");
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
                    url: "https://api.spotify.com/v1/users/" + userID + "/playlists/" + Snapster + "/tracks",
                    headers: { 'Authorization': 'Bearer ' + access_token },
                    dataType: "json",
                    data: "formdata",
                    success: function (currentPLData) {
                        $('#results').empty();
                        for (i = 0; i < currentPLData.items.length; i++) {
                                $('#results').append("<header alt='0' class='songLinkClick' id='songLinkClick" + i + "'>" + currentPLData.items[i].track.artists[0].name + "<br />" + currentPLData.items[i].track.name + "</header><br/>");
                        }
                    }
                });
                playlists = [];
            }
        }

   });
}
});
