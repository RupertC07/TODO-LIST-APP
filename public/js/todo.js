

function populate() 
{
   
    $.ajax({
        url : "/API/getTask",
        method : "POST",
        dataType : "JSON",
        success : function(result)
        {


            let html = "";
            if (result.data.length > 0) 
            {
                for(let i = 0; i<result.data.length; i++) 
                {
                    let is_checked = '';
                    let class_text = ''
                    let is_readOnly = ''

                    if (result.data[i].is_checked == 1) 
                    {
                        is_checked = 'checked'
                        class_text = 'text-decoration-line-through text-success'
                         is_readOnly = 'readonly'
                        
                    }


                    html += 
                    
                    `
                    <div class="row">

                                <div class="col-md-1">
                                    
                                    <div class="form-group">
                                        <input type="checkbox" class="" `+is_checked+` onchange="checkTask(`+result.data[i].id+`, `+result.data[i].is_checked+` )" >

                                    </div>  
                                </div>

                                <div class="col-md-10">
                                    <div class="form-group">
                                        
                                        <input style="font-size:17px; font-weight:bold" type="text" 
                                        value="`+result.data[i].task+`" id="taskNum`+result.data[i].id+`" onblur="updateTask(`+result.data[i].id+`)" onfocus="enterTask(`+result.data[i].id+`) "  
                                         placeholder="Task Description" class="form-control-plaintext `+class_text+`" `+is_readOnly+`>
                                    </div>
                                </div>
                                <div class="col-md-1 text-right">
                                    <span class="material-icons icn-rem" onclick="removeTask(`+result.data[i].id+`)">
                                        delete_outline
                                        </span>
                                </div>

                            </div>

                            <hr>
                    
                    
                    
                    `;
                


                }
                
                    
            }
            else 
            {

                html = ` <div class="row">
                        <div class="col-md-12 text-center">
                            <h6 class="text-warning"><b>NO TASK AVAILABLE</b></h6>
                        </div>
                    </div>
                `

            }

           

            $('#list-container').html(html)

           
        }



    })
}

function checkTask(id, is_checked)
{
    $.ajax({
                url: "/API/checkTask",
                method: "POST",
                data : {id:id,is_checked : is_checked},
                success : function(response) 
                {

                    if (response.Message) 
                    {

                       
                       
                        populate();
                        

                        
                    }
                    else
                    {
                        toastr.error("Task failed to remove");
                       
                    }

                }
            })

}




function removeTask(id) 
{

    $.ajax({
                url: "/API/deleteTask",
                method: "POST",
                data : {id:id},
                success : function(response) 
                {

                    if (response.Message) 
                    {

                        toastr.success("Task successfully removed");
                       
                        populate();
                        

                        
                    }
                    else
                    {
                        toastr.error("Task failed to remove");
                       
                    }

                }
            })

}


function enterTask(id) 
{

    let new_task = $(`#taskNum`+id+``);

    new_task.addClass(' text-success ');
    

   
   

}


function updateTask(id) 
{

    let new_task = $(`#taskNum`+id+``).val();
    $.ajax({
                url: "/API/updateTask",
                method: "POST",
                data : {id:id, newTask:new_task},
                success : function(response) 
                {

                    if (response.Message) 
                    {

                        
                       
                        populate();
                        

                        
                    }
                    else
                    {
                        toastr.error("Task failed to update");
                       
                    }

                }
            })

}

$(document).ready(function (){

    populate();

    $('#add-task').click(function(){
        var task = $('#task').val();
        if (!task.trim()) 
        {
            toastr.warning("Empty fields");
            
        }
        else
        {
            $.ajax({
                url: "/API/addTask",
                method: "POST",
                data : {task:task},
                success : function(response) 
                {

                    if (response.Message) 
                    {

                        toastr.success("New task has been successfully added");
                        $('#task').val("") ;
                        populate();
                        

                        
                    }
                    else
                    {
                        toastr.error("Task failed to add");
                        $('#task').val("") ;
                    }

                }
            })
        }
       
    })

});