function uploadImg_click(element) {
    const fileElement = element.parentElement.querySelector("[type='file']")
    fileElement.click()
}

function delete_homeMenuItem(element, id) {
    fetch(`/homeMenu/delete/${id}`, {method: "post"}).finally(() => window.location.reload())

}


function getBase64(file, callback) {

    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(file);
}

function cancel_homeMenu(element) {
    cancel(element)
    const textElement = element.parentElement.parentElement.querySelector("[name='src']")
    const imgElement = element.parentElement.parentElement.querySelector(".largeImg")
    imgElement.src = textElement.value;
}


// assign onChange function to every <input type="file"> tag
const elementsRef = document.querySelectorAll(".entry_uploadImgContainer")
elementsRef.forEach(value => {
    const fileElement = value.querySelector("[type='file']")
    const imgElement = value.querySelector(".largeImg")
    const textElement = value.querySelector("[type='text']")
    fileElement.addEventListener("change", e => {
        getBase64(e.target.files[0], (res) => {
            imgElement.src = res;
            textElement.value = res;
        })
    })
})

