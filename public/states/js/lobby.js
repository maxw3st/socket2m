(function() {
    var user = null;
    function addUser(_user) {
        var _class = (_user.sid == user.sid) ? "me" : "";
        return $("<li data-id='"+_user.sid+"' class='"+_class+"'>"+_user.username+"</li>");
    }

    function bindListeners() {
        $("#users ul").unbind('dblclick');
        $("#users ul").bind('dblclick', function(e) {
            var elem = $(e.target);
            // jQuery.data() barfs at large ID values, so we have to use attr. Oh well.
            var targetId = elem.attr("data-id");
            if (targetId != null && targetId != user.sid) {
                // excellent! challenge time
                mbconfirm("Do you want to challenge "+elem.html()+"?", function(result) {
                    // boom!
                    if (result) {
                        console.log("issuing challenge to "+targetId);
                        socket.emit('challenge:issue', targetId);
                    }
                }, "Yes", "No");
            }
        });
    }

    socket.on('userlist', function(data) {
        user = data.user;
        console.log('adding users');
        var ul = $("<ul></ul>");
        for (var i in data.users) {
            ul.append(addUser(data.users[i]));
        }
        $("#users").append(ul);

        bindListeners();
    });

    socket.on('user:join', function(user) {
        var li = addUser(user);
        li.hide();
        $("#users ul").append(li);
        li.fadeIn('slow');

        bindListeners();
    });

    socket.on('user:leave', function(id) {
        $("#users ul li[data-id='"+id+"']").fadeOut('slow', function() {
            $(this).remove();
        });
    });

    socket.on('challenge:receive', function(from) {
        mbconfirm("Incoming challenge from "+from.username+" - accept?", function(result) {
            socket.emit('challenge:respond', result);
        }, "Yes", "No");
    });

    socket.on('challenge:response', function(accepted) {
        if (accepted) {
            console.log("requesting game start...");
            socket.emit('startgame');
        }
    });

})();

socket.emit('lobby:ready');
