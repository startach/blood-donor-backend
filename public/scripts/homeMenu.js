function uploadImg_click(element) {
    const fileElement = element.parentElement.querySelector("[type='file']")
    fileElement.click()
}
function delete_homeMenuItem(element,id) {
    fetch(`/homeMenu/delete/${id}`, {method: "post"}).finally(() => window.location.reload())

}



function getBase64(file, callback) {

    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(file);
}



const elements = document.querySelectorAll(".entry_uploadImgContainer")
elements.forEach(value => {
    const fileElement = value.querySelector("[type='file']")
    const imgElement = value.querySelector(".largeImg")
    const textElement = value.querySelector("[type='text']")
    fileElement.addEventListener("change", e => {
        imgElement.src = e.target.value;
        getBase64(e.target.files[0],(res)=>{
            imgElement.src = res;
            textElement.value=res
        })
    })
})