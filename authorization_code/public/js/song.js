$(document).ready(function () {
    var userID;
    var baseURL;
    var myData;
    var searchQry;
    var trackID;
    var sendInfo;
    var Snapster;
    var playlists = [];
    var total;
    var totalVariable;
    var urlData;
    var jsonData;
    var obj;
    var userLink;
    var userData;
    var jData;
    var partyPlaylist;
    var count = {};
    $("#filename").keypress(function (event) {
        if (event.which === 13) {
            if (localStorage.getItem("lastFM") != "null" || localStorage.getItem("lastFM") != "") {
                partyPlaylist = [];
                baseURL = "https://api.spotify.com/v1/users/";
                userID = $('#userID2').html();
                searchQry = document.getElementById('filename').value;
                $.ajax({
                    type: "GET",
                    url: "https://api.spotify.com/v1/search?q=" + searchQry + "&type=track,artist&market=us&limit=50&offset=0",
                    headers: { 'Authorization': 'Bearer ' + access_token },
                    dataType: "json",
                    data: "formdata",
                    success: function (myData) {
                        $('#infoHeader').empty();
                        $('#infoHeader').append("Search Results");
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
                                if (playlists.indexOf("Partify") != -1) {
                                    for (i = 0; i < playlists.length; i++) {
                                        partyPlaylist = playlists.indexOf("Partify");
                                        localStorage['Snapster'] = data.items[partyPlaylist].id;
                                        Snapster = localStorage['Snapster'];
                                        console.log(Snapster);

                                    }
                                    localStorage['Snapster'] = data.items[partyPlaylist].id;
                                    Snapster = localStorage['Snapster'];
                                    $("#results").empty();
                                    
                                    for (i = 0; i < myData.tracks.items.length; i++) {
                                        $('#results').append("<header class='songLink'>" + myData.tracks.items[i].artists[0].name + "<br />" + myData.tracks.items[i].name + "</header><br/>");
                                        $(".songLink").eq(i).attr("id", "songLink" + i);
                                        $(".songLink").eq(i).attr("name", baseURL + userID + "/playlists/" + Snapster + "/tracks?&uris=spotify%3Atrack%3A" + myData.tracks.items[i].id);
                                        $('header#songLink' + i).on("click", function () {
                                            $.ajax({
                                                type: "POST",
                                                url: $(this).attr('name'),
                                                headers: { 'Authorization': 'Bearer ' + access_token },
                                                dataType: "json",
                                                data: "formdata",
                                                success: function (dataFirst) {
                                                    partyPlaylist = [];
                                                    console.log("playlist id=" + Snapster);
                                                    console.log("song id=" + myData.tracks.items.id);
                                                    $("#results").empty();
                                                    $("#results").css("text-align", "center");
                                                    $.ajax({
                                                        type: "GET",
                                                        url: "https://api.spotify.com/v1/users/" + userID + "/playlists/" + Snapster + "/tracks",
                                                        headers: { 'Authorization': 'Bearer ' + access_token },
                                                        dataType: "json",
                                                        data: "formdata",
                                                        success: function (currentPLData) {
                                                            for (i = 0; i < currentPLData.items.length; i++) {
                                                                $('#infoHeader').empty();
                                                                $('#infoHeader').append("Upcoming Songs");
                                                                $('#results').append("<header alt='0'  onClick='songLinkClick();' class='songLinkCurrent'>" + currentPLData.items[i].track.artists[0].name + "<br />" + currentPLData.items[i].track.name + "</header><br/>");
                                                                $(".songLinkClick").eq(i).attr("id", "songLinkClick" + i);
                                                                $("header#songLinkClick" + i).on("click", songLinkClick());
                                                            }
                                                            $("#filename").val("");

                                                        }
                                                    });
                                                }
                                            });
                                        });

                                    }
                                }
                            }
                        });
                    }
                });
            }

            else {
                var userPrompt = prompt("Enter Your LastFM Username");
                localStorage.setItem("lastFM", userPrompt);
            }
        }
    });
});
