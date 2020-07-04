
function selectAll(element) {
    element.parentElement.querySelectorAll("[type='checkbox']").forEach(element=>element.checked = true)
}
function deselectAll(element) {
    element.parentElement.querySelectorAll("[type='checkbox']").forEach(element=>element.checked = false)
}

function del(element, id) {
    fetch(`/alerts/delete/${id}`, {method: "post"}).finally(() => window.location.reload())
}

