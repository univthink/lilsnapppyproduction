$(document).ready(function () {
    $('#results').empty;
    var userID = localStorage['userID'];
    var Snapster;
    var playlists = [];
    var currentTracks = [];
    var j;
    var obj = {};
    var sendInfo;
    localStorage["totalSongs"] = 0;
    localStorage["currentlyPlayingWC"] = "";
    localStorage["currentlyPlaying"] = "";
    localStorage["currentTrack"] = 0;
    localStorage["offsetNumber"] = 0;
    partyPlaylist = 0;
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
                localStorage["currentlyPlayingID"] = currentData.recenttracks.track[0].id;
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
                    currentTracks[i] = trackData.items[i].track.name.toUpperCase();
                }
                console.log(currentTracks);
                localStorage["totalSongs"] = currentTracks.length;
                localStorage["currentlyPlayingWC"] = localStorage["currentlyPlaying"].replace(/,/g, '');
                localStorage["currentTrack"] = currentTracks.indexOf(localStorage["currentlyPlayingWC"]);
                for (i = 0; i < currentTracks.length; i++) {
                    if (localStorage["currentTrack"] >= 5) {
                        localStorage["offsetNumber"] = localStorage["currentTrack"] - 4;
                    }
                    else {
                        localStorage["offsetNumber"] = 0;
                    }
                    currentTracks = [];
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
                    $.ajax( {
                        type: "GET",
                        url: "https://api.spotify.com/v1/users/" + userID + "/playlists/" + localStorage['Snapster'] + "/tracks?limit=100&offset=" + localStorage["offsetNumber"],
                        headers: { 'Authorization': 'Bearer ' + access_token },
                        dataType: "json",
                        data: "formdata",
                        success: function (currentPLData) {
                            $('#results').empty();
                            for (i = 0; i < currentPLData.items.length; i++) {
                                $('#results').append("<header alt='" + i + "' style='color: gray;' class='songLinkClick' id='songLinkClick" + i + "'>" + currentPLData.items[i].track.artists[0].name + "<br />" + currentPLData.items[i].track.name + "</header><br/>");
                            }

                            for (i = 0; i < localStorage["totalSongs"] + 1; i++) {
                                if (i >= localStorage["currentTrack"] && localStorage["currentTrack"] > 3) {
                                    document.getElementById("songLinkClick" + 4).style.color = "pink";
                                    $(".songLinkClick:gt(4)").css("color", "white");
                                }
                                else if (i >= localStorage["currentTrack"] && localStorage["currentTrack"] == 0) {
                                    document.getElementById("songLinkClick" + 0).style.color = "pink";
                                    $(".songLinkClick:gt(0)").css("color", "white");
                                }
                                else if (i >= localStorage["currentTrack"] && localStorage["currentTrack"] == 1) {
                                    document.getElementById("songLinkClick" + 1).style.color = "pink";
                                    $(".songLinkClick:gt(1)").css("color", "white");
                                }
                                else if (i >= localStorage["currentTrack"] && localStorage["currentTrack"] == 2) {
                                    document.getElementById("songLinkClick" + 2).style.color = "pink";
                                    $(".songLinkClick:gt(2)").css("color", "white");
                                }
                                else if (i >= localStorage["currentTrack"] && localStorage["currentTrack"] == 3) {
                                    document.getElementById("songLinkClick" + 3).style.color = "pink";
                                    $(".songLinkClick:gt(3)").css("color", "white");
                                }

                            }
<<<<<<< HEAD
                            console.log(localStorage["totalSongs"]);
                            for (i = 0; i < localStorage["totalSongs"]; i++) {
                            $(document).on('click', '#songLinkClick' + i, function () {
                                  if (confirm("Are you sure?"){
=======
                          console.log(localStorage["totalSongs"]);
                            for (i = 0; i < localStorage["totalSongs"]; i++) {
                              if ($(window).width() < 500) {
                            $(document).on('click', '#songLinkClick' + i, function () {
                                    if (confirm("Are you sure?")) {
>>>>>>> 9a196870678efea9b82b8bb55000873361f02226
                                    var id = $(this).attr("id");
                                    id = id.substr(13);
                                    id = (id*1 + localStorage["offsetNumber"]*1);
                                    console.log(id)
                                    localStorage["songRequest"] = i;
                                    localStorage["songRequest"] = localStorage["songRequest"].replace("\"", '');
                                    obj["range_start"] = id;
                                    obj["range_length"] = 1;
                                    obj["insert_before"] = parseInt(localStorage["currentTrack"]) + 1;
                                    console.log("Clicked");
                                $.ajax({
                                    type: "PUT",
                                    url: "https://api.spotify.com/v1/users/" + localStorage["userID"] + "/playlists/" + localStorage["Snapster"] + "/tracks",
                                    headers: { 'Authorization': 'Bearer ' + access_token },
                                    dataType: "json",
                                    data: JSON.stringify(obj),
                                    success: function (dataFirst) {
                                        partyPlaylist = [];
                                        $("#results").empty();
                                        $("#results").css("text-align", "center");
                                        console.log("Success");
                                        localStorage["songRequest"] = 0;
                                        id = 0;
                                        $.ajax( {
                                            type: "GET",
<<<<<<< HEAD
                                            url: "https://api.spotify.com/v1/users/" + userID + "/playlists/" + Snapster + "/tracks?limit=100&offset=" + localStorage["offsetNumber"],
=======
                                            url: "https://api.spotify.com/v1/users/" + userID + "/playlists/" + localStorage['Snapster'] + "/tracks?limit=100&offset=" + localStorage["offsetNumber"],
>>>>>>> 9a196870678efea9b82b8bb55000873361f02226
                                            headers: { 'Authorization': 'Bearer ' + access_token },
                                            dataType: "json",
                                            data: "formdata",
                                            success: function (currentPLData) {
                                                $('#results').empty();
                                                for (i = 0; i < currentPLData.items.length; i++) {
                                                    $('#results').append("<header alt='" + i + "' style='color: gray;' class='songLinkClick' id='songLinkClick" + i + "'>" + currentPLData.items[i].track.artists[0].name + "<br />" + currentPLData.items[i].track.name + "</header><br/>");
                                                }

                                                for (i = 0; i < localStorage["totalSongs"] + 1; i++) {
                                                    if (i >= localStorage["currentTrack"] && localStorage["currentTrack"] > 3) {
                                                        document.getElementById("songLinkClick" + 4).style.color = "pink";
                                                        $(".songLinkClick:gt(4)").css("color", "white");
                                                    }
                                                    else if (i >= localStorage["currentTrack"] && localStorage["currentTrack"] == 0) {
                                                        document.getElementById("songLinkClick" + 0).style.color = "pink";
                                                        $(".songLinkClick:gt(0)").css("color", "white");
                                                    }
                                                    else if (i >= localStorage["currentTrack"] && localStorage["currentTrack"] == 1) {
                                                        document.getElementById("songLinkClick" + 1).style.color = "pink";
                                                        $(".songLinkClick:gt(1)").css("color", "white");
                                                    }
                                                    else if (i >= localStorage["currentTrack"] && localStorage["currentTrack"] == 2) {
                                                        document.getElementById("songLinkClick" + 2).style.color = "pink";
                                                        $(".songLinkClick:gt(2)").css("color", "white");
                                                    }
                                                    else if (i >= localStorage["currentTrack"] && localStorage["currentTrack"] == 3) {
                                                        document.getElementById("songLinkClick" + 3).style.color = "pink";
                                                        $(".songLinkClick:gt(3)").css("color", "white");
                                                    }

                                                }
                                              }
                                            });
                                    }
                                });
                                console.log(obj);
                              }
                            });
                          }
<<<<<<< HEAD
=======
                        }
>>>>>>> 9a196870678efea9b82b8bb55000873361f02226
                                        for (i = 0; i < localStorage["totalSongs"]; i++) {
                                        $(document).on('dblclick', '#songLinkClick' + i, function () {
                                              if (confirm("Are you sure?")) {
                                                var id = $(this).attr("id");
                                                id = id.substr(13);
                                                id = (id*1 + localStorage["offsetNumber"]*1);
                                                console.log(id)
                                                localStorage["songRequest"] = i;
                                                localStorage["songRequest"] = localStorage["songRequest"].replace("\"", '');
                                                obj["range_start"] = id;
                                                obj["range_length"] = 1;
                                                obj["insert_before"] = parseInt(localStorage["currentTrack"]) + 1;
                                                console.log("Clicked");
                                            $.ajax({
                                                type: "PUT",
                                                url: "https://api.spotify.com/v1/users/" + localStorage["userID"] + "/playlists/" + localStorage["Snapster"] + "/tracks",
                                                headers: { 'Authorization': 'Bearer ' + access_token },
                                                dataType: "json",
                                                data: JSON.stringify(obj),
                                                success: function (dataFirst) {
                                                    partyPlaylist = [];
                                                    $("#results").empty();
                                                    $("#results").css("text-align", "center");
                                                    console.log("Success");
                                                    localStorage["songRequest"] = 0;
                                                    id = 0;
                                                    $.ajax( {
                                                        type: "GET",
<<<<<<< HEAD
                                                        url: "https://api.spotify.com/v1/users/" + userID + "/playlists/" + Snapster + "/tracks?limit=100&offset=" + localStorage["offsetNumber"],
=======
                                                        url: "https://api.spotify.com/v1/users/" + userID + "/playlists/" + localStorage['Snapster'] + "/tracks?limit=100&offset=" + localStorage["offsetNumber"],
>>>>>>> 9a196870678efea9b82b8bb55000873361f02226
                                                        headers: { 'Authorization': 'Bearer ' + access_token },
                                                        dataType: "json",
                                                        data: "formdata",
                                                        success: function (currentPLData) {
                                                            $('#results').empty();
                                                            for (i = 0; i < currentPLData.items.length; i++) {
                                                                $('#results').append("<header alt='" + i + "' style='color: gray;' class='songLinkClick' id='songLinkClick" + i + "'>" + currentPLData.items[i].track.artists[0].name + "<br />" + currentPLData.items[i].track.name + "</header><br/>");
                                                            }

                                                            for (i = 0; i < localStorage["totalSongs"] + 1; i++) {
                                                                if (i >= localStorage["currentTrack"] && localStorage["currentTrack"] > 3) {
                                                                    document.getElementById("songLinkClick" + 4).style.color = "pink";
                                                                    $(".songLinkClick:gt(4)").css("color", "white");
                                                                }
                                                                else if (i >= localStorage["currentTrack"] && localStorage["currentTrack"] == 0) {
                                                                    document.getElementById("songLinkClick" + 0).style.color = "pink";
                                                                    $(".songLinkClick:gt(0)").css("color", "white");
                                                                }
                                                                else if (i >= localStorage["currentTrack"] && localStorage["currentTrack"] == 1) {
                                                                    document.getElementById("songLinkClick" + 1).style.color = "pink";
                                                                    $(".songLinkClick:gt(1)").css("color", "white");
                                                                }
                                                                else if (i >= localStorage["currentTrack"] && localStorage["currentTrack"] == 2) {
                                                                    document.getElementById("songLinkClick" + 2).style.color = "pink";
                                                                    $(".songLinkClick:gt(2)").css("color", "white");
                                                                }
                                                                else if (i >= localStorage["currentTrack"] && localStorage["currentTrack"] == 3) {
                                                                    document.getElementById("songLinkClick" + 3).style.color = "pink";
                                                                    $(".songLinkClick:gt(3)").css("color", "white");
                                                                }

                                                            }
                                                          }
                                                        });
                                                }

                                            });
                                            console.log(obj);
}
                                        });
                                      }
                        }
                    });
                    playlists = [];
                    currentTracks = [];
                }
            }

        });

    }
<<<<<<< HEAD

=======
    for (i = 0; i < localStorage["totalSongs"] + 1; i++) {
        if (i >= localStorage["currentTrack"] && localStorage["currentTrack"] > 3) {
            document.getElementById("songLinkClick" + 4).style.color = "pink";
            $(".songLinkClick:gt(4)").css("color", "white");
        }
        else if (i >= localStorage["currentTrack"] && localStorage["currentTrack"] == 0) {
            document.getElementById("songLinkClick" + 0).style.color = "pink";
            $(".songLinkClick:gt(0)").css("color", "white");
        }
        else if (i >= localStorage["currentTrack"] && localStorage["currentTrack"] == 1) {
            document.getElementById("songLinkClick" + 1).style.color = "pink";
            $(".songLinkClick:gt(1)").css("color", "white");
        }
        else if (i >= localStorage["currentTrack"] && localStorage["currentTrack"] == 2) {
            document.getElementById("songLinkClick" + 2).style.color = "pink";
            $(".songLinkClick:gt(2)").css("color", "white");
        }
        else if (i >= localStorage["currentTrack"] && localStorage["currentTrack"] == 3) {
            document.getElementById("songLinkClick" + 3).style.color = "pink";
            $(".songLinkClick:gt(3)").css("color", "white");
        }

    }
>>>>>>> 9a196870678efea9b82b8bb55000873361f02226
});
