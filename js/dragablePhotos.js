(function(){
  let layer = document.querySelector(".ad-form__photo-container");
  let draggedElement;

  function setDragability(element) {
    element.addEventListener("dragstart", dragStart);
    element.addEventListener("dragend", dragEnd);
    element.addEventListener("dragover", dragOver);
    element.addEventListener("dragenter", dragEnter);
    element.addEventListener("dragleave", dragLeave);
    element.addEventListener("drop", dragDrop);
  }

  function dragStart() {
    setTimeout(() => {
      this.classList.add("hide");
    }, 0)
    draggedElement = this;
  }

  function dragEnd() {
    this.classList.remove("hide", "focused");
    draggedElement = null;
  }

  function dragOver(evt) {
    evt.preventDefault();
  }

  function dragDrop() {
    layer.insertBefore(draggedElement, this);
    this.classList.remove("focused");
  }

  function dragEnter() {
    this.classList.add("focused");
  }

  function dragLeave() {
    this.classList.remove("focused");
  }


  window.setDragability = setDragability;
}
)();
