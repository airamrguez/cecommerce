import $ from 'jquery';
import { isNil } from './utils';
import { validateLogin } from './validators/validateLogin';
import './styles/login.scss';

const NOOP = () => {};
const DEFAULT_FORM_ATTRIBUTES = {};
const DEFAULT_INPUT_ATTRIBUTES = { type: 'input' };
const DEFAULT_BUTTON_ATTRIBUTES = { text: '', click: NOOP };

(function() {
  // Bootstrap the UI when the DOM content has been completely loaded and parsed.
  document.addEventListener('DOMContentLoaded', onDOMReady, false);
  function onDOMReady() {
    document.removeEventListener('DOMContentLoaded', onDOMReady);
    $('#root').append(renderApp());
  }

  // Render the app
  function renderApp() {
    return $('<div/>')
      .addClass('app')
      .append(
        renderHeader({ text: 'Admin login' }),
        $('<div/>')
          .addClass('container')
          .append(renderLoginForm()),
      );
  }

  // Render the app header
  function renderHeader(props) {
    const $title = $('<div />')
      .addClass('text')
      .text(props.text);
    return $('<div/>')
      .addClass('header')
      .append($title);
  }

  // Render the login form
  function renderLoginForm() {
    return renderForm({ name: 'login', className: 'form login' }).append(
      $('<div/>')
        .addClass('hint')
        .text('Hint: use whatever you want.'),
      renderLoginInput({
        id: 'login-username',
        name: 'username',
        autocomplete: 'username',
        placeholder: 'Enter your username',
        icon: 'person',
      }),
      renderLoginInput({
        id: 'login-password',
        name: 'password',
        autocomplete: 'password',
        type: 'password',
        placeholder: 'Enter your password',
        icon: 'lock',
      }),
      $('<div />').addClass('error-message'),
      $('<div />')
        .addClass('button-container')
        .append(
          renderButton({
            class: 'button primary',
            text: 'Enviar',
            type: 'submit',
            handleClick: handleLoginSubmit,
          }),
        ),
    );
  }

  // Render a form
  function renderForm(attributes = DEFAULT_FORM_ATTRIBUTES) {
    const { className, ...rest } = attributes;
    return $('<form />')
      .addClass(className)
      .attr(rest);
  }

  // Render inputs used in the login form.
  function renderLoginInput(attributes) {
    const { id, icon } = attributes;
    const $label = $('<label />')
      .attr({ for: id })
      .addClass('icon')
      .append($('<ion-icon />').attr({ name: icon }));
    return $('<div />')
      .addClass('field')
      .append($label, renderInput(attributes));
  }

  // Render an input element.
  function renderInput(attributes = DEFAULT_INPUT_ATTRIBUTES) {
    return $('<input />')
      .addClass('input')
      .attr(attributes);
  }

  // Render a button.
  function renderButton(attributes = DEFAULT_BUTTON_ATTRIBUTES) {
    const { text, handleClick, class: className, ...rest } = attributes;
    return $('<button>')
      .text(text)
      .attr(rest)
      .addClass(className)
      .click(handleClick);
  }

  // Validate form fields and redirect to the admin panel.
  function handleLoginSubmit(e) {
    e.preventDefault();
    const form = document.forms.login;
    const username = form.username.value.trim();
    const password = form.password.value.trim();
    const error = validateLogin({ username, password });
    if (!isNil(error)) {
      const $errorMessage = $(form).find('.error-message');
      $errorMessage.text(error);
      return;
    }
    location.href = `panel.html?username=${username}`;
  }
})();
