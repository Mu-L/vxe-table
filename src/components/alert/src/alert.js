import GlobalConfig from '../../../conf'

export default {
  name: 'VxeAlert',
  props: {
    value: Boolean,
    title: { type: String, default: () => GlobalConfig.i18n('vxe.alert.title') },
    message: String
  },
  data () {
    return {
      visible: false
    }
  },
  computed: {
    vSize () {
      return this.size || this.$parent.size || this.$parent.vSize
    }
  },
  watch: {
    value (visible) {
      this[visible ? 'open' : 'close']()
    }
  },
  created () {
    if (this.value) {
      this.open()
    }
  },
  render (h) {
    let { vSize, visible, title, message } = this
    return h('div', {
      class: ['vxe-alert--wrapper', {
        [`size--${vSize}`]: vSize,
        active: visible
      }],
      on: {
        click: this.selfClickEvent
      }
    }, [
      h('div', {
        class: 'vxe-alert--box'
      }, [
        h('div', {
          class: 'vxe-alert--header'
        }, [
          h('span', {
            class: 'vxe-alert--title'
          }, title),
          h('i', {
            class: 'vxe-alert--close-icon',
            on: {
              click: this.closeEvent
            }
          })
        ]),
        h('div', {
          class: 'vxe-alert--body'
        }, [
          h('span', {
            class: 'vxe-alert--content'
          }, this.$slots.default || message)
        ]),
        h('div', {
          class: 'vxe-alert--footer'
        }, [
          h('vxe-button', {
            props: {
              type: 'primary'
            },
            on: {
              click: this.closeEvent
            }
          }, GlobalConfig.i18n('vxe.button.confirm'))
        ])
      ])
    ])
  },
  mounted () {
    document.body.appendChild(this.$el)
  },
  beforeDestroy () {
    this.$el.parentNode.removeChild(this.$el)
  },
  methods: {
    selfClickEvent (evnt) {
      if (evnt.target === this.$el) {
        this.close()
      }
    },
    closeEvent (evnt) {
      this.close()
    },
    open () {
      if (!this.visible) {
        this.visible = true
        this.$emit('input', true)
        this.$emit('open')
      }
    },
    close () {
      if (this.visible) {
        this.visible = false
        this.$emit('input', false)
        this.$emit('close')
      }
    }
  }
}
