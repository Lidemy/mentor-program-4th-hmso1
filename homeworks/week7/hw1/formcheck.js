/* eslint-disable quotes, no-plusplus, no-alert, no-else-return */
function isCheckTextInput() {
  let status = true;

  const textInput = document.querySelectorAll('label[class="require"]');

  for (let i = 0; i < textInput.length; i++) {
    const ele = textInput[i].htmlFor;
    if (document.querySelector(`#${ele}`).value === "") {
      document.querySelector(`#${ele} + .warning`).classList.remove('hide');
      status = false;
    } else {
      document.querySelector(`#${ele} + .warning`).classList.add('hide');
    }
  }
  return status;
}

function isCheckRadioInput() {
  const radioBtn = document.querySelectorAll(`input[name="register-ans"]`);

  if (radioBtn[0].checked) {
    document.querySelector(`label[data-name="register-ans"] + .warning`).classList.add('hide');
    return '躺在床上用想像力實作';
  } else if (radioBtn[1].checked) {
    document.querySelector(`label[data-name="register-ans"] + .warning`).classList.add('hide');
    return '趴在地上滑手機找現成的';
  }

  document.querySelector(`label[data-name="register-ans"] + .warning`).classList.remove('hide');
  return false;
}

document.querySelector(".register-form").addEventListener('submit', (e) => {
  e.preventDefault();
  const textStatus = isCheckTextInput();
  const radioStatus = isCheckRadioInput();
  if (textStatus && Boolean(radioStatus)) {
    alert(`
    暱稱: ${document.querySelector('#name').value}
    電子郵件: ${document.querySelector('#email').value}
    手機號碼: ${document.querySelector('#mobile').value}
    報名類型: ${radioStatus}
    怎麼知道這個活動的:${document.querySelector('#source').value}
    其他:${document.querySelector('#other').value}
    `);
  }
});
