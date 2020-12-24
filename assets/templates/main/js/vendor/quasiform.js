import axios from 'axios'

/**
 * Инициализация рекаптчи
 */
window.recaptchaCallBack = () => {
  const recaptches = document.querySelectorAll('[data-quasiform="recaptcha"][data-sitekey][id]')
  if (NodeList.prototype.isPrototypeOf(recaptches)) {
    recaptches.forEach((recaptcha) => {
      const recaptchaOptions = {
        sitekey: null,
      }
      const sitekey = recaptcha.getAttribute('data-sitekey')
      if (sitekey !== undefined) {
        recaptchaOptions.sitekey = recaptcha.getAttribute('data-sitekey')
      } else {
        console.log('sitekey is undefined')
      }
      window.grecaptcha.render(recaptcha.getAttribute('id'), recaptchaOptions)
    })
  }
}

export class quasiform {
  constructor(args) {
    const instance = this
    this.defaults = {
      debug: false,
      format: 'json',
      formSelector: null,
      errorOpenTag: '<li>',
      errorCloseTag: '</li>',
      errorsOpenTag: '<ul>',
      errorsCloseTag: '</ul>',
      fieldErrorOpenTag: '<li>',
      fieldErrorCloseTag: '</li>',
      fieldErrorsOpenTag: '<ul>',
      fieldErrorsCloseTag: '</ul>',
      messageOpenTag: '<li>',
      messageCloseTag: '</li>',
      messagesOpenTag: '<ul>',
      messagesCloseTag: '</ul>',
      hideFormOnSuccess: false,
      hasErrorInputClass: 'quasiform__form-input--has-error',
      hasErrorLabelClass: 'quasiform__form-label--has-error',
      callbackOnSuccess: null,
      callbackOnFail: null,
      callbackOnError: null,
      callbackOnComplete: null,
      callbackBeforeSend: null,
      callbackOnAgree: null,
      callbackOnline: null,
      callbackOffline: null,
      callbackOnDisagree: null,
      callbackOnStarsChange: null,
      selector: '',
    }
    this.options = {}
    this.wrapper = null
    this.form = null
    this.responseData = null
    this.options = this.extendDefaults(this.defaults, args || {})
    this.wrapper = document.querySelector(this.options.selector)
    if (typeof this.wrapper !== 'object' || this.wrapper === null) {
      return false
    }

    const checkboxAgreeSelector = '[data-quasiform="agreement"]'
    const submitSelector = 'button[type="submit"]'
    const checkboxAgree = this.wrapper.querySelector(checkboxAgreeSelector)
    const submitButton = this.wrapper.querySelector(submitSelector)
    /**
     * Если флажок установлен, то у кнопки отправки формы удаляется атрибут disabled.
     */
    if (checkboxAgree && submitButton) {
      if (checkboxAgree.checked) {
        submitButton.removeAttribute('disabled')
      } else {
        submitButton.setAttribute('disabled', 'disabled')
      }
    }
    if (checkboxAgree && typeof checkboxAgree) {
      checkboxAgree.addEventListener('change', function(e) {
        if (submitButton) {
          if (checkboxAgree.checked) {
            submitButton.removeAttribute('disabled')
            if (instance.options.callbackOnAgree) {
              instance.options.callbackOnAgree(instance.wrapper)
            }
          } else {
            submitButton.setAttribute('disabled', 'disabled')
            if (instance.options.callbackOnDisagree) {
              instance.options.callbackOnDisagree(instance.wrapper)
            }
          }
        }
      })
    }

    /**
     * Custom checkbox
     */
    const checkboxes = this.wrapper.querySelectorAll('input[type="checkbox"]')
    if (checkboxes.length > 0) {
      [].forEach.call(checkboxes, function(checkbox, idx) {
        const customCheckbox = instance.wrapper.querySelector('[data-quasiform="checkbox"][data-name="' + checkbox.getAttribute('name') + '"]')
        if (customCheckbox) {
          const classOff = customCheckbox.getAttribute('data-quasiform-checkbox-off')
          if (checkbox.checked) {
            customCheckbox.classList.remove(classOff)
          } else {
            customCheckbox.classList.add(classOff)
          }
          checkbox.addEventListener('change', function() {
            if (checkbox.checked) {
              customCheckbox.classList.remove(classOff)
            } else {
              customCheckbox.classList.add(classOff)
            }
          })
        }
      })
    }
    if (this.options.formSelector) {
      this.form = this.wrapper.querySelector(instance.options.formSelector)
    } else {
      this.form = this.wrapper.querySelector('form')
    }

    if (!this.form) {
      console.error(`Form #${this.wrapper.id} not found`)
    }
    /**
     * Textarea Autoheight
     */
    const textareas = this.wrapper.querySelectorAll('textarea[data-quasiform="autoheight"]')
    if (textareas.length > 0) {
      [].forEach.call(textareas, function(textarea) {
        textarea.addEventListener('input', function(e) {
          textarea.style.height = '5px'
          textarea.style.height = (textarea.scrollHeight + 2) + 'px'
        })
      })
    }
    /**
     * Star rating
     */
    const starsWrapper = this.wrapper.querySelector('[data-quasiform="stars"]')
    const field = this.wrapper.querySelector('input[name="stars"]')
    if (starsWrapper !== null && field !== null) {
      const starSelector = '[data-value]'
      const stars = starsWrapper.querySelectorAll('[data-value]')
      const starClassActive = 'quasiform-star--active'
      const value = parseInt(field.value)
      starsWrapper.querySelector(starSelector + '[data-value]').classList.remove(starClassActive)
      for (let i = 1; i <= value; i++) {
        starsWrapper.querySelector('[data-value="' + i + '"]').classList.add(starClassActive)
      }
      [].forEach.call(stars, (star, idx) => {
        star.addEventListener('mouseover', function(e) {
          const value = parseInt(star.getAttribute('data-value'))
          for (let i = 1; i <= stars.length; i++) {
            if (i <= value) {
              starsWrapper.querySelector(`[data-value="${i}"]`).classList.add(starClassActive)
            } else {
              starsWrapper.querySelector(`[data-value="${i}"]`).classList.remove(starClassActive)
            }
          }
        })
        star.addEventListener('mousedown', function(e) {
          const value = parseInt(star.getAttribute('data-value'))
          const valueOld = field.value
          if (value !== valueOld) {
            field.value = value
            if (instance.options.callbackOnStarsChange) {
              instance.options.callbackOnStarsChange(instance.wrapper)
            }
          }
          return false
        })
      })
      field.addEventListener('change', (e) => {
        const value = parseInt(field.value)
        starsWrapper.querySelector(starSelector + '[data-value]').classList.remove(starClassActive)
        let i = 0
        for (i = 1; i <= value; i++) {
          starsWrapper.querySelector('[data-value="' + i + '"]').classList.add(starClassActive)
        }
        if (instance.options.callbackOnStarsChange) {
          instance.options.callbackOnStarsChange(instance.wrapper)
        }
      })
      starsWrapper.addEventListener('mouseout', function(e) {
        starsWrapper.querySelector('[data-value]').classList.remove(starClassActive)
        const l = starsWrapper.querySelectorAll('[data-value]').length
        const value = parseInt(field.value)
        if (value > 0) {
          let i = 0
          for (i = 1; i <= l; i++) {
            if (i <= value) {
              starsWrapper.querySelector('[data-value="' + i + '"]').classList.add(starClassActive)
            } else {
              starsWrapper.querySelector('[data-value="' + i + '"]').classList.remove(starClassActive)
            }
          }
        }
      })
    }

    const spinners = this.form.querySelectorAll('[data-quasiform="spinner"]')
    if (spinners.length > 0) {
      [].forEach.call(spinners, function(spinner, idx) {
        const decrease = spinner.querySelector('[data-quasiform="spinner__decrease"]')
        decrease.addEventListener('mousedown', (e) => {
          const min = parseInt(spinner.getAttribute('data-min'))
          const input = spinner.querySelector('input')
          const valueOld = parseInt(input.value)
          const step = parseInt(spinner.getAttribute('data-one'))
          const k = -1
          const valueNew = valueOld + step * k
          if (valueNew >= min) {
            input.value = valueNew
          }
        })

        const increase = spinner.querySelector('[data-quasiform="spinner__increase"]')
        increase.addEventListener('mousedown', function(e) {
          const max = parseInt(spinner.getAttribute('data-max'))
          const input = spinner.querySelector('input')
          const valueOld = parseInt(input.value)
          const step = parseInt(spinner.getAttribute('data-one'))
          const k = 1
          const valueNew = valueOld + step * k
          if (valueNew <= max) {
            input.value = valueNew
          }
        })
      })
    }

    this.initCustomFileInput('[data-quasiform="input-file"]')

    this.form.addEventListener('submit', (e) => {
      this.setState({
        isLoading: true,
      })
      e.preventDefault()
      const messagesWrapperSelector = '[data-quasiform="messages"]'
      const errorsWrapperSelector = '[data-quasiform="errors"]'
      // const loaderSelector = '[data-quasiform="loader"]';
      instance.wrapper.querySelector(errorsWrapperSelector).style.display = 'none'
      instance.wrapper.querySelector(messagesWrapperSelector).style.display = 'none'
      const formData = new FormData(instance.form)
      // let formData = $(form).serialize();
      const formAction = instance.form.getAttribute('action')
      // const formMethod = instance.form.getAttribute('method');
      // instance.form.querySelector(submitSelector).setAttribute('disabled', 'disabled');
      // instance.wrapper.querySelector(loaderSelector).style.display = 'block';
      instance.responseData = null
      // Функция, которую нужно исполнить перед запросом
      if (instance.options.callbackBeforeSend) {
        instance.options.callbackBeforeSend(instance.wrapper)
      }

      const headers = {

      }
      axios.post(
        formAction,
        formData,
        {
          headers: headers,
          credentials: 'same-origin',
        })
        .then((response) => {
          if (instance.options.callbackOnComplete) {
            instance.options.callbackOnComplete(instance.wrapper)
          }
          this.setState({
            isLoading: false,
          })
          switch (instance.options.format) {
            case 'json':
              return response.data
            case 'html':
              return response.text()
            default:
              break
          }
        })
        .then((data) => {
          if (instance.options.format === 'json' && !!data) {
            instance.wrapper.responseData = data

            if (Array.isArray(data.errors)) {
              const l = data.errors.length
              if (l > 0) {
                let errorsList = ''
                for (let i = 0; i < l; i++) {
                  if (data.errors[i].length > 0) {
                    errorsList += instance.options.errorOpenTag + data.errors[i] + instance.options.errorCloseTag
                  }
                }
                errorsList = instance.options.errorsOpenTag + errorsList + instance.options.errorsCloseTag
                instance.wrapper.querySelector(errorsWrapperSelector).innerHTML = errorsList
                instance.wrapper.querySelector(errorsWrapperSelector).style.display = 'block'
              }
            }

            if (Array.isArray(data.messages)) {
              if (data.messages.length > 0) {
                let messagesList = ''
                const l = data.messages.length
                for (let i = 0; i < l; i++) {
                  if (data.messages[i].length > 0) {
                    messagesList += instance.options.messageOpenTag + data.messages[i] + instance.options.messageCloseTag
                  }
                }
                messagesList = instance.options.messagesOpenTag + messagesList + instance.options.messagesCloseTag
                instance.wrapper.querySelector(messagesWrapperSelector).innerHTML = messagesList
                instance.wrapper.querySelector(messagesWrapperSelector).style.display = 'block'
              }
            }

            if (data.field_errors) {
              let fieldName
              for (fieldName in data.field_errors) {
                const input = instance.wrapper.querySelector('input[name="' + fieldName + '"]')
                if (input) {
                  input.classList.add(instance.options.hasErrorInputClass)
                }
                const textarea = instance.wrapper.querySelector('textarea[name="' + fieldName + '"]')
                if (textarea) {
                  textarea.classList.add(instance.options.hasErrorInputClass)
                }
                const label = instance.wrapper.querySelector('label[for="' + fieldName + '"]')
                if (label) {
                  label.classList.add(instance.options.hasErrorLabelClass)
                }

                if (data.field_errors[fieldName].length > 0) {
                  let fieldErrorsList = ''
                  const l = data.field_errors[fieldName].length
                  for (let i = 0; i < l; i++) {
                    fieldErrorsList += instance.options.fieldErrorOpenTag + data.field_errors[fieldName][i] + instance.options.fieldErrorCloseTag
                  }
                  fieldErrorsList = instance.options.fieldErrorsOpenTag + fieldErrorsList + instance.options.fieldErrorsCloseTag
                  const errorLabel = instance.wrapper.querySelector('[data-quasiform-field-errors="' + fieldName + '"]')
                  if (errorLabel !== null) {
                    errorLabel.innerHTML = fieldErrorsList
                    errorLabel.style.display = 'block'
                  }
                }
              }
            }
            if (instance.options.hideFormOnSuccess) {
              instance.form.style.display = 'none'
            }
            // Функция, которую нужно исполнить после успеха
            if (instance.options.callbackOnSuccess) {
              instance.options.callbackOnSuccess(instance.wrapper)
            }
          } else if (instance.options.format === 'html') {
            const htmlView = instance.wrapper.querySelector('[data-quasiform="html"]')
            if (htmlView) {
              htmlView.innerHTML = data
              htmlView.style.display = 'block'
            }
          } else {
            if (instance.options.debug) {
              console.log('Ответ сервера имеет неверный формат: ' + typeof data)
            }
          }
        })
        .catch((err) => {
          console.error(err)
          // Функция, которую нужно исполнить после неуспешного запроса
          if (instance.options.callbackOnFail) {
            instance.options.callbackOnFail(instance.wrapper)
          }
        })
    })

    this.state = {
      isLoading: false,
    }
  }

  setState(patch) {
    this.state = { ...this.state, ...patch }
    this.render()
  }

  extendDefaults(source, properties) {
    let property
    for (property in properties) {
      if (properties.hasOwnProperty(property)) {
        source[property] = properties[property]
      }
    }
    return source
  }

  initCustomFileInput(selector) {
    if (this.options.debug) {
      console.log('initCustomFileInput(' + selector + ')')
    }
    const inputWrapper = this.wrapper.querySelector(selector)
    if (inputWrapper) {
      const input = inputWrapper.querySelector('input')
      const span = inputWrapper.querySelector('span')
      input.style.display = 'none'
      input.addEventListener('change', function(e) {
        let fileName = ''
        if (this.files && this.files.length > 1) {
          fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length)
        } else {
          fileName = e.target.value.split('\\').pop()
        }
        if (fileName) {
          span.innerHTML = fileName
        }
      })
    }
  }

  render() {
    const { isLoading } = this.state

    const loaderSelector = '[data-quasiform="loader"]'
    const submitSelector = 'button[type="submit"]'
    const button = this.wrapper.querySelector(submitSelector)
    const loader = this.wrapper.querySelector(loaderSelector)

    if (button && loader) {
      if (isLoading) {
        button.setAttribute('disabled', 'disabled')
        loader.style.display = 'block'
      } else {
        loader.style.display = 'none'
        button.removeAttribute('disabled')
      }
    } else {
      console.log('Submit button not found')
    }
  }
}
