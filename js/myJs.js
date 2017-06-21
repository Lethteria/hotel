var Hotel={
    rooms: [{id:1,type:"standard"},
             {id:2,type:"standard"},
             {id:3,type:"standard"},
             {id:4,type:"standard"},
             {id:5,type:"standard"},
             {id:6,type:"standard"},
             {id:7,type:"standard"},
             {id:8,type:"standard"},
             {id:9,type:"luxe"},
             {id:10,type:"luxe"},
             {id:11,type:"luxe"},
             {id:12,type:"luxe"},
             {id:13,type:"luxe"},
             {id:14,type:"luxe"},
             {id:15,type:"luxe"},
             {id:16,type:"economy"},
             {id:17,type:"economy"},
             {id:18,type:"economy"},
             {id:19,type:"economy"},
             {id:20,type:"economy"}],

    show: function(){
        for (var i=0;i<this.rooms.length;i++){
            if (this.rooms[i].type == 'economy'){
                var newRoom = document.createElement('div');
                newRoom.innerHTML = 'Room standart';
                document.getElementById('standardRoom').appendChild(newRoom);
                console.log(this.rooms[i]);
            }
        }
    }
};
console.log(Hotel.rooms.length);
Hotel.show();


