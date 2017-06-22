var Hotel={
    rooms: [{id:1,type:"standard"},
             {id:2,type:"standard"},
             {id:3,type:"standard"},
             {id:4,type:"standard"},
             {id:5,type:"standard"},
             {id:6,type:"standard"},
             {id:7,type:"standard"},
             {id:8,type:"standard"},
             {id:9,type:"lux"},
             {id:10,type:"lux"},
             {id:11,type:"lux"},
             {id:12,type:"lux"},
             {id:13,type:"lux"},
             {id:14,type:"lux"},
             {id:15,type:"lux"},
             {id:16,type:"economy"},
             {id:17,type:"economy"},
             {id:18,type:"economy"},
             {id:19,type:"economy"},
             {id:20,type:"economy"}],
    percentBusy: 0.3,
    numbOfRooms: 20,
    numbOfBusyRooms: 6,
    /*numbOfBusyRooms: function(){
     return this.percentBusy * this.numbOfRooms
     },*/
    checkRoom: function(id){
        if (this.rooms[id].guest){
            return true;
        }
    },

    checkIn: function(){
        for (var i=0; i < this.numbOfBusyRooms; i++){
            do {
                var j = Math.floor( Math.random() * this.rooms.length );
            } while (this.checkRoom(j));
            this.rooms[j].guest = faker.name.findName();
        }
    },

    showGuest: function(){
        for (var i=0;i<this.rooms.length;i++){
            if (this.rooms[i].guest){
                console.log(this.rooms[i]);
            }
        }
    },

    roomWithGuest: function(){
        for (var i=0;i<this.rooms.length;i++){
            if(this.checkRoom(i)) {
                var roomId = this.rooms[i].id,
                    Info = document.createElement('span');
                    Info.innerHTML = " !!!";
                    document.getElementById(roomId).appendChild(Info)
            }
        }
    },

    show: function(){
        for (var i=0;i<this.rooms.length;i++){
            var roomType = this.rooms[i].type,
                roomId = this.rooms[i].id;
            if (roomType == 'economy'){
                var newRoom = document.createElement('div');
                newRoom.innerHTML = 'Room '+roomType;
                document.getElementById('economyRoom').appendChild(newRoom).setAttribute('id', roomId);
                //console.log(this.rooms[i]);
            } else {
                if (roomType == 'lux'){
                    var newRoom = document.createElement('div');
                    newRoom.innerHTML = 'Room '+roomType;
                    document.getElementById('luxRoom').appendChild(newRoom).setAttribute('id', roomId);
                } else {
                    var newRoom = document.createElement('div');
                    newRoom.innerHTML = 'Room '+roomType;
                    document.getElementById('standardRoom').appendChild(newRoom).setAttribute('id', roomId);
                }
            }
        }
    }
};

console.log(Hotel.rooms.length);
Hotel.show();
Hotel.checkIn();
Hotel.showGuest();
Hotel.roomWithGuest();
//console.log(Hotel.rooms);
//console.log(Hotel.numbOfBusyRooms());


var container = $('.room-wrap');
container.on({
    mouseenter: function(){
        var roomBlock = $(this),
            roomId = roomBlock.attr('id')-1;
        roomBlock.append("<span id='roomInfo'></span>");
        if (Hotel.checkRoom(roomId)) {
            $('#roomInfo').text(Hotel.rooms[roomId].guest);
        } else {$('#roomInfo').text("Номер свободен");}
        //console.log(guestName);
    },
    mouseleave: function(){
            var roomBlock = $(this);
            roomBlock.find('#roomInfo').remove();
        }
    },'div');

container.on('click','div',function(){
    var roomBlock = $(this),
        roomId = roomBlock.attr('id')-1;
    if (!Hotel.checkRoom(roomId)) {
        roomBlock.parent().find('#checkInHotel').hide();
        console.log('0');
    }
});




/*container.onmouseover = function(e){
    var roomBlock = e.target.closest('div'),
        roomId = roomBlock.id-1,
        //roomsGuest = Hotel.rooms[roomId].guest,
        guestName = document.createElement('span');
        guestName.innerHTML = Hotel.rooms[roomId].guest;
    roomBlock.appendChild(guestName).setAttribute('id','roomInfo');

    console.log('1');
}*/

/*function hoverRoom(){
    var rooms= $('.room-wrap').children();
    $('.room-wrap').on('click','div',function(e){
        console.log('0');
    });
}*/
//var rooms= $('.room-wrap').children();
/*$('.room-wrap').on('mouseleave','div',function(e){
    var elem = $(this);
    elem.find('#roomInfo').remove();
});*/




