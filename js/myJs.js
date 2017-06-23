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
            this.rooms[j].guestPhone = faker.phone.phoneNumber();
            this.rooms[j].guestEmail = faker.internet.email();
        }
    },

    roomWithGuest: function(){
        for (var i=0;i<this.rooms.length;i++){
            if(this.checkRoom(i)) {
                var roomId = this.rooms[i].id;
                    $('#'+roomId).addClass('busy-room');
            }
        }
    },

    createRoom: function(id,text,roomId){
        var Col = document.createElement('div'),
            newRoom = document.createElement('div');
        document.getElementById(id).getElementsByTagName('div')[0].appendChild(Col);
        newRoom.innerHTML = text;
        Col.setAttribute('class', 'col l1 m2 s3');
        Col.appendChild(newRoom).setAttribute('id', roomId);
        newRoom.setAttribute('class', 'hotel-room');
    },
    showRooms: function(){
        for (var i=0;i<this.rooms.length;i++){
            var roomType = this.rooms[i].type,
                roomId = i+1;
            if (roomType == 'economy'){
                this.createRoom('economyRoom','Room E',roomId);
            } else {
                if (roomType == 'lux'){
                    this.createRoom('luxRoom','Room L',roomId);
                } else {
                    this.createRoom('standardRoom','Room S',roomId);
                }
            }
        }
    },

    showBusyRooms: function(){
        var busyRooms = $('#busyRooms');
        busyRooms.text(this.numbOfBusyRooms);
    },

    showFreeRooms: function(){
        var freeRooms = $('#freeRooms');
        freeRooms.text(this.numbOfRooms - this.numbOfBusyRooms);
    },

    addGuest: function(id,name,surname,phone,email){
        var room = this.rooms[id];
        room.guest = name + ' ' + surname;
        room.guestPhone = phone;
        room.guestEmail = email;
        this.numbOfBusyRooms++;
        this.showBusyRooms();
        this.showFreeRooms();
    },
    removeGuest: function(id){
        var room = this.rooms[id],
            type = room.type,
            Id = room.id;

        for (var key in room) {
            delete room[key];
        }
        room.id = Id;
        room.type = type;
        this.numbOfBusyRooms--;
        this.showBusyRooms();
        this.showFreeRooms();
    }
};

function addForm(container){
    container.append('<form class="form-add-guest clearfix"><button type="submit">Check-in</button></form>');
    container.find('form').prepend('<div class="clearfix"><input type="text" name="guestPhone" placeholder="Phone">' +
    '<input type="email" name="guestEmail" placeholder="guestEmail"></div>');
    container.find('form').prepend('<div class="clearfix"><input type="text" name="guestName" placeholder="Name">' +
    '<input type="text" name="guestSurname" placeholder="Surname"></div>');
    container.find('form').prepend('<span class="form-close form-icon" id="closeAddGuest"></span>');
    container.find('input').attr('class',"valid-item");
    container.find('input').wrap("<div class='form-item'></div>");
}

function myValidate(){
    $(this).find('.form-item').each(function(){
        var $this = $(this);
        if($this.find('.valid-item').val() == ''){
            $this.addClass('has-error');
            $this.find('.valid-item').after('<span class="form-icon error"></span>');
        } else {
            $this.removeClass('has-error');
            $this.find('span').remove('.error');
        }
    });
}

Hotel.showRooms();
Hotel.checkIn();
Hotel.showBusyRooms();
Hotel.showFreeRooms();
Hotel.roomWithGuest();

var container = $('.room-wrap');
container.on({
    mouseenter: function(){
        var roomBlock = $(this),
            roomId = roomBlock.attr('id')-1;
        roomBlock.append("<div id='roomInfo' class='roomInfo'></div>");
        if (Hotel.checkRoom(roomId)) {
            var roomInfo = $('#roomInfo');
            roomInfo.append("<span id='guest'></span><span id='guestPhone'></span><span id='guestEmail'></span>");
            $('#guest').text(Hotel.rooms[roomId].guest);
            $('#guestPhone').text(Hotel.rooms[roomId].guestPhone);
            $('#guestEmail').text(Hotel.rooms[roomId].guestEmail);
        } else {
            $('#roomInfo').text("Номер свободен");
        }
    },
    mouseleave: function(){
            var roomBlock = $(this);
            roomBlock.find('#roomInfo').remove();
        }
    },'div.hotel-room');

container.on('click','div.hotel-room',function(){
    var roomBlock = $(this),
        roomId = roomBlock.attr('id')-1;
    if (!roomBlock.hasClass('busy-room')) {
        var container1 = roomBlock.closest('.room-wrap');
        if (container1.find('form').length){
            container1.find('form').remove();
        }
        addForm(container1);
        var form = container1.find('form');

        form.submit(function(e){
            myValidate.call(this);
            if ( form.find('.form-item').hasClass('has-error') ){
                return false;
            } else {
                e.preventDefault();
                var
                    name = form.find('input[name=guestName]').val(),
                    surname = form.find('input[name=guestSurname]').val(),
                    phone = form.find('input[name=guestPhone]').val(),
                    email = form.find('input[type=email]').val();
                Hotel.addGuest(roomId,name,surname,phone,email);
                roomBlock.addClass('busy-room');
                container1.find('form').remove();
            }
        });
    } else {
        $('#roomInfo').addClass('hide-info');
        roomBlock.closest('.room-wrap').append('<form class="removeGuest clearfix"><span>Очистить номер?</span>' +
        '<div class="clearfix"><button id="clearRoom" type="submit">Да</button><button id="closeForm" type="button">Нет</button></div></form>');

        roomBlock.closest('.room-wrap').find('.removeGuest').submit(function(e){
            e.preventDefault();
            Hotel.removeGuest(roomId);
            roomBlock.removeClass('busy-room');
            $(this).remove();
        });
    }
});

container.on('click','button#closeForm',function(){
    $(this).closest('.removeGuest').remove();
});
container.on('click','span#closeAddGuest',function(){
    $(this).closest('.form-add-guest').remove();
});







