
function expand(element) {
    element.parentElement.parentElement.querySelector(".entry_body").classList.toggle("hidden")
}

function edit(element) {
    let ref;

    ref = element.parentElement.parentElement.querySelector("form")
    if(ref) ref.classList.toggle("notClickable")


    ref = element.parentElement.querySelector("[data-name='button1']")
    if(ref) ref.classList.toggle("hidden")


    ref = element.parentElement.querySelector("[data-name='button2']")
    if(ref) ref.classList.toggle("hidden")

    ref = element.parentElement.querySelector("[data-name='button3']")
    if(ref) ref.classList.toggle("hidden")

    ref = element.parentElement.querySelector("[data-name='button4']")
    if(ref) ref.classList.toggle("hidden")
}

function cancel(element) {
    // window.location.reload()
    const ref = element.parentElement.parentElement.querySelector("form")
    if (ref)
        ref.reset();
}



function submitForm(element) {
    let ref;

    ref = element.parentElement.parentElement.querySelector("[type='submit']")
    if(ref) ref.click();
}

function del(route) {
    fetch(route, {method: "post"}).finally(() => window.location.reload())
}
