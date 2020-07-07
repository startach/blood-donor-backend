
function selectAll(element) {
    element.parentElement.querySelectorAll("[type='checkbox']").forEach(element=>element.checked = true)
}
function deselectAll(element) {
    element.parentElement.querySelectorAll("[type='checkbox']").forEach(element=>element.checked = false)
}


