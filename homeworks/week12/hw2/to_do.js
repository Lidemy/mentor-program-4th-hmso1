/* eslint-disable no-undef, no-useless-escape, no-plusplus, no-alert, no-use-before-define, indent, max-len, no-shadow */

$(document).ready(() => {
  let itemId = 1;
  let filterAction = 'All';

  const divTemplate = `
    <div class="d-flex justify-content-between">
      <div class="custom-control custom-checkbox mr-sm-2">
        <input type="checkbox" class="custom-control-input" id="$id">
        <label class="custom-control-label" for="$id">$todo-input</label>    
      </div>
      <button class="cancel-btn">X</button>
    </div>
  `;

  const liTemplate = `
  <li class="list-group-item" data-id="$id" >
    ${divTemplate}
  </li>`;

  const editTemplate = `
    <div class="my-edit">
      <input type="text" class="form-control" id="my-edit" value="$content">
    </div>
  `;
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id');

  if (id) {
    $.ajax({
      type: 'GET',
      url: 'http://mentor-program.co/mtr04group6/Iris/week12/hw2/api_get_todo.php',
      data: { id },
    }).done((data) => {
      if (!data.ok) {
        alert(data.message);
        window.location.replace('http://mentor-program.co/mtr04group6/Iris/week12/hw2/index.html');
        return;
      }
      const todos = JSON.parse(data.todo_items);
      for (let i = todos.length - 1; i >= 0; i--) {
        const child = liTemplate.replace('$todo-input', escapeOutput(todos[i].todo))
                                .replaceAll('$id', escapeOutput(todos[i].id));

        $('.list-group').prepend(child);

        if (todos[i].status) {
          $(`#${todos[i].id}`).prop('checked', true);
        }
      }
      itemId = parseInt(todos[0].id, 10) + 1;
      checkBottomSection();
      updateActiveItem();
    });
  } else {
    checkBottomSection();
    updateActiveItem();
  }

  // ADD to-do items
  $('#todo-input').change(() => {
    const inputLocation = $('#todo-input');
    const targetLocation = $('.list-group');

    if (inputLocation.val()) {
      appendTheInput(inputLocation, targetLocation, liTemplate, itemId);
      checkBottomSection();
      updateActiveItem();
      itemId += 1;

      if (filterAction !== 'All') {
        filterItems(filterAction);
      }
    }
  });

  // REMOVE the todo item
  $(document).on('click', '.cancel-btn', (e) => {
    $(e.target).parents('li').remove();
    checkBottomSection();
    updateActiveItem();
  });

  // EDIT the todo-item
  $(document).on('dblclick', 'li', (e) => {
    const currentLocation = $(e.target);

    // No response when double click the checkbox
    if (currentLocation.prop('tagName').toLowerCase() === 'input') {
      return;
    }

    // Get the parent "li" tag
    const targetLocation = currentLocation.parents('li');

    // No response when double click bottom buttom section
    if (targetLocation.hasClass('my-bottom-wrapper')) {
      return;
    }

    // Get the id, content, content length
    const id = targetLocation.attr('data-id');
    const content = targetLocation.find('label').text();
    const len = content.length;

    // remove the div and append the input[type=text]
    targetLocation.children().remove();
    targetLocation.append(editTemplate.replace('$content', content));

    // put the cusor to the end of the input box
    const inputLocation = $('#my-edit');
    inputLocation.focus();
    inputLocation[0].setSelectionRange(len, len);

    // Only perform click/change once
    let state = true;
    $(document).one('click change', () => {
      if (state) {
        if (inputLocation.val()) {
          appendTheInput(inputLocation, targetLocation, divTemplate, id);
          $('#my-edit').parent().remove();
        } else {
          targetLocation.remove();
          checkBottomSection();
        }
        state = false;
      }
    });
    updateActiveItem();
  });

  // check the checkbox will update the active item amount
  $(document).on('click', '.custom-control-input', (() => {
    updateActiveItem();

    if (filterAction !== 'All') {
      filterItems(filterAction);
    }
  }));

  // Click the filter buttons (All, Active, Completed)
  $(document).on('click', '.my-bottom-wrapper button', (e) => {
    const button = $(e.target);

    $(`#filter-${filterAction.toLowerCase()}`).removeClass('active');
    button.addClass('active');
    filterAction = button.text();

    filterItems(filterAction);
  });

  // Click the "clear completed"
  $(document).on('click', '#clear-completed', () => {
    const items = $('.list-group-item');

    for (let i = 0; i < items.length - 1; i++) {
      if ($(items[i]).find('input').prop('checked')) {
        $(items[i]).remove();
      }
    }

    checkBottomSection();
  });

  $(document).on('click', '#save-btn', () => {
    const savedItems = $('.list-group-item');
    const data = [];

    if (savedItems.length === 1) {
      return;
    }

    for (let i = 0; i < savedItems.length - 1; i++) {
      const item = $(savedItems[i]);
      data.push(
        {
          id: item.attr('data-id'),
          todo: item.find('label').text(),
          status: item.find('input').prop('checked'),
        },
      );
    }

    const json = JSON.stringify(data);

    $.ajax({
      type: 'POST',
      url: 'http://mentor-program.co/mtr04group6/Iris/week12/hw2/api_save_todo.php',
      data: { json, id },
    }).done((data) => {
      if (!data.ok) {
        alert(data.message);
        return;
      }
      alert(`You can find your list in the following url: http://mentor-program.co/mtr04group6/Iris/week12/hw2/index.html?id=${data.id}`);
      window.location.replace(`http://mentor-program.co/mtr04group6/Iris/week12/hw2/index.html?id=${data.id}`);
    });
  });


  // Check whether to show the bottom wrapper
  function checkBottomSection() {
    if ($('.list-group').children().length === 1) {
      $('.card').hide();
    } else {
      $('.card').show();
    }
  }

  // Get the input val and prepend to the target location with specified template
  function appendTheInput(inputLocation, targetLocation, template, id) {
    const inputContent = inputLocation.val();
    inputLocation.val('');
    const child = template.replace('$todo-input', escapeOutput(inputContent))
                          .replaceAll('$id', id);
    targetLocation.prepend(child);
  }

  function updateActiveItem() {
    let active = 0;
    const items = $('.list-group-item');

    for (let i = 0; i < items.length - 1; i++) {
      if (!($(items[i]).find('input').prop('checked'))) {
        active += 1;
      }
    }
    $('#active-item').text(active);
  }

  function filterItems(action) {
    const items = $('.list-group-item');

    for (let i = 0; i < items.length - 1; i++) {
      if (action === 'Active' && $(items[i]).find('input').prop('checked')) {
        $(items[i]).hide();
      } else if (action === 'Completed' && !$(items[i]).find('input').prop('checked')) {
        $(items[i]).hide();
      } else {
        $(items[i]).show();
      }
    }
  }

  function escapeOutput(toOutput) {
    return toOutput.replace(/\&/g, '&amp;')
      .replace(/\</g, '&lt;')
      .replace(/\>/g, '&gt;')
      .replace(/\"/g, '&quot;')
      .replace(/\'/g, '&#x27')
      .replace(/\//g, '&#x2F');
  }
});
