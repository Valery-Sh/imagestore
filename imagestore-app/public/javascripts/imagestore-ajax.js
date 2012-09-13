$(document).ready(function() {
    
    makeDraggable();

    $('#imageFile').bind('change', function changed() {
        $('#uploadForm').submit();
    });
        
    $('#uploadForm').submit(function() {
        
        $(this).ajaxSubmit({
            dataType: 'text',
            
            error: function(xhr) {
                status('!!! Error xhr: ' + xhr.status);
            },
            
            success: function(response) {
                try {
                    response = $.parseJSON(response);
                }
                catch(e) {
                    status('Bad response from server');
                    return;
                }

                if(response.error) {
                    status('Oops, something bad happened' + uuu);
                    return;
                }
                var id = response.id;
                var srcAttr = response.srcAttr;
                var left = response.left;
                var top = response.top;
                
                var fname = $('#uploadImageBtn').val();
                    
                $('#uploadImageBtn').val(''); 

                $('<img/>')
                .css('position','relative')
                .css('top',top+'px')
                .css('left',left+'px')
                .attr('src', srcAttr)
                .attr('id', id)
                .appendTo($('#sandbox'));
                
                makeDraggable();
            }
        });
        
        return false;
    });
    
    function status(message) {
        $('#status').text(message);
    }
});

function makeDraggable() {
    $("#sandbox img").draggable ({
        containment : "parent",
        
        scroll: false, // for IE
        
        stop : function (event, ui)
        {        
            var y = ui.offset.top - $('#sandbox').offset().top;
            y = ui.offset.top - $('#sandbox').offset().top;
            var x = ui.offset.left - $('#sandbox').offset().left;
            x = ui.offset.left - $('#sandbox').offset().left;
            
            if ( x < 0 ) {
                x = 0;
            }
            if ( y < 0 ) {
                y = 0;
            }
            
            $.ajax({
                url: "/imagestore/update",
                data : {
                    imagePosX : x,
                    imagePosY : y,
                    imageId : event.target.id.slice(3)
                },
            
                type: "put",
						
                dataType: 'text',
        
                error: function(xhr) {
                    status('!!! Error xhr: ' + xhr.status);
                },
            
                success: function(response) {
                    try {
                        response = $.parseJSON(response);
                    }
                    catch(e) {
                        status('Bad response from server');
                        return;
                    }

                    if(response.error) {
                        status('Oops, something bad happened' + uuu);
                        return;
                    }
                    
                    var imageUrlOnServer = response.path;
                    status('Success, image updated to: ' + imageUrlOnServer);
                }
            });
        }
    });
    
}

