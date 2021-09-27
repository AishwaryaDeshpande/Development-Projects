function admin(){
    
    this.form = document.querySelector('#form');
}
admin.prototype.bindEvents = function(){
    this.form.addEventListener('submit',(event) =>{
        event.preventDefault();
        console.log(event.target);
        const formData = new FormData(event.target);
        console.log(formData);
        for([key,value] of formData.entries() ){
            console.log(key,value);
        }

    })
}
const adminInstance = new admin();
adminInstance.bindEvents();