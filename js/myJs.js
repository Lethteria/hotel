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
//console.log(Hotel.numbOfBusyRooms());


