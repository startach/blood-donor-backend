
function expand(element) {
    element.parentElement.parentElement.querySelector(".entry_body").classList.toggle("hidden")
}

function edit(element) {
    let ref;

    ref = element.parentElement.parentElement.querySelector("form")
    if(ref) ref.classList.toggle("notClickable")

    for (let i = 1; i <= 6; i++) {
        ref = element.parentElement.querySelector(`[data-name='button${i}']`)
        if(ref)
            ref.classList.toggle("hidden")
    }


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

function postReq(route) {
    fetch(route, {method: "post"}).finally(() => window.location.reload())
}

function swap(route,id1,id2) {
    fetch(`${route}/${id1}/${id2}`, {method: "post"}).finally(() => window.location.reload())
}