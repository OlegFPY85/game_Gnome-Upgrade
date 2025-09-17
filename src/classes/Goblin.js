export default class Goblin {
  constructor(imageSrc) {
    this.element = document.createElement('div');
    this.element.className = 'goblin';
    this.element.style.backgroundImage = `url(${imageSrc})`;
    this.isVisible = false;
    this.currentCell = null;
  }
  
  showInCell(cell) {
    this.hide();
    this.currentCell = cell;
    cell.append(this.element);
    this.isVisible = true;
  }
  
  hide() {
    if (this.currentCell && this.isVisible) {
      this.currentCell.innerHTML = '';
      this.isVisible = false;
    }
  }
  
  catchGoblin() {
    if (this.isVisible) {
      this.element.classList.add('caught');
      setTimeout(() => {
        this.hide();
        this.element.classList.remove('caught');
      }, 200);
      return true;
    }
    return false;
  }
}