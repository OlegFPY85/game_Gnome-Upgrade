export default class Goblin {
  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'goblin hidden';
    this.currentCell = null;
  }

  showInCell(cell) {
    this.hide();
    this.currentCell = cell;
    cell.append(this.element);
    this.element.classList.remove('hidden');
  }

  hide() {
    if (this.currentCell) {
      this.element.classList.add('hidden');
    }
  }

  catch() {
    this.element.classList.add('hidden');
    return true;
  }

  isVisible() {
    return !this.element.classList.contains('hidden');
  }
}