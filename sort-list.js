function slist(target) {
  // set style and get all items
  target.classList.add('slist');
  let items = target.getElementsByTagName('li'),
    current = null;

  // make items draggable and sortable
  for (let i of items) {
    // attach draggable
    i.draggable = true;

    // drag start - yellow highlight dropzones
    i.ondragstart = () => {
      current = i;
      for (let item of items) {
        if (item != current) {
          item.classList.add('hint');
        } else {
          item.classList.add('hide');
        }
      }
    };

    // drag enter - red highlight dropzone
    i.ondragenter = () => {
      if (i != current) i.classList.add('active');
    };

    // drag leave - remove red highlight
    i.ondragleave = () => i.classList.remove('active');

    // drag end - remove all highlights
    i.ondragend = () => {
      for (let item of items) {
        item.classList.remove('hint');
        item.classList.remove('active');
        item.classList.remove('hide');
      }
    };

    // drag over - prevent the default 'drop'
    i.ondragover = (e) => e.preventDefault();

    // on drop
    i.ondrop = (e) => {
      e.preventDefault();
      if (i != current) {
        let currentpos = 0,
          droppedpos = 0;

        const reorder = async () => {
          for (let index = 0; index < items.length; index++) {
            console.log(current, i, items[index]);
            if (current == items[index]) currentpos = index;
            if (i == items[index]) droppedpos = index;
          }
          if (currentpos < droppedpos) {
            console.log('increase', i);
            i.parentNode.insertBefore(current, i.nextSibling);
          } else {
            console.log('decrease', i);
            i.parentNode.insertBefore(current, i);
          }
        };
        reorder().then(() => {
          for (let idx = 0; idx <= items.length; idx++) {
            items[idx].dataset.order = idx + 1;
          }
        });
      }
    };
  }
}
